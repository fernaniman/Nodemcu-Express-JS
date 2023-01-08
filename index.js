const express       = require('express');
const path          = require('path');
const app           = express();

const port = process.env.PORT || 3000;

// mendefinisikan router
const appRouting    = require('./routers/app-route');

// setting folder views with ejs
app.set('views',path.join(__dirname,'views'));
app.set('view engine', 'ejs');

// memanggil folder assets
app.use('/assets',express.static(path.join(__dirname, 'assets')));


app.use('/', appRouting);

app.listen(port, ()=>{
    console.log('Application running in port : ' + port);
});

module.exports=app;