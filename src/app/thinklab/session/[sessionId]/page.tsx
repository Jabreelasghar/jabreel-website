import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { getResolvedThinkLabTemplateVersion } from "@/lib/thinklab/templates/registry";
import { LiveParticipantExperience } from "./live-participant-experience";

export const metadata: Metadata = {
  title: "Live session · ThinkLab™",
  description: "Participant workspace for a live ThinkLab session."
};

type PageProps = { params: Promise<{ sessionId: string }> };

export default async function ThinkLabSessionPage({ params }: PageProps) {
  const { sessionId } = await params;
  const supabase = await createSupabaseServerClient();
  const { data: userData } = await supabase.auth.getUser();
  if (!userData.user) redirect("/thinklab/join");

  const [{ data: session }, { data: participant }] = await Promise.all([
    supabase
      .from("thinklab_sessions")
      .select("id, template_key, template_version, status, current_moment_id")
      .eq("id", sessionId)
      .maybeSingle(),
    supabase
      .from("thinklab_participants")
      .select("id, display_name, current_moment_id, status, last_seen_at")
      .eq("session_id", sessionId)
      .eq("profile_id", userData.user.id)
      .maybeSingle()
  ]);

  if (!session || !participant) {
    return <SessionUnavailable message="You have not joined this session, or it is no longer available." />;
  }

  const template = getResolvedThinkLabTemplateVersion(session.template_key, session.template_version);
  if (!template) {
    return <SessionUnavailable message="This session uses a template version that is not available." />;
  }

  const [{ data: releases }, { data: responses }] = await Promise.all([
    supabase
      .from("thinklab_moment_releases")
      .select("moment_id, status, updated_at")
      .eq("session_id", sessionId),
    supabase
      .from("thinklab_responses")
      .select("id, moment_id, payload, initial_locked_payload, status, version, updated_at")
      .eq("session_id", sessionId)
      .eq("participant_id", participant.id)
  ]);

  return (
    <LiveParticipantExperience
      session={session}
      participant={participant}
      template={template}
      initialReleases={releases ?? []}
      initialResponses={responses ?? []}
    />
  );
}

function SessionUnavailable({ message }: { message: string }) {
  return (
    <div className="min-h-screen bg-[#101b1d] px-6 text-[#e7ece8] grid place-items-center">
      <div className="max-w-xl border border-white/20 p-8">
        <p className="font-mono text-xs uppercase tracking-widest text-[#91a6a0]">ThinkLab</p>
        <h1 className="mt-5 text-4xl">Session not available</h1>
        <p className="mt-4 leading-7 text-[#b8c6c0]">{message}</p>
        <a className="mt-7 inline-block text-[#f1a484] underline" href="/thinklab/join">Return to join</a>
      </div>
    </div>
  );
}
