const fs = require('fs');
const express = require('express');
const app = express();

let counter = 0;

app.get('/',(req,res)=>{
    fs.readFile('./counterMain.html',(err,data)=>{
        if(err)
            throw err;
        res.writeHead(200,{'Content-Type':'text/html'});
        res.end(data);
    });
});

app.post('/increase',(req,res)=>{
    console.log('POST /increase');
    counter++;
    res.redirect('/');
});

app.post('/decrease',(req,res)=>{
    console.log('POST /decrease');
    counter--;
    res.redirect('/');
});

app.get('/show',(req,res)=>{
    console.log('GET /show');
    res.send('counter : ' + String(counter));
});

app.listen(3000,()=>{
    console.log('Server is running on port 3000!');
});