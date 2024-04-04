const connection = require('../../config/connection.js');

function showuser(req,res)
{
    let sql = "select * from users";
    connection.query(sql, (err, rows) => {
        try {
            if (err) throw err;
            res.render('task15/user_index', {
                title: "Crud opration using nodejs/mysql/express",
                users: rows
            });
        } catch (err) {
            console.log(err)
        }
    });
}

function addusers(req,res)
{
    let sql = `insert into users(user_name,email,phoneno,hobbies) values("${req.body.name}","${req.body.email}","${req.body.phone_no}","${req.body.hobbies}")`;
    connection.query(sql,(err, results) => {
        try {
            if (err) throw err;
            res.redirect('/showuser');
        } catch (err) {
            console.log(err);
        }
        
    });
}

function editusers(req,res){
    const userid = req.params.userId;
    let sql = `Select * from users where id = ${userid}`;
    connection.query(sql, (err, result) => {
        try {
            if (err) throw err;
            res.render('task15/user_edit', {
                title: 'Update User',
                user: result[0]
            });  
        } catch (err) {
            console.log(err)
        }
    });
}

function updatepost(req,res){
    const userid = req.body.id;
    let sql = "update users SET user_name='"+req.body.name+"', email='"+req.body.email+"',phoneno = '"+req.body.phone_no+"',hobbies ='"+ req.body.hobbies+"' where id ="+userid;
    connection.query(sql,(err,results)=>{
        try {
            if(err) throw err;
            res.redirect('/showuser');
        } catch (err) {
            console.log(err);
        }
        
    });
}

function deletepost(req,res){
    const userid = req.params.userId;
    let sql = `delete from users where id = ${userid}`;
    connection.query(sql,(err,result)=>{
        try {
            if(err) throw err;
            res.redirect('/showuser');
        } catch (err) {
            console.log(err);
        }
        
    });
}
module.exports = {showuser,addusers,editusers,updatepost,deletepost};