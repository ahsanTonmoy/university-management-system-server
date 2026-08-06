import express from "express";
import { validateRequest } from "../../middlewares/valiedeRequest";
import { createAcademicSemesterZodSchema, updateAcademicSemesterZodSchema } from "./academicSemsterValidetion";
import { academicSemesterController } from './academicSemesterControlar';
// academicSemester routes
const router = express.Router();

router.post("/create-semester", validateRequest(createAcademicSemesterZodSchema), academicSemesterController.createAcademicSemester);
router.get("/all-semesters", academicSemesterController.getAcademicSemesters);
router.get("/:semesterId", academicSemesterController.getAcademicSemester);
router.patch("update-semester/:id",validateRequest(updateAcademicSemesterZodSchema), academicSemesterController.updateAcademicSemester);
router.delete("delete-semester/:id", academicSemesterController.deleteAcademicSemester);

export const academicSemesterRoutes = router;