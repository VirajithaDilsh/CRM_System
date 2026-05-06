const mongoose = require('mongoose');

const leadSchema = new mongoose.Schema({
    leadName: {type: String, required: true},
    companyName: {type: String},
    email: {type: String},
    phone: {type: String, required: true},
    leadSource: {type: String, enum: ["Website", "LinkedIn", "Referral", "Cold Email", "Event", "Other"], default: 'Website'},
    assignedSalesPerson: {type: String},
    status: {type: String, enum: ['New', 'Contacted', 'Qualified', 'Lost'], default: 'New'},
    estimatedDealValue: {type: Number},
    createdAt: {type: Date, default: Date.now},

});

const noteSchema = new mongoose.Schema({
    content: {type: String, required: true},
    createdBy: {type: String, required: true},
    createdAt: {type: Date, default: Date.now},
});

const Lead = mongoose.model('Lead', leadSchema);

module.exports = Lead;