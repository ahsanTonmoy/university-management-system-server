import express from "express";
import { validateRequest } from "../../middlewares/valiedeRequest";
import { semesterRegControlar } from "./semesterReg.controlar";
import { createSemesterRegistrationValidationSchema, updateSemesterRegistrationValidationSchema } from "./semesterReg.validetion";

const router = express.Router();

router.post(
  '/registration-semester',
  validateRequest(createSemesterRegistrationValidationSchema),
  semesterRegControlar.createSemesterRegControlar,
);

router.get('/', semesterRegControlar.getAllSemester);

router.get('/:id', semesterRegControlar.getSingleSemester);

router.patch(
  '/:id',
  validateRequest(updateSemesterRegistrationValidationSchema),
  semesterRegControlar.updateSemester,
);
//
router.delete('/:id', semesterRegControlar.deleteSemester);

export const semesterRegRoutes = router;