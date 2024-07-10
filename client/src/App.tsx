import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./Pages/Homepage/Homepage"
import { Layoutpage } from "./Pages/Layoutpage/Layoutpage";
import Course from "./Features/Components/Course/Course";
import CourseForm from "./Features/Components/CourseForm/CourseForm";



function App() {


  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Layoutpage />}>
        <Route path="/Homepage" element={<HomePage />} />
        <Route path="/CreateCourse/Course/:courseId" element={<Course />} />
        <Route path="/CreateCourse" element={ <CourseForm />} />
      </Route>
    </Routes>
    
    
    </BrowserRouter>
    
  
     
  )
}

export default App
