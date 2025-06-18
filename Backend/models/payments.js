const user = require('./user')
const mongoose = require('mongoose');
const { Schema } = mongoose;

const paymentSchema = new Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: user,
    required: true
  },
  orderId: {
    type: String,
    required: true
  },
  paymentId: {
    type: String,
    required: true
  },
  signature: {
    type: String,
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  currency: {
    type: String,
    default: 'INR'
  },
  status: {
    type: String,
    enum: ['created', 'paid', 'failed'],
  },
  cartItems: [
    {
      name: String,
      qty: Number,
      price: Number,
      total: Number
    }
  ],
  couponApplied: {
    type: Boolean,
    default: false
  },
  couponCode: String,
  discountAmount: Number,
  grandTotal: Number,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// ✅ Fixed model name string
const Payment = mongoose.model("Payment", paymentSchema);
module.exports = Payment;
