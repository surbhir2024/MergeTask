const connection = require('../../config/connection.js')

function deleamitersearch(req, res){
    records = process.env.Max_Record;
    page = req.query.page || 1;
    max_page = process.env.max_page;
    sql = `select * from Student_master`;
    let query = connection.query(sql, (err, data, fileds) => {
        try {
            if (err) throw err;
            res.render('task10/searchrout', {
                data: data,
                crr_page: +page,
                last_page: max_page,
                fileds: fileds,
                dataparam: false
            })
        } catch (err) {
            console.log(err)
        }
    })
}

function deleamitersearchpost(req, res) {
    let dataparam = req.body.data;
    let data1 = dataparam.split(/[%^${+-]+/);
    let dataobj = {
        Firstname: [],
        Lastname: [],
        city: [],
        state: [],
        Zipcode: [],
        email: []
    }
    let msg = [];
    let delimeters2 = [];
    let arr3 = [];

    let delemeters = ["%", "^", "$", "{", "+", "-"];
    for (var j = 0; j < dataparam.length; j++) {
        if (delemeters.includes(dataparam[j])) {
            delimeters2.push(dataparam[j]);
        }
    }

    for (var i = 1; i < data1.length; i++) {
        arr3.push(delimeters2[i - 1].concat(data1[i]));
    }

    for (var j = 0; j < arr3.length; j++) {
        if (arr3[j][0] == "%") {
            dataobj.Firstname.push(arr3[j])
        }
        else if (arr3[j][0] == "^") {
            dataobj.Lastname.push(arr3[j])
        }
        else if (arr3[j][0] == "$") {
            dataobj.city.push(arr3[j])
        }
        else if (arr3[j][0] == "{") {
            dataobj.state.push(arr3[j])
        }
        else if (arr3[j][0] == "+") {
            dataobj.Zipcode.push(arr3[j])
        }
        else if (arr3[j][0] == "-") {
            dataobj.email.push(arr3[j])
        }
        else {
            msg += "data wrong"
        }
    }

    sql = `select * from Student_master where FirstName like '%${dataobj.Firstname.join("%' or FirstName like '%").substring(1)}%'
    and LastName like '%${dataobj.Lastname.join("%' or Lastname like '%").substring(1)}%' and 
    City like '%${dataobj.city.join("%'or Lastname like '%").substring(1)}%' and State like '%${dataobj.state.join("%' or Lastname like '%").substring(1)}%' and 
    Zipcode like '%${dataobj.Zipcode.join("%' or Lastname like '%").substring(1)}%' and Email like '%${dataobj.email.join("%' or Lastname like '%").substring(1)}%'`;
    connection.query(sql, (err, data, fileds) => {
        try {
            if (err) throw err;
            res.render('task10/searchrout', {
                data: data,
                fileds: fileds,
                dataparam: dataparam
            })
        } catch (err) {
            console.log(err)
        }
    })
}
module.exports = { deleamitersearch, deleamitersearchpost};