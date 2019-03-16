var express = require('express');
var app = express();
var fs=require("fs");
app.get('/list',function(req,res){
  //res.send('listeleyen cagri');
  fs.readFile("user.json","utf-8",function(err,data){
    console.log(data);
    res.end(data);
  });
});
app.get('/ekle',function(req,res){
  //res.end('listeleye ekleyen cagri');
  var newuser= {
    "user3":{
      "isim":req.query.isim,
      "sifre": req.query.sifre,
      "mail": req.query.mail,
    }
  };
  fs.readFile("user.json","utf-8",function(err,data){
    data=JSON.parse(data);
    data["user3"] = newuser["user3"];
    console.log(data);
    res.end(JSON.stringify(data));
    fs.writeFile('user.json',JSON.stringify(data),function(err){
      console.log("Error");
    });
  });
});
app.get('/sorgula',function(req,res){
  fs.readFile("user.json","utf-8",function(err,data){
    data=JSON.parse(data);
    var id="k"+req.query.id;
    console.log(data[id]);
    res.end(JSON.stringify(data[id]));
  });
});
app.get('/sil',function(req,res){
  fs.readFile("user.json","utf-8",function(err,data){
    data=JSON.parse(data);
    var id="user"+req.query.id;
    delete data[id];
    console.log(data);
    res.end(JSON.stringify(data));
    fs.writeFile('user.json',JSON.stringify(data),function(err){
      console.log("Error");
    });
  });
});

var server = app.listen(8000,function(){
  console.log('Working ...');
});
