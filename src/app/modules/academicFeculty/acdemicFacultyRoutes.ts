import  express  from 'express';
import { validateRequest } from '../../middlewares/valiedeRequest';
import { createAcademicFacultyValidationSchema } from './academicFacultyValidetion';
import { academicFacultyControlar } from './cademicFacultyControlar';
//
const router = express.Router();
// create academicFaculty
router.post('/create-academicFaculty',
    validateRequest(createAcademicFacultyValidationSchema),
    academicFacultyControlar.createAcademicFaculty
)

// get all academicFaculty
router.get('/academic-faculties',academicFacultyControlar.getAcademicFaculty)



export const academicFacultyRoutes = router;