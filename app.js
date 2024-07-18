let button = document.getElementById("button");

button.addEventListener("click", getLocation);
let myapi = "1c99d313717d8f44f41cc235b6871920";

let map;

function createMap(a, b) {
  if (map) {
    map.getView().setCenter(ol.proj.fromLonLat([a, b]));
  } else {
    map = new ol.Map({
      target: "map",
      layers: [
        new ol.layer.Tile({
          source: new ol.source.OSM(),
        }),
      ],
      view: new ol.View({
        center: ol.proj.fromLonLat([a, b]),
        zoom: 10,
      }),
    });
  }
}
function googleTranslateElementInit() {
  new google.translate.TranslateElement({pageLanguage: 'en'}, 'google_translate_element');
}


let  getDayOfWeek = (dateString)=> {
  // Create a new Date object with the provided date string
  const date = new Date(dateString);
  
  // Array of weekday names
  const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  
  // Get the day of the week (0 for Sunday, 1 for Monday, ..., 6 for Saturday)
  const dayOfWeekIndex = date.getDay();
  
  // Return the corresponding weekday name
  return daysOfWeek[dayOfWeekIndex];
}

function getLocation() {
  navigator.geolocation.getCurrentPosition(
    function success(ok) {
      console.log("success", ok);
      console.log(ok.coords.latitude);
      console.log(ok.coords.longitude);
      let lon = ok.coords.longitude;
      let lat = ok.coords.latitude;
      fetch(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${myapi}`, { method: "GET" }
        // `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${myapi}`,
        // { method: "GET" }
      )
        .then((data) => {
          return data.json();
        })
        .then((res) => {
          console.log(res);
          document.querySelector('.next1h3').innerText = `${getDayOfWeek(res.list[8].dt_txt.slice(0,10))}`
          let smallImgId1 = res.list[8].weather[0].icon
          document.querySelector('.smallIcon1').src = `http://openweathermap.org/img/wn/${smallImgId1}@2x.png`
          document.querySelector('.minitemp1').innerText = `${res.list[8].main.temp.toFixed(0)} °C`;
          document.querySelector('.next1p').innerText = res.list[8].weather[0].description

          document.querySelector('.next2h3').innerText = `${getDayOfWeek(res.list[16].dt_txt.slice(0,10))}`
          let smallImgId2 = res.list[16].weather[0].icon
          document.querySelector('.smallIcon2').src = `http://openweathermap.org/img/wn/${smallImgId2}@2x.png`
          document.querySelector('.minitemp2').innerText = `${res.list[16].main.temp.toFixed(0)} °C`;
          document.querySelector('.next2p').innerText = res.list[16].weather[0].description

          document.querySelector('.next3h3').innerText = `${getDayOfWeek(res.list[24].dt_txt.slice(0,10))}`
          let smallImgId3 = res.list[24].weather[0].icon
          document.querySelector('.smallIcon3').src = `http://openweathermap.org/img/wn/${smallImgId3}@2x.png`
          document.querySelector('.minitemp3').innerText = `${res.list[24].main.temp.toFixed(0)} °C`;
          document.querySelector('.next3p').innerText = res.list[24].weather[0].description

          document.querySelector(".time").innerText = new Date(
            (res.city.sunrise + res.city.timezone) * 1000
          ).toDateString();
          document.querySelector(
            ".weatherMain"
          ).innerText = `${res.list[0].weather[0].main}`;
          let imgId = res.list[0].weather[0].icon;
          document.querySelector(
            ".image"
          ).src = `http://openweathermap.org/img/wn/${imgId}@2x.png`;
          document.querySelector(".temp").innerText = `${res.list[0].main.temp.toFixed(
            0
          )} °C`;
          document.querySelector(
            ".desc"
          ).innerText = `${res.list[0].weather[0].description}`;
          document.querySelector(
            ".city"
          ).innerText = `${res.city.name}, ${res.city.country}`;
          document.querySelector('.population').innerText = `Population: ${res.city.population}`
          document.querySelector(
            ".tempMax"
          ).innerText = `${res.list[0].main.temp_max.toFixed(0)} °C`;
          document.querySelector(
            ".tempMin"
          ).innerText = `${res.list[0].main.temp_min.toFixed(0)} °C`;
          document.querySelector(
            ".humidity"
          ).innerText = `${res.list[0].main.humidity.toFixed(0)}`;
          document.querySelector(
            ".feelsLike"
          ).innerText = `${res.list[0].main.feels_like.toFixed(0)}`;
          const sunrise = new Date(res.city.sunrise * 1000).toLocaleTimeString();
          document.querySelector(".sunrise").innerText = sunrise;
          const sunset = new Date(res.city.sunset * 1000).toLocaleTimeString();
          document.querySelector(".sunset").innerText = sunset;
        });

      createMap(lon, lat);
    },
    function error(error) {
      console.log("error", error);
      console.log("error:", error.message);
    }
  );

}

let searchBtn = document.querySelector(".searchButton");
let input = document.querySelector("#inpSearch");
searchBtn.addEventListener("click", searchByCity);
input.addEventListener("keyup", function (e) {
  if (e.key === "Enter") {
    searchByCity();
  }
});

function searchByCity() {
  console.log(input.value);
  let city = input.value.trim();
  fetch(
    `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${myapi}`,
    { method: "GET" }
  )
    .then((data) => {
      if (data.status !== 200) {
        throw new Error("City not found");
      }
      return data.json();
    })
    .then((res) => {
      console.log(res)
      document.querySelector('.next1h3').innerText = `${getDayOfWeek(res.list[8].dt_txt.slice(0,10))}`
      let smallImgId1 = res.list[8].weather[0].icon
      document.querySelector('.smallIcon1').src = `http://openweathermap.org/img/wn/${smallImgId1}@2x.png`
      document.querySelector('.minitemp1').innerText = `${res.list[8].main.temp.toFixed(0)} °C`;
      document.querySelector('.next1p').innerText = res.list[8].weather[0].description

      document.querySelector('.next2h3').innerText = `${getDayOfWeek(res.list[16].dt_txt.slice(0,10))}`
      let smallImgId2 = res.list[16].weather[0].icon
      document.querySelector('.smallIcon2').src = `http://openweathermap.org/img/wn/${smallImgId2}@2x.png`
      document.querySelector('.minitemp2').innerText = `${res.list[16].main.temp.toFixed(0)} °C`;
      document.querySelector('.next2p').innerText = res.list[16].weather[0].description

      document.querySelector('.next3h3').innerText = `${getDayOfWeek(res.list[24].dt_txt.slice(0,10))}`
      let smallImgId3 = res.list[24].weather[0].icon
      document.querySelector('.smallIcon3').src = `http://openweathermap.org/img/wn/${smallImgId3}@2x.png`
      document.querySelector('.minitemp3').innerText = `${res.list[24].main.temp.toFixed(0)} °C`;
      document.querySelector('.next3p').innerText = res.list[24].weather[0].description

      document.querySelector(".time").innerText = new Date(
        (res.city.sunrise + res.city.timezone) * 1000
      ).toDateString();
      let lon = res.city.coord.lon;
      let lat = res.city.coord.lat;
      createMap(lon, lat);

      document.querySelector(
        ".weatherMain"
      ).innerText = `${res.list[0].weather[0].main}`;
      let imgId = res.list[0].weather[0].icon;
      document.querySelector(
        ".image"
      ).src = `http://openweathermap.org/img/wn/${imgId}@2x.png`;
      document.querySelector(".temp").innerText = `${res.list[0].main.temp.toFixed(
        0
      )} °C`;
      document.querySelector(
        ".desc"
      ).innerText = `${res.list[0].weather[0].description}`;
      document.querySelector(
        ".city"
      ).innerText = `${res.city.name}, ${res.city.country}`;
      document.querySelector('.population').innerText = `Population: ${res.city.population}`
      document.querySelector(
        ".tempMax"
      ).innerText = `${res.list[0].main.temp_max.toFixed(0)} °C`;
      document.querySelector(
        ".tempMin"
      ).innerText = `${res.list[0].main.temp_min.toFixed(0)} °C`;
      document.querySelector(
        ".humidity"
      ).innerText = `${res.list[0].main.humidity.toFixed(0)}`;
      document.querySelector(
        ".feelsLike"
      ).innerText = `${res.list[0].main.feels_like.toFixed(0)}`;
      const sunrise = new Date(res.city.sunrise * 1000).toLocaleTimeString();
      document.querySelector(".sunrise").innerText = sunrise;
      const sunset = new Date(res.city.sunset * 1000).toLocaleTimeString();
      document.querySelector(".sunset").innerText = sunset;
    })
    .catch((error) => {
      alert(error.message);
      console.log(error.message);
    });
}
