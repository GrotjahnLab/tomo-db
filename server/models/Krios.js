const mongoose = require('mongoose');

const kriosSchema = new mongoose.Schema({
    experimentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Experiment',
        required: true
      },
      kriosDate: {
        type: Date,
        required: true
      },
      kriosFileName: {
        type: String,
        required: true
      },
      kriosNotes: {
        type: String
      }
    }, { timestamps: true });

    module.exports = mongoose.model('Krios', kriosSchema);