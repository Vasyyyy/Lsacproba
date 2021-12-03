const express = require('express');
const { callbackify } = require('util');
const router = express.Router();
const tutoring_classes= require('../models/tutoring_classes');
const Tutoring_classes = require('../models/tutoring_classes');
const reqAuth = require('../config/safeRoutes').reqAuth;
const users= require('../models/user');
const User = require('../models/user');
const ActiveSession = require('../models/activeSession');


router.get('/',function(req,res){
    Tutoring_classes.find({},function(err,tutoring_classes){
        if(err){
            console.log("eroare"+err);
            return res.json({succes:false});
        }
        return res.json({success:true,tutoring_classes:tutoring_classes});
    });
});

router.get('/:id',function(req,res){
    const classID=req.params.id;
    Tutoring_classes.find({_id:classID},function(err,tutoring_classes){
        console.log(classID);        
        if(err){
            console.log("eroare"+err);
            return res.json({succes:false});
        }
        return res.json({success:true,tutoring_classes:tutoring_classes});
    });
});

router.post('/:id/enroll', reqAuth  ,function(req, res) {
    const classID=req.params.id;
    const user=req.params.reqAuth;
    User.findOneAndUpdate({_id:user},function(err,users){
        enrolments.push(classID);
        if(err){
            console.log("eroare"+err);
            return res.json({succes:false});
        }
    });
       

        tutoring_class.findOneAndUpdate({_id:classID},function(err,users){
            enrolled.push(user);
            if(err){
                console.log("eroare"+err);
                return res.json({succes:false});
            }
        });
    
});
router.post('/' , function(req, res) {
    const { description } = req.body;
    const {subject} =req.body;
    const {teacher_id}= req.body;
    const tutoring_class = { description: description, teacher_id: teacher_id,subject:subject };

    Tutoring_classes.create(tutoring_class, function(err, resp) {
        if (err) {
            console.log("ce bou esti" + err);
            return res.json({success: false});
        }
        return res.json({success: true});
    });
});
router.delete('/:id', function(req, res) {
   /// res.send(req.params.id);
    const classID=req.params.id;
   if (!classID) {
        console.log("ce bou esti" + err);

        return res.json({success: false});
    }
    
    Tutoring_classes.deleteMany({ _id: classID }, function(err, tutoring_classes) {
        if (err) {
            console.log("ce bou esti" + err);
            return res.json({success: false});
        }
        return res.json({success: true});
    })
})

router.patch('/:id',function(req,res){
    const{Description}=req.body;
    const classID=req.params.id;
    if (!Description) {
        return res.json({success: false});
    }
    Tutoring_classes.updateMany({ _id: ClassID, description:Description }, function(err, tutoring_classes) {
        if (err) {
            return res.json({success: false});
        }
        return res.json({success: true});
    })
})
module.exports = router;