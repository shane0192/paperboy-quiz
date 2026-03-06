import { motion, AnimatePresence } from "framer-motion";
import { questions } from "../data/quizData";

export default function Question({ questionIndex, onAnswer, onBack }) {
  const q = questions[questionIndex];

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={questionIndex}
        className="question-screen"
        initial={{ opacity: 0, x: 60 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -60 }}
        transition={{ duration: 0.3 }}
      >
        <button className="btn-back" onClick={onBack}>
          Back
        </button>

        <div className="progress-bar-container">
          <div className="progress-label">
            Question {questionIndex + 1} of {questions.length}
          </div>
          <div className="progress-track">
            <motion.div
              className="progress-fill"
              initial={{ width: `${(questionIndex / questions.length) * 100}%` }}
              animate={{
                width: `${((questionIndex + 1) / questions.length) * 100}%`,
              }}
              transition={{ duration: 0.4 }}
            />
          </div>
        </div>

        <h2 className="question-text">{q.question}</h2>

        <div className="options-list">
          {q.options.map((option, idx) => (
            <motion.button
              key={idx}
              className="option-btn"
              onClick={() => onAnswer(idx)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.08, duration: 0.25 }}
            >
              <span className="option-letter">
                {String.fromCharCode(65 + idx)}
              </span>
              <span className="option-text">{option.text}</span>
            </motion.button>
          ))}
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
