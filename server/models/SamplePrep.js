const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const SamplePrepSchema = new Schema({
    dateFrozen: {
        type: Date,
        
    },
    cell_Genotype: {
        type: String,
        
    },
    treatment: {
        type: String,
        
    },
    cell: {
        type: String,
        
    },
    date_clipped: {
        type: Date
        
    },
    boxPosition: {
        type: String,
        
    },
    details: {
        type: String
    },

    experimentId: {
    type: Schema.Types.ObjectId,
    ref: 'Experiment',
    
  }
});

module.exports = mongoose.model('SamplePrep', SamplePrepSchema);