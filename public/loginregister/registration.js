// Err handling
function validation(){
    err = true;
    const validateEmailRegex = /^\S+@\S+\.\S+$/;
    var email = document.getElementById('email').value;
    if(!validateEmailRegex.test(email))
    {
        document.getElementById('emailspan').innerHTML = "Please Enter Valid Email Address";
        err = false;
    }
    let reginputclass = document.querySelectorAll('.reqifield');
    let regspanclass = document.querySelectorAll('.errclass');
    if (reginputclass.length > 0) {
        for (var i = 0; i < reginputclass.length; i++) {
            if (reginputclass[i].value.length == 0) {
                regspanclass[i].innerHTML = "* required";
                err = false;
            }
        }
    }
    if(err)
    {
        insertdata()
    }
    
}
function insertdata(){
var registerdata = {};
let statuscode = 0;
registerdata.fname = document.getElementById('fname').value;
registerdata.lname = document.getElementById('lname').value;
registerdata.city = document.getElementById('city').value;
registerdata.email = document.getElementById('email').value;
registerdata.status = statuscode; 
console.log(registerdata);

    fetch(`http://localhost:8000/registerdata`, {
        method: "post", // *GET, POST, PUT, DELETE, etc.
        mode: "cors",
        headers: {
            "Content-Type": "application/json",
            'Access-Control-Allow-Origin': '*'
        },
        body: JSON.stringify(registerdata)
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(dataobj => {
            console.log('Data received:', dataobj.lastinid);
            console.log('Data received:', dataobj.activecode);
            linkactivate(dataobj.lastinid,dataobj.activecode);
            
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
        });
}

function linkactivate(id,activecode)
{
    
    var linkdiv =  document.getElementById('linkdiv');
    linkdiv.innerHTML += `<p>You are Succeessfuly registered</p>
                            <p onclick = "setpassword(${id})" style = "color : blue;">${activecode}</p>`;
}

function setpassword(id)
{
    document.getElementById('regformcontainer').style.display = "none";
   var passshow = document.getElementById('passshow');
   console.log(passshow);
    passshow.innerHTML += `<div class="container">
    <h3> Create Password </h3>
    <div class="rowcontent">
        <label for="password">Password</label><span class="reqerr" id="reqerr"></span>
        <input type="text" id="pass" name="password" class="reqfield"></input>
    </div>
    <div class="rowcontent">
        <label for="conpassword">Confirm password</label><span class="reqerr"></span>
        <input type="text" id="repass" name="resetpassword" class="reqfield"></input>
    </div>
    <div>
        <input type="button" name="submit" class="registerbtn" value="submit" onclick = "passvalidation(${id})"/>
    </div>
</div>`;
}

function passvalidation(id)
{
    let reexpass = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;

    let err = true;
    let reginputclass = document.querySelectorAll('.reqfield');
    let regspanclass = document.querySelectorAll('.reqerr');
    if (reginputclass.length > 0) {
        for (var i = 0; i < reginputclass.length; i++) {
            if (reginputclass[i].value.length == 0) {
                regspanclass[i].innerHTML = "* required";
                err = false;
            }
        }
    }
    let passvalue = document.getElementById('pass').value;
    let repassvalue = document.getElementById('repass').value;
    if(!reexpass.test(passvalue))
    {
        alert("Password is not strong enough");
        err = false;
    }
    if(passvalue != repassvalue)
    {
        alert("passwod not matched");
        err = false;
    }
    if(err)
    {
        insertpassword(id);
    }
}
function insertpassword(id)
{
    let passobj = {}
    passobj.id = id;
    passobj.status = 1;
    passobj.password = document.getElementById('pass').value;
    fetch(`http://localhost:8000/updatepass`, {
        method: "post", // *GET, POST, PUT, DELETE, etc.
        mode: "cors",
        headers: {
            "Content-Type": "application/json",
            'Access-Control-Allow-Origin': '*'
        },
        body: JSON.stringify(passobj)
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(dataobj => {
            finalpasssubmit();
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
        });
}

function finalpasssubmit()
{
    // console.log("hii");
    // document.getElementById('passshow').style.display = "none";
   document.getElementById('myModal').style.display = "block";
}

 
