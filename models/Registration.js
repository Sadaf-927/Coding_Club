const mongoose = require('mongoose');
const Schema=mongoose.Schema;

const registrationSchema = new Schema({
    eventId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Event',
        required: true
    },
    fullName: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        lowercase: true,
        trim: true
    },
    collegeRollNo: {
        type: String,
        required: true,
        trim: true
    },
    branchYear: {
        type: String,
        required: true
    },
    teamName: {
        type: String,
        default: 'N/A'
    },
    registeredAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Registration', registrationSchema);