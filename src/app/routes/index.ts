// set routes
import { Router } from 'express';
import userRoutes from '../modules/users/user.routes';
import studentRoutes from '../modules/student/student.routes';
import { academicSemesterRoutes } from '../modules/academicSemester/academicSemesterRoutes';
import { academicFacultyRoutes } from '../modules/academicFeculty/acdemicFacultyRoutes';
import { academicDepartmentRoutes } from '../modules/academicDepartment/academicDepartmentRoutess';
import { facultyRoutes } from '../modules/faculty/faculty.routes';
import { AdminRoutes } from '../modules/admin/admin.routes';
import { CourseRoutes } from '../modules/courses/course.routes';
   


const router = Router();

const moduleRoutes = [
  { path: '/user',
    routes: userRoutes 
},

{
    path: '/student',
    routes: studentRoutes ,
},
{
    path: '/academicSemester',
    routes: academicSemesterRoutes ,
},
{
    path: '/academicFaculty',
    routes: academicFacultyRoutes ,
},
{
    path: '/academicDepartment',
    routes: academicDepartmentRoutes ,
},
{
    path: '/faculty',
    routes: facultyRoutes ,
},
{
    path: '/admin',
    routes: AdminRoutes ,
},
{
    path: '/courses',
    routes: CourseRoutes ,
},






];

moduleRoutes.forEach((route) => {
  router.use(route.path, route.routes);
}); 

export default router;