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

class Goal2Contrib extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      hasChamp: false,
      hasFunding: false,
      radForumsComitees: 1,
      goalStatus: "R"
    }
  }

  componentDidMount() {
    this.props.updateNav(location.hash)
  }

  render() {

    let { hasChamp, hasFunding, goalStatus, radForumsComitees } = this.state

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
              Goal 2. Appropriate resources (including current and past financial investments), capacity
              and processes (human, legal and regulatory) and support mechanisms (institutional and governance
              structures) to facilitate climate change adaptation.
            </h5>
            <p style={{ marginTop: "20px", marginBottom: "2px" }}>
              <b>What is being monitored and evaluated:</b>
            </p>
            <ol style={{ marginLeft: "-15px" }}>
              <li>
                Dedicated climate change champions/nodes/units and funding for businesses, sectors, provinces
                and municipalities (metropolitan, district and local);
                </li>
              <li>
                climate change training programmes;
                </li>
              <li>
                inclusion of climate change agendas in business, sectoral, provincial and municipal forums/committees
                (e.g. Climate Change Sustainability Councils, Municipal Climate Change Task Teams, Disaster Management
                Advisory Forums, Ward Councillor meetings, Provincial Cluster meetings, Board-level oversight); and
                </li>
              <li>
                implementation of forum/committee climate change action plans;
                </li>
              <li>
                dedicated budget/funding (including monetary incentives).
                </li>
            </ol>
            <p>
              <b>How it is being evaluated:</b>
              <br />
              No dedicated political/administrative champions, capacity, structure (i.e. organogram with climate
              change key performance indicators or Board-level oversight of climate change) or funding (including
              monetary incentives); no inclusion of climate change items in existing administrative and political
              forums/committees in businesses, sectors, provinces and municipalities
              <span style={{ color: Red }}><b> (red)</b></span>.
            </p>
            <p>
              Political/administrative champions designated but with no capacity, structure (i.e. organogram) or
              funding; inclusion of climate change items only by request in existing administrative and political
              forums/committees
              <span style={{ color: Amber }}><b> (amber)</b></span>.
            </p>
            <p>
              Political/administrative champions designated, and capacity, structure (i.e. organogram/Board-level
              oversight) and dedicated funding; climate change standing item in administrative and political
              provincial, municipal and sector forum/committee agendas
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
              Goal 2 Assessment:
            </h5>
            <br />

            <Row>
              <Col md="12">
                <label style={{ fontWeight: "bold", marginBottom: "0px" }}>
                  2.1 Does organisation have a dedicated political/administrative champion with capacity and structure?
              </label>
                <br />
                <Button
                  onClick={() => { this.setState({ hasChamp: true }) }}
                  color=""
                  style={{ fontSize: hasChamp ? "13px" : "10px", marginLeft: "0px", backgroundColor: hasChamp ? DEAGreen : "grey" }}
                  size="sm">
                  YES
                </Button>
                <Button
                  onClick={() => { this.setState({ hasChamp: false }) }}
                  color=""
                  style={{ fontSize: !hasChamp ? "13px" : "10px", backgroundColor: !hasChamp ? DEAGreen : "grey" }}
                  size="sm">
                  NO
                </Button>
              </Col>
            </Row>
            <br />

            <Row style={{ marginBottom: "7px" }}>
              <Col md="12">
                <label style={{ fontWeight: "bold" }}>
                  2.2 Add a link to your document
                </label>
                <TextInput width="95%" />
              </Col>
            </Row>

            <Row>
              <Col md="12">
                <label style={{ fontWeight: "bold", marginBottom: "0px" }}>
                  2.3 Does your climate change group have dedicated funding?
                </label>
                <br />
                <Button
                  onClick={() => { this.setState({ hasFunding: true }) }}
                  color=""
                  style={{ fontSize: hasFunding ? "13px" : "10px", marginLeft: "0px", backgroundColor: hasFunding ? DEAGreen : "grey" }}
                  size="sm">
                  YES
                </Button>
                <Button
                  onClick={() => { this.setState({ hasFunding: false }) }}
                  color=""
                  style={{ fontSize: !hasFunding ? "13px" : "10px", backgroundColor: !hasFunding ? DEAGreen : "grey" }}
                  size="sm">
                  NO
                </Button>
              </Col>
            </Row>
            <br />

            <Row style={{ marginBottom: "7px", marginLeft: "0px" }}>
              <Col md="12">
                <label style={{ fontWeight: "bold" }}>
                  What is the total budget?
                </label>
                <TextInput width="95%" />
              </Col>
            </Row>
            <Row style={{ marginBottom: "7px", marginLeft: "0px" }}>
              <Col md="12">
                <label style={{ fontWeight: "bold" }}>
                  How long will the funding last?
                </label>
                <TextInput width="95%" />
              </Col>
            </Row>
            <Row style={{ marginBottom: "7px", marginLeft: "0px" }}>
              <Col md="12">
                <label style={{ fontWeight: "bold" }}>
                  Who is the funding agency?
                </label>
                <TextInput width="95%" />
              </Col>
            </Row>
            <Row style={{ marginBottom: "7px", marginLeft: "0px" }}>
              <Col md="12">
                <label style={{ fontWeight: "bold" }}>
                  Are there any partnering departments?
                </label>
                <TextInput width="95%" />
              </Col>
            </Row>

            <Row>
              <Col md="12">
                <label style={{ fontWeight: "bold" }}>
                  2.4 Are climate change items included in existing administrative and political forums/committees
                  in businesses, sectors, provinces and municipalities?
                </label>
                <div style={{ marginLeft: "-22px", marginTop: "-10px" }}>
                  <Input
                    onClick={() => { this.setState({ radForumsComitees: 1 }) }}
                    checked={radForumsComitees === 1 ? true : false}
                    label="No."
                    type="radio"
                    id="radFC1"
                  />
                  <Input
                    onClick={() => { this.setState({ radForumsComitees: 2 }) }}
                    checked={radForumsComitees === 2 ? true : false}
                    label="Only by request in existing administrative and political forums/committees."
                    type="radio"
                    id="radFC2"
                  />
                  <Input
                    onClick={() => { this.setState({ radForumsComitees: 3 }) }}
                    checked={radForumsComitees === 3 ? true : false}
                    label="Climate change in a standing item in administrative and political provincial, 
                            municipal and sector forum/committee agendas."
                    type="radio"
                    id="radFC3"
                  />
                </div>
              </Col>
            </Row>
            <br />

            <Row>
              <Col md="12">
                <label style={{ fontWeight: "bold", marginBottom: "0px" }}>
                  2.5 Based on your inputs, your Goal 2 status is:
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

export default connect(mapStateToProps, mapDispatchToProps)(Goal2Contrib)