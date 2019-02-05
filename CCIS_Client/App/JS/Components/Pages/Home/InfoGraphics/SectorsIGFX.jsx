import React from 'react'
import { Row, Col, Button } from 'mdbreact'
import { connect } from 'react-redux'
import { vmsBaseURL } from '../../../../../js/config/serviceURLs.js'
import moment from 'moment'

//images
import sectors from '../../../../../images/Icons/sectors.jpg'

const mapStateToProps = (state, props) => {
  return {}
}

const mapDispatchToProps = (dispatch) => {
  return {}
}

class SectorsIGFX extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      sectorCount: 0
    }
  }

  async componentDidMount(){

    //Get Sector count
    try {
      let res = await fetch(vmsBaseURL + 'Sectors/flat')
      res = await res.json()

      if (res.items) {
        this.setState({ sectorCount: res.items.length })
      }
    }
    catch (ex) {
      console.error(ex)
    }
  }

  processData(data, year) {

    let sectorCount = this.state.sectorCount
    let implSectorCount = 0

    //Get count of "implemented" sectors (unique list)
    let implSectors = []
    let filteredData = data.filter(g => moment(g.CreateDate, 'YYYY/MM/DD').year() === year)
    filteredData.forEach(g => {
      let filtered = g.Questions.filter(q => q.Key === "Sector")
      if(filtered.length > 0 && !implSectors.includes(filtered[0].Value)){
        implSectors.push(filtered[0].Value)
      }
    })
    implSectorCount = implSectors.length

    //Calc percentage of implemented sectors
    if(implSectorCount > 0 && sectorCount > 0){
      return implSectorCount + " of " + sectorCount
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
          src={sectors}
          style={{
            height: "55px",
            marginBottom: "15px"
          }}
        />

        <h6 style={{ marginBottom: "15px", fontWeight: "bolder", minHeight: "90px" }}>
          Total number of sectors that have contributed data
        </h6>

        <h5 style={{ fontWeight: "bold" }}>
          {/* 4 of 10 */}
          {value}
        </h5>

      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SectorsIGFX)