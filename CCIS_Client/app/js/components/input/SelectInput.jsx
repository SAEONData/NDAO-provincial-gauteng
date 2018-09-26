'use strict'

import React from 'react'
import { Tooltip } from 'mdbreact'
import * as globalFunctions from '../../globalFunctions'

//AntD Select
import Select from 'antd/lib/select'
import '../../../css/antd.select.css' //Overrides default antd.select css
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

    this.state = { value: undefined }
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
    //Init state
    let { value } = this.props

    if (globalFunctions.isEmptyValue(value)) {
      value = ""
    }

    this.setState({ value: value })
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

    let { label, tooltip, data, allowEdit, placeHolder, allowClear, style } = this.props
    let { value } = this.state

    if (typeof value === 'undefined' || value === "" || value === null) {
      value = undefined
    }

    // label = globalFunctions.fixEmptyValue(label, "Label:")
    tooltip = globalFunctions.fixEmptyValue(tooltip, "")
    allowEdit = globalFunctions.fixEmptyValue(allowEdit, true)
    placeHolder = globalFunctions.fixEmptyValue(placeHolder, "Select...")
    allowClear = globalFunctions.fixEmptyValue(allowClear, true)
    style = globalFunctions.fixEmptyValue(style, {})

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
          dropdownStyle={{ maxHeight: 250, overflow: 'auto' }}
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