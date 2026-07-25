import "server-only";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export async function getFacilitatorIdentity() {
  let supabase;
  try {
    supabase = await createSupabaseServerClient();
  } catch {
    return null;
  }
  const {
    data: { user },
    error: userError
  } = await supabase.auth.getUser();

  if (userError || !user) return null;

  const { data: memberships, error: membershipError } = await supabase
    .from("organisation_memberships")
    .select(
      "id, organisation_id, role, organisations!inner(id, name, slug, status)"
    )
    .eq("profile_id", user.id)
    .in("role", ["facilitator", "organisation_administrator"])
    .eq("status", "active")
    .eq("organisations.status", "active")
    .order("created_at");

  if (membershipError) return null;

  const eligibleOrganisations = (memberships ?? []).flatMap(membership => {
    const organisations = membership.organisations as unknown as
      | { id: string; name: string; slug: string; status: "active" }
      | { id: string; name: string; slug: string; status: "active" }[]
      | null;
    return organisations ? (Array.isArray(organisations) ? organisations : [organisations]) : [];
  });

  return {
    user,
    memberships: memberships ?? [],
    organisations: eligibleOrganisations,
    organisation: eligibleOrganisations[0]
  };
}
