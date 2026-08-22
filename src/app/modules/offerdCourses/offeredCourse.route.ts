import express from 'express';
import { OfferedCourseController } from './offeredCourse.controller';
import {
  OfferedCourseValidation,
} from './offeredCourse.validation';
import { validateRequest } from '../../middlewares/valiedeRequest';

const router = express.Router();


// Create
router.post(
  '/registration-offered-course',
  validateRequest(
    OfferedCourseValidation
      .createOfferedCourseValidationSchema,
  ),
  OfferedCourseController.createOfferedCourse,
);


// Get All
router.get(
  '/',
  OfferedCourseController.getAllOfferedCourses,
);


// Get Single
router.get(
  '/:id',
  OfferedCourseController.getSingleOfferedCourse,
);


// Update
router.patch(
  '/:id',
  validateRequest(
    OfferedCourseValidation
      .updateOfferedCourseValidationSchema,
  ),
  OfferedCourseController.updateOfferedCourse,
);


// Delete
router.delete(
  '/:id',
  OfferedCourseController.deleteOfferedCourse,
);


export const OfferedCourseRoutes = router;