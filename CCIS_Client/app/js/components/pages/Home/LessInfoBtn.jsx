import React from 'react'
import { DEAGreen } from "../../../config/colours.cfg"

class LessInfoBtn extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {

    let { infoSection, callback, scrollUp } = this.props

    return (
      <>
        <h5
          style={{ marginBottom: "0px", color: DEAGreen, cursor: "pointer" }}
          onClick={() => {

            if (scrollUp) {
              window.scroll({
                top: 465,
                left: 0,
                behavior: 'smooth'
              })
            }

            setTimeout(() => {
              callback(infoSection)
            }, (scrollUp ? 600 : 0))
          }} >
          <b style={{ marginRight: "15px" }}>
            <u>
              {infoSection === true ? "Less" : "More"} Information...
              </u>
          </b>
          <i className={!infoSection ? 'fa fa-angle-down rotate-icon' : 'fa fa-angle-up'}></i>
        </h5>
      </>
    )
  }
}

export default LessInfoBtn