const express = require('express')
const path = require('path')
const hbs  = require('express-handlebars');
const router = require('./routes/index')
var BlockChain = require('./app/modal/BlockChain');
const route = require('./routes')

const port = 3004;
const app = express();


app.use(express.urlencoded({
    extended: true
  }));
app.use(express.json());

app.use(express.static(path.join(__dirname, 'src/public')));
app.set('views',path.join(__dirname,'resource/views'))
app.engine('hbs', hbs.engine({
    extname: '.hbs'
  }));

app.set('view engine', 'hbs');

route(app); 


app.listen(port , () => {
    console.log(`Listening at localhost:${port}`)
})


fetch(`http://localhost:3004/`)
  .then((res) => {
    fetch('http://localhost:3004/consensus')
  })

