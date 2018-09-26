import React from 'react'
import { DEAGreen, Red, Amber, Green} from './config/colours.cfg'
const queryString = require('query-string')

export function fixEmptyValue(value, defaultValue) {

  if (isEmptyValue(value)) {
    return defaultValue
  }
  
  return value
}

export function isEmptyValue(value){
  return (typeof value === 'undefined' || value === "" || value === undefined)
}

export function getFontColour(editMode) {

  if (editMode) { 
    return DEAGreen //"#1565c0"
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

// http://guid.us/GUID/JavaScript  
export function GetUID() {
  //return Math.random().toString().substr(2, 9)
  function S4() {  
    return (((1+Math.random())*0x10000)|0).toString(16).substring(1);  
  }  
  return (S4() + S4() + "-" + S4() + "-4" + S4().substr(0,3) + "-" + S4() + "-" + S4() + S4() + S4()).toLowerCase();  
}

export function getPartColour(value) {
  switch (value) {
    case "R":
      return Red
    case "A":
      return Amber
    case "G":
      return Green
  }
}

export function StringToHTML(strVal) {

  if (typeof strVal === 'undefined') {
    return <div><p></p></div>
  }
  else if (strVal.includes("\n")) {
    return (
      <div>
        {strVal.split("\n").map(x => <p>{x}</p>)}
      </div>
    )
  }
  else {
    return (
      <div>
        <p>{strVal}</p>
      </div>
    )
  }
}

export const wait = ms => new Promise((r, j) => setTimeout(r, ms))