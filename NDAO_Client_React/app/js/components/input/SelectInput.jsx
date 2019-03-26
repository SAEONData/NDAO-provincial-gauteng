'use strict'

import React from 'react'
import { Tooltip } from 'mdbreact'
import * as globalFunctions from '../../globalFunctions'
import { Select } from 'antd'

//AntD Select
// import Select from 'antd/lib/select'
// import '../../../css/antd.select.css' //Overrides default antd.select css
const Option = Select.Option;

// Properties:
//  - label : Component label
//  - tooltip : Tooltip
//  - value : String/text value
//  - data : Data for list >> 
//           [{id: 1, text: "Parent1", children: [{id: 11, text: "Child1"}, {id: 12, text: "Child2"}]}, {id: 2, text: "Parent2"}]
//  - callback : callback to send filter value
//  - allowEdit : Toggle enabled/disabled

class SelectInput extends React.Component {

  constructor(props) {
    super(props);
  }

  renderSelectNodes(data) {

    if (typeof data !== 'undefined') {
       return data.map(i => {
        return (
          <Option key={i.id} value={i.text}>
            {i.text}
          </Option>
        )
      })
    }
  }

  onChange(value) {

    let { data } = this.props

    this.setState({ value: value })

    let { callback } = this.props
    if (typeof callback !== 'undefined') {

      if (value !== 'undefined' && value !== undefined) {
        callback({ id: data.filter(x => x.text === value)[0].id, text: value })
      }
      else {
        callback({ id: 0, text: "" })
      }

    }
  }

  render() {

    let { label, tooltip, data, allowEdit, placeHolder, allowClear, style, dropdownStyle, value } = this.props

    if (typeof value === 'undefined' || value === "" || value === null) {
      value = undefined
    }

    // label = globalFunctions.fixEmptyValue(label, "Label:")
    tooltip = globalFunctions.fixEmptyValue(tooltip, "")
    allowEdit = globalFunctions.fixEmptyValue(allowEdit, true)
    placeHolder = globalFunctions.fixEmptyValue(placeHolder, "Select...")
    allowClear = globalFunctions.fixEmptyValue(allowClear, true)
    style = globalFunctions.fixEmptyValue(style, {})
    dropdownStyle = globalFunctions.fixEmptyValue(dropdownStyle, {})

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

        <Select
          disabled={!allowEdit}
          showSearch
          searchPlaceholder="Search..."
          style={{ width: "100%", ...style }}
          value={value}
          dropdownStyle={{ maxHeight: "250px", overflow: 'auto', ...dropdownStyle }}
          placeholder={placeHolder}
          allowClear={allowClear}
          onChange={this.onChange.bind(this)}
        >
          {this.renderSelectNodes(data)}
        </Select>
      </>
    )
  }
}

export default SelectInput