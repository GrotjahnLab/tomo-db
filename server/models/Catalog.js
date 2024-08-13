const mongoose = require('mongoose');

const CatalogSchema = new mongoose.Schema({
  experimentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Experiment',
    required: true
  },
  tomogramFile: {
    type: String,
    required: true
  },
  residualError: {
    type: String
  },
  tomogramQuality: {
    type: String,
    enum: ['Excellent', 'Good', 'Fair', 'Poor']
  },
  clemResults: {
    type: String
  },
  observedStructures: [{
    type: String,
    enum: [
      'Mitochondria',
      'Mitochondria Constriction',
      'Endoplasmic Reticulum',
      'Microtubule',
      'Septin',
      'Ribosome',
      'Actin',
      'Other'
    ]
  }],
  otherStructures: {
    type: String
  }
}, { timestamps: true });

module.exports = mongoose.model('Catalog', CatalogSchema);