const Experiment = require('../models/Experiment');
const mongoose = require('mongoose');


/**
 * GET/
 * Homepage
 */

exports.homepage = async (req, res) => {
    
    const locals = {
       title: 'TomoDB',
       description: 'A dashboard with tomographic expermient data'
    }
    res.render('index', locals); 
};


/**
 * GET /
 * New Experiment Form
 */

exports.addExperiment = async(req, res) => {
    const locals = {
        title: 'Add New Experiment',
        description: 'A dashboard with tomographic expermient data'
    }

    res.render('experiment/add', locals);
}

/**
 * POST /
 * Create New Experiment
 */

exports.postExperiment = async(req, res) => {

    console.log(req.body);

    const newExperiment = new Experiment({
        initials: req.body.initials,
        expID: req.body.expID,
        grid: req.body.grid,
        fileName: req.body.fileName,
        details: req.body.details

    });

    try{

        await Experiment.create(newCustomer);

        res.redirect('/');
    }catch (error){
        console.log(error);
    }
    
    
}