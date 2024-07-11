
import mongoose,{Schema, Document} from "mongoose";

export interface Question {
    question: string;
    answers: string[];
    correctAnswer: string;
    course: string
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
   },
   course: {
    type: [Schema.Types.ObjectId],
    ref: 'Course',
    required:true
   }
})
export default mongoose.model<IQuestionModel>('Asessments', AsessmentSchema);


