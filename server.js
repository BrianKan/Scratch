var express = require('express');
var app = express();
var mongojs=require("mongojs");
var db=mongojs('contactlist',['contactlist']);
var bodyParser=require("body-parser");

app.use(bodyParser.json());

app.use(express.static(__dirname + "/public"));

app.get('/contactlist', function (req, res) {
  db.contactlist.find(function(err, doc){
  		res.json(doc);
  });
});

app.get('/skills', function (req, res) {
  db.contactlist.find({type: 'skill'},function(err, doc){
      res.json(doc);
  });
});

app.get('/edu', function (req, res) {
  db.contactlist.find({type: 'edu'},function(err, doc){
      res.json(doc);
  });
});

app.get('/project', function (req, res) {
  db.contactlist.find({type: 'project'},function(err, doc){
      res.json(doc);
  });
});

app.get('/admin', function(req,res){
	res.sendFile(path.join(__dirname+'/public/admin.html'));
});
// Pulls data from the database
// Callback function -> docs 
// Get rid of console.log in production
// Sending data in response to the client

app.post("/contactlist", function(req,res){
	db.contactlist.insert(req.body, function(err,doc){
		res.json(doc);
	});
});

// posts into the database, send json back to make sure it's saved

app.delete('/contactlist/:id', function(req,res){
	var id=req.params.id;
	db.contactlist.remove({_id: mongojs.ObjectId(id)}, function(err,doc){
		res.json(doc);
	});
});

// colon allows to grab id
app.get('/contactlist/:id', function (req, res) {
  var id = req.params.id;
  db.contactlist.findOne({_id: mongojs.ObjectId(id)}, function (err, doc) {
    res.json(doc);
  });
});

app.put('/contactlist/:id', function (req, res) {
  var id = req.params.id;
  db.contactlist.findAndModify({
    query: {_id: mongojs.ObjectId(id)},
    update: {$set: {name: req.body.name, email: req.body.email, number: req.body.number}},
    new: true}, function (err, doc) {
      res.json(doc);
    }
  );
});

//new, then add a new contact rather than update

  app.listen(8080);
console.log("Server running on port 8080");