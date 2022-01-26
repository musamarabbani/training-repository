const router = require('express').Router();
const userRoutes = require('./userRoutes');
const postRoutes = require('./postRoutes');
const jobRoutes = require('./jobRoutes');

router.use('/user', userRoutes);
router.use('/post', postRoutes);
router.use('/job', jobRoutes);

module.exports = router;
