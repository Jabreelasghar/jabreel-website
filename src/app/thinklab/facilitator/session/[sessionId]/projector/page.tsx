import type { Metadata } from "next";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { getFacilitatorIdentity } from "@/lib/thinklab/facilitator-access";
import { getResolvedThinkLabTemplateVersion } from "@/lib/thinklab/templates/registry";
import { ProjectorExperience } from "./projector-experience";

export const metadata: Metadata = {
  title: "Projector View · ThinkLab™",
  description: "Classroom-facing ThinkLab content."
};

export default async function ProjectorPage({
  params
}: {
  params: Promise<{ sessionId: string }>;
}) {
  const identity = await getFacilitatorIdentity();
  if (!identity) return <ProjectorUnavailable />;

  const { sessionId } = await params;
  const supabase = await createSupabaseServerClient();
  const { data: session } = await supabase
    .from("thinklab_sessions")
    .select("id, template_key, template_version, status, current_moment_id")
    .eq("id", sessionId)
    .eq("facilitator_id", identity.user.id)
    .maybeSingle();

  if (!session) return <ProjectorUnavailable />;
  const template = getResolvedThinkLabTemplateVersion(
    session.template_key,
    session.template_version
  );
  if (!template) return <ProjectorUnavailable />;

  return <ProjectorExperience initialSession={session} template={template} />;
}

function ProjectorUnavailable() {
  return (
    <main className="min-h-screen bg-[#101b1d] text-[#e7ece8] grid place-items-center px-8">
      <section className="max-w-2xl text-center">
        <p className="font-mono uppercase tracking-widest text-sm text-[#91a6a0]">ThinkLab Projector View</p>
        <h1 className="mt-6 text-6xl">Display unavailable</h1>
        <p className="mt-5 text-xl text-[#b8c6c0]">Sign in as the authorised facilitator and open Projector View from the session control room.</p>
      </section>
    </main>
  );
}
