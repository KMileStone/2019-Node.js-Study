const fs = require('fs');
const express = require('express');
const app = express();
const session = require('express-session');
const bodyParser = require('body-parser');

let users = [];

app.use(bodyParser.urlencoded({extended:true}));
app.use(session({
    secret:'keyboard cat', 
    resave:false, 
    saveUninitialized:true
}));

app.get('/',(req,res)=>{
    fs.readFile('./signup.html',(err,data)=>{
        if(err)
            throw err;
        res.writeHead(200,{'Content-Type':'text/html'});
        res.end(data);
    });
});

app.get('/login',(req,res)=>{
    fs.readFile('./login.html',(err,data)=>{
        if(err)
            throw err;
        res.writeHead(200,{'Content-Type':'text/html'});
        res.end(data);
    });
});

app.get('/profile',(req,res)=>{
    let idx = users.findIndex((item)=>{return item.userId === req.session.userId});
    if(idx !== -1) {
        res.send('ID : ' + users[idx].userId + '<br>' + 
                'PASSWORD : ********<br>' + 
                '<br>' + 
                '이름 : ' + users[idx].name + '<br>' + 
                '학과 : ' + users[idx].major + '<br>' + 
                '휴대전화 : ' + users[idx].phone + '<br>' + 
                '이메일 : ' + users[idx].email);
    } else {
        res.send('Invalid session');
    }
});

app.post('/signup',(req,res)=>{
    const userId = req.body.userId;
    const password = req.body.password;
    const name = req.body.name;
    const major = req.body.major;
    const phone = req.body.phone;
    const email = req.body.email;
    
    if(users.findIndex((item)=>{return item.userId === userId}) !== -1) {
        res.send('User already exists');
    } else {
        users.push({'userId':userId, 
                    'password':password, 
                    'name':name, 
                    'major':major, 
                    'phone':phone, 
                    'email':email});
        res.redirect('/login');
    }
});

app.post('/login',(req,res)=>{
    const userId = req.body.userId;
    const password = req.body.password;
    
    let idx = users.findIndex((item)=>{return item.userId === userId});
    if(idx !== -1) {
        if(users[idx].password === password) {
            req.session.userId = userId;
            res.redirect('/profile');
        } else {
            res.send('Password wrong');
        }
    } else {
        res.send('ID wrong');
    }
});

app.listen(3000,()=>{
    console.log('Server is running on port 3000!');
});