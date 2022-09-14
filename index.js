const express = require('express')
var BlockChain = require('./BlockChain')
const app = express();
const port = 3000



const testChain = new BlockChain(5);


app.use('/chain' , (req , res ) => {

    testChain.addBlock({
        form: 'Nhan Bui',
        to: 'Someone',
        amount: 200 
    })

    res.send(testChain.chain)
    
    
} )

app.use('/lastBlock' , (req , res ) => {
    res.send(testChain.getLastBlock())
} )

app.use('/' , (req , res ) => {
    res.send('Hello world')
} )


app.listen(port, () => {
    console.log(`Listening at localhost:${port}`)
})

