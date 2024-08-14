const express = require('express');
const router = express.Router();
const samplePrepController = require('../controllers/samplePrepController');

/**
 * SamplePrep Routes
 */
router.get('/', samplePrepController.homepage);
router.get('/addPrepData', samplePrepController.addPrepData);
router.post('/addPrepData', samplePrepController.postPrepData);
router.get('/prep-data/:_id', samplePrepController.viewPrepData);
router.get('/edit-data/:_id', samplePrepController.editPrepData);
router.put('/edit-data/:_id', samplePrepController.updatePrepData);
router.delete('/edit-data/:_id', samplePrepController.deletePrepData);



module.exports = router;
