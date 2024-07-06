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
