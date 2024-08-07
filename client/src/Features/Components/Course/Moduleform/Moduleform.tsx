import { useRef, useState, useEffect } from "react";
import axios from "axios";
import { TextField, Button } from "@mui/material"

import './Moduleform.css';
import { useCourseContext } from "../../../../Context/CourseContextconstants";
import { fetchCourse } from "../../../../Context/CourseContextactions";

interface ModulePayload {
  module: {
    title: string;
    content: string;
    course: string | undefined;
  }
}

interface ModuleUpdatePayload {
  updateData: {
    title: string | undefined;
    content: string;
    course: string | undefined;
  }
}

interface ModuleFormProps {
  setDisplayModuleForm: () => void;
  initialData?: {
    _id: string;
    title: string;
    content: string;
  } | null;
}

const ModuleForm: React.FC<ModuleFormProps> = ({ setDisplayModuleForm, initialData }) => {
  const titleRef = useRef<HTMLInputElement>(null);
  const contentRef = useRef<HTMLTextAreaElement>(null);
  const [error, setError] = useState<boolean>(false);
  const { contextState, dispatch } = useCourseContext();

  useEffect(() => {
    if (initialData) {
      if (titleRef.current) titleRef.current.value = initialData.title;
      if (contentRef.current) contentRef.current.value = initialData.content;
    }
  }, [initialData]);

  const handleModuleUpdate = async (e: React.MouseEvent<HTMLButtonElement>): Promise<void> => {
    const token = localStorage.getItem('token')
    e.preventDefault();
    if (!titleRef.current || !contentRef.current) return;

    const moduleData: ModuleUpdatePayload = {
      updateData: {
        title: titleRef.current.value,
        content: contentRef.current.value,
        course: contextState.course?._id
      }
    };

    const moduleId = initialData?._id;
    const courseId = contextState.course?._id;

    try {
      await axios.patch(`https://server-y9oe.onrender.com/modules/${moduleId}`, moduleData,{
        headers: { Authorization: `Bearer ${token}`}
      });
      await axios.get(`https://server-y9oe.onrender.com/update/${courseId}`, {
        headers: { Authorization: `Bearer ${token}`}
      });
      setDisplayModuleForm();
      setError(false);
      fetchCourse(dispatch, courseId);
    } catch (error) {
      setError(true);
    }
  };

  const handleModuleSubmission = async (e: React.MouseEvent<HTMLButtonElement>): Promise<void> => {
    e.preventDefault();
    try {
      if (titleRef.current && contentRef.current) {
        const moduleData: ModulePayload = {
          module: {
            title: titleRef.current.value,
            content: contentRef.current.value,
            course: contextState.course?._id
          }
        };

        const courseId = contextState.course?._id;
        const token = localStorage.getItem('token')
        const config = {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }

        await axios.post("https://server-y9oe.onrender.com/modules/", moduleData, config);
        await axios.get(`https://server-y9oe.onrender.com/update/${courseId}`, {
          headers: { Authorization: `Bearer ${token}`}
        });
        setDisplayModuleForm();
        setError(false);
        fetchCourse(dispatch, courseId);
      }
    } catch (error) {
      console.log(error)
      setError(true);
    }
  };

  return (
    <form className="module-form">
      <h2 className="module-form-title">Title:</h2>
      <TextField label="Title" className="module-fTextField-title" name="title" required placeholder="Enter module title..." ref={titleRef} />
      <h2 className="module-form-title">Content:</h2>
      <textarea className="module-form-input-content" name="content" required placeholder="Enter module text content..." ref={contentRef} />
      <div className="buttons">
        <Button  variant="contained" className="module-form-btn" onClick={handleModuleSubmission}>Create Module</Button>
        {initialData && <Button variant="contained" className="module-form-btn" onClick={handleModuleUpdate}>Update Module</Button>}
      </div>
      {error && <p className="module-form-error">Unable to upload module at this time</p>}
    </form>
  );
};

export default ModuleForm