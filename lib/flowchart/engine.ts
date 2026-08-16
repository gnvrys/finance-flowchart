import { flowchartNodes, START_NODE_ID } from "./data";
import type { FlowchartNode, QuestionNode, ResultNode } from "./types";

export { START_NODE_ID };

export function getNode(nodeId: string): FlowchartNode {
  const node = flowchartNodes[nodeId];
  if (!node) {
    throw new Error(`Unknown flowchart node: ${nodeId}`);
  }
  return node;
}

export function isResultNode(node: FlowchartNode): node is ResultNode {
  return node.type === "result";
}

export function isQuestionNode(node: FlowchartNode): node is QuestionNode {
  return node.type === "question";
}

export function getAllResultIds(): string[] {
  return Object.values(flowchartNodes)
    .filter(isResultNode)
    .map((node) => node.id);
}
