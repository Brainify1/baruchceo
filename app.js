var express = require("express");
var app = express();
var bodyParser = require('body-parser');
var PORT = process.env.PORT || 3000;
var Airtable = require('airtable');
var base = new Airtable({apiKey: 'key4FeankqvbU5BHG'}).base('appzGAEJinOXICiPx');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

var MongoClient = require('mongodb').MongoClient;
var url = "mongodb+srv://user:lll2j6raqI6sUpDX@baruchceo-wd33t.mongodb.net/BaruchCEO?retryWrites=true";


app.use(express.static("public"));
app.set("view engine", "ejs");

app.get("/", function(req,res){
    res.render("home");
});

app.get("/team", function(req,res){
	res.render("team.ejs");
})

app.get("/signup", function(req,res){
	res.render("signup");
})

app.get("/confirmation", function(req,res){
	res.render("confirmation");
})

app.post("/signup", function(req, res){
	var email = req.body.email;
	var major = req.body.major;
	var phoneNumber = req.body.phoneNumber;
	var reason = req.body.reason;
	var fullName = req.body.fullName;

MongoClient.connect(url, function(err, db) {
	  if (err) throw err;
	  var dbo = db.db("WEBSITE_DB");
	  var myobj = req.body;
	  dbo.collection("USERS").insertOne(myobj, function(err, res) {
	    if (err) throw err;
	    console.log("1 document inserted");
	    db.close();
	  });
	});

base('Applicants').create({
  "major": major,
  "email": email,
  "phoneNumber": phoneNumber,
  "reason": reason,
  "fullName": fullName
}, function(err, record) {
    if (err) { console.error(err); return; }
    console.log(record.getId());
});

res.redirect("/confirmation");
});

app.get("/directory", function(req, res) {
    res.render("directory");
});

app.get("*", function(req, res) {
    res.send("Sorry, page not found...");
});



app.listen(PORT, function(){
    console.log("App running on PORT: " + 3000)
});