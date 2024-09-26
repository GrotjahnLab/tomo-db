const express = require('express');
const router = express.Router();
const catalogController = require('../controllers/catalogController');

router.get('/', catalogController.homepage);
router.get('/catalog/add', catalogController.addCatData);
router.post('/catalog/add', catalogController.postCatData);
router.get('/catalogData/view/:_id', catalogController.viewCatDetails);
router.get('/catalog/edit/:_id', catalogController.editCatData);
router.put('/catalog/edit/:id', catalogController.updateCatData);
router.delete('/catalogData/delete/:_id', catalogController.deleteCatData);
module.exports = router;