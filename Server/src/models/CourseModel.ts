import mongoose, {Schema, Document} from "mongoose";
import { Course } from "../Interfaces/Course";

export interface ICourseModel extends Course, Document{}

const CourseSchema = new Schema(
    {
    title: {
        type:String,
        required: true
    },
    description: {
        type:String,
        required: true
    },
    Instructor: {
        type: Schema.Types.ObjectId,
        ref: 'E-learning-users',
        required: true
    },
    students: {
        type: [Schema.Types.ObjectId],
        ref: 'E-learning-users',

    },
    Image: {
        type: String,
    },
    Modules: {
        type: [Schema.Types.ObjectId],
        ref: 'Modules'
    }
})



export default mongoose.model<ICourseModel>('Course', CourseSchema)

