import express from "express";
import { studentController } from "./student.controlar";
// 
const router = express.Router();
router.get("/all-students", studentController.getStudents);
// student find by id
router.get("/:id", studentController.findStudentById);
// update student
router.put("/:id", studentController.updateStudent);
// delete
router.delete("/:id", studentController.deleteStudent);

export default router;
