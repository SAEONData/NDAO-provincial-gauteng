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

class Goal9Contrib extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      radSys: 1,
      goalStatus: "R"
    }
  }

  componentDidMount() {
    this.props.updateNav(location.hash)
  }

  render() {

    let { goalStatus, radSys } = this.state

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
              Goal 9. Secure food, water and energy supplies for all citizens (within the context of 
              sustainable development).
            </h5>
            <p style={{ marginTop: "20px", marginBottom: "2px" }}>
              <b>What is being monitored and evaluated:</b>
            </p>
            <p>
              Climate smart agricultural practices, conservation agriculture practices, and water conservation 
              and demand practices.
            </p>
            <p style={{ marginTop: "20px", marginBottom: "2px" }}>
              <b>How it is being evaluated:</b>
            </p>
            <p>
              No climate resilient measures/actions implemented to ensure secure food, water and energy
              <span style={{ color: _gf.getPartColour("R") }}><b> (red)</b></span>.
            </p>
            <p>
              Climate resilient measures/actions implemented to ensure secure food, water and energy 
              <span style={{ color: _gf.getPartColour("A") }}><b> (amber)</b></span>.
            </p>
            <p>
              Evidence of secure food, water and energy in communities as a result of implementing 
              climate-resilient measures
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
              Goal 9 Assessment:
            </h5>
            <br />

            <Row>
              <Col md="12">
                <label style={{ fontWeight: "bold" }}>
                  9.1 Change in non-climate pressures and threats to human and natural systems?
                </label>
                <div style={{ marginLeft: "-22px", marginTop: "-10px" }}>
                  <Input
                    onClick={() => { this.setState({ radSys: 1 }) }}
                    checked={radSys === 1 ? true : false}
                    label="No climate resilient measures/actions implemented to ensure secure food, water and 
                            energy."
                    type="radio"
                    id="radSys1"
                  />
                  <Input
                    onClick={() => { this.setState({ radSys: 2 }) }}
                    checked={radSys === 2 ? true : false}
                    label="Climate resilient measures/actions implemented to ensure secure food, water and 
                            energy."
                    type="radio"
                    id="radSys2"
                  />

                  <Input
                    onClick={() => { this.setState({ radSys: 3 }) }}
                    checked={radSys === 3 ? true : false}
                    label="Evidence of secure food, water and energy in communities as a result of 
                            implementing climate-resilient measures."
                    type="radio"
                    id="radSys3"
                  />
                </div>
              </Col>
            </Row>

            <Row style={{ marginTop: "15px"}}>
              <Col md="12">
                <label style={{ fontWeight: "bold" }}>
                  9.2 Add a link to any evidence
                </label>
                <TextInput width="95%" />
              </Col>
            </Row>

            <Row>
              <Col md="12">
                <label style={{ fontWeight: "bold", marginBottom: "0px", marginTop: "5px" }}>
                  9.3 Based on your inputs, your Goal 8 status is:
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

export default connect(mapStateToProps, mapDispatchToProps)(Goal9Contrib)