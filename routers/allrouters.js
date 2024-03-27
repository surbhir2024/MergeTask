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
routes.get('/coocube',(req,res)=>{
    res.render('task1/coocube');
})
routes.get('/tictactoe',(req,res)=>{
    res.render('task2/tic_tac_toe');
})
routes.get('/dynamictable',(req,res)=>{
    res.render('task3/dynamictable');
})
routes.get('/event',(req,res)=>{
    res.render('task4/event');
})
routes.get('/sorting',(req,res)=>{
    res.render('task5/sorting');
})
routes.get('/ehya',(req,res)=>{
    res.render('task6/ehya');
})
routes.get('/awan',(req,res)=>{
    res.render('task7/awan');
})
routes.get('/hirex',(req,res)=>{
    res.render('task8/hirex');
})
module.exports = routes;