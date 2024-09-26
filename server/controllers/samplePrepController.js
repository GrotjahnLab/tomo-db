const SamplePrep = require('../models/SamplePrep');
const mongoose = require('mongoose');
const Experiment = require('../models/Experiment');




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

        res.redirect(`/details/${req.body.experimentId}`);
    } catch (error) {
        console.error('Error in postPrepData:', error);
        res.status(500).send(`Error creating sample preparation data: ${error.message}`);
    }
};

/**
    * GET /
    * Experiment Data
*/

exports.viewPrepData = async (req, res) => {
    try {
        const samplePrep = await SamplePrep.findOne({_id: req.params._id});

        if (!samplePrep) {
            return res.status(404).send('Sample Prep Data not found');
        }

        const locals = {
            title: "View Prep Data",
            description: "Details of the sample preparation Data"
        };

        res.render('prepData/viewPrep', {
            locals,
            samplePrep
        });
    } catch (error) {
        console.log(error);
        res.status(500).send('Internal Server Error');
    }
};

/**
 * GET/
 * Edit Sample Prep Data
 */

exports.editPrepData = async (req, res) => {
    try{
        const samplePrep = await SamplePrep.findOne({_id: req.params._id});
        if (!samplePrep) {
            return res.status(404).send('Sample Prep Data not found');
        }

        const locals = {
            title: "Edit prep Data",
            description: "A dashboard with tomographic expermient data"
        };

        res.render('prepData/editPrep',{
            locals,
            samplePrep
        });
    } catch (error) {
        console.log(error);
        res.status(500).send('Internal Server Error');
    }
};

/**
 * PUT /
 * Update Sample Preparation Data
 */
exports.updatePrepData = async (req, res) => {
    try {
        const updatedSamplePrep = await SamplePrep.findByIdAndUpdate(req.params._id, {
            dateFrozen: req.body.dateFrozen,
            cell_Genotype: req.body.cell_Genotype,
            treatment: req.body.treatment,
            cell: req.body.cell,
            date_clipped: req.body.date_clipped,
            boxPosition: req.body.boxPosition,
            details: req.body.details,
            updatedAt: Date.now()
        }, { new: true, runValidators: true });

        if (!updatedSamplePrep) {
            return res.status(404).send('Sample preparation not found');
        }

        res.redirect(`/prep-data/view/${req.params._id}`);

    } catch (error) {
        console.error('Error updating sample preparation:', error);
        res.status(500).render('error', { message: 'Error updating sample preparation data' });
    }
};

/**
 * Delete /
 * Delete Sample Preparation Data
 */
exports.deletePrepData = async (req, res) => {
    try {
        const result = await SamplePrep.findByIdAndDelete(req.params._id);
        
        if (!result) {
            return res.status(404).send("Sample preparation not found");
        }
        
        res.redirect("/"); // Or wherever you want to redirect after deletion
    } catch (error) {
        console.error('Error deleting sample preparation:', error);
        res.status(500).send("Error deleting sample preparation");
    }
};