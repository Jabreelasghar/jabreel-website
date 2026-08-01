import { Registration, Shell } from "../components";
import { pilot } from "@/content/thinklab-pilot";

export default function Register(){return <Shell><main id="content"><section className="subhero"><p className="eyebrow">Proposed pilot · Pending approval</p><h1>{pilot.registrationLabel}.</h1><p>The interest list is not yet open. Pilot details: {pilot.pilotDetails}. {pilot.institutionLabel}: {pilot.institution}.</p></section><Registration/></main></Shell>}
