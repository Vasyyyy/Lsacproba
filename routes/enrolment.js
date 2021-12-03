const express = require('express');
const { callbackify } = require('util');
const router = express.Router();
const enrolments= require('../models/enrolments.js');
const Enrolment = require('../models/enrolments.js');
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