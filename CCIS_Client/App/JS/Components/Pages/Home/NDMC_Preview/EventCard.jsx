import React from 'react'
import { Card, CardBody, CardText, CardTitle, Button, Fa } from 'mdbreact'
import { connect } from 'react-redux'
import { DEAGreen } from '../../../../config/colours.js'

const _gf = require('../../../../globalFunctions')

const mapStateToProps = (state, props) => {
  return {}
}

const mapDispatchToProps = (dispatch) => {
  return {
    setScrollPos: payload => {
      dispatch({ type: "SET_PROJECT_SCROLL", payload })
    }
  }
}

class EventCard extends React.Component {

  constructor(props) {
    super(props);
  }


  render() {

    let { eid, start, end, region, type } = this.props

    let startDate = new Date(start*1000)
    let endDate = new Date(end*1000)

    return (
      <>
        <CardBody style={{ marginTop: "-10px" }}>

          <CardTitle style={{ fontSize: "16px" }}>
            <b>{region}</b>
          </CardTitle >

          <CardText style={{ wordWrap: "break-word", fontSize: "14px" }}>

            <Fa icon="calendar-o" style={{ marginRight: "10px" }}/>
            {startDate.toDateString()} - {endDate.toDateString()}

            <br />

            <Fa icon="flag" style={{ marginRight: "10px", marginTop: "7px" }}/>
            {type}

          </CardText>

        </CardBody>
        <hr style={{ margin: "0px 0px 15px 0px" }} />
      </>
    )
  }
}

//export default ProjectCard
export default connect(mapStateToProps, mapDispatchToProps)(EventCard)