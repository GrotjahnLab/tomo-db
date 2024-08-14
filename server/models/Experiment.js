const mongoose = require('mongoose')

const Schema = mongoose.Schema;
const ExperimentSchema = new Schema({
    initials:{
        type: String,
        
    },
    expID:{
        type: String,
        
    },
    grid:{
        type: Number,
        
    },
    fileName:{
        type: String,
        
    },
    status:{
        type: String,
        
    },
    details:{
        type: String,
        
    },
    createdAt:{
        type: Date,
        default: Date.now()
        
    },
    updatedAt:{
        type: Date,
        default: Date.now()   
    }
});




module.exports = mongoose.model('Experiment', ExperimentSchema);