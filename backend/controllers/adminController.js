const Student = require('../models/Student');

exports.listApplications = async (req, res) => {
  try {
    const { status, search, course } = req.query;
    const filter = {};
    if (status) filter.status = status;
    if (course) filter.course = course;
    if (search) filter.$or = [ { firstName: new RegExp(search, 'i') }, { email: new RegExp(search, 'i') } ];

    const apps = await Student.find(filter).sort({ createdAt: -1 });
    return res.json({ success: true, data: apps });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

exports.getApplication = async (req, res) => {
  try {
    const app = await Student.findById(req.params.id);
    if (!app) return res.status(404).json({ message: 'Not found' });
    return res.json({ success: true, data: app });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

exports.updateApplication = async (req, res) => {
  try {
    const updated = await Student.findByIdAndUpdate(req.params.id, req.body, { new: true });
    return res.json(updated);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

exports.countByStatus = async (req, res) => {
  try {
    const result = await Student.aggregate([
      { $group: { _id: '$status', count: { $sum: 1 } } }
    ]);
    return res.json({ success: true, data: result });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};
