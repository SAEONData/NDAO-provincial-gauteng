'use strict'

import React from 'react'
import { connect } from 'react-redux'
import { Row, Col, Button } from 'mdbreact'
import { DEAGreen, DEAGreenDark } from "../../config/colours.cfg"
import TrafficLightBar from '../visualization/TrafficLightBar.jsx';
import TreeSelectInput from '../input/TreeSelectInput.jsx';
import SelectInput from '../input/SelectInput.jsx';
import MapsCarouselView from '../layout/MapsCarouselView.jsx';

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
  }

  componentDidMount() {
    this.props.updateNav(location.hash)
  }

  render() {

    return (
      <>
        <Row style={{ marginTop: "10px", color: "white", backgroundColor: DEAGreenDark, textAlign: "center", padding: "10px" }}>
          <Col md="12">
            <h1>
              Monitoring and Evaluation of Climate Change Adaptation
            </h1>
            <p>
              The Department of Environmental Affairs NCCAME platform was designed to monitor and
              track South Africa’s progress on climate change, to that end, nine Desired Adaptation
              Outcomes goals (DAOs) were developed to establish progress across the county.
              Where do you stand?
            </p>
            <a href="#">
              <b><u>Submit a DAO Assessment</u></b>
            </a>
          </Col>
        </Row>
        <br />
        <br />
        <Row>
          <Col md="12">
            <h3>
              <b>
                National Government DAOs
              </b>
            </h3>
            <p>
              The development of Desired Adaptation Outcomes (DAOs) for monitoring and evaluating
              climate resilience was discussed in the first and second annual climate change
              reports (DEA, 2016 &amp; 2017). The set of generic DAOs has been updated and now
              comprises nine DAOs with cross-cutting, cross-sectoral relevance (Table 1.1: G1-G9).
              These DAOs describe, in a general sense, a desired state that will enhance South Africa’s
              transition towards climate resilience and fall into two distinct groups. Six of the nine
              DAOs (G1-G6) describe the ‘inputs’ (e.g. processes, resources and capacities) that need
              to be in-place to enable effective climate change adaptation; and three DAOs (G7-G9)
              describe the key ‘impacts’ of adaptation interventions and associated measures (e.g.
              reductions in vulnerability of human and natural systems).
            </p>
            <p>
              A simple pragmatic approach has been developed to monitor and evaluate the progress
              being made in achieving individual DAOs using traffic light colours as a scoring system
              to summarise progress.
            </p>
          </Col>
        </Row>
        <br />
        <br />
        {/* <hr style={{ marginBottom: "30px" }} /> */}
        <Row>
          <Col md="12">
            <h3><b>Climate Change Adaptation Status Across South Africa</b></h3>
          </Col>
        </Row>
        {/* <br /> */}
        <hr />
        <Row >
          <Col md="3" style={{ marginBottom: "3px"}}>
            <TreeSelectInput
              placeHolder="Select Region to filter..."
              data={[{ id: 1, text: "Gauteng" }, { id: 2, text: "Western Cape" }, { id: 3, text: "..." }]} //mock data
              allowEdit={true}
            />
          </Col>
          <Col md="3" style={{ marginBottom: "3px"}}>
            <TreeSelectInput
              placeHolder="Select Sector to filter..."
              data={[{ id: 1, text: "Agriculture" }, { id: 2, text: "Mining" }, { id: 3, text: "..." }]} //mock data
              allowEdit={true}
            />
          </Col>
          <Col md="3" style={{ marginBottom: "3px"}}>
            <SelectInput
              placeHolder="Select Goal to filter..."
              data={[
                { id: 1, text: "Goal 1" },
                { id: 2, text: "Goal 2" },
                { id: 3, text: "Goal 3" },
                { id: 4, text: "Goal 4" },
                { id: 5, text: "Goal 5" },
                { id: 6, text: "Goal 6" },
                { id: 7, text: "Goal 7" },
                { id: 8, text: "Goal 8" },
                { id: 9, text: "Goal 9" }
              ]}
              allowEdit={true}
            />
          </Col>
          <Col md="3">
            <Button size="sm" style={{ height: "35px", marginTop: "0px", width: "100%", fontSize: "13px", marginLeft: "0px", backgroundColor: DEAGreen }} color="" >Clear Filters</Button>
          </Col>
        </Row>
        <hr />
        <br />
        <Row>
          <Col md="1"></Col>
          <Col md="10" style={{ border: "1px solid gainsboro", padding: "10px" }}>
            <TrafficLightBar
              showTitle={true}
              goal="1"
              description="Goal 1. Robust/integrated plans, policies and actionsfor effective delivery of climate change adaptation, together with monitoring, evaluation and review over the short, medium and longer-term. "
              explanation="No capacity building programmes (including research), collaboration and partnerships to address climate change adaptation and no incorporation into school curriculum (red). Attendance of capacity building programmes but no utilisation, collaboration and partnerships to address climate change adaptation and no incorporation into school curriculum (amber). Capacity building programmes (including research and utilisation), collaboration and partnerships to address climate change adaptation, incorporation into school curriculum, and utilisation to inform policy and decision-making (green)."
              attachment="https://en.wikipedia.org/wiki/Example"
              data={[
                { key: "2012", value: "R" },
                { key: "2013", value: "R" },
                { key: "2014", value: "R" },
                { key: "2015", value: "A" },
                { key: "2016", value: "A" },
                { key: "2017", value: "G" },
                { key: "2018", value: "G" },
                { key: "2019", value: "" }
              ]}
            />
            <TrafficLightBar
              showTitle={false}
              goal="2"
              data={[
                { key: "2012", value: "R" },
                { key: "2013", value: "R" },
                { key: "2014", value: "A" },
                { key: "2015", value: "A" },
                { key: "2016", value: "A" },
                { key: "2017", value: "A" },
                { key: "2018", value: "G" },
                { key: "2019", value: "" }
              ]}
            />
            <TrafficLightBar
              showTitle={false}
              goal="3"
              data={[
                { key: "2012", value: "R" },
                { key: "2013", value: "A" },
                { key: "2014", value: "A" },
                { key: "2015", value: "A" },
                { key: "2016", value: "G" },
                { key: "2017", value: "G" },
                { key: "2018", value: "G" },
                { key: "2019", value: "" }
              ]}
            />
            <TrafficLightBar
              showTitle={false}
              goal="4"
              data={[
                { key: "2012", value: "R" },
                { key: "2013", value: "R" },
                { key: "2014", value: "R" },
                { key: "2015", value: "R" },
                { key: "2016", value: "R" },
                { key: "2017", value: "A" },
                { key: "2018", value: "G" },
                { key: "2019", value: "" }
              ]}
            />
            <TrafficLightBar
              showTitle={false}
              goal="5"
              data={[
                { key: "2012", value: "R" },
                { key: "2013", value: "R" },
                { key: "2014", value: "R" },
                { key: "2015", value: "A" },
                { key: "2016", value: "A" },
                { key: "2017", value: "A" },
                { key: "2018", value: "A" },
                { key: "2019", value: "" }
              ]}
            />
            <TrafficLightBar
              showTitle={false}
              goal="6"
              data={[
                { key: "2012", value: "R" },
                { key: "2013", value: "R" },
                { key: "2014", value: "R" },
                { key: "2015", value: "A" },
                { key: "2016", value: "G" },
                { key: "2017", value: "G" },
                { key: "2018", value: "G" },
                { key: "2019", value: "" }
              ]}
            />
            <TrafficLightBar
              showTitle={false}
              goal="7"
              data={[
                { key: "2012", value: "R" },
                { key: "2013", value: "R" },
                { key: "2014", value: "A" },
                { key: "2015", value: "A" },
                { key: "2016", value: "A" },
                { key: "2017", value: "A" },
                { key: "2018", value: "G" },
                { key: "2019", value: "" }
              ]}
            />
            <TrafficLightBar
              showTitle={false}
              goal="8"
              data={[
                { key: "2012", value: "R" },
                { key: "2013", value: "R" },
                { key: "2014", value: "R" },
                { key: "2015", value: "R" },
                { key: "2016", value: "R" },
                { key: "2017", value: "R" },
                { key: "2018", value: "A" },
                { key: "2019", value: "" }
              ]}
            />
            <TrafficLightBar
              showTitle={false}
              goal="9"
              data={[
                { key: "2012", value: "R" },
                { key: "2013", value: "R" },
                { key: "2014", value: "R" },
                { key: "2015", value: "R" },
                { key: "2016", value: "R" },
                { key: "2017", value: "R" },
                { key: "2018", value: "R" },
                { key: "2019", value: "" }
              ]}
            />
          </Col>
          <Col md="1"></Col>
        </Row>
        <br />
        <br />
        <Row>
          <Col md="12">
            {/* <p>
              <span style={{ display: "inline-block", width: "70px" }}></span>...map goes here...
            </p> */}
            <MapsCarouselView />
          </Col>
        </Row>
      </>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)