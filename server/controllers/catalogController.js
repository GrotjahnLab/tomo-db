const mongoose = require('mongoose');
const Experiment = require('../models/Experiment');
const Leica = require('../models/Leica');
const SamplePrep = require('../models/SamplePrep');
const Milling = require('../models/Milling');
const Krios = require('../models/Krios');
const DataProcessing = require('../models/DataProcessing');
const Catalog = require('../models/Catalog');

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
        const cat = await Catalog.find({}).limit(5);
        res.render('experimentDetails/details', {
            locals,
            cat
        });
    }catch(error){
        console.log(error);
    }
};

/**
 * GET /
 * New  Data Form
 */
exports.addCatData = async (req, res) => {
    try {
        const locals = {
            title: 'Add New Data',
            description: 'A dashboard with tomographic experiment data'
        };
        const experimentId = req.query.experimentId;

        if (!experimentId) {
            return res.status(400).json({ message: 'Experiment ID is required' });
        }

        res.render('experimentDetails/addCatalogData', { locals, experimentId });
    } catch (error) {
        console.error('Error in addCatalogData:', error);
        res.status(500).json({ message: 'Error loading Catalog Data', error: error.message });
    }
};

/**
 * POST /
 * Create New Catalog Data Entry
 */
exports.postCatData = async (req, res) => {
    try {
        console.log('Request body:', req.body);  // Log the entire request body

        if (!req.body.experimentId) {
            throw new Error('experimentId is required');
        }

        const newCatalogData = new Catalog({
            experimentId: req.body.experimentId,
            tomogramFile: req.body.tomogramFile,
            residualError: req.body.residualError,
            tomogramQuality: req.body.tomogramQuality,
            clemResults: req.body.clemResults,
            observedStructures: Array.isArray(req.body.observedStructures) ? req.body.observedStructures : [req.body.observedStructures],
            otherStructures: req.body.otherStructures
        });

        const savedCatalog = await newCatalogData.save();
        console.log('Saved Catalog Data:', savedCatalog);

        res.redirect(`/experiment/${req.body.experimentId}`);
    } catch (error) {
        console.error('Error in postCatalogData:', error);
        res.status(500).send(`Error creating Catalog data: ${error.message}`);
    }
};


/**
 * GET /
 * Catalog Data
 */
exports.viewCatDetails = async (req, res) => {
    try {
        const catalogData = await Catalog.findOne({_id: req.params._id});

        if (!catalogData) {
            return res.status(404).send('Catalog Data not found');
        }

        const locals = {
            title: "View Catalog Data",
            description: "Details of the Catalog data"
        };

        res.render('catalogData/viewCatDetails', {
            locals,
            catalogData
        });
    } catch (error) {
        console.error('Error viewing catalog data:', error);
        res.status(500).send('Internal Server Error');
    }
};



/**
 * GET/
 * Edit Catalog Data
 */
exports.editCatData = async (req, res) => {
    try {
        console.log('Editing catalog data with ID:', req.params._id);
        const element = await Catalog.findOne({_id: req.params._id});
        if (!element) {
            console.log('Catalog data not found for ID:', req.params._id);
            return res.status(404).send('Catalog Data not found');
        }

        const locals = {
            title: "Edit Catalog Data",
            description: "Edit tomographic experiment catalog data"
        };

        console.log('Rendering editCatDetails view with catalog data:', element);
        res.render('catalogData/editCatDetails', {
            locals,
            element
        });
    } catch (error) {
        console.error('Error fetching catalog data for edit:', error);
        res.status(500).send('Internal Server Error');
    }
};

/**
 * PUT /
 * Update Catalog Data
 */
exports.updateCatData = async (req, res) => {
    try {
        console.log('Request params:', req.params);
        console.log('Request body:', req.body);
        console.log('Attempting to update catalog data with ID:', req.params._id || req.body._id);

        const idToUpdate = req.params._id || req.body._id;

        if (!idToUpdate) {
            console.log('No ID provided for update');
            return res.status(400).send('No ID provided for update');
        }

        const updatedElement = await Catalog.findByIdAndUpdate(idToUpdate, {
            tomogramFile: req.body.tomogramFile,
            residualError: req.body.residualError,
            tomogramQuality: req.body.tomogramQuality,
            clemResults: req.body.clemResults,
            observedStructures: req.body.observedStructures,
            otherStructures: req.body.otherStructures,
            updatedAt: Date.now()
        }, { new: true, runValidators: true });

        if (!updatedElement) {
            console.log('No catalog data found with ID:', idToUpdate);
            return res.status(404).send('Catalog data not found');
        }

        console.log('Successfully updated catalog data:', updatedElement);
        res.redirect(`/catalog/view/${idToUpdate}`);
    } catch (error) {
        console.error('Error updating Catalog data:', error);
        res.status(500).render('error', { message: 'Error updating Catalog data' });
    }
};

/**
 * DELETE /
 * Delete Catalog Data
 */
exports.deleteCatData = async (req, res) => {
    try {
        const result = await Catalog.findByIdAndDelete(req.params._id);
        
        if (!result) {
            return res.status(404).send("Catalog data not found");
        }
        
        res.redirect(`/experiment/${result.experimentId}`);
    } catch (error) {
        console.error('Error deleting Catalog data:', error);
        res.status(500).send("Error deleting Catalog data");
    }
};
