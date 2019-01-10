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

            // Use a setTimeout to run displayImage after 1 second.
            setTimeout(displayImage, 1000);

            // If the count is the same as the length of the image array, reset the count to 0.
            if (count === images.length) {
                count = 0;
            }

        }

        function slideshow() {
            showImage = setInterval(nextImage, 3000); displayImage();
            slideshow();
        }

        displayImage();
        slideshow();
    }


    //slideshowbackgroundimages();

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
                newDiv.addClass("col-sm-4");

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
                newH.append(trailInfo.name);
                newP.append(trailInfo.location);
                newDiv.append(newH);
                newDiv.append(newP);
                newDiv.append(newIMG);
                $("#hikingDiv").append(newDiv);
            }

        })
    });

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

<<<<<<< HEAD
});
=======
});
>>>>>>> 298b92d5665a0e66ada27976501ba4d5005be324
