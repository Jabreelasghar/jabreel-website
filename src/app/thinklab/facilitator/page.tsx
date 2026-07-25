import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { getFacilitatorIdentity } from "@/lib/thinklab/facilitator-access";
import { getResolvedThinkLabTemplateVersion } from "@/lib/thinklab/templates/registry";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { FacilitatorConsole } from "./facilitator-console";
import { CreateSessionForm } from "./create-session-form";

export const metadata: Metadata = {
  title: "Facilitator · ThinkLab™ Trust Lab",
  description: "Live classroom control room for the ThinkLab Trust Lab."
};

export default async function FacilitatorPage({
  searchParams
}: {
  searchParams: Promise<{ session?: string }>;
}) {
  const identity = await getFacilitatorIdentity();
  if (!identity) redirect("/thinklab/facilitator/sign-in");

  const { session: requestedSessionId } = await searchParams;
  const supabase = await createSupabaseServerClient();
  let sessionQuery = supabase
    .from("thinklab_sessions")
    .select("id, organisation_id, join_code, template_key, template_version, status, current_moment_id, delivery_mode")
    .eq("facilitator_id", identity.user.id)
    .order("created_at", { ascending: false });
  if (requestedSessionId) sessionQuery = sessionQuery.eq("id", requestedSessionId);
  else sessionQuery = sessionQuery.in("status", ["live", "paused"]);

  const { data: sessions } = await sessionQuery.limit(1);
  const session = sessions?.[0];
  if (!session) {
    return (
      <div className="min-h-screen bg-[#101b1d] px-6 text-[#e7ece8] grid place-items-center">
        <div className="max-w-xl border border-white/20 p-8">
          <p className="font-mono text-xs uppercase tracking-widest text-[#91a6a0]">ThinkLab Facilitator</p>
          <h1 className="mt-5 text-4xl">Create a session</h1>
          <p className="mt-4 leading-7 text-[#b8c6c0]">
            Start the Trust Lab on individual participant devices. The welcome
            moment will be available immediately.
          </p>
          {identity.organisations.length ? (
            <CreateSessionForm organisations={identity.organisations} />
          ) : (
            <p role="alert" className="mt-8 text-sm text-[#f1a484]">
              No eligible organization membership is available. Ask an
              organization administrator to activate your facilitator access.
            </p>
          )}
        </div>
      </div>
    );
  }

  const template = getResolvedThinkLabTemplateVersion(
    session.template_key,
    session.template_version
  );
  if (!template) {
    return <div className="min-h-screen bg-[#101b1d] text-white grid place-items-center">Template version unavailable.</div>;
  }

  const [{ data: participants }, { data: responses }, { data: releases }] = await Promise.all([
    supabase
      .from("thinklab_participants")
      .select("id, display_name, current_moment_id, status, last_seen_at")
      .eq("session_id", session.id)
      .order("display_name"),
    supabase
      .from("thinklab_responses")
      .select("participant_id, moment_id, status")
      .eq("session_id", session.id),
    supabase
      .from("thinklab_moment_releases")
      .select("moment_id, status, updated_at")
      .eq("session_id", session.id)
  ]);

  return (
    <FacilitatorConsole
      facilitatorName={identity.user.user_metadata?.display_name ?? identity.user.email ?? "Facilitator"}
      organisationName={
        identity.organisations.find(
          organisation => organisation.id === session.organisation_id
        )?.name
      }
      initialSession={session}
      template={template}
      initialParticipants={participants ?? []}
      initialResponses={responses ?? []}
      initialReleases={releases ?? []}
    />
  );
}
