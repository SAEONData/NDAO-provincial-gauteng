import React from 'react'
import { Row, Col, Button } from 'mdbreact'
import { connect } from 'react-redux'
import { vmsBaseURL } from '../../../../../js/config/serviceURLs.js'
import moment from 'moment'

//images
import governments from '../../../../../images/Icons/governments.jpg'

const mapStateToProps = (state, props) => {
  return {}
}

const mapDispatchToProps = (dispatch) => {
  return {}
}

class GovernmentsIGFX extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      regionCount: 0
    }
  }

  async componentDidMount(){

    //Get Region count
    try {
      let res = await fetch(vmsBaseURL + 'Regions/flat')
      res = await res.json()

      if (res.items) {
        this.setState({ regionCount: res.items.length })
      }
    }
    catch (ex) {
      console.error(ex)
    }
  }

  processData(data, year) {

    let regionCount = this.state.regionCount
    let implRegionCount = 0

    //Get count of "implemented" regions (unique list)
    let implRegions = []
    let filteredData = data.filter(g => moment(g.CreateDate, 'YYYY/MM/DD').year() === year)
    filteredData.forEach(g => {
      let filtered = g.Questions.filter(q => q.Key === "Region")
      if(filtered.length > 0 && !implRegions.includes(filtered[0].Value)){
        implRegions.push(filtered[0].Value)
      }
    })
    implRegionCount = implRegions.length

    //Calc percentage of implemented regions
    if(implRegionCount > 0 && regionCount > 0){
      let percentage = implRegionCount / regionCount * 100
      percentage = Math.round(percentage * 100) / 100
      return percentage + "%"
    }

    return "#####"
  }

  render() {

    let { data, year } = this.props
    let value = this.processData(data, year)

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
          src={governments}
          style={{
            height: "55px",
            marginBottom: "15px"
          }}
        />

        <h6 style={{ marginBottom: "15px", fontWeight: "bolder", minHeight: "90px" }}>
          Percentage of governments reporting at least 1 plan or action
        </h6>

        <h5 style={{ fontWeight: "bold" }}>
          {value}
        </h5>

      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(GovernmentsIGFX)