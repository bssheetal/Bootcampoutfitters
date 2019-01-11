$(document).ready(function() {
  function slideshowbackgroundimages() {
    var images = [
      "images/hero-01.jpg",
      "images/hero-02.jpg",
      "images/hero-03.jpg",
      "images/hero-04.jpg",
      "images/hero-05.jpg",
      "images/hero-06.jpg"
    ];
    var showImage;
    var count = 0;
    function displayImage() {
      var div = $(".mySlides").html(
        "<img src=" + images[count] + " width='100%'> "
      );
    }

    function nextImage() {
      // Increment the count by 1.
      count++;
    firstrunner();

    function slideshowbackgroundimages() {

        var images = ["images/hero-01.jpg", "images/hero-02.jpg", "images/hero-03.jpg", "images/hero-04.jpg", "images/hero-05.jpg", "images/hero-06.jpg"];
        var showImage;
        var count = 0;
        function displayImage() {
            var div =
                $(".mySlides").html("<img src=" + images[count] + " width='100%'> ");
        }

        function nextImage() {
            // Increment the count by 1.
            count++;

      displayImage();

      // If the count is the same as the length of the image array, reset the count to 0.
      if (count === images.length) {
        count = 0;
      }
    }

<<<<<<< HEAD
    function slideshow() {
      showImage = setInterval(nextImage, 13000);
      // displayImage();
=======
    
    // slideshowbackgroundimages();

    $("#searchButton").on("click", function (e) {
        e.preventDefault();
        $("#hikingDiv").empty();
        gethikinginfo();
        getweatherinfo();
    });


    function gethikinginfo() {
        var region = $("#inlineFormInput").val().trim();
        console.log("hikingregion is" + city);
        if (region === " " || region.length == 0 || region == null) {
            var searchinfo =
            {
                region: city
            }
        }
        else {
            var searchinfo = {
                region: region
            }
        }


        $.get("/hiking", searchinfo, function (response) {
            console.log(response);

            for (var i = 0; i < response.length; i++) {
                trailInfo = response[i];
                var difficulty;
                var newDiv = $("<div>");

                newDiv.addClass("col-sm-4");
                if (trailInfo.difficulty === "blue") {
                    difficulty = "Medium";
                }
                else if (trailInfo.difficulty === "blueBlack") {
                    difficulty = "Hard";
                }
                else if (trailInfo.difficulty === "greenBlue") {
                    difficulty = "Easy";
                }

                else if (trailInfo.difficulty === "green") {
                    difficulty = "Easy";
                }

                else if (trailInfo.difficulty === "black") {
                    difficulty = "Hard";
                }

                else if (trailInfo.difficulty === "dblack") {
                    difficulty = "ExtremelyHard";
                }

                var newDiv = $("<div>").addClass("card card-trail mt-4");
                var newDiv = $("<div>").addClass("card card-trail mt-3 mb-3");

                newDiv.attr("data-actNum", trailInfo.id)
                    .attr("data-actName", trailInfo.name)
                    .attr("data-actDiff", difficulty)
                    .attr("data-actLength", trailInfo.length)
                    .attr("data-actRating", trailInfo.stars)
                    .attr("data-lat", trailInfo.latitude)
                    .attr("data-lng", trailInfo.longitude)
                    .attr("data-summary", trailInfo.summary)
                    .attr("data-ascent", trailInfo.ascent)
                    .attr("data-descent", trailInfo.descent);

                var newIMG = $("<img>");
                newIMG.addClass("trailImg card-image-top");
                var trailIMG = trailInfo.imgSmall;
                if (trailIMG == '') {
                    trailIMG = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQYZnN0W990Rs6d4UGDcD_wO2mLZ-j8Q-AD_WibHGs5ztvRrz9L";
                };
                newIMG.attr("src", trailIMG);

                var newCardbody = $("<div>").addClass("card-body");
                var newP = $("<p>");
                var newH = $("<h5>");
                var newB = $("<button>");
                newH.append(trailInfo.name);
                newB.append('<i class="fas fa-list"></i> Add to List').addClass("addButton btn-primary");
                newB.attr("type", "submit")
                    .attr("data-actName", trailInfo.name)
                    .attr("data-actLoc", trailInfo.location)
                    .attr("data-length", trailInfo.length)
                    .attr("data-difficulty", difficulty)
                    .attr("data-summary", trailInfo.summary)
                    .attr("data-ascent", trailInfo.ascent)
                    .attr("data-descent", trailInfo.descent);

                    console.log(trailInfo);

                newP.append(trailInfo.location);
                newCardbody.append(newH);
                newCardbody.append(newP);
                newCardbody.append(newB);

                newDiv.append(newIMG, newCardbody);
                $("#hikingDiv").append(newDiv);
            }

        })
>>>>>>> d48cb018a9e59495935c860c3e658e6cdcfcb607
    }

    slideshow();
  }

  // slideshowbackgroundimages();

  var region = "";

  $("#searchButton").on("click", function(e) {
    e.preventDefault();
    $("#hikingDiv").empty();
    region = $("#inlineFormInput")
      .val()
      .trim();
    var searchinfo = {
      region: region
    };

    console.log("entered data in search Textbox is" + region);
    $.get("/hiking", searchinfo, function(response) {
      console.log(response);

      for (var i = 0; i < response.length; i++) {
        trailInfo = response[i];
        var difficulty;
        var newDiv = $("<div>");

        newDiv.addClass("col-sm-4");
        if (trailInfo.difficulty === "blue") {
          difficulty = "Medium";
        } else if (trailInfo.difficulty === "blueblack") {
          difficulty = "Hard";
        } else if (trailInfo.difficulty === "greenBlue") {
          difficulty = "Easy";
        }
        var newDiv = $("<div>").addClass("card card-trail mt-4");

        newDiv
          .attr("data-actNum", trailInfo.id)
          .attr("data-actName", trailInfo.name)
          .attr("data-actDiff", difficulty)
          .attr("data-actLength", trailInfo.length)
          .attr("data-actRating", trailInfo.stars)
          .attr("data-lat", trailInfo.latitude)
          .attr("data-lng", trailInfo.longitude)
          .attr("data-summary", trailInfo.summary)
          .attr("data-ascent", trailInfo.ascent)
          .attr("data-descent", trailInfo.descent);

<<<<<<< HEAD
=======
                dayDiv.append(dateDiv);
                dayDiv.append(dayofwkDiv);
                dayDiv.append(skytxtDiv);
                dayDiv.append(skycodeDiv);
                dayDiv.append(highDiv);
                dayDiv.append(lowDiv);

                forecastDiv.append(dayDiv);
            }
            $("#weatherDiv").append(forecastDiv);
        });
    }
    $(document).on("click", ".addButton", function (e) {
        e.preventDefault();
        let trailName = ($(this).data("actname"));
        let trailLocation = ($(this).data("actloc"));
        let trailLength = $(this).data("length");
        let trailDiff = $(this).data("difficulty");
        let trailSummary = $(this).data("summary");
        let trailAscent = $(this).data("ascent");
        let trailDescent = $(this).data("descent");
        let upload = {
            text: trailName,
            description: trailLocation,
            lengthOfTrail: trailLength,
            difficulty: trailDiff,
            summary: trailSummary,
            ascent: trailAscent,
            descent: trailDescent
        };
        console.log(trailLocation);
        console.log(trailName);

        // Post request to add the activity associated with each add button
        $.ajax({
            headers: {
                "Content-Type": "application/json"
            },
            type: "POST",
            url: "/api/examples",
            data: JSON.stringify(upload)
        })
            .then(function (data) {
                // append the new bucket list item to the bucket list
                $("#example-list").append(`<li>${data.text}</li>`);
                // Refresh only the div and not the entire page so as to retain data from get
                $("#bucketDiv").load(document.URL + " #bucketDiv");
            })
            .catch(function (err) {
                console.log(err);
                alert(err.responseText);
            });
    });

    $(document).on("click", ".trailImg", function () {
        console.log("im clicked");
        $(".insidemodal").empty();
        var modaldiv = $("<div>");
        modaldiv.addClass("insidemodal");
        var newP = $("<p>");
        var name = $(this).closest('div').attr('data-actName');
        console.log("this is pointing to" + name);
        newP.append(`<b>${name}</b>`);
>>>>>>> d48cb018a9e59495935c860c3e658e6cdcfcb607
        var newIMG = $("<img>");
        newIMG.addClass("trailImg card-image-top");
        var trailIMG = trailInfo.imgSmall;
        if (trailIMG == "") {
          trailIMG = "https://image.ibb.co/cxZnrn/defaulthiker240.png";
        }
        newIMG.attr("src", trailIMG);

        var newCardbody = $("<div>").addClass("card-body");
        var newP = $("<p>");
        var newH = $("<h5>");
        var newB = $("<button>");
        newH.append(trailInfo.name);
        newB
          .append('<i class="fas fa-list"></i> Add to List')
          .addClass("addButton btn-primary");
        newB
          .attr("type", "submit")
          .attr("data-actName", trailInfo.name)
          .attr("data-actLoc", trailInfo.location);
        newP.append(trailInfo.location);
        newCardbody.append(newH);
        newCardbody.append(newP);
        newCardbody.append(newB);

        newDiv.append(newIMG, newCardbody);
        $("#hikingDiv").append(newDiv);
      }
    });

    $.get("/weather", searchinfo, function(response) {
      // Clears div, so doesn't show same info again
      $("#weatherDiv").empty();

      console.log(response);
      var city = response[0].current.observationpoint;

      $("#weatherDiv").append("<h5>5 Day Forecast: <br>" + city + "</h5>");

      var forecastDiv = $('<div class = "forecast">');
      for (var i = 0; i < response[0].forecast.length; i++) {
        var currentDay = response[0].forecast[i];
        var conditionsImgs =
          `http://blob.weather.microsoft.com/static/weather4/en-us/law/` +
          currentDay.skycodeday +
          ".gif";

        console.log(currentDay);
        var dayDiv = $('<div class = "daydiv">');
        var dateDiv = $(
          "<p class = 'forecastFont'>" + currentDay.date + "</p>"
        );
        var dayofwkDiv = $(
          "<p class = 'forecastFont'><h5>" + currentDay.day + "</h5></p>"
        );
        var skytxtDiv = $(
          "<p class = 'forecastFont'>" + currentDay.skytextday + "</p>"
        );
        var skycodeDiv = $(
          "<img src = " + conditionsImgs + " class = 'forecastFont'>"
        );
        var highDiv = $(
          "<p class = 'forecastFont'> High: " +
            currentDay.high +
            "\u00B0F" +
            "</p>"
        );
        var lowDiv = $(
          "<p class = 'forecastFont'> Low: " +
            currentDay.low +
            "\u00B0F" +
            "</p>"
        );

        dayDiv.append(dayofwkDiv);
        dayDiv.append(dateDiv);
        dayDiv.append(skytxtDiv);
        dayDiv.append(skycodeDiv);
        dayDiv.append(highDiv);
        dayDiv.append(lowDiv);

        forecastDiv.append(dayDiv);
      }
      $("#weatherDiv").append(forecastDiv);
    });
  });

  // On click listener for the add button attached to each item built in the get request above

  $(document).on("click", ".addButton", function(e) {
    e.preventDefault();
    let trailName = $(this).data("actname");
    let trailLocation = $(this).data("actloc");
    let upload = {
      text: trailName,
      description: trailLocation
    };
    console.log(trailLocation);
    console.log(trailName);
    // Post request to add the activity associated with each add button
    $.ajax({
      headers: {
        "Content-Type": "application/json"
      },
      type: "POST",
      url: "/api/examples",
      data: JSON.stringify(upload)
    })
      .then(function(data) {
        // append the new bucket list item to the bucket list
        $("#example-list").append(`<li>${data.text}</li>`);
        // Refresh only the div and not the entire page so as to retain data from get
        $("#bucketDiv").load(document.URL + " #bucketDiv");
      })
      .catch(function(err) {
        console.log(err);
        alert(err.responseText);
      });
  });

  $(document).on("click", ".trailImg", function() {
    console.log("im clicked");
    $(".insidemodal").empty();
    var modaldiv = $("<div>");
    modaldiv.addClass("insidemodal");
    var newP = $("<p>");
    var name = $(this)
      .closest("div")
      .attr("data-actName");
    console.log("this is pointing to" + name);
    newP.append(`<b>${name}</b>`);
    var newIMG = $("<img>");
    var trailIMG = $(this).attr("src");
    newIMG.attr("src", trailIMG);
    var lengthp = $("<p>");
    var Length = $(this)
      .closest("div")
      .attr("data-actLength");
    lengthp.append(`<p><b>Length of trail:</b> ${Length} miles.</p>`);
    var diffp = $("<p>");
    var difflevel = $(this)
      .closest("div")
      .attr("data-actDiff");
    diffp.append(`<p><b>Difficulty:</b> ${difflevel}</p>`);
    var summary = $(this)
      .closest("div")
      .attr("data-summary");
    console.log(name);
    var newsummary = $("<p>");
    newsummary.append(`<p><b>Description:</b> "${summary}</p>`);
    var ascentp = $("<p>");
    var Ascent = $(this)
      .closest("div")
      .attr("data-ascent");
    var Descent = $(this)
      .closest("div")
      .attr("data-descent");
    ascentp.append(
      `<p><b>Ascent:</b>${Ascent}      <b>Descent:</b>${Descent}</p>`
    );
    modaldiv.append(newP);
    modaldiv.append(newIMG);
    modaldiv.append(lengthp);
    modaldiv.append(diffp);
    modaldiv.append(newsummary);
    modaldiv.append(ascentp);

    $(".modal-body").append(modaldiv);
    $("#myModal").modal("show");
  });
});
