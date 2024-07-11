import mongoose, { Document, Schema, Model } from 'mongoose';

export interface ICourse extends Document {
  title: string;
  description: string;
  image: string;
  price: number;
  duration: number;
  category: string;
  createdBy: string;
  createdAt: Date;
}

const CourseSchema: Schema<ICourse> = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  createdBy: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export const Courses: Model<ICourse> = mongoose.model<ICourse>('Courses', CourseSchema);
