const dbHelper = require('../modal/DBHelper')


class APIController {
    //GET /API/Users
    getAllUser(req, res)
    {
        let stringQuery = 'SELECT * FROM user'
        dbHelper.connectDB()
            .then((connection) => {
                connection.query(stringQuery, function(err , data) {
                    console.log(data)
                    dbHelper.closeDB(connection)
                    return res.status(200).json(data)
                })
            })
            .catch((error) => {
                console.log(error)
                res.send('Ket Noi Den Database that bai')
            })
            
       
    }

    getAllThongTinDoanhNghiep(req, res){
     
    }

}

module.exports = new APIController