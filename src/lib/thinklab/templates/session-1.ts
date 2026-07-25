import type { ThinkLabTemplate } from "./types";

const responsesABC = [
  "Response A — AI summaries are useful because they save time and explain ideas clearly. For most university reading, they give students enough information to understand the main points. Reading every original article is not always necessary.",
  "Response B — AI summaries are useful for getting an overview of a topic. However, students should remember that summaries may leave out important information. Reading parts of the original source helps students understand the author's ideas more accurately.",
  "Response C — AI summaries are a helpful starting point for learning. Students can use them to prepare before class or review difficult topics. They should decide when they need to look at the original source depending on the purpose of their study."
];

export const trustLabSession1: ThinkLabTemplate = {
  key: "trust-lab-session-1",
  version: 1,
  sessionTitle: "The Trust Lab",
  moments: [
    {
      id: "welcome", section: "Before we begin", title: "Enter the Trust Lab",
      taskInstructions: "Notice what looks convincing. Question what deserves trust. Intervene before you use it.",
      prompts: ["Your name"],
      responseType: "text",
      notice: "New information is released in stages. Do not read ahead."
    },
    {
      id: "rules", section: "Before we begin", title: "Three rules",
      options: [
        "Make the first decision yourself — your first response is useful evidence about your thinking.",
        "Do not read ahead — new information is released in stages.",
        "You may change your mind — changing a decision after better evidence is judgement, not failure."
      ],
      maxChoices: 3,
      responseType: "multiple-choice",
      taskInstructions: "Acknowledge all three rules before continuing."
    },
    {
      id: "trap", section: "Opening · The Trap", title: "Which version would you save?",
      taskInstructions: "You have a class discussion in five minutes. You asked AI why regular exercise improves mental health. Choose the version you would save in your notes. Decide in 20 seconds.",
      sourceMaterial: "Regular exercise can improve mental health by reducing stress, supporting better sleep and increasing self-confidence. Physical activity also releases chemicals in the brain that can improve mood. Research shows that students who exercise three times a week are 42% less likely to experience anxiety. Exercise can therefore be an effective way to support mental wellbeing.",
      options: [
        "A — Exercise reduces stress, improves sleep and increases self-confidence. Students who exercise three times a week are 42% less likely to experience anxiety.",
        "B — Exercise may support mental health by reducing stress, improving sleep and supporting mood. The claim about students being 42% less likely to experience anxiety would need a source.",
        "C — Regular exercise is an effective way to improve mental wellbeing because it reduces stress and anxiety and releases helpful chemicals in the brain."
      ],
      responseType: "single-choice",
      evidenceBecomesVisible: true,
      lockResponse: true
    },
    {
      id: "look-again", section: "Opening reveal", title: "Look again",
      taskInstructions: "Mark the AI response: ✓ a claim you would keep; ? a claim that needs evidence; ! a claim that sounds stronger than the evidence provided.",
      prompts: ["What did you notice only after the vote?"],
      options: ["I noticed the problem before voting.", "I noticed it only after looking again.", "I am still not sure what the problem is."],
      responseType: "compound",
      contextRequiredFrom: ["trap"],
      revisesPreviousJudgement: "trap",
      notice: "A polished answer can feel reliable before it has earned your trust."
    },
    {
      id: "confidence-first", section: "Challenge 1 · First judgement", title: "Three plausible responses",
      taskInstructions: "Should university students rely on AI-generated summaries instead of reading original academic articles? Decide which response deserves the most trust — and explain why.",
      sourceMaterial: responsesABC.join("\n\n"),
      options: ["Response A", "Response B", "Response C"],
      responseType: "single-choice",
      evidenceBecomesVisible: true,
      lockResponse: true
    },
    {
      id: "language", section: "Challenge 1 · Evidence in language", title: "What influenced you?",
      taskInstructions: "Return to the three responses. Identify exactly three words or phrases that influenced your decision.",
      prompts: ["Word or phrase 1", "Word or phrase 2", "Word or phrase 3", "I trust Response ___ because…"],
      responseType: "compound",
      confidenceScale: true,
      contextRequiredFrom: ["confidence-first"],
      revisesPreviousJudgement: "confidence-first"
    },
    {
      id: "librarian", section: "Challenge 1 · New information", title: "A librarian’s note",
      sourceMaterial: "One response could encourage students to rely on AI more than they realise. Another recognises that summaries have limitations but may still underestimate how much context can be lost. The third leaves the decision to students but offers little guidance about how they should make that decision.",
      options: ["No", "Maybe", "Yes"],
      prompts: ["What are you reconsidering?"],
      responseType: "compound",
      contextRequiredFrom: ["confidence-first", "language"],
      evidenceBecomesVisible: true,
      revisesPreviousJudgement: "confidence-first",
      taskInstructions: "Has this changed your thinking?"
    },
    {
      id: "lecturer", section: "Challenge 1 · Purpose changes the decision", title: "A message from your lecturer",
      sourceMaterial: "Assignment requirement: compare the author’s argument with two other research papers.",
      options: ["Response A", "Response B", "Response C"],
      prompts: ["Why?"],
      responseType: "compound",
      contextRequiredFrom: ["confidence-first", "librarian"],
      evidenceBecomesVisible: true,
      revisesPreviousJudgement: "confidence-first",
      taskInstructions: "Which response would you trust now?"
    },
    {
      id: "context", section: "Challenge 1 · Context shift", title: "Now change the situation",
      sourceMaterial: "You are preparing for tomorrow’s lecture. There is no assessment. You simply want an overview before class.",
      options: ["No — my choice would not change.", "Yes — I would now choose a different response."],
      prompts: ["If yes, which response?", "What changed: the answer or the purpose?"],
      responseType: "compound",
      contextRequiredFrom: ["confidence-first", "lecturer"],
      evidenceBecomesVisible: true,
      revisesPreviousJudgement: "confidence-first",
      taskInstructions: "Would your choice change?"
    },
    {
      id: "direction", section: "Challenge 1 · Hidden direction", title: "What is each response quietly encouraging you to do?",
      prompts: ["Response A quietly encourages me to…", "Response B quietly encourages me to…", "Response C quietly encourages me to…", "Which response places the greatest responsibility on the student?"],
      responseType: "multiple-text",
      contextRequiredFrom: ["confidence-first"]
    },
    {
      id: "convincing", section: "Challenge 1 · Confidence is not trust", title: "Rate what you experienced",
      taskInstructions: "For each response, rate how convincing it sounds and how much trust it deserves. Use 1 = low and 5 = high.",
      prompts: ["Response A — convincing / trust", "Response B — convincing / trust", "Response C — convincing / trust"],
      responseType: "multiple-text",
      contextRequiredFrom: ["confidence-first"],
      notice: "A response can sound convincing without deserving the same level of trust."
    },
    {
      id: "sentence", section: "Challenge 1 · Final move", title: "One-sentence intervention",
      taskInstructions: "Choose the response you trusted most. Add only one sentence. It must make the response more responsible, accurate or useful.",
      prompts: ["My one sentence"],
      options: ["Evidence", "Accuracy", "Purpose", "Responsibility", "Something else"],
      responseType: "compound",
      contextRequiredFrom: ["confidence-first", "librarian", "lecturer", "context"],
      principle: "ThinkLab Principle 1 · Clear, confident and convenient are not the same as trustworthy."
    },
    {
      id: "inspect", section: "Challenge 2 · Human Intervention", title: "Inspect the answer",
      taskInstructions: "Do not reject the AI response. Intervene in it. Mark one part you would keep, one part that concerns you and one part that needs more information.",
      sourceMaterial: "Question: What effect does social media have on university students’ academic performance?\n\nAI response: Social media generally has a negative effect on university students’ academic performance. Students who use social media for more than three hours a day usually receive lower grades because they become distracted and spend less time studying. However, social media can also support learning by allowing students to communicate with classmates and access educational content. Universities should therefore limit students’ social media use and encourage them to use online platforms only for academic purposes.",
      prompts: ["Underline — one part you would keep", "Circle — one part that concerns you", "? — one part that needs more information"],
      responseType: "multiple-text",
      evidenceBecomesVisible: true
    },
    {
      id: "priority", section: "Challenge 2 · Prioritise", title: "What needs attention first?",
      taskInstructions: "You may identify several concerns. You must still choose the most important one.",
      options: ["The response makes a broad generalisation.", "The claim about three hours needs evidence.", "The recommendation may be too strong.", "The response does not distinguish different forms of social media use.", "Another issue"],
      prompts: ["The most important concern is…"],
      responseType: "compound",
      contextRequiredFrom: ["inspect"]
    },
    {
      id: "three-change", section: "Challenge 2 · Three-change rule", title: "Make the answer safer",
      taskInstructions: "Work with a partner. You may make only three changes. You may not rewrite the entire paragraph.",
      prompts: ["Change 1 — remove or replace one claim", "Change 2 — add one qualifying phrase", "Change 3 — add one sentence", "Our revised response"],
      responseType: "multiple-text",
      contextRequiredFrom: ["inspect", "priority"]
    },
    {
      id: "defend", section: "Challenge 2 · Defend", title: "Defend the intervention",
      prompts: ["We removed or replaced…", "…because", "We added the phrase…", "…because", "We added the sentence…", "…because"],
      responseType: "multiple-text",
      contextRequiredFrom: ["three-change"]
    },
    {
      id: "compare", section: "Challenge 2 · Compare", title: "Which intervention shows stronger judgement?",
      sourceMaterial: "Revision A: Social media can affect university students’ academic performance in different ways. Heavy use may distract some students and reduce the time available for study. However, social media can also support learning by allowing students to communicate with classmates and access educational content. Its effect may therefore depend on how, why and how often students use it.\n\nRevision B: Research proves that social media lowers university students’ grades when they use it for more than three hours each day. It can sometimes support communication, but universities should closely control students’ access to social media so that it does not interfere with their studies.",
      options: ["Revision A", "Revision B"],
      prompts: ["The phrase that most influenced me was…"],
      responseType: "compound",
      contextRequiredFrom: ["inspect", "three-change", "defend"],
      evidenceBecomesVisible: true,
      principle: "ThinkLab Principle 2 · Good AI use changes the reasoning, not merely the wording."
    },
    {
      id: "claim", section: "Challenge 3 · The Evidence Check", title: "You can investigate only one claim first",
      taskInstructions: "You do not have time to check everything. Decide what deserves attention first.",
      sourceMaterial: "AI response: Online learning improves academic performance because students can study at their own pace and access materials at any time. A 2024 international study found that students taking online courses achieved 18% higher grades than students in face-to-face classes. Online learning is also more inclusive because it allows all students to participate equally. Universities should therefore replace most traditional lectures with online learning.",
      options: ["A — Students can study at their own pace and access materials at any time.", "B — A 2024 international study found that online students achieved 18% higher grades.", "C — Online learning allows all students to participate equally.", "D — Universities should replace most traditional lectures with online learning."],
      prompts: ["I would check this claim first because…"],
      responseType: "compound",
      evidenceBecomesVisible: true
    },
    {
      id: "cards", section: "Challenge 3 · Evidence choice", title: "You may open only two evidence cards",
      taskInstructions: "Choose two. Then record what each helped you examine.",
      options: [
        "Card 1 · University News — students enjoyed flexibility and convenient lesson times.",
        "Card 2 · Research Study — 214 students; one private university; one business course; grades 18% higher; different teachers and assessments.",
        "Card 3 · Student Survey — 1,500 students; 71% convenience; 38% difficulty concentrating; 27% internet-access problems.",
        "Card 4 · Policy Report — outcomes depended on design, support, subject, access and assessment; no recommendation to replace either mode."
      ],
      maxChoices: 2,
      prompts: ["Card ___ helped me examine…", "Card ___ helped me examine…"],
      responseType: "compound",
      contextRequiredFrom: ["claim"],
      evidenceBecomesVisible: true
    },
    {
      id: "bias", section: "Challenge 3 · Select and use evidence", title: "Test—or confirm?",
      taskInstructions: "Did you choose evidence that tested your claim or evidence that supported your first opinion?",
      options: ["Tested the claim", "Supported my first opinion", "A mixture of both"],
      responseType: "single-choice",
      contextRequiredFrom: ["claim", "cards"]
    },
    {
      id: "claims", section: "Challenge 3 · Judge the claims", title: "Supported, uncertain or overstated?",
      taskInstructions: "Use S = reasonably supported; U = uncertain; M = misleading or overstated.",
      prompts: [
        "Students can study at their own pace and access materials at any time — S / U / M",
        "Online students achieve 18% higher grades — S / U / M",
        "Online learning allows all students to participate equally — S / U / M",
        "Universities should replace most traditional lectures with online learning — S / U / M",
        "Which claim changed most after you examined the evidence?"
      ],
      responseType: "multiple-text",
      contextRequiredFrom: ["claim", "cards", "bias"],
      revisesPreviousJudgement: "claim"
    },
    {
      id: "conclusion", section: "Challenge 3 · Right-size the conclusion", title: "Choose the most defensible conclusion",
      options: [
        "A — Universities should replace traditional lectures because online learning leads to higher grades.",
        "B — Universities should use more online learning because students prefer flexible study.",
        "C — Universities should decide how to combine online and face-to-face learning based on course design, student needs and available support.",
        "D — Universities should allow students to choose whichever form of learning they prefer."
      ],
      prompts: ["It is more defensible because…"],
      responseType: "compound",
      contextRequiredFrom: ["claim", "cards", "claims"],
      revisesPreviousJudgement: "claim"
    },
    {
      id: "final-defence", section: "Challenge 3 · Final defence", title: "Defend your judgement",
      taskInstructions: "Complete both statements with a partner.",
      prompts: ["We would not use the original AI response without changes because it…", "The strongest evidence was Card ___ because…"],
      responseType: "multiple-text",
      contextRequiredFrom: ["claim", "cards", "claims", "conclusion"],
      principle: "ThinkLab Principle 3 · The stronger the claim, the stronger the evidence it requires."
    },
    {
      id: "reflection", section: "Close", title: "Your judgement changed the answer",
      taskInstructions: "Complete all four statements.",
      prompts: ["I noticed…", "I questioned…", "I changed…", "The next time I use AI, I will…"],
      responseType: "multiple-text",
      contextRequiredFrom: ["confidence-first", "sentence", "three-change", "claim", "cards", "conclusion", "final-defence"],
      notice: "AI can produce an answer. You remain responsible for deciding what deserves trust."
    }
  ]
};
