const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');

// Cart page route
router.get('/', cartController.index);


module.exports = router;
