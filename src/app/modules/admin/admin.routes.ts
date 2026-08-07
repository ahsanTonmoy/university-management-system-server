import express from 'express';
import { validateRequest } from '../../middlewares/valiedeRequest';
import { AdminValidation } from './admin.validetion';
import { userController } from '../users/user.controlar';
import { AdminController } from './admin.controlar';

const router = express.Router();

// create admin
router.post(
  '/create-admin',
  validateRequest(AdminValidation.createAdminValidationSchema),
  userController.createAdmin,
);


// Get all admins
router.get('/all-admins', AdminController.getAllAdmins);

// Get single admin
router.get('/admin/:id', AdminController.getSingleAdmin);

// Update admin
router.patch(
  '/update-admin/:id',
  validateRequest(AdminValidation.updateAdminValidationSchema),
  AdminController.updateAdmin,
);

// Delete admin
router.delete('/delete-admin/:id', AdminController.deleteAdmin);

export const AdminRoutes = router;  

