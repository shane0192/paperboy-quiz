export const questions = [
  {
    id: 1,
    question: "How big is your current audience across all platforms?",
    options: [
      { text: "Under 1,000", scores: { A: 2, B: 1, C: 3, D: 0 } },
      { text: "1,000–5,000", scores: { A: 3, B: 2, C: 3, D: 1 } },
      { text: "5,000–25,000", scores: { A: 3, B: 3, C: 2, D: 2 } },
      { text: "25,000+", scores: { A: 2, B: 3, C: 1, D: 3 } },
    ],
  },
  {
    id: 2,
    question: "Do you currently have an email list or newsletter?",
    options: [
      { text: "No, not yet", scores: { A: 2, B: 0, C: 3, D: 1 } },
      { text: "Yes, under 1,000 subscribers", scores: { A: 3, B: 2, C: 2, D: 1 } },
      { text: "Yes, 1,000–10,000 subscribers", scores: { A: 2, B: 3, C: 1, D: 2 } },
      { text: "Yes, 10,000+ subscribers", scores: { A: 2, B: 3, C: 1, D: 3 } },
    ],
  },
  {
    id: 3,
    question: "What best describes your current revenue from your audience?",
    options: [
      { text: "I'm not making any money from it yet", scores: { A: 2, B: 1, C: 3, D: 0 } },
      { text: "Under $1,000/month", scores: { A: 3, B: 2, C: 2, D: 1 } },
      { text: "$1,000–$5,000/month", scores: { A: 3, B: 3, C: 2, D: 2 } },
      { text: "$5,000+/month", scores: { A: 2, B: 3, C: 1, D: 3 } },
    ],
  },
  {
    id: 4,
    question: "How much time do you spend on content per week?",
    options: [
      { text: "Under 5 hours", scores: { A: 2, B: 1, C: 3, D: 0 } },
      { text: "5–15 hours", scores: { A: 3, B: 2, C: 2, D: 1 } },
      { text: "15–30 hours", scores: { A: 2, B: 3, C: 1, D: 2 } },
      { text: "30+ hours (it's my full-time focus)", scores: { A: 2, B: 3, C: 1, D: 3 } },
    ],
  },
  {
    id: 5,
    question: "What sounds most appealing to you?",
    options: [
      { text: "Passive income that runs in the background", scores: { A: 3, B: 1, C: 0, D: 1 } },
      { text: "A small number of high-paying clients or customers", scores: { A: 1, B: 0, C: 3, D: 0 } },
      { text: "A large community of people paying a smaller amount", scores: { A: 1, B: 3, C: 0, D: 1 } },
      { text: "Partnering with brands and sponsors", scores: { A: 0, B: 1, C: 0, D: 3 } },
    ],
  },
];

export const results = {
  A: {
    path: "digital_product",
    tag: "quiz_result_digital_product",
    headline: "Your #1 Move: Build a Digital Product",
    emoji: "",
    body: `Based on your audience size and goals, the fastest path to revenue is a focused digital product — something like a template library, a mini-course, or a toolkit that solves one specific problem your audience has.

You don't need a huge list. You need a clear offer and a simple funnel to get it in front of people.`,
    steps: [
      "Identify the #1 question your audience keeps asking you",
      "Package your answer into a simple, actionable product (template, guide, or mini-course)",
      "Set up a landing page and a 3-email launch sequence to drive sales",
    ],
    cta: {
      text: "Want help building the growth engine behind this?",
      label: "Learn How Paperboy Can Help →",
      url: "https://www.paperboystudios.co/",
    },
  },
  B: {
    path: "paid_newsletter",
    tag: "quiz_result_paid_newsletter",
    headline: "Your #1 Move: Launch a Paid Newsletter or Membership",
    emoji: "",
    body: `You've already got an engaged audience and you're producing content consistently. That puts you in an ideal position to monetize through a paid tier or membership.

The key is giving your paying subscribers something they can't get from the free version — whether that's deeper analysis, exclusive access, or a community.`,
    steps: [
      "Audit your best-performing free content to find what your audience values most",
      "Create a premium tier that goes deeper — think exclusive insights, templates, or community access",
      "Launch with a founding member offer to your existing list at a discounted rate",
    ],
    cta: {
      text: "Want to see how much your newsletter could be worth?",
      label: "Try the Revenue Calculator →",
      url: "https://calculator.paperboystudios.co/",
    },
  },
  C: {
    path: "coaching_consulting",
    tag: "quiz_result_coaching_consulting",
    headline: "Your #1 Move: Offer a High-Ticket Service",
    emoji: "",
    body: `You don't need a massive audience to make real money. With your current setup, the fastest path is a coaching offer, consulting package, or done-for-you service priced at $500+ per client.

Even 5–10 clients a month at that level changes everything. The audience you're building becomes your lead generation engine.`,
    steps: [
      "Define a specific outcome you can deliver for clients in 30–90 days",
      "Create a simple application or booking page — don't overthink the funnel",
      "Use your content to demonstrate expertise and drive inbound leads",
    ],
    cta: {
      text: "Want help turning your audience into a client pipeline?",
      label: "Learn How Paperboy Can Help →",
      url: "https://www.paperboystudios.co/",
    },
  },
  D: {
    path: "sponsorships",
    tag: "quiz_result_sponsorships",
    headline: "Your #1 Move: Land Brand Partnerships",
    emoji: "",
    body: `With your audience size and content volume, you're in a strong position to attract sponsors. But here's the thing most creators miss — sponsorship revenue has a ceiling, and it disappears when the sponsor leaves.

The smartest play is to use sponsorships as supplemental income while building owned revenue streams underneath.`,
    steps: [
      "Create a simple media kit with your audience demographics, reach, and engagement rates",
      "Start reaching out to brands that already align with your content niche",
      "Pair sponsorship income with a newsletter to build an owned asset that compounds",
    ],
    cta: {
      text: "Want to see what your audience is actually worth beyond sponsorships?",
      label: "Try the Revenue Calculator →",
      url: "https://calculator.paperboystudios.co/",
    },
  },
};

export function calculateResult(answers) {
  const totals = { A: 0, B: 0, C: 0, D: 0 };

  answers.forEach((answerIndex, questionIndex) => {
    const scores = questions[questionIndex].options[answerIndex].scores;
    totals.A += scores.A;
    totals.B += scores.B;
    totals.C += scores.C;
    totals.D += scores.D;
  });

  const winner = Object.entries(totals).reduce((best, [key, val]) =>
    val > best[1] ? [key, val] : best
  , ["A", 0]);

  return { resultKey: winner[0], scores: totals };
}
