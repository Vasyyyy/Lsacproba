const mongoose = require('mongoose');



const reviewSchema = new mongoose.Schema({
    /*id:{
        type: Number,
        required:true,
    },*/
    message: {
        type: String,
        required: true,
    },
    userid: {
        type: Number,
        required: true,
    }
});

const reviewss = mongoose.model('Review', reviewSchema);

module.exports = reviewss;