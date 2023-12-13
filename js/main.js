import { makeRequest, makeRequestInTime } from './requests.js';
import { UI_ELEMENTS } from './ui_elements.js';
import { CONSTS_VALUES } from './consts.js';
import { firstLetterToUpperCase, latinToCyrillic } from './tools.js';
import { saveCities, saveCurrentCity, getSaveCity, getSaveCitiesList} from './local_storage.js';
import { addCitiesUI, fullFavoriteBtn } from './view.js';
export { favoriteUpdate };

let defaultCity = 'Москва';
let favoriteCities = new Set(getSaveCitiesList());

UI_ELEMENTS.WEATHER_FROM.addEventListener('submit', getWeather);
UI_ELEMENTS.FAVORITE_CITY_BTN.addEventListener('click', addFavoriteCity);

makeRequest(getSaveCity(defaultCity));
render(Array.from(favoriteCities), UI_ELEMENTS.WEATHER_CITIES_LIST);
renderInTime(UI_ELEMENTS.WATHER_INTIME_LIST, getSaveCity(defaultCity));
fullFavoriteBtn(favoriteCities, getSaveCity(defaultCity), UI_ELEMENTS.FAVORITE_CITY_BTN);

function getWeather(event){
    event.preventDefault();

    const inputValue =  UI_ELEMENTS.CITY_INPUT.value.trim();
    let cityName = inputValue;
    cityName = firstLetterToUpperCase(cityName);
    
    makeRequest(cityName);
    renderInTime(UI_ELEMENTS.WATHER_INTIME_LIST, cityName);
    fullFavoriteBtn(favoriteCities, cityName, UI_ELEMENTS.FAVORITE_CITY_BTN);

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

function addFavoriteCity(){
    const cityActual = UI_ELEMENTS.ACTUAL_CITY.textContent;
    try {
        if (favoriteCities.has(cityActual)) {
            throw new Error(CONSTS_VALUES.ERROR_SUCH_CTIY);
        }
        favoriteCities.add(cityActual);
        render(Array.from(favoriteCities), UI_ELEMENTS.WEATHER_CITIES_LIST);
        saveCities(favoriteCities); 
        fullFavoriteBtn(favoriteCities, cityActual, UI_ELEMENTS.FAVORITE_CITY_BTN);
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
        saveCurrentCity(selectedCity);
        fullFavoriteBtn(favoriteCities, selectedCity, UI_ELEMENTS.FAVORITE_CITY_BTN);
    }
    if (event.target === cityDeleteBtn || event.target === deleteImgBtn) {
        clickedCity.removeEventListener("click", favoriteUpdate);
        favoriteCities.delete(selectedCity);
        render(Array.from(favoriteCities), UI_ELEMENTS.WEATHER_CITIES_LIST);
        saveCities(favoriteCities);
        fullFavoriteBtn(favoriteCities, selectedCity, UI_ELEMENTS.FAVORITE_CITY_BTN);
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
