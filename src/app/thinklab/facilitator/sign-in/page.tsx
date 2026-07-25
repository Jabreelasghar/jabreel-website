import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { getFacilitatorIdentity } from "@/lib/thinklab/facilitator-access";
import { FacilitatorSignIn } from "./sign-in";

export const metadata: Metadata = {
  title: "Facilitator sign in · ThinkLab™",
  description: "Secure facilitator access to the ThinkLab Trust Lab."
};

export default async function FacilitatorSignInPage() {
  if (await getFacilitatorIdentity()) {
    redirect("/thinklab/facilitator");
  }
  return <FacilitatorSignIn />;
}
