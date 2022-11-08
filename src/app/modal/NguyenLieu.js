const mysql = require('mysql')
const dbHelper = require('./DBHelper')

function ThemNguyenLieu(tennguyenlieu, userid) {
    var stringQuery = `insert into nguyenlieu (TenNguyenLieu,IDUser) values ('${tennguyenlieu}', '${userid}')`
    dbHelper.connectDB()
    .then((connection) => {
        connection.query(stringQuery, function(err , data) {
            dbHelper.closeDB(connection)
            return true
        })
    })
    .catch((error) => {
        console.log(error)
        return false
    })
}

module.exports.ThemNguyenLieu = ThemNguyenLieu;
