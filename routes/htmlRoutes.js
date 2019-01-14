var db = require("../models");
var isAuthenticated = require("../config/middleware/isAuthenticated");
module.exports = function (app) {
  // Load login page as default
  app.get("/", function (req, res) {
    return res.render("signupOrLogin", { isSignup: false, strSignupOrLogin: "login" });

  });

  // Load signup page
  app.get("/signup", function (req, res) {
    res.render("signupOrLogin", { isSignup: true, strSignupOrLogin: "sign-up" });
  });

  // Load login page
  // app.get("/login", function (req, res) {
  //   res.render("signupOrLogin", { isSignup: false, strSignupOrLogin: "login" });
  // });

  // Load profile page
  app.get("/profile", isAuthenticated, function (req, res) {
    db.User.findOne({
      where: {
        id: req.user.id
      },
      include: [db.Example]
    }).then(function (dbUser) {
      //res.send(dbUser.city);
      res.render("profile", { user: dbUser });
    });
  });

  // Load example page and pass in an example by id
  app.get("/item/:id", isAuthenticated, function (req, res) {
    db.Example.findOne({ where: { id: req.params.id } }).then(function (
      dbExample
    ) {
      res.render("item", {
        example: dbExample
      });
    });
  });

  // app.get("/home", function(req, res) {
  //   res.render("home");
  // });

  // Render 404 page for any unmatched routes
  app.get("*", function (req, res) {
    res.render("404");
  });
};

