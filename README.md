# Paperboy Quiz — "What Should I Sell?"

Top-of-funnel lead magnet quiz that helps creators and entrepreneurs discover the #1 way to monetize their audience. Captures emails via Kit (ConvertKit) and tags subscribers with their quiz result for segmented follow-up.

## How It Works

1. Landing page with CTA to start the quiz
2. 5 multiple-choice questions (auto-advances on selection)
3. Email capture gate before showing results
4. Personalized result page with one of 4 monetization paths:
   - **Digital Product** (course, template, toolkit)
   - **Paid Newsletter / Membership**
   - **Coaching / Consulting / Services**
   - **Sponsorships / Brand Deals**

## Tech Stack

- React + Vite
- Framer Motion (animations)
- Kit (ConvertKit) V4 API for email capture
- Hosted on Vercel

## Setup

```bash
npm install
npm run dev
```

### Environment Variables

Create a `.env.local` file (or set in Vercel dashboard):

```
VITE_KIT_FORM_ID=your_form_id
VITE_KIT_API_KEY=your_api_key
```

## CTA Keyword

"Comment QUIZ" — triggered via ManyChat, links to this quiz.
