import express from "express";
import { studentController } from "./student.controlar";
// 
const router = express.Router();
router.get("/all-students", studentController.getStudents);
// router.get("/:id", studentController.getStudentById);
// router.put("/:id", studentController.updateStudent);
// router.delete("/:id", studentController.deleteStudent);
export default router;
