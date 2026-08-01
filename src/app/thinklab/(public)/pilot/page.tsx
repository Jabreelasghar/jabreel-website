import { PilotDetails, Registration, Shell } from "../components";
import { pilot } from "@/content/thinklab-pilot";

export default function Pilot(){return <Shell><main id="content">
  <section className="subhero pilot-hero"><p className="eyebrow">Proposed pilot · Pending approval</p><h1>Bring your judgement.<br/>No technical background required.</h1><p>Pilot details: {pilot.pilotDetails}. {pilot.institutionLabel}: {pilot.institution}.</p><a className="button primary" href="/thinklab/register">{pilot.registrationLabel}</a></section>
  <section className="section" id="pilot-details"><p className="eyebrow">Proposed pilot information</p><h2>What to expect</h2><div className="feature-row"><span>Paper-based</span><span>Highly interactive</span><span>No technical background required</span><span>Pending institutional approval</span></div><PilotDetails/></section>
  <section className="section split"><div><p className="eyebrow">Who might join?</p><h2>Curiosity matters more than experience.</h2></div><div className="lead"><ul className="checklist"><li>Students who use AI regularly—or rarely</li><li>Students unsure what responsible use means</li><li>Students seeking stronger academic and professional decisions</li><li>Students from any programme or discipline</li></ul><p>No programming, specialist AI knowledge or previous workshop experience would be required. Participation details will be confirmed before registration opens, subject to institutional approval.</p></div></section>
  <Registration/>
</main></Shell>}
