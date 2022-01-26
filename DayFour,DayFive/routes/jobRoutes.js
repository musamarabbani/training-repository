const express = require('express');
const router = express.Router();
const jobController = require('../controllers/Jobs');

router.post('/create', jobController.createJob);
router.get('/file/:fileName', jobController.getFiles);

module.exports = router;
