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

    async addUser(name, email, password, userType){
        let passHash = await bcrypt.hash(password, parseInt(process.env.SALT_ROUND));
        
        let result = await this.SQL.queryFile('addUser', {
            name,
            email,
            password: passHash,
            userType
        });
        return result[0].created_user_id;
    }

    async getUserInfo(userId){
        let result = await this.SQL.queryFile('getUserInfo', { userId });
        return result[0];
    }
    
    async canAuthenticate(usernameOrEmail, password){
        let result = await this.SQL.queryFile('canAuthenticate', {
            usernameOrEmail
        });
        if(result.length == 0){
            throw new Error('no user found');
        }

        let passwordHash = result[0].password;
        let userId = result[0].user_id;
        let passwordMatch = await bcrypt.compare(password, passwordHash.toString());
        if(passwordMatch){
            return userId;
        }else{
            throw new Error('password doesnt match');
        }
    }

}



module.exports = new Database;