const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const { registrationValidation, loginValidation } = require('../validation');




//Register a new User
router.post('/register', async (req, res) => {

    //validating data coming from request
    const { error } = await registrationValidation(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    //Checking if the user is in the database
    const emailExist = await User.findOne({email: req.body.email});
    if(emailExist) return res.status(400).send({message: "Email already exist"});

    //Hash Password
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(req.body.password, salt);

    //creating user schema
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashPassword
    });

    //database entry
    try {
        const savedUser = await user.save();
        res.send({message: "User registration successful", user: savedUser});
    } catch (error) {
        res.status(400).send({ message: error })
    }
});

//Login
router.post('/login', async (req, res) => {

    //validating data coming from request
    const { error } = await loginValidation(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    //Checking if the user is in the database
    const user = await User.findOne({email: req.body.email});
    if(!user) return res.status(400).send({message: "Email is not registerd"});

    //Password
    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if(!validPassword) return res.status(400).send({message: 'Email or Pssword is incorrect'});

    //Adding Token
    const token = jwt.sign({_id: user._id}, process.env.TOKEN_SECRET);
    res.header('auth-token', token).send({token: token});

});

module.exports = router;