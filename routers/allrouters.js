const express = require('express');
const ejs = require('ejs');
require('dotenv').config();
const routes = express.Router();
const connection = require('../connection/connection.js')
const path = require('path');
const { stat } = require('fs/promises');
const { dynamicgrid,dynamicgridpost,searchroute,searchroutpost} = require('../controller/task9_controller/dynamic.js');
const {deleamitersearch,deleamitersearchpost} = require('../controller/task10_controller/delemetersearch.js');
const {studentview,pagignationcomponents,orderbycomponents} = require('../controller/task11_controller/pagignation.js');
const {datadisplay,studentresult,view} = require('../controller/task13_controller/studentdata.js');
const { showuser, addusers, editusers, updatepost, deletepost } = require('../controller/task15_controller/crud.js');

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
routes.get('/homegreedsearch',(req,res)=>{
    res.render('task9/home')
})


routes.get('/form',dynamicgrid);
routes.post('/form',dynamicgridpost);
//searching routes
routes .get('/search',searchroute)
routes.post('/search',searchroutpost);

// delemeter search routes

routes.get('/deleamitersearch',deleamitersearch);
routes.post('/deleamitersearch',deleamitersearchpost)

//pagignation
routes.get('/simpleview',studentview);
routes.get('/component',pagignationcomponents);
routes.get('/orderby',orderbycomponents) 

//jsonapi routes
routes.get('/post',(req,res)=>{
    res.render('task12/post');
})
routes.get('/post/comment',(req,res)=>{
    res.render('task12/comment');
})

//attandance 
routes.get('/datadisplay',datadisplay);
routes.get('/studentresult',studentresult);
routes.get('/view',view);

routes.get('/timezone',(req,res)=>{
    res.render('task14/timezone');
})

routes.get('/showuser',showuser);
routes.get('/add', (req, res) => {
    res.render('task15/user_add', {
        title: 'Crud operation'
    });
});
routes.post('/save',addusers);
routes.get('/edit/:userId',editusers);
routes.post('/update',updatepost);
routes.get('/delete/:userId',deletepost);




module.exports = routes;