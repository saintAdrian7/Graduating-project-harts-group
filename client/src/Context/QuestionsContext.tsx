import React, { createContext, useState, useContext,ReactNode } from 'react';

interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: string;
}

interface QuestionsContextType {
  questions: Question[];
  addQuestion: (question: Question) => void;
  userAnswers: { [id: number]: string };
  setUserAnswer: (id: number, answer: string) => void;
  score: number;
}

const QuestionsContext = createContext<QuestionsContextType | undefined>(undefined);

interface QuestionsProviderProps {
  children: ReactNode;
}

export const QuestionsProvider: React.FC<QuestionsProviderProps> = ({ children }) => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [userAnswers, setUserAnswers] = useState<{ [id: number]: string }>({});

  const addQuestion = (question: Question) => {
    setQuestions((prev) => [...prev, question]);
  };

  const setUserAnswer = (id: number, answer: string) => {
    setUserAnswers((prev) => ({ ...prev, [id]: answer }));
  };

  const calculateScore = () => {
    return questions.reduce((score, question) => {
      if (userAnswers[question.id] === question.correctAnswer) {
        return score + 1;
      }
      return score;
    }, 0);
  };

  const value = {
    questions,
    addQuestion,
    userAnswers,
    setUserAnswer,
    score: calculateScore(),
  };

  return <QuestionsContext.Provider value={value}>{children}</QuestionsContext.Provider>;
};

export const useQuestions = () => {
  const context = useContext(QuestionsContext);
  if (!context) {
    throw new Error('useQuestions must be used within a QuestionsProvider');
  }
  return context;
};
