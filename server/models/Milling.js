const mongoose = require('mongoose');

const millingSchema = new mongoose.Schema({
  experimentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Experiment',
    required: true
  },
  dateMilling: {
    type: Date,
    required: true
  },
  gridBox: {
    type: String,
    required: true
  },
  sem_filename: {
    type: String,
    required: true
  },

  maps_filename: {
    type: String,
    required: true
  },

  lamellae: {
    type: Number,
    required: true
  },

  details: {
    type: String
  }
}, { timestamps: true });

module.exports = mongoose.model('Milling', millingSchema);