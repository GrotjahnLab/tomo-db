const express = require('express');
const router = express.Router();
const dataProController = require('../controllers/dataProController');

/**
 * Routes
 */

router.get('/', dataProController.homepage);
router.get('/dataProcessing/add', dataProController.addDataProcessing);
router.post('/dataProcessing/add', dataProController.postDataProcessing);
router.get('/dataProcessing/view/:id', dataProController.viewProcessingDetails);
router.get('/dataProcessing/edit/:id', dataProController.editProcessingDetails);
router.put('/dataProcessing/edit/:id', dataProController.editProcessingDetails);
router.delete('/dataProcessing/delete/:_id', dataProController.deleteProcessingData);

module.exports = router;