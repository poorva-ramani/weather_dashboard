$(document).ready(function () {
    var searchInput = $('#searchInput');
    var searchButton = $('#searchButton');
    var APIKEY = 'bac82acc8857889c02555dfdef12a398';

    //geolocation on page load
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
            displayCurrConditions(response)
        });
        var queryURLForecast = `http://api.openweathermap.org/data/2.5/forecast?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${APIKEY}&units=imperial`;
        $.ajax({
            "url": queryURLForecast,
            "method": "GET",
        }).done(function (response) {
            displayForecast(response);
        });
        appendSearches()
    }

    //api to get current weather conditions of a city
    function currentConditions(cityName) {
        var queryURL = `http://api.openweathermap.org/data/2.5/weather?q=${cityName}&APPID=${APIKEY}&units=imperial`;
        $.ajax({
            "url": queryURL,
            "method": "GET",
        }).done(function (response) {
            displayCurrConditions(response);
        });
    }

    //api to get 5 day forecast of a city
    function fiveDayForecast(cityName) {
        var queryURL = `http://api.openweathermap.org/data/2.5/forecast?q=${cityName}&APPID=${APIKEY}&units=imperial`;
        $.ajax({
            "url": queryURL,
            "method": "GET",
        }).done(function (response) {
            displayForecast(response);
        });
    }

    //function to display current conditions of a city
    function displayCurrConditions(response) {
        var resultsDiv = $("<div>");
        var icon = $("<img>");
        var uvIdx = $("<p class='bg-danger text-white p-2 border rounded'>");
        icon.attr("src", `http://openweathermap.org/img/wn/${response.weather[0].icon}@2x.png`);
        var queryURL = `http://api.openweathermap.org/data/2.5/uvi?appid=${APIKEY}&lat=${response.coord.lat}&lon=${response.coord.lon}`;
        $.ajax({
            "url": queryURL,
            "method": "GET",
        }).then(function (response) {
            uvIdx.text("UV Index: " + response.value);
        });
        $(".cityDetails").text(`${response.name} , ${response.sys.country} (${moment().format('L')})`);
        var weatherDetails = $("<p class='font-weight-bold'>").text("Weather: " + response.weather[0].main);
        var temperature = $("<p class='font-weight-bold'>").text("Temperature: " + response.main.temp);
        var humidity = $("<p class='font-weight-bold'>").text("Humidity: " + response.main.humidity);
        var windSpeed = $("<p class='font-weight-bold'>").text("Wind Speed: " + response.wind.speed);

        resultsDiv.append(weatherDetails);
        resultsDiv.append(icon);
        resultsDiv.append(temperature);
        resultsDiv.append(humidity);
        resultsDiv.append(windSpeed);
        resultsDiv.append(uvIdx);
        $(".results").append(resultsDiv);
    }

    //function to display 5 day forecast of a city
    function displayForecast(response) {
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
    }

    //localstorage methods
    var searchedCities = JSON.parse(localStorage.getItem('searchedCities')) || []

    function appendSearches() {
        $("#searchHistory").empty();
        for (i = 0; i < searchedCities.length; i++) {
            var li = $("<li>")
            li.addClass("list-group-item list-group-item-action is-capitalized w-75 text-center")
            li.attr("data-city", searchedCities[i].name)
            $("#searchHistory").prepend(li)
            li.click(function (e) {
                recall(e.target.innerText)
            });
            li.append(searchedCities[i].name);
        }
    }

    function recall(cityName) {
        $('.results').empty();
        $('.forecastResults').empty();
        currentConditions(cityName);
        fiveDayForecast(cityName);
    }

    //initial function for searching a city    
    searchButton.click(function (e) {
        e.preventDefault();
        $('.results').empty();
        $('.forecastResults').empty();
        var cityName = searchInput.val();
       if(cityName!=''){
        currentConditions(cityName);
        fiveDayForecast(cityName);

        //storing in localstorage
        var cityObj = {
            name: cityName
        }
        searchedCities.push(cityObj)
        localStorage.setItem('searchedCities', JSON.stringify(searchedCities))
        if (searchedCities.length === 10) {
            searchedCities.shift();
        }
        appendSearches()
    }else (alert("City name cannot be blank. Enter a valid city"));
    });

    getLocation();
});

