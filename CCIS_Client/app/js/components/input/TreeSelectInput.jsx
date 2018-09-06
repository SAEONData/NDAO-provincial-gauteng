'use strict'

import React from 'react'
import { Tooltip } from 'mdbreact'
import * as globalFunctions from '../../globalFunctions'

//AntD Tree-Select
import TreeSelect from 'antd/lib/tree-select'
import '../../../css/antd.tree-select.css' //Overrides default antd.tree-select css
import '../../../css/antd.select.css' //Overrides default antd.select css
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
    //Init state
    let { value } = this.props

    if (globalFunctions.isEmptyValue(value)) {
      value = ""
    }

    this.setState({ value: value })
  }

  renderTreeSelectNodes(data) {

    if (typeof data !== 'undefined') {
      return data.map((item) => {
        if (item.children) {
          return (
            <TreeSelectNode value={item.text} title={item.text} key={item.id}>
              {this.renderTreeSelectNodes(item.children)}
            </TreeSelectNode>
          )
        }
        return <TreeSelectNode value={item.text} title={item.text} key={item.id} />
      })
    }
  }

  onChange(value, label, extra) {

    this.setState({ value: value })

    let { callback } = this.props
    if (typeof callback !== 'undefined') {
      if (typeof extra.triggerNode !== 'undefined') {
        callback({ id: extra.triggerNode.props.eventKey, text: value })
      }
      else {
        callback({ id: 0, text: "" })
      }
    }
  }

  render() {

    let { label, tooltip, data, allowEdit, placeHolder } = this.props
    let { value } = this.state

    if (typeof value === 'undefined' || value === "" || value === null) {
      value = undefined
    }

    // label = globalFunctions.fixEmptyValue(label, "Label:")
    tooltip = globalFunctions.fixEmptyValue(tooltip, "")
    allowEdit = globalFunctions.fixEmptyValue(allowEdit, true)
    placeHolder = globalFunctions.fixEmptyValue(placeHolder, "Select...")

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
          disabled={!allowEdit}
          showSearch
          searchPlaceholder="Search..."
          style={{ width: "100%" }}
          value={value}
          dropdownStyle={{ maxHeight: 250, overflow: 'auto' }}
          placeholder={placeHolder}
          allowClear
          onChange={this.onChange.bind(this)}
        >
          {this.renderTreeSelectNodes(data)}
        </TreeSelect>
      </>
    )
  }
}

export default TreeSelectInput