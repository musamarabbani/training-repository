var router = require('express').Router();
const todoRoutes = require('./todoRoutes');
const todoItemsRoutes = require('./todoItemRoutes');

router.use('/todo', todoRoutes);
router.use('/todoItems', todoItemsRoutes);

module.exports = router;
