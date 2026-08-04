import express from "express";
import { validateRequest } from "../../middlewares/valiedeRequest";
import { facultyControlar } from "./faculty.controlar";
import { updateFacultyValidationSchema } from "./faculty.validetion";

// faculty routes
const router = express.Router();

// get all faculties
router.get('/faculties', facultyControlar.getAllFaculty);

// single faculty
router.get('/:id',facultyControlar.singleFaculty);
// update faculty
router.patch('/update-faculty/:id',validateRequest(updateFacultyValidationSchema),facultyControlar.updateFaculty);

// delete faculty
router.delete('/delete-faculty/:id',facultyControlar.deleteFaculty);


export const facultyRoutes = router;