const mysql = require('mysql');
const bcrypt = require('bcrypt');
const SQLCache = require('./SQLCache');

class Database{

    constructor(){
        this.pool = mysql.createPool({
            connectionLimit: process.env.SQL_CONNECTION_LIMIT,
            host: process.env.SQL_HOST,
            user: process.env.SQL_USER,
            password: '',
            database: process.env.DB_NAME,
            debug: false
        });
        this.SQL = new SQLCache(this.pool);
    }

    async addUser(name, userType, age, teacherId){
        
        if(teacherId){
            let result = await this.SQL.queryFile('addLearner', {
                name,
                userType,
                age,
                teacherId
            });
            return result[0].created_user_id;
        }else{
            let result = await this.SQL.queryFile('addTeacher', {
                name,
                userType,
                age
            });
            return result[0].created_user_id;
        }

    }

    async getBasicUserInfo(userId){
        let result = await this.SQL.queryFile('getUserInfo', { userId });
        return result[0];
    }

    async getUserInfo(userId){
        let basicInfo = await this.getBasicUserInfo(userId);
        if(basicInfo.userType !== 1){
            return basicInfo;//students, just give basic info
        }
        let students = await this.SQL.queryFile('getTeacherInfo', { userId });
        return {
            ...basicInfo,
            students:[
                ...students
            ]
        };
    }

    async canAuthenticate(usernameOrEmail){
        let result = await this.SQL.queryFile('canAuthenticate', {
            usernameOrEmail
        });
        if(result.length == 0){
            throw new Error('no user found');
        }

        return result[0].id;
    }

    async listQuestions(){
        let result = await this.SQL.queryFile('listQuestions');
        let dict = {};
        for(let i = 0; i < result.length; i++){
            let column = result[i];

            if(!(column.question_id in dict)){
                dict[column.question_id] = {
                    questionId: column.question_id,
                    title: column.question_text,
                    answers: []
                }
            }

            let questionObj = dict[column.question_id];
            questionObj.answers.push({
                answerId: column.answer_id,
                content: column.content,
                isRight: !!column.is_right
            });
        }
        let resultArray = [];
        Object.keys(dict).forEach(key => resultArray.push(dict[key]));
        return resultArray;
    }

    async addUserAnswer(userId, questionId, answerId){
        await this.SQL.queryFile('addUserAnswer', {
            userId,
            questionId,
            answerId
        });
    }
}



module.exports = new Database;