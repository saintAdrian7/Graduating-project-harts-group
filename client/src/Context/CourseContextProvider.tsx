
import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import axios from 'axios';
import { CoursePayLoad } from '../Models/User';

interface Course {
  _id: string;
  title: string;
  description: string;
  Instructor: { _id: string, firstName: string, lastName: string };
  Image: string;
  students: string[];
  Modules: {
    _id: string;
    title: string;
    content: string;
    cover: string;
  }[]
}

interface CourseState {
  course: Course | null;
  loading: boolean;
  error: boolean;
}

type CourseAction =
  | { type: 'FETCH_COURSE_REQUEST' }
  | { type: 'FETCH_COURSE_SUCCESS', payload: Course }
  | { type: 'FETCH_COURSE_FAILURE' }
  | { type: 'CREATE_COURSE_REQUEST' }
  | { type: 'CREATE_COURSE_SUCCESS', payload: Course }
  | { type: 'CREATE_COURSE_FAILURE' };

const initialCourseState: CourseState = {
  course: null,
  loading: false,
  error: false,
};

const CourseContext = createContext<{
  contextState: CourseState;
  dispatch: React.Dispatch<CourseAction>;
}>({ contextState: initialCourseState, dispatch: () => null });

const courseReducer = (contextState: CourseState, action: CourseAction): CourseState => {
  switch (action.type) {
    case 'FETCH_COURSE_REQUEST':
      return { ...contextState, loading: true, error: false };
    case 'FETCH_COURSE_SUCCESS':
      return { ...contextState, loading: false, error: false, course: action.payload };
    case 'FETCH_COURSE_FAILURE':
      return { ...contextState, loading: false, error: true };
    case 'CREATE_COURSE_REQUEST':
      return { ...contextState, loading: true, error: false };
    case 'CREATE_COURSE_SUCCESS':
      return { ...contextState, loading: false, error: false, course: action.payload };
    case 'CREATE_COURSE_FAILURE':
      return { ...contextState, loading: false, error: true };
    default:
      return contextState;
  }
};

export const CourseProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [contextState, dispatch] = useReducer(courseReducer, initialCourseState);
  return (
    <CourseContext.Provider value={{ contextState, dispatch }}>
      {children}
    </CourseContext.Provider>
  );
};

export const useCourseContext = () => useContext(CourseContext);

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
