var BlockChain = require('../modal/BlockChain')
var Block = require('../modal/Block')


const testChain = new BlockChain(4)


class BlockChainController {
    
    createblock(req, res) {
        res.render('createblock' , {
            layout: false
        });
    }

    getChain(req, res){
        res.status(200).json(testChain.chain)
        console.log(testChain.isValid());

    }

    mine(req, res){ 
        testChain.addBlock({
            from: req.body.from,
            to: req.body.to,
            amount: req.body.amount
        })

        res.redirect('/blockchain/chain')
    }

    rigisterNode(req, res){
        var nodeAddress = req.body.node
        testChain.addNewNode(nodeAddress)
        res.redirect('/blockchain/nodes')
    }

    consensus(req , res) {
        for (let i = 0; i < testChain.nodes.length; i++) {
            fetch(`${testChain.nodes[i]}/blockchain/chain`)
            .then(res => {
                return res.json()
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
                console.log(newChain.chain)
                console.log(newChain.isValid())
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