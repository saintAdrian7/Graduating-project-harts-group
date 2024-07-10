import { useAuth } from '../../../Context/AuthContextProvider'
import { useCourseContext, fetchCourse } from '../../../Context/CourseContextProvider'
import { useParams } from 'react-router'
import { useEffect } from 'react'
import './CourseDetails.css'

export default function CourseDetails () {
const {state} = useAuth()
const {contextState, dispatch} = useCourseContext()
const {courseId} = useParams();


    return(
        <>
        <div className='course-title'>
                <h1>{contextState.course?.title}</h1>
                <p>{contextState.course?.description}</p>
            </div>
            <div>
            <p>Created by <span>{`${contextState.course?.Instructor.firstName} ${contextState.course?.Instructor.lastName}`}</span></p>

            <p className='students'>{contextState.course?.students.length} students</p>
            </div>
            
            <div className='instructor-details'>
            <img className='instructor-img' src="https://images.unsplash.com/photo-1544723795-3fb6469f5b39?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwyNzA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&q=80&w=400" loading="lazy" alt="Instructor picture" width={191} height={254}/>
             <p>Instructor</p>
            </div>
        </>
        
    )
    
}