const mongoose = require('mongoose')
const { Schema } = mongoose;

const paymentSchema = new Schema({
  paymentStatus: String,
  firstName: String,
  lastName: String,
  email: String,
  phone: String,
  amount: Number,
  paidAt: String,
  createdAt: String,
  currency: String,
  ipAddress: String,
  channel: String,
  cardType: String,
  bank: String,
  paymentBy: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
    }
}, { timestamps: true });

module.exports = mongoose.model('payment', paymentSchema);
