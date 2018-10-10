'use strict'

import React from 'react'
import { connect } from 'react-redux'
import { Row, Col, Button, Input, Modal, ModalHeader, ModalBody, ModalFooter, Container } from 'mdbreact'
import TextInput from '../../../input/TextInput.jsx'
import { DEAGreen, DEAGreenDark, Red, Amber, Green } from '../../../../config/colours.cfg'
import { apiBaseURL, ccrdBaseURL } from '../../../../config/serviceURLs.cfg'
import FileUpload from '../../../input/FileUpload.jsx'
import OData from 'react-odata'
import buildQuery from 'odata-query'
import TreeSelectInput from '../../../input/TreeSelectInput.jsx'

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
  goalId: _gf.GetUID(),
  Q6_1: 1,
  Q6_2: "",
  Q6_3: 0 //Region
}

class Goal6Contrib extends React.Component {

  constructor(props) {
    super(props);

    this.submit = this.submit.bind(this)
    this.reset = this.reset.bind(this)
    this.showMessage = this.showMessage.bind(this)
    this.assessGoalStatus = this.assessGoalStatus.bind(this)

    this.state = defaultState
  }

  componentDidMount() {
    this.props.updateNav(location.hash)
  }

  componentDidUpdate() {
    let { editGoalId } = this.props
    if (editGoalId) {
      this.getEditGoalData(editGoalId)
    }

    this.assessGoalStatus()
  }

  assessGoalStatus(){

    let { goalStatus, Q6_1 } = this.state
    let newGoalStatus = "R"
    let redPoints = 0
    let amberPoints = 0
    let greenPoints = 0
   
    //Check red conditions
    if(Q6_1 === 1){
      redPoints += 1
    }

    //Check amber conditions
    if(Q6_1 === 2){
      amberPoints += 1
    }

    //Check green conditions
    if(Q6_1 === 3){
      greenPoints += 1
    }

    //Parse result to status colour    
    if(greenPoints > 0){
      newGoalStatus = "G"
    }
    else if(amberPoints > 0){
      newGoalStatus = "A"
    }
    else if(redPoints > 0){
      newGoalStatus = "R"
    }

    //Update status
    if (newGoalStatus !== goalStatus) {
      this.setState({ goalStatus: newGoalStatus })
    }   
  }

  async waitForMessageClosed() {

    while (this.state.messageModal === true) {
      await _gf.wait(250)
    }

    return true
  }

  async getEditGoalData(editGoalId) {

    this.props.setLoading(true)
    this.props.resetEdit()

    //Fetch goal details from server
    const query = buildQuery({
      key: { Id: editGoalId }
    })

    try {
      let res = await fetch(apiBaseURL + `Goal6${query}`)
      res = await res.json()
      if (res.value && res.value.length > 0) {
        let data = res.value[0]
        this.setState({
          editing: true,
          goalId: editGoalId,
          Q6_1: data.ProfilesAndAssessments,
          Q6_2: data.EvidenceLink,
          Q6_3: data.RegionId
        })
      }

      this.props.setLoading(false)
    }
    catch (ex) {
      this.props.setLoading(false)
      console.error(ex)
    }
  }

  async reset() {

    await this.waitForMessageClosed();

    this.setState( { ...defaultState, goalId: _gf.GetUID() })

    setTimeout(() => {
      window.scroll({
        top: 180,
        left: 0,
        behavior: 'smooth'
      })
    }, 100)
  }

  async submit() {

    let { goalId, goalStatus, Q6_1, Q6_2, Q6_3 } = this.state
    let { setLoading, next, user } = this.props

    setLoading(true)

    //Submit
    try {
      let res = await fetch(apiBaseURL + 'Goal6', {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "Authorization": "Bearer " + (user === null ? "" : user.access_token) 
        },
        body: JSON.stringify({
          Id: goalId,
          ProfilesAndAssessments: Q6_1,
          EvidenceLink: Q6_2,
          CreateUserId: user.profile.UserId,
          Status: goalStatus,
          RegionId: Q6_3
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

  showMessage(title, message) {
    this.setState({
      title,
      message,
      messageModal: true
    })
  }

  render() {

    let { editing, goalStatus, goalId, Q6_1, Q6_2, Q6_3 } = this.state

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
              Goal 6. Climate change risks, impacts and vulnerabilities identified and addressed.
            </h5>
            <p style={{ marginTop: "20px", marginBottom: "2px" }}>
              <b>What is being monitored and evaluated:</b>
            </p>
            <p>
              Details of sectoral, business, provincial and municipal risk profiles and vulnerability
              assessments and measures/actions to address the identified risks, impacts and vulnerabilities
              in businesses, sectors, provinces and municipalities.
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
                      No risk and vulnerability profiles.
                    </p>
                  </td>
                </tr>
                <tr style={{ backgroundColor: Amber }}>
                  <td style={{ color: "white", padding: "10px" }}>
                    <p style={{ marginBottom: "0px" }}>
                      <b>AMBER </b>
                      Risk and vulnerability profiles identified.
                    </p>
                  </td>
                </tr>
                <tr style={{ backgroundColor: Green }}>
                  <td style={{ color: "white", padding: "10px" }}>
                    <p style={{ marginBottom: "0px" }}>
                      <b>GREEN </b>
                      Risks, impacts and vulnerabilities addressed in policies, plans and actions.
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
              Goal 6 Assessment
            </h5>
            <br />

            <Row>
              <Col md="12">
                <label style={{ fontWeight: "bold" }}>
                  6.1 Are risk profiles and vulnerability assessments used to determine risks, vulnerabilities
                  and impacts in measures, plans, or actions within your organisation?
                </label>
                <div style={{ marginLeft: "-22px", marginTop: "-10px" }}>
                  <Input
                    onClick={() => { this.setState({ Q6_1: 1 }) }}
                    checked={Q6_1 === 1 ? true : false}
                    label="No risk and vulnerability profiles."
                    type="radio"
                    id="radFC1"
                  />
                  <Input
                    onClick={() => { this.setState({ Q6_1: 2 }) }}
                    checked={Q6_1 === 2 ? true : false}
                    label="Risk and vulnerability profiles identified."
                    type="radio"
                    id="radFC2"
                  />
                  <Input
                    onClick={() => { this.setState({ Q6_1: 3 }) }}
                    checked={Q6_1 === 3 ? true : false}
                    label="Risks, impacts and vulnerabilities addressed in policies, plans and actions."
                    type="radio"
                    id="radFC3"
                  />
                </div>
              </Col>
            </Row>
            <br />

            <Row style={{ marginBottom: "7px" }}>
              <Col md="12">
                <label style={{ fontWeight: "bold", marginTop: "5px" }}>
                  6.2 Add attachments to any evidence:
                </label>
                <br />
                <TextInput
                  width="95%"
                  value={Q6_2}
                  callback={(value) => {
                    value = _gf.fixEmptyValue(value, "")
                    this.setState({ Q6_2: value })
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
                  callback={(fileInfo) => { this.setState({ Q6_2: fileInfo.ViewLink }) }}
                  goalId={goalId}
                />
              </Col>
            </Row>

            <Row>
              <Col md="8">
                <label style={{ fontWeight: "bold" }}>
                  6.3 What is the effective region for this goal?
                </label>

                <OData
                  baseUrl={ccrdBaseURL + `Regions`}
                  query={{
                    select: ["RegionId", "RegionName", "LocationTypeId", "ParentRegionId"],
                    orderBy: ['RegionName']
                  }}>
                  {({ loading, error, data }) => {

                    let regions = []

                    if (loading) {
                      regions = [{ id: 1, text: "Loading..." }]
                    }

                    if (error) {
                      console.error(error)
                    }

                    if (data && data.value.length > 0) {
                      regions = data.value
                    }

                    //Get current value
                    let value = ""
                    if (regions && regions.length > 0) {
                      let f = regions.filter(x => x.RegionId == Q6_3)
                      if (f && f.length > 0 && f[0].RegionName) {
                        value = f[0].RegionName
                      }
                    }

                    return (
                      <TreeSelectInput
                        data={_gf.TransformDataToTree(regions)}
                        allowClear={true}
                        value={value}
                        callback={(value) => { this.setState({ Q6_3: value.id }) }}
                        placeHolder={"National"}
                      />
                    )

                  }}
                </OData>

                <label style={{ fontSize: "14px", marginTop: "5px" }}>
                  <i>* Leave empty for National</i>
                </label>
              </Col>
            </Row>
            <br />

            <Row>
              <Col md="4">
                <Button color="" style={{ marginLeft: "0px", backgroundColor: DEAGreen, color: "black", fontSize: "16px" }}
                  onClick={this.submit} >
                  <b>{editing === true ? "Update" : "Add"}</b>
                </Button>
              </Col>
            </Row>

            <Row style={{ marginTop: "15px" }}>
              <Col md="12">
                <label style={{ fontWeight: "bold", marginBottom: "0px", marginTop: "5px" }}>
                  Based on your submission, your Goal 6 status is:
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

export default connect(mapStateToProps, mapDispatchToProps)(Goal6Contrib)