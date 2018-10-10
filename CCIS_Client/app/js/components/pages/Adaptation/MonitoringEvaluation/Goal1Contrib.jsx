'use strict'

import React from 'react'
import { connect } from 'react-redux'
import { Row, Col, Button, Container, Modal, ModalHeader, ModalBody, ModalFooter } from 'mdbreact'
import TextInput from '../../../input/TextInput.jsx'
import { DEAGreen, DEAGreenDark, Red, Amber, Green } from '../../../../config/colours.cfg'
import DateInput from '../../../input/DateInput.jsx'
import NCCRD from '../../Tools/NCCRD.jsx'
import FileUpload from '../../../input/FileUpload.jsx'
import { apiBaseURL, ccrdBaseURL } from '../../../../config/serviceURLs.cfg'
import moment from 'moment'
import buildQuery from 'odata-query'

//Images
import gear from '../../../../../images/gear.png'
import checklist from '../../../../../images/checklist.png'

const _gf = require('../../../../globalFunctions')

const mapStateToProps = (state, props) => {
  let user = state.oidc.user
  return { user }
}

const mapDispatchToProps = (dispatch) => {
  return {
    updateNav: payload => {
      dispatch({ type: "NAV", payload })
    },
    setLoading: payload => {
      dispatch({ type: "SET_LOADING", payload })
    }
  }
}

const defaultState = {
  editing: false,
  messageModal: false,
  message: "",
  title: "",
  goalStatus: "R",
  showNCCRD: false,
  goalId: _gf.GetUID(),
  Q1_1: "",
  Q1_3: false,
  Q1_4: moment().format("YYYY-MM-DD")
}

class Goal1Contrib extends React.Component {

  constructor(props) {
    super(props);

    this.NCCRD_CloseCallback = this.NCCRD_CloseCallback.bind(this)
    this.reset = this.reset.bind(this)
    this.submit = this.submit.bind(this)
    this.showMessage = this.showMessage.bind(this)
    this.assessGoalStatus = this.assessGoalStatus.bind(this)

    this.state = defaultState
  }

  showMessage(title, message) {
    this.setState({
      title,
      message,
      messageModal: true
    })
  }

  componentDidMount() {

    console.log("GoalId", defaultState.goalId)

    let { updateNav } = this.props
    updateNav(location.hash)
  }

  componentDidUpdate() {
    let { editGoalId } = this.props
    if (editGoalId) {
      this.getEditGoalData(editGoalId)
    }

    this.assessGoalStatus()
  }

  async getEditGoalData(editGoalId) {

    this.props.setLoading(true)
    this.props.resetEdit()

    //Fetch goal details from server
    const query = buildQuery({
      key: { Id: editGoalId }
    })

    try {
      let res = await fetch(apiBaseURL + `Goal1${query}`)
      res = await res.json()
      if (res.value && res.value.length > 0) {
        let data = res.value[0]
        this.setState({
          editing: true,
          goalId: editGoalId,
          Q1_1: data.DocumentLink,
          Q1_3: data.HasAssessment,
          Q1_4: data.DocLastUpdated
        })
      }

      this.props.setLoading(false)
    }
    catch (ex) {
      this.props.setLoading(false)
      console.error(ex)
    }
  }

  NCCRD_CloseCallback() {
    this.setState({ showNCCRD: false })
  }

  async submit() {

    let { goalId, goalStatus, Q1_1, Q1_3, Q1_4 } = this.state
    let { setLoading, next, user } = this.props

    //Validate
    if (Q1_1 === "") {
      this.showMessage("Required", "Document link required")
      return
    }

    setLoading(true)

    //Submit
    try {
      let res = await fetch(apiBaseURL + 'Goal1', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer " + (user === null ? "" : user.access_token)
        },
        body: JSON.stringify({
          Id: goalId,
          DocumentLink: Q1_1,
          HasAssessment: Q1_3,
          DocLastUpdated: Q1_4,
          CreateUserId: user.profile.UserId,
          Status: goalStatus
        })
      })

      if (!res.ok) {
        //Get response body
        res = await res.json()
        throw new Error(res.error.message)
      }

      setLoading(false)
      this.showMessage("Success", "Goal submitted successfully")
      await this.waitForMessageClosed()
      this.reset()
    }
    catch (ex) {
      setLoading(false)
      console.error(ex)
      this.showMessage("An error occurred", ex.message)
    }
  }

  async waitForMessageClosed() {

    while (this.state.messageModal === true) {
      await _gf.wait(250)
    }

    return true
  }

  async reset() {

    await this.waitForMessageClosed();

    this.setState({ ...defaultState, goalId: _gf.GetUID() })

    setTimeout(() => {
      window.scroll({
        top: 180,
        left: 0,
        behavior: 'smooth'
      })
    }, 100)
  }

  async assessGoalStatus() {

    let { goalStatus, goalId, Q1_1 } = this.state
    let statusValues = ["R", "A", "G"]
    let goalStatusNew = 0

    //Checkpoint 1 - Document Link
    if (!_gf.isEmptyValue(Q1_1)) {
      goalStatusNew += 1
    }

    //Checkpoint 2 - Ataptation/Mitigation >> Operational/Complete
    let query = buildQuery({
      filter: {
        AdaptationDetails: {
          any: {
            ProjectStatusId: {
              gt: 1
            }
          }
        }
      },
      filter: {
        MitigationDetails: {
          any: {
            ProjectStatusId: {
              gt: 1
            }
          }
        }
      },
      filter: {
        LinkedDAOGoalId: {
          eq: {
            type: 'guid',
            value: goalId
          }
        }
      }
    })

    try {

      let res = await fetch(`${ccrdBaseURL}Projects${query}`)

      if (!res.ok) {
        //Get response body
        res = await res.json()
        throw new Error(res.error.message)
      }
      else {
        res = await res.json()
        if (res.value && res.value.length > 0) {
          goalStatusNew += 1
        }
      }
    }
    catch (ex) {
      console.error(ex)
    }

    //Conclusion
    if (statusValues[goalStatusNew] !== goalStatus) {
      this.setState({ goalStatus: statusValues[goalStatusNew] })
    }
  }

  render() {

    let { editing, goalId, goalStatus, showNCCRD, Q1_1, Q1_3, Q1_4 } = this.state

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
              Development Plans and associated Sector Plans as prescribed in Municipal Systems and
              Structures Act, Water Catchment Strategies, Integrated Waste Management Plans, Alien
              Invasive Strategies, Environmental Impact Assessments, International Agreements on Water
              Allocation, Business Plans, Land Capability Plans, Air Quality Plans, Greening Strategies/Green
              Economy Strategies, Transport Strategies, Water Management Strategies, Forest Protection
              Strategies, Education Plans, Economic Plans, Tourism Plans, Human Settlements/Rural Development
              Plans, licensing/permitting/authorisation procedures and by-laws, and broader risk
              management procedures).*
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
                      Legal frameworks, plans/strategies, policies, programmes and projects not informed by
                      existing risk and vulnerability profiles that include climate risks and impacts.
                    </p>
                  </td>
                </tr>
                <tr style={{ backgroundColor: Amber }}>
                  <td style={{ color: "white", padding: "10px" }}>
                    <p style={{ marginBottom: "0px" }}>
                      <b>AMBER </b>
                      Legal frameworks, plans/strategies, policies, programmes and projects informed by risk
                      and vulnerability profiles that include climate risks and impacts.
                    </p>
                  </td>
                </tr>
                <tr style={{ backgroundColor: Green }}>
                  <td style={{ color: "white", padding: "10px" }}>
                    <p style={{ marginBottom: "0px" }}>
                      <b>GREEN </b>
                      Implementation of legal frameworks, plans/strategies, policies, programmes and
                      projects - informed by risk and vulnerability profiles that include climate
                      risks and impacts - to reduce vulnerability in risk and vulnerability profiles and enhance capacity to respond to climate change impacts.
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
              Goal 1 Assessment
            </h5>
            <br />
            <Row style={{ marginBottom: "7px" }}>
              <Col md="12">
                <label style={{ fontWeight: "bold" }}>
                  1.1 Attach your document (see above description):*
                </label>
                <TextInput
                  width="95%"
                  value={Q1_1}
                  callback={(value) => {
                    value = _gf.fixEmptyValue(value, "")
                    this.setState({ Q1_1: value })
                  }}
                  readOnly={true}
                />
              </Col>
            </Row>
            <Row style={{ marginBottom: "7px" }}>
              <Col md="4">
                <FileUpload
                  key={"fu_" + goalId}
                  style={{ marginTop: "-15px", marginBottom: "20px" }}
                  width="100%"
                  callback={(fileInfo) => { this.setState({ Q1_1: fileInfo.ViewLink }) }}
                  goalId={goalId}
                />
              </Col>
            </Row>

            <Row>
              <Col md="12">
                <label style={{ fontWeight: "bold" }}>
                  1.2 Please add the details of all of the climate change adaptation or mitigation options
                  or any research options described in your document to the Climate Change Response Database (CCR).
              </label>
                <Button
                  onClick={() => { this.setState({ showNCCRD: true }) }}
                  color=""
                  style={{ fontSize: "13px", marginLeft: "0px", backgroundColor: DEAGreen }}
                  size="sm">
                  CCR
                </Button>
              </Col>
            </Row>
            <br />

            <Row>
              <Col md="12">
                <label style={{ fontWeight: "bold", marginBottom: "0px" }}>
                  1.3 Does the document have a risk and vulnerability assessment?
                </label>
                <br />
                <Button
                  onClick={() => { this.setState({ Q1_3: true }) }}
                  color=""
                  style={{ fontSize: Q1_3 ? "13px" : "10px", marginLeft: "0px", backgroundColor: Q1_3 ? DEAGreen : "grey" }}
                  size="sm">
                  YES
                </Button>
                <Button
                  onClick={() => { this.setState({ Q1_3: false }) }}
                  color=""
                  style={{ fontSize: !Q1_3 ? "13px" : "10px", backgroundColor: !Q1_3 ? DEAGreen : "grey" }}
                  size="sm">
                  NO
                </Button>
              </Col>
            </Row>
            <br />

            <Row>
              <Col md="12">
                <label style={{ fontWeight: "bold" }}>
                  1.4 When was the plan last updated?
                </label>
              </Col>
            </Row>
            <Row>
              <Col md="5">
                <DateInput
                  value={Q1_4}
                  callback={(dateString) => { this.setState({ Q1_4: dateString }) }}
                  allowClear={false}
                />
              </Col>
            </Row>
            <br />

            <Row>
              <Col md="4">
                <Button color="" style={{ marginLeft: "0px", backgroundColor: DEAGreen, color: "black", fontSize: "16px" }}
                  onClick={this.submit}>
                  <b>{editing === true ? "Update" : "Add"}</b>
                </Button>
              </Col>
            </Row>

            <Row style={{ marginTop: "15px" }}>
              <Col md="12">
                <label style={{ fontWeight: "bold", marginBottom: "0px" }}>
                  Based on your submission, your Goal 1 status is:
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
        <br />

        {showNCCRD &&
          <NCCRD goalId={goalId} closeCallback={() => { this.setState({ showNCCRD: false }) }} />
        }

        {/* Message modal */}
        <Container>
          <Modal isOpen={this.state.messageModal} toggle={() => { this.setState({ messageModal: false }) }} centered>
            <ModalHeader toggle={() => { this.setState({ messageModal: false }) }}>
              {this.state.title}
            </ModalHeader>
            <ModalBody>
              <div className="col-md-12" style={{ overflowY: "auto", maxHeight: "65vh" }}>
                {_gf.StringToHTML(this.state.message)}
              </div>
            </ModalBody>
            <ModalFooter>
              <Button
                size="sm"
                style={{ width: "100px", backgroundColor: DEAGreen }}
                color="" onClick={() => this.setState({ messageModal: false })} >
                Close
              </Button>
            </ModalFooter>
          </Modal>
        </Container>
      </>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Goal1Contrib)