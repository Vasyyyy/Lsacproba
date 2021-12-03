const mongoose = require('mongoose');


const userSchema = new mongoose.Schema({
  /*  id:{
        type: Number,
        required:true,
    },*/
     firstname: {
        type: String,
        required: true,
    },
    lastname: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        required: true,
    },
    enrolments:{
        type: Array,
        required:true,
    }
});


const users = mongoose.model('User', userSchema);

module.exports = users;