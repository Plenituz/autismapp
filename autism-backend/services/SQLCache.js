const Q = require('q');
const path = require('path');
const mysql = require('mysql');
const fs = require('fs');

module.exports = class SQLCache{

    /**
     * 
     * @param {mysql.Pool} pool 
     */
    constructor(pool){
        this.pool = pool;
        this.sqlCache = {};
    }

    query(queryStr, params) {
        var deferred = Q.defer();
    
        this.pool.getConnection(function (err, connection) {
    
            function onError(err) {
                //res.status(100).send("error in connection to data base after");
                connection.removeListener('error', onError);
                connection.release();
                deferred.reject(err);
                return;
            }
    
            if (err) {
                deferred.reject(err);
                //res.status(100).send("error in connection to database");
                return;
            }
    
            //console.log("connected as id " + connection.threadId);
            let q = connection.query(queryStr, params, function (err, results, fields) {
                connection.release();
                connection.removeListener('error', onError);
                if (!err) {
                    //console.log("resolving " + connection.threadId);
                    deferred.resolve(results, fields);
                } else {
                    deferred.reject(err);
                }
            });
            if (process.env.DEBUG_SQL == true)
                console.log("query: " + q.sql);
    
            connection.on('error', onError);
        });
    
        return deferred.promise;
    }

    queryWithConnection(connection, queryStr, params) {
        var deferred = Q.defer();
    
        if (process.env.DEBUG_SQL == true)
            console.log("next query: (params=" + params + ")\n" + queryStr);
        connection.query(queryStr, params, function (err, results, fields) {
            if (err)
                deferred.reject(err);
            else
                deferred.resolve(results, fields);
        });
    
        return deferred.promise;
    }

    multiQueryUnsafeWithConnection(connection, queries) {
        var promise = null;
    
        //using let here so the ref to i is not the same every loop
        for (let i = 0; i < queries.length; i++) {
            if (!promise) {
                promise = this.queryWithConnection(connection, queries[i]);
            } else {
                promise = promise.then(function (results, fields) {
                    return this.queryWithConnection(connection, queries[i]);
                });
            }
        }
        return promise;
    }

    queryMulti(queries) {
        var self = this;
        var defer = Q.defer();
    
        this.pool.getConnection(function (err, connection) {
            //fields for storing results and fields
            var res, fie;
            if (err) {
                defer.reject(err);
                return;
            }
    
            //handle all the errors : rollback and reject the promise
            function onError(err) {
                console.log("error occured: " + err);
                connection.rollback(function () {
                    connection.release();
                    defer.reject(err);
                })
            }
    
            connection.beginTransaction(function (err) {
                if (err) {
                    onError(err);
                    return;
                }
    
                //execute all but the last query
                self.multiQueryUnsafeWithConnection(connection, queries.slice(0, queries.length - 1))
                    .then(function () {
                        //last query, we return the result
                        let q = queries[queries.length - 1];
                        return self.queryWithConnection(connection, q);
                    })
                    .then(function (results, fields) {
                        res = results;
                        fie = fields;
                        // return Q.nfcall(connection.commit);
                        return self.queryWithConnection(connection, "COMMIT");
                    })
                    .then(function () {
                        defer.resolve(res, fie);
                    })
                    .fail(function (err) {
                        onError(err);
                    })
            });
        });
    
        return defer.promise;
    }

    escapeText(text, params) {
        let res = text;
        for (let prop in params) {
            res = res.split('@' + prop).join(mysql.escape(params[prop]));
        }
        return res;
    }

    escapeAndSend(data, params) {
        data = this.escapeText(data, params);
        let queries = data.split(";");
        //clean the array of empty entries
        queries = queries.filter(q => q.trim().length > 0);
        //if there is only one query, we limit the overhead by calling query and not queryMulti
        if (queries.length == 1)
            return this.query(queries[0]);
        else
            return this.queryMulti(queries);
    }

    queryFile(fileName, params) {
        let self = this;
        //remove any extension if their is one and replace it with .sql
        //that way you can do queryFile('poop.sql') and queryFile('poop')
        fileName = path.parse(fileName).name + ".sql";
        if (fileName in this.sqlCache) {
            //file has already been read
            let data = this.sqlCache[fileName];
            return this.escapeAndSend(data, params);
        } else {
            return Q.nfcall(fs.readFile, path.join(process.env.SQL_DIR, fileName), 'utf8')
                .then(function (data) {
                    //store the queries in the cache
                    self.sqlCache[fileName] = data;
                    return self.escapeAndSend(data, params);
                });
        }
    }

    
    
}

