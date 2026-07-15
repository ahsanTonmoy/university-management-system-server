import express from "express";
import { studentController } from "./student.controlar";
import { validateRequest } from "../../middlewares/valiedeRequest";
import { updateStudentSchema } from "./studentVelidetion";
// 
const router = express.Router();
router.get("/all-students", studentController.getStudents);
// student find by id
router.get("/:id", studentController.findStudentById);
// update student
router.put("/:id",validateRequest(updateStudentSchema), studentController.updateStudent);
// delete
router.delete("/:id", studentController.deleteStudent);

export default router;
