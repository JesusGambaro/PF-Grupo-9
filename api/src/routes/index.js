const {Router} = require('express');
const {shoesRoutes} = require('./shoesRoutes.js');

const router = Router();

router.use('/allFootwear/', shoesRoutes);
// router.use('/users', usersRoutes);

module.exports = router;