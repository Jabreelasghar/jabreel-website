import { createClient } from "@supabase/supabase-js";

const required = [
  "NEXT_PUBLIC_SUPABASE_URL",
  "SUPABASE_SERVICE_ROLE_KEY",
  "THINKLAB_DEMO_FACILITATOR_EMAIL",
  "THINKLAB_DEMO_FACILITATOR_PASSWORD"
];

for (const key of required) {
  if (!process.env[key]) {
    throw new Error(`Missing required environment variable: ${key}`);
  }
}

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
  { auth: { autoRefreshToken: false, persistSession: false } }
);

const email = process.env.THINKLAB_DEMO_FACILITATOR_EMAIL.trim().toLowerCase();
const password = process.env.THINKLAB_DEMO_FACILITATOR_PASSWORD;

const { data: existingUsers, error: listError } = await supabase.auth.admin.listUsers();
if (listError) throw listError;

let user = existingUsers.users.find(item => item.email?.toLowerCase() === email);
if (!user) {
  const { data, error } = await supabase.auth.admin.createUser({
    email,
    password,
    email_confirm: true,
    user_metadata: { display_name: "ThinkLab Demonstration Facilitator" }
  });
  if (error) throw error;
  user = data.user;
}

const { data: organisation, error: organisationError } = await supabase
  .from("organisations")
  .upsert(
    {
      name: "ThinkLab Demonstration Organisation",
      slug: "thinklab-demonstration",
      timezone: "Asia/Dubai",
      settings: { purpose: "milestone-1-demonstration" }
    },
    { onConflict: "slug" }
  )
  .select("id")
  .single();
if (organisationError) throw organisationError;

const { error: profileError } = await supabase.from("profiles").upsert({
  id: user.id,
  display_name: "ThinkLab Demonstration Facilitator",
  email
});
if (profileError) throw profileError;

const { error: membershipError } = await supabase
  .from("organisation_memberships")
  .upsert(
    {
      organisation_id: organisation.id,
      profile_id: user.id,
      role: "facilitator",
      status: "active",
      joined_at: new Date().toISOString()
    },
    { onConflict: "organisation_id,profile_id,role" }
  );
if (membershipError) throw membershipError;

console.log("ThinkLab Milestone 1 demonstration organisation and facilitator are ready.");
