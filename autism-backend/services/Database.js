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

    async addUser(name, email, userType){
        
        let result = await this.SQL.queryFile('addUser', {
            name,
            email,
            userType
        });
        return result[0].created_user_id;
    }

    async getUserInfo(userId){
        let result = await this.SQL.queryFile('getUserInfo', { userId });
        return result[0];
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
                    title: column.question_text,
                    answers: []
                }
            }

            let questionObj = dict[column.question_id];
            questionObj.answers.push({
                content: column.content,
                isRight: !!column.is_right
            });
        }
        console.log();
    }
}



module.exports = new Database;