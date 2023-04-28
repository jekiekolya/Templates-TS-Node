import express from 'express';

import middleware from '../middlewares';
import JOISchemas from '../schemas';
import ctrl from '../controllers';

const { ctrlWrapper, tokenValidation, JOIValidation } = middleware;
const { JOIOrdersSchemas } = JOISchemas;
const { ordersCtrl } = ctrl;

// Create router
const router = express.Router();

// Create order
router.post(
  '/',
  tokenValidation,
  JOIValidation(JOIOrdersSchemas.createOrderSchema),
  ctrlWrapper(ordersCtrl.createOrder)
);

// Get order by Id
router.get('/:orderId', tokenValidation, ctrlWrapper(ordersCtrl.getOrderById));

export default router;
