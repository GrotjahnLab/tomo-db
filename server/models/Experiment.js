const mongoose = require('mongoose')

const Schema = mongoose.Schema;
const ExperimentSchema = new Schema({
    initials:{
        type: String,
        required: true
    },
    expID:{
        type: String,
        required: true
    },
    grid:{
        type: Number,
        required: true
    },
    fileName:{
        type: String,
        required: true
    },
    details:{
        type: String,
        required: true
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