const Experiment = require('../models/Experiment');
const SamplePrep = require('../models/SamplePrep');
const Leica = require('../models/Leica');
const Milling = require('../models/Milling');
const mongoose = require('mongoose');
const Krios = require('../models/Krios');
const DataProcessing = require('../models/DataProcessing');
const Catalog = require('../models/Catalog');



/**
 * GET/
 * Homepage
 */

exports.homepage = async (req, res) => {
    
    const locals = {
       title: 'TomoDB',
       description: 'A dashboard with tomographic expermient data'
    }

    let perPage = 12;
    let page = req.query.page || 1 ;


    try{
        const count = await Experiment.countDocuments();
        const exp = await Experiment.aggregate([
            {$sort: {updatedAt: -1 }},
            {$skip: perPage * (page - 1)},
            {$limit: perPage}
        ]).exec();
        

        res.render('index', {
            locals, 
            exp,
            current: page, 
            pages: Math.ceil(count / perPage)
        });
    }catch (error){
        console.log(error);
    } 
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
        details: req.body.details,
        status: req.body.status


    });
    try{
        await Experiment.create(newExperiment);
        //await req.flash('info', 'New experiment has been added.') //bruh you didn't add the flash message yet.
        
    }catch (error){
        console.log(error);
    }
}

/**
    * GET /
    * Experiment Data
*/

exports.viewExperiment = async (req, res) => {
    try{
        const experiment = await Experiment.findOne({_id: req.params._id});

        const locals = {
            title: "View experimet Data",
            description: "A dashboard with tomographic expermient data"
        };

        res.render('experiment/view',{
            locals,
            experiment
        });
    } catch (error) {
        console.log(error);
    }
};

/**
 * GET/
 * Edit Data
 */

exports.editExperiment = async (req, res) => {
    try{
        const experiment = await Experiment.findOne({_id: req.params._id});

        const locals = {
            title: "Edit experimet Data",
            description: "A dashboard with tomographic expermient data"
        };

        res.render('experiment/edit',{
            locals,
            experiment
        });

        
    } catch (error) {
        console.log(error);
    }
};

/**
 * GET/
 * Update Customer Data
 */

exports.editPost = async (req, res) => {
    
    try{

        await Experiment.findByIdAndUpdate(req.params._id,{
            initials: req.body.initials,
            expID: req.body.expID,
            grid: req.body.grid,
            fileName: req.body.fileName,
            details: req.body.details,
            status: req.body.status,
            updatedAt: Date.now()
        });

        res.redirect("/");
        

    } catch (error){
        console.log(error);
    }
    
};


/**
 * Delete /
 * Delete Experiment Data
 */

exports.deleteExperiment = async (req, res) => {
    try {
        await Experiment.deleteOne({ _id: req.params._id });
        res.redirect("/"); // Redirect to the homepage or any other appropriate page after deletion
    } catch (error) {
        console.log(error);
        res.status(500).send("Error deleting experiment");
    }
};



/**
 * Search /
 * Search Experiment Data
 */
exports.searchExperiment = async (req, res) => {
    const locals = {
        title: "Search experiment Data",
        description: "A dashboard with tomographic experiment data"
    };

    try {
        let searchTerm = req.body.searchTerm;
        const searchNoSpecialChar = searchTerm.replace(/[^a-zA-Z0-9]/g, "");

        const experiments = await Experiment.find({
            $or: [
                { initials: { $regex: new RegExp(searchNoSpecialChar, "i") } },
                // Add more fields to search if needed
            ]
        });

        res.render("search", {
            experiments, // Pass experiments to the view
            locals
        });
    } catch (error) {
        console.log(error);
        res.status(500).send("Error searching experiments");
    }
};

/**
 * GET /
 * Detailed Experiment Data
 */



exports.detailsExperiment = async (req, res) => {
  try {
    const experiment = await Experiment.findOne({ _id: req.params._id });
    const samples = await SamplePrep.find({ experimentId: req.params._id });
    const esp = await Leica.find({ experimentId: req.params._id });
    const mill = await Milling.find({ experimentId: req.params._id });
    const krio = await Krios.find({experimentId: req.params._id});
    const dataPro = await DataProcessing.find({experimentId: req.params._id});
    const cat = await Catalog.find({experimentId: req.params._id});


    console.log('Samples:', samples); 

    const locals = {
      title: "Experiment Details",
      description: "Detailed information for the selected experiment"
    };

    res.render('experimentDetails/details', {
      locals,
      experiment,
      samples,
      esp,
      mill,
      krio,
      dataPro,
      cat
    });
  } catch (error) {
    console.log(error);
    res.status(500).send("Error fetching experiment details");
  }
};