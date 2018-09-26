'use strict'

import React from 'react'
import { connect } from 'react-redux'
import { Container, Button, Collapse, Row, Col, Fa } from 'mdbreact'
import SelectInput from '../../../input/SelectInput.jsx'

import { DEAGreen } from '../../../../config/colours.cfg'
import About from './About.jsx'

import Goal1Contrib from './Goal1Contrib.jsx'
import Goal2Contrib from './Goal2Contrib.jsx'
import Goal3Contrib from './Goal3Contrib.jsx'
import Goal4Contrib from './Goal4Contrib.jsx'
import Goal5Contrib from './Goal5Contrib.jsx'
import Goal6Contrib from './Goal6Contrib.jsx'
import Goal7Contrib from './Goal7Contrib.jsx'
import Goal8Contrib from './Goal8Contrib.jsx'
import Goal9Contrib from './Goal9Contrib.jsx'

const mapStateToProps = (state, props) => {
  let user = state.oidc.user
  return { user }
}

const mapDispatchToProps = (dispatch) => {
  return {
    updateNav: payload => {
      dispatch({ type: "NAV", payload })
    }
  }
}

class AME extends React.Component {

  constructor(props) {
    super(props);

    this.contribute = this.contribute.bind(this)

    const contrib = location.hash.includes("/contribute")

    this.state = {
      aboutSection: !contrib,
      contribSection: contrib,
      selectedGoal: 1
    }
  }

  componentDidMount() {

    let { user } = this.props
    if (!user || user.expired) {
      location.hash = "#/login"
    }
    else {
      this.props.updateNav(location.hash)

      if (location.hash.includes("/contribute")) {
        this.contribute()
      }
    }
  }

  contribute() {

    setTimeout(() => { this.setState({ contribSection: true, aboutSection: false }) }, 100);

    setTimeout(() => {
      window.scroll({
        top: 180,
        left: 0,
        behavior: 'smooth'
      })
    }, 100)

  }

  render() {

    let { aboutSection, contribSection, selectedGoal } = this.state

    return (
      <>
        <Container>
          <br />
          <h3><b>Climate Change Adaptation Monitoring and Evaluation</b></h3>
          <br />

          {/* ABOUT */}
          <h5
            style={{ marginBottom: "0px", color: DEAGreen, cursor: "pointer" }}
            onClick={() => { this.setState({ aboutSection: !aboutSection }) }} >
            <b style={{ marginRight: "15px" }}>
              <u>
                About this platform...
              </u>
            </b>
            <i className={!aboutSection ? 'fa fa-angle-down rotate-icon' : 'fa fa-angle-up'}></i>
          </h5>

          <Collapse isOpen={aboutSection}>
            <hr />
            <About />
            <hr style={{ marginBottom: "-10px" }} />
          </Collapse>

          <br />
          <Button
            onClick={() => {
              location.hash = "#/ame/contribute"
              this.contribute()
            }}
            style={{ marginLeft: "0px", marginBottom: "0px" }}
            color="grey">Submit your contribution</Button>
          <br />

          <Collapse isOpen={contribSection}>
            <br />
            <Row>
              <Col md="4">
                <SelectInput
                  key={"Goal " + selectedGoal}
                  placeHolder="Select Goal..."
                  value={"Goal " + selectedGoal}
                  data={[
                    { id: 1, text: "Goal 1" },
                    { id: 2, text: "Goal 2" },
                    { id: 3, text: "Goal 3" },
                    { id: 4, text: "Goal 4" },
                    { id: 5, text: "Goal 5" },
                    { id: 6, text: "Goal 6" },
                    { id: 7, text: "Goal 7" },
                    { id: 8, text: "Goal 8" },
                    { id: 9, text: "Goal 9" }
                  ]}
                  allowEdit={true}
                  allowClear={false}
                  callback={(selectedNode) => { this.setState({ selectedGoal: selectedNode.id }) }}
                  style={{ marginTop: "5px" }}
                />
              </Col>
              <Col md="4">
                <Button
                  color=""
                  style={{
                    backgroundColor: DEAGreen,
                    margin: "5px 0px 0px 0px",
                    height: "36px",
                    padding: "0px 15px 0px 15px"
                  }}
                >
                  <Fa icon="pencil" style={{ marginRight: "10px" }} />
                  Edit existing goal
                </Button>
              </Col>
            </Row>
            <br />
            <Row>
              {selectedGoal === 1 && <Goal1Contrib />}
              {selectedGoal === 2 && <Goal2Contrib />}
              {selectedGoal === 3 && <Goal3Contrib />}
              {selectedGoal === 4 && <Goal4Contrib />}
              {selectedGoal === 5 && <Goal5Contrib />}
              {selectedGoal === 6 && <Goal6Contrib />}
              {selectedGoal === 7 && <Goal7Contrib />}
              {selectedGoal === 8 && <Goal8Contrib />}
              {selectedGoal === 9 && <Goal9Contrib />}
            </Row>
            <br />

            {selectedGoal < 9 &&
              <Row style={{ textAlign: "right" }}>
                <Col md="12" >
                  <Button color="grey" onClick={() => {
                    window.scroll({
                      top: 180,
                      left: 0,
                      behavior: 'smooth'
                    })
                    setTimeout(() => {
                      this.setState({ selectedGoal: (selectedGoal + 1) })
                    }, 100)
                  }}>
                    Next
                </Button>
                </Col>
              </Row>
            }
          </Collapse>


        </Container>
      </>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AME)