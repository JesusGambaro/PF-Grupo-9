const {Router} = require('express');
const {footwearRoutes} = require('./footwearRoutes.js');

const router = Router();

router.use('/allFootwear/', footwearRoutes);
// router.use('/users', usersRoutes);

module.exports = router;