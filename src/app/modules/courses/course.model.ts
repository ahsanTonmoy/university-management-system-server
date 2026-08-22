import { Schema, model } from 'mongoose';
import { TCourse, TCourseFaculties } from './course.interface';

const preRequisiteCourseSchema = new Schema(
  {
    course: {
      type: Schema.Types.ObjectId,
      ref: 'Course',
      required: true,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    _id: false,
  },
);

const courseSchema = new Schema<TCourse>(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },

    prefix: {
      type: String,
      required: true,
    },

    code: {
      type: Number,
      required: true,
      unique: true,
    },

    credits: {
      type: Number,
      required: true,
    },

    preRequisiteCourses: [preRequisiteCourseSchema],
    faculties: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Faculty',
    },
  ],
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

export const Course = model<TCourse>('Course', courseSchema);

const courseFacultySchema= new Schema<TCourseFaculties>({
  course:{
        type: Schema.Types.ObjectId,
        unique: true,
        ref: "Course"
    },
    faculties:[{
        type: Schema.Types.ObjectId,
        ref: "Faculty"
    }]
    
})

export const courseFaculties = model<TCourseFaculties>(
    "courseFaculties", courseFacultySchema
)

