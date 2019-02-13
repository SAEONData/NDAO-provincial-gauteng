import React from 'react'
import { Row, Col, Button } from 'mdbreact'
import { connect } from 'react-redux'
import moment from 'moment'

//images
import plans from '../../../../../images/Icons/plans.jpg'

const mapStateToProps = (state, props) => {
  return {}
}

const mapDispatchToProps = (dispatch) => {
  return {}
}

class PlansIGFX extends React.Component {

  constructor(props) {
    super(props);
  }

  processData(data, year){
 
    if(data && data.length > 0){    
      let filteredData = data.filter(g => moment(g.CreateDate, 'YYYY/MM/DD').year() === year)
      if(filteredData.length > 0){
        return filteredData.length
      }
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
          src={plans}
          style={{
            height: "55px",
            marginBottom: "15px"
          }}
        />

        <h6 style={{ marginBottom: "15px", fontWeight: "bolder", minHeight: "90px" }}>
          Total number of DAO reports submitted
        </h6>

        <h5 style={{ fontWeight: "bold" }}>
          {value}
        </h5>

      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PlansIGFX)