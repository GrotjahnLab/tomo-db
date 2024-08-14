const mongoose = require('mongoose');

const millingSchema = new mongoose.Schema({
  experimentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Experiment',
    
  },
  dateMilling: {
    type: Date,
    
  },
  gridBox: {
    type: String,
    
  },
  sem_filename: {
    type: String,
    
  },

  maps_filename: {
    type: String,
    
  },

  lamellae: {
    type: Number,
    
  },

  details: {
    type: String
  }
}, { timestamps: true });

module.exports = mongoose.model('Milling', millingSchema);