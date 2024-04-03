const connection = require('../../config/connection.js');
function dynamicgrid(req,res)
{
    let url = req.url;
    let query = req.query.query;
    let page = req.query.page;

    if (query) {
    url = url.split("?");
    console.log(url);
    let newQuery = query;
    let length12;
    if (query.indexOf("LIMIT")) newQuery = query.substring(0, query.length - 11);
    connection.query(newQuery,function(err,newResult,fileds){
        try {
            if(err) throw err;
        else{
            length12 = newResult.length;
            console.log(length12);

        }

        res.render('task9/dynamic',{
            data : newResult,
            fileds : fileds,
            query : newQuery,
            crr_page : +page,
            crr_page_url : url[0]
        });
        } catch (err) {
            console.log(err);
        }
        
    });

    }else{
        res.render('task9/dynamic',{fileds:false,data:false,query:false});
    }

}

function dynamicgridpost(req,res)
{
    const query = req.body.query;
    let page = req.query.page || 1;
    let url = req.url;
    connection.query(query,(err,data,fileds)=>{
        try {
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
        } catch (err) {
            console.log(err)
        }
    }) 
}

let search = function(res,data,page,max_page,fileds){
    res.render('task9/search',{
        data: data,
        crr_page: +page,
        last_page : max_page,
        fileds:fileds
    })
}

function searchroute(req,res)
{
    records = process.env.Max_Record;
    page = req.query.page || 1;
    max_page = process.env.max_page;
    sql = `select * from Student_master LIMIT ${records * (page - 1)},${records}`;
    connection.query(sql,(err,data,fileds)=>{
        try {
            if(err) throw err;
            res.render('task9/search',{
                data: data,
                crr_page: +page,
                last_page : max_page,
                fileds:fileds
            })
        } catch (err) {
            console.log(err)
        }
       
    })    
}

function searchroutpost(req,res)
{
    let records = process.env.Max_Record;
    let page = req.query.page || 1;
    let max_page = process.env.max_page;
    let id = req.body.stu_id;
    let Firstname = req.body.fname;
    let Lastname = req.body.lname;
    let city = req.body.city;
    let state1 = req.body.state;
    let dob = req.body.dob;
    

    let sql;
    if(id != undefined && id != "")
    {
        sql = `select * from Student_master where student_id = ${id} LIMIT ${records * (page - 1)},${records}`;
        connection.query(sql,(err,data,fileds)=>{
            if(err) throw err;
            search(res,data,page,max_page,fileds);
  
        })  
    }
    else if(req?.body?.SearchMore == "Search"){
        let dob1 = dob.split(',');
    
        sql = `select * from Student_master where (FirstName like "${Firstname}%" and LastName = "${Lastname}" and City = "${city}" and State = "${state1}") 
        or (DOB BETWEEN "${dob1[0]}" and "${dob1[1]}") ORDER BY DOB LIMIT ${records * (page - 1)},${records}`;
        connection.query(sql,(err,data,fileds)=>{
            try {
                if(err) throw err;
                search(res,data,page,max_page,fileds);
            } catch (err) {
                console.log(err)
            }
            
          
        })  
         
    }
    else{
        res.render('task9/search',{
            data: false,

        })
          
    }
        
}

module.exports = {dynamicgrid,dynamicgridpost,searchroute,searchroutpost}