import AsessmentModel, { IQuestionModel, Question } from "../models/AsessmentModel";
import { Document, Types } from "mongoose";

export async function CreateAsessmentQuestion (question:Question):Promise<IQuestionModel>{
    try{
        const newQuestion =  new AsessmentModel(question)
        return await newQuestion.save();

    }catch(error:any){
        throw error
    }
}


export async function updateAsessmentQuestion(
    id: string ,
    updateData: Partial<IQuestionModel>
  ): Promise<IQuestionModel | null> {
    try {
      const question = await AsessmentModel.findByIdAndUpdate(id, updateData, {
        new: true,
        runValidators: true,
      }); 
  
      if (!question) {
        throw new Error(`Question with ID ${id} not found`);
      }
  
      return question;
    } catch (error: any) {
      console.error(`Error updating question: ${error.message}`);
      throw error;
    }
  }

  export async function deleteQuestion (id:string | Types.ObjectId){
    try{
         await AsessmentModel.findByIdAndDelete(id)

    }catch(error:any){
        throw error
    }
  }

  export async function getQuetions ():Promise<IQuestionModel[]>{
    try{
       const result = await AsessmentModel.find();
       return result

    }catch(error:any){
        throw error
    }
  }