import { makeRequest } from './requests.js';
import { UI_ELEMENTS } from './ui_elements.js';
import { CONSTS_VALUES } from './consts.js';
import { firstLetterToUpperCase, latinToCyrillic } from './tools.js';

let favoriteCities = ['Владикавказ', 'Санкт-Петербург', 'Москва', 'Чита', 'Краснодар'];

UI_ELEMENTS.WEATHER_FROM.addEventListener('submit', getWeather);
UI_ELEMENTS.FAVORITE_CITY.addEventListener('click', addFavoriteCity);

makeRequest('Архонская');
render(favoriteCities, UI_ELEMENTS.WEATHER_CITIES_LIST);

function getWeather(event){
    event.preventDefault();

    const inputValue =  UI_ELEMENTS.CITY_INPUT.value.trim();
    let cityName = inputValue;
    cityName = firstLetterToUpperCase(cityName);
    
    makeRequest(cityName);

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
        cityDeleteBtn.classList.add("weather__list-city-close-btn");
        cityAdd.textContent = favoriteCitiesList[i];
        closeImgBtn.src = "./img/close-icon.svg";
  
        cityDeleteBtn.append(closeImgBtn);
        cityAdd.append(cityDeleteBtn);
        favoriteCitiesListUI.append(cityAdd);

        cityAdd.addEventListener('click', favoriteUpdate);
    }
}

function addFavoriteCity() {
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

  function favoriteUpdate(event) {
    const clickedCity = event.currentTarget;
    const selectedCity = event.currentTarget.childNodes[0].data;
    const cityDeleteBtn = event.currentTarget.childNodes[1];
    const deleteImgBtn = event.currentTarget.childNodes[1].childNodes[0];
  
    if (event.target === clickedCity) {
        makeRequest(selectedCity);
    }

    if (event.target === cityDeleteBtn || event.target === deleteImgBtn) {
        clickedCity.removeEventListener("click", favoriteUpdate);
        favoriteCities = favoriteCities.filter(city => city !== selectedCity);
        render(favoriteCities, UI_ELEMENTS.WEATHER_CITIES_LIST);
    }
  }
