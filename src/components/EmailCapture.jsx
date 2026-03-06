import { useState } from "react";
import { motion } from "framer-motion";

export default function EmailCapture({ onSubmit }) {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) return;

    setLoading(true);
    setError("");

    try {
      await onSubmit({ email, name });
    } catch (err) {
      setError("Something went wrong. Please try again.");
      setLoading(false);
    }
  };

  return (
    <motion.div
      className="email-screen"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4 }}
    >
      <h2>Your results are ready!</h2>
      <p className="email-sub">
        Enter your email to see your personalized monetization plan.
      </p>

      <form onSubmit={handleSubmit} className="email-form">
        <input
          type="text"
          placeholder="First name (optional)"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="input-field"
        />
        <input
          type="email"
          placeholder="Your email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="input-field"
        />
        {error && <p className="error-text">{error}</p>}
        <button
          type="submit"
          className="btn-primary"
          disabled={loading || !email}
        >
          {loading ? "Loading..." : "See My Results →"}
        </button>
      </form>

      <p className="email-privacy">
        No spam. Unsubscribe anytime.
      </p>
    </motion.div>
  );
}
