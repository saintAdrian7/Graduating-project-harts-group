import { BrowserRouter, Routes, Route,Navigate } from "react-router-dom";
import HomePage from "./Pages/Homepage/Homepage"
import { Layoutpage } from "./Pages/Layoutpage/Layoutpage";
import Course from "./Features/Components/Course/Course";
import CourseForm from "./Features/Components/CourseForm/CourseForm";
import { useAuth } from "./Context/AuthContextProvider";



function App() {

  const {state} = useAuth()


  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layoutpage />}>
          <Route path="/Homepage" element={state.loggedInUser? <HomePage />:<Navigate to="/" /> } />
          <Route path="/CreateCourse/Course/:courseId" element={state.loggedInUser? <Course />: <Navigate to ="/"/>} />
          <Route path="/CreateCourse" element={state.loggedInUser? <CourseForm />:<Navigate to="/"/>} />
        </Route>
      </Routes>
    
    
    </BrowserRouter>
    
  
     
  )
}

export default App
