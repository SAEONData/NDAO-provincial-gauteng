
//const _ = require('./ui_config.js')

export function UILookup(key, defaultLabel) {

  let searchConfig = _.ui_config.filter(x => x.key === key)

  if (searchConfig.length > 0) {
    return searchConfig[0]
  }
  else {
    return {
      key: key,
      label: typeof defaultLabel === 'undefined' ? "" : defaultLabel,
      tooltip: "",
      required: false
    }
  }
}

export const ui_config = [
  {
    key: "exampleKey1",
    label: "Example label 1:",
    tooltip2: "Example tooltip 1"
  },
  {
    key: "exampleKey2",
    label: "Example label 2:",
    tooltip: "Example tooltip 2A",
    tooltip2: "Example tooltip 2B"
  }
]