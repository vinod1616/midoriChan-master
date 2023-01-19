var weatherFormPanel = document.querySelector(".weather-search");
var formWeather = document.querySelector(".formWeather");
var bringCloseBtn = document.querySelector(".bringClose");
var loading = document.getElementsByClassName("loading");
var describe = document.getElementsByClassName("w-describe");
var figureDigit = document.getElementsByClassName("w-figure");
var panel = false;

bringCloseBtn.addEventListener("click", () => {
  if (panel === true) {
    weatherFormPanel.style.cssText = "transform: translateX(350px)";
    bringCloseBtn.innerHTML = `&#9664;`;
  } else {
    weatherFormPanel.style.cssText = "transform: translateX(0px)";
    bringCloseBtn.innerHTML = `&#9658;`;
  }
  panel = !panel;
  console.log(panel);
});
formWeather.addEventListener("submit", (e) => {
  showLoading();
  console.log("hi");
  e.preventDefault();
  let cityName = document.querySelector(".cityname").value;
  console.log(cityName);
  getWeatherData(cityName);
});

// let defaultLocation = "bangalore";

function getWeatherData(loaction) {
  fetch(`/weather?address=${loaction}`).then((data) => {
    data.json().then((detail) => {
      closeLoading();
      document.querySelector(".server_wd").innerHTML =
        detail.weather_descriptions;
      document.querySelector(".server_temp").innerHTML = detail.temperature;
      document.querySelector(".server_hum").innerHTML = detail.humidity;
      document.querySelector(".server_pre").innerHTML = detail.precip;
      document.querySelector(".server_loc").innerHTML = detail.placeName;
      weatherFormPanel.style.cssText = "transform: translateX(350px)";
    });
  });
}
getWeatherData("bangalore");
function closeLoading() {
  for (let i = 0; i < loading.length; i++) {
    loading[i].style.display = "none";
  }
  for (let j = 0; j < describe.length; j++) {
    describe[j].style.display = "block";
  }
  for (let k = 0; k < figureDigit.length; k++) {
    figureDigit[k].style.display = "block";
  }
}
function showLoading() {
  for (let i = 0; i < loading.length; i++) {
    loading[i].style.display = "block";
  }
  for (let j = 0; j < describe.length; j++) {
    describe[j].style.display = "none";
  }
  for (let k = 0; k < figureDigit.length; k++) {
    figureDigit[k].style.display = "none";
  }
}

