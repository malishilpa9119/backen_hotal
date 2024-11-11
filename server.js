// function add(a,b){
//     return a+ b;
// }

// var add = function(a,b){
//     return a+ b;
// }

// var add = (a, b) => {return a + b}

// var add = (a, b) => a+b;

// var result = add(2,8);
// console.log(result);

// (function(){
//     console.log("shilpa mali")
// })();

// function callback(){
//     console.log("shilpa is calling a callback function");
// }
// const add = function(a, b, shilpa){
//     var result = a + b;
//     console.log("result: "+result);
//     shilpa();
// }
// add(3,4, () => {
//     console.log('add completed')
// });

// var fs = require('fs');
// var os = require('os');

// var user = os.userInfo();
// console.log(user.username);

// fs.appendFile('greeting.text', 'Hi ' + user.username + '!\n', ()=>{
//     console.log('file is createsd')
// });

// const notes = require('./nodes.js');
// console.log("it is server")
// var age = notes.age;
// var result = notes.addNumber(age+2, 2)
// console.log(age)
// console.log(result)
// var _ = require('lodash');
// var data = ["sh", "sh",1, 1, 9,9,8,8];
// var filter =  _.uniq(data);
// console.log(filter)

// const jsonObject = {name: "shilpa", age:24};
// const json = JSON.stringify(jsonObject);
// console.log(typeof json);
require('dotenv').config()
const express = require("express");
const app = express();
const db = require("./db");

const bodyParser = require("body-parser");
app.use(bodyParser.json()); //req.body

//Middleware function
const logRequest = (req, res, next) => {
  console.log(`[${new Date().toLocaleString()}] Request Made to : ${req.originalUrl}`);
  next();
}

app.get("/", logRequest, function (req, res) {
  res.send("wcl to my hotal");
});



//Import the router files
const personRoutes = require('./routes/personRoutes');
const menuItemRoutes = require('./routes/menuItemRoutes')

//use the routers
app.use('/person', personRoutes);
app.use('/menu', menuItemRoutes);

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
  console.log("listening on port 3000");
});
