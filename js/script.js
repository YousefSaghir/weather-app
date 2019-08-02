if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(function(position) {
    let lat = position.coords.latitude;
    let long = position.coords.longitude;
    getGps(lat, long);
  });
}

let appId = `6c1962274be5430ab1724313cc310ca8`;
function getGps(lat, long) {
  fetch(
    `https://api.weatherbit.io/v2.0/forecast/daily?lat=${lat}&lon=${long}&lang=it&key=${appId}`
  )
    .then(result => {
      return result.json();
    })
    .then(data => {
      console.log(data);
      setWeather(data);
    });
}
var cityName = document.querySelector(".cityName");
var windSpeed = document.querySelector(".winds");
var humidity = document.querySelector(".humidity");
var localTemperature = document.querySelector(".numTemperature");
var descriptionTemp = document.querySelector(".des");
var iconImage = document.querySelector(".iconImg");
var dataTime = document.querySelector(".date");

function setWeather(data) {
  cityName.textContent = data.city_name;
  windSpeed.textContent =
    "Winds at " + Math.round(data.data[0].wind_spd) + " m/s";
  humidity.textContent = "Humidity: " + data.data[0].rh;
  localTemperature.innerHTML = data.data[0].temp + " &#176 " + "C";
  descriptionTemp.textContent = data.data[0].weather.description;
  iconImage.innerHTML = `<img class='img-responsive center-block' src='icons/${
    data.data[0].weather.icon
  }.png'/>`;
  dataTime.innerHTML = `<h2>${data.data[0].datetime}<h2/>`;
  switch (data.data[0].weather.icon) {
    case "t01d":
    case "t01n":
    case "t02d":
    case "t02n":
    case "t03d":
    case "t03n":
    case "t04d":
    case "t04n":
    case "t04d":
    case "t04n":
    case "t04d":
    case "t04n":
    case "t05d":
    case "t05n":
      document.querySelector("..container-fluid-fluid").style.backgroundImage =
        "url(Des/Thunderstorm-with-Hail.jpg)";
      document.querySelector(
        "..container-fluid-fluid"
      ).style.backgroundPosition = "bottom";
      break;
    case "u00n":
    case "u00d":
    case "d01n":
    case "d01d":
    case "d02n":
    case "d02d":
    case "d03n":
    case "d03d":
    case "r01n":
    case "r01d":
    case "r02n":
    case "r02d":
    case "r03n":
    case "r03d":
    case "f01n":
    case "f01d":
    case "r04n":
    case "r04d":
    case "r05n":
    case "r05d":
    case "r06n":
    case "r06d":
      document.querySelector("..container-fluid-fluid").style.backgroundImage =
        "url(Des/Drizzle.jpg)";
      document.querySelector(
        "..container-fluid-fluid"
      ).style.backgroundPosition = "bottom";
      break;

    case "s01n":
    case "s01d":
    case "s02n":
    case "s02d":
    case "s03n":
    case "s03d":
    case "s04n":
    case "s04d":
    case "s06n":
    case "s06d":
      document.querySelector(".container-fluid").style.backgroundImage =
        "url(Des/Snow.jpg)";
      document.querySelector(".container-fluid").style.backgroundPosition =
        "bottom";
      break;

    case "s05n":
    case "s05d":
    case "s05n":
    case "s05d":
      document.querySelector(".container-fluid").style.backgroundImage =
        "url(Des/Snow-Ice.jpg)";
      document.querySelector(".container-fluid").style.backgroundPosition =
        "bottom";
      break;

    case "a01n":
    case "a01d":
    case "a02n":
    case "a02d":
    case "a03n":
    case "a03d":
    case "a04n":
    case "a04d":
    case "a05n":
    case "a05d":
    case "a06n":
    case "a06d":
      document.querySelector(".container-fluid").style.backgroundImage =
        "url(Des/mist.jpg)";
      document.querySelector(".container-fluid").style.backgroundPosition =
        "bottom";
      break;

    case "c01n":
      document.querySelector(".container-fluid").style.backgroundImage =
        "url(Des/clear-sky-night.jpg)";
      document.querySelector(".container-fluid").style.backgroundSize = "cover";
      break;
    case "c01d":
      document.querySelector(".container-fluid").style.backgroundImage =
        "url(Des/clear-sky.jpg)";
      document.querySelector(".container-fluid").style.backgroundPosition =
        "bottom";
      break;

    case "c02n":
    case "c02d":
    case "c02n":
    case "c02d":
    case "c03n":
    case "c03d":
    case "c04n":
    case "c04d":
      document.querySelector(".container-fluid").style.backgroundImage =
        "url(Des/Overcast-clouds.jpg)";
      document.querySelector(".container-fluid").style.backgroundPosition =
        "bottom";
      break;
    default:
      break;
  }
  // days hestory
  var dataHistory = document.querySelectorAll(".data");
  var temperatureHistory = document.querySelectorAll(".temperatureH");
  var iconHistory = document.querySelectorAll(".iconH");
  var descriptionHistory = document.querySelectorAll(".temperatureDescription");
  for (var i = 0, j = 1; j < 16, i < dataHistory.length; i++, j++) {
    dataHistory[i].textContent = data.data[j].datetime;
    temperatureHistory[i].innerHTML = data.data[j].temp + " &#176" + "C";
    iconHistory[i].innerHTML = `<img src='icons/${
      data.data[j].weather.icon
    }.png'/>`;
    descriptionHistory[i].textContent = data.data[j].weather.description;
  }
  // part days for sm
  for (var s = 0, n = 1; n < 16, s < dataHistory.length; s++, n++) {
    document.querySelectorAll(".date-for-sm")[s].textContent =
      data.data[n].datetime;
    document.querySelectorAll(".temperature-for-sm")[s].innerHTML =
      data.data[n].temp + " &#176" + "C";
    document.querySelectorAll(".icon-for-sm")[
      s
    ].innerHTML = `<img class='img-responsive center-block' src='icons/${
      data.data[n].weather.icon
    }.png'/>`;
    document.querySelectorAll(".des-for-sm")[s].textContent =
      data.data[n].weather.description;
  }
}

// third Part
var dataInfo;
document.querySelector("#search").addEventListener("click", function(e) {
  e.preventDefault();
  var inputLanguge = document.querySelector("#lang").value;
  var inputNameCity = document.querySelector("#nameSearch").value;

  fetch(
    `https://api.weatherbit.io/v2.0/forecast/daily?city=${inputNameCity}&lang=${inputLanguge}&key=${appId}`
  )
    .then(json => {
      return json.json();
    })
    .then(data => {
      var selectS = document.querySelectorAll("#selectS option");

      for (var i = 0; i < data.data.length; i++) {
        selectS[i].textContent = data.data[i].datetime;
      }

      takeInfo(data);
    });
});

function takeInfo(json) {
  dataInfo = json;

  var num = document.querySelector("#selectS").value;

  putInfo(json, num);
}

function putInfo(info, num) {
  document.querySelector(".cityNameS").textContent = info.city_name;
  document.querySelector(".windsS").textContent =
    "Winds at " + Math.round(info.data[num].wind_spd) + " m/s";
  document.querySelector(".humidityS").textContent =
    "Humidity: " + info.data[num].rh;
  document.querySelector(".numTemperatureS").innerHTML =
    info.data[num].temp + " &#176 " + "C";
  document.querySelector(".desS").textContent =
    info.data[num].weather.description;

  document.querySelector(".iconImgS").innerHTML = `<img src='icons/${
    info.data[num].weather.icon
  }.png'/>`;
  document.querySelector(".dateS").innerHTML = `<h3>${
    info.data[num].datetime
  }<h3/>`;

  switch (info.data[num].weather.icon) {
    case "t01d":
    case "t01n":
    case "t02d":
    case "t02n":
    case "t03d":
    case "t03n":
    case "t04d":
    case "t04n":
    case "t04d":
    case "t04n":
    case "t04d":
    case "t04n":
    case "t05d":
    case "t05n":
      document.querySelector(".three").style.backgroundImage =
        "url(Des/Thunderstorm-with-Hail.jpg)";
      document.querySelector(".three").style.backgroundPosition = "bottom";
      break;
    case "u00n":
    case "u00d":
    case "d01n":
    case "d01d":
    case "d02n":
    case "d02d":
    case "d03n":
    case "d03d":
    case "r01n":
    case "r01d":
    case "r02n":
    case "r02d":
    case "r03n":
    case "r03d":
    case "f01n":
    case "f01d":
    case "r04n":
    case "r04d":
    case "r05n":
    case "r05d":
    case "r06n":
    case "r06d":
      document.querySelector(".three").style.backgroundImage =
        "url(Des/Drizzle.jpg)";
      document.querySelector(".three").style.backgroundPosition = "bottom";
      break;

    case "s01n":
    case "s01d":
    case "s02n":
    case "s02d":
    case "s03n":
    case "s03d":
    case "s04n":
    case "s04d":
    case "s06n":
    case "s06d":
      document.querySelector(".three").style.backgroundImage =
        "url(Des/Snow.jpg)";
      document.querySelector(".three").style.backgroundPosition = "bottom";
      break;

    case "s05n":
    case "s05d":
    case "s05n":
    case "s05d":
      document.querySelector(".three").style.backgroundImage =
        "url(Des/Snow-Ice.jpg)";
      document.querySelector(".three").style.backgroundPosition = "bottom";
      break;

    case "a01n":
    case "a01d":
    case "a02n":
    case "a02d":
    case "a03n":
    case "a03d":
    case "a04n":
    case "a04d":
    case "a05n":
    case "a05d":
    case "a06n":
    case "a06d":
      document.querySelector(".three").style.backgroundImage =
        "url(Des/mist.jpg)";
      document.querySelector(".three").style.backgroundPosition = "bottom";
      break;

    case "c01n":
      document.querySelector(".three").style.backgroundImage =
        "url(Des/clear-sky-night.jpg)";
      document.querySelector(".three").style.backgroundSize = "cover";
      break;
    case "c01d":
      document.querySelector(".three").style.backgroundImage =
        "url(Des/clear-sky.jpg)";
      document.querySelector(".three").style.backgroundPosition = "bottom";
      break;

    case "c02n":
    case "c02d":
    case "c02n":
    case "c02d":
    case "c03n":
    case "c03d":
    case "c04n":
    case "c04d":
      document.querySelector(".three").style.backgroundImage =
        "url(Des/Overcast-clouds.jpg)";
      document.querySelector(".three").style.backgroundPosition = "bottom";
      break;
    default:
      break;
  }
}

/* document.getElementById("nameSearch").addEventListener("focusin", () => {
  document.getElementById("nameSearch").setAttribute("class", "resize");
});
document.getElementById("nameSearch").addEventListener("focusout", () => {
  document.getElementById("nameSearch").classList.remove("resize");
}); */
