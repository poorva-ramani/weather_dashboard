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
            displayCurrConditions(response)
        });

        var queryURLForecast = `http://api.openweathermap.org/data/2.5/forecast?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${APIKEY}&units=imperial`;
        $.ajax({
            "url": queryURLForecast,
            "method": "GET",
        }).done(function (response) {
            displayForecast(response);
        });
    }

    function currentConditions(cityName) {
        var queryURL = `http://api.openweathermap.org/data/2.5/weather?q=${cityName}&APPID=${APIKEY}&units=imperial`;
        $.ajax({
            "url": queryURL,
            "method": "GET",
        }).done(function (response) {
            displayCurrConditions(response);
        });
    }

    function fiveDayForecast(cityName) {
        var queryURL = `http://api.openweathermap.org/data/2.5/forecast?q=${cityName}&APPID=${APIKEY}&units=imperial`;
        $.ajax({
            "url": queryURL,
            "method": "GET",
        }).done(function (response) {
            displayForecast(response);
        });
    }

    function displayCurrConditions(response){
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
            var city = $("<h5>").text(`${response.name} , ${response.sys.country} (${moment().format('L')})`);
            var weatherDetails = $("<p class='font-weight-bold'>").text("Weather: " + response.weather[0].main);
            var temperature = $("<p class='font-weight-bold'>").text("Temperature: " + response.main.temp);
            var humidity = $("<p class='font-weight-bold'>").text("Weather: " + response.main.humidity);
            var windSpeed = $("<p class='font-weight-bold'>").text("Wind Speed: " + response.wind.speed);           
           
        resultsDiv.append(city);
        resultsDiv.append(weatherDetails);
        resultsDiv.append(icon);
        resultsDiv.append(temperature);
        resultsDiv.append(humidity);
        resultsDiv.append(windSpeed);
        resultsDiv.append(uvIdx);
            $(".results").append(resultsDiv);
    }

function displayForecast(response){
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
    // var cityObj = {
    //     name: city
    //       }
    //       searchedCities.push(cityObj)
    //       localStorage.setItem('searchedCities', JSON.stringify(searchedCities))

    //       $('#citySearch').empty();

    //       if (searchedCities.length === 10) {
    //           console.log('worked')
    //           searchedCities.shift();
    //       }
    //       appendSearches()
    // }

    // var searchedCities = JSON.parse(localStorage.getItem('searchedCities')) || []

    // function appendSearches() {
    //     $("#showSearch").empty();
    //     for (x = 0; x < searchedCities.length; x++) {
    //     var el = $("<li>")
    //     el.addClass("list-group-item is-capitalized")
    //     el.attr("data-city", searchedCities[x].name)
    //     $("#showSearch").prepend(el)
        
    //     //$(this).data()
    //     el.click(function(e) {
    //         recall(e.target.innerText)
    //     });
    //     el.append(searchedCities[x].name);
    // }}

    // function recall(cityName) {
    //         $.ajax({
    //             url: 'https://api.openweathermap.org/data/2.5/forecast?q=' + 
    //             cityName + '&apikey=df520520403dc5e0455758f5b172bc5e&units=imperial',
    //             method:"GET",
    //         })  
    //         .then(function(data) {
    //         var display = show(data);
    //         $('#show').html(display);
    //         $('#citySearch').empty();
    //         date(data)
    //         })
    // }

    searchButton.click(function (e) {
        e.preventDefault();
        $('.results').empty();
        $('.forecastResults').empty();       
        var cityName = searchInput.val();
        currentConditions(cityName);
        fiveDayForecast(cityName);
    });
    getLocation();
});

 