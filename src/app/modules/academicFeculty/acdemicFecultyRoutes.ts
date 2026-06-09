import  express  from 'express';
import { validateRequest } from '../../middlewares/valiedeRequest';
import { createAcademicFacultyValidationSchema } from './academicFecultyValidetion';
import { academicFecultyControlar } from './cademicFecultyControlar';
//
const router = express.Router();

router.post('/create-academicFeculty',
    validateRequest(createAcademicFacultyValidationSchema),
    academicFecultyControlar.createAcademicFeculty
)


export const academicFecultyRoutes = router;