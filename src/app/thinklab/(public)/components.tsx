"use client";
import { useState } from "react";
import { pilot, workshops } from "@/content/thinklab-pilot";

const nav = [["About","/thinklab/about"],["Workshops","/thinklab/workshops"],["Pilot","/thinklab/pilot"],["Research","/thinklab/research"],["FAQ","/thinklab/faq"]];
export function ThinkLabNav(){ const [open,setOpen]=useState(false); return <header className="tl-nav"><a className="back" href="/">← Jabreel Asghar</a><a className="brand" href="/thinklab">ThinkLab<span>™</span></a><button className="menu" onClick={()=>setOpen(!open)} aria-expanded={open} aria-controls="tl-menu">Menu</button><nav id="tl-menu" className={open?"open":""} aria-label="ThinkLab navigation">{nav.map(([n,u])=><a key={u} href={u}>{n}</a>)}<a className="nav-register" href="/thinklab/register">{pilot.registrationLabel}</a><a className="lang" href="/thinklab?lang=ar" lang="ar" dir="rtl">العربية</a></nav></header> }
export function Shell({children, variant="interior-v2"}: {children:React.ReactNode, variant?:string}){ return <div className={`thinklab-theme ${variant}`}><a className="skip" href="#content">Skip to content</a><ThinkLabNav/>{children}<a className="sticky-register" href="/thinklab/register">{pilot.registrationLabel}</a><footer><a className="brand" href="/thinklab">ThinkLab™</a><p>Human judgement is not a fallback. It is the work.</p><a href="/">Jabreel Asghar</a></footer></div> }
export function Pathway(){ const steps=["Initial decision","Reason recorded","New evidence appears","Discussion tests the judgement","Keep, revise or reverse","Reflection makes change visible","Optional field challenge"]; return <ol className="pathway">{steps.map((s,i)=><li key={s}><b>{String(i+1).padStart(2,"0")}</b><span>{s}</span></li>)}</ol> }
export function WorkshopGrid(){return <div className="workshop-grid">{workshops.map((w,i)=><article className={`workshop w${i+1}`} key={w[0]} tabIndex={0}><span className="number">0{i+1}</span><h3>{w[0]}</h3><h4>{w[1]}</h4><p>{w[2]}</p><span className="card-link">Explore experience →</span></article>)}</div>}
export function ActivityPreviews(){return <div className="activity-preview-grid">
  <article className="activity-preview preview-trust">
    <div className="preview-heading"><span>01 · Trust Lab</span><b>DECIDE</b></div>
    <div className="paper-fragment">
      <p className="scenario-label">11:57 PM · Three minutes left</p>
      <p className="scenario-copy">An AI answer looks convincing. Your assignment is due.</p>
      <p className="prompt">What would you do?</p>
      <ul className="decision-options" aria-label="Possible first decisions"><li>Approve it</li><li>Edit one part</li><li>Pause and check first</li></ul>
      <div className="context-reveal"><b>REVEAL</b><span>Missing evidence · Overreach · Convenient agreement</span></div>
      <p className="reconsider">Does your first judgement still hold?</p>
    </div>
  </article>
  <article className="activity-preview preview-decision">
    <div className="preview-heading"><span>02 · Decision Lab</span><b>QUESTION</b></div>
    <div className="paper-fragment">
      <p className="scenario-label">AI recommendation</p>
      <blockquote>“Computer Science is the best choice because graduates earn high salaries.”</blockquote>
      <p className="prompt">What hasn’t the recommendation asked?</p>
      <div className="context-reveal"><b>NEW CONTEXT</b><span>Interests · strengths · goals · circumstances</span></div>
      <div className="sequence" aria-label="Judgement sequence"><span>Recommendation</span><i>→</i><span>Missing context</span><i>→</i><strong>Reconsider</strong></div>
    </div>
  </article>
  <article className="activity-preview preview-responsibility">
    <div className="preview-heading"><span>03 · Responsibility Lab</span><b>ALLOCATE</b></div>
    <div className="paper-fragment">
      <p className="scenario-copy">A student must prepare and defend a five-minute presentation.</p>
      <p className="allocation-prompt">Where should each part of the work sit?</p>
      <div className="responsibility-columns" role="group" aria-label="Responsibility allocation"><span>AI may support</span><span>Shared work</span><span>Human must decide</span></div>
      <div className="response-lines" aria-hidden="true"><i/><i/><i/></div>
      <p className="prompt final-prompt">Who remains accountable for the result?</p>
    </div>
  </article>
  <article className="activity-preview preview-values">
    <div className="preview-heading"><span>05 · Values Lab</span><b>WEIGH</b></div>
    <div className="paper-fragment">
      <p className="scenario-copy">Declared AI proofreading is permitted, but paid tools provide stronger support than free tools.</p>
      <p className="prompt">What should matter most?</p>
      <ul className="value-options" aria-label="Values in tension"><li>Fairness</li><li>Accessibility</li><li>Learning</li><li>Independence</li></ul>
      <div className="context-pair"><p><b>FIRST CONTEXT</b><span>Low-stakes draft — improve clarity.</span></p><p><b>CONTEXT SHIFTS</b><span>Final assessed submission — clear writing is part of the learning outcome.</span></p></div>
      <p className="reconsider">Does your judgement still hold?</p>
    </div>
  </article>
</div>}
export function PilotDetails(){ const rows=[["Pilot details",pilot.pilotDetails],[pilot.institutionLabel,pilot.institution],["Campus",pilot.campus],["Schedule",pilot.dates],["Time",pilot.time],["Venue",pilot.venue],["Format",pilot.sessions],["Facilitator",pilot.facilitator]]; return <div className="pilot-details">{rows.filter(([,v])=>v).map(([k,v])=><div key={k}><dt>{k}</dt><dd>{v}</dd></div>)}</div> }
export function Registration(){ return <section className="registration" id="register"><div><p className="eyebrow light">Proposed pilot · Pending institutional approval</p><h2>{pilot.registrationLabel}</h2><p>Express your interest in receiving information if the proposed pilot is approved. This is not registration and does not confirm a place.</p></div><div className="register-panel"><h3>{pilot.pilotDetails}</h3><p>The interest-list form will appear here when an approved collection method is available. Pilot dates, participation arrangements and registration will be confirmed only after institutional approval.</p><p className="privacy">No personal information is being collected on this page. Joining a future interest list will not constitute registration or guarantee participation.</p><a className="button disabled" aria-disabled="true" href="/thinklab/pilot">View proposed pilot details</a></div></section> }
export function FAQList(){ const faqs=[
  ["What is ThinkLab?","A research-informed methodology for practising human judgement when AI influences decisions."],
  ["Is this an AI training course?","No. ThinkLab focuses on the human judgement required when AI influences academic, professional and everyday decisions."],
  ["Do I need to use ChatGPT?","No. The pilot is paper-based and does not require students to bring or use an AI tool."],
  ["Is the programme assessed?","The proposed pilot is intended to be co-curricular and unassessed, subject to institutional approval."],
  ["Do I need technical knowledge?","No. No programming or specialist AI knowledge is required."],
  ["Do I have to attend all six sessions?", pilot.attendancePolicy || "The attendance policy will be published when the pilot arrangements are confirmed."],
  ["Are places limited?","Capacity has not been confirmed. Any participation limit will be published before registration opens, subject to institutional approval."],
  ["Will I receive a certificate?","Certification has not been confirmed and will not be advertised unless formally approved."],
  ["What happens to my workshop responses?","Data-collection arrangements have not been approved. Participation information and any future research activity would be treated separately, with appropriate approvals and consent before research use."],
  ["Who facilitates ThinkLab?","Dr Jabreel Asghar works in higher education, assessment, academic quality, responsible AI, judgement and assessment integrity."],
 ]; return <div className="faq-list">{faqs.map(([q,a])=><details key={q}><summary>{q}</summary><p>{a}</p></details>)}</div> }
