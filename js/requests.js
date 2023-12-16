export { makeRequest, makeRequestInTime};
import { UI_ELEMENTS } from './ui_elements.js';
import { CONSTS_VALUES } from './consts.js';
import { millisecondsToDate, removeMinuse } from './tools.js';
import { сreateInTimeUI } from './view.js';

const serverUrl = 'http://api.openweathermap.org/data/2.5/weather';
const apiKey = '80b3669790743bca0100b598dba76aa2';
const forecastUrl = 'http://api.openweathermap.org/data/2.5/forecast';

async function getRequest(city, url) {
	const response = await fetch(`${url}?q=${city}&appid=${apiKey}&units=metric`);
	try{
		switch (response.status) {
			case 400:
		        throw new Error('Bad Request - неправильный запрос от клиента');
			case 404:
		        throw new Error('Такой город не найден!');
			case 500:
		        throw new Error('Internal Server Error - ошибка сервера ');
		    default: 
		 		return await response.json();
		}
	}catch (error) { 
		alert(error);
	}
}

async function makeRequest(cityName){
	try {
		if (!cityName) throw new Error(CONSTS_VALUES.ERROR_EMPTY_INPUT);
		const data = await getRequest(cityName, serverUrl);
		UI_ELEMENTS.LOCATION_TEMPERATURE.textContent = removeMinuse(data.main.temp.toFixed());
		UI_ELEMENTS.LOCATION_NAME.textContent = cityName;
		UI_ELEMENTS.WEATHER_ICON.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`
		UI_ELEMENTS.TEMPERATURE_FEELS_LIKE.textContent = removeMinuse(data.main.feels_like.toFixed()) + CONSTS_VALUES.DEGREE_SYMBOL;
		UI_ELEMENTS.LOCATION_SUNRISE.textContent = millisecondsToDate(data.sys.sunrise);
		UI_ELEMENTS.LOCATION_SUNSET.textContent = millisecondsToDate(data.sys.sunset);
		UI_ELEMENTS.CITY_INPUT.value = CONSTS_VALUES.EMPTY_VALUE;
	}catch (error) {
		alert(error);
	}
}

async function makeRequestInTime(weatherInTimeListUI, cityName){
    try{
        if (!cityName) throw new Error(CONSTS_VALUES.ERROR_EMPTY_INPUT);

        const data = await getRequest(cityName, forecastUrl);
        сreateInTimeUI(weatherInTimeListUI, data);
    }catch (error) {
        alert(error);
    } 
}
