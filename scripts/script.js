const dom = {
    currentTemp: document.querySelector('.current-temp .js-value'),
    cityName: document.querySelector('.city-name'),
    tempMax: document.querySelector('.temp-max .js-value'),
    tempMin: document.querySelector('.temp-min .js-value'),
    humidity: document.querySelector('.humidity .js-value'),
    description: document.querySelector('.description'),
    form: document.querySelector('form'),
    input: document.querySelector('#city'),
    weatherInfo: document.querySelector('.weather-info'),
    h1: document.querySelector('h1'),
    container: document.querySelector('.container')
}

async function getData(city) {
    const resp = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=70101838777dc0e506b142df08a1f81b&units=metric&lang=pt_br`,{mode: 'cors'});
    const data = await resp.json();
    return data;
}

async function formatData(data) {
    const resp = {
        name: data.name,
        temp: data.main.temp,
        tempMax: data.main.temp_max,
        tempMin: data.main.temp_min,
        humidity: data.main.humidity,
        description: data.weather[0].description
    }
    return resp;   
}

async function startApp(e) {
    e.preventDefault();
    const data = await getData(dom.input.value);
    const formated = await formatData(data);
    dom.currentTemp.textContent = await formated.temp;
    dom.cityName.textContent = await formated.name;
    dom.tempMax.textContent = await formated.tempMax;
    dom.tempMin.textContent = await formated.tempMin;
    dom.humidity.textContent = await formated.humidity;
    dom.description.textContent = await formated.description;
    dom.weatherInfo.classList.remove('hidden');
    dom.h1.classList.add('hidden');
    dom.form.classList.add('change');
    dom.container.classList.add('change');
}

dom.form.addEventListener('submit', startApp);