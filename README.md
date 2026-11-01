# 🧠 Mental Models MCP

**Make better decisions with AI. 7 proven thinking frameworks, built into Claude.**

Most bad decisions come from using the wrong way of thinking: adding effort when you need diagnosis, overthinking when you need action, or arguing when you need structure. Mental Models MCP picks the right framework for your situation, walks you through it step by step with your real numbers, and ends with **one clear decision and your next action**.

Free and open source. Built by [SigmaMax AI Solutions](https://sigmamaxaisolutions.com).

| # | Model | Use it when |
|---|---|---|
| 1 | **OODA Loop** (John Boyd) | Crisis, competitor move, strategic pivot |
| 2 | **First Principles** | New product, pricing, innovation |
| 3 | **Six Thinking Hats** (Edward de Bono) | Team decisions, brainstorming, conflict |
| 4 | **80/20 Principle** (Pareto) | Too much to do, need focus, scaling |
| 5 | **Root Cause Analysis** (Toyoda) | A problem that keeps coming back |
| 6 | **Occam's Razor** | Confusing data, many possible explanations |
| 7 | **5x5 Rule** | Stress, difficult people, overthinking |

---

## 🚀 Start here: pick your path

| You use... | Use this | Setup time |
|---|---|---|
| **Claude.ai** (web or phone) | **Path 1: add as a connector** (easiest) | 1 minute, no install |
| **Claude.ai** (any plan) | **Path 2: add the skill / paste instructions** | 2 minutes, nothing to install |
| **Claude Desktop, Claude Code, Antigravity, Cursor** | **Path 3: local MCP server** | 10 minutes |

### Path 1: Add as a connector (easiest, works on phone too)

1. Open **claude.ai** in a browser and go to **Settings → Connectors → Add custom connector**.
2. Name: `Mental Models`. URL: `https://mental-models-mcp.vercel.app/mcp`
3. Click **Add**, then switch it on from the tools menu in a chat.
4. Try: "Help me decide: my leads have dropped for 3 months and I don't know why."

Add it once on the website and it appears in the Claude phone app on the same account.
Note: custom connectors may need a paid Claude plan. On a free plan, use Path 2.

### Path 2: Skill or instructions (no install)

- **As a skill:** upload [`skills/mental-models/SKILL.md`](skills/mental-models/SKILL.md) in Claude → Settings → Capabilities → Skills.
- **As instructions:** create a Claude **Project** and paste the contents of that same file into the project instructions.

### Path 3: Local MCP server (Claude Desktop, Claude Code, Antigravity)

Needs [Node.js 18+](https://nodejs.org) and [Git](https://git-scm.com).

```bash
git clone https://github.com/ahsanmassgazal-cmd/mental-models-mcp.git
cd mental-models-mcp
npm install
npm test        # should print: 10/10 recommendation cases passed + All HTTP checks passed
```

Add it to your MCP config. For **Claude Desktop**, open the config file:
- Windows: press `Win+R`, type `%APPDATA%\Claude`, open `claude_desktop_config.json`
- Mac: `~/Library/Application Support/Claude/claude_desktop_config.json`

```json
{
  "mcpServers": {
    "mental-models": {
      "command": "node",
      "args": ["C:\\Users\\YOU\\mental-models-mcp\\src\\index.js"]
    }
  }
}
```

Use the real full path to `src/index.js`. On Windows, double every backslash (`\\`). If the file already lists other servers, add `mental-models` inside the existing `mcpServers` block. Fully quit and reopen Claude Desktop.

**Claude Code:** `claude mcp add mental-models -- node /full/path/to/src/index.js`. **Antigravity / Cursor:** add the same `node` command and path in the MCP settings.

**Make it automatic:** add this to your custom instructions:

> When I face a decision, a recurring problem or a stressful situation, call `recommend_mental_model`, then `apply_mental_model` with the top result, and end with one decision and my next action.

---

## 🧪 Try it: examples

| You say | Mental Models picks |
|---|---|
| "Our leads keep dropping every month and customers complain" | 🔍 **Root Cause Analysis** |
| "A client was rude on the call and I'm angry and stressed" | 🧘 **5x5 Rule** |
| "I have too many products and clients, I need to focus" | 📊 **80/20 Principle** |
| "A competitor launched a cheaper rival product, we must respond fast" | 🔁 **OODA Loop** |
| "I want to design a new product from scratch, cheaper than everyone" | 🧱 **First Principles** |
| "My team disagrees about strategy, help us brainstorm" | 🎩 **Six Thinking Hats** |
| "Traffic is fine but sales are low, the data is confusing" | ✂️ **Occam's Razor** |
| "Should I expand my business into Saudi Arabia?" (`decision_playbook`) | 5x5 → First Principles → 80/20 → OODA |

## 🔧 Tools

| Tool | When | What you get |
|---|---|---|
| `recommend_mental_model` | Start | Best-fit models ranked, with the reason |
| `apply_mental_model` | Next | A step-by-step worksheet for your exact situation |
| `decision_playbook` | Big decisions | Several models chained in the right order |
| `get_mental_model` | Any time | Full guide for one model |
| `list_mental_models` | Any time | All 7 models |

## ❓ Troubleshooting

- **Connector fails to add:** open the URL in a browser. If you don't see "Mental Models MCP is running", the server is down.
- **Tool doesn't appear in Claude Desktop:** the config path or JSON is wrong. Check for single backslashes and missing commas, then fully quit and reopen.
- **`node` not recognized:** install Node.js LTS, then reopen your terminal.

## How it works

Runs locally with simple keyword rules: **zero API calls, zero tokens, no data stored**. Edit the models in [`src/models.js`](src/models.js) and add a case in [`test/test.js`](test/test.js) for each change.

Works great together with [Model Advisor MCP](https://github.com/ahsanmassgazal-cmd/model-advisor-mcp), which tells you which Claude model to use for each task.

## Roadmap

- More models: SWOT, Inversion, Second-Order Thinking, Regret Minimisation, Eisenhower Matrix
- Decision journal: log decisions and review outcomes later
- Team mode for group decisions

## License

MIT © SigmaMax AI Solutions

---

**Need AI agents for your business?** SigmaMax builds AI agents and automation for companies across the GCC, India and beyond.
🌐 [sigmamaxaisolutions.com](https://sigmamaxaisolutions.com) · ✉️ ahsansigmamaxai@gmail.com · WhatsApp +968 7694 1459
