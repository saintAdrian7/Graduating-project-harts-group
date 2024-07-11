import express from "express";
import {
  getAllCourses,
  getSingleCourse,
  //fetchLectures,
  //fetchLecture,
  getMyCourses,
  //checkout,
} from "../Controllers/course.js";
import { isAuth } from "../middleware/isAuth.js";

const router = express.Router();

router.get("/course/all", getAllCourses);
router.get("/course/:id", getSingleCourse);
//router.get("/lectures/:id", isAuth, fetchLectures);
//router.get("/lecture/:id", isAuth, fetchLecture);
router.get("/mycourse", isAuth, getMyCourses);
//router.post("/course/checkout/:id", isAuth, checkout);
router.post("/verification/:id", isAuth);

export default router;
