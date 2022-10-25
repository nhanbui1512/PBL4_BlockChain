const BlockChainRouter = require('./BlockchainRouter')
const APIRouter = require('./APIRouter')

module.exports = function (app) {
    app.use('/blockchain' , BlockChainRouter) 
    app.use('/API',APIRouter)
    app.use('/', BlockChainRouter)
    
}


