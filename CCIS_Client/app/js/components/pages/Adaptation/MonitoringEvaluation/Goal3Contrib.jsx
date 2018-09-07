'use strict'

import React from 'react'
import { connect } from 'react-redux'
import { Row, Col, Button, Input } from 'mdbreact'
import TextInput from '../../../input/TextInput.jsx'
import { DEAGreen, DEAGreenDark, Red, Amber, Green } from '../../../../config/colours.cfg'

import gear from '../../../../../images/gear.png'
import checklist from '../../../../../images/checklist.png'

const _gf = require('../../../../globalFunctions')

const mapStateToProps = (state, props) => {
  return {}
}

const mapDispatchToProps = (dispatch) => {
  return {
    updateNav: payload => {
      dispatch({ type: "NAV", payload })
    }
  }
}

class Goal3Contrib extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      hasChamp: false,
      hasFunding: false,
      radDissemination: 1,
      radMonitoring: 1,
      goalStatus: "R"
    }
  }

  componentDidMount() {
    this.props.updateNav(location.hash)
  }

  render() {

    let { goalStatus, radDissemination, radMonitoring } = this.state

    return (
      <>
        <Row style={{ marginLeft: "0px" }}>
          <Col md="12">
            <hr style={{ marginBottom: "15px", marginTop: "5px" }} />
          </Col>
          <Col md="1">
            <img src={gear} style={{ height: "40px", marginBottom: "10px", marginLeft: "0px", marginRight: "5px" }} />
          </Col>
          <Col md="11">
            <h5 style={{ marginTop: "8px" }}>
              Goal 3. Accurate climate information (e.g. historical trend data, seasonal predictions, 
              future projections, and early warning of extreme weather and other climate-related events) 
              provided by existing and new monitoring and forecasting facilities/networks (including their 
              maintenance and enhancement) to inform adaptation planning and disaster risk reduction. 
            </h5>
            <p style={{ marginTop: "20px", marginBottom: "2px" }}>
              <b>What is being monitored and evaluated:</b>
            </p>
            <ol style={{ marginLeft: "-15px" }}>
              <li>
                Historical climate trends; 
              </li>
              <li>
                fine-scale projections, forecasts (seasonal to inter-annual and intra-seasonal variability) 
                and early warning systems for provincial and municipal use; 
              </li>
              <li>
                dissemination and communication platforms for weather and climate-related events (e.g. SMS and  media); 
              </li>
              <li>
                utilisation  of data/information products by end-users; and 
              </li>
              <li>
                maintenance and enhancements of monitoring and forecasting facilities/networks.
              </li>
            </ol>
            <p style={{ marginTop: "20px", marginBottom: "2px" }}>
              <b>How it is being evaluated:</b>
            </p>
            <p style={{ marginBottom: "0px"}}>
              No dissemination and utilisation of weather and climate-related information
              <span style={{ color: Red }}><b> (red)</b></span>.
            </p>
            <p>
              Lack of monitoring and forecasting facilities/networks
              <span style={{ color: Red }}><b> (red)</b></span>.
            </p>
            <p style={{ marginBottom: "0px"}}>
              Dissemination but no utilisation of weather and climate-related information
              <span style={{ color: Amber }}><b> (amber)</b></span>.
            </p>
            <p>
              Monitoring facilities/networks exist but are not well-maintained or enhanced
              <span style={{ color: Amber }}><b> (amber)</b></span>.
            </p>
            <p style={{ marginBottom: "0px"}}>
              Dissemination and utilisation of weather and climate-related information at provincial, 
              municipal and community levels
              <span style={{ Green }}><b> (green)</b></span>.
            </p>
            <p>
              Monitoring facilities/networks exist and are maintained and enhanced
              <span style={{ color: Green }}><b> (green)</b></span>.
            </p>
          </Col>
          <Col md="12">
            <hr style={{ marginBottom: "20px", marginTop: "0px" }} />
          </Col>
        </Row>

        <Row style={{ marginLeft: "0px" }}>

          <Col md="1">
            <img src={checklist} style={{ height: "40px", marginBottom: "10px", marginLeft: "0px", marginRight: "5px" }} />
          </Col>
          <Col md="11">
            <h5 style={{ fontWeight: "bold", marginTop: "8px" }}>
              Goal 3 Assessment:
            </h5>
            <br />

            <Row>
              <Col md="12">
                <label style={{ fontWeight: "bold" }}>
                  3.1 Dissemination and utilization of climate change information?
                </label>
                <div style={{ marginLeft: "-22px", marginTop: "-10px" }}>
                  <Input
                    onClick={() => { this.setState({ radDissemination: 1 }) }}
                    checked={radDissemination === 1 ? true : false}
                    label="No dissemination and utilisation of weather and climate-related information."
                    type="radio"
                    id="radDiss1"
                  />
                  <Input
                    onClick={() => { this.setState({ radDissemination: 2 }) }}
                    checked={radDissemination === 2 ? true : false}
                    label="Dissemination but no utilisation of weather and climate-related information."
                    type="radio"
                    id="radDiss2"
                  />
                  <Input
                    onClick={() => { this.setState({ radDissemination: 3 }) }}
                    checked={radDissemination === 3 ? true : false}
                    label="Utilisation of weather and climate-related information at provincial, municipal and 
                            community levels."
                    type="radio"
                    id="radDiss3"
                  />
                </div>
              </Col>
            </Row>
            <br />

            <Row>
              <Col md="12">
                <label style={{ fontWeight: "bold" }}>
                3.2 Monitoring and forecasting facilities/networks?
                </label>
                <div style={{ marginLeft: "-22px", marginTop: "-10px" }}>
                  <Input
                    onClick={() => { this.setState({ radMonitoring: 1 }) }}
                    checked={radMonitoring === 1 ? true : false}
                    label="No monitoring and forecasting facilities/networks."
                    type="radio"
                    id="radMon1"
                  />
                  <Input
                    onClick={() => { this.setState({ radMonitoring: 2 }) }}
                    checked={radMonitoring === 2 ? true : false}
                    label="Monitoring facilities/networks exist but are not well-maintained or enhanced."
                    type="radio"
                    id="radMon2"
                  />
                  <Input
                    onClick={() => { this.setState({ radMonitoring: 3 }) }}
                    checked={radMonitoring === 3 ? true : false}
                    label="Monitoring facilities/networks exist and are maintained and enhanced."
                    type="radio"
                    id="radMon3"
                  />
                </div>
              </Col>
            </Row>
            <br />

            <Row style={{ marginBottom: "2px" }}>
              <Col md="12">
                <label style={{ fontWeight: "bold" }}>
                  3.3 Budget for facilities/networks:
                </label>
              </Col>
            </Row>
            <Row style={{ marginBottom: "-10px", marginLeft: "0px" }}>
              <Col md="12">
                <label style={{ fontWeight: "bold" }}>
                  What is the total budget facilities/networks?
                </label>
                <TextInput width="95%" />
              </Col>
            </Row>
            <Row style={{ marginBottom: "-10px", marginLeft: "0px" }}>
              <Col md="12">
                <label style={{ fontWeight: "bold" }}>
                  How long will the funding for the facilities/networks last?
                </label>
                <TextInput width="95%" />
              </Col>
            </Row>
            <Row style={{ marginBottom: "-10px", marginLeft: "0px" }}>
              <Col md="12">
                <label style={{ fontWeight: "bold" }}>
                  Who is the funding agency for the facilities/networks?
                </label>
                <TextInput width="95%" />
              </Col>
            </Row>
            <Row style={{ marginBottom: "7px", marginLeft: "0px" }}>
              <Col md="12">
                <label style={{ fontWeight: "bold" }}>
                  Are there any partnering departments/organisations that share the cost for the facilities/networks?
                </label>
                <TextInput width="95%" />
              </Col>
            </Row>     

            <Row>
              <Col md="12">
                <label style={{ fontWeight: "bold", marginBottom: "0px" }}>
                  3.4 Based on your inputs, your Goal 3 status is:
                </label>
                <br />
                <Button
                  size="sm"
                  color=""
                  style={{ backgroundColor: Red, marginLeft: "0px", marginRight: "0px", height: goalStatus === "R" ? "40px" : "35px", width: goalStatus === "R" ? "58px" : "40px", border: goalStatus === "R" ? "2px solid black" : "0px solid black" }}
                />
                <Button
                  size="sm"
                  color=""
                  style={{ backgroundColor: Amber, marginLeft: "0px", marginRight: "0px", height: goalStatus === "A" ? "40px" : "35px", width: goalStatus === "A" ? "58px" : "40px", border: goalStatus === "A" ? "2px solid black" : "0px solid black" }}
                />
                <Button
                  size="sm"
                  color=""
                  style={{ backgroundColor: Green, marginLeft: "0px", marginRight: "0px", height: goalStatus === "G" ? "40px" : "35px", width: goalStatus === "G" ? "58px" : "40px", border: goalStatus === "G" ? "2px solid black" : "0px solid black" }}
                />
              </Col>
            </Row>
            <br />

            <Row>
              <Col md="4">
                <Button color="" style={{ marginLeft: "0px", backgroundColor: DEAGreen, color: "black", fontSize: "16px" }}>
                  <b>Submit</b>
                </Button>
              </Col>
            </Row>

          </Col>
        </Row>

      </>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Goal3Contrib)