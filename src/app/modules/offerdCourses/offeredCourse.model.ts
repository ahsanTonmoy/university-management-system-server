import { Schema, model } from 'mongoose';
import {
  TDay,
  TOfferedCourse,
  TSchedule,
} from './offeredCourse.interface';

const scheduleSchema = new Schema<TSchedule>(
  {
    day: {
      type: String,
      enum: [
        'SATURDAY',
        'SUNDAY',
        'MONDAY',
        'TUESDAY',
        'WEDNESDAY',
        'THURSDAY',
        'FRIDAY',
      ],
      required: true,
    },

    startTime: {
      type: String,
      required: true,
      trim: true,
    },

    endTime: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    _id: false,
  },
);

const offeredCourseSchema = new Schema<TOfferedCourse>(
  {
    semesterRegistration: {
      type: Schema.Types.ObjectId,
      ref: 'SemesterRegistration',
      required: true,
    },

    academicSemester: {
      type: Schema.Types.ObjectId,
      ref: 'AcademicSemester',
      required: true,
    },

    academicFaculty: {
      type: Schema.Types.ObjectId,
      ref: 'AcademicFaculty',
      required: true,
    },

    academicDepartment: {
      type: Schema.Types.ObjectId,
      ref: 'academicDepartment',
    },

    course: {
      type: Schema.Types.ObjectId,
      ref: 'Course',
      required: true,
    },

    faculty: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Faculty',
      },
    ],

    maxCapacity: {
      type: Number,
      required: true,
      min: 1,
    },

    section: {
      type: Number,
      required: true,
      min: 1,
    },

    schedule: {
      type: [scheduleSchema],
      required: true,
      validate: {
        validator: function (value: TSchedule[]) {
          return value.length > 0;
        },
        message: 'At least one schedule is required',
      },
    },

    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

export const OfferedCourse = model<TOfferedCourse>(
  'Offered-Course',
  offeredCourseSchema,
);