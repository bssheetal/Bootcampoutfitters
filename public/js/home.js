$(document).ready(function () {

    function slideshowbackgroundimages() {

        var images = ["images/hero-01.jpg", "images/hero-02.jpg", "images/hero-03.jpg", "images/hero-04.jpg", "images/hero-05.jpg", "images/hero-06.jpg"];
        var showImage;
        var count = 0;
        function displayImage() {
            var div =
                $(".mySlides").html("<img src=" + images[count] + " width='180px'> ");
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


    slideshowbackgroundimages();

    var region = "";

    $("#searchButton").on("click", function (e) {
        e.preventDefault();
        $("#hikingDiv").empty();
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
                // newDiv.addClass("col-sm-12");

                newDiv.attr("data-actNum", trailInfo.id)
                    .attr("data-actName", trailInfo.name)
                    .attr("data-actDiff", trailInfo.difficulty)
                    .attr("data-actLength", trailInfo.length)
                    .attr("data-actRating", trailInfo.stars)
                    .attr("data-lat", trailInfo.latitude)
                    .attr("data-lng", trailInfo.longitude)
                    .attr("data-summary", trailInfo.summary);

                var newIMG = $("<img>");
                newIMG.addClass("trailImg");
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
    $(document).on("click", ".trailImg", function () {
        console.log("im clicked");
        $(".insidemodal").empty();
        var modaldiv = $("<div>");
        modaldiv.addClass("insidemodal");
        var newP = $("<p>");
        var name = $(this).closest('div').attr('data-actName');
        console.log("this is pointing to" + name);
        newP.append(name);
        var newIMG = $("<img>");
        var trailIMG = $(this).attr("src");
        newIMG.attr("src", trailIMG);
        var lengthp = $("<p>");
        var Length=$(this).closest('div').attr('data-actLength');
        lengthp.append("Length of trail"+" "+Length+"miles");
        var summary = $(this).closest('div').attr('data-summary');
        console.log(name);
        var newsummary = $("<p>");
        newsummary.append("Description:" + summary);
        modaldiv.append(newP);
        modaldiv.append(newIMG);
        modaldiv.append(lengthp);
        modaldiv.append(newsummary);
        $(".modal-body").append(modaldiv);
        $('#myModal').modal('show');

    })

});
