import React from 'react'
import { Row, Col, Button } from 'mdbreact'
import { connect } from 'react-redux'
import { MapConfig } from '../../../../Data/mapConfig'

//images
import popout from '../../../../Images/Icons/popout.png'
import popin from '../../../../Images/Icons/popin.png'
import static_maps_sa from '../../../../Images/Maps/static_maps_sa.png'
import loader from '../../../../Images/Other/loader.gif'

const mapStateToProps = (state, props) => {
  return {}
}

const mapDispatchToProps = (dispatch) => {
  return {}
}

class DashMapPreview extends React.Component {

  constructor(props) {
    super(props);
  }

  buildMapConfig() {

    let { titleFilter, statusFilter, typologyFilter, regionFilter, sectorFilter, favoritesFilter } = this.props
    let mapConfig = MapConfig

    //Add filters
    if (regionFilter > 0 || statusFilter > 0 || typologyFilter > 0 || sectorFilter > 0) {

      mapConfig.filters = {}

      if (parseInt(regionFilter) > 0) {
        mapConfig.filters.region = {
          uid: parseInt(regionFilter)
        }
      }

      if (parseInt(statusFilter) > 0) {
        mapConfig.filters.status = {
          uid: parseInt(statusFilter)
        }
      }

      if (parseInt(typologyFilter) > 0) {
        mapConfig.filters.typology = {
          uid: parseInt(typologyFilter)
        }
      }

      if (parseInt(sectorFilter) > 0) {
        mapConfig.filters.sector = {
          uid: parseInt(sectorFilter)
        }
      }
    }

    return encodeURI(JSON.stringify(mapConfig))
  }

  render() {

    let { height, popCallback, fullView } = this.props
    let mapConfig = this.buildMapConfig()

    return (
      <div style={{ backgroundColor: "white", padding: "10px", borderRadius: "10px", border: "1px solid gainsboro" }}>

        <h4 style={{ margin: "5px 5px 0px 19px", display: "inline-block" }}>
          <b>Map</b>
        </h4>

        <img
          src={fullView ? popin : popout}
          style={{
            width: "25px",
            cursor: "pointer",
            position: "absolute",
            right: "28px",
            top: "15px",
            zIndex: 2
          }}
          onClick={() => { popCallback() }}
        />

        <hr style={{ marginTop: "10px", marginBottom: "10px" }} />

        <div className="d-flex align-items-center flex-column justify-content-center">

          <iframe
            style={{
              width: "100%",
              height: (height + "px"),
              margin: "0px",
              border: "none",
              backgroundImage: `url(${loader})`,
              backgroundRepeat: "no-repeat",
              backgroundPosition: "50% 50%"
            }}
            // src={`http://app01.saeon.ac.za/components/map?conf=${mapConfig}`}
            src={'http://www.example.com'}
          />

        </div>

      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DashMapPreview)