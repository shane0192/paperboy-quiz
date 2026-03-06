import { useState, useCallback } from "react";
import { AnimatePresence } from "framer-motion";
import Landing from "./components/Landing";
import Question from "./components/Question";
import EmailCapture from "./components/EmailCapture";
import Result from "./components/Result";
import { questions, results, calculateResult } from "./data/quizData";

const FORM_ID = import.meta.env.VITE_KIT_FORM_ID;
const API_KEY = import.meta.env.VITE_KIT_API_KEY;

async function subscribeToKit({ email, name, tag }) {
  if (!FORM_ID || !API_KEY) {
    console.warn("Kit credentials not configured — skipping subscription");
    return;
  }

  const res = await fetch(
    `https://api.convertkit.com/v4/forms/${FORM_ID}/subscribers`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${API_KEY}`,
      },
      body: JSON.stringify({
        email_address: email,
        first_name: name || undefined,
        tags: [tag],
      }),
    }
  );

  if (!res.ok) {
    throw new Error("Subscription failed");
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
      });
      setStep("result");
    },
    [resultData]
  );

  const handleRestart = useCallback(() => {
    setStep("landing");
    setQuestionIndex(0);
    setAnswers([]);
    setResultData(null);
  }, []);

  return (
    <div className="app-container">
      <AnimatePresence mode="wait">
        {step === "landing" && <Landing key="landing" onStart={handleStart} />}
        {step === "quiz" && (
          <Question
            key={`q-${questionIndex}`}
            questionIndex={questionIndex}
            onAnswer={handleAnswer}
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
