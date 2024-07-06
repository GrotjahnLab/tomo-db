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