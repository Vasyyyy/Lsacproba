const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt-nodejs');
const users= require('../models/user');
const jwt = require('jsonwebtoken');
const config = require('../config/keys');
const User = require('../models/user');
const ActiveSession = require('../models/activeSession');
const reqauth= require




router.get('/users',function(req,res){
    User.find({},function(err,reviewss){
        if(err){
            console.log("eroare"+err);
            return res.json({succes:false});
        }
        return res.json({ users:users});
    });
});


router.post('/register', function(req, res) {
    const { firstname,lastname, email, password, confirmation_password ,role } = req.body;

    User.findOne({ email: email }, function(err, user) {
        if(password != confirmation_password) return res.json({success: false,msg:'Parolele introduse nu se potrivesc'});
        if (user) {
            return res.json({success: false, msg: 'Userul deja exista'});
            
        } else {
            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(password, salt, null, (err, hash) => {
                    if (err) {
                        return res.json({success: false});
                    }
                
                    const user = { firstname: firstname, lastname: lastname ,email: email, password: hash,role: role };

                    User.create(user, function (err, user) {
                        if (err) {
                            console.log("esti bou:"+ err);
                            return res.json({success: false, msg: 'AICI NU MERGE !!!!!!!!!!!!'});
                        }
                        return res.json({success: true});
                    })
                })
            })
        }
    })
})

router.post('/login', function(req, res) {
    const { email, password } = req.body;

    User.findOne({ email: email }, function(err, user) {
        if (err) {
            return res.json({success: false});
        }
        
        if (!user) {
            return res.json({success: false, msg: 'Userul nu exista'});
        }

        bcrypt.compare(password, user.password, function(err, isMatch) {
            console.log(user);
            if (isMatch) {
                const token = jwt.sign({ user }, config.secret, {
                    expiresIn: 86400, // 1 week
                  });
                user.password = null;
                const session = {userId: user._id, token: 'JWT ' + token};

                ActiveSession.create(session, function(err, resp) {
                    return res.json({success: true, token: 'JWT ' + token, user: user});
                })
            } else {
                return res.json({success: false, msg: 'Credentialele sunt gresite'});
            }
        })
    })
})

router.post('/logout', function(req, res) {
    const { token } = req.body;

    ActiveSession.deleteOne({ token: token }, function (err, session) {
        if (err) {
            return res.json({success: false});
        } else {
            return res.json({success: true});
        }
    })
})


module.exports = router;
//123124