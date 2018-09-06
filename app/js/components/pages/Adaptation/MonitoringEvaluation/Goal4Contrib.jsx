'use strict'

import React from 'react'
import { connect } from 'react-redux'
import { Row, Col, Button, Input } from 'mdbreact'
import TextInput from '../../../input/TextInput.jsx'
import { DEAGreen, DEAGreenDark } from '../../../../config/colours'

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

class Goal4Contrib extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      radProgrammes: 1,
      goalStatus: "R"
    }
  }

  componentDidMount() {
    this.props.updateNav(location.hash)
  }

  render() {

    let { goalStatus, radProgrammes } = this.state

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
              Goal 4. Capacity development, education and awareness programmes (formal and informal) for climate 
              change adaptation (e.g. informed by adaptation research and with tools to utilise data/outputs).
            </h5>
            <p style={{ marginTop: "20px", marginBottom: "2px" }}>
              <b>What is being monitored and evaluated:</b>
            </p>
            <ol style={{ marginLeft: "-15px" }}>
              <li>
                number of capacity development programmes (including students, staff, researchers and institutions) 
                addressing climate change adaptation;
              </li>
              <li>
                coverage of adaptation research and training being undertaken and financed;
              </li>
              <li>
                uptake of research outcomes and human capacity trained in adaptation; 
              </li>
              <li>
                collaboration and partnerships between sectors, businesses, provinces, municipalities and researchers; and
              </li>
              <li>
                incorporation of climate change issues into school curriculum.
              </li>
            </ol>
            <p>
              <b>How it is being evaluated:</b>
            </p>
            <p>
              No capacity building programmes (including research), collaboration and partnerships to address 
              climate change adaptation and no incorporation into school curriculum
              <span style={{ color: _gf.getPartColour("R") }}><b> (red)</b></span>.
            </p>
            <p>
              Attendance of capacity building programmes but no utilisation, collaboration and partnerships 
              to address climate change adaptation and no incorporation into school curriculum
              <span style={{ color: _gf.getPartColour("A") }}><b> (amber)</b></span>.
            </p>
            <p>
              Capacity building programmes (including research and utilisation), collaboration and 
              partnerships to address climate change adaptation, incorporation into school curriculum, 
              and utilisation to inform policy and decision-making
              <span style={{ color: _gf.getPartColour("G") }}><b> (green)</b></span>.
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
              Goal 4 Assessment:
            </h5>
            <br />

            <Row>
              <Col md="12">
                <label style={{ fontWeight: "bold" }}>
                  4.1 Climate change adaptation capacity building programmes?
                </label>
                <div style={{ marginLeft: "-22px", marginTop: "-10px" }}>
                  <Input
                    onClick={() => { this.setState({ radProgrammes: 1 }) }}
                    checked={radProgrammes === 1 ? true : false}
                    label="No capacity building programmes (including research), collaboration and partnerships to   
                            address climate change adaptation and no incorporation into school curriculum."
                    type="radio"
                    id="radPrg1"
                  />
                  <Input
                    onClick={() => { this.setState({ radProgrammes: 2 }) }}
                    checked={radProgrammes === 2 ? true : false}
                    label="Attendance of capacity building programmes but no utilisation, collaboration and 
                            partnerships to address climate change adaptation and no incorporation into school 
                            curriculum."
                    type="radio"
                    id="radPrg2"
                  />
                  <Input
                    onClick={() => { this.setState({ radProgrammes: 3 }) }}
                    checked={radProgrammes === 3 ? true : false}
                    label="Capacity building programmes (including research and utilisation), collaboration and 
                            partnerships to address climate change adaptation, incorporation into school curriculum, 
                            and utilisation to inform policy and decision-making."
                    type="radio"
                    id="radPrg3"
                  />
                </div>
              </Col>
            </Row>
            
            <Row>
              <Col md="12">
                <label style={{ fontWeight: "bold", marginBottom: "0px" }}>
                  4.2 Based on your inputs, your Goal 4 status is:
                </label>
                <br />
                <Button
                  size="sm"
                  color=""
                  style={{ backgroundColor: _gf.getPartColour("R"), marginLeft: "0px", marginRight: "0px", height: goalStatus === "R" ? "40px" : "35px", width: goalStatus === "R" ? "58px" : "40px", border: goalStatus === "R" ? "2px solid black" : "0px solid black" }}
                />
                <Button
                  size="sm"
                  color=""
                  style={{ backgroundColor: _gf.getPartColour("A"), marginLeft: "0px", marginRight: "0px", height: goalStatus === "A" ? "40px" : "35px", width: goalStatus === "A" ? "58px" : "40px", border: goalStatus === "A" ? "2px solid black" : "0px solid black" }}
                />
                <Button
                  size="sm"
                  color=""
                  style={{ backgroundColor: _gf.getPartColour("G"), marginLeft: "0px", marginRight: "0px", height: goalStatus === "G" ? "40px" : "35px", width: goalStatus === "G" ? "58px" : "40px", border: goalStatus === "G" ? "2px solid black" : "0px solid black" }}
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

export default connect(mapStateToProps, mapDispatchToProps)(Goal4Contrib)