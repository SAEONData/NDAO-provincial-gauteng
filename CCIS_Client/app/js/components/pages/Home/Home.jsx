'use strict'

import React from 'react'
import { connect } from 'react-redux'
import { Row, Col, Button, Collapse } from 'mdbreact'
import { DEAGreen, Red, Amber, Green } from "../../../config/colours.cfg"
import MapsCarouselView from '../../layout/MapsCarouselView.jsx';
import AME_Banner from './AME_Banner.jsx'
import AME_Info from './AME_Info.jsx'
import DAO_Info from './DAO_Info.jsx'
import LessInfoBtn from './LessInfoBtn.jsx'
import TrafficLights from './TrafficLights.jsx'
import YearFilter from './Filters/YearFilter.jsx'
import RegionFilter from './Filters/RegionFilter.jsx'
import SectorFilter from './Filters/SectorFilter.jsx'
import GoalFilter from './Filters/GoalFilter.jsx'
import { apiBaseURL } from '../../../config/serviceURLs.cfg'
import TreeSelectInput from '../../input/TreeSelectInput.jsx';

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

class Home extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      infoSection: false,
      filterRegion: 0,
      filterSector: 0,
      filterGoal: 0,
      filterYear: (new Date()).getFullYear(),
      filterInstitution: "",
      filterInstitutionOptions: []
    }

    this.handleFilterChange = this.handleFilterChange.bind(this)
    this.handleInstitutionChange = this.handleInstitutionChange.bind(this)
  }

  componentDidMount() {
    this.props.updateNav(location.hash)

    //Apply default filtering
    let { filterRegion, filterSector, filterGoal, filterYear } = this.state
    this.handleFilterChange({
      filterRegion, filterSector, filterGoal, filterYear
    }, true)
  }

  async handleFilterChange(filters, autoSelect) {

    let { filterRegion, filterSector, filterGoal, filterYear } = this.state
    let updateNeeded = false

    if (filters.filterRegion !== filterRegion) {
      updateNeeded = true
    }
    if (filters.filterSector !== filterSector) {
      updateNeeded = true
    }
    if (filters.filterGoal !== filterGoal) {
      updateNeeded = true
    }
    if (filters.filterYear !== filterYear) {
      updateNeeded = true
    }

    if (updateNeeded === true || autoSelect === true) {

      //update state
      this.setState({ ...filters }, async () => {

        let { filterRegion, filterSector, filterGoal, filterYear, filterInstitution } = this.state

        //fetch goals
        try {
          let res = await fetch(apiBaseURL + "GetFilterInstitutions", {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
              Region: filterRegion, 
              Sector: filterSector, 
              Goal: filterGoal, 
              Year: filterYear
            })
          })

          if(res.ok){
            res = await res.json() //parse response

            if (res.value) {
              this.setState({ 
                filterInstitutionOptions: res.value,
                filterInstitution: res.value.filter(x => x === filterInstitution).length > 0 ? filterInstitution : ""
              })
            }
          }
        }
        catch (ex) {
          console.error(ex)
        }
      })
    }
  }

  handleInstitutionChange(value){

    // Fetch goals data


    this.setState({ filterInstitution: value.text })
  }

  render() {

    let { infoSection, filterYear, filterRegion, filterSector, filterGoal } = this.state

    return (
      <>
        <AME_Banner />
        <br />
        <br />

        <LessInfoBtn
          infoSection={infoSection}
          callback={(ifoSec) => { this.setState({ infoSection: !ifoSec }) }}
        />
        <Collapse isOpen={infoSection}>
          <br />
          <AME_Info />
          <br />
          <DAO_Info />
          <br />
          <LessInfoBtn
            infoSection={infoSection}
            callback={(ifoSec) => { this.setState({ infoSection: !ifoSec }) }}
            scrollUp
          />
        </Collapse>
        <br />

        <Row>
          <Col md="12">
            <h3>
              <b style={{ marginRight: "15px" }}>Climate Change Adaptation Status Across South Africa</b>
              {/* <Button 
                style={{ 
                  marginTop: "0px", 
                  marginLeft: "0px", 
                  height: "40px", 
                  fontSize: "16px" 
                }} 
                size="sm" 
                color="grey"
              >
                View Gauteng
              </Button> */}
            </h3>
            <p style={{ marginBottom: "0px" }}>
              A simple pragmatic approach has been developed to monitor and evaluate the progress being made
              in achieving individual desired adaptation outcomes using traffic light colours as a scoring
              system to summarise progress.
            </p>
            <br />
            <p>
              <b style={{ color: Red }}>RED</b> indicates that no or only preliminary work has begun towards a goal,
              <br />
              <b style={{ color: Amber }}>AMBER</b> indicates that significant progress is being made towards a goal, and
              <br />
              <b style={{ color: Green }}>GREEN</b> indicates that work on a goal is in an ideal state.
            </p>
          </Col>
        </Row>
        <hr />
        <Row >
          <Col md="3" style={{ marginBottom: "3px" }}>
            <RegionFilter
              value={filterRegion}
              callback={(value) => { this.handleFilterChange({ filterRegion: value }) }}
            />
          </Col>
          <Col md="3" style={{ marginBottom: "3px" }}>
            <SectorFilter
              value={filterSector}
              callback={(value) => { this.handleFilterChange({ filterSector: value }) }}
            />
          </Col>
          <Col md="3" style={{ marginBottom: "3px" }}>
            <GoalFilter
              value={filterGoal}
              callback={(value) => { this.handleFilterChange({ filterGoal: value }) }}
            />
          </Col>
          <Col md="3">
            <Button
              size="sm"
              style={{
                height: "35px",
                marginTop: "0px",
                width: "100%",
                fontSize: "13px",
                marginLeft: "0px",
                backgroundColor: DEAGreen
              }}
              color=""
              onClick={() => {
                this.handleFilterChange({
                  filterYear: (new Date()).getFullYear(),
                  filterRegion: 0,
                  filterSector: 0,
                  filterGoal: 0
                })
              }}
            >
              Clear Filters
            </Button>
          </Col>
        </Row>

        <YearFilter
          value={filterYear}
          callback={(value) => { this.handleFilterChange({ filterYear: value }) }}
        />

        <hr style={{ marginTop: "15px" }} />

        <Row style={{ textAlign: "center" }}>
          <Col md="3" />
          <Col md="6">
            
            <TreeSelectInput
                data={this.state.filterInstitutionOptions}
                transform={(item) => { return { id: item, text: item } }}
                value={this.state.filterInstitution}
                allowClear={true}
                callback={(value) => {
                  this.handleInstitutionChange(value)
                }}
                placeHolder={"Organisation/Institution  (Government)"}
              />

          </Col>          
        </Row>

        <br />
        <TrafficLights />
        <br />

        <Row>
          <Col md="1"></Col>
          <Col md="10">
            <MapsCarouselView />
          </Col>
        </Row>
        <br />

        <Row style={{ textAlign: "right" }}>
          <Col md="12">
            <Button
              onClick={() => { location.hash = "#/ame/contribute" }}
              style={{ marginLeft: "0px" }}
              color="grey">Submit your contribution
            </Button>
          </Col>
        </Row>
      </>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)