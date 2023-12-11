export { saveCities, saveCurrentCity, getSaveCity, getSaveCitiesList }

function saveCities(citiesList){
    localStorage.setItem('citiesList', JSON.stringify(citiesList));
}

function saveCurrentCity(city){
    localStorage.setItem('currentCity', city);
}

function getSaveCity(city){
    let saveCity = localStorage.getItem('currentCity');
    if(saveCity){
        city = saveCity;
    }
    return city;
}

function getSaveCitiesList(citiesList){
    let saveCitiesList = JSON.parse(localStorage.getItem('citiesList'));
    if(saveCitiesList){
        citiesList = saveCitiesList;
    }
    return citiesList;
}
