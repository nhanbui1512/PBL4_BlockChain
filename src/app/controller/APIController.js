const dbHelper = require('../modal/DBHelper')
const hash = require('crypto-js/sha256')
const subvn = require('sub-vn')
const NguyenLieu = require('../modal/NguyenLieu')
const { reset } = require('nodemon')


class APIController {
    //GET /API/Users
    getAllUser(req, res)
    {
        let stringQuery = 'SELECT * FROM user'
        dbHelper.connectDB()
            .then((connection) => {
                connection.query(stringQuery, function(err , data) {
                    dbHelper.closeDB(connection)
                    // for (let i = 0; i < data.length; i++) {
                    //     data[i].Password = hash(data[i].Password).toString()
                    // }
                    return res.status(200).json(data)
                })
            })
            .catch((error) => {
                console.log(error)
                res.send('Kết nối đến Database thất bại')
            })
    }

    getAllThongTinDoanhNghiep(req, res){
        let stringQuery = 'SELECT user.IDUser , thongtindoanhnghiep.IDThongTinDoanhNghiep , user.Email , user.Email , user.UserName , thongtindoanhnghiep.Address , thongtindoanhnghiep.MaSoThue , thongtindoanhnghiep.LoaiHinhKinhDoanh , thongtindoanhnghiep.PhoneNumber FROM user , thongtindoanhnghiep WHERE user.IDUser = thongtindoanhnghiep.IDUser'
        dbHelper.connectDB()
            .then((connection) => {
                connection.query(stringQuery, (err, data) => {
                    dbHelper.closeDB(connection)
                    return res.status(200).json(data)
    
                })
            })
            .catch((err) => {
                console.log(err)
                res.send('Kết nối đến Database thất bại')
            })
    }


    getDoanhNghiepByID(req, res){
        var id = req.params.id
        
        let stringQuery = `SELECT user.IDUser , thongtindoanhnghiep.IDThongTinDoanhNghiep , user.Email , user.Email , user.UserName , thongtindoanhnghiep.Address , thongtindoanhnghiep.MaSoThue , thongtindoanhnghiep.LoaiHinhKinhDoanh , thongtindoanhnghiep.PhoneNumber FROM user , thongtindoanhnghiep WHERE user.IDUser = thongtindoanhnghiep.IDUser and user.IDUser = ${id}`

        dbHelper.connectDB()
        .then((connection) => {
            connection.query(stringQuery, (err, data) => {
                dbHelper.closeDB(connection)
                return res.status(200).json(data)

            })
        })
        .catch((err) => {
            console.log(err)
            res.send('Kết nối đến Database thất bại')
        })
    }

    getAllCQKiemDinh(req, res)
    {
        let stringQuery = 'SELECT user.IDUser, thongtincqkiemdinh.IDThongTinCQ , user.Email , user.UserName , thongtincqkiemdinh.Address , thongtincqkiemdinh.PhoneNumber FROM thongtincqkiemdinh , user WHERE user.IDUser = thongtincqkiemdinh.IDUser';
        dbHelper.connectDB()
        .then((connection) => {
            connection.query(stringQuery, (err, data) => {
                dbHelper.closeDB(connection)
                res.status(200).json(data)

            })
        })
        .catch((err) => {
            console.log(err)
            res.send('Kết nối đến Database thất bại')
        })
    }


    GetAllThongTinNguyenLieu(req, res)
    {
        let stringQuery = 'SELECT nguyenlieu.IDNguyenLieu , nguongoc.IDNguonGoc , nguyenlieu.TenNguyenLieu , nguongoc.Tinh , nguongoc.Huyen_TP , nguongoc.Xa_Phuong FROM nguongoc , nguyenlieu WHERE nguyenlieu.IDNguonGoc = nguongoc.IDNguonGoc'
        dbHelper.connectDB()
            .then((connection) => {
                connection.query(stringQuery, (err, data) => {
                    res.status(200).json(data)
                    return dbHelper.closeDB(connection)
                })
            })
            .catch((err) => {
                console.log(err)
                res.status(500)

            })
    }



    getAllNodeAddress(req, res)
    {
        let stringQuery = 'SELECT * FROM nodes'
        dbHelper.connectDB()
        .then((connection) => {
            connection.query(stringQuery, (err, data) => {
                dbHelper.closeDB(connection)
                return res.status(200).json(data)

            })
        })
        .catch((err) => {
            console.log(err)
            res.send('Kết nối đến Database thất bại')
        })
    }

    insertNodeAddress(req, res){
        var nodeAddress = req.body.nodeAddress 
        let stringQuery = `INSERT INTO nodes (NodeAddress) VALUES ('${nodeAddress}')`
        dbHelper.connectDB()
            .then((connection) => {
                connection.query(stringQuery, (err, data) => {
                    dbHelper.closeDB(connection)
                    return res.status(200).send('successful')
                })
            })
            .catch((err) => {
                console.log(err)
                res.status(500).send('unsuccessful')
            })
    }

    insertProduct(req,res)
    {
        
    }




    // //POST /api/insertmaterial
    // insertMaterial(req,response)
    // {
    //     var tennguyenlieu = req.body.tennguyenlieu
    //     var tinh = req.body.tinh
    //     var huyen = req.body.huyen
    //     var xa = req.body.xa
    //     var userid = req.body.userid

    //     dbHelper.connectDB()
    //         .then(connection=> {
    //             var insertquery = `insert into nguyenlieu (TenNguyenLieu,IDUser) values ('${tennguyenlieu}', '${userid}')`
    //             connection.query(insertquery, (err, data) => {
    //             })
    //             return connection

    //         })
    //         .then((connection) => {
    //             const ID = null
    //             var getidquery = `select IDNguyenLieu from nguyenlieu where TenNguyenLieu = '${tennguyenlieu}' and IDUser = '${userid}'`
    //             connection.query(getidquery,(err,data)=>{
    //                 ID = data
    //             })
    //             console.log(ID)
    //             return ID
    //         })
    //         .then((ID)=> {
    //             response.send(ID)
    //         })
    //         .catch((err)=>{
    //             response.send('fail')
    //         })

    // }

    

}

module.exports = new APIController