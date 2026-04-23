const Payment = require('../models/Payment');

exports.getMyPayment = async (req, res) => {
  try {
    const userId = req.user.id;
    const payment = await Payment.findOne({ user: userId }).sort({ createdAt: -1 });
    return res.json(payment || {});
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

exports.recordPayment = async (req, res) => {
  try {
    const userId = req.user.id;
    const { transactionId, amount, status } = req.body;
    if (!transactionId || !amount) return res.status(400).json({ message: 'Missing payment data' });
    const payment = await Payment.create({ user: userId, transactionId, amount, paymentStatus: status || 'pending' });
    return res.status(201).json({ success: true, data: payment });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};
