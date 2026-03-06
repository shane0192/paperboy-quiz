import { motion } from "framer-motion";

export default function Landing({ onStart }) {
  return (
    <motion.div
      className="landing"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4 }}
    >
      <div className="landing-badge">FREE QUIZ</div>
      <h1>Find Out the #1 Way to Monetize Your Audience</h1>
      <p className="landing-sub">
        Answer 5 quick questions. Takes under 2 minutes.
      </p>
      <button className="btn-primary" onClick={onStart}>
        Start Quiz →
      </button>
      <p className="landing-note">
        Join 2,000+ creators who've taken the quiz
      </p>
    </motion.div>
  );
}
