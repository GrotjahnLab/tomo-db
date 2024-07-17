const express = require('express');
const router = express.Router();
const samplePrepController = require('../controllers/samplePrepController');

/**
 * SamplePrep Routes
 */
router.get('/', samplePrepController.homepage);
router.get('/addPrepData', samplePrepController.addPrepData);


module.exports = router;
