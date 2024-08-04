const apiKey = "7dcb3ce99bc0d0d4db20d5a42d6811d5";
const cityYang = "Sabadell";
const citySun = "Seville";
const urlYang = `https://api.openweathermap.org/data/2.5/weather?q=${cityYang}&appid=${apiKey}&units=metric&lang=es`;
const urlSun = `https://api.openweathermap.org/data/2.5/weather?q=${citySun}&appid=${apiKey}&units=metric&lang=es`;
function fetchWeather(url,id, idIcon)
{
    let image = document.createElement("img");
    fetch(url)
    .then(response => response.json())
    .then(data => {
        const temperature = data.main.temp;
        const weatherDescription = data.weather[0].description;
        let weatherMain = data.weather[0].main;
        document.getElementById(id).innerText = `${temperature}°C \n ${weatherDescription.toUpperCase()}.`;
        switch (weatherMain)
        {
        case "Clear":
            if (new Date()/1000 < data.sys.sunset && new Date()/1000 > data.sys.sunrise)
            {
                image.src = "soleado.png";
            }
            else
            {
                image.src = "despejadonoche.png";
            }
            break;
        case "Rain":
            image.src = "lluvia.png";
            break;

        case "Snow":
            image.src = "nieve.png";
            break;

        case "Clouds":
            image.src = "nublado.png";
            break;

        case "Haze":
            image.src = "niebla.png";
            break;
        }
        let contenedor = document.getElementById(idIcon);
        contenedor.innerHTML = "";
        image.width = 200;
        image.height = 200;
        contenedor.appendChild(image);
    })
    .catch(error => console.error('Error:', error));
}
function weatherYangSun()
{
    fetchWeather(urlYang,"weatherYangDescription", "weatherYangIcon");
    fetchWeather(urlSun, "weatherSunDescription", "weatherSunIcon");
}
function lastSunday(month, year)
{
    let fecha = new Date(year, month + 1, 0);
    let day = fecha.getDay();
    return fecha.getDate() - day;
}
function showHour(diff, id)
{
    let offsetHours = 1;
    let now = new Date();
    if (now.getMonth() >= 3 && now.getMonth() <=8 || (now.getMonth() == 2 && now.getDate() > lastSunday(2,now.getFullYear())) || (now.getMonth() == 9 && now.getDate() < lastSunday(9,now.getFullYear())))
    {
        offsetHours = 2;
    }
    diff = diff - offsetHours*60*60*1000;
    let days = Math.floor(diff/(1000*60*60*24));
    let hours = Math.floor(diff % (1000 * 60 * 60 * 24) / (1000 * 60 * 60));
    let minutes = Math.floor(diff % (1000 * 60 * 60) / (1000 * 60));
    let seconds = Math.floor(diff % (1000 * 60) / 1000);

    let clock = `${days}D-${hours}H-${minutes}M-${seconds}S `;
    document.getElementById(id).textContent = clock;
}

function actDateYear(date) //se puede optimizar
{
    let now = new Date();
    while (now > date)
    {
        let yearNow = date.getFullYear();
        date.setFullYear(yearNow + 1);
    }
}
function actDateMonth(date)
{
    let now = new Date();
    while (now > date)
    {
        let yearNow = date.getFullYear();
        let monthNow = date.getMonth();
        if (monthNow == 11)
        {
            date.setMonth(0);
            date.setFullYear(yearNow + 1);
        }
        else
        {
            date.setMonth(monthNow + 1);
        }
    }
}

function aniversary()
{
    let now = new Date();
    let date = new Date("2025-05-07");
    actDateYear(date);
    let diff = date - now;
    showHour(diff, "aniversario");
}

function mes()
{
    let now = new Date();
    let date = new Date("2024-08-07");
    actDateMonth(date);
    let diff = date - now;
    showHour(diff, "monthAniversario");
}

function cumYang()
{
    let now = new Date();
    let date = new Date("2024-12-27")
    actDateYear(date);
    let diff = date - now;
    showHour(diff, "cumYang");
}

function cumSun()
{
    let now = new Date();
    let date = new Date("2024-09-13")
    actDateYear(date);
    let diff = date - now;
    showHour(diff, "cumSun");
}

function daysTogether()
{
    let now = new Date();
    let date = new Date ("2024-05-07");
    let diff = now - date;
    showHour(diff,"daysTogether");
}

function specialDay()
{
    let now = new Date();
    let date = new Date("2024-08-24");
    let diff = date - now;
    showHour(diff,"specialDay");
}

weatherYangSun();
setInterval(weatherYangSun, 5000);
aniversary();
setInterval(aniversary,1000);
mes();
setInterval(mes,1000);
cumYang();
setInterval(cumYang,1000);
cumSun();
setInterval(cumSun,1000);
daysTogether();
setInterval(daysTogether,1000);
specialDay();
setInterval(specialDay,1000);
