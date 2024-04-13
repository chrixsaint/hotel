const Validator = require('fastest-validator');
const models = require('../models');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');

function signUp(req, res){
    
    //Sign up
    models.User.findOne({where:{email:req.body.email}}).then(result => {
        if(result){
            res.status(409).json({
                message: "Email already exists!",
            });
        }else{
            bcryptjs.genSalt(10, function(err, salt){
                bcryptjs.hash(req.body.password, salt, function(err, hash){
                    const joinedDate = new Date(req.body.joined_date);
                    const datehostStarted = new Date(req.body.date_host_started);
                    const user = {
                        first_name: req.body.first_name,
                        last_name: req.body.last_name,
                        email: req.body.email,
                        password: hash,
                        joined_date: joinedDate,
                        date_host_started: datehostStarted
                    };

                    const schema = {
                        first_name: { type: "string", optional: false },
                        last_name: { type: "string", optional: false },
                        email: { type: "email", optional: false },
                        password: { type: "string", optional: false, min: 8 },
                        joined_date: { type: "date", optional: false },
                        date_host_started: { type: "date", optional: false }
                    };

                    const v = new Validator();
                    const validationResponse = v.validate(user, schema);

                    if (validationResponse !== true) {
                        return res.status(400).json({
                            message: "Validation failed",
                            errors: validationResponse
                        });
                    }

                    models.User.create(user).then(result => {
                        res.status(201).json({
                            message: "User created successfully",
                        });
                    }).catch(error => {
                        console.log(error);
                        res.status(500).json({
                            message: "Something went wrong!",
                        });
                    });
                });
            });
        }
    }).catch(error => {
        console.log(error);
        res.status(500).json({
            message: "Something went wrong!",
        });
    });
}


function login(req, res){
    const schema = {
        email: { type: "string", optional: false, email: true },
        password: { type: "string", optional: false, min: 8 }
    };

    const v = new Validator();
    const validationResponse = v.validate(req.body, schema);

    if (validationResponse !== true) {
        return res.status(400).json({
            message: "Validation failed",
            errors: validationResponse
        });
    }
    models.User.findOne({where:{email: req.body.email}}).then(user => {
        if(user === null){
            res.status(401).json({
                message: "Invalid credentials!",
            });
        }else{
            bcryptjs.compare(req.body.password, user.password, function(err, result){
                if(result){
                    const token = jwt.sign({
                        email: user.email,
                        userId: user.id
                    }, process.env.JWT_KEY, function(err, token){
                        res.status(200).json({
                            message: "Authentication successful!",
                            token: token
                        });
                    });
                }else{
                    res.status(401).json({
                        message: "Invalid credentials!",
                    });
                }
            });
        }
    }).catch(error => {
        res.status(500).json({
            message: "Something went wrong!",
        });
    });
}


module.exports = {
    signUp: signUp,
    login: login
}
