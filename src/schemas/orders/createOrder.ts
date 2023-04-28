import Joi from 'joi';
import constants from '../../constants';

const orderProductSchema = Joi.object({
  productId: Joi.string().required().messages({
    'string.base': 'Product ID must be a string',
    'string.empty': 'Product ID cannot be empty',
    'any.required': `"Product ID" is a required field`,
  }),
  quantity: Joi.number().integer().min(1).required().messages({
    'number.base': 'Quantity must be a number',
    'number.empty': 'Quantity cannot be empty',
    'number.integer': 'Quantity must be an integer',
    'number.min': 'Quantity must be at least {#limit}',
    'any.required': 'Quantity is required',
  }),
});

const createOrderSchema = Joi.object({
  products: Joi.array().items(orderProductSchema).min(1).required().messages({
    'array.base': `"Products" should be an array`,
    'array.empty': `"Products" must contain value`,
    'any.required': `"Products" is a required field`,
  }),
  shippingMethod: Joi.string()
    .valid(...constants.shippingMethods)
    .required()
    .messages({
      'string.base': 'Shipping method must be a string',
      'string.empty': 'Shipping method cannot be empty',
      'any.only': 'Invalid shipping method',
      'any.required': 'Shipping method is required',
    }),
  paymentMethod: Joi.string()
    .valid(...constants.paymentMethods)
    .required()
    .messages({
      'string.base': 'Payment method must be a string',
      'string.empty': 'Payment method cannot be empty',
      'any.only': 'Invalid payment method',
      'any.required': 'Payment method is required',
    }),
})
  .required()
  .messages({
    'any.required': `missing fields`,
  });

export default createOrderSchema;
