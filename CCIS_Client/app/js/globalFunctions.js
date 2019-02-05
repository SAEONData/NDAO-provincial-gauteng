import React from 'react'
import { DEAGreen } from './config/colours.js'
const queryString = require('query-string')

export function fixEmptyValue(value, defaultValue) {

  if (isEmptyValue(value)) {
    return defaultValue
  }
  
  return value
}

export function isEmptyValue(value){
  return (typeof value === 'undefined' || value === "" || value === undefined || value === null)
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

export function GetUID() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    var r = crypto.getRandomValues(new Uint8Array(1))[0] % 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
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


//-------------------------//
// Create and Read Cookies //
//-------------------------//

export function SaveCurrentUrl() {
  CreateCookie("ccis_last_url", document.URL, 1);
}

export function ReadLastUrl() {
  return ReadCookie("ccis_last_url")
}

export function CreateCookie(name, value, days) {
  if (days) {
    var date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    var expires = "; expires=" + date.toGMTString();
  }
  else {
    var expires = "";
  }
  document.cookie = name + "=" + value + expires + "; path=/";
}

export function ReadCookie(name) {
  var nameEQ = name + "="; var ca = document.cookie.split(';');
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1, c.length);
    }
    if (c.indexOf(nameEQ) == 0) {
      return c.substring(nameEQ.length, c.length);
    }
  }
  return null;
} 

export function TransformDataToTree(effectiveData, globalData, level = 0) {

  let treeNodes = []

  if (effectiveData && effectiveData.length > 0) {

    if (typeof globalData === 'undefined') {
      globalData = effectiveData
    }

    if (level === 0) {
      effectiveData = effectiveData.filter(x => x.additionalData.length === 0)
    }

    effectiveData.map(item => {

      let newTreeNode = {
        id: item.id,
        text: item.value
      }

      let children = globalData.filter(x => x.additionalData.length > 0 && x.additionalData[0].value == newTreeNode.id)
      if (children.length > 0) {
        newTreeNode.children = this.TransformDataToTree(children, globalData, (level + 1))
      }

      treeNodes.push(newTreeNode)
    })
  }

  return treeNodes
}