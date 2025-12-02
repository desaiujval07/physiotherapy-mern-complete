const express = require('express');
const {
  getTestimonials,
  getAllTestimonials,
  createTestimonial,
  approveTestimonial
} = require('../controllers/testimonialController');
const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

router.route('/')
  .get(getTestimonials)
  .post(protect, createTestimonial);

router.get('/all', protect, authorize('admin'), getAllTestimonials);
router.put('/:id/approve', protect, authorize('admin'), approveTestimonial);

module.exports = router;