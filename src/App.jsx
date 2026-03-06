import { useState, useCallback } from "react";
import { AnimatePresence } from "framer-motion";
import Landing from "./components/Landing";
import Question from "./components/Question";
import EmailCapture from "./components/EmailCapture";
import Result from "./components/Result";
import { questions, results, calculateResult } from "./data/quizData";

const API_KEY = import.meta.env.VITE_KIT_API_KEY;

const TAG_IDS = {
  quiz_result_digital_product: 17167287,
  quiz_result_paid_newsletter: 17167304,
  quiz_result_coaching_consulting: 17167305,
  quiz_result_sponsorships: 17167306,
};

async function subscribeToKit({ email, name, tag, answers }) {
  if (!API_KEY) {
    console.warn("Kit API key not configured — skipping subscription");
    return;
  }

  // Build custom fields from quiz answers
  const fields = {};
  answers.forEach((answerIndex, qIndex) => {
    const q = questions[qIndex];
    fields[`quiz_q${qIndex + 1}`] = q.options[answerIndex].text;
  });
  fields.quiz_result = tag.replace("quiz_result_", "").replace(/_/g, " ");

  // Step 1: Create/update subscriber with custom fields
  const res = await fetch("https://api.kit.com/v4/subscribers", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Kit-Api-Key": API_KEY,
    },
    body: JSON.stringify({
      email_address: email,
      first_name: name || undefined,
      fields,
    }),
  });

  if (!res.ok) {
    throw new Error("Subscription failed");
  }

  // Step 2: Tag the subscriber
  const tagId = TAG_IDS[tag];
  if (tagId) {
    const { subscriber } = await res.json();
    await fetch(`https://api.kit.com/v4/tags/${tagId}/subscribers`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Kit-Api-Key": API_KEY,
      },
      body: JSON.stringify({ email_address: email }),
    });
  }
}

export default function App() {
  const [step, setStep] = useState("landing"); // landing | quiz | email | result
  const [questionIndex, setQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [resultData, setResultData] = useState(null);

  const handleStart = useCallback(() => {
    setStep("quiz");
    setQuestionIndex(0);
    setAnswers([]);
  }, []);

  const handleAnswer = useCallback(
    (answerIndex) => {
      const newAnswers = [...answers, answerIndex];
      setAnswers(newAnswers);

      if (newAnswers.length < questions.length) {
        setQuestionIndex(questionIndex + 1);
      } else {
        const { resultKey } = calculateResult(newAnswers);
        setResultData(results[resultKey]);
        setStep("email");
      }
    },
    [answers, questionIndex]
  );

  const handleEmailSubmit = useCallback(
    async ({ email, name }) => {
      await subscribeToKit({
        email,
        name,
        tag: resultData.tag,
        answers,
      });
      setStep("result");
    },
    [resultData, answers]
  );

  const handleRestart = useCallback(() => {
    setStep("landing");
    setQuestionIndex(0);
    setAnswers([]);
    setResultData(null);
  }, []);

  return (
    <div className="app-container">
      <img src="/logo.jpg" alt="Paperboy" className="app-logo" />
      <AnimatePresence mode="wait">
        {step === "landing" && <Landing key="landing" onStart={handleStart} />}
        {step === "quiz" && (
          <Question
            key={`q-${questionIndex}`}
            questionIndex={questionIndex}
            onAnswer={handleAnswer}
            onBack={() => {
              if (questionIndex === 0) {
                setStep("landing");
              } else {
                setAnswers(answers.slice(0, -1));
                setQuestionIndex(questionIndex - 1);
              }
            }}
          />
        )}
        {step === "email" && (
          <EmailCapture key="email" onSubmit={handleEmailSubmit} />
        )}
        {step === "result" && resultData && (
          <Result key="result" result={resultData} onRestart={handleRestart} />
        )}
      </AnimatePresence>
    </div>
  );
}
