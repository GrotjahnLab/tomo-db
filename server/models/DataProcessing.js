const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const dataProcessingSchema = new Schema({
    experimentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Experiment'
    },
    pathToReconstructions: {
        type: String
    },
    pathToMembraneSegmentation: {
        type: String
    },
    pathToFilamentSegmentation: {
        type: String
    },
    pathToDragonflySegmentation: {
        type: String
    },
    pathToParticlePicks: {
        type: String
    },
    pathToMRefinements: {
        type: String
    },
    workLink: {
        type: String
    }

}, { timestamps: true });

module.exports = mongoose.model('DataProcessing', dataProcessingSchema);


