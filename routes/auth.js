const express = require('express');
const router = express.Router();
const {validationResult} = require('express-validator');
const {loginValid} = require('../utils/validation');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const passport = require('passport');

const User = require('../models/user.model');

//dang nhap cho customer

//cho admin
router.get('/admin/user', passport.authenticate('jwt', {session: false}), async (req, res) => {
    console.log(req.user);
    return res.status(200).json(req.user);
})

//login
router.post('/admin/login', loginValid, async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json(errors.mapped())
    }
    //kiem tra xem email da ton tai chua
    const {email, password} = req.body;
    const user = await User.findOne({email});
    if(!user) {
        return res.status(400).json({msg: 'tai khoan email khong dung'});
    }

    //tam thoi tai khoan admin bo qua hasscode
    if(password !== user.password)
        return res.status(401).json({msg: 'mat khau khong chinh xac'});

    //tao token
    const accessToken = jwt.sign({sub: user._id}, process.env.SECRET_1);
    const refreshToken = jwt.sign({sub: user._id}, process.env.SECRET_2);

    console.log(user);

    return  res.status(200).json({token: {accessToken, refreshToken}});
});

router.post('/admin/register', async (req, res) => {
    const {email, password} = req.body;
    try{
        const user = new User({email, password});
        await user.save();
        return res.status(200).json({msg: 'thanh cong'});
    }
    catch (err){
        return  res.status(403).json({msg: err});
    }
})
module.exports = router;