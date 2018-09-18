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

class Goal7Contrib extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      radRV: 1,
      goalStatus: "R"
    }
  }

  componentDidMount() {
    this.props.updateNav(location.hash)
  }

  render() {

    let { goalStatus, radRV } = this.state

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
              Goal 7. Evidence of reduced risk/vulnerability as a result of addressing the identified risk/vulnerability.
            </h5>
            <p style={{ marginTop: "20px", marginBottom: "2px" }}>
              <b>What is being monitored and evaluated:</b>
            </p>
            <p>
              Evidence of reduced risk/vulnerability as a result of addressing the identified risk/vulnerability.
            </p>
            <p style={{ marginBottom: "3px" }}>
              <b>How it is being evaluated:</b>
            </p>
            <table style={{ width: "95%" }}>
              <tbody>
                <tr style={{ backgroundColor: Red }}>
                  <td style={{ color: "white", padding: "10px" }}>
                    <p style={{ marginBottom: "0px" }}>
                      <b>RED </b>
                      Lack of behavioural/system/infrastructure change/modification as a result of
                      addressing identified risks (including climate risk) and vulnerabilities to
                      reduce climate change impacts
                    </p>
                  </td>
                </tr>
                <tr style={{ backgroundColor: Amber }}>
                  <td style={{ color: "white", padding: "10px" }}>
                    <p style={{ marginBottom: "0px" }}>
                      <b>AMBER </b>
                      Evidence of reactive behavioural/system/infrastructure change/modification as
                      a result of addressing identified risks (including climate risk) and vulnerabilities
                      to reduce climate change impacts.
                    </p>
                  </td>
                </tr>
                <tr style={{ backgroundColor: Green }}>
                  <td style={{ color: "white", padding: "10px" }}>
                    <p style={{ marginBottom: "0px" }}>
                      <b>GREEN </b>
                      Evidence of proactive behavioural/system/infrastructure change/modification as
                      a result of addressing identified risks (including climate risk) and vulnerabilities
                      to reduce climate change impacts.
                    </p>
                  </td>
                </tr>
              </tbody>
            </table>
            <br />
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
              Goal 7 Assessment
            </h5>
            <br />

            <Row>
              <Col md="12">
                <label style={{ fontWeight: "bold" }}>
                  7.1 Behavioural/system/infrastructure change/modification as a result of addressing
                  identified risks (including climate risk) and vulnerabilities to reduce climate change impacts.
                </label>
                <div style={{ marginLeft: "-22px", marginTop: "-10px" }}>
                  <Input
                    onClick={() => { this.setState({ radRV: 1 }) }}
                    checked={radRV === 1 ? true : false}
                    label="No or low behavioural/system/infrastructure change/modification as a result of addressing identified risks (including climate risk) and vulnerabilities to reduce climate change impacts."
                    type="radio"
                    id="radRV1"
                  />
                  <Input
                    onClick={() => { this.setState({ radRV: 2 }) }}
                    checked={radRV === 2 ? true : false}
                    label="Evidence of reactive behavioural/system/infrastructure change/modification as a result of addressing identified risks (including climate risk) and vulnerabilities to reduce climate change impacts."
                    type="radio"
                    id="radRV2"
                  />

                  <Input
                    onClick={() => { this.setState({ radRV: 3 }) }}
                    checked={radRV === 3 ? true : false}
                    label="Evidence of proactive behavioural/system/infrastructure change/modification as a result of addressing identified risks (including climate risk) and vulnerabilities to reduce climate change impacts."
                    type="radio"
                    id="radRV3"
                  />
                </div>
              </Col>
            </Row>

            <Row style={{ marginTop: "15px"}}>
              <Col md="12">
                <label style={{ fontWeight: "bold" }}>
                  7.2 Add attachments to any evidence:
                      </label>
                <TextInput width="95%" />
              </Col>
            </Row>

            <Row>
              <Col md="4">
                <Button color="" style={{ marginLeft: "0px", backgroundColor: DEAGreen, color: "black", fontSize: "16px" }}>
                  <b>Submit</b>
                </Button>
              </Col>
            </Row>

            <Row style={{ marginTop: "15px"}}>
              <Col md="12">
                <label style={{ fontWeight: "bold", marginBottom: "0px", marginTop: "15px" }}>
                  Based on your submission, your Goal 7 status is:
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

          </Col>
        </Row>

      </>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Goal7Contrib)