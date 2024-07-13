import React from 'react';
import { useQuestions } from '../../Context/QuestionsContext';

const QuestionList: React.FC = () => {
  const { questions, userAnswers, setUserAnswer, score } = useQuestions();

  const handleAnswerChange = (id: number, answer: string) => {
    setUserAnswer(id, answer);
  };

  return (
    <div>
      <h2>Questions</h2>
      {questions.map((question) => (
        <div key={question.id}>
          <p>{question.question}</p>
          {question.options.map((option) => (
            <div key={option}>
              <input
                type="radio"
                name={`question-${question.id}`}
                value={option}
                checked={userAnswers[question.id] === option}
                onChange={() => handleAnswerChange(question.id, option)}
              />
              <label>{option}</label>
            </div>
          ))}
        </div>
      ))}
      <h2>Your Score: {score}/{questions.length}</h2>
    </div>
  );
};

export default QuestionList;
