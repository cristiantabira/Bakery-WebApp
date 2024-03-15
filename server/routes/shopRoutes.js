const express = require('express');
const router = express.Router();
const shopController = require('../controllers/shopController');

// Shop page route
router.get('/', shopController.index);

// Add more routes as needed

module.exports = router;
