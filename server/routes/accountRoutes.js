const express = require('express');
const router = express.Router();
const accountController = require('../controllers/accountController');

// Account dashboard route
router.get('/', accountController.dashboard);

// My Orders route
router.get('/my-orders', accountController.myOrders);

// Account Details route
router.get('/account-details', accountController.accountDetails);

module.exports = router;
