
import mongoose,{Schema, Document} from "mongoose";

export interface Question {
    question: string;
    answers: string[];
    correctAnswer: string;
}

export interface IQuestionModel extends Question, Document {}

const AsessmentSchema = new Schema({
   question: {
    type:String,
    required:true
   },
   answers: {
    type: [String],
    required:true
   },
   correctAnswer: {
    type: String,
    required:true
   }
})
export default mongoose.model<IQuestionModel>('Asessments', AsessmentSchema);


