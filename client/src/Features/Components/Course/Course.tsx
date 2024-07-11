//import { useAuth } from '../../../Context/AuthContextProvider';
import { useCourseContext, fetchCourse } from '../../../Context/CourseContextProvider';
import { useParams } from 'react-router';
import './Course.css';
import { useEffect, useState } from 'react';
import CourseDetails from './CourseDetails';
import { ModuleForm } from './Moduleform/Moduleform';
import axios from 'axios';

export interface CourseModule {
  _id: string;
  title: string;
  content: string;
  course?: string; // Assuming course is the course ID
  Cover?: string;
}

export default function Course() {
  const [displayModuleForm, setDisplayModuleForm] = useState<boolean>(false);
  //const { state } = useAuth();
  const { contextState, dispatch } = useCourseContext();
  const { courseId } = useParams();
  const [selectedModule, setSelectedModule] = useState<CourseModule | null>(null);

  const toggleModuleForm = () => {
    setDisplayModuleForm(!displayModuleForm);
  };

  const handleModuleClick = (module: CourseModule) => {
    setSelectedModule(module);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackClick = () => {
    setSelectedModule(null);
  };

  const handleUpdateClick = (module: CourseModule) => {
    setSelectedModule(module);
    setDisplayModuleForm(true);
  };
  const handleDeleteClick = async (module: CourseModule):Promise<void>=> {
    try{
      const moduleId = module._id
      const courseId = contextState.course?._id
      await axios.delete(`http://localhost:4000/modules/${moduleId}`)
      await axios.get(`http://localhost:4000/update/${courseId}`);
      fetchCourse(dispatch, courseId);
    }catch(error){
      if (error instanceof Error) {
        console.log(error.message);
      } else {
        console.log('An unknown error occurred');
      }
    }
  };

  useEffect(() => {
    if (courseId && (!contextState.course || contextState.course._id !== courseId)) {
      fetchCourse(dispatch, courseId);
    }
  }, [courseId, contextState.course, dispatch]);

  if (contextState.loading) return <h1>Loading...</h1>;
  if (contextState.error) return <h1>Error loading the course!</h1>;
  if (!contextState.course) return <h1>The course was not found</h1>;

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
      <div className='separator'></div>
      <div>
        {displayModuleForm && (
          <ModuleForm
            setDisplayModuleForm={toggleModuleForm}
            initialData={selectedModule}
          />
        )}
      </div>
      <div className="course-modules">
           <button className='toggle-module-form-btn' onClick={toggleModuleForm}>
           {displayModuleForm ? "Hide Module Form" : "Add Course Module Here"}
           </button>
        <div className='modules-container'>
          {contextState.course.Modules.map((module) => (
            <div className={`module ${selectedModule?._id === module._id ? 'active' : ''}`} key={module._id} onClick={() => handleModuleClick(module)}>
              <h2 className={`module-title ${selectedModule?._id === module._id ? 'active' : ''}`}>{module.title}</h2>
              <button className='update-module-btn' onClick={() => handleUpdateClick(module)}>Update</button>
              <button className='delete-module-btn' onClick={() => handleDeleteClick(module)}>Delete</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
