# Money Priorities Quiz

A short, branching flowchart quiz that tells you what to focus on next with your money, and why, instead of pointing you at another long article. Answer a handful of yes/no questions about your situation (do you have a cushion for a surprise expense, are you capturing your full employer 401(k) match, do you have high-interest debt, and so on) and land on a single, clear result page with a recommendation and the reasoning behind it.

The question order and priorities are adapted from ideas widely discussed in personal finance communities like r/personalfinance, rewritten in original wording, not copied text or imagery.

## Why this exists

Personal finance education is everywhere, but most of it assumes you have time to read a book or dig through a wiki. This is a low-friction alternative: no account, no data entry beyond your quiz answers, no numeric calculators, just a quick path to "here's your priority right now."

## The full flow

Every question and every possible outcome, in one diagram. This mirrors `lib/flowchart/data.ts` exactly — if you edit that file, update this diagram too.

```mermaid
flowchart TD
    Q1{{"Could you cover a surprise expense without a credit card?"}}
    Q2{{"Does your income cover the essentials?"}}
    Q3{{"Does your employer offer a matching retirement plan?"}}
    Q4{{"Are you getting the full match?"}}
    Q5{{"Any debt above roughly 7-8% interest?"}}
    Q6{{"3-6 months of essential expenses saved?"}}
    Q7{{"Regularly funding an IRA or HSA beyond the match?"}}

    R1(["Build a Starter Cushion First"])
    R2(["Stabilize Income & Essential Expenses"])
    R3(["Capture Your Full Employer Match"])
    R4(["Pay Down High-Interest Debt"])
    R5(["Build a Full Emergency Fund"])
    R6(["Make Full Use of Tax-Advantaged Accounts"])
    R7(["Grow Wealth Further"])

    Q1 -->|No / not sure| R1
    Q1 -->|Yes| Q2
    Q2 -->|No| R2
    Q2 -->|Yes| Q3
    Q3 -->|No| Q5
    Q3 -->|Yes| Q4
    Q4 -->|No| R3
    Q4 -->|Yes| Q5
    Q5 -->|Yes| R4
    Q5 -->|No| Q6
    Q6 -->|No| R5
    Q6 -->|Yes| Q7
    Q7 -->|No| R6
    Q7 -->|Yes| R7
```

## Stack

- [Next.js](https://nextjs.org/) 16 (App Router) + TypeScript
- Tailwind CSS
- Built as a static export (`output: 'export'`), no backend server required

## Project structure

- `lib/flowchart/data.ts` — all quiz content lives here (questions, options, results, "not sure how to answer?" guidance, and each result's "if this still feels unclear" note and "Learn more" reading list). Editing or extending the quiz means editing this file only, no component changes needed.
- `lib/flowchart/engine.ts` / `types.ts` — the data model and small helpers (`getNode`, `isResultNode`, etc.)
- `app/quiz` — the interactive quiz flow (client-side state via `useReducer`)
- `app/result/[resultId]` — statically generated result pages, one per outcome
- `scripts/validate-flowchart.ts` — a graph-integrity check (every branch resolves, every result is reachable) that runs automatically before every build

## Development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Other scripts

- `npm run validate` — check the flowchart data for broken or unreachable branches
- `npm run build` — production build (runs `validate` first, then a static export to `out/`)
- `npm run lint` — ESLint

## Disclaimer

This quiz gives a general starting point, not a full financial plan or personalized financial advice.
