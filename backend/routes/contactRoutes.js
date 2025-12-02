const express = require('express');
const { submitContact, getContacts } = require('../controllers/contactController');
const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

router.route('/')
  .post(submitContact)
  .get(protect, authorize('admin'), getContacts);

module.exports = router;