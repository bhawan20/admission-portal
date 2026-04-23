const router = require('express').Router();
const admin = require('../middleware/authMiddleware');
const { listApplications, getApplication, updateApplication, countByStatus } = require('../controllers/adminController');

// For simplicity assume auth middleware sets req.user and you have role encoded in cookie 'role'
const requireAdmin = (req, res, next) => {
  const role = req.cookies?.role || req.headers['x-role'];
  if (role !== 'admin') return res.status(403).json({ message: 'Forbidden' });
  next();
};

router.get('/applications', admin, requireAdmin, listApplications);
router.get('/applications/:id', admin, requireAdmin, getApplication);
router.put('/applications/:id', admin, requireAdmin, updateApplication);
router.get('/count-by-status', admin, requireAdmin, countByStatus);

module.exports = router;
