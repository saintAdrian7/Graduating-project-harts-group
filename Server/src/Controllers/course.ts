import TryCatch from "../middleware/TryCatch";
import { Courses } from "../models/Courses.js";
import { Request, Response } from 'express';
//import { Lecture } from "../models/Lecture.js";
import { User,IUserModel } from "../models/UserModel.js";

interface AuthRequest extends Request {
  user?: IUserModel;
}

export const getAllCourses = TryCatch(async (req: Request, res: Response) => {
  const courses = await Courses.find();
  res.json({
    courses,
  });
});

export const getSingleCourse = TryCatch(async (req: Request, res: Response) => {
  const course = await Courses.findById(req.params.id);

  res.json({
    course,
  });
});

/* export const fetchLectures = TryCatch(async (req, res) => {
  const lectures = await Lecture.find({ course: req.params.id });

  const user = await User.findById(req.user._id);

  if (user.role === "admin") {
    return res.json({ lectures });
  }

  if (!user.subscription.includes(req.params.id))
    return res.status(400).json({
      message: "You have not subscribed to this course",
    });

  res.json({ lectures });
});

export const fetchLecture = TryCatch(async (req, res) => {
  const lecture = await Lecture.findById(req.params.id);

  const user = await User.findById(req.user._id);

  if (user.role === "admin") {
    return res.json({ lecture });
  }

  if (!user.subscription.includes(lecture.course))
    return res.status(400).json({
      message: "You have not subscribed to this course",
    });

  res.json({ lecture });
}); */

export const getMyCourses = TryCatch(async (req: AuthRequest, res: Response) => {
  const user = req.user ; 
  
  const courses = await Courses.find({ _id:{$in: user?.$assertPopulated} });

  res.json({
    courses,
  });
});

/* export const checkout = TryCatch(async (req, res) => {
  const user = await User.findById(req.user._id);

  const course = await Courses.findById(req.params.id);

  if (user.subscription.includes(course._id)) {
    return res.status(400).json({
      message: "You already have this course",
    });
  }

  const options = {
    amount: Number(course.price * 100),
    currency: "INR",
  };

  
}); */


