const express = require('express');
const router = express.Router();
const kriosController = require('../controllers/kriosController');

/**
 * Milling Routes
 */

router.get('/', kriosController.homepage);
router.get('/krios/add', kriosController.addKriosData);
router.post('/krios/add', kriosController.postKriosData);
router.get('/krios/view/:_id', kriosController.viewKriosData);
router.get('/krios/edit/:_id', kriosController.editKriosData);
router.put('/krios/edit-data/:id', kriosController.updateKriosData);
router.delete('/krios/delete/:_id', kriosController.deleteKriosData);

module.exports = router;
