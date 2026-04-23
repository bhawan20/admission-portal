const mongoose = require('mongoose');

const PaymentSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  transactionId: { type: String, required: true },
  amount: { type: Number, required: true },
  paymentStatus: { type: String, enum: ['pending','success','failed'], default: 'pending' },
  isApproved: { type: Boolean, default: false },
  paymentDate: { type: Date, default: Date.now }
}, { timestamps: true });

module.exports = mongoose.model('Payment', PaymentSchema);
