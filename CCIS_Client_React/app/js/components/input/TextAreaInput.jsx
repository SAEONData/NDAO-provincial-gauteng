'use strict'

import React from 'react'
import { Tooltip } from 'mdbreact'
import TextareaAutosize from "react-textarea-autosize"
import * as globalFunctions from '../../globalFunctions'

//Requires: react-textarea-autosize

// Properties:
//  - label : Component label
//  - tooltip : Tooltip
//  - value : String/text value
//  - callback : callback to send filter value
//  - allowEdit : Toggle enabled/disabled

class TextAreaInput extends React.Component {

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

    let { label, tooltip, allowEdit, width, height, value } = this.props

    tooltip = globalFunctions.fixEmptyValue(tooltip, "")
    allowEdit = globalFunctions.fixEmptyValue(allowEdit, true)
    width = globalFunctions.fixEmptyValue(width, "100%")
    height = globalFunctions.fixEmptyValue(height, "100%")

    return (
      <>
        {label &&
          <div>
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
          </div>
        }

        <TextareaAutosize
          rows={5}
          readOnly={!allowEdit}
          style={{ marginLeft: "0px", marginRight: "0px", marginTop: "0px", width: width, height: height, fontSize: "15px", border: "1px solid lightgrey", borderRadius: "5px", padding: "5px" }}
          value={value}
          onChange={this.onChange.bind(this)}
        />
      </>
    )
  }
}

export default TextAreaInput