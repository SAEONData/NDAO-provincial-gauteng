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

class ProjectCard extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {

    let { pid, ptitle, pdes, viewCallback } = this.props

    if (pdes.length > 240) {
      pdes = pdes.substring(0, 225) + " ..."
    }

    return (
      <>
        <CardBody style={{ marginTop: "-10px" }}>

          <CardTitle style={{ fontSize: "16px" }}>
            <b>{ptitle}</b>
          </CardTitle >

          <CardText style={{ wordWrap: "break-word", fontSize: "14px" }}>
            {pdes}
          </CardText>

          <Button
            size="sm"
            color="white"
            onClick={() => { viewCallback(pid) }}
            style={{
              backgroundColor: "white",
              margin: "0px 15px 0px 0px",
              boxShadow: "none",
              border: "1px solid silver",
              borderRadius: "5px",
              padding: "3px 15px 3px 15px"
            }}
          >
            <table>
              <tbody>
                <tr>
                  <td valign="middle">
                    <Fa icon="eye" size="lg" style={{ color: DEAGreen, marginRight: "5px" }} />
                  </td>
                  <td valign="middle">
                    <div style={{ fontSize: "14px", marginTop: "2px" }} >
                      View
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </Button>

        </CardBody>
        <hr style={{ margin: "0px 0px 15px 0px" }} />
      </>
    )
  }
}

//export default ProjectCard
export default connect(mapStateToProps, mapDispatchToProps)(ProjectCard)