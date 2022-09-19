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
        res.redirect('/')
    }

    consensus() {
        for (let i = 0; i < testChain.nodes.length; i++) {
            fetch(`${nodes[i]}/blockchain/chain`)
            .then(res => {
                return res.json()
            })
            .then((result) => {
                const newChain = new BlockChain(4)

                for (let i = 0; i < result.length; i++) {
                    newChain.chain[i] = Block(result[i])
                }

            })
        }
    }

}

module.exports = new BlockChainController