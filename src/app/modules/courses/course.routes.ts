import express from 'express';
import { validateRequest } from '../../middlewares/valiedeRequest';
import { CourseController } from './course.controlar';
import { CourseValidation } from './course.validetion';

const router = express.Router();

router.post(
  '/create-course',
  validateRequest(CourseValidation.createCourseValidationSchema),
  CourseController.createCourse,
);

router.get('/', CourseController.getAllCourses);

router.get('/:id', CourseController.getSingleCourse);

router.patch(
  '/:id',
  validateRequest(CourseValidation.updateCourseValidationSchema),
  CourseController.updateCourse,
);

//
router.put(
  '/:id/assign-faculties',
  validateRequest(CourseValidation.CourseFacultyValidationSchema),
  CourseController.assignFaculty,
);
router.delete(
  '/:id/remove-faculties',
  CourseController.deleteFaculty,
);

router.delete('/:id', CourseController.deleteCourse);

export const CourseRoutes = router;