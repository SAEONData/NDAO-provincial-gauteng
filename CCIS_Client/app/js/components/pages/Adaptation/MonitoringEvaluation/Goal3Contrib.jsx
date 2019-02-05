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
  Q3_1: 1, //DisseminationUtilisation
  Q3_2: 1, //MonitoringForcasting
  Q3_3: false, //DedicatedFunding
  Q3_3_A: 1, //TotalBudget
  Q3_3_B: 1, //BudgetDuration
  Q3_3_C: 0, //FundingAgency
  Q3_3_D: 0, //PartneringDepartments
  Q3_4: 0, //Region
  Q3_5: "", //Institution
  Q3_6: 0 //Sector
}

class Goal3Contrib extends React.Component {

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

    let { goalStatus, Q3_1, Q3_2 } = this.state
    let newGoalStatus = "R"
    let redPoints = 0
    let amberPoints = 0
    let greenPoints = 0

    //Check red conditions
    if (Q3_1 === 1) {
      redPoints += 1
    }
    if (Q3_2 === 1) {
      redPoints += 1
    }

    //Check amber conditions
    if (Q3_1 === 2) {
      amberPoints += 1
    }
    if (Q3_2 === 2) {
      amberPoints += 1
    }

    //Check green conditions
    if (Q3_1 === 3) {
      greenPoints += 1
    }
    if (Q3_2 === 3) {
      greenPoints += 1
    }

    //Parse result to status colour    
    if (greenPoints === 2) {
      newGoalStatus = "G"
    }
    else if (redPoints <= 1 || amberPoints > 0) {
      newGoalStatus = "A"
    }
    else if (redPoints >= 2) {
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
          Q3_1: parseInt(data.Questions.filter(x => x.Key === "DisseminationUtilisation")[0].Value),
          Q3_2: parseInt(data.Questions.filter(x => x.Key === "MonitoringForcasting")[0].Value),
          Q3_3: data.Questions.filter(x => x.Key === "DedicatedFunding")[0].Value === 'true',
          Q3_3_A: parseInt(data.Questions.filter(x => x.Key === "TotalBudget")[0].Value),
          Q3_3_B: parseInt(data.Questions.filter(x => x.Key === "BudgetDuration")[0].Value),
          Q3_3_C: parseInt(data.Questions.filter(x => x.Key === "FundingAgency")[0].Value),
          Q3_3_D: parseInt(data.Questions.filter(x => x.Key === "PartneringDepartments")[0].Value),
          Q3_4: parseInt(data.Questions.filter(x => x.Key === "Region")[0].Value),
          Q3_5: data.Questions.filter(x => x.Key === "Institution")[0].Value,
          Q3_6: parseInt(data.Questions.filter(x => x.Key === "Sector")[0].Value)
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

    let { goalId, goalStatus, Q3_1, Q3_2, Q3_3, Q3_3_A, Q3_3_B, Q3_3_C, Q3_3_D, Q3_4, Q3_5, Q3_6 } = this.state
    let { setLoading, next, user } = this.props

    setLoading(true)

    //Construct post body
    let goal = {
      Id: goalId,
      CreateUser: user.profile.UserId,
      Status: goalStatus,
      Type: 3,
      Questions: [
        { Key: "DisseminationUtilisation", Value: Q3_1.toString() },
        { Key: "MonitoringForcasting", Value: Q3_2.toString() },
        { Key: "DedicatedFunding", Value: Q3_3.toString() },
        { Key: "TotalBudget", Value: Q3_3_A.toString() },
        { Key: "BudgetDuration", Value: Q3_3_B.toString() },
        { Key: "FundingAgency", Value: Q3_3_C.toString() },
        { Key: "PartneringDepartments", Value: Q3_3_D.toString() },
        { Key: "Region", Value: Q3_4.toString() },
        { Key: "Institution", Value: Q3_5 },
        { Key: "Sector", Value: Q3_6.toString() }
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

    let { editing, goalStatus, goalId, Q3_1, Q3_2, Q3_3, Q3_3_A, Q3_3_B, Q3_3_C, Q3_3_D, Q3_4, Q3_5, Q3_6 } = this.state

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
              Goal 3. Accurate climate information (e.g. historical trend data, seasonal predictions,
              future projections, and early warning of extreme weather and other climate-related events)
              provided by existing and new monitoring and forecasting facilities/networks (including their
              maintenance and enhancement) to inform adaptation planning and disaster risk reduction.
            </h5>
            <p style={{ marginTop: "20px", marginBottom: "2px" }}>
              <b>What is being monitored and evaluated:</b>
            </p>
            <ol style={{ marginLeft: "-15px" }}>
              <li>
                Historical climate trends;
              </li>
              <li>
                Fine-scale projections, forecasts (seasonal to inter-annual and intra-seasonal variability)
                and early warning systems for provincial and municipal use;
              </li>
              <li>
                Dissemination and communication platforms for weather and climate-related events
                (e.g. SMS and media);
              </li>
              <li>
                Utilisation of data/information products by end-users; and
              </li>
              <li>
                Maintenance and enhancements of monitoring and forecasting facilities/networks.
              </li>
            </ol>
            <p style={{ marginBottom: "5px" }}>
              <b>How it is being evaluated:</b>
            </p>
            <table style={{ width: "95%", marginLeft: "-30px", marginBottom: "-15px" }}>
              <tbody>
                <tr>
                  <td width="30px">
                    <b>3.1</b>
                  </td>
                  <td style={{ color: "white", padding: "10px", backgroundColor: Red }}>
                    <p style={{ marginBottom: "0px" }}>
                      <b>RED </b>
                      No dissemination and utilisation of weather and climate-related information.
                    </p>
                  </td>
                </tr>
                <tr>
                  <td width="30px"></td>
                  <td style={{ color: "white", padding: "10px", backgroundColor: Amber }}>
                    <p style={{ marginBottom: "0px" }}>
                      <b>AMBER </b>
                      Dissemination but no utilisation of weather and climate-related information.
                    </p>
                  </td>
                </tr>
                <tr>
                  <td width="30px"></td>
                  <td style={{ color: "white", padding: "10px", backgroundColor: Green }}>
                    <p style={{ marginBottom: "0px" }}>
                      <b>GREEN </b>
                      Dissemination and utilisation of weather and climate-related information at
                      provincial, municipal and community levels.
                    </p>
                  </td>
                </tr>
              </tbody>
            </table>
            <br />
            <table style={{ width: "95%", marginLeft: "-30px" }}>
              <tbody>
                <tr>
                  <td width="30px">
                    <b>3.2</b>
                  </td>
                  <td style={{ color: "white", padding: "10px", backgroundColor: Red }}>
                    <p style={{ marginBottom: "0px" }}>
                      <b>RED </b>
                      Lack of monitoring and forecasting facilities/networks.
                    </p>
                  </td>
                </tr>
                <tr>
                  <td width="30px"></td>
                  <td style={{ color: "white", padding: "10px", backgroundColor: Amber }}>
                    <p style={{ marginBottom: "0px" }}>
                      <b>AMBER </b>
                      Monitoring facilities/networks exist but are not well-maintained or enhanced.
                    </p>
                  </td>
                </tr>
                <tr>
                  <td width="30px"></td>
                  <td style={{ color: "white", padding: "10px", backgroundColor: Green }}>
                    <p style={{ marginBottom: "0px" }}>
                      <b>GREEN </b>
                      Monitoring facilities/networks exist and are maintained and enhanced.
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
              Goal 3 Assessment
            </h5>
            <br />

            <Row>
              <Col md="12">
                <label style={{ fontWeight: "bold" }}>
                  3.1 Does your organisation participate in dissemination and/or utilisation of climate change information?
                </label>
                <div style={{ marginLeft: "-22px", marginTop: "-10px" }}>
                  <Input
                    onClick={() => { this.setState({ Q3_1: 1 }) }}
                    checked={Q3_1 === 1 ? true : false}
                    label="No dissemination and utilisation of weather and climate-related information."
                    type="radio"
                    id="radDiss1"
                  />
                  <Input
                    onClick={() => { this.setState({ Q3_1: 2 }) }}
                    checked={Q3_1 === 2 ? true : false}
                    label="Dissemination but no utilisation of weather and climate-related information."
                    type="radio"
                    id="radDiss2"
                  />
                  <Input
                    onClick={() => { this.setState({ Q3_1: 3 }) }}
                    checked={Q3_1 === 3 ? true : false}
                    label="Utilisation of weather and climate-related information at provincial, municipal and community levels."
                    type="radio"
                    id="radDiss3"
                  />
                </div>
              </Col>
            </Row>
            <br />

            <Row>
              <Col md="12">
                <label style={{ fontWeight: "bold" }}>
                  3.2 Does your organisation have access to data from or maintain monitoring and forecasting facilities/networks?
                </label>
                <div style={{ marginLeft: "-22px", marginTop: "-10px" }}>
                  <Input
                    onClick={() => { this.setState({ Q3_2: 1 }) }}
                    checked={Q3_2 === 1 ? true : false}
                    label="No monitoring and forecasting facilities/networks."
                    type="radio"
                    id="radMon1"
                  />
                  <Input
                    onClick={() => { this.setState({ Q3_2: 2 }) }}
                    checked={Q3_2 === 2 ? true : false}
                    label="Monitoring facilities/networks exist but are not well-maintained or enhanced."
                    type="radio"
                    id="radMon2"
                  />
                  <Input
                    onClick={() => { this.setState({ Q3_2: 3 }) }}
                    checked={Q3_2 === 3 ? true : false}
                    label="Monitoring facilities/networks exist and are maintained and enhanced."
                    type="radio"
                    id="radMon3"
                  />
                </div>
              </Col>
            </Row>
            <br />

            <Row style={{ marginBottom: "2px" }}>
              <Col md="12">
                <label style={{ fontWeight: "bold" }}>
                  3.3 Does your climate change unit have dedicated funding (y/n)?
                </label>
                <br />
                <Button
                  onClick={() => { this.setState({ Q3_3: true }) }}
                  color=""
                  style={{ fontSize: Q3_3 ? "13px" : "10px", marginLeft: "0px", backgroundColor: Q3_3 ? DEAGreen : "grey" }}
                  size="sm">
                  YES
                </Button>
                <Button
                  onClick={() => { this.setState({ Q3_3: false }) }}
                  color=""
                  style={{ fontSize: !Q3_3 ? "13px" : "10px", backgroundColor: !Q3_3 ? DEAGreen : "grey" }}
                  size="sm">
                  NO
                </Button>
              </Col>
            </Row>
            <br />

            {
              Q3_3 === true &&
              <div>
                <Row style={{ marginBottom: "7px", marginLeft: "0px" }}>
                  <Col md="12">
                    <label style={{ fontWeight: "bold" }}>
                      What is the total budget facilities/networks?
                </label>
                    <div style={{ backgroundColor: "#FCFCFC", padding: "10px 15px 5px 15px", borderRadius: "5px", border: "1px solid lightgrey" }} >
                      <Row style={{ marginBottom: "-10px" }}>
                        <Col md="2" style={{ textAlign: "left" }}>
                          <a onClick={() => { this.setState({ Q3_3_A: 1 }) }}>0k - 10k</a>
                        </Col>
                        <Col md="2" style={{ textAlign: "left" }}>
                          <a onClick={() => { this.setState({ Q3_3_A: 2 }) }}>10k - 100k</a>
                        </Col>
                        <Col md="2" style={{ textAlign: "center" }}>
                          <a onClick={() => { this.setState({ Q3_3_A: 3 }) }}>100k - 1m</a>
                        </Col>
                        <Col md="2" style={{ textAlign: "center" }}>
                          <a onClick={() => { this.setState({ Q3_3_A: 4 }) }}>1m - 10m</a>
                        </Col>
                        <Col md="2" style={{ textAlign: "right" }}>
                          <a onClick={() => { this.setState({ Q3_3_A: 5 }) }}>10m - 100m</a>
                        </Col>
                        <Col md="2" style={{ textAlign: "right" }}>
                          <a onClick={() => { this.setState({ Q3_3_A: 6 }) }}>> 100m</a>
                        </Col>
                      </Row>
                      <Slider
                        min={1}
                        max={6}
                        value={Q3_3_A}
                        style={{ marginLeft: "15px", marginRight: "15px" }}
                        onChange={(value) => { this.setState({ Q3_3_A: value }) }}
                      />
                    </div>
                  </Col>
                </Row>
                <br />

                <Row style={{ marginBottom: "7px", marginLeft: "0px" }}>
                  <Col md="5">
                    <label style={{ fontWeight: "bold" }}>
                      How long will the funding for the facilities/networks last?
                </label>
                    <div style={{ backgroundColor: "#FCFCFC", padding: "10px 15px 5px 15px", borderRadius: "5px", border: "1px solid lightgrey" }} >
                      <Row style={{ marginBottom: "-10px" }}>
                        <Col md="4" style={{ textAlign: "left" }}>
                          <a onClick={() => { this.setState({ Q3_3_B: 1 }) }}>0 - 5</a>
                        </Col>
                        <Col md="4" style={{ textAlign: "center" }}>
                          <a onClick={() => { this.setState({ Q3_3_B: 2 }) }}>5 - 10</a>
                        </Col>
                        <Col md="4" style={{ textAlign: "right" }}>
                          <a onClick={() => { this.setState({ Q3_3_B: 3 }) }}>> 10</a>
                        </Col>
                      </Row>
                      <Slider
                        min={1}
                        max={3}
                        value={Q3_3_B}
                        style={{ marginLeft: "15px", marginRight: "15px" }}
                        onChange={(value) => { this.setState({ Q3_3_B: value }) }}
                      />
                    </div>
                  </Col>
                </Row>
                <br />

                <Row style={{ marginBottom: "7px", marginLeft: "0px" }}>
                  <Col md="8">
                    <label style={{ fontWeight: "bold" }}>
                      Who is the funding agency for the facilities/networks?
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
                            value={Q3_3_C}
                            callback={(value) => { this.setState({ Q3_3_C: value.id }) }}
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
                      Are there any partnering departments/organisations that share the cost for the facilities/networks?
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
                            value={Q3_3_D}
                            callback={(value) => { this.setState({ Q3_3_D: value.id }) }}
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
                  3.4 Select a Region for this plan:
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
                        value={Q3_4}
                        callback={(value) => { this.setState({ Q3_4: value.id }) }}
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
                  3.5 Specify non-government organisation name (if applicable).
                </label>
                <TextInput
                  width="95%"
                  value={Q3_5}
                  callback={(value) => {
                    value = _gf.fixEmptyValue(value, "")
                    this.setState({ Q3_5: value })
                  }}
                />
              </Col>
            </Row>

            <Row>
              <Col md="8">
                <label style={{ fontWeight: "bold" }}>
                  3.6 Select a sector for this plan:
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
                        value={Q3_6}
                        callback={(value) => { this.setState({ Q3_6: value.id }) }}
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
                  Based on your submission, your Goal 3 status is:
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

export default connect(mapStateToProps, mapDispatchToProps)(Goal3Contrib)