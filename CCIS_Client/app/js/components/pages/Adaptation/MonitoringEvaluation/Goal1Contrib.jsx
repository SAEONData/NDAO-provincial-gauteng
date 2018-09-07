'use strict'

import React from 'react'
import { connect } from 'react-redux'
import { Row, Col, Button } from 'mdbreact'
import TextInput from '../../../input/TextInput.jsx'
import { DEAGreen, DEAGreenDark, Red, Amber, Green } from '../../../../config/colours.cfg'
import DateInput from '../../../input/DateInput.jsx'
import NCCRD from '../../Tools/NCCRD.jsx';

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

class Goal1Contrib extends React.Component {

  constructor(props) {
    super(props);

    this.NCCRD_CloseCallback = this.NCCRD_CloseCallback.bind(this)

    this.state = {
      hasRiskAssesment: false,
      goalStatus: "R",
      showNCCRD: false
    }
  }

  componentDidMount() {
    this.props.updateNav(location.hash)
  }

  NCCRD_CloseCallback() {
    this.setState({ showNCCRD: false })
  }

  render() {

    let { hasRiskAssesment, goalStatus, showNCCRD } = this.state

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
              Goal 1. Robust/integrated plans, policies and actions for effective delivery of climate change
              adaptation, together with monitoring, evaluation and review over the short, medium and longer-term.
            </h5>
            <p style={{ marginTop: "20px" }}>
              <b>What is being monitored and evaluated:</b>
              <br />
              Number of business, sectoral, provincial and municipal legal frameworks, plans/strategies,
              policies, programmes and projects that incorporate climate change adaptation (e.g. Spatial
              Development Frameworks/Environmental Management Frameworks, Growth and Development Strategies,
              Disaster Management Plans, Conservation Plans, Food Security Strategies, Energy Security
              Strategies, Coastal Management Programmes, Agricultural Plans and Strategies, Integrated
              Development Plans and associated Sector Plans as prescribed in Municipal Systems and Structures
              Act, Water Catchment Strategies, Integrated Waste Management Plans, Alien Invasive Strategies,
              Environmental Impact Assessments, International Agreements on Water Allocation, Business Plans,
              Land Capability Plans, Air Quality Plans, Greening Strategies/Green Economy Strategies, Transport
              Strategies, Water Management Strategies, Forest Protection Strategies, Education Plans, Economic
              Plans, Tourism Plans, Human Settlements/Rural Development Plans, licensing/permitting/authorisation
              and by-laws, and broader risk management procedures).*
            </p>
            <p>
              <b>How it is being evaluated:</b>
              <br />
              Legal frameworks, plans/strategies, policies, programmes and projects not informed by existing
              risk and vulnerability profiles that include climate risks and impacts
              <span style={{ color: Red }}><b> (red)</b></span>.
            </p>
            <p>
              Legal frameworks, plans/strategies, policies, programmes and projects informed by risk and
              vulnerability profiles that include climate risks and impacts
              <span style={{ color: Amber }}><b> (amber)</b></span>.
            </p>
            <p>
              Implementation of legal frameworks, plans/strategies, policies, programmes and projects -
              informed by risk and vulnerability profiles that include climate risks and impacts - to reduce
              vulnerability in risk and vulnerability profiles and enhance capacity to respond to climate
              change impact
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
              Goal 1 Assessment:
            </h5>
            <br />
            <Row style={{ marginBottom: "7px" }}>
              <Col md="12">
                <label style={{ fontWeight: "bold" }}>
                  1.1 Add a link to your document
                </label>
                <TextInput width="95%" />
              </Col>
            </Row>

            <Row>
              <Col md="12">
                <label style={{ fontWeight: "bold", marginBottom: "0px" }}>
                  1.2 Does the adaptation plan have a risk and vulnerability assessment
                </label>
                <br />
                <Button
                  onClick={() => { this.setState({ hasRiskAssesment: true }) }}
                  color=""
                  style={{ fontSize: hasRiskAssesment ? "13px" : "10px", marginLeft: "0px", backgroundColor: hasRiskAssesment ? DEAGreen : "grey" }}
                  size="sm">
                  YES
                </Button>
                <Button
                  onClick={() => { this.setState({ hasRiskAssesment: false }) }}
                  color=""
                  style={{ fontSize: !hasRiskAssesment ? "13px" : "10px", backgroundColor: !hasRiskAssesment ? DEAGreen : "grey" }}
                  size="sm">
                  NO
                </Button>
              </Col>
            </Row>
            <br />

            <Row>
              <Col md="12">
                <label style={{ fontWeight: "bold" }}>
                  1.3 When was the plan last updated?
                </label>
              </Col>
            </Row>
            <Row>
              <Col md="5">
                <DateInput />
              </Col>
            </Row>
            <br />

            <Row>
              <Col md="12">
                <label style={{ fontWeight: "bold", marginBottom: "0px" }}>
                  1.4 Based on your inputs, your Goal 1 status is:
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
            <br />

            <Row>
              <Col md="12">
                <p style={{ fontWeight: "bold", marginBottom: "0px" }}>
                  Your unique code is:
                  &nbsp;
                <span style={{ color: Red }}>####-####-####-####-####</span>
                  <br />
                  Use this code to find your plan when adding projects to the Climate Change
                  Responses Database
              </p>
              </Col>
            </Row>
            <hr />

            <Row>
              <Col md="12">
                <label style={{ fontWeight: "bold", fontSize: "18px" }}>
                  <u>Next steps:</u>
                </label>
                <label style={{ fontWeight: "bold" }}>
                  Please add the details of all of the climate change adaptation or mitigation options
                  described in your document to the Climate Change Response Database (CCR).
              </label>
                <Button
                  color=""
                  style={{ marginLeft: "0px", backgroundColor: DEAGreen, color: "black", fontSize: "16px" }}
                  onClick={() => { this.setState({ showNCCRD: true }) }}
                >
                  <b>CCR</b>
                </Button>
              </Col>
            </Row>
          </Col>
        </Row>

        {showNCCRD &&
          <NCCRD closeCallback={() => { this.setState({ showNCCRD: false }) }} />
        }

      </>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Goal1Contrib)