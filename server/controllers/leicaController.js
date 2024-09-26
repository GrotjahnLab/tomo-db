const mongoose = require('mongoose');
const Experiment = require('../models/Experiment');
const Leica = require('../models/Leica');
const SamplePrep = require('../models/SamplePrep');


/**
 * GET /
 * Homepage
 */
exports.homepage = async (req, res) => {
    const locals = {
        title: "TOMODB",
        description: 'A dashboard with tomographic experiment data'
    }

    try {
        const esp = await Leica.find({}).limit(5);
        res.render('experimentDetails/details', {
            locals,
            esp
        });
    }catch(error){
        console.log(error);
    }
};

/**
 * GET /
 * New Experiment Form
 */
exports.addLeicaData = async (req, res) => {
    const locals = {
        title: 'Add New Leica Data',
        description: 'A dashboard with tomographic experiment data'
    };

    const experimentId = req.query.experimentId;

    res.render('experimentDetails/addLeicaData', { locals, experimentId });
};

/**
 * POST /
 * Create New Experiment
 */



exports.postLeicaData = async (req, res) => {
    console.log('Received data:', req.body);
    try {
        const newLeicaData = new Leica({
            experimentId: req.body.experimentId,
            dateMicroscopy: req.body.dateMicroscopy,
            gridBox: req.body.gridBox,
            LM_filename: req.body.LM_filename,
            details: req.body.details
        });

        const savedData = await newLeicaData.save();
        console.log('Saved Leica data:', savedData);
        res.redirect(`/details/${req.body.experimentId}`);
    } catch (error) {
        console.error('Error saving Leica data:', error);
        res.status(500).render('error', { message: 'Error saving Leica data', error: error.message });
    }
};


/**
 * GET /
 * Leica Data
 */
exports.viewLeicaData = async (req, res) => {
    try {
        const leicaData = await Leica.findOne({_id: req.params._id});

        if (!leicaData) {
            return res.status(404).send('Leica Data not found');
        }

        const locals = {
            title: "View Leica Data",
            description: "Details of the Leica microscopy data"
        };

        res.render('leicaData/viewLeica', {
            locals,
            leicaData
        });
    } catch (error) {
        console.log(error);
        res.status(500).send('Internal Server Error');
    }
};

/**
 * GET/
 * Edit Leica Data
 */

exports.editLeicaData = async (req, res) => {
    try {
        const leicaData = await Leica.findOne({_id: req.params._id});
        if (!leicaData) {
            return res.status(404).send('Leica Data not found');
        }

        const locals = {
            title: "Edit Leica Data",
            description: "Edit tomographic experiment Leica microscopy data"
        };

        res.render('leicaData/editLeica', {
            locals,
            leicaData
        });
    } catch (error) {
        console.log(error);
        res.status(500).send('Internal Server Error');
    }
};

/**
 * PUT /
 * Update Leica Data
 */
exports.updateLeicaData = async (req, res) => {
    try {
        const updatedLeicaData = await Leica.findByIdAndUpdate(req.params._id, {
            dateMicroscopy: req.body.dateMicroscopy,
            gridBox: req.body.gridBox,
            LM_filename: req.body.LM_filename,
            details: req.body.details,
            updatedAt: Date.now()
        }, { new: true, runValidators: true });

        if (!updatedLeicaData) {
            return res.status(404).send('Leica data not found');
        }

        res.redirect(`/leica/view/${req.params._id}`);
    } catch (error) {
        console.error('Error updating Leica data:', error);
        res.status(500).render('error', { message: 'Error updating Leica data' });
    }
};

exports.deleteLeicaData = async (req, res) => {
    try {
        const result = await Leica.findByIdAndDelete(req.params._id);
        
        if (!result) {
            return res.status(404).send("Leica data not found");
        }
        
        res.redirect(`/experiment/${result.experimentId}`);
    } catch (error) {
        console.error('Error deleting Leica data:', error);
        res.status(500).send("Error deleting Leica data");
    }
};