const mongoose = require('mongoose');

const enrolmentsSchema = new mongoose.Schema({
    student_id: {
        type: Number,
        required: true,
    },
    tutoring_class_id: {
        type: Number,
        required: true,
    }
});

const enrolments = mongoose.model('Enrolment', enrolmentsSchema);

module.exports = enrolments;