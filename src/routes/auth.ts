// NOTE: Only for creating token
import express from 'express';

import middleware from '../middlewares';
import ctrl from '../controllers';

const { ctrlWrapper } = middleware;
const { authCtrl } = ctrl;

// Create router
const router = express.Router();

// Get token for test
router.get('/token', ctrlWrapper(authCtrl.createJWTToken));

export default router;
