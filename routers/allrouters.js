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

// delemeter search routes

routes.get('/deleamitersearch', (req, res) => {

    records = process.env.Max_Record;
    page = req.query.page || 1;
    max_page = process.env.max_page;
    sql = `select * from Student_master`;
    let query = connection.query(sql, (err, data, fileds) => {
        if (err) throw err;
        res.render('task10/searchrout', {
            data: data,
            crr_page: +page,
            last_page: max_page,
            fileds: fileds,
            dataparam : false
        })
        // console.log(data);  
    })

})

routes.post('/deleamitersearch',(req,res)=>{
    dataparam = req.body.data;

    // let str = 'afgbfgcfgdfgefg'
    // let array = str.replace('a','d').replace('b','d').replace('c','d').replace('e','d').split('d');
    // console.log(array);
    data1 = dataparam.split(/[%^${+-]+/);
    dataobj = {Firstname : [],
        Lastname : [],
        city : [],
        state : [],
        Zipcode : [],
        email : []
    }
    msg = [];
    var delimeters2 = [];
    var arr3 = [];


    var delemeters = ["%","^","$","{","+","-"];
    for(var j=0;j<dataparam.length;j++)
    {
        if(delemeters.includes(dataparam[j]))
        {
            delimeters2.push(dataparam[j]);
        }
    }
    console.log(delimeters2);


    for(var i=1;i<data1.length;i++)
    {
       arr3.push(delimeters2[i-1].concat(data1[i]));
    }
    console.log(arr3);
    
    for(var j=0;j<arr3.length;j++)
    {
       if(arr3[j][0] == "%")
       {
            dataobj.Firstname.push(arr3[j])
       } 
       else if(arr3[j][0] == "^")
       {
            dataobj.Lastname.push(arr3[j]) 
       }
       else if(arr3[j][0] == "$")
       {
            dataobj.city.push(arr3[j])
       }
       else if(arr3[j][0] == "{")
       {
            dataobj.state.push(arr3[j])
       }
       else if(arr3[j][0] == "+")
       {
            dataobj.Zipcode.push(arr3[j])
       }
       else if(arr3[j][0] == "-")
       {
            dataobj.email.push(arr3[j])
       }
       else
       {
            msg += "data wrong"
       }

    }
    console.log(dataobj);

    // console.log(daFirstname);
    // console.log(Lastname);
    // console.log(city);
    // console.log(state);
    // console.log(Zipcode);
    // console.log(email);
    

    sql = `select * from Student_master where FirstName like '%${dataobj.Firstname.join("%' or FirstName like '%").substring(1)}%'
    and LastName like '%${dataobj.Lastname.join("%' or Lastname like '%").substring(1)}%' and 
    City like '%${dataobj.city.join("%'or Lastname like '%").substring(1)}%' and State like '%${dataobj.state.join("%' or Lastname like '%").substring(1)}%' and 
    Zipcode like '%${dataobj.Zipcode.join("%' or Lastname like '%").substring(1)}%' and Email like '%${dataobj.email.join("%' or Lastname like '%").substring(1)}%'`;
    console.log(sql);
    let query = connection.query(sql, (err, data, fileds) => {
        if (err) throw err;
        console.log(data);
        res.render('task10/searchrout', {
            data: data,
            fileds: fileds,
            dataparam:dataparam
        })
        // console.log(data);  
    })
})
module.exports = routes;