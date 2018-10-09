'use strict'

import React from 'react'
import { connect } from 'react-redux'
import { Row, Col, Button, Collapse } from 'mdbreact'
import { DEAGreen, DEAGreenDark, Red, Amber, Green } from "../../../config/colours.cfg"
import TreeSelectInput from '../../input/TreeSelectInput.jsx';
import SelectInput from '../../input/SelectInput.jsx';
import MapsCarouselView from '../../layout/MapsCarouselView.jsx';
import AME_Banner from './AME_Banner.jsx'
import AME_Info from './AME_Info.jsx'
import DAO_Info from './DAO_Info.jsx'
import LessInfoBtn from './LessInfoBtn.jsx'
import YearSlider from './Filters/YearSlider.jsx'
import TrafficLights from './TrafficLights.jsx'

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
      infoSection: true,
      filterYear: (new Date()).getFullYear()
    }
  }

  componentDidMount() {
    this.props.updateNav(location.hash)
  }

  render() {

    let { infoSection, filterYear } = this.state

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
              <Button style={{ marginTop: "0px", marginLeft: "0px", height: "40px", fontSize: "16px" }} size="sm" color="grey">View Gauteng</Button>
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
            <TreeSelectInput
              placeHolder="Select Region to filter..."
              data={[
                {
                  id: 1, text: "Gauteng", children: [
                    { id: 11, text: "Johannesburg Metropolitan Municipality (JHB)" },
                    {
                      id: 12, text: "Metsweding District Municipality (DC46)", children: [
                        { id: 121, text: "Kungwini Local Municipality (GT02b2)" },
                        { id: 122, text: "Nokeng tsa Taemane Local Municipality (GT02b1)" },
                        { id: 123, text: "..." }
                      ]
                    },
                    { id: 11, text: "..." },
                  ]
                },
                {
                  id: 2, text: "Western Cape", children: [
                    { id: 21, text: "Cape Town Metropolitan Municipality (CPT)" },
                    {
                      id: 22, text: "Cape Winelands District Municipality (DC2)", children: [
                        { id: 221, text: "Breede River/Winelands Local Municipality (WC026)" },
                        { id: 222, text: "Breede Valley Local Municipality (WC025)" },
                        { id: 223, text: "..." }
                      ]
                    },
                    { id: 21, text: "..." }
                  ]
                },
                { id: 3, text: "..." }
              ]} //mock data
              allowEdit={true}
            />
          </Col>
          <Col md="3" style={{ marginBottom: "3px" }}>
            <TreeSelectInput
              placeHolder="Select Sector to filter..."
              data={[{ id: 1, text: "Agriculture" }, { id: 2, text: "Mining" }, { id: 3, text: "..." }]} //mock data
              allowEdit={true}
            />
          </Col>
          <Col md="3" style={{ marginBottom: "3px" }}>
            <SelectInput
              placeHolder="Select Goal to filter..."
              data={[
                { id: 1, text: "Goal 1" },
                { id: 2, text: "Goal 2" },
                { id: 3, text: "..." }
              ]}
              allowEdit={true}
            />
          </Col>
          <Col md="3">
            <Button size="sm" style={{ height: "35px", marginTop: "0px", width: "100%", fontSize: "13px", marginLeft: "0px", backgroundColor: DEAGreen }} color="" >Clear Filters</Button>
          </Col>
        </Row>

        <YearSlider
          value={filterYear}
          callback={(value) => { this.setState({ filterYear: value }) }}
        />

        <hr style={{ marginTop: "15px" }} />
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