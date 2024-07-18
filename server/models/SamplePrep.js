const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const SamplePrepSchema = new Schema({
    dateFrozen: {
        type: Date,
        required: true
    },
    cell_Genotype: {
        type: String,
        required: true
    },
    treatment: {
        type: String,
        required: true
    },
    cell: {
        type: String,
        required: true
    },
    date_clipped: {
        type: Date,
        required: true
    },
    boxPosition: {
        type: String,
        required: true
    },
    details: {
        type: String
    },

    experimentId: {
    type: Schema.Types.ObjectId,
    ref: 'Experiment',
    required: true
  }
});

module.exports = mongoose.model('SamplePrep', SamplePrepSchema);