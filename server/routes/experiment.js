const express = require('express');
const router = express.Router();
const experimentController = require('../controllers/experimentController');

/**
 *  Experiment Routes
 */

router.get('/', experimentController.homepage);
router.get('/add', experimentController.addExperiment);
router.post('/add', experimentController.postExperiment);
router.get('/view/:_id', experimentController.viewExperiment);

router.get('/edit/:_id', experimentController.editExperiment);
router.put('/edit/:_id', experimentController.editPost);
router.delete('/edit/:_id', experimentController.deleteExperiment);
router.post('/search', experimentController.searchExperiment);
router.get('/details/:_id', experimentController.detailsExperiment);


module.exports = router;