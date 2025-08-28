
import express from 'express';
import { userController } from './user.controlar';
const router = express.Router();

router.post('/create-student', userController.createStudent);

export default router;