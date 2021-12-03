const express = require('express');
const { callbackify } = require('util');
const router = express.Router();
const contacts= require('../models/contact');
const Contact = require('../models/contact');
const reqAuth = require('../config/safeRoutes').reqAuth;
const ActiveSession = require('../models/activeSession');

router.post('/' ,function(req, res) {
    const{name,email,message}=req.body;
    const contact = { name: name, email: email,message:message,is_resolved:0 };

    Contact.create(contact, function(err, resp) {
        if (err) {
            console.log("ce bou esti" + err);
            return res.json({success: false});
        }
        return res.json({success: true});
    });
});

router.get('/',function(req,res){
    Contact.find({},function(err,contacts){
        if(err){
            console.log("eroare"+err);
            return res.json({succes:false});
        }
        return res.json({success:true,contacts:contacts});
    });
});
router.delete('/:_id', function(req, res) {
    const contactID=req.params.id;
    if (!contactID) {
        return res.json({success: false});
    }
    
    Contact.deleteMany({ _id: contactID }, function(err, contacts) {
        if (err) {
            return res.json({success: false});
        }
        return res.json({success: true});
    })
})
router.patch('/:id',function(req,res){
    const contactID=req.params.id;
    const{rezolvare} ="TRUE";
    if(is_resolved=1){
        console.log("Este rezolvata deja!");
        return res.json({succes:false});
        
    }
    Contact.findOneAndUpdate({_id:contactID,is_resolved:rezolvare},function(err,contacts){
        if(err){
            console.log("eroare"+err);
            return res.json({succes:false});
        }
    
        return res.json({success:true,is_resolved:rezolvare});
    });
});
module.exports=router;