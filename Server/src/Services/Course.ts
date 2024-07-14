import { CourseModule } from "../Interfaces/CourseModule";
import CourseModel, { ICourseModel } from "../models/CourseModel"
import CourseModuleModel, { ICourseModule } from "../models/CourseModuleModel";



export async function getAllCourses():Promise <ICourseModel[] | null>{
try{
    const Courses = await CourseModel.find()
    return Courses;

}catch(error:any){
    throw error

}
}

export async function getOneCourse(id: string): Promise<ICourseModel | null> {
    try {
        const course = await CourseModel.findById(id)
             .populate('Instructor', 'firstName lastName')
              .populate('Modules');

      return course;
    } catch (error: any) {
      throw error;
    }
}

export async function createCourse(course:ICourseModel): Promise<ICourseModel>{
    try{
        const newCourse = new CourseModel(course)
        const savedCourse = await newCourse.save()
        return savedCourse

    }catch(error:any){
        throw error
    }

}



export async function updateCourse(id: string, updateData: Partial<ICourseModel>): Promise<ICourseModel | null> {
    try {
        const updatedCourse = await CourseModel.findByIdAndUpdate(
            id,
            { $set: updateData },
            { new: true, runValidators: true }
        );

        return updatedCourse;
    } catch (error: any) {
        throw error;
    }
}


export async function deleteCourse(id: string): Promise<ICourseModel | null> {
    try {
        const deletedCourse = await CourseModel.findByIdAndDelete(id);
        return deletedCourse;
    } catch (error: any) {
        throw error;
    }
}


export async function createModule(module:CourseModule):Promise<ICourseModule> {
    try{
        const newModule = new CourseModuleModel(module)
        const savedModule = await newModule.save()
        return savedModule

    }catch(error:any){
        throw error

    }
}

export async function updateModule(id:string,  module: Partial<ICourseModule>):Promise<ICourseModule | null> {
    try{
        const updatedModule = await CourseModuleModel.findByIdAndUpdate(id,
            { $set: module },
            { new: true, runValidators: true })
        return updatedModule
        
    }catch(error:any){
        throw error
    }
}


export async function deleteModule(id:string):Promise<ICourseModule | null> {
    try{
        const deletedModule = await CourseModuleModel.findByIdAndDelete(id)
        return deletedModule

    }catch(error:any){
        throw error
    }
}

export async function getmodules():Promise<ICourseModule[]> {
    try{
        const modules = await CourseModuleModel.find()
        return modules

    }catch(error:any){
        throw error
    }
}

export async function getModule(id:string):Promise<ICourseModule | null> {
    try{
        const module = await CourseModuleModel.findById(id)
        return module

    }catch(error:any){
        throw error
    }
} 

export async function searchCourses(keyword: string): Promise<ICourseModel[] | null> {
    try {
      const courses = await CourseModel.find({ title: new RegExp(keyword, 'i') });
      return courses;
    } catch (error: any) {
      throw error;
    }
  }