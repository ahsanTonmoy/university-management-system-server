import httpStatus from 'http-status';
import { Types } from 'mongoose';

import AppError from '../../errors/appErrors';

import { OfferedCourse } from './offeredCourse.model';
import { TOfferedCourse } from './offeredCourse.interface';
import { Course } from '../courses/course.model';
import { Faculty } from '../faculty/faculty.model';
import { SemesterRegistration } from '../semester/semesterReg.model';
import { academicSemester } from '../academicSemester/academicSemesterModel';
import { academicFaculty } from '../academicFeculty/academicFacultyModel';
import { academicDepartment } from '../academicDepartment/academicDepartment.model';




// ===============================
// Create Offered Course
// ===============================

const createOfferedCourseIntoDB = async (
  payload: TOfferedCourse,
) => {
  // Step 1:
  // Check semester registration

  const isSemesterRegistrationExists =
    await SemesterRegistration.findOne({
      _id: payload.semesterRegistration,
      isDeleted: false,
    });

  if (!isSemesterRegistrationExists) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      'Semester not found!',
    );
  }

  // Step 2:
  // Check academic semester

  const isAcademicSemesterExists =
    await academicSemester.findById(
      payload.academicSemester,
    );

  if (!isAcademicSemesterExists) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      'Academic semester not found!',
    );
  }

  // Step 3:
  // Check academic faculty

  const isAcademicFacultyExists =
    await academicFaculty.findById(
      payload.academicFaculty,
    );

  if (!isAcademicFacultyExists) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      'Academic faculty not found!',
    );
  }

  // Step 4:
  // Check academic department

  const isAcademicDepartmentExists =
    await academicDepartment.findById(
      payload.academicDepartment,
    );

  if (!isAcademicDepartmentExists) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      'Academic department not found!',
    );
  }

  // Step 5:
  // Check course

  const isCourseExists = await Course.findById(
    payload.course,
  );

  if (!isCourseExists) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      'Course not found!',
    );
  }

  // Step 6:
  // Check faculties

  if (payload.faculty?.length) {
    const facultyCount = await Faculty.countDocuments({
      _id: {
        $in: payload.faculty,
      },
    });

    if (facultyCount !== payload.faculty.length) {
      throw new AppError(
        httpStatus.NOT_FOUND,
        'One or more faculty not found!',
      );
    }
  }

  // Step 7:
  // Check duplicate offered course

  const isOfferedCourseExists =
    await OfferedCourse.findOne({
      semesterRegistration: payload.semesterRegistration,
      course: payload.course,
      section: payload.section,
      isDeleted: false,
    });

  if (isOfferedCourseExists) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      'This course section is already offered!',
    );
  }

  // Step 8:
  // Create

  const result = await OfferedCourse.create(payload);

  return result;
};


// ===============================
// Get All Offered Courses
// ===============================

const getAllOfferedCoursesFromDB = async () => {
  const result = await OfferedCourse.find({
    isDeleted: false,
  })
    .populate('semesterRegistration')
    .populate('academicSemester')
    .populate('academicFaculty')
    .populate('course')
    .populate('faculty')
    .populate('academicDepartment');

  return result;
};


// ===============================
// Get Single Offered Course
// ===============================

const getSingleOfferedCourseFromDB = async (
  id: string,
) => {
  const result = await OfferedCourse.findOne({
    _id: id,
    isDeleted: false,
  })
    .populate('semesterRegistration')
    .populate('academicSemester')
    .populate('academicFaculty')
    .populate('academicDepartment')
    .populate('course')
    .populate('faculty');

  if (!result) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      'Offered course not found!',
    );
  }

  return result;
};


// ===============================
// Update Offered Course
// ===============================

const updateOfferedCourseIntoDB = async (
  id: string,
  payload: Partial<TOfferedCourse>,
) => {
  const isOfferedCourseExists =
    await OfferedCourse.findOne({
      _id: id,
      isDeleted: false,
    });

  if (!isOfferedCourseExists) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      'Offered course not found!',
    );
  }

  // If course is changed
  if (payload.course) {
    const isCourseExists = await Course.findById(
      payload.course,
    );

    if (!isCourseExists) {
      throw new AppError(
        httpStatus.NOT_FOUND,
        'Course not found!',
      );
    }
  }

  // If academic department is changed
  if (payload.academicDepartment) {
    const isDepartmentExists =
      await academicDepartment.findById(
        payload.academicDepartment,
      );

    if (!isDepartmentExists) {
      throw new AppError(
        httpStatus.NOT_FOUND,
        'Academic department not found!',
      );
    }
  }

  // If academic faculty is changed
  if (payload.academicFaculty) {
    const isFacultyExists =
      await academicFaculty.findById(
        payload.academicFaculty,
      );

    if (!isFacultyExists) {
      throw new AppError(
        httpStatus.NOT_FOUND,
        'Academic faculty not found!',
      );
    }
  }

  // If faculty list is changed
  if (payload.faculty?.length) {
    const facultyCount = await Faculty.countDocuments({
      _id: {
        $in: payload.faculty,
      },
    });

    if (facultyCount !== payload.faculty.length) {
      throw new AppError(
        httpStatus.NOT_FOUND,
        'One or more faculty not found!',
      );
    }
  }

  const result =
    await OfferedCourse.findByIdAndUpdate(
      id,
      payload,
      {
        new: true,
        runValidators: true,
      },
    )
      .populate('semesterRegistration')
      .populate('academicSemester')
      .populate('academicFaculty')
      .populate('academicDepartment')
      .populate('course')
      .populate('faculty');

  return result;
};


// ===============================
// Delete Offered Course
// ===============================

const deleteOfferedCourseFromDB = async (
  id: string,
) => {
  const isOfferedCourseExists =
    await OfferedCourse.findOne({
      _id: id,
      isDeleted: false,
    });

  if (!isOfferedCourseExists) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      'Offered course not found!',
    );
  }

  const result =
    await OfferedCourse.findByIdAndUpdate(
      id,
      {
        isDeleted: true,
      },
      {
        new: true,
      },
    );

  return result;
};


export const OfferedCourseService = {
  createOfferedCourseIntoDB,
  getAllOfferedCoursesFromDB,
  getSingleOfferedCourseFromDB,
  updateOfferedCourseIntoDB,
  deleteOfferedCourseFromDB,
};