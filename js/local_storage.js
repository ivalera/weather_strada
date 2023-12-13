export { saveCurrentCity, getSaveCity, saveCities, getSaveCitiesList }

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

function saveCities(citiesList){
    console.log(typeof(citiesList));
    localStorage.setItem('citiesList', JSON.stringify([...citiesList]));
}

function getSaveCitiesList(){
    return JSON.parse(localStorage.getItem('citiesList')) || [];
}
