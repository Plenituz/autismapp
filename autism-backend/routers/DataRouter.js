const express = require('express');
const Database = require('../services/Database');
const DataRouter = new express.Router();
module.exports = DataRouter;

DataRouter.post('/answer', async (req, res) => {
    var token = req.query.token;
    var questionId = req.query.questionId;
    var answerId = req.query.answerId;
    if(!token || !questionId || !answerId){
        return res.status(422).send('you need to provide token, questionId, answerId');
    }
    try{
        await Database.addUserAnswer(token, questionId, answerId);
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