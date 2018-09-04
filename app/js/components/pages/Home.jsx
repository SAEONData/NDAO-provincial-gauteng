'use strict'

import React from 'react'
import { connect } from 'react-redux'
import { Row, Col } from 'mdbreact'
import { DEAGreen, DEAGreenDark } from "../../config/colours.js"
import TrafficLightBar from '../visualization/TrafficLightBar.jsx';

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
        <Row style={{ color: "white", backgroundColor: DEAGreenDark, textAlign: "center", padding: "10px" }}>
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
        <hr style={{ marginBottom: "30px" }} />
        <Row>
          <Col md="12">
            <h3><b>DAO Status Across South Africa</b></h3>
            <p>
              ...map goes here...
            </p>
          </Col>
        </Row>
      </>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)