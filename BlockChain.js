var Block = require('./Block')


module.exports = class BlockChain {
    constructor(difficulty) {
        const genesisBlock = new Block('000' , {
            isGenesis: true
        })
        this.chain = [genesisBlock]
        this.difficulty = difficulty
    }

    getLastBlock() {
        return this.chain[this.chain.length -1 ]
    }

    addBlock(data) {

        const lastBlock = this.getLastBlock()
        const newBlock = new Block(lastBlock.hash , data)

        console.log('Star mining')
        console.time('mine')
        newBlock.mine(this.difficulty)
        console.timeEnd('mine')
        console.log('End mining')

        this.chain.push(newBlock)
    }

   
    isValid() {
        for (let i = 1; i < this.chain.length; i++) {
            const currentBlock = this.chain[i]
            const preBlock = this.chain[i - 1]

            if(currentBlock.hash != currentBlock.calculatorHash()){
                return false
            }
            if(currentBlock.preHash != preBlock.hash) {
                return false
            }
        }

        return true

    }

    getLength() {
        return this.chain.length
    }


}

