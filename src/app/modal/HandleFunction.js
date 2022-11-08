const mysql = require('mysql')
const dbHelper = require('./DBHelper')

function excutedQuery(stringquery) {
    dbHelper.connectDB()
    .then((connection) => {
        connection.query(stringquery, function(err , data) {
            dbHelper.closeDB(connection)
            return data
        })
    })
    .catch((error) => {
        console.log(error)
        return false
    })
    return 
}

module.exports.excutedQuery = excutedQuery;
