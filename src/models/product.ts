// NOTE: Create only for testing calculate Total when RabbitMQ is not connected
import { Schema, model } from 'mongoose';

// Start
const productSchema = new Schema({
  name: String,
  price: Number,
});

const Product = model('Product', productSchema);

export default Product;
