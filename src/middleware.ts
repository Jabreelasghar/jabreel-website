import type { NextRequest } from "next/server";
import { refreshSupabaseSession } from "@/lib/supabase/middleware";

export async function middleware(request: NextRequest) {
  return refreshSupabaseSession(request);
}

export const config = {
  matcher: [
    "/thinklab/facilitator/:path*",
    "/thinklab/join",
    "/thinklab/session/:path*",
    "/api/thinklab/facilitator/:path*"
  ]
};
