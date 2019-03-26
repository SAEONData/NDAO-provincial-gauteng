import React from 'react'
import { Row, Col, Button } from 'mdbreact'
import { connect } from 'react-redux'
import MapsCarouselView from './MapsCarouselView.jsx'
import SARVA from '../../Tools/SARVA.jsx'

const mapStateToProps = (state, props) => {
  return {}
}

const mapDispatchToProps = (dispatch) => {
  return {}
}

class SARVA_Preview extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      showSARVA: false
    }
  }

  render() {

    let { showSARVA } = this.state

    return (
      <div style={{ backgroundColor: "white", border: "1px solid gainsboro", borderRadius: "10px", height: "437px" }}>

        <h4 style={{ margin: "10px 5px 0px 19px", display: "inline-block" }}>
          <b>Risk and Vulnerability</b>
        </h4>
        <hr style={{ marginTop: "10px", marginBottom: "2px" }} />
        <MapsCarouselView clickCallback={() => { this.setState({ showSARVA: true }) }} />

        {showSARVA && <SARVA closeCallback={() => { this.setState({ showSARVA: false }) }} />}

      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SARVA_Preview)