import { NextResponse } from "next/server";
import { createSupabaseServerClient } from "@/lib/supabase/server";

const UUID_PATTERN =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

export async function POST(request: Request) {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
    error: userError
  } = await supabase.auth.getUser();

  if (userError || !user) {
    return NextResponse.json({ error: "Authentication required." }, { status: 401 });
  }

  const body = await request.json().catch(() => null);
  const organisationId =
    body && typeof body.organisationId === "string"
      ? body.organisationId.trim()
      : "";

  if (!UUID_PATTERN.test(organisationId)) {
    return NextResponse.json(
      { error: "A valid organization ID is required." },
      { status: 400 }
    );
  }

  const { data, error } = await supabase.rpc("create_thinklab_session", {
    p_organisation_id: organisationId
  });

  if (error) {
    if (error.code === "42501") {
      return NextResponse.json(
        { error: "You cannot create a session for that organization." },
        { status: 403 }
      );
    }
    if (error.code === "P0001") {
      return NextResponse.json(
        { error: "An active session already exists. Refresh the control room." },
        { status: 409 }
      );
    }

    if (error.code === "22023" || error.code === "22P02") {
      return NextResponse.json(
        { error: "A valid organization ID is required." },
        { status: 400 }
      );
    }

    console.error("ThinkLab session creation failed", {
      code: error.code
    });
    return NextResponse.json(
      { error: "The session could not be created. Please try again." },
      { status: 500 }
    );
  }

  const session = data?.[0];
  if (!session) {
    console.error("ThinkLab session creation returned no session");
    return NextResponse.json(
      { error: "The session could not be created. Please try again." },
      { status: 500 }
    );
  }

  return NextResponse.json({
    sessionId: session.session_id,
    joinCode: session.join_code
  });
}
