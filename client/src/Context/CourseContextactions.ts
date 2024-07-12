import axios from 'axios';
import { CourseAction } from './CourseContextconstants';
import { CoursePayLoad } from '../Models/User';



export const fetchCourse = async (dispatch: React.Dispatch<CourseAction>, courseId: string | undefined) => {
    dispatch({ type: 'FETCH_COURSE_REQUEST' });
    try {
      const response = await axios.get(`http://localhost:4000/Courses/${courseId}`);
      dispatch({ type: 'FETCH_COURSE_SUCCESS', payload: response.data });
    } catch (error) {
      dispatch({ type: 'FETCH_COURSE_FAILURE' });
      throw error;
    }
  };
  
  export const createCourse = async (dispatch: React.Dispatch<CourseAction>, newCourse:CoursePayLoad) => {
    dispatch({ type: 'CREATE_COURSE_REQUEST' });
    try {
      const response = await axios.post('http://localhost:4000/Courses', newCourse);
      dispatch({ type: 'CREATE_COURSE_SUCCESS', payload: response.data });
      return response.data.courseId 
    } catch (error) {
      dispatch({ type: 'CREATE_COURSE_FAILURE' });
      throw error;
    }
  };
  