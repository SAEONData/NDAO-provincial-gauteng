import React from 'react'
import { Row, Col, Button } from 'mdbreact'
import { connect } from 'react-redux'
import moment from 'moment'

//images
import money from '../../../../../images/Icons/money.jpg'

const mapStateToProps = (state, props) => {
  return {}
}

const mapDispatchToProps = (dispatch) => {
  return {}
}

class FundingIGFX extends React.Component {

  constructor(props) {
    super(props);
  }

  mode(array) {
    if (array.length == 0)
      return null;
    var modeMap = {};
    var maxEl = array[0], maxCount = 1;
    for (var i = 0; i < array.length; i++) {
      var el = array[i];
      if (modeMap[el] == null)
        modeMap[el] = 1;
      else
        modeMap[el]++;
      if (modeMap[el] > maxCount) {
        maxEl = el;
        maxCount = modeMap[el];
      }
    }
    return maxEl;
  }

  processData(data, year) {

    let rangeValues = []

    if (data) {

      let filteredData = data.filter(g => moment(g.CreateDate, 'YYYY/MM/DD').year() === year)
      filteredData.forEach(x => {
        let filtered = x.Questions.filter(q => q.Key === "TotalBudget")
        if (filtered.length > 0) {
          rangeValues.push(filtered[0].Value)
        }
      })

      let mode = this.mode(rangeValues)
      switch(mode) {
        case "1":
          return "0k - 10k"

        case "2":
          return "10k - 100k"

        case "3":
          return "100k - 1m"

        case "4":
          return "1m - 10m"

        case "5":
          return "10m - 100m"

        case "6":
          return "> 100m"
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
          src={money}
          style={{
            height: "55px",
            marginBottom: "15px"
          }}
        />

        <h6 style={{ marginBottom: "15px", fontWeight: "bolder", minHeight: "90px" }}>
          The majority of projects are funded between
        </h6>

        <h5 style={{ fontWeight: "bold" }}>
          {value}
        </h5>

      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(FundingIGFX)