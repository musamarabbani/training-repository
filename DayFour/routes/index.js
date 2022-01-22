var router = require('express').Router();
const todoRoutes = require('./todoRoutes');

router.use('/todo', todoRoutes);

module.exports = router;
