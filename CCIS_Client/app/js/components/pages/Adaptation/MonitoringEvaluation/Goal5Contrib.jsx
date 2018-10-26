'use strict'

import React from 'react'
import { connect } from 'react-redux'
import { Row, Col, Button, Modal, ModalHeader, ModalBody, ModalFooter, Input } from 'mdbreact'
import TextInput from '../../../input/TextInput.jsx'
import TextAreaInput from '../../../input/TextAreaInput.jsx'
import { DEAGreen, Red, Amber, Green } from '../../../../config/colours.cfg'
import { apiBaseURL, ccrdBaseURL, vmsBaseURL } from '../../../../config/serviceURLs.cfg'
import TreeSelectInput from '../../../input/TreeSelectInput.jsx'
import OData from 'react-odata'
import buildQuery from 'odata-query'
import FileUpload from '../../../input/FileUpload.jsx'
import { metaDocFormatsList } from '../../../../../data/metaDocFormatsList.js'
import { metaKeywordsList } from '../../../../../data/metaKeywordsList.js'

//Ant.D
import Slider from 'antd/lib/slider'
import 'antd/lib/slider/style/css'

import gear from '../../../../../images/gear.png'
import checklist from '../../../../../images/checklist.png'

const _gf = require('../../../../globalFunctions')
const _sf = require('./SharedFunctions.js')

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
  Q5_1: 1, //TechnologyAwareness
  Q5_2: "", //EvidenceLink
  Q5_3_A: 1, //TotalBudget
  Q5_3_B: 1, //BudgetDuration
  Q5_3_C: 0, //FundingAgency
  Q5_3_D: 0, //PartneringDepartments
  Q5_4: 0, //Region
  Q5_5: "", //Institution
  Q5_6: 0, //Sector
  metaAddAuthorModal: false,
  tmpMetaAuthorName: "",
  tmpMetaAuthorEmail: "",
  tmpMetaAuthorJobTitle: "",
  tmpMetaAuthorInstitution: "",
  metaAuthors: [],
  metaDocTitle: "",
  metaKeywords: [],
  metaDocFormat: "",
  metaDocDescr: "",
  metaAgreement: false
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

  assessGoalStatus() {

    let { goalStatus, Q5_1 } = this.state
    let newGoalStatus = "R"
    let redPoints = 0
    let amberPoints = 0
    let greenPoints = 0

    //Check red conditions
    if (Q5_1 === 1) {
      redPoints += 1
    }

    //Check amber conditions
    if (Q5_1 === 2) {
      amberPoints += 1
    }

    //Check green conditions
    if (Q5_1 === 3) {
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
          Q5_1: parseInt(data.Questions.filter(x => x.Key === "TechnologyAwareness")[0].Value),
          Q5_2: data.Questions.filter(x => x.Key === "EvidenceLink")[0].Value,
          Q5_3_A: parseInt(data.Questions.filter(x => x.Key === "TotalBudget")[0].Value),
          Q5_3_B: parseInt(data.Questions.filter(x => x.Key === "BudgetDuration")[0].Value),
          Q5_3_C: parseInt(data.Questions.filter(x => x.Key === "FundingAgency")[0].Value),
          Q5_3_D: parseInt(data.Questions.filter(x => x.Key === "PartneringDepartments")[0].Value),
          Q5_4: parseInt(data.Questions.filter(x => x.Key === "Region")[0].Value),
          Q5_5: data.Questions.filter(x => x.Key === "Institution")[0].Value,
          Q5_6: parseInt(data.Questions.filter(x => x.Key === "Sector")[0].Value),
          metaAuthors: data.Questions.filter(x => x.Key === "DocumentAuthors")[0].Value.split("||"),
          metaDocTitle: data.Questions.filter(x => x.Key === "DocumentTitle")[0].Value,
          metaKeywords: data.Questions.filter(x => x.Key === "DocumentKeywords")[0].Value.split("||"),
          metaDocFormat: data.Questions.filter(x => x.Key === "DocumentFormat")[0].Value,
          metaDocDescr: data.Questions.filter(x => x.Key === "DocumentDescription")[0].Value,
          metaAgreement: data.Questions.filter(x => x.Key === "DocumentAgreement")[0].Value === 'true'
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

    let {
      goalId, goalStatus, Q5_1, Q5_2, Q5_3_A, Q5_3_B, Q5_3_C, Q5_3_D, Q5_4, Q5_5, Q5_6,
      metaAuthors, metaDocTitle, metaKeywords, metaDocFormat, metaDocDescr, metaAgreement
    } = this.state
    let { setLoading, user } = this.props

    setLoading(true)

    //Construct post body
    let goal = {
      Id: goalId,
      CreateUser: user.profile.UserId,
      Status: goalStatus,
      Type: 5,
      Questions: [
        { Key: "TechnologyAwareness", Value: Q5_1.toString() },
        { Key: "EvidenceLink", Value: Q5_2 },
        { Key: "TotalBudget", Value: Q5_3_A.toString() },
        { Key: "BudgetDuration", Value: Q5_3_B.toString() },
        { Key: "FundingAgency", Value: Q5_3_C.toString() },
        { Key: "PartneringDepartments", Value: Q5_3_D.toString() },
        { Key: "Region", Value: Q5_4.toString() },
        { Key: "Institution", Value: Q5_5 },
        { Key: "Sector", Value: Q5_6.toString() },
        { Key: "DocumentAuthors", Value: metaAuthors.join("||") },
        { Key: "DocumentTitle", Value: metaDocTitle },
        { Key: "DocumentKeywords", Value: metaKeywords.join("||") },
        { Key: "DocumentFormat", Value: metaDocFormat },
        { Key: "DocumentDescription", Value: metaDocDescr },
        { Key: "DocumentAgreement", Value: metaAgreement.toString() }
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

    let {
      editing, goalStatus, goalId, Q5_1, Q5_2, Q5_3_A, Q5_3_B, Q5_3_C, Q5_3_D, Q5_4, Q5_5, Q5_6,
      metaAddAuthorModal, metaAuthors, tmpMetaAuthorName, tmpMetaAuthorEmail, tmpMetaAuthorJobTitle,
      tmpMetaAuthorInstitution, metaDocTitle, metaKeywords, metaDocFormat, metaDocDescr, metaAgreement
    } = this.state

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
                  callback={(fileInfo) => { this.setState({ Q5_2: fileInfo.Link }) }}
                  goalId={goalId}
                />
              </Col>
            </Row>

            <Row style={{ marginLeft: "0px" }}>
              <Col md="12">
                <label style={{ fontWeight: "bold" }}>
                  Who wrote the document?
                </label>
                <br />
                <Button
                  color=""
                  style={{ backgroundColor: DEAGreen, margin: "0px 0px 10px 0px" }}
                  onClick={() => { this.setState({ metaAddAuthorModal: true }) }}
                  size="sm"
                >
                  Add author details
                </Button>

                {/* List authors */}
                {_sf.listAuthors(metaAuthors,
                  updatedAuthors => this.setState({ metaAuthors: updatedAuthors }))}

              </Col>
            </Row>
            <br />

            <Row style={{ marginLeft: "0px" }}>
              <Col md="12">
                <label style={{ fontWeight: "bold" }}>
                  What is the title of the document?
                </label>
                <TextInput
                  width="95%"
                  value={metaDocTitle}
                  callback={(value) => {
                    this.setState({ metaDocTitle: value })
                  }}
                />
              </Col>
            </Row>

            <Row style={{ marginLeft: "0px" }}>
              <Col md="8">
                <label style={{ fontWeight: "bold" }}>
                  Please select which keywords apply to the document:
                </label>
                <TreeSelectInput
                  multiple
                  data={metaKeywordsList}
                  transform={(item) => ({ id: item, text: item })}
                  value={metaKeywords}
                  placeHolder={"Unspecified"}
                  callback={(value) => {
                    this.setState({ metaKeywords: value })
                  }}
                />
              </Col>
            </Row>
            <br />

            <Row style={{ marginLeft: "0px" }}>
              <Col md="6">
                <label style={{ fontWeight: "bold" }}>
                  Please select the type of object you are uploading:
                </label>
                <TreeSelectInput
                  data={metaDocFormatsList}
                  transform={(item) => ({ id: item, text: item })}
                  value={metaDocFormat}
                  placeHolder={"Unspecified"}
                  callback={(value) => { this.setState({ metaDocFormat: value.text }) }}
                />
              </Col>
            </Row>
            <br />

            <Row style={{ marginLeft: "0px" }}>
              <Col md="12">
                <label style={{ fontWeight: "bold" }}>
                  Please include an abstract or description for the document:
                </label>
                <TextAreaInput
                  width="95%"
                  value={metaDocDescr}
                  callback={(value) => {
                    this.setState({ metaDocDescr: value })
                  }}
                  readOnly={true}
                />
              </Col>
            </Row>
            <br />

            <Row style={{ marginLeft: "0px" }}>
              <Col md="12">
                <label style={{ fontWeight: "bold" }}>
                  The document you are uploading will be shared under a
                  &nbsp;
                  <a href="https://creativecommons.org/licenses/by/4.0/" target="blank"><u>Creative Commons CC-BY license</u></a>.
                  <br />
                  This allows the work to be shared in the public domain with no restrictions on its use.
                </label>
                <div style={{
                  // marginLeft: "-15px",
                  // marginTop: "-15px",
                  border: "1px solid silver",
                  width: "270px",
                  backgroundColor: "#F0F0F0"
                }}
                >
                  <Input
                    id="metaAgreement"
                    label="I accept this agreement"
                    type="checkbox"
                    checked={metaAgreement}
                    onClick={() => { this.setState({ metaAgreement: !metaAgreement }) }}
                  />
                </div>
              </Col>
            </Row>
            <br />

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
                        value={Q5_3_C}
                        callback={(value) => { this.setState({ Q5_3_C: value.id }) }}
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
                        value={Q5_3_D}
                        callback={(value) => { this.setState({ Q5_3_D: value.id }) }}
                        allowClear={true}
                        placeHolder={"Select Departments/Organisations...  (Leave empty for 'None')"}
                      />
                    )
                  }}
                </OData>

              </Col>
            </Row>
            <br />

            <Row>
              <Col md="8">
                <label style={{ fontWeight: "bold" }}>
                  5.4 Select a Region for this plan?
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
                        value={Q5_4}
                        callback={(value) => { this.setState({ Q5_4: value.id }) }}
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
                  5.5 Specify non-government organisation name (if applicable)?
                </label>
                <TextInput
                  width="95%"
                  value={Q5_5}
                  callback={(value) => {
                    value = _gf.fixEmptyValue(value, "")
                    this.setState({ Q5_5: value })
                  }}
                />
              </Col>
            </Row>

            <Row>
              <Col md="8">
                <label style={{ fontWeight: "bold" }}>
                  5.6 Select a sector for this plan?
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
                        value={Q5_6}
                        callback={(value) => { this.setState({ Q5_6: value.id }) }}
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
                  <b>{editing === true ? "Update" : "Add"}</b>
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

        {/* Add author modal */}
        <Modal isOpen={this.state.metaAddAuthorModal} toggle={() => { this.setState({ metaAddAuthorModal: false }) }} centered>
          <ModalHeader toggle={() => { this.setState({ metaAddAuthorModal: false }) }}>
            Add author details:
          </ModalHeader>
          <ModalBody>
            <Row>
              <Col md="12">
                <label style={{ fontWeight: "bold" }}>
                  Name:
                </label>
                <TextInput
                  width="95%"
                  value={tmpMetaAuthorName}
                  callback={(value) => {
                    this.setState({ tmpMetaAuthorName: value })
                  }}
                />
              </Col>
            </Row>
            <Row>
              <Col md="12">
                <label style={{ fontWeight: "bold" }}>
                  Email:
                </label>
                <TextInput
                  width="95%"
                  value={tmpMetaAuthorEmail}
                  callback={(value) => {
                    this.setState({ tmpMetaAuthorEmail: value })
                  }}
                />
              </Col>
            </Row>
            <Row>
              <Col md="12">
                <label style={{ fontWeight: "bold" }}>
                  Job title:
                </label>
                <TextInput
                  width="95%"
                  value={tmpMetaAuthorJobTitle}
                  callback={(value) => {
                    this.setState({ tmpMetaAuthorJobTitle: value })
                  }}
                />
              </Col>
            </Row>
            <Row>
              <Col md="12">
                <label style={{ fontWeight: "bold" }}>
                  Institution:
                </label>
                <TextInput
                  width="95%"
                  value={tmpMetaAuthorInstitution}
                  callback={(value) => {
                    this.setState({ tmpMetaAuthorInstitution: value })
                  }}
                />
              </Col>
            </Row>
          </ModalBody>
          <ModalFooter>
            <Button
              size="sm"
              style={{ width: "100px", backgroundColor: DEAGreen }}
              color="" onClick={() => this.setState({
                metaAddAuthorModal: false,
                metaAuthors: [...metaAuthors, `${tmpMetaAuthorName}, ${tmpMetaAuthorEmail}, ${tmpMetaAuthorJobTitle},  ${tmpMetaAuthorInstitution}`],
                tmpMetaAuthorName: "",
                tmpMetaAuthorEmail: "",
                tmpMetaAuthorJobTitle: "",
                tmpMetaAuthorInstitution: ""
              })}
            >
              Add
            </Button>
            <Button
              size="sm"
              style={{ width: "100px", backgroundColor: DEAGreen }}
              color="" onClick={() => this.setState({
                metaAddAuthorModal: false,
                tmpMetaAuthorName: "",
                tmpMetaAuthorEmail: "",
                tmpMetaAuthorJobTitle: "",
                tmpMetaAuthorInstitution: ""
              })} >
              Cancel
            </Button>
          </ModalFooter>
        </Modal>

      </>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Goal5Contrib)