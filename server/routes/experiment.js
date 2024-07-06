const express = require('express')
const router = express.Router();
const experimentController = require('../controllers/experimentController');

/**
 *  Experiment Routed
 */

router.get('/', experimentController.homepage);

module.exports = router;