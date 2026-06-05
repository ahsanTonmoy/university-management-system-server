// set routes
import { Router } from 'express';
import userRoutes from '../modules/users/user.routes';
import studentRoutes from '../modules/student/student.routes';
import { academicSemesterRoutes } from '../modules/academicSemester/academicSemesterRoutes';
   


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
}



];

moduleRoutes.forEach((route) => {
  router.use(route.path, route.routes);
}); 

export default router;