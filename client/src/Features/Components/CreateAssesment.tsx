import { useState } from "react";
import { Box, Button, TextField, Typography } from "@mui/material";
import axios from "axios";
import { useParams } from "react-router";
import './QuestionComponents.css';


interface AssessmentForm {
  question: string;
  answers: string[];
  correctAnswer: string;
}

export default function CreateAssessment() {
  const { courseId } = useParams();
  const [formState, setFormState] = useState<AssessmentForm>({
    question: "",
    answers: [],
    correctAnswer: ""
  });
  const [feedback, setFeedback] = useState<string | null>(null);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormState((prevFormState) => ({
      ...prevFormState,
      [name]: value
    }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      await axios.post(`http://localhost:4000/assessment/${courseId}`, formState);
      setFeedback("Assessment created successfully!");
    } catch (error) {
      setFeedback("An error occurred while creating the assessment.");
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 4 }}>
      <Typography variant="h5" gutterBottom>
        Create Assessment
      </Typography>
      <TextField
        name="question"
        label="Question"
        fullWidth
        margin="normal"
        value={formState.question}
        onChange={handleChange}
      />
      <TextField
        name="answers"
        label="Answers (comma-separated)"
        fullWidth
        margin="normal"
        value={formState.answers.join(",")}
        onChange={(e) => setFormState({ ...formState, answers: e.target.value.split(",") })}
      />
      <TextField
        name="correctAnswer"
        label="Correct Answer"
        fullWidth
        margin="normal"
        value={formState.correctAnswer}
        onChange={handleChange}
      />
      <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
        Create Assessment
      </Button>
      {feedback && (
        <Typography variant="body2" color="textSecondary" sx={{ mt: 2 }}>
          {feedback}
        </Typography>
      )}
    </Box>
  );
}
