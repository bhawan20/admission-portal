const router = require('express').Router();
const { register, login, checkSession, logout } = require('../controllers/authController');
const auth = require('../middleware/authMiddleware');

router.post('/register', register);
router.post('/login', login);
router.get('/check-session', checkSession);
router.post('/logout', auth, logout);

module.exports = router;
