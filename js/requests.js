import { UI_ELEMENTS } from './ui_elements.js';
import { CONSTS_VALUES } from './consts.js';
export { makeRequest};

const serverUrl = 'http://api.openweathermap.org/data/2.5/weather';
const apiKey = 'f660a2fb1e4bad108d6160b7f58c555f';

function getRequest(city) {
	return fetch(`${serverUrl}?q=${city}&appid=${apiKey}&units=metric`)
		.then(response => { 
			switch(response.status){
			case 400:
		        throw new Error('Bad Request - неправильный запрос от клиента');
			case 404:
		        throw new Error('Такой город не найден!');
			case 500:
		        throw new Error('Internal Server Error - ошибка сервера ');
		    default: 
				return response.json();
			}
	    })
		.catch((error) => alert(error));
}

function makeRequest(cityName){
	try {
		if (!cityName) throw new Error(CONSTS_VALUES.ERROR_EMPTY_INPUT);
		getRequest(cityName)
			.then(data => {
				console.log(data);
				UI_ELEMENTS.LOCATION_TEMPERATURE.textContent = data.main.temp.toFixed() + CONSTS_VALUES.DEGREE_SYMBOL;
				UI_ELEMENTS.LOCATION_NAME.textContent = cityName;
				UI_ELEMENTS.WEATHER_ICON.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png`
			});
			UI_ELEMENTS.CITY_INPUT.value = '';
	} catch (error) {
		alert(error);
	}
}
