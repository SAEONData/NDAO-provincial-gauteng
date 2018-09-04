'use strict'

import React from 'react'
import * as globalFunctions from '../../globalFunctions'

// Properties:
//  - source : Component label
//  - width : Width; Default - 100%
//  - height : Height; Default - 500px
//  - showSource: Toggle display source link; Default - false

class HostedContentFrame extends React.Component {

  constructor(props) {
    super(props);

  }

  render() {

    let { source, width, height, showSource } = this.props

    source = globalFunctions.fixEmptyValue(source, "http://www.example.com")
    width = globalFunctions.fixEmptyValue(width, "100%")
    height = globalFunctions.fixEmptyValue(height, "600px")
    showSource = globalFunctions.fixEmptyValue(showSource, false)

    return (
      <div>
        <iframe
          style={{
            width: width,
            height: height,
            margin: "0px",
            border: "1px solid gainsboro"
          }}
          src={source}
        />

        <span hidden={!showSource} style={{ fontSize: "small", fontStyle: "italic" }}>
          &nbsp;source: <a href={source} target="#"><u>{source}</u></a>
        </span>

      </div>
    )
  }
}

export default HostedContentFrame