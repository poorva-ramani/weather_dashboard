$(document).ready(function () {
    var searchInput = $('#searchInput');
    var searchButton = $('#searchButton');
    // var APIKEY = '200624582-ef03dfcbf90f2bd9243bdef3d1acb99b';
    searchButton.click(function (e) {
        e.preventDefault();
        var cityName = searchInput.val();
            var queryURL = `api.openweathermap.org/data/2.5/weather?q=${cityName}`;
            console.log(queryURL);
            $.ajax({
                "url": queryURL,
                "method": "GET",
            }).done(function (result) {
                console.log(result);
                // var trails = result.trails;
                // // console.log(trails.length)
                // for (var i = 0; i < 5; i++) {
                //     var resultsDiv = $("<div>");
                //     var rating = $("<p>").text("Star rating: " + trails[i].starVotes);
                //     var difficulty = $("<p>").text("difficulty: " + trails[i].difficulty);
                //     var image = $("<img>");
                //     image.attr("src", trails[i].imgMedium);
                //     resultsDiv.append(image);
                //     resultsDiv.append(rating);
                //     resultsDiv.append(difficulty);
                //     $(".results").append(resultsDiv);
                // }
            //});
        });
    });
});