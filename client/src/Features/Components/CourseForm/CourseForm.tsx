import { useRef } from "react"
import { useAuth } from "../../../Context/AuthContextProvider"
import { createCourse, fetchCourse, useCourseContext } from "../../../Context/CourseContextProvider"
import './CourseForm.css'
import { useNavigate } from "react-router"



export default function CourseForm(){
    const titleRef = useRef< HTMLInputElement>(null)
    const descriptionRef = useRef< HTMLInputElement>(null)
    const {contextState, dispatch} = useCourseContext()
    const {state} = useAuth()
    const navigate = useNavigate()
    

    const handleCreateCourse = async (e:React.MouseEvent<HTMLButtonElement>):Promise<void> => {
        e.preventDefault()

        if(titleRef && titleRef.current && descriptionRef && descriptionRef.current){
            try{
               const courseId =  await  createCourse(dispatch, 
                    {
                        title: titleRef.current.value,
                        description: descriptionRef.current.value,
                        Instructor: "668d0d64a0915e96aa9f97cd"
                    }
                 )
                 
                 
                 await fetchCourse(dispatch, courseId);
                 navigate(`Course/${courseId}`);

            }catch(error:any){
                throw error
            }

        }

    }

    return(
        
        <form className="create-form">
            <h1 className="create-form-header">Create Course</h1>
            <p className="create-form-message">Enter course title and description to begin</p>
            {contextState.error && <p className="create-form-error">Unable to create course at this time try again later</p>}
            <h2 className="create-form-title">Title:</h2>
            <input name="title" placeholder="enter course Title" ref={titleRef} required />
            <h2 className="create-form-description">Description:</h2>
            <input name="description" required placeholder="enter course description" ref={descriptionRef}/>
           <button onClick={handleCreateCourse} type="submit" className="create-form-btn">Create Course</button>
           {contextState.loading && !contextState.error && <p>Loading please wait...</p>}

        </form>
    )

}