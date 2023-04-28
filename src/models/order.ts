import { Schema, model, Document, SchemaTypes, Types } from 'mongoose';

// Helpers
import helpers from '../helpers';

// Constants
import constants from '../constants';

// Types
import { Status } from 'constants/status';
import { ShippingMethod } from 'constants/shippingMethods';
import { PaymentMethod } from 'constants/paymentMethods';

// Models
import mongooseModels from '../models';

const { handleMongooseError } = helpers;

// Interface
interface IOrder extends Document {
  customerId: Types.ObjectId;
  products: {
    productId: Types.ObjectId;
    quantity: number;
  }[];
  shippingMethod: ShippingMethod;
  paymentMethod: PaymentMethod;
  totalPrice: number;
  confirmation: boolean;
  status: Status;
  trackingNumber: string;
  carrier: string;
  notes: string;
  return: Types.ObjectId;
  payment: Types.ObjectId;
}

const orderSchema = new Schema<IOrder>(
  {
    customerId: {
      type: SchemaTypes.ObjectId,
      ref: 'User',
      required: [true, 'Customer ID is required'],
    },
    products: [
      {
        productId: {
          type: SchemaTypes.ObjectId,
          ref: 'Product',
          required: [true, 'Product ID is required'],
        },
        quantity: {
          type: Number,
          required: [true, 'Product quantity is required'],
          min: [1, 'Product quantity must be at least 1'],
        },
      },
    ],
    shippingMethod: {
      type: String,
      enum: [...constants.shippingMethods],
      required: [true, 'Shipping method is required'],
    },
    paymentMethod: {
      type: String,
      enum: [...constants.paymentMethods],
      required: [true, 'Payment method is required'],
    },
    totalPrice: {
      type: Number,
      // required: [true, 'Total amount is required'],
    },
    confirmation: { type: Boolean, default: false },
    status: {
      type: String,
      enum: [...constants.status],
      default: 'Pending',
    },
    trackingNumber: { type: String, default: null },
    carrier: { type: String, default: null },
    notes: { type: String, default: null },
    return: {
      type: SchemaTypes.ObjectId,
      ref: 'Return',
      default: null,
    },
    payment: { type: SchemaTypes.ObjectId, ref: 'Payment', default: null },
  },
  {
    versionKey: false,
    timestamps: true,

    // For virtual values
    toJSON: { virtuals: true },
  }
);

// Handle validation errors
orderSchema.post('save', handleMongooseError);

// NOTE: Create only for testing calculate Total when RabbitMQ is not connected
// Start
// calculate total price
orderSchema.pre('save', async function () {
  let total = 0;
  for (const productData of this.products) {
    const product = await mongooseModels.Product.findById(
      productData.productId
    );
    total += product.price * productData.quantity;
  }
  this.totalPrice = total; // set the totalPrice field on the order document
});
// NOTE: End

const Order = model('Order', orderSchema);

export default Order;
