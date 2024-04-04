const connection = require('../config/connection.js');
// let control = require('../controler/controler.js');
const md5 = require('md5');
const jwt = require('jsonwebtoken')

exports.insertdata = async function (data) {
    let dataobj = {};
    let emailerr = { "Error": "email already exists" }
    let sql2 = `select email from registration where email="${data.email}" and statuscode = 1`;
    await new Promise((resolve, reject) => {
        connection.query(sql2, (err, result) => {
            try {
                if (err) throw err;
                if (result.length === 0) {
                    insertdataquery(data).then((obj) => {
                        resolve(obj);
                    })
                }


            } catch (err) {
                console.log(err)
                reject(emailerr)
            }

        })
    }).then((data) => {
        dataobj = data;
    })
    return await dataobj;
}


async function insertdataquery(data) {
    let dataobj = {}
    let sql = `insert into registration(firstname,lastname,city,email,salt,activecode,statuscode)values("${data.fname}","${data.lname}","${data.city}","${data.email}","${data.salt}","${data.activatestring}",${data.status})`;
    return new Promise((resolve, reject) => {
        connection.query(sql, (err, result) => {
            try {
                if (err) throw err;
                dataobj.lastinid = result.insertId;
                dataobj.activecode = data.activatestring;
                resolve(dataobj);

            } catch (err) {
                console.log(err)
                reject()
            }
        })
    })
}

exports.insertpass = async function (passdata) {
    let passupdatedata = {}
    let sql = `update registration set  passwordd = "${passdata.password}", statuscode = "${passdata.status}" where id = ${passdata.id}`
    connection.query(sql, (err, passresult) => {
        try {
            if (err) throw err;
            passupdatedata.success = 1;
        } catch (err) {
            console.log(err);
        }
    })
    return await passupdatedata;
}


exports.checklogindata = async function (logindata) {
    let sql = `select * from registration where email = "${logindata.uname}"`
    let checkdata = {};
    let err = true
    await new Promise((resolve, reject) => {
        connection.query(sql, (err, tabledata) => {
            try {
                if (err) throw err;
                if (tabledata.length != 0) {
                    logindata.pass = logindata.pass + tabledata[0].salt;
                    logindata.password = md5(logindata.pass);
                    if (tabledata[0].passwordd === logindata.password && tabledata[0].statuscode == 1) {
                        logindata.error = "Success";
                        const secretkey = process.env.WT_SECRET_KEY
                        const token = jwt.sign({ userId: tabledata[0].id }, secretkey, {
                            expiresIn: '1h',
                        });
                        logindata.token = token;
                        
                            
                    }
                    else {
                        logindata.error = "Error";
                    }
                }
                else {
                    logindata.error = "user wrong";
                }

                resolve(logindata);

            } catch (err) {
                console.log(err);
                reject(err);
            }
        })
    }).then((data) => {
        checkdata = data;
    })
    return await checkdata;
}




