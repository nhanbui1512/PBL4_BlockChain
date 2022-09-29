var BlockChain = require('../modal/BlockChain')
var Block = require('../modal/Block')


const testChain = new BlockChain(4)

class BlockChainController {



    startServer(req , res){
        
        testChain.nodes[0] = 'http://localhost:3000'

        res.redirect('/blockchain/consensus')
    }
    
    createblock(req, res) {
        res.render('createblock' , {
            layout: false
        });
    }

    getChain(req, res){
        res.status(200).json(testChain.chain)
    }

    mine(req, res){ 
        testChain.addBlock({
            from: req.body.from,
            to: req.body.to,
            amount: req.body.amount
        } )

        fetch(`${testChain.nodes[0]}/blockchain/consensus`, {
            method: 'GET', // or 'PUT'
            headers: {
                'Content-Type': 'application/json',
            },
            // body: JSON.stringify(req.body),
        })
        .catch((error) => {
            console.error('Error:', error);
        });

        res.redirect('/blockchain/chain')
    }




    rigisterNode(req, res){
        var nodeAddress = req.body.node
        if(testChain.checkNode(nodeAddress) == true){
            testChain.addNewNode(nodeAddress)
        }
        res.redirect('/blockchain/nodes')
    }

    consensus(req , res) {
        for (let i = 0; i < testChain.nodes.length; i++) {
            fetch(`${testChain.nodes[i]}/blockchain/chain`)
            .then(res => {
                if(res.ok){
                    return res.json()
                }
                throw new Error('Some Thing Error')
            })
            .then((result) => {
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
                return newChain
            })
            .then((newChain) => {
                if(newChain.chain.length > testChain.chain.length &&  newChain.isValid() == true){
                    testChain.chain = newChain.chain
                }
            })
            .catch((err) => {
                console.log(err)
            })

        }
        res.redirect('/blockchain/chain')

    }

    nodes(req, res){
        res.send(testChain.nodes)
    }

    isValid(req, res){
        res.send(testChain.isValid())
    }

}

module.exports = new BlockChainController