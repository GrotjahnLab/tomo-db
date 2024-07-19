const mongoose = require('mongoose');

const leicaSchema = new mongoose.Schema({
  experimentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Experiment',
    required: true
  },
  dateMicroscopy: {
    type: Date,
    required: true
  },
  gridBox: {
    type: String,
    required: true
  },
  LM_filename: {
    type: String,
    required: true
  },
  details: {
    type: String
  }
}, { timestamps: true });

module.exports = mongoose.model('Leica', leicaSchema);