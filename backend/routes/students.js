const router = require('express').Router();
const studentController = require('../controllers/studentController');
const auth = require('../middleware/authMiddleware');

router.post('/', auth, studentController.createStudent);
router.get('/', auth, studentController.getStudents);
router.get('/:id', auth, studentController.getStudent);
router.put('/:id', auth, studentController.updateStudent);
router.patch('/:id/status', auth, studentController.updateStatus);

module.exports = router;
