export { firstLetterToUpperCase, latinToCyrillic };

function firstLetterToUpperCase(value){
  if(value[0] != value.toUpperCase()){
    return value.charAt(0).toUpperCase() + value.slice(1);
  }
}
function latinToCyrillic(city) {
  const isRegisterInUpperCase = (symbol) => symbol === symbol.toUpperCase()
  const translit = {
    'a': 'а',
    'b': 'б',
    'v': 'в',
    'w': 'в',
    'g': 'г',
    'd': 'д',
    'e': 'е',
    'jo': 'ё',
    'yo': 'ё',
    'ö': 'ё',
    'zh': 'ж',
    'z': 'з',
    'i': 'и',
    'j': 'й',
    'k': 'к',
    'l': 'л',
    'm': 'м',
    'n': 'н',
    'o': 'о',
    'p': 'п',
    'r': 'р',
    's': 'с',
    't': 'т',
    'u': 'у',
    'f': 'ф',
    'h': 'х',
    'x': 'х',
    'c': 'ц',
    'ch': 'ч',
    'sh': 'ш',
    'shh': 'щ',
    '#': 'ъ',
    'y': 'ы',
    '\'': 'ь',
    'je,ä': 'э',
    'ä': 'э',
    'ju': 'ю',
    'yu': 'ю',
    'ü': 'ю',
    'ja': 'я',
    'ya': 'я',
    'q': 'я'
  }

  for (let i = 0, j = city.length; i < j; i++) {
    if (isRegisterInUpperCase(city[i]) && translit[city[i].toLowerCase()]) {
      city = city.replace(city[i], translit[city[i].toLowerCase()].toUpperCase())
    } else if (translit[city[i]]) {
      city = city.replace(city[i], translit[city[i]])
    }
  }
  return city
}