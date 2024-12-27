import { Router } from 'express';
import { webhookController } from '../controllers/clerkWebhook.controller.js';

const router = Router();

router.route('/webhook').post(webhookController);

export default router;
