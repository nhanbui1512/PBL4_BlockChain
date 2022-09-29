const BlockChainRouter = require('./BlockchainRouter')

module.exports = function (app) {
    app.use('/blockchain' , BlockChainRouter) 
    app.use('/', BlockChainRouter)
    
}


