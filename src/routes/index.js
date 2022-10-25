const BlockChainRouter = require('./BlockchainRouter')
const APIRouter = require('./APIRouter')

module.exports = function (app) {
    app.use('/blockchain' , BlockChainRouter) 
    // app.use('/', BlockChainRouter)
    app.use('/API',APIRouter)
    
}


