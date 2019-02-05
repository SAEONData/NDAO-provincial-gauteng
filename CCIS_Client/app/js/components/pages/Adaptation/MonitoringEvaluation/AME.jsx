'use strict'

import React from 'react'
import { connect } from 'react-redux'
import {
  Container, Button, Collapse, Row, Col, Fa, Modal, ModalHeader, ModalBody, ModalFooter,
  Card, CardBody, CardText
} from 'mdbreact'
import SelectInput from '../../../input/SelectInput.jsx'
import OData from 'react-odata';
import { DEAGreen } from '../../../../config/colours.js'
import About from './About.jsx'
import { apiBaseURL } from '../../../../../js/config/serviceURLs.js'

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
    this.selectEditGoal = this.selectEditGoal.bind(this)
    this.resetEdit = this.resetEdit.bind(this)

    const contrib = location.hash.includes("/contribute")

    this.state = {
      selectGoalModal: false,
      aboutSection: !contrib,
      contribSection: contrib,
      selectedGoal: 1,
      editGoalId: null
    }
  }

  componentDidMount() {
    this.props.updateNav(location.hash)
    if (location.hash.includes("/contribute")) {
      this.contribute()
    }
  }

  contribute() {

    let { user } = this.props

    setTimeout(() => {
      window.scroll({
        top: 180,
        left: 0,
        behavior: 'smooth'
      })
    }, 300)

    setTimeout(() => {
      this.setState({
        contribSection: true,
        aboutSection: (user && !user.expired) ? false : true
      })
    }, 500);
  }

  selectEditGoal(goalId) {
    this.setState({
      editGoalId: goalId,
      selectGoalModal: false
    })
  }

  resetEdit() {
    this.setState({ editGoalId: null })
  }

  render() {

    let { aboutSection, contribSection, selectedGoal, editGoalId } = this.state
    let { user } = this.props

    return (
      <>
        <div style={{
          backgroundColor: "white",
          border: "1px solid gainsboro",
          borderRadius: "10px",
          padding: "0px 30px 25px 15px"
        }}>

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

          {
            (user && !user.expired) &&
            <div>
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
                      key={"Goal-" + selectedGoal}
                      placeHolder="Select Goal..."
                      value={"Goal-" + selectedGoal}
                      data={[
                        { id: 1, text: "Goal-1" },
                        { id: 2, text: "Goal-2" },
                        { id: 3, text: "Goal-3" },
                        { id: 4, text: "Goal-4" },
                        { id: 5, text: "Goal-5" },
                        { id: 6, text: "Goal-6" },
                        { id: 7, text: "Goal-7" },
                        { id: 8, text: "Goal-8" },
                        { id: 9, text: "Goal-9" }
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
                      onClick={() => { this.setState({ selectGoalModal: true }) }}
                    >
                      <Fa icon="pencil" style={{ marginRight: "10px" }} />
                      Edit existing <b><i>Goal-{selectedGoal}</i></b>
                    </Button>
                  </Col>
                </Row>
                <br />
                <Row>
                  {selectedGoal === 1 && <Goal1Contrib editGoalId={editGoalId} resetEdit={this.resetEdit} />}
                  {selectedGoal === 2 && <Goal2Contrib editGoalId={editGoalId} resetEdit={this.resetEdit} />}
                  {selectedGoal === 3 && <Goal3Contrib editGoalId={editGoalId} resetEdit={this.resetEdit} />}
                  {selectedGoal === 4 && <Goal4Contrib editGoalId={editGoalId} resetEdit={this.resetEdit} />}
                  {selectedGoal === 5 && <Goal5Contrib editGoalId={editGoalId} resetEdit={this.resetEdit} />}
                  {selectedGoal === 6 && <Goal6Contrib editGoalId={editGoalId} resetEdit={this.resetEdit} />}
                  {selectedGoal === 7 && <Goal7Contrib editGoalId={editGoalId} resetEdit={this.resetEdit} />}
                  {selectedGoal === 8 && <Goal8Contrib editGoalId={editGoalId} resetEdit={this.resetEdit} />}
                  {selectedGoal === 9 && <Goal9Contrib editGoalId={editGoalId} resetEdit={this.resetEdit} />}
                </Row>
                <hr />

                <Row /*style={{ textAlign: "right" }}*/>
                  <Col md="6">
                    <Button
                      color=""
                      style={{
                        backgroundColor: DEAGreen,
                        marginLeft: 15
                        // margin: "5px 0px 0px 0px",
                        // height: "36px",
                        // padding: "0px 15px 0px 15px"
                      }}
                      onClick={() => { this.setState({ selectGoalModal: true }) }}
                    >
                      <Fa icon="pencil" style={{ marginRight: "10px" }} />
                      Edit existing <b><i>Goal-{selectedGoal}</i></b>
                    </Button>
                  </Col>

                  <Col md="6" style={{ textAlign: "right" }}>
                    {
                      selectedGoal < 9 &&
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
                    }
                  </Col>
                </Row>

              </Collapse>
            </div>
          }
          {
            (!user || user.expired) &&
            <div>
              <br />
              <b><i><a href="#/login">Login</a> to make contributions</i></b>
            </div>
          }
        </div>

        {/* Select goal modal */}
        <Container>
          <Modal isOpen={this.state.selectGoalModal} toggle={() => { this.setState({ selectGoalModal: false }) }} size="lg" centered>
            <ModalHeader toggle={() => { this.setState({ selectGoalModal: false }) }}>
              Select <b><i>Goal-{selectedGoal}</i></b> to edit:
            </ModalHeader>
            <ModalBody>

              {
                (user && !user.expired) &&
                <OData
                  baseUrl={apiBaseURL + 'Goals'}
                  query={{
                    filter: { CreateUser: { eq: { type: 'guid', value: user.profile.UserId } }, Type: selectedGoal },
                    select: ['Id', 'CreateDate', 'UpdateDate'],
                    orderBy: "CreateDate desc"
                  }}>
                  {({ loading, error, data }) => {

                    if (loading === true) {
                      return (
                        <p>
                          Fetching goals...
                        </p>
                      )
                    }

                    if (error) {
                      console.error(error)
                      return (
                        <p>
                          Unable to fetch goals. (See log for details)
                        </p>
                      )
                    }

                    if (data) {
                      if (data.value.length > 0) {
                        let items = []
                        data.value.map(item => {
                          items.push(
                            <Card key={item.Id}>
                              <CardBody>
                                <CardText>
                                  <b>Created on: </b>{item.CreateDate}
                                  <br />
                                  <b>Last updated on: </b>{item.UpdateDate === null ? item.CreateDate : item.UpdateDate}
                                </CardText>
                                <Button
                                  size="sm"
                                  color=""
                                  style={{ backgroundColor: DEAGreen }}
                                  onClick={() => { this.selectEditGoal(item.Id) }}>
                                  Select
                                </Button>
                              </CardBody>
                            </Card>
                          )
                        })
                        return items
                      }
                      else {
                        return (<p>You have not created any goals yet.</p>)
                      }

                    }
                  }}
                </OData>
              }

            </ModalBody>
          </Modal>
        </Container>
      </>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AME)