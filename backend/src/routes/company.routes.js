import { Router } from 'express';
import { upload } from '../middlewares/multer.middleware.js';
import { createCompany } from '../controllers/company.controller.js';

const router = Router();

router.route('/signup').post(upload.single('companyImage'), createCompany);

export default router;
