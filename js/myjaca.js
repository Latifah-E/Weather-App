

const api = {
   key: "2b548fb9b82ad4bfe4a9a1dc6c84faf0",
   base: "https://api.openweathermap.org/data/2.5/"
 }
 
 const searchbox = document.querySelector('.searcher');
 searchbox.addEventListener('keypress', setQuery);
 
 function setQuery(evt) {

   if (evt.keyCode == 13) {
     console.log(searchbox.value);
     getResults(searchbox.value);
   }
 }
 
 function getResults (query) {
   fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
     .then(weather => {
       return weather.json();
   }).then(displayResults);
}

function displayResults (weather) {
  let city = document.querySelector('.city');
  city.innerText = `${weather.name}, ${weather.sys.country}`;
 
  let icons_el= document.querySelector('.icons');
  icons_el.innerHTML = `<img src="Icons/${weather.weather[0].icon}.png"/>`;
 
  let now = new Date();
  let date = document.querySelector('.date');
  date.innerText = dateBuilder(now);
 
  let temp = document.querySelector('.temp');
  temp.innerHTML = `${Math.round(weather.main.temp)}<span>°c</span>`;
 
  let humidity = document.querySelector('.humidity');
  humidity.innerHTML = `${Math.round(weather.main.humidity)}<span>%</span>`;
  
  let pressure = document.querySelector('.pressure');
  pressure.innerHTML = `${Math.round(weather.main.pressure)}<span>Pa</span>`;
 
  let weather_el= document.querySelector('.weather');
  weather_el.innerText = weather.weather[0].main;


}

function dateBuilder (d) {
let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

let day = days[d.getDay()];
let date = d.getDate();
let month = months[d.getMonth()];
let year = d.getFullYear();

return `${day} ${date} ${month} ${year}`;
}