import { Router } from 'express';
import {
  changeJobVisibility,
  deleteJob,
  getAllJobs,
  getCompanyJobApplicants,
  getCompanyPostedJob,
  getJobById,
  postJob,
  verifyApplication,
} from '../controllers/job.controller.js';
import { jwtVerifyToken } from '../middlewares/auth.helper.js';

const router = Router();

router.route('/post-job').post(jwtVerifyToken, postJob);
router.route('/get-jobs').get(getAllJobs);
router.route('/get-job/:jobId').get(getJobById);
router
  .route('/change-visibility/:jobId')
  .patch(jwtVerifyToken, changeJobVisibility);
router.route('/delete-job/:jobId').delete(jwtVerifyToken, deleteJob);
router
  .route('/getCompanyJobsApplicants')
  .get(jwtVerifyToken, getCompanyJobApplicants);
router.route('/getCompanyPostedJobs').get(jwtVerifyToken, getCompanyPostedJob);
router.route('/verifyApplicant').patch(jwtVerifyToken, verifyApplication);

export default router;
