const express = require('express')
const path = require('path')
const hbs  = require('express-handlebars');
const router = require('./routes/index')
const route = require('./routes')

const port = 3001;
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



const request = require('request')

  request
  .get(`http://192.168.0.103:${port}/`)
  .on('response', function(response) {
    // console.log(response.statusCode) // 200
    // console.log(response.headers['content-type']) // 'image/png'
  })
  .pipe(request.get(`http://192.168.0.103:${port}/consensus`))


