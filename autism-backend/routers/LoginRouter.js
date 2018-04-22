const express = require('express');
const Database = require('../services/Database');
const { check, validationResult } = require('express-validator/check');
const { ensureLoggedIn } = require('connect-ensure-login')
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
    .isIn([0, 1]).withMessage('userType must be 0 or 1'),

    check('age').trim()
    .exists().withMessage('The age should be given')
    .isInt().withMessage('The age should be an int'),

    check('password')
    .exists().withMessage('password must be given')
    .not().isEmpty().withMessage('password cant be empty')

], async (req, res) => {

    if(req.isAuthenticated()){
        return res.status(422).send('already logged in');
    }

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.mapped() });
    }

    try{
        let createdUserId = await Database.addUser(req.body.username, req.body.password, req.body.userType, req.body.age);
        let userInfo = await Database.getUserInfo(createdUserId);
        req.login(createdUserId, err => {
            if(err){
                res.status(500).send(err);
            }else{
                res.status(200).send(userInfo);
            }
        });
    }catch(ex){
        res.status(500).send('An error occured while creating user:' + ex);
    }
});

LoginRouter.post('/setTeacher', [

    ensureLoggedIn(),

    check('teacherId')
    .exists().withMessage('teacherId must be given')
    .not().isEmpty().withMessage('teacherId cant empty')
    

], async (req, res) => {
    var studentId = req.query.studentId;
    var teacherId = req.query.teacherId;
    if(!studentId || !teacherId){
        return res.status(422).send('you need to provide a teacherId, studentId');
    }

    try{
        await Database.setTeacher(studentId, teacherId);
    }catch(ex){
        return res.status(422).send(ex);
    }
});

LoginRouter.post('/login', [
    check('username').trim()
    .not().isEmpty().withMessage('username cant be empty')
    .exists().withMessage('The username must be given'),

    check('password')
    .exists().withMessage('password must be given')
    .not().isEmpty().withMessage('password cant be empty')
],
 async (req, res) => {

    if(req.isAuthenticated()){
        return res.status(422).send('already logged in');
    }

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.mapped() });
    }

    let usernameOrEmail = req.body.username;
    let password = req.body.password;
    try{
        let userId = await Database.canAuthenticate(usernameOrEmail, password);
        let userInfo = await Database.getUserInfo(userId);
        req.login(userId, err => {
            if(err){
                res.status(500).send(err);
            }else{
                res.status(200).send(userInfo);
            }
        });
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

LoginRouter.get('/studentInfo', async (req, res) => {
    var studentId = req.query.studentId;
    var teacherId = req.query.teacherId;
    if(!studentId || !teacherId){
        return res.status(422).send('you need to provide a teacherId, studentId');
    }

    try{
        let studentInfo = await Database.getStudentInfo(studentId, teacherId);
        return res.status(200).send(studentInfo);
    }catch(ex){
        return res.status(422).send(ex);
    }
});