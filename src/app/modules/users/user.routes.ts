
import express from 'express';
import { userController } from './user.controlar';
const router = express.Router();
// create a new user with student role
router.post('/create-student', userController.createStudent);
// get all users
router.get('/all-users', userController.getUsers);

export default router;