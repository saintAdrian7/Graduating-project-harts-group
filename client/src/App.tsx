import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./Pages/Homepage/Homepage"
import { Layoutpage } from "./Pages/Layoutpage/Layoutpage";
import Course from "./Features/Components/Course/Course";
import CourseForm from "./Features/Components/CourseForm/CourseForm";
import { AssessmentPage } from "./Pages/Assessmentpage/Assessmentpage";
import { CreateAssessment } from "./Pages/Assessmentpage/Assesmentform";
import { useEffect } from "react";
import { fetchuser, useAuth } from "./Context/AuthContextProvider";
import axios from "axios";
import { LoginProtect } from "./LoginProtect";



function App() {
  const {state, dispatch} = useAuth()

  useEffect(() => {
    let userId = sessionStorage.getItem("userId");
    console.log("from storage after login in:", userId)
    if (userId && !state.loggedInUser) {
      fetchuser(dispatch, userId);
    }
  }, [state.loggedInUser, dispatch]);

  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Layoutpage />}>
        <Route path="/Homepage" element={<HomePage />} />
        <Route path="/CreateCourse/Course/:courseId" element={state.loggedInUser ? <Course /> : <LoginProtect/>} />
        <Route path="/CreateCourse" element={ state.loggedInUser ? <CourseForm/> : <LoginProtect />} />
        <Route path="/assessment/:courseId" element={state.loggedInUser ? <AssessmentPage />: <LoginProtect/>} />
        <Route path="/assessment/createform/:courseId" element={state.loggedInUser? <CreateAssessment />: <LoginProtect/>} />
      </Route>
    </Routes>
    
    
    </BrowserRouter>
    
  
     
  )
}

export default App
