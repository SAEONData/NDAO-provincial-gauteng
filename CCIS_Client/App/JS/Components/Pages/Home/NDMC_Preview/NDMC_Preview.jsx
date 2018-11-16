import React from 'react'
import { Row, Col, Button } from 'mdbreact'
import { connect } from 'react-redux'
import popout from '../../../../../Images/Icons/popout.png'
import OData from 'react-odata'
import EventCard from './EventCard.jsx'
import { ndmcBaseURL } from '../../../../Config/serviceURLs.cfg'

const mapStateToProps = (state, props) => {
  return {}
}

const mapDispatchToProps = (dispatch) => {
  return {}
}

class NDMC_Preview extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div style={{ backgroundColor: "white", border: "1px solid gainsboro", borderRadius: "10px" }}>

        <h4 style={{ margin: "10px 5px 0px 19px", display: "inline-block" }}>
          <b>Events</b>
        </h4>

        <hr style={{ marginTop: "10px", marginBottom: "10px" }} />

        <OData
          baseUrl={ndmcBaseURL + 'Events'}
          query={{
            expand: {
              EventRegions: {
                expand: {
                  Region: {
                    select: ["RegionName"]
                  }
                },
                select: ["Region"]
              },
              TypeEvent: {
                select: ["TypeEventName"]
              }
            },
            select: ["EventId", "StartDate", "EndDate"],
            filter: {
              StartDate: { ne: null },
              EndDate: { ne: null },
              TypeEvent: { ne: null },
              EventRegions: {
                any: [
                  { Region: { ne: null } }
                ]
              }
            },
            orderBy: "StartDate DESC,EndDate DESC"
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
                    Unable to load events.
                  <br />
                    (See log for details)
                </p>
                </div>
              )
            }

            if (data) {

              if (data.value && data.value.length > 0) {

                let events = []
                data.value.map(e => {
                  events.push(
                    <EventCard
                      key={e.EventId}
                      eid={e.EventId}
                      start={e.StartDate}
                      end={e.EndDate}
                      region={e.EventRegions[0].Region.RegionName}
                      type={e.TypeEvent.TypeEventName}
                    />
                  )
                })

                return (
                  <div style={{ height: "360px", overflowY: "auto", marginBottom: "15px" }}>
                    {events}
                  </div>
                )
              }
              else {
                return (
                  <div style={{ height: "360px", marginBottom: "15px", marginLeft: "15px" }}>
                    <p>No events found.</p>
                  </div>
                )
              }

            }
          }}
        </OData>

      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NDMC_Preview)