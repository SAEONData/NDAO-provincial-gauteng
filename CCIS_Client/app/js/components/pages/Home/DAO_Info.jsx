import React from 'react'
import { Col, Row } from 'mdbreact';
import { DEAGreenDark, DEAOrangeDark } from "../../../config/colours.js"

//Images
import DEAGreenLightDark from '../../../../images/Other/DEAGreenLightDark.png'
import DEAOrangeLightDark from '../../../../images/Other/DEAOrangeLightDark.png'

class DAO_Info extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {

    const container = { position: "relative", textAlign: "center", color: "white", top: "0px", bottom: "0px" }
    const topRight = { position: "absolute", top: "9px", right: "9px" }
    const bg_green = { backgroundImage: `url(${DEAGreenLightDark})`, backgroundSize: "contain", backgroundRepeat: "no-repeat", width: "71px", paddingTop: "100%" }
    const bg_orange = { backgroundImage: `url(${DEAOrangeLightDark})`, backgroundSize: "contain", backgroundRepeat: "no-repeat", width: "70px", paddingTop: "100%" }

    return (
      <>
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
      </>
    )
  }
}

export default DAO_Info