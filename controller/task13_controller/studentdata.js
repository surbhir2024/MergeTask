const connection = require('../../connection/connection.js');

function datadisplay(req,res)
{
    let month1 = req.query.month || "12-2023";
    records = process.env.Max_Record;
    Fieldname = req.query.fieldname;
    page = req.query.page || 1;
    max_page = process.env.max_page;
    orderbytype = req.query.orderbytype || "ASC";
    let month = month1.split('-') ;
    

        let sql = `select studentid,FirstName, count(*) as permonth, (count(*)*100)/30 as per  from attendace inner join Student_master where month(TodayDate) = ${month[0]}  and  TodayAtandace like '1' and attendace.studentid = Student_master.student_id group by studentid order by ${Fieldname} ${orderbytype} LIMIT ${records * (page - 1)},${records}`;
        connection.query(sql,(err,data)=>{

        res.render('task13/datadisplay',{
            data : data,
            crr_page : +page,
            last_page : max_page,
            month:month1,
            fieldname : Fieldname,
            orderbytype:orderbytype
        })
    })
}
async function studentresult(req,res){
    let id = req.query.id;
    let obj = {}
    let records = process.env.Max_Record;
    let page = req.query.page || 1;
    let max_page = process.env.max_page;

        await new Promise((resolve,reject)=>{
            let prilimsthmarks = `select examdetails.sid,Student_master.FirstName,sum(obtainmarks) as theoryobtainmarks from examdetails inner join Student_master where e_id = 1 and et_id = 1 and examdetails.sid = Student_master.student_id group by sid LIMIT ${records * (page - 1)},${records}`;
            connection.query(prilimsthmarks,(err,data)=>{
                try {
                   if(err) throw err;
                   obj.prilimsthmarks = data;
                    resolve();
                } catch (err) {
                    console.log(err);
                    reject();
                }
                
            });
        
            });
        
            
            await new Promise((resolve,reject)=>{
                let prilimspramarks = `select examdetails.sid,Student_master.FirstName,sum(obtainmarks) as practicalpriobtainmarks from examdetails inner join Student_master where e_id = 1 and et_id = 2 and examdetails.sid = Student_master.student_id group by sid LIMIT ${records * (page - 1)},${records}`; 
                connection.query(prilimspramarks,(err,data)=>{
                    try {
                        if(err) throw err;
                        obj.prilimspramarks = data;
                        resolve();
                        
                    } catch (err) {
                        console.log(err);
                        reject();
                    }
                });
            });
        
            await new Promise((resolve,reject)=>{
                let Internalthemarks = `select examdetails.sid,sum(obtainmarks) as theoryinterobtainmarks from examdetails inner join Student_master where e_id = 2 and et_id = 1 and examdetails.sid = Student_master.student_id group by sid LIMIT ${records * (page - 1)},${records}`;
                connection.query(Internalthemarks,(err,data)=>{
                    try {
                        if(err) throw err;
                        obj.Internalthemarks = data;
                        resolve();
                        
                    } catch (err) {
                        console.log(err);
                        reject();
                    }
                });
            });
        
            await new Promise((resolve,reject)=>{
                let Internalpramarks = `select examdetails.sid,Student_master.FirstName,sum(obtainmarks) as prainterobtainmarks from examdetails inner join Student_master where e_id = 2 and et_id = 2 and examdetails.sid = Student_master.student_id group by sid LIMIT ${records * (page - 1)},${records}`;
                connection.query(Internalpramarks,(err,data)=>{
                    try {
                        if(err) throw err;
                        obj.Internalpramarks = data;
                        resolve();
                        
                    } catch (err) {
                        reject();
                    }
                })
            })
        
            await new Promise((resolve,reject)=>{
                let finalthemarks = `select examdetails.sid,Student_master.FirstName,sum(obtainmarks) as theoryfinalobtainmarks from examdetails inner join Student_master where e_id = 3 and et_id = 1 and examdetails.sid = Student_master.student_id group by sid LIMIT ${records * (page - 1)},${records}`; 
                connection.query(finalthemarks,(err,data)=>{
                    try {
                        if(err) throw err
                        obj.finalthemarks= data
                        resolve()
                        
                    } catch (err) {
                        reject()
                    }
                })
            })
        
            await new Promise((resolve,reject)=>{
                let finalpramarks = `select examdetails.sid,Student_master.FirstName,sum(obtainmarks) as theoryfinalobtainmarks from examdetails inner join Student_master where e_id = 3 and et_id = 2 and examdetails.sid = Student_master.student_id group by sid LIMIT ${records * (page - 1)},${records}`; 
                connection.query(finalpramarks,(err,data)=>{
                    try {
                        if(err) throw err
                        obj.finalpramarks= data
                        resolve()
                        
                    } catch (err) {
                        reject()
                    }
                })
            })
            
            res.render('task13/studentresult',{
                objdata : JSON.stringify(obj),
                crr_page : +page,
                last_page : max_page
            })
}
async function view(req,res){
    let obj = {}
    let id = req.query.id;
        await new Promise((resolve,reject)=>{
            let prilimsthmarks = `select Student_master.FirstName,subject_master.sub_name,obtainmarks from examdetails left join Student_master on examdetails.sid = Student_master.student_id left join subject_master on  examdetails.subid = subject_master.sub_id where e_id = 1 and et_id =1 and sid = ${id}`;
            connection.query(prilimsthmarks,(err,data)=>{
                try {
                   if(err) throw err;
                   obj.prilimsthmarks = data;
                    resolve();
                } catch (err) {
                    console.log(err);
                    reject();
                }
                
            });
        
        });

        await new Promise((resolve,reject)=>{
            let prilimspramarks = `select Student_master.FirstName,subject_master.sub_name,obtainmarks from examdetails left join Student_master on examdetails.sid = Student_master.student_id left join subject_master on  examdetails.subid = subject_master.sub_id where e_id = 1 and et_id =2 and sid = ${id}`;
            connection.query(prilimspramarks,(err,data)=>{
                try {
                   if(err) throw err;
                   obj.prilimspramarks = data;
                    resolve();
                } catch (err) {
                    console.log(err);
                    reject();
                }
                
            });
        
        });

        await new Promise((resolve,reject)=>{
            let Internalthemarks = `select Student_master.FirstName,subject_master.sub_name,obtainmarks from examdetails left join Student_master on examdetails.sid = Student_master.student_id left join subject_master on  examdetails.subid = subject_master.sub_id where e_id = 2 and et_id =1 and sid = ${id}`;
            connection.query(Internalthemarks,(err,data)=>{
                try {
                   if(err) throw err;
                   obj.Internalthemarks = data;
                    resolve();
                } catch (err) {
                    console.log(err);
                    reject();
                }
                
            });
        
        });

        await new Promise((resolve,reject)=>{
            let Internalpramarks = `select Student_master.FirstName,subject_master.sub_name,obtainmarks from examdetails left join Student_master on examdetails.sid = Student_master.student_id left join subject_master on  examdetails.subid = subject_master.sub_id where e_id = 2 and et_id =2 and sid = ${id}`;
            connection.query(Internalpramarks,(err,data)=>{
                try {
                   if(err) throw err;
                   obj.Internalpramarks = data;
                    resolve();
                } catch (err) {
                    console.log(err);
                    reject();
                }
                
            });
        
        });

        await new Promise((resolve,reject)=>{
            let finalthemarks = `select Student_master.FirstName,subject_master.sub_name,obtainmarks from examdetails left join Student_master on examdetails.sid = Student_master.student_id left join subject_master on  examdetails.subid = subject_master.sub_id where e_id = 3 and et_id =1 and sid = ${id}`;
            connection.query(finalthemarks,(err,data)=>{
                try {
                   if(err) throw err;
                   obj.finalthemarks = data;
                    resolve();
                } catch (err) {
                    console.log(err);
                    reject();
                }
                
            });
        
        });

        await new Promise((resolve,reject)=>{
            let finalpramarks = `select Student_master.FirstName,subject_master.sub_name,obtainmarks from examdetails left join Student_master on examdetails.sid = Student_master.student_id left join subject_master on  examdetails.subid = subject_master.sub_id where e_id = 3 and et_id =2 and sid = ${id}`;
            connection.query(finalpramarks,(err,data)=>{
                try {
                   if(err) throw err;
                   obj.finalpramarks = data;
                    resolve();
                } catch (err) {
                    console.log(err);
                    reject();
                }
                
            });
        
        });


        res.render('task13/onestudentdata',{
            dataobj1 : JSON.stringify(obj)
        })
}

module.exports = {datadisplay,studentresult,view};