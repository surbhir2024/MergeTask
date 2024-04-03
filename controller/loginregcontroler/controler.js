let model = require(`../../model/model.js`);
const md5 = require('md5');


let salt = '';
exports.generatesalt = async function(data) {
    length = 4;
    for(let i=0;i<length;i++)
    {
        salt += String.fromCharCode(Math.floor(Math.random()*(122- 48 + 1))+48);
    }
    let activatestring = md5(salt);
    data.activatestring = activatestring;
    data.salt = salt;
    return await model.insertdata(data);
}
exports.generatehashpass = async function(passdata){
    let password = passdata.password;
    let concatedpass = password + salt;
    let hashpassword = md5(concatedpass);
    passdata.password = hashpassword;
    return await model.insertpass(passdata);
}
exports.checkpass = async function(logindata)
{
    return await model.checklogindata(logindata);
}

