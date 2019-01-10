$(document).ready(function () {

    var region = "";
    var searchLat = "";
    var searchLon = "";

    $("#searchButton").on("click", function (e) {
        e.preventDefault();
        region = $("#inlineFormInput").val().trim()
        var searchinfo = {
            region: region
        }

        console.log("entered data in search Textbox is" + region);
        $.get("/hiking", searchinfo, function (response) {
            console.log(response);
            for (var i = 0; i < response.length; i++) {

                trailInfo = response[i];
                var newDiv = $("<div>");
                newDiv.addClass("col-sm-4");
                newDiv.attr("data-actNum", trailInfo.id)
                    .attr("data-actName", trailInfo.name)
                    .attr("data-actDiff", trailInfo.difficulty)
                    .attr("data-actLength", trailInfo.length)
                    .attr("data-actRating", trailInfo.stars)
                    .attr("data-lat", trailInfo.latitude)
                    .attr("data-lng", trailInfo.longitude);
                var newIMG = $("<img>");
                var trailIMG = trailInfo.imgSmall;
                if (trailIMG == '') {
                    trailIMG = "https://image.ibb.co/cxZnrn/defaulthiker240.png";
                };
                newIMG.attr("src", trailIMG);
                var newP = $("<p>");
                var newH = $("<h5>");
                var newB = $("<button>");
                newH.append(trailInfo.name);
                newB.append("add").addClass("addButton");
                newB.attr("type", "submit")
                    .attr("data-actName", trailInfo.name)
                    .attr("data-actLoc", trailInfo.location);
                newP.append(trailInfo.location);
                newDiv.append(newH);
                newDiv.append(newB);
                newDiv.append(newP);
                newDiv.append(newIMG);
                $("#hikingDiv").append(newDiv);
            }

        })
    });


    $(document).on("click", ".addButton", function (e) {
        e.preventDefault();
        let trailName = ($(this).data("actname"));
        let trailLocation = ($(this).data("actloc"));
        let upload = {
            text: trailName,
            description: trailLocation
        };
        console.log(trailLocation);
        console.log(trailName);

        $.ajax({
            headers: {
                "Content-Type": "application/json"
            },
            type: "POST",
            url: "/api/examples",
            data: JSON.stringify(upload)
        })
        .then(function (data) {
            // append the new bucket list item 
            // to the bucket list
            $("#example-list").append(`<li>${data.text}</li>`);
        })
        .catch(function (err) {
            console.log(err);
            alert(err.responseText);
        });
    });

    // $(document).on("click", "#loadPreferences", function (e) {
    //     e.preventDefault();
    //     location.reload();
    // });
});