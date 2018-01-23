var express = require("express");
var bodyParser = require("body-parser");

var expressJWT = require("express-jwt");
var jwt = require("jsonwebtoken");

var PORT = process.env.PORT || 8080;
var app = express();

var config = require("./config.js");

var db = require("./models");

// Serve static content for the app from the "public" directory in the application directory.
app.use(express.static("public"));
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
// parse application/json
app.use(bodyParser.json());

// Setting up our middleware to have protected API routes
app.use(expressJWT({ secret: config.tokenSecret }).unless({ 
    // select paths to not be authorized
    path: ["/api/user/login", "/api/user/new", "/login", "/users"] 
}));

var userControllerRoutes = require("./controllers/user-controller");
var viewRoutes = require("./views/html-routes");

app.use("/", viewRoutes);
app.use("/api/", userControllerRoutes);


db.sequelize.sync({ force: false }).then(function () {
    app.listen(PORT, function () {
        console.log("Listening on port:", PORT);
    });
});
