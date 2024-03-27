const mysql = require('mysql');



const connection = mysql.createConnection({
     host :process.env.host,
    password : process.env.password,
    user : process.env.user,
    database : process.env.database
});

connection.connect(function (error) {
    if (error) console.log(error);
    else console.log("Database Connected!");
});

module.exports = connection;