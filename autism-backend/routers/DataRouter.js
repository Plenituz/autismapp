const express = require('express');
const Database = require('../services/Database');
const DataRouter = new express.Router();
module.exports = DataRouter;

DataRouter.post('/answer', async (req, res) => {

    // if(req.isAuthenticated()){
    //     return res.status(422).send('already logged in');
    // }
    var userId = req.query.userId;//req.user.userId;
    var questionId = 1//req.body.questionId;
    var answerId = 1//req.body.answerId;
    var isRight = !!parseInt(req.body.isRight);
    
    if(!questionId || !answerId){
        return res.status(422).send('you need to provide questionId, answerId, isRight');
    }
    try{
        await Database.addUserAnswer(userId, questionId, answerId, isRight);
        return res.status(200).send('answer added');
    }catch(ex){
        return res.status(422).send(ex);
    }
});

DataRouter.get('/listQuestions', async (req, res) => {
    try{
        let questions = await Database.listQuestions();
        return res.status(200).send(JSON.stringify(questions));
    }catch(ex){
        return res.status(422).send(ex);
    }
});