'use strict'

import React from 'react'
import { connect } from 'react-redux'
import { Row, Col, Button, Input, Modal, ModalHeader, ModalBody, ModalFooter, Container } from 'mdbreact'
import TextInput from '../../../input/TextInput.jsx'
import { DEAGreen, DEAGreenDark, Red, Amber, Green } from '../../../../config/colours.cfg'
import { apiBaseURL, ccrdBaseURL, vmsBaseURL } from '../../../../config/serviceURLs.cfg'
import SelectInput from '../../../input/SelectInput.jsx'
import TreeSelectInput from '../../../input/TreeSelectInput.jsx'
import OData from 'react-odata'
import buildQuery from 'odata-query'
import FileUpload from '../../../input/FileUpload.jsx'

//Ant.D
import Slider from 'antd/lib/slider'
import 'antd/lib/slider/style/css'

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
  messageModal: false,
  message: "",
  title: "",
  goalStatus: "R",
  goalId: _gf.GetUID(),
  Q5_1: 1,
  Q5_2: "",
  Q5_3_A: 1,
  Q5_3_B: 1,
  Q5_3_C: "",
  Q5_3_D: ""
}

class Goal5Contrib extends React.Component {

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

    let { goalStatus, Q5_1 } = this.state
    let newGoalStatus = "R"
    let redPoints = 0
    let amberPoints = 0
    let greenPoints = 0
   
    //Check red conditions
    if(Q5_1 === 1){
      redPoints += 1
    }

    //Check amber conditions
    if(Q5_1 === 2){
      amberPoints += 1
    }

    //Check green conditions
    if(Q5_1 === 3){
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
      let res = await fetch(apiBaseURL + `Goal5${query}`)
      res = await res.json()
      if (res.value && res.value.length > 0) {
        let data = res.value[0]
        this.setState({
          goalId: editGoalId,
          Q5_1: data.TechnologyAwareness,
          Q5_2: data.EvidenceLink,
          Q5_3_A: data.TotalBudget,
          Q5_3_B: data.BudgetDuration,
          Q5_3_C: data.FundingAgency,
          Q5_3_D: data.PartneringDepartments,
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

    let { goalId, Q5_1, Q5_2, Q5_3_A, Q5_3_B, Q5_3_C, Q5_3_D } = this.state
    let { setLoading, next, user } = this.props

    //Validate
    // if (Q2_1 == true && Q2_1_A === "") {
    //   this.showMessage("Required", "Organogram attachment required")
    //   return
    // }

    // if (isNaN(Q2_2_A)) {
    //   this.showMessage("Required", "Total budget must be a number")
    //   return
    // }

    setLoading(true)

    //Submit
    try {
      let res = await fetch(apiBaseURL + 'Goal5', {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "Authorization": "Bearer " + (user === null ? "" : user.access_token)
        },
        body: JSON.stringify({
          Id: goalId,
          TechnologyAwareness: Q5_1,
          EvidenceLink: Q5_2,
          TotalBudget: Q5_3_A,
          BudgetDuration: Q5_3_B,
          FundingAgency: Q5_3_C,
          PartneringDepartments: Q5_3_D,
          CreateUserId: user.profile.UserId
        })
      })

      if (!res.ok) {
        //Get response body
        res = await res.json()
        throw new Error(res.error.message)
      }

      setLoading(false)
      this.showMessage("Success", "Goal submitted successfully")
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

    let { goalStatus, goalId, Q5_1, Q5_2, Q5_3_A, Q5_3_B, Q5_3_C, Q5_3_D } = this.state

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
              Goal 5. New and adapted technologies/knowledge and other cost-effective measures (e.g.
              nature-based solutions) used in climate change adaptation.
            </h5>
            <p style={{ marginTop: "20px", marginBottom: "2px" }}>
              <b>What is being monitored and evaluated:</b>
            </p>
            <ol style={{ marginLeft: "-15px" }}>
              <li>
                New technologies, research and knowledge adopted;
              </li>
              <li>
                Indigenous knowledge systems;
              </li>
              <li>
                Technology needs assessments;
              </li>
              <li>
                Technology transfer and access (national and global);
              </li>
              <li>
                Web-based tools on technologies and technology transfer opportunities; and
              </li>
              <li>
                Other adaptation challenges and opportunities on technologies, research and knowledge.
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
                      Lack of awareness/understanding of newly developed technologies, research and
                      knowledge leading to poor or no application.
                    </p>
                  </td>
                </tr>
                <tr style={{ backgroundColor: Amber }}>
                  <td style={{ color: "white", padding: "10px" }}>
                    <p style={{ marginBottom: "0px" }}>
                      <b>AMBER </b>
                      Awareness/ understanding of technologies, research and knowledge but no implementation
                      and utilisation.
                    </p>
                  </td>
                </tr>
                <tr style={{ backgroundColor: Green }}>
                  <td style={{ color: "white", padding: "10px" }}>
                    <p style={{ marginBottom: "0px" }}>
                      <b>GREEN </b>
                      Evidence of implementation and utilisation of technologies and knowledge (e.g. 100
                      households now have rainwater harvesting devices and have received training on how
                      to use and maintain them).
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
              Goal 5 Assessment
            </h5>
            <br />

            <Row>
              <Col md="12">
                <label style={{ fontWeight: "bold" }}>
                  5.1 Is there an awareness/understanding of new climate change adaptation technologies
                  within your organisation?
                </label>
                <div style={{ marginLeft: "-22px", marginTop: "-10px" }}>
                  <Input
                    onClick={() => { this.setState({ Q5_1: 1 }) }}
                    checked={Q5_1 === 1 ? true : false}
                    label="No or low awareness/understanding of newly developed technologies, research and knowledge leading to poor or no application."
                    type="radio"
                    id="radTech1"
                  />
                  <Input
                    onClick={() => { this.setState({ Q5_1: 2 }) }}
                    checked={Q5_1 === 2 ? true : false}
                    label="Awareness/understanding of technologies, research and knowledge but no implementation and utilisation."
                    type="radio"
                    id="radTech2"
                  />
                  <Input
                    onClick={() => { this.setState({ Q5_1: 3 }) }}
                    checked={Q5_1 === 3 ? true : false}
                    label="Evidence of implementation and utilisation of technologies and knowledge (e.g. 100 households now have rainwater harvesting devices and have received training on how to use and maintain them)."
                    type="radio"
                    id="radTech3"
                  />
                </div>
              </Col>
            </Row>

            <Row style={{ marginBottom: "7px" }}>
              <Col md="12">
                <label style={{ fontWeight: "bold", marginTop: "5px" }}>
                  5.2 Add attachments to any evidence:
                </label>
                <TextInput
                  width="95%"
                  value={Q5_2}
                  callback={(value) => {
                    value = _gf.fixEmptyValue(value, "")
                    this.setState({ Q5_2: value })
                  }}
                />
              </Col>
            </Row>
            <Row style={{ marginBottom: "7px" }}>
              <Col md="4">
                <FileUpload
                  key={"fu_" + goalId}
                  style={{ marginTop: "-15px", marginBottom: "20px" }}
                  width="100%"
                  callback={(fileInfo) => { this.setState({ Q5_2: fileInfo.ViewLink }) }}
                  goalId={goalId}
                />
              </Col>
            </Row>

            <Row>
              <Col md="12">
                <label style={{ fontWeight: "bold" }}>
                  5.3 Budget for adaptation technologies:
                </label>
              </Col>
            </Row>

            <Row style={{ marginBottom: "7px", marginLeft: "0px" }}>
              <Col md="12">
                <label style={{ fontWeight: "bold" }}>
                  What is the total budget for adaptation technologies?
                </label>
                <div style={{ backgroundColor: "#FCFCFC", padding: "10px 15px 5px 15px", borderRadius: "5px", border: "1px solid lightgrey" }} >
                  <Row style={{ marginBottom: "-10px" }}>
                    <Col md="2" style={{ textAlign: "left" }}>
                      <a onClick={() => { this.setState({ Q5_3_A: 1 }) }}>1k - 10k</a>
                    </Col>
                    <Col md="2" style={{ textAlign: "left" }}>
                      <a onClick={() => { this.setState({ Q5_3_A: 2 }) }}>10k - 100k</a>
                    </Col>
                    <Col md="2" style={{ textAlign: "center" }}>
                      <a onClick={() => { this.setState({ Q5_3_A: 3 }) }}>100k - 1m</a>
                    </Col>
                    <Col md="2" style={{ textAlign: "center" }}>
                      <a onClick={() => { this.setState({ Q5_3_A: 4 }) }}>1m - 10m</a>
                    </Col>
                    <Col md="2" style={{ textAlign: "right" }}>
                      <a onClick={() => { this.setState({ Q5_3_A: 5 }) }}>10m - 100m</a>
                    </Col>
                    <Col md="2" style={{ textAlign: "right" }}>
                      <a onClick={() => { this.setState({ Q5_3_A: 6 }) }}>> 100m</a>
                    </Col>
                  </Row>
                  <Slider
                    min={1}
                    max={6}
                    value={Q5_3_A}
                    style={{ marginLeft: "15px", marginRight: "15px" }}
                    onChange={(value) => { this.setState({ Q5_3_A: value }) }}
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
                      <a onClick={() => { this.setState({ Q5_3_B: 1 }) }}>1 - 5</a>
                    </Col>
                    <Col md="4" style={{ textAlign: "center" }}>
                      <a onClick={() => { this.setState({ Q5_3_B: 2 }) }}>5 - 10</a>
                    </Col>
                    <Col md="4" style={{ textAlign: "right" }}>
                      <a onClick={() => { this.setState({ Q5_3_B: 3 }) }}>> 10</a>
                    </Col>
                  </Row>
                  <Slider
                    min={1}
                    max={3}
                    value={Q5_3_B}
                    style={{ marginLeft: "15px", marginRight: "15px" }}
                    onChange={(value) => { this.setState({ Q5_3_B: value }) }}
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
                  baseUrl={ccrdBaseURL + `Funders`}
                  query={{
                    select: ['FunderId', 'FundingAgency'],
                    orderBy: ['FundingAgency']
                  }}>
                  {({ loading, error, data }) => {

                    let distinctFunders = []

                    if (loading) {
                      distinctFunders = ["Loading..."]
                    }

                    if (error) {
                      console.error(error)
                    }

                    if (data) {
                      if (data && data.value.length > 0) {

                        //Get distinct funders by 'FundingAgency'
                        data.value.forEach(item => {
                          if (!distinctFunders.includes(item.FundingAgency)) {
                            distinctFunders.push(item.FundingAgency)
                          }
                        })
                      }
                    }

                    return (
                      <SelectInput
                        data={distinctFunders.map(x => ({ id: distinctFunders.indexOf(x), text: x }))}
                        value={Q5_3_C}
                        callback={(value) => { this.setState({ Q5_3_C: value.text }) }}
                        allowClear={false}
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
                        value={Q5_3_D}
                        callback={(value) => { this.setState({ Q5_3_D: value.text }) }}
                        allowClear={false}
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
                  <b>Submit</b>
                </Button>
              </Col>
            </Row>

            <Row style={{ marginTop: "15px" }}>
              <Col md="12">
                <label style={{ fontWeight: "bold", marginBottom: "0px" }}>
                  Based on your submission, your Goal 5 status is:
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

export default connect(mapStateToProps, mapDispatchToProps)(Goal5Contrib)