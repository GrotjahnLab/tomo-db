const mongoose = require('mongoose');
const Experiment = require('../models/Experiment');
const Leica = require('../models/Leica');
const SamplePrep = require('../models/SamplePrep');
const Milling = require('../models/Milling');
const Krios = require('../models/Krios');
const DataProcessing = require('../models/DataProcessing');

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
        const dataPro = await DataProcessing.find({}).limit(5);
        res.render('experimentDetails/details', {
            locals,
             dataPro
        });
    }catch(error){
        console.log(error);
    }
};

/**
 * GET /
 * New  Data Form
 */
exports.addDataProcessing = async (req, res) => {
    try {
        const locals = {
            title: 'Add New Data',
            description: 'A dashboard with tomographic experiment data'
        };
        const experimentId = req.query.experimentId;

        if (!experimentId) {
            return res.status(400).json({ message: 'Experiment ID is required' });
        }

        res.render('experimentDetails/addDataPrep', { locals, experimentId });
    } catch (error) {
        console.error('Error in addDataPrep:', error);
        res.status(500).json({ message: 'Error loading Krios data form', error: error.message });
    }
};


/**
 * POST /
 * Create New Data Processing 
 */
exports.postDataProcessing = async (req, res) => {
    try {
        console.log('Received data:', req.body);

        const newDataProcessing = new DataProcessing({
            experimentId: req.body.experimentId,
            pathToReconstructions: req.body.pathToReconstructions,
            pathToMembraneSegmentation: req.body.pathToMembraneSegmentation,
            pathToFilamentSegmentation: req.body.pathToFilamentSegmentation,
            pathToDragonflySegmentation: req.body.pathToDragonflySegmentation,
            pathToParticlePicks: req.body.pathToParticlePicks,
            pathToMRefinements: req.body.pathToMRefinements,
            workLink: req.body.workLink
        });

        const savedProcessingInfo = await newDataProcessing.save();
        console.log('Saved Data Processing:', savedProcessingInfo);

        res.redirect(`/experiment/${req.body.experimentId}`);
    } catch (error) {
        console.error('Error in postDataProcessing:', error);
        res.status(500).send(`Error creating Data Processing entry: ${error.message}`);
    }
};


exports.viewProcessingDetails = async (req, res) => {
    try {
        

        const dataProcessing = await DataProcessing.findById(req.params.id);
        const locals = {
            title: 'Data Processing Details',
            description: 'View details of data processing'
        };

        res.render('dataProcessing/viewDetails', { locals, dataProcessing });
    } catch (error) {
        console.error('Error viewing details:', error);
        res.status(500).send('Error viewing details');
    }
};

/**
 * GET/
 * Edit Details
 */

exports.editProcessingDetails = async (req, res) => {
    try {
        const dataProcessing = await await DataProcessing.findById(req.params.id);
        if (!dataProcessing) {
            return res.status(404).send('Details not found');
        }

        const locals = {
            title: "Edit Details",
            description: "Edit details for data processing"
        };

        res.render('dataProcessing/editdetails', {
            locals,
            dataProcessing
        });
    } catch (error) {
        console.log(error);
        res.status(500).send('Internal Server Error');
    }
};


/**
 * PUT /
 * Update Data Processing
 */
exports.updateProcessingDetails = async (req, res) => {
    try {
        const id = req.params.id || req.body.id;
        console.log('Updating Data Processing with ID:', id);
        console.log('Update data:', req.body);

        if (!id) {
            return res.status(400).json({ message: 'Data Processing ID is required' });
        }

        const updatedDataProcessing = await DataProcessing.findByIdAndUpdate(
            id,
            {
                experimentId: req.body.experimentId,
                pathToReconstructions: req.body.pathToReconstructions,
                pathToMembraneSegmentation: req.body.pathToMembraneSegmentation,
                pathToFilamentSegmentation: req.body.pathToFilamentSegmentation,
                pathToDragonflySegmentation: req.body.pathToDragonflySegmentation,
                pathToParticlePicks: req.body.pathToParticlePicks,
                pathToMRefinements: req.body.pathToMRefinements,
                workLink: req.body.workLink
            },
            { new: true, runValidators: true }
        );

        console.log('Updated Data Processing:', updatedDataProcessing);

        if (!updatedDataProcessing) {
            console.log('Data Processing not found for ID:', id);
            return res.status(404).json({ message: 'Data Processing not found' });
        }

        res.redirect(`/dataProcessing/view/${updatedDataProcessing._id}`);
    } catch (error) {
        console.error('Error updating Data Processing:', error);
        res.status(500).json({ message: 'Error updating Data Processing', error: error.message });
    }
};

/**
 * DELETE /
 * Delete Data Processing
 */

exports.deleteProcessingData = async (req, res) => {
    try {
        const result = await DataProcessing.findByIdAndDelete(req.params._id);
        
        if (!result) {
            return res.status(404).send("details data not found");
        }
        
        res.redirect(`/experiment/${result.experimentId}`);
    } catch (error) {
        console.error('Error deleting details:', error);
        res.status(500).send("Error deleting details");
    }
};