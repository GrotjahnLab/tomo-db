const SamplePrep = require('../models/SamplePrep');
const mongoose = require('mongoose');
const Experiment = require('../models/Experiment');



/**
 * GET /
 * Homepage
 */

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
        const samples = await SamplePrep.find({}).limit(5);
        res.render('experimentDetails/details', {
            locals,
            samples
        });
    }catch(error){
        console.log(error);
    }
};

/**
 * GET /
 * New Experiment Form
 */
exports.addPrepData = async (req, res) => {
    const locals = {
        title: 'Add New Preparation Data',
        description: 'A dashboard with tomographic experiment data'
    };

    const experimentId = req.query.experimentId;

    res.render('experimentDetails/addPrepData', { locals, experimentId });
};

/**
 * POST /
 * Create New Experiment
 */
exports.postPrepData = async (req, res) => {
    try {
        console.log('Request body:', req.body);  // Log the entire request body

        if (!req.body.experimentId) {
            throw new Error('experimentId is required');
        }

        const newSamplePrep = new SamplePrep({
            dateFrozen: req.body.dateFrozen,
            cell_Genotype: req.body.cell_Genotype,
            treatment: req.body.treatment,
            cell: req.body.cell,
            date_clipped: req.body.date_clipped,
            boxPosition: req.body.boxPosition,
            details: req.body.details,
            experimentId: req.body.experimentId 
        });

        const savedSamplePrep = await newSamplePrep.save();
        console.log('Saved SamplePrep:', savedSamplePrep);

        res.redirect(`/experiment/${req.body.experimentId}`);
    } catch (error) {
        console.error('Error in postPrepData:', error);
        res.status(500).send(`Error creating sample preparation data: ${error.message}`);
    }
};