const User = require('../models/User');

// @desc    Get all therapists
// @route   GET /api/users/therapists
// @access  Public
exports.getTherapists = async (req, res) => {
  try {
    const therapists = await User.find({ role: 'therapist', isActive: true })
      .select('-password');
    
    res.status(200).json({ success: true, count: therapists.length, data: therapists });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get all users (admin)
// @route   GET /api/users
// @access  Private/Admin
exports.getUsers = async (req, res) => {
  try {
    const users = await User.find().select('-password');
    res.status(200).json({ success: true, count: users.length, data: users });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};