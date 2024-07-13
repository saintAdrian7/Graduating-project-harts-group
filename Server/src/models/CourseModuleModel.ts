import mongoose,{Schema, Document, Mongoose} from "mongoose";
import { CourseModule } from "../Interfaces/CourseModule";


export interface ICourseModule  extends CourseModule, Document {}


const CourseModuleSchema = new Schema(
    {
        title:{
            type:String,
            required:true
        },
        content: {
            type:String,
        
        },
        course: {
            type: Schema.Types.ObjectId,
            ref: 'Course',
            required: true
        },
        Cover: {
            type: String,
        }
    }
)

export default mongoose.model<ICourseModule>('Modules', CourseModuleSchema)