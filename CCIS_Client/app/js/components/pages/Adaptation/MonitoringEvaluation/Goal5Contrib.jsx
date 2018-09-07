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

class Goal5Contrib extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      radTech: 1,
      goalStatus: "R"
    }
  }

  componentDidMount() {
    this.props.updateNav(location.hash)
  }

  render() {

    let { goalStatus, radTech } = this.state

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
              Goal 5. New and adapted technologies/knowledge and other cost-effective measures (e.g. nature-based 
              solutions) used in climate change adaptation.
            </h5>
            <p style={{ marginTop: "20px", marginBottom: "2px" }}>
              <b>What is being monitored and evaluated:</b>
            </p>
            <ol style={{ marginLeft: "-15px" }}>
              <li>
                new technologies, research and knowledge adopted;
              </li>
              <li>
                indigenous knowledge systems;
              </li>
              <li>
                technology needs assessments;
              </li>
              <li>
                technology transfer and access (national and global);
              </li>
              <li>
                web-based tools on technologies  and technology transfer opportunities; and
              </li>
              <li>
                other adaptation challenges and opportunities on technologies, research and knowledge.
              </li>
            </ol>
            <p style={{ marginTop: "20px", marginBottom: "2px" }}>
              <b>How it is being evaluated:</b>
            </p>
            <p>
              Lack of awareness/understanding of newly developed technologies, research and knowledge 
              leading to poor or no application
              <span style={{ color: Red }}><b> (red)</b></span>.
            </p>
            <p>
              Awareness/ understanding of technologies, research and knowledge but no implementation and utilisation
              <span style={{ color: Amber }}><b> (amber)</b></span>.
            </p>
            <p>
              Evidence of implementation and utilisation of technologies and knowledge (e.g. 100 households 
              now have rainwater harvesting devices and have received training on how to use and maintain them)
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
              Goal 5 Assessment:
            </h5>
            <br />

            <Row>
              <Col md="12">
                <label style={{ fontWeight: "bold" }}>
                  5.1 Awareness/understanding of new climate change adaptation technologies?
                </label>
                <div style={{ marginLeft: "-22px", marginTop: "-10px" }}>
                  <Input
                    onClick={() => { this.setState({ radTech: 1 }) }}
                    checked={radTech === 1 ? true : false}
                    label="No or low awareness/understanding of newly developed technologies, research and 
                            knowledge leading to poor or no application."
                    type="radio"
                    id="radTech1"
                  />
                  <Input
                    onClick={() => { this.setState({ radTech: 2 }) }}
                    checked={radTech === 2 ? true : false}
                    label="Awareness/ understanding of technologies, research and knowledge but no 
                            implementation and utilisation."
                    type="radio"
                    id="radTech2"
                  />
                  <Input
                    onClick={() => { this.setState({ radTech: 3 }) }}
                    checked={radTech === 3 ? true : false}
                    label="Evidence of implementation and utilisation of technologies and knowledge (e.g. 100      
                            households now have rainwater harvesting devices and have received training on how to 
                            use and maintain them)."
                    type="radio"
                    id="radTech3"
                  />
                </div>
              </Col>
            </Row>

            <Row>
              <Col md="12">
                <label style={{ fontWeight: "bold", marginTop: "5px" }}>
                  5.2 Add a link to any evidence
                </label>
                <TextInput width="95%" />
              </Col>
            </Row>
            
            <Row>
              <Col md="12">
                <label style={{ fontWeight: "bold", marginBottom: "0px" }}>
                  5.3 Based on your inputs, your Goal 5 status is:
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

export default connect(mapStateToProps, mapDispatchToProps)(Goal5Contrib)