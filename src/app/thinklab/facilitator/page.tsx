import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { getFacilitatorIdentity } from "@/lib/thinklab/facilitator-access";
import { FacilitatorConsole } from "./facilitator-console";

export const metadata: Metadata = {
  title: "Facilitator · ThinkLab™ Trust Lab",
  description: "Facilitator console for the ThinkLab Trust Lab guided experience."
};

export default async function FacilitatorPage() {
  const identity = await getFacilitatorIdentity();
  if (!identity) {
    redirect("/thinklab/facilitator/sign-in");
  }
  return (
    <FacilitatorConsole
      facilitatorName={identity.user.user_metadata?.display_name ?? identity.user.email ?? "Facilitator"}
      organisationName={identity.organisation?.name}
    />
  );
}
