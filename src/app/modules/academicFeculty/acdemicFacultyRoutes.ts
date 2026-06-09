import  express  from 'express';
import { validateRequest } from '../../middlewares/valiedeRequest';
import { createAcademicFacultyValidationSchema } from './academicFacultyValidetion';
import { academicFacultyControlar } from './academicFacultyControlar';
//
const router = express.Router();
// create academicFaculty
router.post('/create-academicFaculty',
    validateRequest(createAcademicFacultyValidationSchema),
    academicFacultyControlar.createAcademicFaculty
)

// get all academicFaculty
router.get('/academic-faculties',academicFacultyControlar.getAcademicFaculty)

// get single academic faculty
router.get('/:id',academicFacultyControlar.getSingleAcademicFacultyById)


export const academicFacultyRoutes = router;