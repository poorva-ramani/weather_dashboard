$(document).ready(function () {
    var searchInput = $('#searchInput');
    var searchButton = $('#searchButton');
    var APIKEY = 'bac82acc8857889c02555dfdef12a398';

    function getLocation() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(showPosition);
        } else {
            x.innerHTML = "Geolocation is not supported by this browser.";
        }
    }

    function showPosition(position) {
        var queryURL = `http://api.openweathermap.org/data/2.5/weather?appid=${APIKEY}&lat=${position.coords.latitude}&lon=${position.coords.longitude}&units=imperial`;
        $.ajax({
            "url": queryURL,
            "method": "GET",
        }).done(function (response) {
            var resultsDiv = $("<div>");
            var icon = $("<img>");
            icon.attr("src", `http://openweathermap.org/img/wn/${response.weather[0].icon}@2x.png`);

            var city = $("<h5>").text(`${response.name} , ${response.sys.country} (${moment().format('L')})`);
            var weatherDetails = $("<p class='font-weight-bold'>").text("Weather: " + response.weather[0].main);
            var temperature = $("<p class='font-weight-bold'>").text("Temperature: " + response.main.temp);
            var humidity = $("<p class='font-weight-bold'>").text("Weather: " + response.main.humidity);
            var windSpeed = $("<p class='font-weight-bold'>").text("Wind Speed: " + response.wind.speed);

            // var uvIdx = $("<p class='bg-danger text-white p-2 border rounded'>").text("UV Index: " + uvIndex(response.coord.lat, response.coord.lon));
            resultsDiv.append(city);
            resultsDiv.append(weatherDetails);
            resultsDiv.append(icon);
            resultsDiv.append(temperature);
            resultsDiv.append(humidity);
            resultsDiv.append(windSpeed);
            // resultsDiv.append(uvIdx);
            $(".results").append(resultsDiv);
        });

        var queryURLForecast = `http://api.openweathermap.org/data/2.5/forecast?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${APIKEY}&units=imperial`;
        $.ajax({
            "url": queryURLForecast,
            "method": "GET",
        }).done(function (response) {
            $(".city").text(response.city.name);
            for (var i = 0; i < response.list.length; i = i + 8) {
                var resultsDiv = $("<div class='col bg-primary p-2 m-2 border rounded'>");
                var weatherDetails = $("<p>").text(response.list[i].dt_txt);
                var temperature = $("<p>").text("Temp: " + response.list[i].main.temp + "°F");
                var humidity = $("<p>").text("Humidity: " + response.list[i].main.humidity + "%");
                var icon = $("<img>");
                icon.attr("src", `http://openweathermap.org/img/wn/${response.list[i].weather[0].icon}@2x.png`);

                resultsDiv.append(weatherDetails);
                resultsDiv.append(icon);
                resultsDiv.append(temperature);
                resultsDiv.append(humidity);
                $(".forecastResults").append(resultsDiv);
            }
        });
    }

    function currentConditions(cityName) {
        var queryURL = `http://api.openweathermap.org/data/2.5/weather?q=${cityName}&APPID=${APIKEY}&units=imperial`;
        $.ajax({
            "url": queryURL,
            "method": "GET",
        }).done(function (response) {
            var resultsDiv = $("<div>");
            var icon = $("<img>");
            icon.attr("src", `http://openweathermap.org/img/wn/${response.weather[0].icon}@2x.png`);

            var city = $("<h5>").text(`${response.name} , ${response.sys.country} (${moment().format('L')})`);
            var weatherDetails = $("<p class='font-weight-bold'>").text("Weather: " + response.weather[0].main);
            var temperature = $("<p class='font-weight-bold'>").text("Temperature: " + response.main.temp);
            var humidity = $("<p class='font-weight-bold'>").text("Weather: " + response.main.humidity);
            var windSpeed = $("<p class='font-weight-bold'>").text("Wind Speed: " + response.wind.speed);
            // var uvIdx = $("<p class='bg-danger text-white p-2 border rounded'>").text("UV Index: " + uvIndex(response.coord.lat, response.coord.lon));
            resultsDiv.append(city);
            resultsDiv.append(weatherDetails);
            resultsDiv.append(icon);
            resultsDiv.append(temperature);
            resultsDiv.append(humidity);
            resultsDiv.append(windSpeed);
            // resultsDiv.append(uvIdx);
            $(".results").append(resultsDiv);
        });
    }

    function fiveDayForecast(cityName) {
        var queryURL = `http://api.openweathermap.org/data/2.5/forecast?q=${cityName}&APPID=${APIKEY}&units=imperial`;

        $.ajax({
            "url": queryURL,
            "method": "GET",
        }).done(function (response) {
            $(".city").text(response.city.name);
            for (var i = 0; i < response.list.length; i = i + 8) {
                var resultsDiv = $("<div class='col bg-primary p-2 m-2 border rounded'>");
                var weatherDetails = $("<p>").text(response.list[i].dt_txt);
                var temperature = $("<p>").text("Temp: " + response.list[i].main.temp + "°F");
                var humidity = $("<p>").text("Humidity: " + response.list[i].main.humidity + "%");
                var icon = $("<img>");
                icon.attr("src", `http://openweathermap.org/img/wn/${response.list[i].weather[0].icon}@2x.png`);

                resultsDiv.append(weatherDetails);
                resultsDiv.append(icon);
                resultsDiv.append(temperature);
                resultsDiv.append(humidity);
                $(".forecastResults").append(resultsDiv);
            }
        });
    }

    searchButton.click(function (e) {
        e.preventDefault();
        var cityName = searchInput.val();
        currentConditions(cityName);
        fiveDayForecast(cityName);
    });
    getLocation();
});

 // function uvIndex(latitude,longitude){
    //     var queryURL = `http://api.openweathermap.org/data/2.5/uvi?appid=${APIKEY}&lat=${latitude}&lon=${longitude}`;
    //     $.ajax({
    //         "url": queryURL,
    //         "method": "GET",
    //     }).then(function (response) {
    //         uvindex=response.value;
    //     });
    //     console.log(uvindex)

    //     return uvindex;
    // }