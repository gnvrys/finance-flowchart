export type QuestionOption = {
  label: string;
  nextNodeId: string;
};

export type QuestionNode = {
  id: string;
  type: "question";
  question: string;
  helperText?: string;
  notSureHelp?: string;
  options: QuestionOption[];
};

export type LearnMoreEntry = {
  title: string;
  author?: string;
  url?: string;
};

export type ResultNode = {
  id: string;
  type: "result";
  title: string;
  recommendation: string;
  rationale: string;
  nextSteps: string[];
  relatedResultIds?: string[];
  ifUnclear?: string;
  learnMore?: LearnMoreEntry[];
};

export type FlowchartNode = QuestionNode | ResultNode;
