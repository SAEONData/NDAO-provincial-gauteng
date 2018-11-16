import React from 'react'
import { Row, Col, Button } from 'mdbreact'
import { connect } from 'react-redux'

//images
import popout from'../../../../Images/Icons/popout.png'
import popin from'../../../../Images/Icons/popin.png'
import static_maps_sa from '../../../../Images/Maps/static_maps_sa.png'

const mapStateToProps = (state, props) => {
  return {}
}

const mapDispatchToProps = (dispatch) => {
  return {}
}

class DashMapPreview extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {

    let { height, popCallback, fullView } = this.props

    return (
      <div style={{ backgroundColor: "white", padding: "10px", borderRadius: "10px", border: "1px solid gainsboro" }}>

        {/* <h4 style={{ margin: "5px 5px 0px 19px", display: "inline-block" }}>
          <b>Map</b>
        </h4> */}

        {/* <img
          src={popout}
          style={{
            width: "25px",
            float: "right",
            margin: "5px 5px 0px 0px",
            cursor: "pointer"
          }}
          onClick={() => { popCallback() }}
        /> */}

        <img
          src={ fullView ? popin : popout}
          style={{
            width: "25px",
            cursor: "pointer",
            position: "absolute",
            right: "23px",
            top: "8px",
            zIndex: 2
          }}
          onClick={() => { popCallback() }}
        />

        {/* <hr /> */}

        {/* <iframe
          style={{
            width: "100%",
            height: (height + "px"), //"400px",
            margin: "0px",
            border: "none"
          }}
          src={""}
        /> */}

        <div className="d-flex align-items-center flex-column justify-content-center">
          <img
            style={{
              // width: "100%",
              height: (height + "px"),
              margin: "0px",
              border: "none"
            }}
            src={static_maps_sa}
          />        
        </div>

      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DashMapPreview)