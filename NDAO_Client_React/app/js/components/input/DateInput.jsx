'use strict'

import React from 'react'
import { Tooltip } from 'mdbreact'
import * as globalFunctions from '../../globalFunctions'
import { DatePicker } from 'antd'

import moment from 'moment';

// Properties:
//  - label : Component label
//  - tooltip : Tooltip
//  - value : String/text value
//  - callback : callback to send filter value
//  - allowEdit : Toggle enabled/disabled

class DateInput extends React.Component {

  constructor(props) {
    super(props);

    this.onChange = this.onChange.bind(this)
  }

  onChange(date, dateString) {

    let { callback } = this.props
    if (typeof callback !== 'undefined') {
      callback(dateString)
    }
  }

  render() {

    let { label, tooltip, value, allowEdit, allowClear, placeholder } = this.props

    placeholder = globalFunctions.fixEmptyValue(placeholder, "Select date...")
    label = globalFunctions.fixEmptyValue(label, "")
    tooltip = globalFunctions.fixEmptyValue(tooltip, "")
    allowEdit = globalFunctions.fixEmptyValue(allowEdit, true)
    allowClear = globalFunctions.fixEmptyValue(allowClear, true)
    value = globalFunctions.fixEmptyValue(value, null) //globalFunctions.fixEmptyValue(value, new Date().toLocaleDateString("en-ZA", { year: 'numeric', month: 'numeric', day: 'numeric' })) 

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

        <DatePicker
          placeholder={placeholder}
          disabled={!allowEdit}
          value={value !== null ? moment(value, 'YYYY/MM/DD') : value}
          style={{ width: "100%" }}
          onChange={this.onChange}
          allowClear={allowClear}
        />
      </>
    )
  }
}

export default DateInput