import express,{Request, Response} from 'express'
import CourseModel, { ICourseModel } from '../models/CourseModel'
import { createModule, deleteCourse, deleteModule, getAllCourses, getModule, getmodules, getOneCourse, updateCourse, updateModule } from '../Services/Course'
import CourseModule from '../models/CourseModule';
import mongoose from 'mongoose';
import { log } from 'console';

export const getCourses = async (req:Request, res:Response)=>{
    try{
       const Courses = await getAllCourses()
       return res.status(200).json(Courses)

    }catch(error:any){
        return res.status(500).json({message:"Unable to get courses at this time", error: error.message})

    }

};

export const getCourse = async (req:Request, res:Response) => {
    const {id }= req.params
    try{
    
        const Course = await getOneCourse(id)
        if(!Course){
            return res.status(404).json({message:"Course not found"})
        }
        return res.status(200).json(Course)

    }catch(error:any){
        return res.status(500).json({message:"Unable to get course at this time", error:error.message})

    }

}


export const CreateCourse = async (req: Request, res: Response) => {
    const { title, description, Instructor} = req.body;
  
    try {
      const newCourse = new CourseModel({
        title,
        description,
        Instructor
      });
  
      const savedCourse = await newCourse.save();
  
      return res.status(201).json({ message: 'Course created successfully', courseId: savedCourse._id });
    } catch (error:any) {
      return res.status(500).json({ message: 'Unable to create course at this time', error: error.message });
    }
  };


export const UpdateCourse = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { updateData } = req.body;

    try {
        const updatedCourse = await updateCourse(id, updateData); 

        if (!updatedCourse) {
            return res.status(404).json({ message: "Course not found" });
        }

        return res.status(200).json({ message: "Course updated", updatedCourse });
    } catch (error:any) {
        return res.status(500).json({ message: "Unable to update course at this time", error: error.message });
    }
}
export const DeleteCourse = async (req:Request, res:Response) => {
    const {id }= req.params
    try{
        const DeletedCourse = deleteCourse(id)
        if(!DeletedCourse){
            return res.status(404).json({message:"Course not found"})
        }
        return res.status(200).json({message:"Course deleted", DeletedCourse})

    }catch(error:any){

    }
}



export const getAllModules = async (req:Request, res:Response) => {
    try{
        const modules = await getmodules()
        return res.status(200).json({message:"Modules fetched", modules})

    }catch(error:any){
        return res.status(500).json({message:"Unable to fetch modules at this time", error:error.message})
    
    }
}

export const getOneModule = async (req:Request, res:Response) => {
    const {id} = req.params
    try{
        const module = await getModule(id)
        if(!module){
            return res.status(404).json({message:"Module not found"})
        }
        return res.status(200).json({message:"Module fetched", module})

    }catch(error:any){
        return res.status(500).json({message:"Unable to fetch module at this time", error:error.message})

    }
}

export const CreateModule = async (req:Request, res:Response) => {
    const {module} = req.body
    try{
        const CreatedModule = await createModule(module)
        if(!CreatedModule){
            return res.status(404).json({message:"Module not created"})
        }
        return res.status(200).json({message:"Module created", CreatedModule})

    }catch(error:any){
        return res.status(500).json({message:"Unable to create module at this time", error:error.message})
    }
}

export const UpdateModule = async (req:Request, res:Response) => {
    const {id} = req.params
    const {updateData} = req.body
    try{
        const updatedModule = await updateModule(id, updateData)
        if(!updatedModule){
            return res.status(404).json({message:"Module not found"})      
        }
        return res.status(200).json({message:"Module updated", updatedModule})

    }catch(error:any){
        return res.status(500).json({message:"Unable to update module at this time", error:error.message})


    }

}

export const DeleteModule = async (req:Request, res:Response) => {
    const {id} = req.params
    try{
        const deletedModule = await deleteModule(id)
        if(!deletedModule){
            return res.status(404).json({message:"Module not found"})
        }
        return res.status(200).json({message:"Module deleted", deletedModule})

    }catch(error:any){
        return res.status(500).json({message:"Unable to delete module at this time", error:error.message})
    }
}



export const updateCourseWithModules = async (req: Request, res: Response) => {
    const { id: courseId } = req.params;

    try {
        
        const courseObjectId = new mongoose.Types.ObjectId(courseId);
        
        const modules = await CourseModule.find({ course: courseObjectId });
        if (!modules || modules.length === 0) {
            return res.status(404).json({ message: 'No modules found.' });
        }
        const moduleIds = modules.map(module => module._id);
        const updatedCourse = await  CourseModel.findByIdAndUpdate(
            courseId,
            { $set: { Modules: moduleIds } },
            { new: true } 
        ).populate('Modules'); 

        if (!updatedCourse) {
            return res.status(404).json({ message: 'Course not found.' });
        }

        res.status(200).json(updatedCourse);
    } catch (error:any) {
        console.error('Error updating course:', error);
        res.status(500).json({ message: 'Unable to update course at this time.', error: error.message });
    }
}