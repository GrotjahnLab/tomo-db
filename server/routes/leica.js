const express = require('express');
const router = express.Router();
const leicaController = require('../controllers/leicaController');

/**
 * Leica Routes
 */

router.get('/leica', leicaController.homepage);
router.get('/leica/add', leicaController.addLeicaData);
router.post('/leica/add', leicaController.postLeicaData);
router.get('/leica/view/:_id', leicaController.viewLeicaData);
router.get('/leica/edit/:_id', leicaController.editLeicaData);
router.put('/leica/edit-data/:_id', leicaController.updateLeicaData);
router.delete('/leica/delete/:_id', leicaController.deleteLeicaData);
module.exports = router;
