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
        details: req.body.details

    });
    try{
        await Experiment.create(newExperiment);
        //await req.flash('info', 'New experiment has been added.') //bruh you didn't add the flash message yet.
        res.redirect('/');
    }catch (error){
        console.log(error);
    }
}

    /**
     * GET /
     * Experiment Data
     */

    exports.view = async (req, res) => {
        try{
            const experiment = await Experiment.findOne({_id: req.params.id })

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

