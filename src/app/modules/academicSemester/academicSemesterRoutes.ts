import express from "express";
import { validateRequest } from "../../middlewares/valiedeRequest";
import { createAcademicSemesterZodSchema } from "./academicSemsterValidetion";
import { academicSemesterController } from './academicSemesterControlar';
// academicSemester routes
const router = express.Router();

router.post("/create-semester", validateRequest(createAcademicSemesterZodSchema), academicSemesterController.createAcademicSemester);


export const academicSemesterRoutes = router;