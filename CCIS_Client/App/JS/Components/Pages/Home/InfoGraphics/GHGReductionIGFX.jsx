import React from 'react'
import { Row, Col, Button } from 'mdbreact'
import { connect } from 'react-redux'
import buildQuery from 'odata-query'
import { ccrdBaseURL } from '../../../../../js/config/serviceURLs.js'
import moment from 'moment'

//images
import ghg_reduction from '../../../../../images/Icons/ghg_reduction.jpg'

const mapStateToProps = (state, props) => {
  return {}
}

const mapDispatchToProps = (dispatch) => {
  return {}
}

class GHGReductionIGFX extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      totalCO2Reductions: 0
    }
  }

  componentDidMount() {
    this.getData()
  }

  componentDidUpdate(){
    this.getData()
  }

  async getData(){

    let { data, year } = this.props

    //Get GHG emissions
    const query = buildQuery({
      filter: {
        MitigationEmissionsData: {
          any: [
            { CO2: { gt: 0 } },
            { Year: year }
          ]
        },
        ProjectDAOs: {
          any: [
            { DAOId: { ne: null } }
          ]
        }
      },
      select: ['ProjectId'],
      expand: {
        MitigationEmissionsData: {
          filter: {
            and: [
              { CO2: { gt: 0 } },
              { Year: year }
            ]
          },
          select: ['CO2', 'Year']
        },
        ProjectDAOs: {
          select: ['DAOId']
        }
      }
    })

    try {
      let res = await fetch(ccrdBaseURL + `Projects${query}`)
      res = await res.json()

      if (res.value) {

        //Extract filtered GoalIDs
        let filteredIDs = data.map(g => g.Id)

        //Filter Project data on DOA
        let filteredProjects = res.value.filter(p => p.ProjectDAOs.filter(d => filteredIDs.includes(d.DAOId)).length > 0)

        //Sum CO2 values
        let totalCO2Reductions = 0
        filteredProjects.forEach(p => {
          p.MitigationEmissionsData.forEach(e => {
            totalCO2Reductions = totalCO2Reductions + e.CO2
          })
        })

        if(totalCO2Reductions > 0){
          this.setState({ totalCO2Reductions })
        }
      }
    }
    catch (ex) {
      console.error(ex)
    }
  }

  render() {

    let { totalCO2Reductions } = this.state

    return (
      <div style={{
        border: "1px solid gainsboro",
        borderRadius: "10px",
        padding: "10px",
        textAlign: "center",
        wordWrap: "break-word",
        backgroundColor: "white"
      }}>

        <img
          src={ghg_reduction}
          style={{
            height: "55px",
            marginBottom: "15px"
          }}
        />

        <h6 style={{ marginBottom: "15px", fontWeight: "bolder", minHeight: "90px" }}>
          Projected reduction in GHG emissions from projects
        </h6>

        <h5 style={{ fontWeight: "bold" }}>
          {totalCO2Reductions} Tons
        </h5>

      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(GHGReductionIGFX)