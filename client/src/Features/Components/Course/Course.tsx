import { useAuth } from '../../../Context/AuthContextProvider'
import { useCourseContext, fetchCourse } from '../../../Context/CourseContextProvider'
import { useParams } from 'react-router'
import './Course.css'
import { useEffect, useState } from 'react'
import CourseDetails from './CourseDetails'


export interface CourseModule {
    _id: string;
    title: string;
    content: string;
    course?: string; // Assuming course is the course ID
    Cover?: string;
  }
  



export default function Course() {
const {state} = useAuth()
const {contextState, dispatch} = useCourseContext()
const {courseId} = useParams();
const [selectedModule, setSelectedModule] = useState<CourseModule | null>(null)





const handleModuleClick = (module: CourseModule)=> {
    setSelectedModule(module)
    window.scrollTo({ top: 0, behavior: 'smooth' });

}
const handleBackClick = () => {
    setSelectedModule(null);
  };

  
useEffect(()=> {
    if(courseId && (!contextState.course || contextState.course._id !== courseId)){
        fetchCourse(dispatch, courseId)
    }
},[courseId, contextState.course, dispatch])

if(contextState.loading) return <h1>Loading...</h1>
if(contextState.error) return <h1>Error loading the course!</h1>
if(!contextState.course) return <h1>The course was not found</h1>

    return (
        <div className='course-content'>
        <div className="course-details">
        {selectedModule ? (
          <div className='module-content'>
            <button className='back-to-btn' onClick={handleBackClick}>Back to Course Details</button>
            <h2>{selectedModule.title}</h2>
            <p className='module-content-details'>{selectedModule.content}</p>
          </div>
        ) : (
          <CourseDetails />
        )}

        </div>
        <div className='separator'>
         
        </div>
        <div className="course-modules">
            <div className='modules-container'>
            {contextState.course.Modules.map((module) => (
                  <div className={`module ${selectedModule?._id === module._id ? 'active' : ''}`} key={module._id} onClick={() => handleModuleClick(module)}>
                    <h2 className={`module-title ${selectedModule?._id === module._id ? 'active' : ''}`}>{module.title}</h2>
                 </div>
))}

            </div>

        </div>
        
        
        </div>
    )
}