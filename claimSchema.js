const mongoose = require('mongoose');

const claimSchema = new mongoose.Schema({
    vehicleModel: {
        type: String,
        required: true
    },
    damageDescription: {
        type: String,
        required: true
    },
    timestamp: {
        type: Date,
        default: Date.now
    }
});

const Claim = mongoose.model('claim', claimSchema);

module.exports = Claim;
