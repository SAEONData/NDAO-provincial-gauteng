import React from 'react'
import { Col, Row } from 'mdbreact';
import TrafficLightBar from '../../visualization/TrafficLightBar.jsx';
import { Red, Amber, Green } from "../../../config/colours.js"
import moment from 'moment'

//images
import popout from '../../../../images/Icons/popout.png'
import popin from '../../../../images/Icons/popin.png'

const _gf = require('../../../globalFunctions')

class TrafficLights extends React.Component {

  constructor(props) {
    super(props);
  }

  processData(goalData, filterYear) {

    let data = []

    filterYear += 1
    for (let goalType = 1; goalType <= 9; goalType++) //for each goal: 1-9
    {
      for (let goalYear = (filterYear - 5); goalYear <= filterYear; goalYear++) //for each year in range: (year-5) - year
      {
        let newItem = {
          Type: goalType,
          Year: goalYear
        }

        let filtered = goalData.filter(g => g.Type === goalType && moment(g.CreateDate, 'YYYY/MM/DD').year() === goalYear)
        if(filtered.length > 0){

          let goal = filtered[0]
          let filteredQuestions = goal.Questions.filter(q => q.Key === "DocumentLink" || q.Key === "EvidenceLink")
          let link = ""
          if(filteredQuestions.length > 0){
            link = filteredQuestions[0].Value
          }
          
          //Add actual data
          newItem.Id = goal.Id
          newItem.Status = goal.Status
          newItem.Link = link
        }
        else{
          //Manufacture empty data
          newItem.Id = _gf.GetUID()
          newItem.Status = ""
          newItem.Link = ""
        }

        data.push(newItem) //Add to data
      }
    }

    return data
  }

  render() {

    let { goalData, filterYear, height, popCallback, fullView } = this.props
    let processedData = this.processData(goalData, filterYear)

    return (
      <div style={{ backgroundColor: "white", border: "1px solid gainsboro", padding: "20px 10px 20px 10px", borderRadius: "10px" }}>

        <img
          src={ fullView ? popin : popout}
          style={{
            width: "25px",
            cursor: "pointer",
            position: "absolute",
            right: "23px",
            top: "8px",
            zIndex: 2
          }}
          onClick={() => { popCallback() }}
        />

        {processedData.length > 0 &&
          <Row>
            <Col md="12">

              <TrafficLightBar
                height={height / 9}
                goal="1"
                showHeaders={true}
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
                data={processedData.filter(g => g.Type == 1).map(g => ({ id: g.Id, key: g.Year, value: g.Status, attachment: g.Link }))}
              />

              <TrafficLightBar
                height={height / 9}
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
                data={processedData.filter(g => g.Type === 2).map(g => ({ id: g.Id, key: g.Year, value: g.Status, attachment: g.Link }))}
              />

              <TrafficLightBar
                height={height / 9}
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
                    <hr />
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
                data={processedData.filter(g => g.Type === 3).map(g => ({ id: g.Id, key: g.Year, value: g.Status, attachment: g.Link }))}
              />

              <TrafficLightBar
                height={height / 9}
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
                data={processedData.filter(g => g.Type === 4).map(g => ({ id: g.Id, key: g.Year, value: g.Status, attachment: g.Link }))}
              />

              <TrafficLightBar
                height={height / 9}
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
                data={processedData.filter(g => g.Type === 5).map(g => ({ id: g.Id, key: g.Year, value: g.Status, attachment: g.Link }))}
              />

              <TrafficLightBar
                height={height / 9}
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
                data={processedData.filter(g => g.Type === 6).map(g => ({ id: g.Id, key: g.Year, value: g.Status, attachment: g.Link }))}
              />

              <TrafficLightBar
                height={height / 9}
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
                data={processedData.filter(g => g.Type === 7).map(g => ({ id: g.Id, key: g.Year, value: g.Status, attachment: g.Link }))}
              />

              <TrafficLightBar
                height={height / 9}
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
                data={processedData.filter(g => g.Type === 8).map(g => ({ id: g.Id, key: g.Year, value: g.Status, attachment: g.Link }))}
              />

              <TrafficLightBar
                height={height / 9}
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
                data={processedData.filter(g => g.Type === 9).map(g => ({ id: g.Id, key: g.Year, value: g.Status, attachment: g.Link }))}
              />

            </Col>
          </Row>
        }

        {processedData.length === 0 &&
          <Row>
            <Col className="text-center" md="12">
              <h5>Loading data...</h5>
            </Col>
          </Row>
        }
      </div>
    )
  }
}

export default TrafficLights