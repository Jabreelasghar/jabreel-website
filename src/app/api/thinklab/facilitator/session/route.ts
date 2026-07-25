import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

function unavailable() {
  return NextResponse.json(
    { error: "Facilitator sign-in is temporarily unavailable." },
    { status: 503 }
  );
}

function createRouteClient(request: NextRequest, response: NextResponse) {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const publishableKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;
  if (!url || !publishableKey) return null;

  return createServerClient(url, publishableKey, {
    cookies: {
      getAll: () => request.cookies.getAll(),
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value, options }) =>
          response.cookies.set(name, value, options)
        );
      }
    }
  });
}

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => ({}));
  const email = typeof body.email === "string" ? body.email.trim() : "";
  const password = typeof body.password === "string" ? body.password : "";

  if (!email || !password) {
    return NextResponse.json(
      { error: "The sign-in details were not accepted. Please try again." },
      { status: 401 }
    );
  }

  const response = NextResponse.json({ authenticated: true });
  const supabase = createRouteClient(request, response);
  if (!supabase) return unavailable();

  const { data, error } = await supabase.auth.signInWithPassword({ email, password });
  if (error || !data.user) {
    return NextResponse.json(
      { error: "The sign-in details were not accepted. Please try again." },
      { status: 401 }
    );
  }

  const { data: membership, error: membershipError } = await supabase
    .from("organisation_memberships")
    .select("id")
    .eq("profile_id", data.user.id)
    .eq("role", "facilitator")
    .eq("status", "active")
    .limit(1)
    .maybeSingle();

  if (membershipError || !membership) {
    await supabase.auth.signOut();
    return NextResponse.json(
      { error: "The sign-in details were not accepted. Please try again." },
      { status: 403 }
    );
  }

  return response;
}

export async function DELETE(request: NextRequest) {
  const response = NextResponse.json({ authenticated: false });
  const supabase = createRouteClient(request, response);
  if (!supabase) return unavailable();
  await supabase.auth.signOut();
  return response;
}
