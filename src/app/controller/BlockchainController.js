var BlockChain = require('../modal/BlockChain')
var Block = require('../modal/Block')



class BlockChainController {
    
    createblock(req, res) {
        res.render('createblock' , {
            layout: false
        });
    }

    mine(req, res){ 
        
    }

}

module.exports = new BlockChainController