const {Router} = require('express');
const allCategories = require('./categories.js');

const router = Router();

// router.use('/shoes', shoesRoutes);
// router.use('/users', usersRoutes);
router.use('/allCategories', allCategories);

module.exports = router;