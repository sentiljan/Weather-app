const apikey = "3265874a2c77ae4a04bb96236a642d2f";

const main = document.getElementById("main");
const form = document.getElementById("form");
const search = document.getElementById("search");
const cities = ["Tirana", "London","Milan","New York","Tokyo","Sydney"]

const url = (city) =>
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}`;

async function getWeatherByLocation(city) {
    const resp = await fetch(url(city), { origin: "tirana" });
    const respData = await resp.json();

    console.log(respData);

    addWeatherToPage(respData);
}

function addWeatherToPage(data) {
    const temp = KtoC(data.main.temp);
    const name = data.name;
    const wind = data.wind.speed;
    const humidity = data.main.humidity;
    const ofset = data.timezone/3600;
    const time = getDate(ofset)
    const weather = document.createElement("div");
    weather.classList.add("weather");
    
    weather.innerHTML = `
    <div class="weatherCity">
      <p>${name}</p>
      <p>${time}</p>
    </div>
        <div class="weather-icon">
          <img src="Assets/${data.weather[0].icon}.svg" /> 
          <p>${data.weather[0].main}</p>
        </div>
        <div class="desc">
          <div class="left-desc">
            <ul>
              <li><img src="Assets/wind.svg">${wind}km/h</li>
              <li><img src="Assets/hum.svg">${humidity}%</li>
            </ul>
          </div>
          <div class="right-desc"> ${temp}°C
          </div>
        </div>
    `;

    var item = document.querySelectorAll(".weather").length;

    // cleanup
    if(item < 5){
        main.appendChild(weather)
        cityExist(weather)
    }else if(item = 5){
        main.removeChild(weather)
    }

}

function cityExist(weather){
    const dubItem = document.querySelectorAll("#main > .weather > .weatherCity > p:nth-child(1)");
     console.log(dubItem)
    if(dubItem[0].innerHTML == dubItem[1].innerHTML){
        console.log(dubItem[0].innerHTML + "" + dubItem[1].innerHTML)
        alert("you have this city alredy")
        main.removeChild(weather)
    }
}


function getDate(ofset){
    const event = new Date()
    const hours = event.getUTCHours();
    var hp = hours+ofset;
    const mins = event.getMinutes()
    console.log(hours)
    if(mins < 10){
        return hp + ":" + "0" + mins;

    }else{
        return hp + ":" + mins;
    }
}

function KtoC(K) {
    return Math.floor(K - 273.15);
}

function changeIcon(data){
    const weatherIcon = data.weather[0]
    if(data == "Clear"){
        return data
    }

}

getWeatherByLocation("Tirana");

form.addEventListener("submit", (e) => {
    e.preventDefault();

    const city = search.value;

    if (city) {
        getWeatherByLocation(city)
    }

});

