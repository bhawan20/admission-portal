const jwt = require('jsonwebtoken');
const User = require('../models/User');

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET || 'devsecret', { expiresIn: '7d' });
};

const setAuthCookies = (res, token, user) => {
  // Set token cookie and role cookie
  res.cookie('token', token, {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });
  res.cookie('role', user.role || 'user', {
    httpOnly: false,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });
};

exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ message: 'User already exists' });
    const user = await User.create({ name, email, password });
    const token = generateToken(user._id);
    setAuthCookies(res, token, user);
    return res.status(201).json({ message: 'Registered', user });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'Invalid credentials' });
    const isMatch = await user.matchPassword(password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });
    const token = generateToken(user._id);
    setAuthCookies(res, token, user);
    return res.json({ message: 'Logged in', user });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

exports.checkSession = async (req, res) => {
  try {
    const token = req.cookies?.token;
    if (!token) return res.status(401).json({ message: 'Not authenticated' });
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'devsecret');
    const user = await User.findById(decoded.id).select('-password');
    if (!user) return res.status(401).json({ message: 'Not authenticated' });
    return res.json({ user });
  } catch (err) {
    return res.status(401).json({ message: 'Not authenticated' });
  }
};

exports.logout = async (req, res) => {
  res.clearCookie('token');
  res.clearCookie('role');
  res.json({ message: 'Logged out' });
};
