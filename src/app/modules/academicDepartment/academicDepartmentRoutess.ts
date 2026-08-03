import express from 'express'
import { validateRequest } from '../../middlewares/valiedeRequest';
import { createAcademicDepartmentValidationSchema, updateAcademicDepartmentValidationSchema } from './academicDepartment.validetion';
import { academicDepartmentControlar } from './academicDepartment.controlar';

const router = express.Router();

// create academicDepartment 
router.post('/create-academicDepartment',
    validateRequest(createAcademicDepartmentValidationSchema),
    academicDepartmentControlar.createAcademicDepartment
)

// get all academicDepartment
router.get('/academic-departments', academicDepartmentControlar.getAllAcademicDepartment)

// single academicDepartment
router.get('/academic-department/:id',academicDepartmentControlar.singleAcademicDepartment);

// update academicDepartment
router.patch('/update-academic-department/:id',validateRequest(updateAcademicDepartmentValidationSchema),academicDepartmentControlar.updateAcademicDepartment);
// delete single academicDepartment
router.delete('/delete-academic-department/:id',academicDepartmentControlar.deleteAcademicDepartment);

export const academicDepartmentRoutes = router;