const hash = require('crypto-js/sha256')


class Block {
    constructor (preHash , data){
        this.preHash = preHash
        this.data = data
        this.timeStamp = new Date()
        this.hash = this.calculatorHash()
        this.mineVar = 0;
    }

    calculatorHash () {
        return hash(this.preHash + JSON.stringify(this.data) + this.timeStamp + this.mineVar ).toString();
    }

    mine(difficulty) {
        while( !this.hash.startsWith('0'.repeat(difficulty)) ){
            this.mineVar ++  
            this.hash = this.calculatorHash();
        }
    }
}

class BlockChain {

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
        newBlock.mine(this.difficulty)

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

}


var testChain = new BlockChain(4)

testChain.addBlock({
    from: "Hue",
    to: "DaNang",
    amount: 2000,
})

testChain.addBlock({
    from: "Hue",
    to: "DaNang",
    amount: 2000,
})

testChain.addBlock({
    from: "Hue",
    to: "DaNang",
    amount: 2000,
})

console.log(testChain.chain)
console.log(testChain.isValid())