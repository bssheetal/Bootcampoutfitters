require("dotenv").config();
var db = require("../models");
var passport = require("../config/passport");
var isAuthenticated = require("../config/middleware/isAuthenticated");
var axios = require("axios");
var keys = require("../keys.js");
var rei_hiking = keys.hike.id;
var geocode_key = keys.geocode.id;
var geocode = require("@google/maps");
var weather = require("weather-js");
var moment = require('moment');
var region;
module.exports = function (app) {
  // Get all examples
  app.get("/api/items", isAuthenticated, function (req, res) {
    db.Example.findAll({
      where: {
        UserId: req.user.id
      }
    }).then(function (dbExamples) {
      res.json(dbExamples);
    });
  });

  // Create a new example
  app.post("/api/items", isAuthenticated, function (req, res) {
    db.Example.create({
      UserId: req.user.id,
      text: req.body.text,
      description: req.body.description,
      lengthOfTrail: req.body.lengthOfTrail,
      difficulty: req.body.difficulty,
      summary: req.body.summary,
      ascent: req.body.ascent,
      descent: req.body.descent
    }).then(function (dbExample) {
      res.json(dbExample);
    });
  });

  // Delete an example by id
  app.delete("/api/items/:id", isAuthenticated, function (req, res) {
    db.Example.destroy({ where: { id: req.params.id } }).then(function (
      dbExample
    ) {
      res.json(dbExample);
    });
  });

  // Using the passport.authenticate middleware with our local strategy.
  // If the user has valid login credentials, send them to the members page.
  // Otherwise the user will be sent an error
  app.post("/api/login", passport.authenticate("local"), function (req, res) {
    // Since we're doing a POST with javascript, we can't actually redirect that post into a GET request
    // So we're sending the user back the route to the members page because the redirect will happen on the front end
    // They won't get this or even be able to access this page if they aren't authed
    res.json("/profile");
  });

  // Route for signing up a user. The user's password is automatically hashed and stored securely thanks to
  // how we configured our Sequelize User Model. If the user is created successfully, proceed to log the user in,
  // otherwise send back an error
  app.post("/api/signup", function (req, res) {
    console.log(req.body);

    db.User.create({
      email: req.body.email,
      password: req.body.password,
      city: req.body.city,
      state: req.body.state,
      zipcode: req.body.zipcode
    })
      .then(function () {
        res.redirect(307, "/api/login");
      })
      .catch(function (err) {
        res.status(422).json(err.errors[0].message);
      });
  });

  app.get("/login/:id", function (req, res) {

    db.User.findAll({
      where: {
        id: req.params.id
      }
    }).then(function (response) {
      res.send(response);


    });
  });


  app.get("/hiking", function (req, res) {
    var lat;
    var long;
    var googleMapsClient = geocode.createClient({
      key: geocode_key
    });
    var maxdistance= req.query.miles;
    console.log("Miles"+maxdistance);
    googleMapsClient.geocode(
      {
        components: {
          locality: req.query.region,
          country: "USA"
        }
      },
      function (err, response) {
        if (!err) {
          lat = response.json.results[0].geometry.location.lat;
          long = response.json.results[0].geometry.location.lng;

          var hikingqueryurl =
            "https://www.hikingproject.com/data/get-trails?lat=" +
            lat +
            "&lon=" +
            long +
            "&maxDistance="+maxdistance+"&key=" +
            rei_hiking;
          console.log(hikingqueryurl);
          axios.get(hikingqueryurl).then(function (response) {
            var JSONDATA = response.data.trails;
            res.send(JSONDATA);
          });
        }
      }
    );
  });

  app.get("/weather", function (req, res) {
    weather.find({ search: req.query.region, degreeType: "F" }, function (
      err,
      result
    ) {
      if (err) {
        console.log(err);
      }
      // var weatherforecast = JSON.stringify(result, null, 2);
      res.send(result);
    });
  });


  // Route for logging user out
  app.get("/logout", function (req, res) {
    req.logout();
    res.redirect("/");
  });


// PUT route for check button
  app.put("/api/items/:id", isAuthenticated, function (req, res) {
    db.Example.update({
      complete: req.body.complete
    },{ 
      where: { 
        id: req.params.id 
      } 
    }).then(function (dbExample) {
      res.json(dbExample);
    });
  });
};



