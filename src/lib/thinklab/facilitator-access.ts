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
    .select("id, organisation_id, role, organisations(id, name, slug)")
    .eq("profile_id", user.id)
    .eq("role", "facilitator")
    .eq("status", "active")
    .limit(1);

  if (membershipError || !memberships?.length) return null;

  const organisations = memberships[0].organisations as unknown as
    | { id: string; name: string; slug: string }
    | { id: string; name: string; slug: string }[]
    | null;
  const organisation = Array.isArray(organisations) ? organisations[0] : organisations;

  return {
    user,
    membership: memberships[0],
    organisation
  };
}
