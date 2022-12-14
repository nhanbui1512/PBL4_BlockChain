var BlockChain = require('../model/BlockChain');
var Block = require('../model/Block');
const hash = require('crypto-js/sha256')

const request = require('request');
const { json, response } = require('express');
const Node = require('../model/node');
const Chain = require('../model/chain');
const { multipleMongooseToObject } = require('../../util/mongoose');
const chain = require('../model/chain');




const options = {
    url: 'http://127.0.0.1:3000/blockchain/nodes',
    method: 'GET',
    headers: {
        'Accept': 'application/json',
        'Accept-Charset': 'utf-8',
        'User-Agent': 'my-reddit-client'
    }
};



const testChain = new BlockChain(4)
var theFirst = true

class BlockChainController {


    // GET localhost:
    async startServer(req , res){

        var nodeAddress = 'http://' + req.rawHeaders[1].toString()
        
        if(nodeAddress !== 'http://127.0.0.1:3000'){

            testChain.nodes[0] = 'http://127.0.0.1:3000'


            // Lấy ra địa chỉ các node có trong mạng từ localhost:3000
            request(options, function(err, res, body) {
                var result = JSON.parse(body)
                for (let i = 0; i < result.length; i++) {
                    if( result[i] != nodeAddress && testChain.checkNode(result[i]) == true )  {
                        testChain.addNewNode(result[i])
                    }
                }
            });
            
            // đăng ký địa chỉ node của mình cho cổng 3000
            request.post({
                url: 'http://127.0.0.1:3000/blockchain/register',
                form: {
                    node: nodeAddress
                }
            }, () => {

            } )

        }
        else{
            if(theFirst === true)
            {
                theFirst = false

                Node.find({}, (err, data) => {
                    if(!err){
                        var result = multipleMongooseToObject(data)

                        for (let i = 0; i < result.length; i++) {
                            testChain.nodes[i] = result[i].nodeAddress
                        }

                        request(`http://127.0.0.1:3000/blockchain/consensus`, { json: true }, (err, res, body) => {
                                if (err) { return console.log(err); }
                              });

                    }
                    else{
                        response.status(500).json('Fail')
                    }
                })

                Chain.find({}, (err,data) => {
                    var chain = multipleMongooseToObject(data)
                    for (let i = 0; i < chain.length; i++) {
                        const newBlock = new Block
                        newBlock.preHash = chain[i].preHash
                        newBlock.data = chain[i].data
                        newBlock.timeStamp = chain[i].timeStamp
                        newBlock.hash = chain[i].hash
                        newBlock.mineVar = chain[i].mineVar
                        testChain.chain[i] = newBlock
                    }
                })

            }   

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
        // res.status(200).json(testChain.chain)
        res.setHeader('Content-type','application/json')
        res.end(JSON.stringify(testChain.chain))
    }

    // POST //blockchain/mine
    async mine(req, res){ 
        // testChain.addBlock({
        //     from: req.body.from,
        //     to: req.body.to,
        //     amount: req.body.amount
        // } )

        const data = req.body.data
        testChain.addBlock(data)
        
        var newBlock = new Chain(testChain.getLastBlock())
        newBlock.save();

        if(testChain.nodes.length > 0 ){
            
            for (let i = 0; i < testChain.nodes.length; i++) {

                request(`${testChain.nodes[i]}/blockchain/consensus`, { json: true }, (err, res, body) => {
                    if (err) { return console.log(err); }
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
                    url: `${testChain.nodes[i]}/blockchain/register`,
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

    async checkDB(req,res){
        Chain.find({}, (err, data) => {
            if(! err) {
                var chainDB = multipleMongooseToObject(data)
                for (let i = 1; i < chainDB.length; i++) {
                    const currentBlock = chainDB[i]
                    const preBlock = chainDB[i - 1]

                    console.log(hash(currentBlock.preHash + JSON.stringify(currentBlock.data) + currentBlock.timeStamp + currentBlock.mineVar ).toString())

                    if( currentBlock.hash != preBlock.hash){
                        console.log(currentBlock)
                        chain.updateOne({_id: currentBlock._id}, testChain.chain[i], (err, res) => {
                        })
                    }
                    if(currentBlock.hash !=
                         hash(currentBlock.preHash + JSON.stringify(currentBlock.data) + currentBlock.timeStamp + currentBlock.mineVar ).toString()
                    ){
                        
                        console.log(currentBlock)
                        chain.updateOne({_id: currentBlock._id}, testChain.chain[i], (err, res) => {
                        })
                    }
                }

                res.send('cuccess')
            }
            else{
                res.status(500).json('fail')
            }
        })
    }


    // POST blockchain/ThemChungChi
    async ThemChungChi(req, res)
    {
        var IDChungChi = req.body.IDChungChi
        var SanPham = req.body.SanPham
        var NgayCap = req.body.NgayCap
        var IDNhaSanXuat = req.body.IDNhaSanXuat
        var IDCQKiemDinh = req.body.IDCQKiemDinh

        testChain.addBlock({
            IDChungChi:IDChungChi,
            SanPham: SanPham,
            NgayCap: NgayCap,
            IDNhaSanXuat,
            IDCQKiemDinh: IDCQKiemDinh,
        })
        
    }



}

module.exports = new BlockChainController




