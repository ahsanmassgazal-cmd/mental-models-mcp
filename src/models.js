/**
 * The 7 decision-making mental models.
 * Pure data: the server, prompts and resources are all generated from this list.
 */
export const MODELS = [
    {
        id: "ooda",
        name: "OODA Loop",
        origin: "Col. John Boyd (US Air Force strategist)",
        tagline: "A continuous loop for rapid learning and response: whoever loops faster wins.",
        bestFor: ["Strategic pivots", "Crisis response", "Competitive environments"],
        steps: [
            { name: "Observe", detail: "Gather the facts as they are right now, not as you wish they were.", questions: ["What has actually changed?", "What signals are customers, competitors or the market sending?", "What data am I missing?"] },
            { name: "Orient", detail: "Analyse the context and check your own biases and assumptions.", questions: ["What does this mean for us?", "Which of my past experiences or biases might be distorting this?", "What would a competitor conclude from the same facts?"] },
            { name: "Decide", detail: "Choose the best available action. Good now beats perfect later.", questions: ["What are 2-3 realistic options?", "Which one can be tested fastest and reversed cheaply?"] },
            { name: "Act", detail: "Execute fast, then loop back to Observe and learn from the result.", questions: ["What is the first concrete step in the next 24 hours?", "How will I know if it worked?", "When do I run the next loop?"] }
        ],
        pitfalls: ["Over-observing and never acting", "Skipping Orient and reacting on bias", "Treating it as one pass instead of a loop"],
        output: "One action to take now + the signal to watch + when to loop again.",
        signals: ["crisis", "urgent", "competitor", "competition", "pivot", "fast", "market changed", "react", "respond", "emergency", "launch", "rival", "disrupt", "uncertain", "speed"]
    },
    {
        id: "first-principles",
        name: "First Principles Thinking",
        origin: "Aristotle; popularised by Elon Musk",
        tagline: "Deconstruct a problem to its foundational truths, then rebuild from the ground up.",
        bestFor: ["Innovation", "Product design", "Creative problem solving", "Pricing and cost breakdowns"],
        steps: [
            { name: "Identify the problem", detail: "State the problem or goal in one clear sentence.", questions: ["What am I really trying to achieve?", "What would success look like in numbers?"] },
            { name: "Break it down", detail: "Split it into its fundamental pieces (costs, components, needs, constraints).", questions: ["What is this actually made of?", "What are the raw inputs and their true costs?"] },
            { name: "Challenge assumptions", detail: "Question every 'that's how it's done' until only verifiable truths remain.", questions: ["Is this a law of physics/economics or just a convention?", "Who says it has to be this way?", "What if the opposite were true?"] },
            { name: "Rebuild", detail: "Create a new solution using only the truths you kept.", questions: ["Knowing only these truths, how would I design this from zero?", "What can I remove, combine or do radically cheaper?"] }
        ],
        pitfalls: ["Reasoning by analogy ('competitors do X') and calling it first principles", "Stopping at the first layer of breakdown", "Ignoring real constraints (law, money, time)"],
        output: "A list of fundamental truths + a rebuilt solution that ignores inherited conventions.",
        signals: ["innovate", "innovation", "new product", "design", "reinvent", "expensive", "cost", "cheaper", "build", "from scratch", "assumption", "creative", "startup", "price", "idea", "disrupt"]
    },
    {
        id: "six-hats",
        name: "Six Thinking Hats",
        origin: "Edward de Bono",
        tagline: "Switch between modes of thinking one at a time instead of mixing them all at once.",
        bestFor: ["Brainstorming", "Team strategy", "Conflict resolution", "Evaluating a big idea"],
        steps: [
            { name: "White hat: data", detail: "Facts and figures only. What do we know and what do we need to know?", questions: ["What are the numbers?", "What information is missing?"] },
            { name: "Red hat: emotions", detail: "Gut feelings and intuition, no justification needed.", questions: ["How do I/we feel about this?", "How will customers or the team feel?"] },
            { name: "Black hat: caution", detail: "Risks, weaknesses and what could go wrong.", questions: ["What is the worst case?", "Why might this fail?"] },
            { name: "Yellow hat: positivity", detail: "Benefits, value and the best case.", questions: ["What is the upside?", "Why could this work brilliantly?"] },
            { name: "Green hat: creativity", detail: "New ideas, alternatives and possibilities.", questions: ["What else could we do?", "How could we remove the black-hat risks?"] },
            { name: "Blue hat: process", detail: "Summarise all the hats and control the decision.", questions: ["What did each hat tell us?", "What is the decision and the next step?"] }
        ],
        pitfalls: ["Mixing hats in the same breath", "Skipping Red or Black because they feel uncomfortable", "Ending without a Blue-hat decision"],
        output: "A short note per hat, a Blue-hat summary and a final decision.",
        signals: ["team", "brainstorm", "meeting", "conflict", "disagree", "partner", "evaluate", "idea", "pros and cons", "emotion", "feel", "strategy", "debate", "stakeholder"]
    },
    {
        id: "pareto",
        name: "80/20 Principle",
        origin: "Vilfredo Pareto",
        tagline: "A small number of inputs create the majority of your results.",
        bestFor: ["Optimising systems", "Scaling operations", "Reviewing performance", "Time and focus management"],
        steps: [
            { name: "List", detail: "List every task, product, client, channel or activity in scope.", questions: ["What am I spending time or money on?"] },
            { name: "Measure", detail: "Attach an outcome to each (revenue, leads, profit, hours saved).", questions: ["What result does each item produce?", "What does each one cost?"] },
            { name: "Find the 20%", detail: "Sort by outcome and identify the vital few driving most results.", questions: ["Which ~20% produce ~80% of the value?", "Which items drain resources for little return?"] },
            { name: "Double down & cut", detail: "Invest more in the vital few. Eliminate, automate or delegate the rest.", questions: ["How do I put more into the top 20%?", "What can I delete, automate or hand off this week?"] }
        ],
        pitfalls: ["Guessing instead of measuring", "Cutting things that are low-revenue but strategic", "Treating 80/20 as an exact ratio"],
        output: "Ranked list + 'double down' list + 'eliminate / automate / delegate' list.",
        signals: ["too many", "overwhelmed", "busy", "prioritize", "prioritise", "focus", "scale", "optimize", "optimise", "clients", "products", "time", "efficiency", "review", "performance", "automate", "delegate", "revenue"]
    },
    {
        id: "root-cause",
        name: "Root Cause Analysis (5 Whys)",
        origin: "Sakichi Toyoda (Toyota)",
        tagline: "Most problems don't need more effort, they need better diagnosis.",
        bestFor: ["Persistent issues", "System failures", "Customer complaints", "Recurring mistakes"],
        steps: [
            { name: "Define the problem", detail: "Describe what happened precisely: what, where, when, how big.", questions: ["What exactly is going wrong?", "How often, and since when?"] },
            { name: "Identify possible causes", detail: "Ask 'why?' repeatedly (about five times) and list every candidate cause.", questions: ["Why did this happen?", "And why did that happen?"] },
            { name: "Validate the root cause", detail: "Test which cause, if removed, would stop the problem.", questions: ["What evidence proves this is the root cause?", "If we fix this, does the problem disappear?"] },
            { name: "Design the solution", detail: "Fix the root, not the symptom.", questions: ["What change prevents recurrence?", "Who owns it?"] },
            { name: "Gather the data", detail: "Measure after the fix to confirm it worked.", questions: ["What metric will show the problem is gone?", "When do we check?"] }
        ],
        pitfalls: ["Stopping at the first 'why' (a symptom)", "Blaming people instead of processes", "Never checking data after the fix"],
        output: "A why-chain, the validated root cause, the fix and the metric to confirm it.",
        signals: ["problem", "keeps happening", "again", "recurring", "failure", "failed", "broken", "complaint", "issue", "bug", "error", "why", "drop", "declining", "churn", "not working", "persistent"]
    },
    {
        id: "occams-razor",
        name: "Occam's Razor",
        origin: "William of Ockham",
        tagline: "When multiple explanations exist, the simplest one is usually correct.",
        bestFor: ["Diagnosing poor performance", "Streamlining strategy", "Evaluating data", "Cutting through overthinking"],
        steps: [
            { name: "Define the problem", detail: "State what you are trying to explain or decide.", questions: ["What exactly needs explaining?"] },
            { name: "List every explanation", detail: "Write down all plausible explanations or options.", questions: ["What could explain this?", "What options do I have?"] },
            { name: "Apply the razor", detail: "Count the assumptions each one needs.", questions: ["Which needs the fewest assumptions?", "Which is easiest to verify?"] },
            { name: "Act", detail: "Act on the simplest viable answer; revisit only if evidence contradicts it.", questions: ["What is the simplest test or action?", "What evidence would make me drop it?"] }
        ],
        pitfalls: ["Choosing 'simple' that ignores key evidence", "Using it to avoid necessary complexity", "Never re-testing when new data arrives"],
        output: "Explanations ranked by number of assumptions + the simplest one to act on.",
        signals: ["explain", "why is", "low", "poor", "performance", "data", "confusing", "complicated", "complex", "simplify", "many reasons", "theory", "analysis", "not converting", "suspect"]
    },
    {
        id: "5x5",
        name: "5x5 Rule",
        origin: "Popular emotional-control rule",
        tagline: "If it won't matter in 5 years, don't spend more than 5 minutes upset about it.",
        bestFor: ["Business stress", "Difficult people", "Overthinking", "Setbacks and rejections"],
        steps: [
            { name: "Pause", detail: "Stop before reacting. Breathe; don't reply yet.", questions: ["Am I about to react emotionally?"] },
            { name: "Ask the 5x5 question", detail: "Will this matter in 5 years?", questions: ["Will this matter in 5 years?", "If not, can I let it go within 5 minutes?"] },
            { name: "Act", detail: "Take the next useful action. Don't overthink.", questions: ["What is the one useful thing to do now?"] },
            { name: "Reframe", detail: "Turn it into a lesson or a neutral fact.", questions: ["What is the lesson?", "How would a calm, successful person see this?"] },
            { name: "Repeat daily", detail: "Make it a habit for every small irritation.", questions: ["What tried to steal my focus today?"] }
        ],
        pitfalls: ["Using it to dismiss problems that genuinely matter long-term", "Suppressing emotions instead of reframing them"],
        output: "A yes/no on long-term importance + one calm next action.",
        signals: ["stress", "stressed", "angry", "upset", "rude", "difficult person", "rejected", "rejection", "worried", "anxious", "overthinking", "frustrated", "annoyed", "argument", "criticism", "lost a deal", "ghosted"]
    }
];
export const MODEL_IDS = MODELS.map(m => m.id);
export function findModel(id) {
    const key = id.trim().toLowerCase();
    return MODELS.find(m => m.id === key || m.name.toLowerCase() === key);
}
