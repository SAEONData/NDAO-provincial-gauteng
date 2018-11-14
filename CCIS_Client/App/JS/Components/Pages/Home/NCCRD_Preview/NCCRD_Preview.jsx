import React from 'react'
import { Row, Col, Button } from 'mdbreact'
import { connect } from 'react-redux'
import OData from 'react-odata'
import ProjectCard from './ProjectCard.jsx'
import { ccrdBaseURL } from '../../../../config/serviceURLs.cfg'
import NCCRD from '../../Tools/NCCRD.jsx'

//images
import popout from '../../../../../images/popout.png'

const mapStateToProps = (state, props) => {
  return {}
}

const mapDispatchToProps = (dispatch) => {
  return {}
}

class NCCRD_Preview extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      showNCCRD: ""
    }
  }

  render() {

    let { showNCCRD } = this.state

    return (
      <div style={{ backgroundColor: "white", border: "1px solid gainsboro", borderRadius: "10px" }}>

        <h4 style={{ margin: "10px 5px 0px 19px", display: "inline-block" }}>
          <b>Projects</b>
        </h4>

        <hr style={{ marginTop: "10px", marginBottom: "10px" }} />

        <OData
          baseUrl={ccrdBaseURL + 'Projects'}
          query={{
            // filter: { CreateUser: { eq: { type: 'guid', value: user.profile.UserId } }, Type: selectedGoal },
            select: ['ProjectId', 'ProjectTitle', 'ProjectDescription'],
            orderBy: "ProjectTitle"
          }}
        >
          {({ loading, error, data }) => {

            if (loading === true) {
              return (
                <div style={{ height: "360px", marginBottom: "15px", marginLeft: "15px" }}>
                  <p>Loading...</p>
                </div>
              )
            }

            if (error) {
              console.error(error)
              return (
                <div style={{ height: "360px", marginBottom: "15px", marginLeft: "15px" }}>
                  <p>
                    Unable to load projects.
                  <br />
                    (See log for details)
                </p>
                </div>
              )
            }

            if (data) {

              if (data.value && data.value.length > 0) {

                let projects = []
                data.value.map(p => {
                  projects.push(
                    <ProjectCard
                      key={p.ProjectId}
                      pid={p.ProjectId}
                      ptitle={p.ProjectTitle}
                      pdes={p.ProjectDescription}
                      viewCallback={(hash) => {
                        console.log("here")
                        this.setState({ showNCCRD: hash })
                      }}
                    />
                  )
                })
                return (
                  <div style={{ height: "360px", overflowY: "auto", marginBottom: "15px" }}>
                    {projects}
                  </div>
                )
              }
              else {
                return (
                  <div style={{ height: "360px", marginBottom: "15px", marginLeft: "15px" }}>
                    <p>No projects found.</p>
                  </div>
                )
              }

            }
          }}
        </OData>

        {
          (showNCCRD !== "") &&
          <NCCRD
            path={`/${showNCCRD}`}
            query={`?navbar=hidden&daoid=hidden&readonly=true&popin=hidden`}
            closeCallback={() => { this.setState({ showNCCRD: "" }) }}
          />
        }

      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NCCRD_Preview)