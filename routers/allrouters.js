const express = require('express');
const ejs = require('ejs');
require('dotenv').config();
const routes = express.Router();
const connection = require('../connection.js')
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


let search = function(res,data,page,max_page,fileds){
    res.render('task9/search',{
        data: data,
        crr_page: +page,
        last_page : max_page,
        fileds:fileds
    })
}

routes.get('/homegreedsearch',(req,res)=>{
    res.render('task9/home')
})

routes.get('/form',(req,res)=>{

    let url = req.url;
    let query = req.query.query;
    let page = req.query.page;

    if (query) {
    url = url.split("?");
    console.log(url);
    let newQuery = query;
    let length12;
    if (query.indexOf("LIMIT")) newQuery = query.substring(0, query.length - 11);
    console.log(newQuery);

    //newQuery += "Limit 10,10" 

    connection.query(newQuery,function(err,newResult,fileds){
        if(err) throw err;
        else{
            length12 = newResult.length;
            // console.log(newResult);
            console.log(length12);

        }

        res.render('task9/dynamic',{
            data : newResult,
            fileds : fileds,
            query : newQuery,
            crr_page : +page,
            crr_page_url : url[0]
        });
    });

    }else{
        res.render('task9/dynamic',{fileds:false,data:false,query:false});
    }

})


routes.post('/form',(req,res)=>{
    const query = req.body.query;
    let page = req.query.page || 1;
    let url = req.url;
    connection.query(query,(err,data,fileds)=>{
        if(err){
            res.json(({error:err.sqlMessage}))
        }
        
        else
            res.render('task9/dynamic',{
            data : data,
            fileds : fileds,
            query : query,
            crr_page : page,
            crr_page_url : url,
            datalength : data.length
           
        });
        // console.log(data.length);
        console.log(url);
        
    })
})

routes.get('/')


//searching routes
routes .get('/search',(req,res)=>{
    records = process.env.Max_Record;
    page = req.query.page || 1;
    max_page = process.env.max_page;
    sql = `select * from Student_master LIMIT ${records * (page - 1)},${records}`;
    let query = connection.query(sql,(err,data,fileds)=>{
        if(err) throw err;
        res.render('task9/search',{
            data: data,
            crr_page: +page,
            last_page : max_page,
            fileds:fileds
        })
        // console.log(data);  
    })    
})



routes.post('/search',(req,res)=>{
    records = process.env.Max_Record;
    page = req.query.page || 1;
    max_page = process.env.max_page;
    id = req.body.stu_id;
    Firstname = req.body.fname;
    Lastname = req.body.lname;
    city = req.body.city;
    state1 = req.body.state;
    dob = req.body.dob;
    

    let sql;
    if(id != undefined && id != "")
    {
        sql = `select * from Student_master where student_id = ${id} LIMIT ${records * (page - 1)},${records}`;
        connection.query(sql,(err,data,fileds)=>{
            if(err) throw err;
            search(res,data,page,max_page,fileds);
            //  console.log(data);  
        })  
    }
    else if(req?.body?.SearchMore == "Search"){
        dob1 = dob.split(',');
    
        sql = `select * from Student_master where (FirstName like "${Firstname}%" and LastName = "${Lastname}" and City = "${city}" and State = "${state1}") 
        or (DOB BETWEEN "${dob1[0]}" and "${dob1[1]}") ORDER BY DOB LIMIT ${records * (page - 1)},${records}`;
        connection.query(sql,(err,data,fileds)=>{
            if(err) throw err;
            search(res,data,page,max_page,fileds);
            //  console.log(data);  
        })  
         
    }
    else{
        res.render('task9/search',{
            data: false,

        })
        //  console.log(data);  
    }
        //  console.log(data);  
      
    
})
module.exports = routes;