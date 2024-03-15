const express = require('express');
const router = express.Router();

const homeRoutes = require('./homeRoutes');
const shopRoutes = require('./shopRoutes');
const cartRoutes = require('./cartRoutes');
const accountRoutes = require('./accountRoutes');
const authRoutes = require('./authRoutes');

router.use('/', homeRoutes);
router.use('/shop', shopRoutes);
router.use('/cart', cartRoutes);
router.use('/account', accountRoutes);
router.use('/auth', authRoutes);

module.exports = router;
