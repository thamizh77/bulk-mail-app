const mongoose = require('mongoose');

const emailHistorySchema = new mongoose.Schema(
  {
    subject: {
      type: String,
      required: true,
      trim: true
    },
    body: {
      type: String,
      required: true,
      trim: true
    },
    recipients: {
      type: [String],
      required: true,
      validate: {
        validator(value) {
          return Array.isArray(value) && value.length > 0;
        },
        message: 'At least one recipient is required.'
      }
    },
    status: {
      type: String,
      enum: ['success', 'failed'],
      required: true
    },
    sentAt: {
      type: Date,
      default: Date.now
    },
    errorMessage: {
      type: String,
      default: ''
    }
  },
  {
    collection: 'EmailHistory',
    versionKey: false
  }
);

module.exports = mongoose.model('EmailHistory', emailHistorySchema);
