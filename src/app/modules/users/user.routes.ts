
import express from 'express';
import { userController } from './user.controlar';
import { validateRequest } from '../../middlewares/valiedeRequest';
import { createStudentZodSchema } from '../student/studentVelidetion';
const router = express.Router();
// create a new user with student role
router.post('/create-student', validateRequest(createStudentZodSchema), userController.createStudent);
// get all users
router.get('/all-users', userController.getUsers);
// get user by id
router.get('/:id', userController.getUserById);
// update user
router.patch('/:id', userController.updateUser);
export default router;