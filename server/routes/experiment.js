const express = require('express')
const router = express.Router();
const experimentController = require('../controllers/experimentController');

/**
 *  Experiment Routed
 */

router.get('/', experimentController.homepage);


router.get('/add', experimentController.addExperiment);
router.post('/add', experimentController.postExperiment);

module.exports = router;