const path = require('path');
const express = require('express');
const bodyparser = require('body-parser');
const portfinder = require('portfinder');
const cors = require('cors');
const app = express();
const cookieParser = require('cookie-parser');
require('dotenv').config();
app.use(cors());
app.use(cookieParser());

const dynamic = require('./routers/allrouters.js');


app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname,'public')));


portfinder.getPort(function(err,port){
    try {
        if(err)throw err
        app.listen(port,(error)=>{
            console.log("server Listen at port"+port);
        });
    } catch (err) {
        console.log("Error on server port Listen : "+err)
    }
})

//routes



app.use(dynamic);