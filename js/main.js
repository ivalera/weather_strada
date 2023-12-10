import { makeRequest, getRequest } from './requests.js';
import { UI_ELEMENTS } from './ui_elements.js';
import { CONSTS_VALUES } from './consts.js';
import { firstLetterToUpperCase, millisecondsToDate, latinToCyrillic } from './tools.js';

const DEFAULT_CITY = 'Москва';

let favoriteCities = ['Архонская', 'Владикавказ', 'Санкт-Петербург', 'Чита', 'Краснодар'];

UI_ELEMENTS.WEATHER_FROM.addEventListener('submit', getWeather);
UI_ELEMENTS.FAVORITE_CITY.addEventListener('click', addFavoriteCity);

makeRequest(DEFAULT_CITY);
render(favoriteCities, UI_ELEMENTS.WEATHER_CITIES_LIST);
renderInTime(UI_ELEMENTS.WATHER_INTIME_LIST, DEFAULT_CITY);

function getWeather(event){
    event.preventDefault();

    const inputValue =  UI_ELEMENTS.CITY_INPUT.value.trim();
    let cityName = inputValue;
    cityName = firstLetterToUpperCase(cityName);
    
    makeRequest(cityName);
    renderInTime(UI_ELEMENTS.WATHER_INTIME_LIST, cityName);

    event.target.reset();
}

function render(favoriteCitiesList, favoriteCitiesListUI){
    removeFavoriteCities(favoriteCitiesListUI);
    addCitiesUI(favoriteCitiesList, favoriteCitiesListUI);
}

function removeFavoriteCities(favoriteCitiesListUI){
    let countFavoriteCities = favoriteCitiesListUI.childElementCount;
    while(countFavoriteCities > 0){
        favoriteCitiesListUI.children[0].remove();
        countFavoriteCities--;
    }
}

function addCitiesUI(favoriteCitiesList, favoriteCitiesListUI) {
    for (let i = 0; i < favoriteCitiesList.length; i++) {
        const cityAdd = document.createElement("li");
        const cityDeleteBtn = document.createElement("button");
        const closeImgBtn = document.createElement("img");
  
        cityAdd.classList.add("weather__сity-item");
        cityDeleteBtn.classList.add("weather__remove-btn");
        cityAdd.textContent = favoriteCitiesList[i];
        closeImgBtn.src = "./img/close-icon.svg";
  
        cityDeleteBtn.append(closeImgBtn);
        cityAdd.append(cityDeleteBtn);
        favoriteCitiesListUI.append(cityAdd);

        cityAdd.addEventListener('click', favoriteUpdate);
    }
}

function addFavoriteCity(){
    const cityActual = UI_ELEMENTS.ACTUAL_CITY.textContent;
    try {
        const isSuchCity = favoriteCities.find(city => city === cityActual);
        if (isSuchCity) {
            throw new Error(CONSTS_VALUES.ERROR_SUCH_CTIY);
        }
        favoriteCities.push(cityActual);
        render(favoriteCities, UI_ELEMENTS.WEATHER_CITIES_LIST);
    }catch(error){
        alert(error);
    }
}

function favoriteUpdate(event){
    const clickedCity = event.currentTarget;
    const selectedCity = event.currentTarget.childNodes[0].data;
    const cityDeleteBtn = event.currentTarget.childNodes[1];
    const deleteImgBtn = event.currentTarget.childNodes[1].childNodes[0];
  
    if (event.target === clickedCity) {
        makeRequest(selectedCity);
        renderInTime(UI_ELEMENTS.WATHER_INTIME_LIST, selectedCity)
    }

    if (event.target === cityDeleteBtn || event.target === deleteImgBtn) {
        clickedCity.removeEventListener("click", favoriteUpdate);
        favoriteCities = favoriteCities.filter(city => city !== selectedCity);
        console.log(favoriteCities);
        render(favoriteCities, UI_ELEMENTS.WEATHER_CITIES_LIST);
    }
}

function renderInTime(weatherInTimeListUI, city){
    removeInTimeList(weatherInTimeListUI);
    makeRequestInTime(weatherInTimeListUI, city);
}

function removeInTimeList(weatherInTimeListUI){
    let countInTime = weatherInTimeListUI.childElementCount;
    while(countInTime > 0){
        weatherInTimeListUI.children[0].remove();
        countInTime--;
    }
}

function makeRequestInTime(weatherInTimeListUI, cityName){
    try{
        if(!cityName) throw new(Error('No city!'));
        getRequest(cityName, 'http://api.openweathermap.org/data/2.5/forecast')
            .then(data =>{
                сreateInTimeUI(weatherInTimeListUI, data)
            });
    }catch (error) {
        alert(error);
    }
    
}

function сreateInTimeUI(weatherInTimeListUI, data) {
    for (let i = 1; i <= 3; i++) {
        const addInTime = document.createElement("li");
        const weatherCurrent = document.createElement("ul");
        const weatherTitle = document.createElement("li");
        const weatherTemperature = document.createElement("li");
        const weatherFeels = document.createElement("li");
        const weatherImg = document.createElement("img");
  
        addInTime.classList.add("weather__intime-elem");
        weatherCurrent.classList.add("weather__intime-current");
        weatherTitle.classList.add("weather__intime-title");
        weatherTemperature.classList.add("weather__intime-temperature");
        weatherFeels.classList.add("weather__intime-feels");
        weatherImg.classList.add("weather__img-current");
        
        weatherTitle.textContent = millisecondsToDate(data.list[i].dt);
        weatherTemperature.textContent = "Температура: " + data.list[i].main.temp.toFixed() + CONSTS_VALUES.DEGREE_SYMBOL;
        weatherFeels.textContent = "Ощущается как: " + data.list[i].main.feels_like.toFixed() + CONSTS_VALUES.DEGREE_SYMBOL;
        weatherImg.src = `https://openweathermap.org/img/wn/${data.list[i].weather[0].icon}@2x.png`;
  
        addInTime.append(weatherCurrent);
        weatherCurrent.append(weatherTitle);
        weatherCurrent.append(weatherTemperature);
        weatherCurrent.append(weatherFeels);
        addInTime.append(weatherImg);
        weatherInTimeListUI.append(addInTime);
    }
}
