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


app.listen(8000, function(){
    console.log("App running on PORT: " + 8000)
});