var express = require('express');
const router = require('express').Router();
const User = require("../models/userSchema");

router.route('/').get((req, res) => {
    User.find()
     .then(users => res.json(users))
     .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/register').post((req, res) => {

    const newUser = new User({
        userID : req.body.userID,
        password: req.body.password
    });

    newUser
    .save()
    .then(user => res.json(user))
});

router.route('/login').post((req,res) =>{
    const userID = req.body.userID;
    const password = req.body.password;

    User.findOne({userID}).then(user =>{
        if(!user){
            return res.status(404).json({usernotfound: "User Name Not Found."})
        }
        if(password === user.password){
            console.log("User logged in");
        }
    })
})

module.exports = router;