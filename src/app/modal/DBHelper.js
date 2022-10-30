const mysql = require('mysql')

function connectDB () {
    return new Promise((resolve, reject) => {
        const con = mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: '',
            database: 'truyxuatnguongoc',
        });
        con.connect((err) => {
            if(err) {
                reject(err);
            }
            resolve(con);
        });

    });
}

function closeDB (con) {
    con.destroy();
}


module.exports.connectDB = connectDB
module.exports.closeDB = closeDB