const express = require('express');
const { getTherapists, getUsers } = require('../controllers/userController');
const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

router.get('/therapists', getTherapists);
router.get('/', protect, authorize('admin'), getUsers);

module.exports = router;