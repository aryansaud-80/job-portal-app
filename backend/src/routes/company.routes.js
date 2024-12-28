import { Router } from 'express';
import { upload } from '../middlewares/multer.middleware.js';
import {
  createCompany,
  deleteCompany,
  getCompanyData,
  loginCompany,
  updateCompany,
  updateCompanyImage,
  updatedPassword,
} from '../controllers/company.controller.js';
import { jwtVerifyToken } from '../helper/auth.helper.js';

const router = Router();

router.route('/signup').post(upload.single('companyImage'), createCompany);
router.route('/login').post(loginCompany);
router.route('/delete-company').delete(jwtVerifyToken, deleteCompany);
router.route('/update-company').patch(jwtVerifyToken, updateCompany);
router
  .route('/update-companyImage')
  .patch(jwtVerifyToken, upload.single('companyImage'), updateCompanyImage);
router.route('/update-company-password').patch(jwtVerifyToken, updatedPassword);
router.route("/get-company-data").get(jwtVerifyToken,getCompanyData)

export default router;
