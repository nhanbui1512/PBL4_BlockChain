const hash = require('crypto-js/sha256')


module.exports = class Block {
    constructor (preHash , data){
        this.preHash = preHash
        this.data = data
        this.timeStamp = new Date().toString()
        this.hash = this.calculatorHash()
        this.mineVar = 0;
    }

    calculatorHash () {
        return hash(this.preHash + JSON.stringify(this.data) + this.timeStamp + this.mineVar ).toString();
    }

    handleCalHash(preHash, data , timeStamp , mineVar){
        return hash(preHash + JSON.stringify(data) + timeStamp + mineVar ).toString();
    }

    mine(difficulty) {
        while( !this.hash.startsWith('0'.repeat(difficulty)) ){
            this.mineVar ++  
            this.hash = this.calculatorHash();
        }
    }
}



