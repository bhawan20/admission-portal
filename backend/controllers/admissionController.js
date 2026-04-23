const Student = require('../models/Student');
const fs = require('fs');
const path = require('path');

exports.submitPersonalDetails = async (req, res) => {
  try {
    const { name, email, mobile, address } = req.body;
    // file from multer
    const file = req.file;

    if (!name || !email || !mobile) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    // Check if user already has a pending application (by email)
    const existing = await Student.findOne({ email, status: 'pending' });
    if (existing) {
      return res.status(400).json({ message: 'You already have a pending application here' });
    }

    const docEntry = file ? { name: file.originalname, type: 'counseling_letter', url: `/uploads/${file.filename}` } : null;

    const student = await Student.create({
      firstName: name,
      email,
      phone: mobile,
      address,
      documents: { academicDocuments: docEntry ? [docEntry] : [] }
    });

    res.status(201).json({ success: true, data: student });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};
