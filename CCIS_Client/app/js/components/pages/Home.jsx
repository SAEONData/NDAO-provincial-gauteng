'use strict'

import React from 'react'
import { connect } from 'react-redux'
import { Row, Col, Button, InputRange } from 'mdbreact'
import { DEAGreen, DEAGreenDark, DEAOrange, DEAOrangeDark } from "../../config/colours.cfg"
import TrafficLightBar from '../visualization/TrafficLightBar.jsx';
import TreeSelectInput from '../input/TreeSelectInput.jsx';
import SelectInput from '../input/SelectInput.jsx';
import MapsCarouselView from '../layout/MapsCarouselView.jsx';

//Data
const goalData = require('../../../data/goalData')

//Images
import AME1 from '../../../images/AME1.png'
import DEAGreenLightDark from '../../../images/DEAGreenLightDark.png'
import DEAOrangeLightDark from '../../../images/DEAOrangeLightDark.png'

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

    const container = { position: "relative", textAlign: "center", color: "white", top: "0px", bottom: "0px" }
    const topRight = { position: "absolute", top: "9px", right: "9px" }
    const bg_green = { backgroundImage: `url(${DEAGreenLightDark})`, backgroundSize: "contain", backgroundRepeat: "no-repeat", width: "71px", paddingTop: "100%" }
    const bg_orange = { backgroundImage: `url(${DEAOrangeLightDark})`, backgroundSize: "contain", backgroundRepeat: "no-repeat", width: "70px", paddingTop: "100%" }

    return (
      <>
        <Row style={{ marginTop: "10px", color: "white", backgroundColor: DEAGreenDark, textAlign: "center", padding: "10px" }}>
          <Col md="12">
            <h1>
              Monitoring and Evaluation of Climate Change Adaptation
            </h1>
            <p>
              The Department of Environmental Affairs Climate Change Information System (CCIS) was designed to monitor
              and track South Africa’s progress on climate change, to that end, nine desired adaptation outcome
              goals were developed to establish progress across the country.
              <br />
              Where do you stand?
            </p>
            <a href="#/ame/contribute">
              <b><u>Submit your Contribution</u></b>
            </a>
          </Col>
        </Row>
        <br />
        <br />
        <Row>
          <Col md="12">
            <h3>
              <b>
                Climate Change Adaptation Monitoring and Evaluation
              </b>
            </h3>
            <p>
              The monitoring and evaluation (M&amp;E) of adaptation responses is composed of building blocks and key
              elements of monitoring and evaluating climate resilience. The key elements have been unpacked further
              into desired adaptation outcomes for monitoring and climate resilience to complement the building
              blocks and key elements for monitoring and evaluating climate resilience.
            </p>
          </Col>
        </Row>
        <br />
        <Row>
          <Col md="12" style={{ textAlign: "center" }}>
            <img src={AME1} style={{ width: "70%" }} />
          </Col>
        </Row>
        <br />
        <Row>
          <Col md="12">
            <p>
              The desired adaptation outcomes describe, in a general sense, a desired state that will enhance
              South Africa’s transition towards climate resilience and fall into two distinct groups. Six of
              the nine desired adaptation outcomes (G1-G6) describe the ‘inputs’ (e.g. processes, resources
              and capacities) that need to be in place to enable effective climate change adaptation; and three
              desired adaptation outcomes (G7-G9) describe the key ‘impacts’ of adaptation interventions and
              associated measures (e.g. reductions in vulnerability of human- and natural-systems).
            </p>
          </Col>
        </Row>
        <br />
        <Row>
          <Col md="12">
            <h3>
              <b>
                Desired Adaptation Outcomes
              </b>
            </h3>
          </Col>
        </Row>
        <br />
        <Row>
          <Col md="1"></Col>
          <Col md="10">
            <table style={{ width: "100%", backgroundColor: DEAGreenDark }}>
              <tbody>
                <tr style={{ border: "1px solid gainsboro" }}>
                  <td valign="middle" height="70px" style={{ padding: "10px" }}>
                    <p style={{ color: "white", marginBottom: "0px" }}>
                      <b>
                        ‘Inputs’ to enable effective adaptation
                       </b>
                    </p>
                  </td>
                </tr>
              </tbody>
            </table>
            <table style={{ width: "100%", backgroundColor: DEAGreenDark }}>
              <tbody>
                <tr style={{ border: "1px solid gainsboro" }}>
                  <td align="right" valign="top" >
                    <div style={{ ...container, ...bg_green }}>
                      <div style={topRight}>
                        <b>
                          G1
                        </b>
                      </div>
                    </div>
                  </td>
                  <td valign="top" width="100%" style={{ padding: "10px" }}>
                    <p style={{ color: "white", marginBottom: "0px" }}>
                      Robust/integrated plans, policies and actions for effective delivery of climate change
                      adaptation, together with monitoring, evaluation and review over the short, medium and
                      longer-term.
                    </p>
                  </td>
                </tr>
                <tr style={{ border: "1px solid gainsboro" }}>
                  <td align="right" valign="top" >
                    <div style={{ ...container, ...bg_green }}>
                      <div style={topRight}>
                        <b>
                          G2
                        </b>
                      </div>
                    </div>
                  </td>
                  <td valign="top" width="100%" style={{ padding: "10px" }}>
                    <p style={{ color: "white", marginBottom: "0px" }}>
                      Appropriate resources (including current and past financial investments), capacity and
                      processes (human, legal and regulatory) and support mechanisms (institutional and governance
                      structures) to facilitate climate change adaptation.
                    </p>
                  </td>
                </tr>
                <tr style={{ border: "1px solid gainsboro" }}>
                  <td align="right" valign="top" >
                    <div style={{ ...container, ...bg_green }}>
                      <div style={topRight}>
                        <b>
                          G3
                        </b>
                      </div>
                    </div>
                  </td>
                  <td valign="top" width="100%" style={{ padding: "10px" }}>
                    <p style={{ color: "white", marginBottom: "0px" }}>
                      Accurate climate information (e.g. historical trend data, seasonal predictions, future
                      projections, and early warning of extreme weather and other climate-related events)
                      provided by existing and new monitoring and forecasting facilities/networks (including
                      their maintenance and enhancement) to inform adaptation planning and disaster risk reduction.
                    </p>
                  </td>
                </tr>
                <tr style={{ border: "1px solid gainsboro" }}>
                  <td align="right" valign="top" >
                    <div style={{ ...container, ...bg_green }}>
                      <div style={topRight}>
                        <b>
                          G4
                        </b>
                      </div>
                    </div>
                  </td>
                  <td valign="top" width="100%" style={{ padding: "10px" }}>
                    <p style={{ color: "white", marginBottom: "0px" }}>
                      Capacity development, education and awareness programmes (formal and informal) for
                      climate change adaptation (e.g. informed by adaptation research and with tools to
                      utilise data/outputs).
                    </p>
                  </td>
                </tr>
                <tr style={{ border: "1px solid gainsboro" }}>
                  <td align="right" valign="top" >
                    <div style={{ ...container, ...bg_green }}>
                      <div style={topRight}>
                        <b>
                          G5
                        </b>
                      </div>
                    </div>
                  </td>
                  <td valign="top" width="100%" style={{ padding: "10px" }}>
                    <p style={{ color: "white", marginBottom: "0px" }}>
                      New and adapted technologies/knowledge and other cost-effective measures
                      (e.g. nature-based solutions) used in climate change adaptation.
                    </p>
                  </td>
                </tr>
                <tr style={{ border: "1px solid gainsboro" }}>
                  <td align="right" valign="top" >
                    <div style={{ ...container, ...bg_green }}>
                      <div style={topRight}>
                        <b>
                          G6
                        </b>
                      </div>
                    </div>
                  </td>
                  <td valign="top" width="100%" style={{ padding: "10px" }}>
                    <p style={{ color: "white", marginBottom: "0px" }}>
                      Climate change risks, impacts and vulnerabilities identified and addressed.
                    </p>
                  </td>
                </tr>
              </tbody>
            </table>

            <br />

            <table style={{ width: "100%", backgroundColor: DEAOrangeDark }}>
              <tbody>
                <tr style={{ border: "1px solid gainsboro" }}>
                  <td valign="middle" height="70px" style={{ padding: "10px" }}>
                    <p style={{ color: "white", marginBottom: "0px" }}>
                      <b>
                        ‘Impacts’ of adaptation interventions and associated measures
                       </b>
                    </p>
                  </td>
                </tr>
              </tbody>
            </table>
            <table style={{ width: "100%", backgroundColor: DEAOrangeDark }}>
              <tbody>
                <tr style={{ border: "1px solid gainsboro" }}>
                  <td align="right" valign="top" >
                    <div style={{ ...container, ...bg_orange }}>
                      <div style={topRight}>
                        <b>
                          G7
                        </b>
                      </div>
                    </div>
                  </td>
                  <td valign="top" width="100%" style={{ padding: "10px" }}>
                    <p style={{ color: "white", marginBottom: "0px" }}>
                      Systems, infrastructure, communities and sectors less vulnerable to climate change
                      impacts (e.g. through effectiveness of adaptation interventions/response measures).
                    </p>
                  </td>
                </tr>
                <tr style={{ border: "1px solid gainsboro" }}>
                  <td align="right" valign="top" >
                    <div style={{ ...container, ...bg_orange }}>
                      <div style={topRight}>
                        <b>
                          G8
                        </b>
                      </div>
                    </div>
                  </td>
                  <td valign="top" width="100%" style={{ padding: "10px" }}>
                    <p style={{ color: "white", marginBottom: "0px" }}>
                      Non-climate pressures and threats to human and natural systems reduced (particularly
                      where these compound climate change impacts).
                    </p>
                  </td>
                </tr>
                <tr style={{ border: "1px solid gainsboro" }}>
                  <td align="right" valign="top" >
                    <div style={{ ...container, ...bg_orange }}>
                      <div style={topRight}>
                        <b>
                          G9
                        </b>
                      </div>
                    </div>
                  </td>
                  <td valign="top" width="100%" style={{ padding: "10px" }}>
                    <p style={{ color: "white", marginBottom: "0px" }}>
                      Secure food, water and energy supplies for all citizens (within the context of
                      sustainable development).
                    </p>
                  </td>
                </tr>
              </tbody>
            </table>
          </Col>
        </Row>
        <br />
        <br />
        <Row>
          <Col md="12">
            <h3>
              <b style={{ marginRight: "15px"}}>Climate Change Adaptation Status Across South Africa</b>
              <Button style={{ marginTop: "0px", marginLeft: "0px", height: "40px", fontSize: "16px" }} size="sm" color="grey">View Gauteng</Button>
            </h3>
            <p style={{ marginBottom: "0px" }}>
              A simple pragmatic approach has been developed to monitor and evaluate the progress being made
              in achieving individual desired adaptation outcomes using traffic light colours as a scoring
              system to summarise progress.
            </p>
          </Col>
        </Row>
        <hr />
        <Row >
          <Col md="3" style={{ marginBottom: "3px" }}>
            <TreeSelectInput
              placeHolder="Select Region to filter..."
              data={[{ id: 1, text: "Gauteng" }, { id: 2, text: "Western Cape" }, { id: 3, text: "..." }]} //mock data
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
        <Row style={{ marginBottom: "-20px" }}>
          <Col className="d-none d-md-block" md="1" style={{ textAlign: "right" }}>
            <label style={{ marginRight: "0px", fontSize: "18px", marginTop: "12px" }}>
              <b>
                2008
              </b>
            </label>
          </Col>
          <Col md="10">
            <InputRange min={2008} max={2018} value={2018} />
          </Col>
          <Col className="d-none d-md-block" md="1" style={{ textAlign: "left" }}>
            <label style={{ marginLeft: "0px", fontSize: "18px", marginTop: "12px" }}>
              <b>
                2018
              </b>
            </label>
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
              data={goalData.goal1}
            />
            <TrafficLightBar
              showTitle={false}
              goal="2"
              data={goalData.goal2}
            />
            <TrafficLightBar
              showTitle={false}
              goal="3"
              data={goalData.goal3}
            />
            <TrafficLightBar
              showTitle={false}
              goal="4"
              data={goalData.goal4}
            />
            <TrafficLightBar
              showTitle={false}
              goal="5"
              data={goalData.goal5}
            />
            <TrafficLightBar
              showTitle={false}
              goal="6"
              data={goalData.goal6}
            />
            <TrafficLightBar
              showTitle={false}
              goal="7"
              data={goalData.goal7}
            />
            <TrafficLightBar
              showTitle={false}
              goal="8"
              data={goalData.goal8}
            />
            <TrafficLightBar
              showTitle={false}
              goal="9"
              data={goalData.goal9}
            />
          </Col>
          <Col md="1"></Col>
        </Row>
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