const express = require('express');
const router = express.Router();
const experimentController = require('../controllers/experimentController');

/**
 *  Experiment Routes
 */

router.get('/', experimentController.homepage);

router.get('/add', experimentController.addExperiment);
router.post('/add', experimentController.postExperiment);

router.get('/view/:id', experimentController.view);

module.exports = router;