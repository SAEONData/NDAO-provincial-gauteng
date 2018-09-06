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

    this.state = { value: "" }
  }

  componentDidMount() {

    this.setInternalValue()
  }

  componentDidUpdate() {

    if (globalFunctions.isEmptyValue(this.state.value) && !globalFunctions.isEmptyValue(this.props.value)) {
      this.setInternalValue()
    }
  }

  setInternalValue() {

    let { value } = this.props

    if (globalFunctions.isEmptyValue(value)) {
      value = ""
    }

    this.setState({ value: value })
  }

  onChange(event) {

    //Update internal state
    this.setState({ value: event.target.value })

    let { callback } = this.props

    if (typeof callback !== 'undefined') {
      callback(event.target.value)
    }
  }

  render() {

    let { label, tooltip, allowEdit, hint, type, width, height } = this.props
    let { value } = this.state

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
          value={value} />
      </>
    )
  }
}

export default TextInput