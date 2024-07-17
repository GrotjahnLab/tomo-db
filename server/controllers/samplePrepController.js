const SamplePrep = require('../models/SamplePrep');
const mongoose = require('mongoose');



/**
 * GET /
 * Homepage
 */

exports.homepage = async (req, res) => {
    const locals = {
        title: "TOMODB",
        description: 'A dashboard with tomographic experiment data'
    };

    try {
        
        res.render('experimentDetails/details', {
            locals,
            
        });
    } catch (error) {
        console.log(error);
    }
}

/**
 * GET /
 * New Experiment Form
 */
exports.addPrepData = async (req, res) => {
    const locals = {
        title: 'Add New Preparation Data',
        description: 'A dashboard with tomographic experiment data'
    };

    res.render('experimentDetails/addPrepData', locals);
};

/**
 * POST /
 * Create New Experiment
 */
exports.postPrepData = async (req, res) => {

    console.log(req.body);

    const newSamplePrep = new SamplePrep({
        dateFrozen: req.body.dateFrozen,
        cell_Genotype: req.body.cell_Genotype,
        treatment: req.body.treatment,
        cell: req.body.cell,
        date_clipped: req.body.date_clipped,
        boxPosition: req.body.boxPosition,
        details: req.body.details
    });

    try {
        await SamplePrep.create(newSamplePrep);
        res.redirect('/');
    } catch (error) {
        console.error(error);
    }
};
