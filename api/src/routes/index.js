const {Router} = require('express');
const allCategories = require('./categories.js');
const {footwearRoutes} = require('./footwearRoutes.js');

const router = Router();

router.use('/allFootwear/', footwearRoutes);
// router.use('/users', usersRoutes);
router.use('/allCategories', allCategories);

module.exports = router;