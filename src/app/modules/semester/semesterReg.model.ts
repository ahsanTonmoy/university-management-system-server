import { Schema, model } from 'mongoose';
import { TSemesterRegistration } from './semesterReg.interface';

const semesterRegistrationSchema =
  new Schema<TSemesterRegistration>(
    {
      academicSemester: {
        type: Schema.Types.ObjectId,
        ref: 'AcademicSemester',
        required: true,
      },

      status: {
        type: String,
        enum: ['UPCOMING', 'ONGOING', 'ENDED'],
        default: 'UPCOMING',
        required: true,
      },

      startDate: {
        type: Date,
        required: true,
      },

      endDate: {
        type: Date,
        required: true,
      },

      minCredits: {
        type: Number,
        required: true,
        min: 0,
      },

      maxCredits: {
        type: Number,
        required: true,
        min: 0,
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

export const SemesterRegistration = model<TSemesterRegistration>(
  'SemesterRegistration',
  semesterRegistrationSchema,
);

// //
// semesterRegistrationSchema.pre('save', function (next) {
//   if (this.maxCredits < this.minCredits) {
//     throw new Error('Maximum credits cannot be less than minimum credits');
//   }

//   next();
// });

// semesterRegistrationSchema.index(
//   { academicSemester: 1 },
//   { unique: true },
// );