// Tests the hosted (HTTP) mode end to end. Run: node test/http-test.js
import { spawn } from "node:child_process";
import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { StreamableHTTPClientTransport } from "@modelcontextprotocol/sdk/client/streamableHttp.js";

const PORT = 3998;
const base = `http://localhost:${PORT}`;
const proc = spawn("node", ["src/http.js"], { env: { ...process.env, PORT }, stdio: "ignore" });
let failed = 0;
const check = (name, ok) => { console.log(`${ok ? "PASS" : "FAIL"}  ${name}`); if (!ok) failed++; };

try {
  for (let i = 0; i < 40; i++) {
    try { await fetch(base, { headers: { accept: "text/html" } }); break; } catch { await new Promise((r) => setTimeout(r, 150)); }
  }
  const page = await fetch(base + "/mcp", { headers: { accept: "text/html" } });
  check("GET in a browser shows landing page", page.status === 200 && (await page.text()).includes("Mental Models MCP is running"));
  check("GET without html returns 405", (await fetch(base + "/mcp")).status === 405);
  check("Bad JSON returns 400", (await fetch(base + "/mcp", { method: "POST", headers: { "content-type": "application/json", accept: "application/json, text/event-stream" }, body: "{oops" })).status === 400);

  const client = new Client({ name: "http-test", version: "1.0.0" });
  await client.connect(new StreamableHTTPClientTransport(new URL(base + "/mcp")));
  const tools = (await client.listTools()).tools.map((t) => t.name).sort();
  check("Lists 5 tools over HTTP", tools.join() === "apply_mental_model,decision_playbook,get_mental_model,list_mental_models,recommend_mental_model");

  const r1 = JSON.parse((await client.callTool({ name: "recommend_mental_model", arguments: { situation: "Sales keep dropping and customers complain" } })).content[0].text);
  check("Dropping sales -> Root Cause Analysis", r1.recommendations[0].id === "root-cause" && r1.one_liner.startsWith("🧠"));
  const r2 = (await client.callTool({ name: "apply_mental_model", arguments: { model_id: "first-principles", situation: "Should I lower my AI agent price to win clients?" } })).content[0].text;
  check("Apply First Principles returns worksheet", r2.includes("Challenge assumptions") && r2.includes("lower my AI agent price"));
  const r3 = (await client.callTool({ name: "decision_playbook", arguments: { situation: "Should I expand into Saudi Arabia?" } })).content[0].text;
  check("Playbook starts with 5x5, ends with OODA", r3.indexOf("5x5 Rule") < r3.indexOf("OODA Loop"));
  const r4 = JSON.parse((await client.callTool({ name: "list_mental_models", arguments: {} })).content[0].text);
  check("Lists 7 models", r4.length === 7);

  let rejected = false;
  try {
    const bad = await client.callTool({ name: "get_mental_model", arguments: { model_id: "astrology" } });
    rejected = bad.isError === true;
  } catch { rejected = true; }
  check("Unknown model id is rejected", rejected);
  await client.close();
} finally {
  proc.kill();
}
console.log(failed ? `\n${failed} FAILED` : "\nAll HTTP checks passed");
process.exit(failed ? 1 : 0);
