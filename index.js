const express = require('express');
const app = express();
const port = 5911;

const database = require('./config/db');
const router = require('./router/user')
app.use(express.urlencoded({extended:true}));
app.use(express.json())

app.get('/',(req,res)=>{
    res.json({
        "message":"hello world",
        "status":200
    });
})

app.use('/user',router); 

app.listen(port,(req,res)=>{
    console.log("server is listening at port",port)
})