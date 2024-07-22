const express = require('express');
const router = express.Router();
const millingController = require('../controllers/millingController');

/**
 * Milling Routes
 */

router.get('/', millingController.homepage);
router.get('/milling/add', millingController.addMillingData);
router.post('/milling/add', millingController.postMillingData);
router.get('/milling/view/:_id', millingController.viewMillingData);
router.get('/milling/edit/:_id', millingController.editMillingData);
router.put('/milling/edit-data/:id', millingController.updateMillingData);
router.delete('/milling/delete/:_id', millingController.deleteMillingData);

module.exports = router;