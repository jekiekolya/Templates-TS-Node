// NOTE: Create only for testing calculate Total when RabbitMQ is not connected
import { Schema, model } from 'mongoose';

// Start
const userSchema = new Schema({
  name: String,
  price: Number,
});

const User = model('User', userSchema);

export default User;
