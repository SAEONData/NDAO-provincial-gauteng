'use strict'

import React from 'react'
import { connect } from 'react-redux'
import { Row, Col, Button, Collapse } from 'mdbreact'
import { DEAGreen, Red, Amber, Green } from "../../../Config/colours.cfg"
import AME_Banner from './AME_Banner.jsx'
import AME_Info from './AME_Info.jsx'
import DAO_Info from './DAO_Info.jsx'
import LessInfoBtn from './LessInfoBtn.jsx'
import TrafficLights from './TrafficLights.jsx'
import YearFilter from './Filters/YearFilter.jsx'
import RegionFilter from './Filters/RegionFilter.jsx'
import SectorFilter from './Filters/SectorFilter.jsx'
import GoalFilter from './Filters/GoalFilter.jsx'
import { apiBaseURL, vmsBaseURL } from '../../../../JS/Config/serviceURLs.cfg'
import InstitutionFilter from './Filters/InstitutionFilter.jsx'
import MapViewCore from '../../visualization/Map/MapViewCore.jsx'
import NCCRD_Preview from './NCCRD_Preview/NCCRD_Preview.jsx'
import NDMC_Preview from './NDMC_Preview/NDMC_Preview.jsx'
import SARVA_Preview from './SARVA_Preview/SARVA_Preview.jsx'
import FundingIGFX from './InfoGraphics/FundingIGFX.jsx'
import PlansIGFX from './InfoGraphics/PlansIGFX.jsx'
import GovernmentsIGFX from './InfoGraphics/GovernmentsIGFX.jsx'
import GHGReductionIGFX from './InfoGraphics/GHGReductionIGFX.jsx'
import SectorsIGFX from './InfoGraphics/SectorsIGFX.jsx'
import GoalDetails from './GoalDetails.jsx'

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
    let filterRegionParent = 0
    let filterSector = 0
    let filterGoal = 1
    let filterYear = (new Date()).getFullYear()
    let filterInstitution = ""

    this.state = {
      infoSection: false,
      filterRegion,
      filterRegionParent,
      filterSector,
      filterGoal,
      filterYear,
      filterInstitution,
      filterInstitutionOptions: [],
      goalData: [],
      prevFilters: { filterRegion, filterSector, filterGoal, filterYear, filterInstitution },
      trafficLightFull: false,
      mapFullView: false
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

          //Fetch Goal data
          if (getTrafficLightData === true || autoSelect === true) {
            this.getGoalData(filterRegion, filterSector, filterGoal, filterYear, filterInstitution)
          }

          //Fetch Regions data
          this.getRegions(filterRegion)
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
    finally {
      setLoading(false)
    }
  }

  async getGoalData(filterRegion, filterSector, filterGoal, filterYear, filterInstitution) {

    let { setLoading } = this.props
    setLoading(true)

    try {
      let res = await fetch(apiBaseURL + "Goals/Extensions." +
        `GetGoalData(region=${filterRegion},sector=${filterSector},goal=${filterGoal},year=${filterYear},institution='${filterInstitution}')` +
        "?$expand=Questions")

      if (res.ok) {
        res = await res.json() //parse response
        // console.log("RES", res)
        if (res) {
          this.setState({ goalData: res.value })
        }
      }
    }
    catch (ex) {
      console.error(ex)
    }
    finally {
      setLoading(false)
    }
  }

  async getRegions(filterRegion) {

    let { setLoading } = this.props
    setLoading(true)

    try {
      let res = await fetch(vmsBaseURL + 'Regions/Flat')

      if (res.ok) {
        res = await res.json() //parse response

        if (res.items) {

          let searchRegions = res.items.filter(r => r.id == filterRegion)
          if (searchRegions.length > 0) {

            let searchPK = searchRegions[0].additionalData.filter(a => a.key === "ParentId")
            if (searchPK.length > 0 && !isNaN(searchPK[0].value)) {

              this.setState({
                filterRegionParent: parseInt(searchPK[0].value)
              })
            }
          }
        }
      }
    }
    catch (ex) {
      console.error(ex)
    }
    finally {
      setLoading(false)
    }
  }

  render() {

    let {
      infoSection, filterYear, filterRegion, filterRegionParent, filterSector, filterGoal, filterInstitution, 
      goalData, trafficLightFull, mapFullView
    } = this.state

    return (
      <div style={{ padding: "15px", borderRadius: "10px" }}>

        <AME_Banner />

        <br />
        <br />

        <div style={{ marginBottom: "15px" }}>
          <LessInfoBtn
            infoSection={infoSection}
            callback={(ifoSec) => { this.setState({ infoSection: !ifoSec }) }}
          />
          <Collapse isOpen={infoSection}>
            <br />
            <AME_Info />
            {/* <br />
            <DAO_Info /> */}
            {/* <br /> */}
            {/* <LessInfoBtn
              infoSection={infoSection}
              callback={(ifoSec) => { this.setState({ infoSection: !ifoSec }) }}
              scrollUp
            /> */}
          </Collapse>
        </div>

        <br />

        <div>
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
                  color="gainsboro"
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
              <p style={{ marginBottom: "0px" }}>
                <b style={{ color: Red }}>RED</b> indicates that no or only preliminary work has begun towards a goal,
                <br />
                <b style={{ color: Amber }}>AMBER</b> indicates that significant progress is being made towards a goal, and
                <br />
                <b style={{ color: Green }}>GREEN</b> indicates that work on a goal is in an ideal state.
              </p>
            </Col>
          </Row>
        </div>

        <br />

        <div style={{ borderTop: "1px solid gainsboro", borderBottom: "1px solid gainsboro", paddingTop: "15px", paddingBottom: "10px" }}>
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
        </div>

        <br />

        {
          (trafficLightFull === true) &&
          <Row>
            <Col md="12">
              <TrafficLights
                goalData={goalData}
                filterYear={filterYear}
                height={350}
                popCallback={() => { this.setState({ trafficLightFull: false }) }}
                fullView
              />
            </Col>
          </Row>
        }

        {
          (mapFullView === true) &&
          <Row>
            <Col md="12">
              <MapViewCore
                height={550}
                popCallback={() => { this.setState({ mapFullView: false }) }}
                fullView
                filters={{
                  region: filterRegion,
                  parentRegion: filterRegionParent,
                  sector: filterSector,
                  institution: filterInstitution,
                  goal: filterGoal,
                  year: filterYear
                }}
              // data={{
              //   regions: regions
              // }}
              />
            </Col>
          </Row>
        }

        {
          (trafficLightFull === false && mapFullView === false) &&
          <Row>
            <Col md="6">

              <Row>
                <Col md="12">
                  {/* selected goal details ??? */}
                  <GoalDetails goal={filterGoal} />
                </Col>
              </Row>

              <br />

              <Row>
                <Col md="12">
                  {/* traffic lights */}
                  <TrafficLights
                    goalData={goalData}
                    filterYear={filterYear}
                    height={200}
                    popCallback={() => { this.setState({ trafficLightFull: true }) }}
                  />
                </Col>
              </Row>

            </Col>

            <Col md="6">

              <Row>
                <Col md="12">
                  <MapViewCore
                    height={400}
                    popCallback={() => { this.setState({ mapFullView: true }) }}
                    filters={{
                      region: filterRegion,
                      parentRegion: filterRegionParent,
                      sector: filterSector,
                      institution: filterInstitution,
                      goal: filterGoal,
                      year: filterYear
                    }}
                  // data={{
                  //   regions: regions
                  // }}
                  />
                </Col>
              </Row>

              <Row style={{ textAlign: "right" }}>
                <Col md="12">
                  <Button
                    onClick={() => { location.hash = "#/ame/contribute" }}
                    style={{ margin: "35px 5px 0px 0px" }}
                    color="warning">Submit your contribution
              </Button>
                </Col>
              </Row>

            </Col>

          </Row>
        }

        <div style={{
          marginTop: "25px",
          marginBottom: "25px",
          paddingTop: "15px",
          paddingBottom: "15px",
          borderTop: "1px solid gainsboro",
          borderBottom: "1px solid gainsboro"
        }}>
          <Row>

            <Col>
              <FundingIGFX data={goalData} year={filterYear} goal={filterGoal} />
            </Col>
            <Col>
              <PlansIGFX data={goalData} year={filterYear} goal={filterGoal} />
            </Col>
            <Col>
              <GovernmentsIGFX data={goalData} year={filterYear} goal={filterGoal} />
            </Col>
            <Col>
              <GHGReductionIGFX data={goalData} year={filterYear} goal={filterGoal} />
            </Col>
            <Col>
              <SectorsIGFX data={goalData} year={filterYear} goal={filterGoal} />
            </Col>
          </Row>
        </div>

        <Row>

          <Col md="4">
            <SARVA_Preview />
          </Col>

          <Col md="5">
            <NCCRD_Preview />
          </Col>

          <Col md="3">
            <NDMC_Preview />
          </Col>

        </Row>


      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)