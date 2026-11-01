import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { decisionStack, modelToMarkdown, recommend, worksheet } from "./engine.js";
import { findModel, MODEL_IDS, MODELS } from "./models.js";

const asText = (text) => ({ content: [{ type: "text", text }] });
const asJson = (obj) => asText(JSON.stringify(obj, null, 2));
const modelId = z.enum(MODEL_IDS).describe(`Model id: ${MODEL_IDS.join(", ")}`);
const situation = z.string().min(5).max(4000).describe("The user's decision, problem or situation, in their words");

export function createServer() {
  const server = new McpServer({ name: "mental-models", version: "1.0.0" });

  server.registerTool(
    "recommend_mental_model",
    {
      title: "Recommend a mental model",
      description:
        "Call FIRST when the user faces a decision, a recurring problem, too many priorities, a team disagreement or a stressful moment. " +
        "Returns the best-fit models ranked with reasons. Then call apply_mental_model with the top id. Show the one_liner to the user.",
      inputSchema: {
        situation,
        limit: z.number().int().min(1).max(7).optional().describe("How many models to return (default 3)"),
      },
    },
    async ({ situation, limit }) => {
      const recommendations = recommend(situation, limit ?? 3);
      const top = recommendations[0];
      return asJson({
        one_liner: `🧠 Best model: ${top.name}. ${top.why.split(". ").slice(-1)[0]}`,
        recommendations,
        next_step: `Call apply_mental_model with model_id='${top.id}'.`,
      });
    }
  );

  server.registerTool(
    "apply_mental_model",
    {
      title: "Apply a mental model to a situation",
      description:
        "Returns a step-by-step worksheet that applies one model to the user's exact situation. Work through EVERY question with concrete answers " +
        "(names, numbers, dates), don't just explain the framework, and finish with one decision and the first action for the next 24 hours.",
      inputSchema: {
        model_id: modelId,
        situation,
        goal: z.string().max(500).optional().describe("Optional: what a good outcome looks like"),
      },
    },
    async ({ model_id, situation, goal }) => asText(worksheet(findModel(model_id), situation, goal))
  );

  server.registerTool(
    "decision_playbook",
    {
      title: "Decision playbook (several models in order)",
      description:
        "For big or high-stakes decisions. Returns an ordered chain: 5x5 perspective check → 1-2 core models → OODA to turn it into action. " +
        "Walk through each in order briefly, then give the final decision.",
      inputSchema: { situation },
    },
    async ({ situation }) => asText(decisionStack(situation).markdown)
  );

  server.registerTool(
    "get_mental_model",
    {
      title: "Get one mental model in full",
      description: "Full guide for one model: origin, steps, guiding questions, pitfalls and expected output.",
      inputSchema: { model_id: modelId },
    },
    async ({ model_id }) => asText(modelToMarkdown(findModel(model_id)))
  );

  server.registerTool(
    "list_mental_models",
    {
      title: "List all 7 mental models",
      description: "Lists the 7 models with ids, a one-line summary and what each is best for.",
      inputSchema: {},
    },
    async () => asJson(MODELS.map((m) => ({ id: m.id, name: m.name, tagline: m.tagline, best_for: m.bestFor })))
  );

  return server;
}
