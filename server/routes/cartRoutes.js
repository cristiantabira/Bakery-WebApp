const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');

// Cart page route
router.get('/', cartController.index);

// Add more routes as needed

module.exports = router;
