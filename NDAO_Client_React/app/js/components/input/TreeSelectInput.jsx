'use strict'

import React from 'react'
import { Tooltip } from 'mdbreact'
import * as globalFunctions from '../../globalFunctions'
import { TreeSelect } from 'antd'

//AntD Tree-Select
// import TreeSelect from 'antd/lib/tree-select'
// import '../../../css/antd.tree-select.css' //Overrides default antd.tree-select css
// import '../../../css/antd.select.css' //Overrides default antd.select css
const TreeSelectNode = TreeSelect.TreeNode;

// Properties:
//  - label : Component label
//  - tooltip : Tooltip
//  - value : String/text value
//  - data : Data for list >> 
//           [{id: 1, text: "Parent1", children: [{id: 11, text: "Child1"}, {id: 12, text: "Child2"}]}, {id: 2, text: "Parent2"}]
//  - callback : callback to send filter value
//  - allowEdit : Toggle enabled/disabled

class TreeSelectInput extends React.Component {

  constructor(props) {
    super(props);
  }

  renderTreeSelectNodes(data) {

    let { transform } = this.props

    if (typeof data !== 'undefined') {
      return data.map((item) => {

        if (typeof transform !== 'undefined') {
          item = transform(item)
        }

        let valCol = "text"
        if (!item.text) valCol = "value"

        if (item.children) {
          return (
            <TreeSelectNode value={item[valCol]} title={item[valCol]} key={item.id}>
              {this.renderTreeSelectNodes(item.children)}
            </TreeSelectNode>
          )
        }
        return <TreeSelectNode value={item[valCol]} title={item[valCol]} key={item.id} />
      })
    }
  }

  //Performs a recursive search by Id and
  //returns the corresponding value/text
  getValueById(data, id) {

    let { transform } = this.props

    if (data && data.length > 0) {

      for (let item of data) {

        let tItem = transform(item)

        if (tItem.id == id) {
          return tItem.text
        }
        else if (tItem.children && tItem.children.length > 0) {
          let tmpVal = this.getValueById(tItem.children, id)
          if (tmpVal !== id) {
            return tmpVal
          }
        }

      }
    }

    return id
  }

  onChange(value, label, extra) {

    this.setState({ value: value })

    let { callback, multiple } = this.props

    if (typeof callback !== 'undefined') {

      if (!multiple) {
        if (typeof extra.triggerNode !== 'undefined') {
          callback({ id: extra.triggerNode.props.eventKey, text: value })
        }
        else {
          callback({ id: 0, text: "" })
        }
      }
      else {
        callback(value)
      }

    }
  }

  render() {

    let { label, tooltip, data, allowEdit, placeHolder, allowClear, style, value, multiple } = this.props

    //Attempt to get the actual value
    if (typeof value === 'undefined' || value === "" || value === null || value === 0) {
      value = undefined
    }
    else {
      value = this.getValueById(data, value)
    }

    //Ensure value is not a number
    if(!isNaN(value)){
      value = value.toString()
    }

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

        <TreeSelect
          multiple={multiple}
          disabled={!allowEdit}
          showSearch
          searchPlaceholder="Search..."
          style={{ width: "100%", ...style }}
          value={value}
          dropdownStyle={{ maxHeight: 250, overflow: 'auto', paddingRight: "20px" }}
          placeholder={placeHolder}
          allowClear={allowClear}
          onChange={this.onChange.bind(this)}
        >
          {this.renderTreeSelectNodes(data)}
        </TreeSelect>
      </>
    )
  }
}

export default TreeSelectInput