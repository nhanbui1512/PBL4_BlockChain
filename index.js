const express = require('express')
const path = require('path')
const hbs  = require('express-handlebars');

var BlockChain = require('./BlockChain')

const port = 3000;
const app = express();


app.use(express.urlencoded({
    extended: true
  }));
app.use(express.json());


const nodes = ['3001']




app.use(express.static(path.join(__dirname, 'src/public')));
app.set('views',path.join(__dirname,'src/resource/views'))
app.engine('hbs', hbs.engine({
    extname: '.hbs'
  }));

app.set('view engine', 'hbs');


const testChain = new BlockChain(4);

app.use('/chain' , (req , res ) => {
    res.send(testChain.chain)
} )

app.use('/consensus' , (req , res) => {

    for (let i = 0; i < nodes.length; i++) {
        fetch(`http://localhost:${nodes[i]}/chain`)
        .then((res) => res.json())
        .then(data => {
            res.send(data)
        })
    }

    
})


app.use('/chainlength' , (req, res) => {
    res.send(JSON.stringify(testChain.getLength()))
})

app.use('/lastBlock' , (req , res ) => {
    res.send(testChain.getLastBlock())
} )

app.use('/createblock' , (req, res) => {
    res.render('createblock', {
        layout: false
    })
})

app.post('/mine', (req, res) => {

    var data = {
        form: req.body.Author,
        to: req.body.Reciver,
        amount: req.body.Amount,
    }

    testChain.addBlock(data)
    res.redirect('/chain')

} )

app.use('/' , (req , res ) => {
    res.send('Hello world')
} )


app.listen(port , () => {
    console.log(`Listening at localhost:${port}`)
})


