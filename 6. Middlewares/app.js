const fs = require('fs');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');

let users = [];

app.use(bodyParser.urlencoded({extended:true}));

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

app.post('/signup',(req,res)=>{
    const userId = req.body.userId;
    const password = req.body.password;
    
    if(users.findIndex((item)=>{return item.userId === userId}) !== -1) {
        res.send('User already exists');
    } else {
        users.push({'userId':userId, 'password':password});
        res.redirect('/login');
    }
});

app.post('/login',(req,res)=>{
    const userId = req.body.userId;
    const password = req.body.password;
    
    let idx = users.findIndex((item)=>{return item.userId === userId});
    if(idx !== -1) {
        if(users[idx].password === password) {
            res.send("Welcome "+userId+"!");
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