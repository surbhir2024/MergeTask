const express = require('express');
const ejs = require('ejs');
require('dotenv').config();
const routes = express.Router();
// const connection = require('../connection.js')
const path = require('path');
const { stat } = require('fs/promises');

routes.get('/',(req,res)=>{
    res.render('home');
})
module.exports = routes;