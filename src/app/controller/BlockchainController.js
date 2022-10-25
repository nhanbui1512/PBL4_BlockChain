var BlockChain = require('../modal/BlockChain')
var Block = require('../modal/Block')
const request = require('request');
const { json } = require('express');


const options = {
    url: 'http://192.168.0.103:3000/blockchain/nodes',
    method: 'GET',
    headers: {
        'Accept': 'application/json',
        'Accept-Charset': 'utf-8',
        'User-Agent': 'my-reddit-client'
    }
};



const testChain = new BlockChain(4)

    var ChungChi = {
        id: 1200,
        sanpham: {
            idSanPham: 123,
            TenSanPham: "Kẹo Gạo Lứt Mè Đen",
            NguyenLieu: [ {
                idNguyenLieu: 2,
                tenNguyenLieu: 'Mè Đen',
                nguonGoc: 'Nhap Khau Thai Lan',
                },

                {
                    idNguyenLieu: 3,
                    tenNguyenLieu: 'Gao Lut',
                    nguonGoc: 'A Luoi - Thua Thien Hue',
                    },

            ],
            QuyTrinhSanXuat: {
                idQuyTrinh: 12,
                TenQuyTrinh: 'Quy Trinh San Xuat Keo Gao Lut Me Den',
                MoTaQuyTrinh: 'Duoc San Xuat theo cong nghe Nhat Ban...',
                URl: './img/keogaolut.pdf',

            },
            ngayCap: Date.now,
            IDNhaSanXuat: 20123123,
            IDCQKiemDinh: 21412313,
        }
    }

    testChain.addBlock(ChungChi)


class BlockChainController {


    // GET localhost:
    async startServer(req , res){

        var nodeAddress = 'http://' + req.rawHeaders[1].toString()
        
        if(nodeAddress !== 'http://192.168.0.103:3000'){

            testChain.nodes[0] = 'http://192.168.0.103:3000'


            // Lấy ra địa chỉ các node có trong mạng từ localhost:3000
            request(options, function(err, res, body) {
                var result = JSON.parse(body)
                for (let i = 0; i < result.length; i++) {
                    if( result[i] != nodeAddress && testChain.checkNode(result[i]) == true )  {
                        testChain.addNewNode(result[i])
                    }
                }
            });
            
            request.post({
                url: 'http://192.168.0.103:3000/register',
                form: {
                    node: nodeAddress
                }
            }, () => {

            } )

            
        }
        res.send('Successful')
    }
    

    // GET /blockchain/createblock
    async createblock(req, res) {
        res.render('createblock' , {
            layout: false
        });
    }

    // GET /blockchain/chain
    async getChain(req, res){
        res.status(200).json(testChain.chain)
    }

    // POST //blockchain/mine
    async mine(req, res){ 
        testChain.addBlock({
            from: req.body.from,
            to: req.body.to,
            amount: req.body.amount
        } )

        if(testChain.nodes.length > 0 ){
            
            for (let i = 0; i < testChain.nodes.length; i++) {

                // fetch(`${testChain.nodes[i]}/blockchain/consensus`, {
                //     method: 'GET', // or 'PUT'
                //     // body: JSON.stringify(req.body),
                // })
                // .catch((error) => {
                //     console.error('Error:', error);
                // });

                request(`${testChain.nodes[i]}/blockchain/consensus`, { json: true }, (err, res, body) => {
                    if (err) { return console.log(err); }
                    console.log(body.url);
                    console.log(body.explanation);
                  });
            }
            
        }
        res.redirect('/blockchain/chain')
    }


    // POST /blockchain/register
    async rigisterNode(req, res){
        var nodeAddress = req.body.node
        if(testChain.checkNode(nodeAddress) == true){

            for (let i = 0; i < testChain.nodes.length; i++) {
                request.post({
                    url: `${testChain.nodes[i]}/register`,
                    form: {
                        node: nodeAddress
                    }
                })
            }
            testChain.addNewNode(nodeAddress)
        }
        res.redirect('/blockchain/nodes')
    }

    // GET /blockchain/consensus
    async consensus(req , res) {
  
        for (let i = 0; i < testChain.nodes.length; i++) {
            const element = testChain.nodes[i];
            request(`${element}/blockchain/chain`, function (error, response, body) {
                if(error){
                    console.log(error)
                }
                else{
                    const result = JSON.parse(body)
                    const newChain = new BlockChain(4)

                    for (let i = 0; i < result.length; i++) {
                        const newBlock = new Block
                        newBlock.preHash = result[i].preHash
                        newBlock.data = result[i].data
                        newBlock.timeStamp = result[i].timeStamp
                        newBlock.hash = result[i].hash
                        newBlock.mineVar = result[i].mineVar
                        newChain.chain[i] = newBlock
                    }

                    if(newChain.chain.length > testChain.chain.length &&  newChain.isValid() == true){
                        testChain.chain = newChain.chain
                    }

                }
             });
        }
        
        res.send('Consensus')

    }


    // GET blockchain/nodes
    async nodes(req, res){
        res.send(testChain.nodes)
    }


    // GET blockchain/isvalid
    async isValid(req, res){
        res.send(testChain.isValid())
    }


}

module.exports = new BlockChainController




