const connection = require('../../config/connection.js')
function studentview(req,res){
    let sql = "select * from student_master LIMIT 30000";
    connection.query(sql, (err, rows) => {
        try {
            if(err)throw err;
            res.render('task11/student_view', {
                student_data: rows
            });
        } catch (err) {
            console.log(err)
        }
        
    })
}
function pagignationcomponents(req,res){
    records = process.env.Max_Record;
    page = req.query.page || 1;
    max_page = process.env.max_page;
    let sql = `select * from student_master LIMIT ${records * (page - 1)},${records}`;
    connection.query(sql,(err,data)=>{
        try {
          if(err)throw err;
          res.render('task11/component',{
            student_data: data,
            crr_page: +page,
            last_page : max_page
        })
            
        } catch (err) {
            console.log(err);
        }
        
    })
}
function orderbycomponents(req,res){
    records = process.env.Max_Record;
    page = req.query.page || 1;
    FieldName = req.query.fieldname;
    max_page = process.env.max_page;
    
        let sql = `select * from student_master order by ${FieldName} LIMIT ${records * (page - 1)},${records}`;
        connection.query(sql,(err,data)=>{
            try {
                res.render('task11/orderby',{
                    student_data: data,
                    crr_page: +page,
                    last_page : max_page,
                    fieldname : FieldName 
                })
            } catch (err) {
                console.log(err)
            }
            
        })
}
module.exports = {studentview,pagignationcomponents,orderbycomponents}