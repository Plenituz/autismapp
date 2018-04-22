const express = require('express');
const Database = require('../services/Database');
const { check, validationResult } = require('express-validator/check');
const LoginRouter = new express.Router();
module.exports = LoginRouter;
const passport = require('passport');


LoginRouter.post('/register', [
    check('username').trim()
    .exists().withMessage('The username must be given')
    .isAlphanumeric().withMessage('The username must be alphanumeric')
    .not().isEmpty().withMessage('The username can\'t be empty'),

    check('userType')
    .exists().withMessage('userType must be provided')
    .isInt().withMessage('userType must be int')
    .isIn([0, 1]).withMessage('userType must be 0 or 1')

], async (req, res) => {

    if(req.isAuthenticated()){
        res.redirect(redirectUrl);
        return;
    }

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.mapped() });
    }

    try{
        let createdUserId = await Database.addUser(req.body.username, req.body.email, req.body.userType);
        res.status(200).send({ userId: createdUserId });
    }catch(ex){
        res.status(500).send('An error occured while creating user:' + ex);
    }
});


LoginRouter.post('/login', [
    check('email').trim()
    .not().isEmpty().withMessage('email cant be empty')
    .exists().withMessage('The email must be given')
],
 async (req, res) => {
    var token = req.query.token;
    if(token){
        return res.status(422).send('already logged in');
    }

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.mapped() });
    }

    let usernameOrEmail = req.body.email;
    try{
        let userId = await Database.canAuthenticate(usernameOrEmail);
        res.status(200).send({ userId });
    }catch(ex){
        return res.status(422).send(ex);
    }
});

LoginRouter.get('/userInfo', async (req, res) => {

    var token = req.query.token;
    if(!token){
        return res.status(422).send('you need to provide a token');
    }

    try{
        let userInfo = await Database.getUserInfo(token);
        res.status(200).send(userInfo);
    }catch(ex){
        return res.status(422).send(ex);
    }
});