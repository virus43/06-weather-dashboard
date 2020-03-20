localStorage.clear();

var cities =[];

function fiveDayWeather(city) {

  fiveDayQueryURL="http://api.openweathermap.org/data/2.5/forecast?q="+ city + "&units=imperial&appid=fb258481058403afaab62ec3f0a0fda4";

  $.ajax({
      url: fiveDayQueryURL,
      method: "GET"
    }).then(function(response) {
      var today = new Date();
      var date = today.toJSON().slice(0,10);
      var days =0;
      $("#five-day").empty();

      var forecastTitle = $("<p>");
      forecastTitle.addClass("h5");
      forecastTitle.text("Forecasts");
      $("#five-day").append(forecastTitle);

      var forecasts = $("<div>");
      forecasts.addClass("row");

      for (var i = 0; i < response.list.length; i++) {

        if (date !== response.list[i].dt_txt.split(" ")[0]){

          var hour = response.list[i].dt_txt.split(" ")[1].split(":")[0];
          
          if (parseInt(hour) === 3) {
            // $("#five-day").append(JSON.stringify(response.list[i].dt_txt.split(" ")[0]));
            days++;

            column = $("<div>");
            column.addClass("col");

            card = $("<div>");
            card.addClass("card bg-success text-light");
        
            cardBody = $("<div>");
            cardBody.addClass("card-body");
        
            cardTitle = $("<h5>");
            cardTitle.addClass("card-title");
        
            cardBody = $("<div>");
            cardBody.addClass("card-body");
        
            cardTitle.text(JSON.parse(JSON.stringify(response.list[i].dt_txt.split(" ")[0])));
 
            weatherImg = $("<img>");
            weatherImg.attr("src","http://openweathermap.org/img/wn/" + JSON.parse(JSON.stringify(response.list[i].weather[0].icon)) + "@2x.png");
            
            cardTemp = $("<p>");
            cardTemp.addClass("card-text");
            cardTemp.text("Temp: " + JSON.parse(JSON.stringify(response.list[i].main.temp)) +" \xB0F");
        
            cardHumidity = $("<p>");
            cardHumidity.addClass("card-text");
            cardHumidity.text("Humidity: " + JSON.parse(JSON.stringify(response.list[i].main.humidity)) +" %");
        
            cardBody.append(cardTitle);        
            cardBody.append(weatherImg);
            cardBody.append(cardTemp);
            cardBody.append(cardHumidity);
        
            card.append(cardBody);
            column.append(card);
            forecasts.append(column);
            $("#five-day").append(forecasts);
            if (days>5){                
              return; 
            }
          }
        }
      }
    });

}

function currentDayWeather(city, storageIndicator) {
  
  currentDayQueryURL ="http://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial&appid=fb258481058403afaab62ec3f0a0fda4";
  $.ajax({
    url: currentDayQueryURL,
    method: "GET"
  }).then(function(response) {

    console.log(response);
    if (storageIndicator === 1) {
    storeCity(JSON.parse(JSON.stringify(response.name)));
    displayCities();
    }
    var today = new Date();

    $("#current-day").empty();

    card = $("<div>");
    card.addClass("card bg-secondary text-light");

    cardBody = $("<div>");
    cardBody.addClass("card-body");

    cardTitle = $("<h5>");
    cardTitle.addClass("card-title");

    cardBody = $("<div>");
    cardBody.addClass("card-body");

    weatherImg = $("<img>");
    weatherImg.attr("src","http://openweathermap.org/img/wn/" + JSON.parse(JSON.stringify(response.weather[0].icon)) + "@2x.png");

    cardTitle.text(JSON.parse(JSON.stringify(response.name)) + " (" + today.toLocaleDateString() +")");
    cardTitle.append(weatherImg);
    
    cardTemp = $("<p>");
    cardTemp.addClass("card-text");
    cardTemp.text("Temperature: " + JSON.parse(JSON.stringify(response.main.temp)) +" \xB0F");

    cardFeels = $("<p>");
    cardFeels.addClass("card-text");
    cardFeels.text("Feels Like: " + JSON.parse(JSON.stringify(response.main.feels_like)) +" \xB0F");

    cardHumidity = $("<p>");
    cardHumidity.addClass("card-text");
    cardHumidity.text("Humidity: " + JSON.parse(JSON.stringify(response.main.humidity)) +" %");

    cardWind = $("<p>");
    cardWind.addClass("card-text");
    cardWind.text("Wind Speed: " + JSON.parse(JSON.stringify(response.wind.speed)) +" MPH");


    cardBody.append(cardTitle);
    cardBody.append(cardTemp);
    cardBody.append(cardFeels);
    cardBody.append(cardHumidity);
    cardBody.append(cardWind);

    card.append(cardBody);
    $("#current-day").append(card);
    
  });
}

function storeCity(city) {
  cities.push(city);
}

function displayCities() {
  $("#cities-list").empty();  
  for (i=0;i<cities.length;i++) {
    console.log(cities[i]);
    button = $("<button>");
    button.addClass("city-name btn btn-outline-secondary btn-block");
    button.text(cities[i]);
    $("#cities-list").append(button);
  }
}


document.addEventListener('click', function(event) {
  if (event.target.id === "submit-city") {
    city = $("#city-input").val();
    fiveDayWeather(city);
    currentDayWeather(city,1);
  }
});


document.addEventListener('click', function(event) {
  // console.log(event.target.className.split(" ")[0]);
  if (event.target.className.split(" ")[0] === "city-name") {
    fiveDayWeather(event.target.innerText);
    currentDayWeather(event.target.innerText,0);
  }
});






