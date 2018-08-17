var express = require("express");
var app = express();

var home = require("./routes/home")

app.use(express.static("public"));
app.set("view engine", "ejs");

app.use('/', home);
app.get("*", function(req, res) {
    res.send("Sorry, page not found...");
});


app.listen(3000, function(){
    console.log("App running on PORT: " + 3000)
});