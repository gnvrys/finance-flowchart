export type QuestionOption = {
  label: string;
  nextNodeId: string;
};

export type QuestionNode = {
  id: string;
  type: "question";
  question: string;
  helperText?: string;
  options: QuestionOption[];
};

export type ResultNode = {
  id: string;
  type: "result";
  title: string;
  recommendation: string;
  rationale: string;
  nextSteps: string[];
  relatedResultIds?: string[];
};

export type FlowchartNode = QuestionNode | ResultNode;
