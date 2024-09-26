const mongoose = require('mongoose');
const Experiment = require('../models/Experiment');
const Leica = require('../models/Leica');
const SamplePrep = require('../models/SamplePrep');
const Milling = require('../models/Milling');
const Krios = require('../models/Krios');

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
        const krio = await Krios.find({}).limit(5);
        res.render('experimentDetails/details', {
            locals,
             krio
        });
    }catch(error){
        console.log(error);
    }
};



/**
 * GET /
 * New Krios Data Form
 */
exports.addKriosData = async (req, res) => {
    try {
        const locals = {
            title: 'Add New Krios Data',
            description: 'A dashboard with tomographic experiment data'
        };
        const experimentId = req.query.experimentId;

        if (!experimentId) {
            return res.status(400).json({ message: 'Experiment ID is required' });
        }

        res.render('experimentDetails/addKriosData', { locals, experimentId });
    } catch (error) {
        console.error('Error in addKriosData:', error);
        res.status(500).json({ message: 'Error loading Krios data form', error: error.message });
    }
};

/**
 * POST /
 * Create New Experiment
 */
exports.postKriosData = async (req, res) => {
    try {
        console.log('Request body:', req.body);  // Log the entire request body

        if (!req.body.experimentId) {
            throw new Error('experimentId is required');
        }

        const newKriosData = new Krios({
            experimentId: req.body.experimentId,
            kriosDate: req.body.kriosDate,
            kriosFileName: req.body.kriosFileName,
            kriosNotes: req.body.kriosNotes
        });

        const savedKrios = await newKriosData.save();
        console.log('Saved Krios:', savedKrios);

        res.redirect(`/details/${req.body.experimentId}`);
    } catch (error) {
        console.error('Error in postPrepData:', error);
        res.status(500).send(`Error creating Krios data: ${error.message}`);
    }
};

/**
 * GET /
 * Krios Data
 */

exports.viewKriosData = async (req, res) => {
    try {
        const kriosData = await Krios.findById(req.params._id);
        if (!kriosData) {
            return res.status(404).send('Krios data not found');
        }
        res.render('kriosData/viewKrios', { kriosData });
    } catch (error) {
        console.error('Error viewing Krios data:', error);
        res.status(500).send('Error viewing Krios data');
    }
};

/**
 * GET/
 * Edit Krios Data
 */
exports.editKriosData = async (req, res) => {
    try {
        const kriosData = await Krios.findOne({_id: req.params._id});
        if (!kriosData) {
            return res.status(404).send('Krios Data not found');
        }

        const locals = {
            title: "Edit Krios Data",
            description: "Edit tomographic experiment Krios data"
        };

        res.render('kriosData/editKrios', {
            locals,
            kriosData
        });
    } catch (error) {
        console.log(error);
        res.status(500).send('Internal Server Error');
    }
};

/**
 * PUT /
 * Update Krios Data
 * */
exports.updateKriosData = async (req, res) => {
    try {
        const id = req.params.id || req.body.id;
        console.log('Updating Krios data with ID:', id);
        console.log('Update data:', req.body);

        if (!id) {
            return res.status(400).json({ message: 'Krios data ID is required' });
        }

        const updatedKriosData = await Krios.findByIdAndUpdate(
            id,
            {
                experimentId: req.body.experimentId,
                kriosDate: req.body.kriosDate,
                kriosFileName: req.body.kriosFileName,
                kriosNotes: req.body.kriosNotes
            },
            { new: true, runValidators: true }
        );

        console.log('Updated Krios data:', updatedKriosData);

        if (!updatedKriosData) {
            console.log('Krios data not found for ID:', id);
            return res.status(404).json({ message: 'Krios data not found' });
        }

        res.redirect(`/details/${req.body.experimentId}`);
    } catch (error) {
        console.error('Error updating Krios data:', error);
        res.status(500).json({ message: 'Error updating Krios data', error: error.message });
    }
};

/**
 * DELETE /
 * Delete Krios Data
 */
exports.deleteKriosData = async (req, res) => {
    try {
        const result = await Krios.findByIdAndDelete(req.params._id);
        
        if (!result) {
            return res.status(404).send("Krios data not found");
        }
        
        res.redirect(`/details/${req.body.experimentId}`);
    } catch (error) {
        console.error('Error deleting Krios data:', error);
        res.status(500).send("Error deleting Krios data");
    }
};