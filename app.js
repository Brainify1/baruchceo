var express = require("express");
var app = express();


app.use(express.static("public"));
app.set("view engine", "ejs");

app.get("/", function(req,res){
    res.render("home");
});

app.get("*", function(req, res) {
    res.send("Sorry, page not found...");
});

var PORT = process.env.PORT || 3000;

app.listen(PORT, function(){
    console.log("App running on PORT: " + 3000)
});