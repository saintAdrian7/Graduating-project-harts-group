import { useEffect, useState } from "react";
import { Box, Button, Typography } from "@mui/material";
import axios from "axios";

interface Question {
  question: string;
  answers: string[];
  correctAnswer: string;
}

export const AssessmentPage: React.FC = () => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<string | null>(null);
  const colors = ['#CD070D', '#029EDC', '#E7690F', '#94B748'];
  const [currentColorIndex, setCurrentColorIndex] = useState(0);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await axios.get('http://localhost:4000/asessments');
        const data = response.data.Questions; 
        setQuestions(data);
      } catch (error: any) {
        console.log(error.message);
      }
    };

    fetchQuestions(); 
  }, []);

  const handleAnswer = (answer: string) => {
    setSelectedAnswer(answer);
    if (answer === questions[currentQuestionIndex].correctAnswer) {
      setFeedback("Correct!");
    } else {
      setFeedback("Wrong!");
    }
    setTimeout(() => {
      setFeedback(null);
      setSelectedAnswer(null);
      setCurrentColorIndex((prevIndex) => (prevIndex + 1) % colors.length);
      setCurrentQuestionIndex((prevIndex) => (prevIndex + 1) % questions.length);
    }, 2000);
  };

  if (!questions.length) {
    return <div>Loading...</div>; 
  }

  return (
    <Box sx={{ padding: '20px', backgroundColor: "transparent", borderRadius: '10px', display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
      <Typography variant="h4" gutterBottom>Assessment Time!</Typography>
      <Box sx={{ padding: '20px', backgroundColor: "#CD070D", borderRadius: '10px', width: "400px", display: "flex", alignItems: "center", justifyContent: "center", height: "200px", color: " #FFFFFF" }}>
        <Typography variant="h5" gutterBottom>{questions[currentQuestionIndex].question}</Typography>
      </Box>
      <Box sx={{
        display: 'grid',
        gridTemplateColumns: 'repeat(2, 1fr)',
        gap: '10px',
        marginTop: '20px'
      }}>
        {questions[currentQuestionIndex].answers.map((answer, index) => (
          <Button
            key={index}
            variant={selectedAnswer === answer ? 'contained' : 'outlined'}
            onClick={() => handleAnswer(answer)}
            sx={{
              font: "inder",
              fontSize: "1.2rem",
              width: "400px",
              height: "fitcontent",
              textTransform: 'none',
              backgroundColor: selectedAnswer === answer ? colors[currentColorIndex] : undefined,
              color: selectedAnswer === answer ? '#fff' : 'initial',
              '&:hover': {
                backgroundColor: selectedAnswer === answer ? colors[(currentColorIndex + 1) % colors.length] : undefined,
              }
            }}
          >
            {answer}
          </Button>
        ))}
      </Box>
      {feedback && <Typography variant="h6" gutterBottom>{feedback}</Typography>}
    </Box>
  );
};
