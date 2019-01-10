var db = require("../models");
var isAuthenticated = require("../config/middleware/isAuthenticated");
module.exports = function(app) {
  // Load signup page
  app.get("/", function(req, res) {
<<<<<<< HEAD
    return res.render("signup", {signup: true, loginSignup: "sign-up"});
=======
    return res.render("signupOrLogin", {isSignup: true, strSignupOrLogin: "sign-up"});
>>>>>>> 1d95ab69af8c5c307cec817e356fd5eb7edfe962
  });

  // Load login page
  app.get("/login", function(req, res) {
<<<<<<< HEAD
    res.render("login", {signup: false});
=======
    res.render("signupOrLogin", {isSignup: false, strSignupOrLogin: "login"});
>>>>>>> 1d95ab69af8c5c307cec817e356fd5eb7edfe962
  });

  // Load profile page
  app.get("/profile", isAuthenticated, function(req, res) {
    db.User.findOne({
      where: {
        id: req.user.id
      },
      include: [db.Example]
    }).then(function(dbUser) {
      console.log("HAHAHA");
      res.render("profile", { user: dbUser });
    });
  });

  // Load example page and pass in an example by id
  app.get("/example/:id", isAuthenticated, function(req, res) {
    db.Example.findOne({ where: { id: req.params.id } }).then(function(
      dbExample
    ) {
      res.render("example", {
        example: dbExample
      });
    });
  });

  app.get("/home", function(req, res) {
    res.render("home");
  });
  
  // Render 404 page for any unmatched routes
  app.get("*", function(req, res) {
    res.render("404");
  });
};
