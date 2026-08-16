import { notFound } from "next/navigation";
import { flowchartNodes } from "@/lib/flowchart/data";
import { getAllResultIds, isResultNode } from "@/lib/flowchart/engine";
import ResultCard from "@/components/ResultCard";

export async function generateStaticParams() {
  return getAllResultIds().map((resultId) => ({ resultId }));
}

export default async function ResultPage({ params }: PageProps<"/result/[resultId]">) {
  const { resultId } = await params;
  const node = flowchartNodes[resultId];

  if (!node || !isResultNode(node)) {
    notFound();
  }

  const relatedResults = (node.relatedResultIds ?? [])
    .map((id) => flowchartNodes[id])
    .filter(isResultNode)
    .map((related) => ({ id: related.id, title: related.title }));

  return (
    <main className="mx-auto w-full max-w-xl flex-1 px-6 py-16">
      <ResultCard node={node} relatedResults={relatedResults} />
    </main>
  );
}
