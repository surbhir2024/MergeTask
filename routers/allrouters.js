const express = require('express');
require('dotenv').config();
const routes = express.Router();
const verifyJWT = require('../middleware/authMiddleware.js');
const controler = require('../controller/loginregcontroler/controler.js')
const { dynamicgrid,dynamicgridpost,searchroute,searchroutpost} = require('../controller/task9_controller/dynamic.js');
const {deleamitersearch,deleamitersearchpost} = require('../controller/task10_controller/delemetersearch.js');
const {studentview,pagignationcomponents,orderbycomponents} = require('../controller/task11_controller/pagignation.js');
const {datadisplay,studentresult,view} = require('../controller/task13_controller/studentdata.js');
const { showuser, addusers, editusers, updatepost, deletepost } = require('../controller/task15_controller/crud.js');

routes.get('/registerpage',(req,res)=>{
    res.render('reglogin/reg')
})
routes.get('/login',(req,res)=>{
    res.render('reglogin/login')
})

routes.post('/registerdata',async(req, res) => {
    var userdata = req.body;
    var data = controler.generatesalt(userdata)
    res.json(await data);
})
routes.post('/updatepass',async(req,res)=>{
    passdata = req.body
    passres = controler.generatehashpass(passdata);
    res.json(passres);
})
routes.post('/logindata',async(req,res)=>{
    let logindata = req.body;
    let loginres = await controler.checkpass(logindata);
    // const abc = loginres.token;
    res.cookie('accesstoken',loginres.token, { maxAge: 900000, httpOnly: true })
    .status(200).json(loginres) 
})
routes.get('/',(req,res)=>{
    res.render('frontpage');
})
routes.get('/home',verifyJWT,(req,res)=>{
    res.render('home');
})

routes.get('/coocube',verifyJWT,(req,res)=>{
    res.render('task1/coocube');
})
routes.get('/tictactoe',verifyJWT,(req,res)=>{
    res.render('task2/tic_tac_toe');
})
routes.get('/dynamictable',verifyJWT,(req,res)=>{
    res.render('task3/dynamictable');
})
routes.get('/event',verifyJWT,(req,res)=>{
    res.render('task4/event');
})
routes.get('/sorting',verifyJWT,(req,res)=>{
    res.render('task5/sorting');
})
routes.get('/ehya',verifyJWT,(req,res)=>{
    res.render('task6/ehya');
})
routes.get('/awan',verifyJWT,(req,res)=>{
    res.render('task7/awan');
})
routes.get('/hirex',verifyJWT,(req,res)=>{
    res.render('task8/hirex');
})
routes.get('/homegreedsearch',verifyJWT,(req,res)=>{
    res.render('task9/home');
})


routes.get('/form',verifyJWT,dynamicgrid);
routes.post('/form',verifyJWT,dynamicgridpost);
//searching routes
routes .get('/search',verifyJWT,searchroute)
routes.post('/search',verifyJWT,searchroutpost);

// delemeter search routes

routes.get('/deleamitersearch',verifyJWT,deleamitersearch);
routes.post('/deleamitersearch',verifyJWT,deleamitersearchpost)

//pagignation
routes.get('/simpleview',verifyJWT,studentview);
routes.get('/component',verifyJWT,pagignationcomponents);
routes.get('/orderby',verifyJWT,orderbycomponents) 

//jsonapi routes
routes.get('/post',verifyJWT,(req,res)=>{
    res.render('task12/post');
})
routes.get('/post/comment',verifyJWT,(req,res)=>{
    res.render('task12/comment');
})

//attandance 
routes.get('/datadisplay',verifyJWT,datadisplay);
routes.get('/studentresult',verifyJWT,studentresult);
routes.get('/view',view);

routes.get('/timezone',verifyJWT,(req,res)=>{
    res.render('task14/timezone');
})

routes.get('/showuser',verifyJWT,showuser);
routes.get('/add',verifyJWT,(req, res) => {
    res.render('task15/user_add', {
        title: 'Crud operation'
    });
});
routes.post('/save',verifyJWT,addusers);
routes.get('/edit/:userId',verifyJWT,editusers);
routes.post('/update',verifyJWT,updatepost);
routes.get('/delete/:userId',verifyJWT,deletepost);




module.exports = routes;