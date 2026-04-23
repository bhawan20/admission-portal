const router = require('express').Router();
const multer = require('multer');
const path = require('path');
const auth = require('../middleware/authMiddleware');
const { submitPersonalDetails } = require('../controllers/admissionController');

// Ensure uploads directory exists
const uploadDir = path.join(__dirname, '..', 'uploads');
const fs = require('fs');
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir);

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    const unique = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, unique + path.extname(file.originalname));
  }
});

const upload = multer({ storage });

router.post('/personal-details', auth, upload.single('counselingLetter'), submitPersonalDetails);

module.exports = router;
