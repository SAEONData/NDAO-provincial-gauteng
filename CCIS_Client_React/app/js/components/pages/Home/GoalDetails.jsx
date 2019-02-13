import React from 'react'
import { Row, Col, Button } from 'mdbreact'
import { connect } from 'react-redux'
import { goalDetails } from '../../../../data/goalDetails'

const mapStateToProps = (state, props) => {
  return {}
}

const mapDispatchToProps = (dispatch) => {
  return {}
}

class GoalDetails extends React.Component {

  constructor(props) {
    super(props);

    this.getGoalDetails = this.getGoalDetails.bind(this)
  }

  getGoalDetails() {

    let { goal } = this.props
    let result = "Not Found!"

    if (goalDetails && goalDetails.length > 0) {
      let filtered = goalDetails.filter(x => x.id === goal)
      if(filtered.length > 0){
        result = filtered[0].text
      }
      else{
        result = goalDetails[0].text
      }
    }

    return result
  }

  render() {
    return (
      <div style={{
        backgroundColor: "white",
        border: "1px solid gainsboro",
        borderRadius: "10px",
        padding: "15px 15px 5px 15px"
      }}>
        <h5 style={{ margin: "0px" }}>
          <b>Goal Details</b>
        </h5>
        <hr style={{ marginTop: "10px" }} />
        <p style={{ overflowY: "auto", height: "112px", paddingRight: "15px" }}>
          {this.getGoalDetails()}
        </p>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(GoalDetails)