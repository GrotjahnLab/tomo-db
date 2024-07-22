const mongoose = require('mongoose');
const Experiment = require('../models/Experiment');
const Leica = require('../models/Leica');
const SamplePrep = require('../models/SamplePrep');
const Milling = require('../models/Milling');


/**
 * GET /
 * Homepage 
 */

exports.homepage = async (req, res) => {
    const locals = {
        title: "TOMODB",
        description: 'A dashboard with tomographic experiment data'
    }

    try{
        const mill = await Milling.find({}).limit(5);
        res.render('experimentDetails/details', {
            locals,
            mill
        })
    }catch(error){
        console.log(error);
    }
};

/**
 * GET /
 * New Experiment Form
 */
exports.addMillingData = async (req, res) => {
    const locals = {
        title: 'Add New Milling Data',
        description: 'A dashboard with tomographic experiment data'
    };
    const experimentId = req.query.experimentId;

    res.render('experimentDetails/addMillingData', { locals, experimentId });
};


/**
 * POST /
 * Create New Experiment
 */
exports.postMillingData = async (req, res) => {
    try {
        console.log('Request body:', req.body);  // Log the entire request body

        if (!req.body.experimentId) {
            throw new Error('experimentId is required');
        }

        const newMillingData = new Milling({
            experimentId: req.body.experimentId,
            dateMilling: req.body.dateMilling,
            gridBox: req.body.gridBox,
            sem_filename: req.body.sem_filename,
            maps_filename: req.body.maps_filename,
            lamellae: req.body.lamellae,
            details: req.body.details
        });

        const savedMilling = await newMillingData.save();
        console.log('Saved Milling:', savedMilling);

        res.redirect(`/experiment/${req.body.experimentId}`);
    } catch (error) {
        console.error('Error in postPrepData:', error);
        res.status(500).send(`Error creating Milling data: ${error.message}`);
    }
};

/**
 * GET /
 * Milling Data
 */
exports.viewMillingData = async (req, res) => {
    try {
        const millingData = await Milling.findOne({_id: req.params._id});

        if (!millingData) {
            return res.status(404).send('Milling Data not found');
        }

        const locals = {
            title: "View Milling Data",
            description: "Details of the Milling data"
        };

        res.render('millingData/viewMilling', {
            locals,
            millingData
        });
    } catch (error) {
        console.log(error);
        res.status(500).send('Internal Server Error');
    }
};

/**
 * GET/
 * Edit Milling Data
 */

exports.editMillingData = async (req, res) => {
    try {
        const millingData = await Milling.findOne({_id: req.params._id});
        if (!millingData) {
            return res.status(404).send('Milling Data not found');
        }

        const locals = {
            title: "Edit Milling Data",
            description: "Edit tomographic experiment Milling data"
        };

        res.render('millingData/editMilling', {
            locals,
            millingData
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
exports.updateMillingData = async (req, res) => {
    try {
        const id = req.params.id || req.body.id;
        console.log('Updating milling data with ID:', id);
        console.log('Update data:', req.body);

        if (!id) {
            return res.status(400).json({ message: 'Milling data ID is required' });
        }

        const updatedMillingData = await Milling.findByIdAndUpdate(
            id,
            {
                experimentId: req.body.experimentId,
                dateMilling: req.body.dateMilling,
                gridBox: req.body.gridBox,
                sem_filename: req.body.sem_filename,
                maps_filename: req.body.maps_filename,
                lamellae: req.body.lamellae,
                details: req.body.details
            },
            { new: true, runValidators: true }
        );

        console.log('Updated milling data:', updatedMillingData);

        if (!updatedMillingData) {
            console.log('Milling data not found for ID:', id);
            return res.status(404).json({ message: 'Milling data not found' });
        }

        res.redirect(`/milling/view/${updatedMillingData._id}`);
    } catch (error) {
        console.error('Error updating Milling data:', error);
        res.status(500).json({ message: 'Error updating Milling data', error: error.message });
    }
};

exports.deleteMillingData = async (req, res) => {
    try {
        const result = await Milling.findByIdAndDelete(req.params._id);
        
        if (!result) {
            return res.status(404).send("Milling data not found");
        }
        
        res.redirect(`/experiment/${result.experimentId}`);
    } catch (error) {
        console.error('Error deleting Leica data:', error);
        res.status(500).send("Error deleting Milling data");
    }
};