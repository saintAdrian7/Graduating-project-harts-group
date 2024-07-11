import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./Pages/Homepage/Homepage"
import { Layoutpage } from "./Pages/Layoutpage/Layoutpage";
import Course from "./Features/Components/Course/Course";
import CourseForm from "./Features/Components/CourseForm/CourseForm";
import { AssessmentPage } from "./Pages/Assessmentpage/Assessmentpage";
import { CreateAssessment } from "./Pages/Assessmentpage/Assesmentform";



function App() {


  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Layoutpage />}>
        <Route path="/Homepage" element={<HomePage />} />
        <Route path="/CreateCourse/Course/:courseId" element={<Course />} />
        <Route path="/CreateCourse" element={ <CourseForm />} />
        <Route path="Course/assessment" element={<AssessmentPage/>} />
        <Route path="Course/assessment/createform" element={<CreateAssessment />} />
      </Route>
    </Routes>
    
    
    </BrowserRouter>
    
  
     
  )
}

export default App
