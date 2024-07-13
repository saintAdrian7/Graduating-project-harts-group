import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router";
import { Box, Button, Typography } from "@mui/material";
import './QuestionComponents.css';


interface Assessment {
  question: string;
  answers: string[];
  correctAnswer: string;
}

const TakeAssessment: React.FC = () => {
  const { courseId } = useParams();
  const [assessments, setAssessments] = useState<Assessment[]>([]);
  const [selectedAnswers, setSelectedAnswers] = useState<string[]>([]);
  const [score, setScore] = useState<number | null>(null);

  useEffect(() => {
    const fetchAssessments = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/assessment/${courseId}`);
        setAssessments(response.data);
      } catch (error) {
        console.error("Error fetching assessments:", error);
      }
    };

    fetchAssessments();
  }, [courseId]);

  const handleAnswerSelect = (questionIndex: number, answer: string) => {
    const newSelectedAnswers = [...selectedAnswers];
    newSelectedAnswers[questionIndex] = answer;
    setSelectedAnswers(newSelectedAnswers);
  };

  const handleSubmit = () => {
    let correctCount = 0;
    assessments.forEach((assessment, index) => {
      if (selectedAnswers[index] === assessment.correctAnswer) {
        correctCount++;
      }
    });
    setScore(correctCount);
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Take Assessment
      </Typography>
      {assessments.map((assessment, index) => (
        <Box key={index} sx={{ mb: 4 }}>
          <Typography variant="h6" gutterBottom>
            {assessment.question}
          </Typography>
          {assessment.answers.map((answer, answerIndex) => (
            <Button
              key={answerIndex}
              variant={selectedAnswers[index] === answer ? "contained" : "outlined"}
              onClick={() => handleAnswerSelect(index, answer)}
              sx={{ mr: 2, mb: 2 }}
            >
              {answer}
            </Button>
          ))}
        </Box>
      ))}
      <Button variant="contained" color="primary" onClick={handleSubmit}>
        Submit
      </Button>
      {score !== null && (
        <Typography variant="h5" gutterBottom sx={{ mt: 4 }}>
          Your Score: {score} / {assessments.length}
        </Typography>
      )}
    </Box>
  );
};

export default TakeAssessment;
