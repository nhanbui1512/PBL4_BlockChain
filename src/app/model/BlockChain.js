var Block = require('./Block')


module.exports = class BlockChain {

    constructor(difficulty) {
        const genesisBlock = new Block('000' , {
            isGenesis: true
        })
        this.chain = [genesisBlock]
        this.difficulty = difficulty
        this.nodes = []
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


    addNewNode(node){
        this.nodes.push(node)
    }

    syncNode(node){
        for (let i = 0; i < this.nodes.length; i++) {

            fetch( `${this.nodes[i]}/blockchain/register`, {
                node: node
            })
        }
    }

    checkNode(nodeAddress){
        for (let i = 0; i < this.nodes.length; i++) {
            if(nodeAddress === this.nodes[i]){
                return false
            }
        }

        return true
    }



}


