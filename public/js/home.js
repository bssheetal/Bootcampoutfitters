$(document).ready(function () {
    var city;
    function firstrunner() {
        var userId = $(".search").attr("data-id");
        console.log("user id is " + userId);
        $.get(`/login/${userId}`, function (data) {
            console.log("city is" + JSON.stringify(data[0].city));
            city = data[0].city;
            gethikinginfo();
            getweatherinfo();
        });
    }

    firstrunner();

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

            displayImage();

            // If the count is the same as the length of the image array, reset the count to 0.
            if (count === images.length) {
                count = 0;
            }
        }

        function slideshow() {
            showImage = setInterval(nextImage, 13000);
            // displayImage();
        }

        slideshow();
    }

    // slideshowbackgroundimages();

    $("#searchButton").on("click", function (e) {
        e.preventDefault();
        $("#hikingDiv").empty();
        gethikinginfo();
        getweatherinfo();
    });


    function gethikinginfo() {
        var region = $("#inlineFormInput").val().trim();
        var miles = $("#inputGroupSelect01 option:selected").val();
        console.log("hikingregion is" + city);
        if (region === " " || region.length == 0 || region == null) {
            var searchinfo = {
                region: city,
                miles: 15
            };
        } else {
            var searchinfo = {
                region: region,
                miles: miles
            };
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
                } else if (trailInfo.difficulty === "blueBlack") {
                    difficulty = "Hard";
                } else if (trailInfo.difficulty === "greenBlue") {
                    difficulty = "Easy";
                } else if (trailInfo.difficulty === "green") {
                    difficulty = "Easy";
                } else if (trailInfo.difficulty === "black") {
                    difficulty = "Hard";
                } else if (trailInfo.difficulty === "dblack") {
                    difficulty = "ExtremelyHard";
                }

                var newDiv = $("<div>").addClass("card card-trail mt-4");
                var newDiv = $("<div>").addClass("card card-trail mt-3 mb-3");

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
                    .attr("data-descent", trailInfo.descent)
                    .attr("data-rating", trailInfo.stars);

                var newIMG = $("<img>");
                newIMG.addClass("trailImg card-image-top");
                var trailIMG = trailInfo.imgSmall;
                if (trailIMG == "") {
                    trailIMG =
                        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQYZnN0W990Rs6d4UGDcD_wO2mLZ-j8Q-AD_WibHGs5ztvRrz9L";
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
                    .attr("data-actLoc", trailInfo.location)
                    .attr("data-length", trailInfo.length)
                    .attr("data-difficulty", difficulty)
                    .attr("data-summary", trailInfo.summary)
                    .attr("data-ascent", trailInfo.ascent)
                    .attr("data-descent", trailInfo.descent)
                    .attr("data-rating", trailInfo.stars)
                    .attr("data-imagelink", trailIMG);


                console.log(trailInfo);

                newP.append(trailInfo.location);
                newCardbody.append(newH);
                newCardbody.append(newP);
                newCardbody.append(newB);

                newDiv.append(newIMG, newCardbody);
                $("#hikingDiv").append(newDiv);
            }
        });
    }
    
    // npm weather-js synced with location search 
    function getweatherinfo() {
        // retuning the input value of the first matched element and trimming whitespace
        var region = $("#inlineFormInput")
            .val()
            .trim();
        // if input value matches city or region, hold in variable searchinfo
        if (region === " " || region.length == 0 || region == null) {
            var searchinfo = {
                region: city
            };
        } else {
            var searchinfo = {
                region: region
            };
        }
        // getting npm weather-js data and passed through paramerter of searchinfo
        $.get("/weather", searchinfo, function (response) {
            // clears div upon seach request (divs not piling up)
            $("#weatherDiv").empty();
            
            // let's see the entire response
            // console.log("weather api response is " + JSON.stringify(response));

            // let's choose only the first city repsonse [0] of the array object
            var city = response[0].current.observationpoint;
            // inserted an h1 header
            $("#weatherDiv").append("<p class ='weatherHeader card'>5 Day Forecast for:<br>" + city + "</p>");
            // created forecast variable to hold weather data
            var forecastDiv = $('<div class = "forecast">');
            
            // loop thorugh weather-js forecast array
            for (var i = 0; i < response[0].forecast.length; i++) {
                // created a variable/shortcut to hold that specifc array we're requesting
                var currentDay = response[0].forecast[i];
                // created a variable to display images for response[0].forecast[i].skycodeday
                var conditionsImgs = 
                `http://blob.weather.microsoft.com/static/weather4/en-us/law/` + currentDay.skycodeday + ".gif";
                
                // let's see the response array in the console for response[0].forecast[i]
                // console.log(currentDay);

                // npm moment-js to convert time; e.g, 2019-01-11 to January 11, 2019
                var newDate = currentDay.date;
                var convertedDate = moment(newDate).format("MMMM D, YYYY")

                // variable to display each day into dayDiv with a Bootstrap 'card' class
                var dayDiv = $('<div class = "card" id = "weatherCard">');
                // variable to display dayDiv with a Bootstrap 'card-body' class
                var dayBSBody = $('<div class = "card-body dayBSBody">');
                // variable to display the current day of the week; e.g, Sunday, Monday, etc.
                var dayofwkDiv = $("<p class = 'dayOfWk'>" + currentDay.day + "</p>");
                // variable to display the new moment.js date
                var dateDiv = $("<p>" + convertedDate + "</p>");
                // variable to display weather conditions; e.g, Mostly Sunny, Mostly Cloudy, Clear, etc.
                var skytxtDiv = $("<p>" + currentDay.skytextday + "</p>");
                // variable to display skycodeday number that corresponds to an image .gif url from weather-js (microsoft's weather website)
                var skycodeDiv = $("<img src = " + conditionsImgs + " class = 'forecastFont'>");
                // variable to display the highest temperature for the day in Fahrenheit with a degree unicode symbol
                var highDiv = $("<p> High: " + currentDay.high + "\u00B0F" + "</p>");
                // variable to display the lowest temperature for the day in Fahrenheit with a degree unicode symbol
                var lowDiv = $("<p> Low: " + currentDay.low + "\u00B0F" + "</p>");

                // append dayBSBody into dayDiv
                dayDiv.append(dayBSBody);
                // append data into dayBSBody
                dayBSBody.append(dayofwkDiv);
                dayBSBody.append(dateDiv);
                dayBSBody.append(skytxtDiv);
                dayBSBody.append(skycodeDiv);
                dayBSBody.append(highDiv);
                dayBSBody.append(lowDiv);
                // append all dayDiv data to forecastDiv
                forecastDiv.append(dayDiv);
            }   
            // create a jquery id selector = weatherDiv to hold dayDiv data
            $("#weatherDiv").append(forecastDiv);
        });
    }

    // On click listener for the add to list button
    $(document).on("click", ".addButton", function (e) {
        e.preventDefault();
        // Attaching data attributes to the button on UI
        let trailName = $(this).data("actname");
        let trailLocation = $(this).data("actloc");
        let trailLength = $(this).data("length");
        let trailDiff = $(this).data("difficulty");
        let trailSummary = $(this).data("summary");
        let trailAscent = $(this).data("ascent");
        let trailDescent = $(this).data("descent");
        let trailRating = $(this).data("rating");
        let trailIMG = $(this).data("imagelink");
        // Setting object with above to send to DB
        let upload = {
            text: trailName,
            description: trailLocation,
            lengthOfTrail: trailLength,
            difficulty: trailDiff,
            summary: trailSummary,
            ascent: trailAscent,
            descent: trailDescent,
            rating: trailRating,
            imagelink: trailIMG
        };

        // POST request to send upload object from above to DB
        $.ajax({
            headers: {
                "Content-Type": "application/json"
            },
            type: "POST",
            url: "/api/items",
            data: JSON.stringify(upload)
        })
            .then(function (data) {
                // Taking the response from DB and rendering the add-to-list value to UI 
                $("#example-list").append(`<li>${data.text}</li>`);
                // Refreshing only the div and not the entire page so as to retain data from GET
                $("#bucketDiv").load(document.URL + " #bucketDiv");
            })
            .catch(function (err) {
                console.log(err);
                alert(err.responseText);
            });
    });


    // On click listener for the check button (activity completed)
    $(document).on("click", ".complete", function (e) {
        e.preventDefault();
// Retrieving the data-complete attribute value from the DOM, which is set as default false in DB
        let idtoComplete = ($(this).parent().attr("data-complete"));
        // Retrieve id of activity 
        let id = $(this).parent().attr("data-id");
// True/false toggle 
        if (idtoComplete == "false") {
            idtoComplete = true;
        } else {
            idtoComplete = false;
        }

        // PUT request to upload new complete value to DB
        let idUpload = {
            complete: idtoComplete
        }
        $.ajax({
            headers: {
                "Content-Type": "application/json"
            },
            type: "PUT",
            url: "/api/items/" + id,
            data: JSON.stringify(idUpload)
        })
            .then(function (data) {
                // Reloading bucket div to show new state
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
        var trailid=$(this).closest("div").attr("data-actNum");   
        console.log("trailid in modal is"+trailid);
        var trailiframe=$(`<iframe style="width:100%; max-width:1200px; height:410px;" frameborder="0" scrolling="no" src="https://www.hikingproject.com/widget?v=3&map=1&type=trail&id=${trailid}"></iframe>`);   
        var name = $(this)
            .closest("div")
            .attr("data-actName");
        console.log("this is pointing to" + name);
        $(".myModalLabel").text(name);
        var newIMG = $("<img>");
        newIMG.addClass("modalimg");
        var trailIMG = $(this).attr("src");
        newIMG.attr("src", trailIMG);
        var lengthp = $("<p>");
        var Length = $(this)
            .closest("div")
            .attr("data-actLength");
        lengthp.append(`<p>Distance: ${Length} miles.</p>`);
        var diffp = $("<p>");
        var difflevel = $(this)
            .closest("div")
            .attr("data-actDiff");
        // if(difflevel==="Easy")
        // {
        //     diffp.attr('style','font-color=green');
        //     diffp.append(`<p>Difficulty: ${difflevel}`);
        // }    
        diffp.append(`<p>Difficulty: ${difflevel}`);
        var summary = $(this)
            .closest("div")
            .attr("data-summary");
        console.log(name);
        var newsummary = $("<p>");
        newsummary.append(`<p> ${summary}</p>`);
        var ascentp = $("<p>");
        var Ascent = $(this)
            .closest("div")
            .attr("data-ascent");
        var Descent = $(this)
            .closest("div")
            .attr("data-descent");
        ascentp.append(
            `<p>Ascent:${Ascent},      Descent:${Descent}</p>`
        );
        var ratingp = $("<p>");
        var Ratings = $(this)
            .closest("div")
            .attr("data-rating");
        ratingp.append(`<p>Ratings: ${Ratings}/5 stars</p>`)
        // modaldiv.append(newP);
        modaldiv.append(newIMG);
        modaldiv.append(newsummary);
        modaldiv.append(lengthp);
        modaldiv.append(diffp);       
        modaldiv.append(ascentp);
        modaldiv.append(ratingp);
        modaldiv.append(trailiframe);

        $(".modal-body").append(modaldiv);
        $("#myModal").modal("show");
    });
});

