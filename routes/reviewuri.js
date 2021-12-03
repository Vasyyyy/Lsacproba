const express = require('express');
const { callbackify } = require('util');
const router = express.Router();
const reviewss= require('../models/reviews');
const Review = require('../models/reviews');
const reqAuth = require('../config/safeRoutes').reqAuth;
const ActiveSession = require('../models/activeSession');


router.get('/',function(req,res){
    Review.find({},function(err,reviewss){
        if(err){
            console.log("eroare"+err);
            return res.json({succes:false});
        }
        return res.json({success:true,reviewss:reviewss});
    });
});

router.get('/:id',function(req,res){
    const reviewID= req.params.id;
    Review.find({_id:reviewID},function(err,reviewss){
        if(err){
            console.log("eroare"+err);
            return res.json({succes:false});
        }
        return res.json({success:true,reviewss:reviewss});
    });
});



router.post('/', reqAuth ,function(req, res) {
    const { message } = req.body;
    const {userid} =req.body;
    const review = { message: message, userid: userid };

    if (!message ) {
        return res.json({success: false});
    }

    Review.create(review, function(err, resp) {
        if (err) {
            console.log("ce bou esti" + err);
            return res.json({success: false});
        }
        return res.json({success: true});
    });
});


// /api/reviewuri/delete
router.delete('/:id', function(req, res) {
    const reviewID=req.params.id;

    if (!reviewID) {
        return res.json({success: false});
    }
    
    Review.deleteMany({ _id: reviewID }, function(err, reviewss) {
        if (err) {
            return res.json({success: false});
        }
        return res.json({success: true});
    })
})

module.exports = router;