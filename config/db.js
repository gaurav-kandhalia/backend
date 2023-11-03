const mongoose  = require('mongoose');

const database = mongoose.connect('mongodb://127.0.0.1:27017/beginner').then(()=>{
    console.log("database connected");
}).catch((error)=>{
console.log("database not connected",error);
})



module.exports = database;