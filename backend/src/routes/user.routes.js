import { Router } from 'express';
import {
  applyJob,
  getUserApplications,
  getUserData,
  updateResume,
} from '../controllers/user.controller.js';
import { upload } from '../middlewares/multer.middleware.js';
import { requireAuth } from '@clerk/express'

const router = Router();

router.route('/get-user-data').get(getUserData);
router.route('/apply-job/:jobId').post(requireAuth,applyJob);
router.route('/get-userApplications').get(getUserApplications);
router.route('/update-resume').patch(upload.single('resume'), updateResume);

export default router;
