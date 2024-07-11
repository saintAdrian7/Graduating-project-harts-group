import {Request, Response} from 'express'
import { CreateAsessmentQuestion, deleteQuestion, getQuetions, updateAsessmentQuestion } from '../Services/Asessment'
import { IQuestionModel, Question } from '../models/AsessmentModel'


export const getAllQuestions = async (req:Request, res:Response) =>{
    try{
        const Questions = await getQuetions()
        if(!Questions){
            return res.status(404).json({message: 'No Questions Found!'})
        }
        
        return res.status(200).json({message:"Questions fetch success", Questions})

    }catch(error:any){
        return res.status(500).json({message:"Unable to fetch questions at this time", error: error.message})

    }
}


export const CreateQuestion = async (req:Request, res:Response)=>{
    const { question, answers, correctAnswer } = req.body;
    try{

    if (!question || !answers || !correctAnswer) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const questionData:Question = {
      question,
      answers,
      correctAnswer
    };

    const newQuestion = await CreateAsessmentQuestion(questionData);

    return res.status(201).json({ message: "Question created successfully", question: newQuestion });

    }
    catch(error:any){
        return res.status(500).json({message:"Unable to create question at this time", error:error.message})
    }
}

export const UpdateQuestion = async (req:Request, res:Response)=>{
    const { question, answers, correctAnswer } = req.body;
    const questionId = req.params.id
    try{
        const questionData = {
            question,
            answers,
            correctAnswer
        }
        
        const updatedQuestion = await updateAsessmentQuestion(questionId, questionData)
        return res.status(200).json({message:"Question updated successfully", question:updatedQuestion})

    }catch(error:any){
        return res.status(500).json({message:"Unable to update question at this time", error:error.message})

    }
}

export const DeleteQuestion = async (req:Request, res:Response) => {
    const questionId = req.params.id
    try{
        await deleteQuestion(questionId)
        return res.status(200).json({message:"Question deleted successfully"})

    }catch(error:any){
        return res.status(500).json({message:"Unable to delete question at this time", error:error.message })
    }
}