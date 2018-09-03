const queryString = require('query-string')

export function fixEmptyValue(value, defaultValue) {

  if (isEmptyValue(value)) {
    return defaultValue
  }
  
  return value
}

export function isEmptyValue(value){
  return (typeof value === 'undefined' || value === "")
}

export function getFontColour(editMode) {

  if (editMode) { 
    return "#1565c0"
  }
  else {
    return "black"
  }
}

export function readFiltersFromURL(){

  let params = []

  let subStart = location.hash.indexOf("?")
  if(subStart >= 0){
    params = queryString.parse(location.hash.substring(location.hash.indexOf("?") + 1, location.hash.length))
  }

  return params
}

export function GetUID() {
  return Math.random().toString().substr(2, 9)
}