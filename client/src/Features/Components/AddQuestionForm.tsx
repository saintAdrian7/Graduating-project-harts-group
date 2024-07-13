import React, { useState } from 'react';
import { useQuestions } from '../../Context/QuestionsContext';
import './AddQuestionForm.css';

const AddQuestionForm: React.FC = () => {
  const { addQuestion } = useQuestions();
  const [questionText, setQuestionText] = useState('');
  const [options, setOptions] = useState<string[]>(['', '', '', '']);
  const [correctAnswer, setCorrectAnswer] = useState('');

  const handleAddQuestion = () => {
    const newQuestion = {
      id: Date.now(),
      question: questionText,
      options,
      correctAnswer,
    };
    addQuestion(newQuestion);
    setQuestionText('');
    setOptions(['', '', '', '']);
    setCorrectAnswer('');
  };

  return (
    <div className="add-question-form">
      <h2>Add Question</h2>
      <input
        type="text"
        placeholder="Question"
        value={questionText}
        onChange={(e) => setQuestionText(e.target.value)}
        className="input-field"
      />
      {options.map((option, index) => (
        <input
          key={index}
          type="text"
          placeholder={`Option ${index + 1}`}
          value={option}
          onChange={(e) => {
            const newOptions = [...options];
            newOptions[index] = e.target.value;
            setOptions(newOptions);
          }}
          className="input-field"
        />
      ))}
      <input
        type="text"
        placeholder="Correct Answer"
        value={correctAnswer}
        onChange={(e) => setCorrectAnswer(e.target.value)}
        className="input-field"
      />
      <button onClick={handleAddQuestion} className="add-button">
        Add Question
      </button>
    </div>
  );
};

export default AddQuestionForm;
