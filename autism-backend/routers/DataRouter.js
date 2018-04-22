const express = require('express');
const Database = require('../services/Database');
const DataRouter = new express.Router();
module.exports = DataRouter;

DataRouter.get('/answer', async (req, res) => {
    // var token = req.query.token;
    // var questionNb = req.query.questionNb;
    // var answer = req.query.answer;
    // if(!token || !questionNb || !answer){
    //     return res.status(422).send('you need to provide token, questionNb, answer');
    // }
    Database.listQuestions();
}); 