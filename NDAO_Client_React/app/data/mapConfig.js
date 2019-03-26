import { siteBaseURL, apiBaseURL } from '../js/config/serviceURLs.js'

export const MapConfig = {
  "service": `${apiBaseURL}goals/extensions.geojson`,
  "domain": siteBaseURL,
  "IDField": "properties.id",
  "toolTipTitle": "properties.title",
  "toolTipFields": [
    {
      "field": "properties.year",
      "alias": "Year"
    },
    {
      "field": "properties.institution",
      "alias": "Institution"
    }
  ],
  "styleField": "properties.status",
  "styles": [
    {
      "value": "",
      "title": "StatusUnknown",
      "default": true,
      "strokeWidth": 1,
      "strokeColor": "rgba(192,192,192,0.5)", //grey
      "fillColor": "rgba(192,192,192,0.3)"
    },
    {
      "value": "R",
      "title": "StatusRed",
      "strokeWidth": 1,
      "strokeColor": "rgba(223,1,1,0.5)", //red
      "fillColor": "rgba(223,1,1,0.3)"
    },
    {
      "value": "A",
      "title": "StatusAmber",
      "strokeWidth": 1,
      "strokeColor": "rgba(255,187,51,0.5)", //orange
      "fillColor": "rgba(255,187,51,0.3)"
    },
    {
      "value": "G",
      "title": "StatusGreen",
      "strokeWidth": 1,
      "strokeColor": "rgba(61,145,64,0.5)", //green
      "fillColor": "rgba(61,145,64,0.3)"
    }
  ]
}