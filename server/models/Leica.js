const mongoose = require('mongoose');

const leicaSchema = new mongoose.Schema({
  experimentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Experiment',
    
  },
  dateMicroscopy: {
    type: Date,
    
  },
  gridBox: {
    type: String,
    
  },
  LM_filename: {
    type: String,
    
  },
  details: {
    type: String
  }
}, { timestamps: true });

module.exports = mongoose.model('Leica', leicaSchema);