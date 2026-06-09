import  express  from 'express';
import { validateRequest } from '../../middlewares/valiedeRequest';
import { createAcademicFacultyValidationSchema } from './academicFacultyValidetion';
import { academicFacultyControlar } from './cademicFacultyControlar';
//
const router = express.Router();

router.post('/create-academicFeculty',
    validateRequest(createAcademicFacultyValidationSchema),
    academicFacultyControlar.createAcademicFaculty
)


export const academicFacultyRoutes = router;