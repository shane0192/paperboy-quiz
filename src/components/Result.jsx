import { motion } from "framer-motion";

export default function Result({ result, onRestart }) {
  const shareText = `I just found out the #1 way to monetize my audience: ${result.headline.replace("Your #1 Move: ", "")}! Take the free quiz:`;

  const handleShare = async () => {
    const shareUrl = window.location.origin;
    if (navigator.share) {
      try {
        await navigator.share({
          title: "What Should I Sell? Quiz",
          text: shareText,
          url: shareUrl,
        });
      } catch {
        // user cancelled
      }
    } else {
      const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`;
      window.open(twitterUrl, "_blank");
    }
  };

  return (
    <motion.div
      className="result-screen"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h1 className="result-headline">{result.headline}</h1>

      <div className="result-body">
        {result.body.split("\n\n").map((p, i) => (
          <p key={i}>{p}</p>
        ))}
      </div>

      <div className="result-steps">
        <h3>Your Next 3 Steps:</h3>
        <ol>
          {result.steps.map((step, i) => (
            <motion.li
              key={i}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 + i * 0.15 }}
            >
              {step}
            </motion.li>
          ))}
        </ol>
      </div>

      <div className="result-cta">
        <p>{result.cta.text}</p>
        <a href={result.cta.url} className="btn-primary">
          {result.cta.label}
        </a>
      </div>

      <div className="result-actions">
        <button className="btn-share" onClick={handleShare}>
          Share Your Result
        </button>
        <button className="btn-restart" onClick={onRestart}>
          Retake Quiz
        </button>
      </div>
    </motion.div>
  );
}
