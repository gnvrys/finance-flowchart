import { flowchartNodes, START_NODE_ID } from "../lib/flowchart/data";
import { isQuestionNode, isResultNode } from "../lib/flowchart/engine";

function fail(message: string): never {
  console.error(`Flowchart validation failed: ${message}`);
  process.exit(1);
}

const allNodes = Object.values(flowchartNodes);

for (const [key, node] of Object.entries(flowchartNodes)) {
  if (key !== node.id) {
    fail(`Node stored under key "${key}" has mismatched id "${node.id}".`);
  }
}

if (!flowchartNodes[START_NODE_ID]) {
  fail(`START_NODE_ID "${START_NODE_ID}" does not exist in flowchartNodes.`);
}

for (const node of allNodes) {
  if (isQuestionNode(node)) {
    if (node.options.length < 2) {
      fail(`Question "${node.id}" has fewer than 2 options.`);
    }
    for (const option of node.options) {
      if (!flowchartNodes[option.nextNodeId]) {
        fail(
          `Question "${node.id}" option "${option.label}" points to missing node "${option.nextNodeId}".`
        );
      }
    }
  }
}

const reachable = new Set<string>();
const queue = [START_NODE_ID];
while (queue.length > 0) {
  const currentId = queue.shift()!;
  if (reachable.has(currentId)) continue;
  reachable.add(currentId);
  const node = flowchartNodes[currentId];
  if (isQuestionNode(node)) {
    for (const option of node.options) {
      queue.push(option.nextNodeId);
    }
  }
}

const unreachableResults = allNodes.filter((node) => isResultNode(node) && !reachable.has(node.id));
if (unreachableResults.length > 0) {
  fail(`Unreachable result node(s): ${unreachableResults.map((n) => n.id).join(", ")}`);
}

for (const node of allNodes) {
  if (isResultNode(node)) {
    for (const relatedId of node.relatedResultIds ?? []) {
      if (!flowchartNodes[relatedId]) {
        fail(`Result "${node.id}" has relatedResultIds entry pointing to missing node "${relatedId}".`);
      }
    }
  }
}

console.log(
  `Flowchart validation passed: ${allNodes.length} nodes, ${reachable.size} reachable from start, ${
    allNodes.filter(isResultNode).length
  } result nodes.`
);
