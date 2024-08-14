const mongoose = require('mongoose');

const kriosSchema = new mongoose.Schema({
    experimentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Experiment',
        
      },
      kriosDate: {
        type: Date,
        
      },
      kriosFileName: {
        type: String,
        
      },
      kriosNotes: {
        type: String
      }
    }, { timestamps: true });

    module.exports = mongoose.model('Krios', kriosSchema);