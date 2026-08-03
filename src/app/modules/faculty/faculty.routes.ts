import express from "express";
import { validateRequest } from "../../middlewares/valiedeRequest";
import { facultyControlar } from "./faculty.controlar";

// faculty routes
const router = express.Router();

// get all faculties
router.get('/faculties', facultyControlar.getAllFaculty);


export const facultyRoutes = router;