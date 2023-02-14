let tempBlock = document.querySelector("#temp");
let cityBlock = document.querySelector("#city");
let imgBlock = document.querySelector(".img-block");
let update_date = document.querySelector("#update-date");
let local_date = document.querySelector("#local-date");
let searchInp = document.querySelector(".search");

function zero_first_format(value) {
  if (value < 10) {
    value = "0" + value;
  }
  return value;
}
setInterval(() => {
  var current_datetime = new Date();
  var day = zero_first_format(current_datetime.getDate());
  var month = zero_first_format(current_datetime.getMonth() + 1);
  var year = current_datetime.getFullYear();
  var hours = zero_first_format(current_datetime.getHours());
  var minutes = zero_first_format(current_datetime.getMinutes());
  var seconds = zero_first_format(current_datetime.getSeconds());
  local_date.textContent = `Local time: ${hours}:${minutes}:${seconds}`;
}, 1000);

let city = "Ukraine";

document.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    let value = searchInp.value;
    if (!value) return false;
    city = value;
    init();
    searchInp.value = "";
  }
});

function init() {
  fetch(
    `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=d982b206b7125a363d94918d08ebf560`
  )
    .then((resp) => {
      return resp.json();
    })
    .then((data) => {
      imgBlock.innerHTML =
        `<img class='weather-img' src="http://openweathermap.org/img/w/` +
        data.weather[0].icon +
        `.png "></img>`;
      tempBlock.textContent = `${temperature()}°`;
      cityBlock.textContent = `City: ${data.name}`;

      function temperature() {
        let getTemp = data.main.temp;
        let tempC = Math.floor(getTemp) - 273;
        return tempC;
      }

      let date = new Date();

      //update_date.textContent = `Update time: ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
      //console.log('restart')
    })
    .catch(() => {
      alert("This city not found");
      city = "Ukraine";
      init();
      searchInp.value = "";
    });
}

init();

setInterval(() => {
  init();
}, 5000); //Update info every 5s
