'use strict'

import React from 'react'
import { connect } from 'react-redux'
import { Row, Col, Button, InputRange, Collapse } from 'mdbreact'
import { DEAGreen, DEAGreenDark, DEAOrange, DEAOrangeDark, Red, Amber, Green } from "../../config/colours.cfg"
import TrafficLightBar from '../visualization/TrafficLightBar.jsx';
import TreeSelectInput from '../input/TreeSelectInput.jsx';
import SelectInput from '../input/SelectInput.jsx';
import MapsCarouselView from '../layout/MapsCarouselView.jsx';

//Data
const goalData = require('../../../data/goalData')

//Content
import sampleFile from '../../../content/sample.zip'

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

    this.state = { infoSection: true }
  }

  componentDidMount() {
    this.props.updateNav(location.hash)
  }

  render() {

    let { infoSection } = this.state

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

        <h5
          style={{ marginBottom: "0px", color: DEAGreen, cursor: "pointer" }}
          onClick={() => { this.setState({ infoSection: !infoSection }) }} >
          <b style={{ marginRight: "15px" }}>
            <u>
              {infoSection === true ? "Less" : "More"} Information...
            </u>
          </b>
          <i className={!infoSection ? 'fa fa-angle-down rotate-icon' : 'fa fa-angle-up'}></i>
        </h5>
        <Collapse isOpen={infoSection}>
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
          <h5
            style={{ marginBottom: "0px", color: DEAGreen, cursor: "pointer" }}
            onClick={() => {
              window.scroll({
                top: 400,
                left: 0,
                behavior: 'smooth'
              })
              setTimeout(() => {
                this.setState({ infoSection: !infoSection })
              }, 600)
            }} >
            <b style={{ marginRight: "15px" }}>
              <u>
                {infoSection === true ? "Less" : "More"} Information...
              </u>
            </b>
            <i className={!infoSection ? 'fa fa-angle-down rotate-icon' : 'fa fa-angle-up'}></i>
          </h5>
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
        <Row style={{ marginBottom: "-20px" }}>
          <Col md="12">
            <table>
              <tbody>
                <tr height="50px" valign="middle">
                  <td>
                    <h5>
                      <b>
                        2008&nbsp;&nbsp;
                      </b>
                    </h5>
                  </td>
                  <td width="100%">
                    <InputRange min={2008} max={2018} value={2018} />
                  </td>
                  <td>
                    <h5>
                      <b>
                        &nbsp;&nbsp;2018
                      </b>
                    </h5>
                  </td>
                </tr>
              </tbody>
            </table>
          </Col>
        </Row>
        <hr />
        <br />
        <Row>
          <Col md="1"></Col>
          <Col md="10" style={{ border: "1px solid gainsboro", padding: "10px" }}>
            <TrafficLightBar
              goal="1"
              showTitle={true}
              description={
                <p>
                  Goal 1. Robust/integrated plans, policies and actions for effective delivery of climate change
                  adaptation, together with monitoring, evaluation and review over the short, medium and longer-term.
                </p>
              }
              explanation={
                <div>
                  <p>
                    <b style={{ color: Red }}>RED </b>
                    No capacity building programmes (including research),
                    collaboration and partnerships to address climate change adaptation and no incorporation
                    into school curriculum.
                  </p>
                  <p>
                    <b style={{ color: Amber }}>AMBER </b>
                    Attendance of capacity building programmes but no
                    utilisation, collaboration and partnerships to address climate change adaptation and no
                    incorporation into school curriculum (amber).
                  </p>
                  <p>
                    <b style={{ color: Green }}>GREEN </b>
                    Capacity building programmes (including
                    research and utilisation), collaboration and partnerships to address climate change
                    adaptation, incorporation into school curriculum, and utilisation to inform policy
                    and decision-making (green).
                  </p>
                </div>
              }
              attachment={sampleFile}
              data={goalData.goal1}
            />
            <TrafficLightBar
              goal="2"
              description={
                <p>
                  Goal 2. Appropriate resources (including current and past financial investments), capacity and
                  processes (human, legal and regulatory) and support mechanisms (institutional and governance
                  structures) to facilitate climate change adaptation.
                </p>
              }
              explanation={
                <div>
                  <p>
                    <b style={{ color: Red }}>RED </b>
                    No dedicated political/administrative champions, capacity, structure (i.e.
                    organogram with climate change key performance indicators or Board-level
                    oversight of climate change) or funding (including monetary incentives);
                    no inclusion of climate change items in existing administrative and
                    political forums/committees in businesses, sectors, provinces and municipalities.
                  </p>
                  <p>
                    <b style={{ color: Amber }}>AMBER </b>
                    Political/administrative champions designated but with no capacity, structure
                    (i.e. organogram) or funding; inclusion of climate change items only by request
                    in existing administrative and political forums/committees.
                  </p>
                  <p>
                    <b style={{ color: Green }}>GREEN </b>
                    Political/administrative champions designated, and capacity, structure
                    (i.e. organogram/Board-level oversight) and dedicated funding; climate change
                    standing item in administrative and political provincial, municipal and sector
                    forum/committee agendas.
                  </p>
                </div>
              }
              data={goalData.goal2}
            />
            <TrafficLightBar
              goal="3"
              description={
                <p>
                  Goal 3. Accurate climate information (e.g. historical trend data, seasonal predictions,
                  future projections, and early warning of extreme weather and other climate-related events)
                  provided by existing and new monitoring and forecasting facilities/networks (including their
                  maintenance and enhancement) to inform adaptation planning and disaster risk reduction.
                  </p>
              }
              explanation={
                <div>
                  <p>
                    <b style={{ color: Red }}>RED </b>
                    No dissemination and utilisation of weather and climate-related information.
                  </p>
                  <p>
                    <b style={{ color: Amber }}>AMBER </b>
                    Dissemination but no utilisation of weather and climate-related information.
                  </p>
                  <p>
                    <b style={{ color: Green }}>GREEN </b>
                    Dissemination and utilisation of weather and climate-related information at
                    provincial, municipal and community levels.
                  </p>
                  <hr/>
                  <p>
                    <b style={{ color: Red }}>RED </b>
                    Lack of monitoring and forecasting facilities/networks.
                  </p>
                  <p>
                    <b style={{ color: Amber }}>AMBER </b>
                    Monitoring facilities/networks exist but are not well-maintained or enhanced.
                  </p>
                  <p>
                    <b style={{ color: Green }}>GREEN </b>
                    Monitoring facilities/networks exist and are maintained and enhanced. 
                  </p>
                </div>
              }
              data={goalData.goal3}
            />
            <TrafficLightBar
              goal="4"
              description={
                <p>
                  Goal 4. Capacity development, education and awareness programmes (formal and informal) for
                  climate change adaptation (e.g. informed by adaptation research and with tools to
                  utilise data/outputs).
                </p>
              }
              explanation={
                <div>
                  <p>
                    <b style={{ color: Red }}>RED </b>
                    No capacity building programmes (including research), collaboration and partnerships
                    to address climate change adaptation and no incorporation into school curriculum.
                  </p>
                  <p>
                    <b style={{ color: Amber }}>AMBER </b>
                    Attendance of capacity building programmes but no utilisation, collaboration and
                    partnerships to address climate change adaptation and no incorporation into school
                    curriculum.
                  </p>
                  <p>
                    <b style={{ color: Green }}>GREEN </b>
                    Capacity building programmes (including research and utilisation), collaboration
                    and partnerships to address climate change adaptation, incorporation into school
                    curriculum, and utilisation to inform policy and decision-making.
                  </p>
                </div>
              }
              data={goalData.goal4}
            />
            <TrafficLightBar
              goal="5"
              description={
                <p>
                  Goal 5. New and adapted technologies/knowledge and other cost-effective measures (e.g.
                  nature-based solutions) used in climate change adaptation.
                </p>
              }
              explanation={
                <div>
                  <p>
                    <b style={{ color: Red }}>RED </b>
                    Lack of awareness/understanding of newly developed technologies, research and
                    knowledge leading to poor or no application.
                  </p>
                  <p>
                    <b style={{ color: Amber }}>AMBER </b>
                    Awareness/ understanding of technologies, research and knowledge but no implementation
                    and utilisation.
                  </p>
                  <p>
                    <b style={{ color: Green }}>GREEN </b>
                    Evidence of implementation and utilisation of technologies and knowledge (e.g. 100
                    households now have rainwater harvesting devices and have received training on how
                    to use and maintain them).
                  </p>
                </div>
              }
              data={goalData.goal5}
            />
            <TrafficLightBar
              goal="6"
              description={
                <p>
                  Goal 6. Climate change risks, impacts and vulnerabilities identified and addressed.
                </p>
              }
              explanation={
                <div>
                  <p>
                    <b style={{ color: Red }}>RED </b>
                    No risk and vulnerability profiles.
                  </p>
                  <p>
                    <b style={{ color: Amber }}>AMBER </b>
                    Risk and vulnerability profiles identified.
                  </p>
                  <p>
                    <b style={{ color: Green }}>GREEN </b>
                    Risks, impacts and vulnerabilities addressed in policies, plans and actions.
                  </p>
                </div>
              }
              data={goalData.goal6}
            />
            <TrafficLightBar
              goal="7"
              description={
                <p>
                  Goal 7. Evidence of reduced risk/vulnerability as a result of addressing the identified risk/vulnerability.
                </p>
              }
              explanation={
                <div>
                  <p>
                    <b style={{ color: Red }}>RED </b>
                    Lack of behavioural/system/infrastructure change/modification as a result of
                    addressing identified risks (including climate risk) and vulnerabilities to
                    reduce climate change impacts
                  </p>
                  <p>
                    <b style={{ color: Amber }}>AMBER </b>
                    Evidence of reactive behavioural/system/infrastructure change/modification as
                    a result of addressing identified risks (including climate risk) and vulnerabilities
                    to reduce climate change impacts.
                  </p>
                  <p>
                    <b style={{ color: Green }}>GREEN </b>
                    Evidence of proactive behavioural/system/infrastructure change/modification as
                    a result of addressing identified risks (including climate risk) and vulnerabilities
                    to reduce climate change impacts.
                  </p>
                </div>
              }
              data={goalData.goal7}
            />
            <TrafficLightBar
              goal="8"
              description={
                <p>
                  Goal 8. Land use and land use change, population demographics, pollution, water quality
                  and siltation of dams, protection and enhancement of natural resources and other
                  environmental assets, service delivery protests, non-maintenance of infrastructure,
                  and socio-economic status/factors.
                </p>
              }
              explanation={
                <div>
                  <p>
                    <b style={{ color: Red }}>RED </b>
                    No change in non-climate pressures and threats to human and natural systems
                    (particularly where these compound climate change impacts).
                  </p>
                  <p>
                    <b style={{ color: Amber }}>AMBER </b>
                    Non-climate pressures and threats to human and natural systems (particularly
                    where these compound climate change impacts) halted or are improving.
                  </p>
                  <p>
                    <b style={{ color: Green }}>GREEN </b>
                    Natural systems impacted by non-climate pressures and threats rehabilitated or
                    improving with supporting evidence.
                  </p>
                </div>
              }
              data={goalData.goal8}
            />
            <TrafficLightBar
              goal="9"
              description={
                <p>
                  Goal 9. Secure food, water and energy supplies for all citizens (within the context of
                  sustainable development).
                </p>
              }
              explanation={
                <div>
                  <p>
                    <b style={{ color: Red }}>RED </b>
                    No climate resilient measures/actions implemented to ensure secure food, water and energy.
                  </p>
                  <p>
                    <b style={{ color: Amber }}>AMBER </b>
                    Climate resilient measures/actions implemented to ensure secure food, water and energy.
                  </p>
                  <p>
                    <b style={{ color: Green }}>GREEN </b>
                    Evidence of secure food, water and energy in communities as a result of implementing
                    climate-resilient measures.
                  </p>
                </div>
              }
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