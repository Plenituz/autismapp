const express = require('express');
const Database = require('../services/Database');
const { check, validationResult } = require('express-validator/check');
const LoginRouter = new express.Router();
module.exports = LoginRouter;


LoginRouter.post('/register', [
    check('username').trim()
    .exists().withMessage('The username must be given')
    .isAlphanumeric().withMessage('The username must be alphanumeric')
    .not().isEmpty().withMessage('The username can\'t be empty'),

    check('email').trim()
    .exists().withMessage('The email must be given')
    .isEmail().withMessage('email must be an email')
    .normalizeEmail(),

    check('password')
    .exists().withMessage('password must be provided')
    .not().isEmpty().withMessage('password cant be empty'),

    check('userType')
    .exists().withMessage('userType must be provided')
    .isInt().withMessage('userType must be int')
    .isIn([0, 1]).withMessage('userType must be 0 or 1')

], async (req, res) => {
    let redirectUrl = req.query.redirect || '/';

    if(req.isAuthenticated()){
        res.redirect(redirectUrl);
        return;
    }

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.mapped() });
    }

    try{
        let createdUserId = await Database.addUser(req.body.username, req.body.email, req.body.password, req.body.userType);
        req.login(createdUserId, err => {
            if(err){
                res.status(500).send('An error occured while login in');
            }else{
                res.status(200).send('user created');
            }
        })
    }catch(ex){
        res.status(500).send('An error occured while creating user:' + ex);
    }
});


LoginRouter.get('/login', [
    // check('email').trim()
    // .not().isEmpty().withMessage('email cant be empty')
    // .exists().withMessage('The email must be given'),

    // check('password')
    // .exists().withMessage('password must be provided')
    // .not().isEmpty().withMessage('password cant be empty'),
], async (req, res) => {

    if(req.isAuthenticated()){
        return res.status(422).send('already logged in');
    }

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.mapped() });
    }

    let usernameOrEmail = req.body.email;
    let password = req.body.password;

    try{
        // let userId = await Database.canAuthenticate(usernameOrEmail, password);
        req.login(1, err => {
            if(err){
                res.status(422).send('error logging in: ' + err);
            }else{
                res.status(200).send('sucessfully logged in');
            }
        });
    }catch(ex){
        res.status(422).send('error logging in: ' + ex);
    }
});