export { сreateInTimeUI, addCitiesUI, fullFavoriteBtn };
import { CONSTS_VALUES } from './consts.js';
import { millisecondsToDate, removeMinuse } from './tools.js';
import { favoriteUpdate } from './main.js';
import { UI_ELEMENTS } from './ui_elements.js';

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

function сreateInTimeUI(weatherInTimeListUI, data) {
    for (let i = 0; i <= 2; i++) {
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
        weatherTemperature.textContent = "Температура: " + removeMinuse(data.list[i].main.temp.toFixed()) + CONSTS_VALUES.DEGREE_SYMBOL;
        weatherFeels.textContent = "Ощущается как: " +  removeMinuse(data.list[i].main.feels_like.toFixed()) + CONSTS_VALUES.DEGREE_SYMBOL;
        weatherImg.src = `https://openweathermap.org/img/wn/${data.list[i].weather[0].icon}@2x.png`;
  
        addInTime.append(weatherCurrent);
        weatherCurrent.append(weatherTitle);
        weatherCurrent.append(weatherTemperature);
        weatherCurrent.append(weatherFeels);
        addInTime.append(weatherImg);
        weatherInTimeListUI.append(addInTime);
    }
}

function fullFavoriteBtn(favList, city, btnUI){
    if(favList.has(city)){
        btnUI.style.background = 'url(./img/heart-full.svg)';
        btnUI.style.backgroundRepeat = 'no-repeat';
        UI_ELEMENTS.FAVORITE_CITY_BTN.style.backgroundPosition = 'center';
    }else{
        btnUI.style.background = 'url(./img/heart.svg)';
        btnUI.style.backgroundRepeat = 'no-repeat';
        btnUI.style.backgroundPosition = 'center';
    }
}
