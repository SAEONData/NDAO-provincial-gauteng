'use strict'

import React from 'react'
import { connect } from 'react-redux'
import { Row, Col, Button, Input, Modal, ModalHeader, ModalBody, ModalFooter, Container } from 'mdbreact'
import TextInput from '../../../input/TextInput.jsx'
import { DEAGreen, DEAGreenDark, Red, Amber, Green } from '../../../../config/colours.js'
import { apiBaseURL, ccrdBaseURL, vmsBaseURL } from '../../../../../js/config/serviceURLs.js'
import SelectInput from '../../../input/SelectInput.jsx'
import TreeSelectInput from '../../../input/TreeSelectInput.jsx'
import OData from 'react-odata'
import buildQuery from 'odata-query'

//Ant.D
import Slider from 'antd/lib/slider'
import 'antd/lib/slider/style/css'

import gear from '../../../../../images/Icons/gear.png'
import checklist from '../../../../../images/Icons/checklist.png'

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
  Q4_1: 1, //CapacityBuilding
  Q4_2: false, //DedicatedFunding
  Q4_2_A: 1, //TotalBudget
  Q4_2_B: 1, //BudgetDuration
  Q4_2_C: 0, //FundingAgency
  Q4_2_D: 0, //PartneringDepartments
  Q4_3: 0, //Region
  Q4_4: "", //Institution
  Q4_5: 0 //Sector
}

class Goal4Contrib extends React.Component {

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

  assessGoalStatus() {

    let { goalStatus, Q4_1 } = this.state
    let newGoalStatus = "R"
    let redPoints = 0
    let amberPoints = 0
    let greenPoints = 0

    //Check red conditions
    if (Q4_1 === 1) {
      redPoints += 1
    }

    //Check amber conditions
    if (Q4_1 === 2) {
      amberPoints += 1
    }

    //Check green conditions
    if (Q4_1 === 3) {
      greenPoints += 1
    }

    //Parse result to status colour    
    if (greenPoints > 0) {
      newGoalStatus = "G"
    }
    else if (amberPoints > 0) {
      newGoalStatus = "A"
    }
    else if (redPoints > 0) {
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
      filter: { Id: { eq: { type: 'guid', value: editGoalId.toString() } } },
      expand: "Questions"
    })

    try {
      let res = await fetch(apiBaseURL + `Goals${query}`)
      res = await res.json()
      if (res.value && res.value.length > 0) {
        let data = res.value[0]
        this.setState({
          editing: true,
          goalId: editGoalId,
          Q4_1: parseInt(data.Questions.filter(x => x.Key === "CapacityBuilding")[0].Value),
          Q4_2: data.Questions.filter(x => x.Key === "DedicatedFunding")[0].Value === 'true',
          Q4_2_A: parseInt(data.Questions.filter(x => x.Key === "TotalBudget")[0].Value),
          Q4_2_B: parseInt(data.Questions.filter(x => x.Key === "BudgetDuration")[0].Value),
          Q4_2_C: parseInt(data.Questions.filter(x => x.Key === "FundingAgency")[0].Value),
          Q4_2_D: parseInt(data.Questions.filter(x => x.Key === "PartneringDepartments")[0].Value),
          Q4_3: parseInt(data.Questions.filter(x => x.Key === "Region")[0].Value),
          Q4_4: data.Questions.filter(x => x.Key === "Institution")[0].Value,
          Q4_5: parseInt(data.Questions.filter(x => x.Key === "Sector")[0].Value),
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

    this.setState({ ...defaultState, goalId: _gf.GetUID() })

    setTimeout(() => {
      window.scroll({
        top: 180,
        left: 0,
        behavior: 'smooth'
      })
    }, 100)
  }

  async submit() {

    let { goalId, goalStatus, Q4_1, Q4_2, Q4_2_A, Q4_2_B, Q4_2_C, Q4_2_D, Q4_3, Q4_4, Q4_5 } = this.state
    let { setLoading, user } = this.props

    setLoading(true)

    //Construct post body
    let goal = {
      Id: goalId,
      CreateUser: user.profile.UserId,
      Status: goalStatus,
      Type: 4,
      Questions: [
        { Key: "CapacityBuilding", Value: Q4_1.toString() },
        { Key: "DedicatedFunding", Value: Q4_2.toString() },
        { Key: "TotalBudget", Value: Q4_2_A.toString() },
        { Key: "BudgetDuration", Value: Q4_2_B.toString() },
        { Key: "FundingAgency", Value: Q4_2_C.toString() },
        { Key: "PartneringDepartments", Value: Q4_2_D.toString() },
        { Key: "Region", Value: Q4_3.toString() },
        { Key: "Institution", Value: Q4_4 },
        { Key: "Sector", Value: Q4_5.toString() }
      ]
    }

    //Submit
    try {
      let res = await fetch(apiBaseURL + 'Goals', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer " + (user === null ? "" : user.access_token)
        },
        body: JSON.stringify(goal)
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

    let { editing, goalStatus, goalId, Q4_1, Q4_2, Q4_2_A, Q4_2_B, Q4_2_C, Q4_2_D, Q4_3, Q4_4, Q4_5 } = this.state

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
              Goal 4. Capacity development, education and awareness programmes (formal and informal) for
              climate change adaptation (e.g. informed by adaptation research and with tools to
              utilise data/outputs).
            </h5>
            <p style={{ marginTop: "20px", marginBottom: "2px" }}>
              <b>What is being monitored and evaluated:</b>
            </p>
            <ol style={{ marginLeft: "-15px" }}>
              <li>
                Number of capacity development programmes (including students, staff, researchers and
                institutions) addressing climate change adaptation;
              </li>
              <li>
                Coverage of adaptation research and training being undertaken and financed;
              </li>
              <li>
                Uptake of research outcomes and human capacity trained in adaptation;
              </li>
              <li>
                Collaboration and partnerships between sectors, businesses, provinces, municipalities
                and researchers; and
              </li>
              <li>
                Incorporation of climate change issues into school curriculum.
              </li>
            </ol>
            <p style={{ marginBottom: "3px" }}>
              <b>How it is being evaluated:</b>
            </p>
            <table style={{ width: "95%" }}>
              <tbody>
                <tr style={{ backgroundColor: Red }}>
                  <td style={{ color: "white", padding: "10px" }}>
                    <p style={{ marginBottom: "0px" }}>
                      <b>RED </b>
                      No capacity building programmes (including research), collaboration and partnerships
                      to address climate change adaptation and no incorporation into school curriculum.
                    </p>
                  </td>
                </tr>
                <tr style={{ backgroundColor: Amber }}>
                  <td style={{ color: "white", padding: "10px" }}>
                    <p style={{ marginBottom: "0px" }}>
                      <b>AMBER </b>
                      Attendance of capacity building programmes but no utilisation, collaboration and
                      partnerships to address climate change adaptation and no incorporation into school
                      curriculum.
                    </p>
                  </td>
                </tr>
                <tr style={{ backgroundColor: Green }}>
                  <td style={{ color: "white", padding: "10px" }}>
                    <p style={{ marginBottom: "0px" }}>
                      <b>GREEN </b>
                      Capacity building programmes (including research and utilisation), collaboration
                      and partnerships to address climate change adaptation, incorporation into school
                      curriculum, and utilisation to inform policy and decision-making.
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
              Goal 4 Assessment
            </h5>
            <br />

            <Row>
              <Col md="12">
                <label style={{ fontWeight: "bold" }}>
                  4.1 Does your organisation participate in, support, or host climate change adaptation capacity building programmes?
                </label>
                <div style={{ marginLeft: "-22px", marginTop: "-10px" }}>
                  <Input
                    onClick={() => { this.setState({ Q4_1: 1 }) }}
                    checked={Q4_1 === 1 ? true : false}
                    label="No capacity building programmes (including research), collaboration and partnerships to address climate change adaptation and no incorporation into school curriculum."
                    type="radio"
                    id="radPrg1"
                  />
                  <Input
                    onClick={() => { this.setState({ Q4_1: 2 }) }}
                    checked={Q4_1 === 2 ? true : false}
                    label="Attendance of capacity building programmes but no utilisation, collaboration and partnerships to address climate change adaptation and no incorporation into school curriculum."
                    type="radio"
                    id="radPrg2"
                  />
                  <Input
                    onClick={() => { this.setState({ Q4_1: 3 }) }}
                    checked={Q4_1 === 3 ? true : false}
                    label="Capacity building programmes (including research and utilisation), collaboration and partnerships to address climate change adaptation, incorporation into school curriculum, and utilisation to inform policy and decision-making."
                    type="radio"
                    id="radPrg3"
                  />
                </div>
              </Col>
            </Row>
            <br />

            <Row>
              <Col md="12">
                <label style={{ fontWeight: "bold" }}>
                  4.2 Does your climate change unit have dedicated funding for adaptation technologies (y/n)?
                </label>
                <br />
                <Button
                  onClick={() => { this.setState({ Q4_2: true }) }}
                  color=""
                  style={{ fontSize: Q4_2 ? "13px" : "10px", marginLeft: "0px", backgroundColor: Q4_2 ? DEAGreen : "grey" }}
                  size="sm">
                  YES
                </Button>
                <Button
                  onClick={() => { this.setState({ Q4_2: false }) }}
                  color=""
                  style={{ fontSize: !Q4_2 ? "13px" : "10px", backgroundColor: !Q4_2 ? DEAGreen : "grey" }}
                  size="sm">
                  NO
                </Button>
              </Col>
            </Row>
            <br />

            {
              Q4_2 === true &&
              <div>
                <Row style={{ marginBottom: "7px", marginLeft: "0px" }}>
                  <Col md="12">
                    <label style={{ fontWeight: "bold" }}>
                      What is the total budget for adaptation technologies?
                </label>
                    <div style={{ backgroundColor: "#FCFCFC", padding: "10px 15px 5px 15px", borderRadius: "5px", border: "1px solid lightgrey" }} >
                      <Row style={{ marginBottom: "-10px" }}>
                        <Col md="2" style={{ textAlign: "left" }}>
                          <a onClick={() => { this.setState({ Q4_2_A: 1 }) }}>0k - 10k</a>
                        </Col>
                        <Col md="2" style={{ textAlign: "left" }}>
                          <a onClick={() => { this.setState({ Q4_2_A: 2 }) }}>10k - 100k</a>
                        </Col>
                        <Col md="2" style={{ textAlign: "center" }}>
                          <a onClick={() => { this.setState({ Q4_2_A: 3 }) }}>100k - 1m</a>
                        </Col>
                        <Col md="2" style={{ textAlign: "center" }}>
                          <a onClick={() => { this.setState({ Q4_2_A: 4 }) }}>1m - 10m</a>
                        </Col>
                        <Col md="2" style={{ textAlign: "right" }}>
                          <a onClick={() => { this.setState({ Q4_2_A: 5 }) }}>10m - 100m</a>
                        </Col>
                        <Col md="2" style={{ textAlign: "right" }}>
                          <a onClick={() => { this.setState({ Q4_2_A: 6 }) }}>> 100m</a>
                        </Col>
                      </Row>
                      <Slider
                        min={1}
                        max={6}
                        value={Q4_2_A}
                        style={{ marginLeft: "15px", marginRight: "15px" }}
                        onChange={(value) => { this.setState({ Q4_2_A: value }) }}
                      />
                    </div>
                  </Col>
                </Row>
                <br />

                <Row style={{ marginBottom: "7px", marginLeft: "0px" }}>
                  <Col md="5">
                    <label style={{ fontWeight: "bold" }}>
                      How long will the funding for the adaptation technologies last?
                </label>
                    <div style={{ backgroundColor: "#FCFCFC", padding: "10px 15px 5px 15px", borderRadius: "5px", border: "1px solid lightgrey" }} >
                      <Row style={{ marginBottom: "-10px" }}>
                        <Col md="4" style={{ textAlign: "left" }}>
                          <a onClick={() => { this.setState({ Q4_2_B: 1 }) }}>0 - 5</a>
                        </Col>
                        <Col md="4" style={{ textAlign: "center" }}>
                          <a onClick={() => { this.setState({ Q4_2_B: 2 }) }}>5 - 10</a>
                        </Col>
                        <Col md="4" style={{ textAlign: "right" }}>
                          <a onClick={() => { this.setState({ Q4_2_B: 3 }) }}>> 10</a>
                        </Col>
                      </Row>
                      <Slider
                        min={1}
                        max={3}
                        value={Q4_2_B}
                        style={{ marginLeft: "15px", marginRight: "15px" }}
                        onChange={(value) => { this.setState({ Q4_2_B: value }) }}
                      />
                    </div>
                  </Col>
                </Row>
                <br />

                <Row style={{ marginBottom: "7px", marginLeft: "0px" }}>
                  <Col md="8">
                    <label style={{ fontWeight: "bold" }}>
                      Who is the funding agency for the adaptation technologies?
                </label>

                    <OData
                      baseUrl={ccrdBaseURL + 'Funders'}
                      query={{
                        select: ['FunderId', 'FundingAgency'],
                        orderBy: ['FundingAgency']
                      }}>

                      {({ loading, error, data }) => {

                        let processedData = []

                        if (loading) {
                          processedData = [{ FunderId: "Loading...", FundingAgency: "Loading..." }]
                        }

                        if (error) {
                          console.error(error)
                        }

                        if (data) {
                          if (data.value && data.value.length > 0) {
                            processedData = data.value
                          }
                        }

                        return (
                          <TreeSelectInput
                            data={processedData}
                            transform={(item) => { return { id: item.FunderId, text: item.FundingAgency } }}
                            value={Q4_2_C}
                            callback={(value) => { this.setState({ Q4_2_C: value.id }) }}
                            allowClear={true}
                            placeHolder={"Select Funding Agency...  (Leave empty for 'None')"}
                          />
                        )
                      }}
                    </OData>
                  </Col>
                </Row>
                <br />

                <Row style={{ marginBottom: "7px", marginLeft: "0px" }}>
                  <Col md="8">
                    <label style={{ fontWeight: "bold" }}>
                      Are there any partnering departments/organisations that share the cost for the adaptation
                        technologies?
                </label>

                    <OData
                      baseUrl={vmsBaseURL + 'SAGovDepts'}>

                      {({ loading, error, data }) => {

                        let processedData = []

                        if (loading) {
                          processedData = [{ id: "Loading...", value: "Loading..." }]
                        }

                        if (error) {
                          console.error(error)
                        }

                        if (data) {
                          if (data.items && data.items.length > 0) {
                            processedData = data.items
                          }
                        }

                        return (
                          <TreeSelectInput
                            data={processedData}
                            transform={(item) => { return { id: item.id, text: item.value, children: item.children } }}
                            value={Q4_2_D}
                            callback={(value) => { this.setState({ Q4_2_D: value.id }) }}
                            allowClear={true}
                            placeHolder={"Select Departments/Organisations...  (Leave empty for 'None')"}
                          />
                        )
                      }}
                    </OData>

                  </Col>
                </Row>
                <br />
              </div>
            }

            <Row>
              <Col md="8">
                <label style={{ fontWeight: "bold" }}>
                  4.3 Select a Region for this plan:
                </label>

                <OData
                  baseUrl={vmsBaseURL + 'Regions'}>

                  {({ loading, error, data }) => {

                    let processedData = []

                    if (loading) {
                      processedData = [{ id: "Loading...", value: "Loading..." }]
                    }

                    if (error) {
                      console.error(error)
                    }

                    if (data) {
                      if (data.items && data.items.length > 0) {
                        processedData = data.items
                      }
                    }

                    return (
                      <TreeSelectInput
                        data={processedData}
                        transform={(item) => { return { id: item.id, text: item.value, children: item.children } }}
                        value={Q4_3}
                        callback={(value) => { this.setState({ Q4_3: value.id }) }}
                        allowClear={true}
                        placeHolder={"Select Region...  (Leave empty for 'National')"}
                      />
                    )

                  }}
                </OData>
              </Col>
            </Row>
            <br />

            <Row>
              <Col md="12">
                <label style={{ fontWeight: "bold" }}>
                  4.4 Specify non-government organisation name (if applicable).
                </label>
                <TextInput
                  width="95%"
                  value={Q4_4}
                  callback={(value) => {
                    value = _gf.fixEmptyValue(value, "")
                    this.setState({ Q4_4: value })
                  }}
                />
              </Col>
            </Row>

            <Row>
              <Col md="8">
                <label style={{ fontWeight: "bold" }}>
                  4.5 Select a sector for this plan:
                </label>

                <OData
                  baseUrl={vmsBaseURL + 'sectors'}>

                  {({ loading, error, data }) => {

                    let processedData = []

                    if (loading) {
                      processedData = [{ id: "Loading...", value: "Loading..." }]
                    }

                    if (error) {
                      console.error(error)
                    }

                    if (data) {
                      if (data.items && data.items.length > 0) {
                        processedData = data.items
                      }
                    }

                    return (
                      <TreeSelectInput
                        data={processedData}
                        transform={(item) => { return { id: item.id, text: item.value, children: item.children } }}
                        value={Q4_5}
                        callback={(value) => { this.setState({ Q4_5: value.id }) }}
                        allowClear={true}
                        placeHolder={"Select Sector...  (Leave empty for 'Any')"}
                      />
                    )
                  }}
                </OData>
              </Col>
            </Row>
            <br />

            <Row>
              <Col md="4">
                <Button color="" style={{ marginLeft: "0px", backgroundColor: DEAGreen, color: "black", fontSize: "16px" }}
                  onClick={this.submit} >
                  <b>{editing === true ? "Update" : "Save"}</b>
                </Button>
              </Col>
            </Row>

            <Row style={{ marginTop: "15px" }}>
              <Col md="12">
                <label style={{ fontWeight: "bold", marginBottom: "0px" }}>
                  Based on your submission, your Goal 4 status is:
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

export default connect(mapStateToProps, mapDispatchToProps)(Goal4Contrib)