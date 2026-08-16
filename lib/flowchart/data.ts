import type { FlowchartNode } from "./types";

export const START_NODE_ID = "q1_cushion";

export const flowchartNodes: Record<string, FlowchartNode> = {
  q1_cushion: {
    id: "q1_cushion",
    type: "question",
    question:
      "Could you handle a surprise expense of a few hundred dollars right now, like a car repair or a vet bill, without putting it on a credit card?",
    options: [
      { label: "No / not sure", nextNodeId: "r_starter_cushion" },
      { label: "Yes", nextNodeId: "q2_essentials" },
    ],
  },
  q2_essentials: {
    id: "q2_essentials",
    type: "question",
    question:
      "Is your income covering the basics right now: rent or mortgage, utilities, food, transportation, and at least the minimum payments on any debt?",
    helperText: "This means the essentials, not everything you'd like to spend on.",
    options: [
      { label: "No", nextNodeId: "r_stabilize_essentials" },
      { label: "Yes", nextNodeId: "q3_match_offered" },
    ],
  },
  q3_match_offered: {
    id: "q3_match_offered",
    type: "question",
    question:
      "Does your employer offer a 401(k), 403(b), or similar retirement plan that matches part of what you put in?",
    options: [
      { label: "No", nextNodeId: "q5_high_interest_debt" },
      { label: "Yes", nextNodeId: "q4_capturing_match" },
    ],
  },
  q4_capturing_match: {
    id: "q4_capturing_match",
    type: "question",
    question: "Are you putting in enough to get the full match, or more?",
    options: [
      { label: "No", nextNodeId: "r_capture_match" },
      { label: "Yes", nextNodeId: "q5_high_interest_debt" },
    ],
  },
  q5_high_interest_debt: {
    id: "q5_high_interest_debt",
    type: "question",
    question:
      "Do you have debt sitting above roughly 7 to 8% interest, like most credit cards or many personal loans?",
    helperText: "Mortgages and typical federal student loans usually don't count here.",
    options: [
      { label: "Yes", nextNodeId: "r_attack_high_interest_debt" },
      { label: "No", nextNodeId: "q6_full_emergency_fund" },
    ],
  },
  q6_full_emergency_fund: {
    id: "q6_full_emergency_fund",
    type: "question",
    question:
      "Do you have three to six months of essential expenses saved somewhere accessible, separate from your starter cushion?",
    options: [
      { label: "No", nextNodeId: "r_full_emergency_fund" },
      { label: "Yes", nextNodeId: "q7_tax_advantaged" },
    ],
  },
  q7_tax_advantaged: {
    id: "q7_tax_advantaged",
    type: "question",
    question:
      "Are you regularly putting money into a tax-advantaged account beyond the employer match, like a Roth or traditional IRA, or an HSA if you qualify for one?",
    options: [
      { label: "No", nextNodeId: "r_tax_advantaged_accounts" },
      { label: "Yes", nextNodeId: "r_grow_further" },
    ],
  },

  r_starter_cushion: {
    id: "r_starter_cushion",
    type: "result",
    title: "Build a Starter Cushion First",
    recommendation:
      "Set aside a small cushion before anything else, often somewhere around $500 to $1,000, though any amount you can realistically reach works. Keep it somewhere you can get to quickly. Pause extra debt payments (just cover the minimums) and cut non-essential spending until it's built.",
    rationale:
      "Without that cushion, a single surprise expense usually ends up on a credit card. A small buffer breaks that cycle before it starts.",
    nextSteps: [
      "Open or use a separate savings account.",
      "Set up a small automatic transfer.",
      "Keep paying at least the minimums on existing debt.",
    ],
    relatedResultIds: ["r_stabilize_essentials"],
  },
  r_stabilize_essentials: {
    id: "r_stabilize_essentials",
    type: "result",
    title: "Stabilize Your Income and Essential Expenses",
    recommendation:
      "Get your income to a point where it reliably covers the basics, housing, utilities, food, transportation, and minimum debt payments, before worrying about saving or investing.",
    rationale:
      "Savings and investing plans only hold up if the basics are covered first. Build on shaky ground and it tends to fall apart.",
    nextSteps: [
      "Separate essential spending from everything else.",
      "Check which fixed costs you might be able to renegotiate or cut.",
      "Look into assistance programs if the gap is about income rather than spending.",
    ],
    relatedResultIds: ["r_starter_cushion"],
  },
  r_capture_match: {
    id: "r_capture_match",
    type: "result",
    title: "Capture Your Full Employer Match",
    recommendation: "Raise your retirement contribution until you're getting the full employer match.",
    rationale:
      "A match is money you don't have to earn yourself. It's often an instant 50 to 100% return, better than almost anything else available to you.",
    nextSteps: [
      "Check your plan's exact match formula.",
      "Adjust your contribution percentage through payroll or your provider.",
      "After this, high-interest debt and building up your emergency fund are usually next.",
    ],
    relatedResultIds: ["r_attack_high_interest_debt"],
  },
  r_attack_high_interest_debt: {
    id: "r_attack_high_interest_debt",
    type: "result",
    title: "Pay Down High-Interest Debt",
    recommendation:
      "Put extra money toward debt above roughly 7 to 8% interest, starting with the highest rate (or the smallest balance first, if you want quicker wins), while still covering minimums on everything else.",
    rationale:
      "High-interest debt is a guaranteed loss sitting on your balance sheet. Paying it off is about as close to a risk-free, high-return move as you'll find.",
    nextSteps: [
      "List every debt with its balance and rate.",
      "Pick a payoff order.",
      "Look carefully at a lower-rate consolidation option if one's available.",
    ],
    relatedResultIds: ["r_full_emergency_fund"],
  },
  r_full_emergency_fund: {
    id: "r_full_emergency_fund",
    type: "result",
    title: "Build a Full Emergency Fund",
    recommendation:
      "Grow your savings to roughly three to six months of essential expenses, kept somewhere safe and accessible, like a high-yield savings account, not invested in the market.",
    rationale:
      "A fuller fund keeps you from having to sell investments at a bad time, or sliding back into debt if you lose income or hit a bigger emergency.",
    nextSteps: [
      "Estimate your monthly essentials to set a target.",
      "Consider a high-yield savings account.",
      "Lean toward the higher end if your income is variable.",
    ],
    relatedResultIds: ["r_tax_advantaged_accounts"],
  },
  r_tax_advantaged_accounts: {
    id: "r_tax_advantaged_accounts",
    type: "result",
    title: "Make Full Use of Tax-Advantaged Accounts",
    recommendation:
      "Beyond the match, put more into the tax-advantaged accounts available to you: an IRA (Roth or traditional), and an HSA if you have a qualifying high-deductible health plan.",
    rationale:
      "These accounts come with tax benefits an ordinary brokerage account doesn't have, so your money tends to go further over time.",
    nextSteps: [
      "Weigh Roth against traditional based on your current and expected tax situation.",
      "Treat an eligible HSA as a stealth retirement account.",
      "Automate the contributions.",
    ],
    relatedResultIds: ["r_grow_further"],
  },
  r_grow_further: {
    id: "r_grow_further",
    type: "result",
    title: "Grow Wealth Further",
    recommendation:
      "With the fundamentals covered, put extra money toward taxable investing, specific savings goals, or paying down remaining low-interest debt faster.",
    rationale:
      "There's no single right answer here. It comes down to your goals and preferences, not urgency, since the highest-value moves are already handled.",
    nextSteps: [
      "Get clear on your goals and timelines.",
      "Consider a simple, diversified approach for long-term investing.",
      "Weigh extra debt paydown against investing.",
    ],
    relatedResultIds: ["r_tax_advantaged_accounts"],
  },
};
