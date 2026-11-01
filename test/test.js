// Recommendation cases. Run: node test/test.js — add a case for every rule change.
import { recommend, decisionStack } from "../src/engine.js";

const cases = [
  ["Our leads keep dropping every month and customers complain", "root-cause"],
  ["The same delivery error keeps happening again and again", "root-cause"],
  ["A client was rude on the call and I feel angry and stressed", "5x5"],
  ["I got rejected by an investor and I'm overthinking it", "5x5"],
  ["I have too many products and clients, I need to focus and prioritize", "pareto"],
  ["How do I scale operations and automate the busy work", "pareto"],
  ["A competitor just launched a cheaper rival product, we need to respond fast", "ooda"],
  ["I want to design a new product from scratch and challenge the assumption it must be expensive", "first-principles"],
  ["My team disagrees about the strategy, help us brainstorm in the meeting", "six-hats"],
  ["Website traffic is fine but sales are low, there are many reasons and the data is confusing", "occams-razor"],
];

let passed = 0;
for (const [text, expected] of cases) {
  const got = recommend(text, 1)[0].id;
  const ok = got === expected;
  if (ok) passed++;
  console.log(`${ok ? "PASS" : "FAIL"}  ${expected.padEnd(16)} got ${got.padEnd(16)} "${text}"`);
}

const stack = decisionStack("Should I expand my business into Saudi Arabia?").order;
const stackOk = stack[0] === "5x5" && stack.at(-1) === "ooda";
console.log(`${stackOk ? "PASS" : "FAIL"}  playbook starts with 5x5 and ends with OODA: ${stack.join(" → ")}`);

console.log(`\n${passed}/${cases.length} recommendation cases passed`);
if (passed !== cases.length || !stackOk) process.exit(1);
