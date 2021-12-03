const mongoose =require('mongoose')

const tutoring_clasessSchema =new mongoose.Schema({
    description:{
        type: String,
        required : true,
    },
    subject:{
        type:  String ,
        required:true,
    },
    teacher_id:{
        type :Number,
        required:true,
    },
    enrolled:{
        type : Array,
        required:true,
    }

});
const tutoring_clasess=mongoose.model('Tutoring_classes',tutoring_clasessSchema);

module.exports = tutoring_clasess;
