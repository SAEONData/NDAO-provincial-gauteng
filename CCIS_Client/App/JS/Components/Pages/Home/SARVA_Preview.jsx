import React from 'react'
import { Row, Col, Button } from 'mdbreact'
import { connect } from 'react-redux'
import popout from '../../../../images/popout.png'

const mapStateToProps = (state, props) => {
  return {}
}

const mapDispatchToProps = (dispatch) => {
  return {}
}

class SARVA_Preview extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div style={{ backgroundColor: "white", border: "1px solid gainsboro", borderRadius: "10px" }}>

        <h4 style={{ margin: "10px 5px 0px 19px", display: "inline-block" }}>
          <b>Progress</b>
        </h4>

        <img
          src={popout}
          style={{
            width: "25px",
            float: "right",
            margin: "10px 10px 0px 0px",
            cursor: "pointer"
          }}
        // onClick={() => { location.hash = "/map" }}
        />

        <hr style={{ marginTop: "10px" }} />

        <iframe
          style={{
            width: "100%",
            height: "360px",
            margin: "0px",
            border: "none"
          }}
          src={""}
        />

      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SARVA_Preview)