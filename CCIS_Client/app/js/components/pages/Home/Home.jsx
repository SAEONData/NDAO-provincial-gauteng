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
import InstitutionFilter from './Filters/InstitutionFilter.jsx';

const mapStateToProps = (state, props) => {
  return {}
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

class Home extends React.Component {

  constructor(props) {
    super(props);

    let filterRegion = 0
    let filterSector = 0
    let filterGoal = 0
    let filterYear = (new Date()).getFullYear()
    let filterInstitution = ""

    this.state = {
      infoSection: false,
      filterRegion,
      filterSector,
      filterGoal,
      filterYear,
      filterInstitution,
      filterInstitutionOptions: [],
      trafficLightGoalData: [],
      prevFilters: { filterRegion, filterSector, filterGoal, filterYear, filterInstitution }
    }

    this.handleFilterChange = this.handleFilterChange.bind(this)
  }

  componentDidMount() {
    this.props.updateNav(location.hash)

    //Apply default filtering
    this.handleFilterChange(true)
  }

  componentDidUpdate() {
    //Apply filtering
    this.handleFilterChange(false)
  }

  handleFilterChange(autoSelect = false) {

    let { filterRegion, filterSector, filterGoal, filterYear, filterInstitution, prevFilters } = this.state
    let getInstitutions = false
    let getTrafficLightData = false

    if (prevFilters.filterRegion !== filterRegion) {
      getInstitutions = true
      getTrafficLightData = true
    }
    if (prevFilters.filterSector !== filterSector) {
      getInstitutions = true
      getTrafficLightData = true
    }
    if (prevFilters.filterGoal !== filterGoal) {
      //will be used for map
    }
    if (prevFilters.filterYear !== filterYear) {
      getTrafficLightData = true
    }
    if (prevFilters.filterInstitution !== filterInstitution) {
      getTrafficLightData = true
    }

    if (getInstitutions === true || getTrafficLightData === true || autoSelect === true) {

      //update state
      this.setState({ prevFilters: { filterRegion, filterSector, filterGoal, filterYear, filterInstitution } },

        () => {
          let { filterRegion, filterSector, filterInstitution } = this.state

          //Fetch Institutions
          if (getInstitutions === true || autoSelect === true) {
            this.getInstitutions(filterRegion, filterSector, filterInstitution)
          }

          //Fetch TrafficLight data
          if (getTrafficLightData === true || autoSelect === true) {
            this.getTrafficLightData(filterRegion, filterSector, filterGoal, filterYear, filterInstitution)
          }
        })
    }
  }

  async getInstitutions(filterRegion, filterSector, filterInstitution) {

    let { setLoading } = this.props
    setLoading(true)

    try {
      let res = await fetch(apiBaseURL +
        `GetFilteredInstitutions(region=${filterRegion},sector=${filterSector})`)

      if (res.ok) {
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
    finally{
      setLoading(false)
    }
  }

  async getTrafficLightData(filterRegion, filterSector, filterGoal, filterYear, filterInstitution) {

    let { setLoading } = this.props
    setLoading(true)

    try {
      let res = await fetch(apiBaseURL +
        `GetTrafficLightData(region=${filterRegion},sector=${filterSector},goal=${filterGoal},year=${filterYear},institution='${filterInstitution}')`)

      if (res.ok) {
        res = await res.json() //parse response

        if (res) {
          this.setState({ trafficLightGoalData: res })
        }
      }
    }
    catch (ex) {
      console.error(ex)
    }
    finally{
      setLoading(false)
    }
  }

  render() {

    let { infoSection, filterYear, filterRegion, filterSector, filterGoal, trafficLightGoalData } = this.state

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
              callback={(value) => { this.setState({ filterRegion: value }) }}
            />
          </Col>
          <Col md="3" style={{ marginBottom: "3px" }}>
            <SectorFilter
              value={filterSector}
              callback={(value) => { this.setState({ filterSector: value }) }}
            />
          </Col>
          <Col md="6">
            <InstitutionFilter
              data={this.state.filterInstitutionOptions}
              value={this.state.filterInstitution}
              callback={(value) => { 
                this.setState({ filterInstitution: value.text }) 
              }}
            />
          </Col>
        </Row>

        <Row style={{ marginTop: "7px" }}>
          <Col md="3" style={{ marginBottom: "3px" }}>
            <GoalFilter
              value={filterGoal}
              callback={(value) => { this.setState({ filterGoal: value }) }}
            />
          </Col>
          <Col md="6">
            <YearFilter
              value={filterYear}
              callback={(value) => { this.setState({ filterYear: value }) }}
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
                this.setState({
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

        <hr style={{ marginTop: "13px" }} />

        <br />
        <TrafficLights goalData={trafficLightGoalData} />
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