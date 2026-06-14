const apikey =""
const apiURL =
"https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon")
const gpsButton = document.getElementById("gps-Button");
const Darkmode = document.getElementById("themeToggle");

const savedTheme = localStorage.getItem('theme');
if(savedTheme === 'dark'){
  document.body.classList.toggle('dark-mode')
}

Darkmode.addEventListener('click' ,() =>
{document.body.classList.toggle('dark-mode')  

  if(document.body.classList.contains('dark-mode')){
    localStorage.setItem('theme','dark');
  }else{
    localStorage.setItem('theme','light');
  }
});



gpsButton.addEventListener("click", () => {
  navigator.geolocation.getCurrentPosition(
  async(position) => {
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;

    const response = await fetch(  
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apikey}`
);
    const data = await response.json();
    
    document.querySelector(".city").innerHTML = data.name;
    document.querySelector(".temp").innerHTML =
    Math.round(data.main.temp) + "°C";

    document.querySelector(".temp").innerHTML =
    Math.round(data.main.temp) + "°C"

  updateweatherIcon(data.weather[0].main);

    
  }
)
})

async function checkweather(city){
    const response = await fetch(`${apiURL}${city}&appid=${apikey}`);
    const data = await response.json();


  document.querySelector(".city").innerHTML = data.name;
  document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C";

  document.querySelector(".humidity").innerHTML =
  data.main.humidity + "%";

  document.querySelector(".wind").innerHTML =
  data.wind.speed + "km/h";

 updateweatherIcon(data.weather[0].main);
};

function updateweatherIcon(weather){ 
  if (weather == "Clear"){
    weatherIcon.src ="image/clear.png"
 }
  else if (weather == "Rain"){
    weatherIcon.src ="image/rain.png"
 }
  else if (weather == "Mist"){
    weatherIcon.src="image/mist.png"
 } 
   else if (weather == "Drizzle"){
    weatherIcon.src ="image/drizzle.png"
  }
};

searchBtn.addEventListener("click", () =>{
    checkweather(searchBox.value);
})

searchBox.addEventListener("keydown", (e) =>{
    if(e.key === "Enter"){
        checkweather(searchBox.value);
    }
});
document.querySelector(".weather").style.display= "block";

checkweather("mumbai");
    
