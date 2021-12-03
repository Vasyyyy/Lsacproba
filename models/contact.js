const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    message: {
        type: String,
        required: true,
    },
    is_resolved: {
        type: Boolean,
        required: true,
    }
});

const contacts = mongoose.model('Contact', contactSchema);

module.exports = contacts;