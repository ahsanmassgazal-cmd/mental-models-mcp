import { MODELS } from "./models.js";
/** Rank models for a situation by keyword signals. Deterministic, free, no API calls. */
export function recommend(situation, limit = 3) {
    const text = ` ${situation.toLowerCase()} `;
    const ranked = MODELS.map(model => {
        const matched = model.signals.filter(signal => text.includes(signal));
        return {
            id: model.id,
            name: model.name,
            score: matched.length,
            matched_signals: matched,
            why: matched.length
                ? `Situation mentions ${matched.map(s => `"${s}"`).join(", ")}. ${model.name} is built for: ${model.bestFor.join(", ")}.`
                : `General fit. ${model.name} is built for: ${model.bestFor.join(", ")}.`
        };
    }).sort((a, b) => b.score - a.score);
    // With no signals at all, First Principles + 80/20 + OODA is a sensible general-purpose stack
    if (ranked[0].score === 0) {
        const fallback = ["first-principles", "pareto", "ooda"];
        return fallback.map(id => ranked.find(r => r.id === id)).slice(0, limit);
    }
    return ranked.filter(r => r.score > 0).slice(0, limit);
}
export function modelToMarkdown(model) {
    const lines = [
        `# ${model.name}`,
        `*${model.origin}*`,
        "",
        `> ${model.tagline}`,
        "",
        `**Best for:** ${model.bestFor.join(", ")}`,
        "",
        "## Steps"
    ];
    model.steps.forEach((step, i) => {
        lines.push(`${i + 1}. **${step.name}**: ${step.detail}`);
        step.questions.forEach(q => lines.push(`   - ${q}`));
    });
    lines.push("", "## Pitfalls", ...model.pitfalls.map(p => `- ${p}`), "", `**Output:** ${model.output}`);
    return lines.join("\n");
}
/** A fill-in worksheet the assistant works through for the user's situation. */
export function worksheet(model, situation, goal) {
    const lines = [
        `# ${model.name} worksheet`,
        "",
        `**Situation:** ${situation}`,
        ...(goal ? [`**Goal:** ${goal}`] : []),
        "",
        "Work through each step below for this exact situation. Answer every question concretely (names, numbers, dates); do not restate the framework.",
        ""
    ];
    model.steps.forEach((step, i) => {
        lines.push(`## Step ${i + 1}: ${step.name}`, step.detail, ...step.questions.map(q => `- ${q} →`), "");
    });
    lines.push("## Watch out for", ...model.pitfalls.map(p => `- ${p}`), "", "## Finish with", `- ${model.output}`, "- A single clear decision and the first action to take in the next 24 hours.");
    return lines.join("\n");
}
/** Which models to chain for a full decision, in order. */
export function decisionStack(situation) {
    const top = recommend(situation, 3).map(r => r.id);
    // Always calm down first, always end with OODA to turn the decision into action
    const order = Array.from(new Set(["5x5", ...top.filter(id => id !== "5x5" && id !== "ooda"), "ooda"]));
    const byId = new Map(MODELS.map(m => [m.id, m]));
    const lines = [
        "# Decision playbook",
        "",
        `**Situation:** ${situation}`,
        "",
        "Run these models in order. Keep each one short; carry the output of each into the next.",
        ""
    ];
    order.forEach((id, i) => {
        const m = byId.get(id);
        const role = id === "5x5" ? "Check perspective: does this deserve deep thought, or 5 minutes?" :
            id === "ooda" ? "Turn the conclusion into action and set when to loop again." :
                `Core analysis: ${m.tagline}`;
        lines.push(`${i + 1}. **${m.name}**: ${role}`, `   - Steps: ${m.steps.map(s => s.name).join(" → ")}`, `   - Output: ${m.output}`);
    });
    lines.push("", "**End with:** one decision, the first action, the metric to watch and the review date.");
    return { order, markdown: lines.join("\n") };
}
