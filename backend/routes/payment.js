const router = require('express').Router();
const auth = require('../middleware/authMiddleware');
const { getMyPayment, recordPayment } = require('../controllers/paymentController');

router.get('/payment/me', auth, getMyPayment);
router.post('/student/payment', auth, recordPayment);

module.exports = router;
