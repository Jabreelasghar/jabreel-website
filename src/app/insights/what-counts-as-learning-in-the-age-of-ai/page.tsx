import { EditorialPage } from "@/components/editorials/EditorialPage";
import { createEditorialMetadata, getPublishedEditorial } from "@/lib/editorials";

function requireEditorial() {
  const editorial = getPublishedEditorial("what-counts-as-learning-in-the-age-of-ai");
  if (!editorial) throw new Error("The first editorial must remain published.");
  return editorial;
}

const editorial = requireEditorial();
export const metadata = createEditorialMetadata(editorial);

export default function WhatCountsAsLearningPage() {
  return <EditorialPage editorial={editorial} />;
}
