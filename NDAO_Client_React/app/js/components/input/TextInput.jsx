'use strict'

import React from 'react'
import { Input, Tooltip } from 'mdbreact'
import * as globalFunctions from '../../globalFunctions'

// Properties:
//  - label : Component label
//  - tooltip : Tooltip
//  - value : String/text value
//  - callback : callback to send filter value
//  - allowEdit : Toggle enabled/disabled

class TextInput extends React.Component {

  constructor(props) {
    super(props);

  }

  onChange(event) {

    let { callback } = this.props
    if (typeof callback !== 'undefined') {
      callback(event.target.value)
    }
  }

  render() {

    let { label, tooltip, allowEdit, hint, type, width, height, value, readOnly } = this.props

    label = globalFunctions.fixEmptyValue(label, "")
    tooltip = globalFunctions.fixEmptyValue(tooltip, "")
    allowEdit = globalFunctions.fixEmptyValue(allowEdit, true)
    value = globalFunctions.fixEmptyValue(value, "")
    hint = globalFunctions.fixEmptyValue(hint, "")
    type = globalFunctions.fixEmptyValue(type, "text")
    width = globalFunctions.fixEmptyValue(width, "100%")
    height = globalFunctions.fixEmptyValue(height, "100%")

    return (
      <>
        {label !== "" && <div style={{ marginBottom: "8px" }}>
          <div hidden={tooltip === ""}>
            <Tooltip
              placement="top"
              component="label"
              tooltipContent={tooltip}>
              <b style={{ color: globalFunctions.getFontColour(allowEdit) }}>{label}</b>
            </Tooltip>
          </div>
          <div hidden={tooltip !== ""}>
            <b style={{ color: globalFunctions.getFontColour(allowEdit) }}>{label}</b>
          </div>
        </div>}

        <Input disabled={!allowEdit} size="sm"
          style={{ marginLeft: "0px", marginRight: "0px", marginTop: "-25px", width: width, height: height, fontSize: "15px", border: "1px solid lightgrey", borderRadius: "5px", padding: "5px" }}
          onChange={this.onChange.bind(this)} hint={hint} type={type}
          value={value} readOnly={readOnly} />
      </>
    )
  }
}

export default TextInput