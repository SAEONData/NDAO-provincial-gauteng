import React from 'react'
import { DEAGreen } from "../../../config/colours.js"

class LessInfoBtn extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {

    let { infoSection, callback, scrollUp } = this.props

    return (
      <>
        <h5
          style={{ marginBottom: "0px", marginLeft: 2, color: DEAGreen, cursor: "pointer" }}
          onClick={() => {
            callback(infoSection)
          }} >
          <div style={{ fontWeight: "bold", marginRight: "15px", marginTop: 12 }}>
            <u>
              {infoSection === true ? "Less" : "More"} Information...
              </u>
            <i className={!infoSection ? 'fa fa-angle-down rotate-icon' : 'fa fa-angle-up'}></i>
          </div>

        </h5>
      </>
    )
  }
}

export default LessInfoBtn