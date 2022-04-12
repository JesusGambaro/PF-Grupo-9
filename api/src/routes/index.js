const {Router} = require('express');
const footwearRoutes = require('./footwearRoutes.js');

const router = Router();

// router.use('/users', usersRoutes);
router.use('/allFootwear/', footwearRoutes);


module.exports = router;