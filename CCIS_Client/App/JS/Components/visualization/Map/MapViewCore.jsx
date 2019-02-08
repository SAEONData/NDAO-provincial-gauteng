import React from 'react'
import { connect } from 'react-redux'
import popout from '../../../../images/Icons/popout.png'
import popin from '../../../../images/Icons/popin.png'
import { MapConfig } from '../../../../data/mapConfig'
import { vmsBaseURL } from '../../../../js/config/serviceURLs.js'

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

class MapViewCore extends React.Component {

  constructor(props) {
    super(props);
  }

  // componentDidMount() {
  //   window.addEventListener("message", this.onMessage.bind(this));
  // }

  // componentWillUnmount() {
  //   window.removeEventListener("message", this.onMessage)
  // }

  // onMessage(event) {

  //   if (event.origin === mapServerBaseURL) {
  //     try {
  //       var message = JSON.parse(event.data)
  //       if (message.cmd == 'featureClick' && !location.hash.includes("projects")) {
  //         let navTo = ""
  //         if (location.hash.includes("map")) {
  //           navTo = location.hash.replace("#/map", "#/projects/" + message.id)
  //         }
  //         else {
  //           navTo = location.hash.replace("#/", "#/projects/" + message.id)
  //         }
  //         location.hash = navTo
  //       }
  //     }
  //     catch (ex) {
  //       console.error(ex)
  //     }
  //   }
  // }

  buildMapConfig() {

    let sourceFilters = this.props.filters
    let mapConfig = MapConfig

    //Add filters
    if (sourceFilters.region > 0 || sourceFilters.sector > 0 || sourceFilters.goal > 0 ||
      sourceFilters.year > 0 || sourceFilters.institution !== "") {

      let filters = []

      if (parseInt(sourceFilters.parentRegion) > 0) {
        filters.push(
          {
            field: "properties.regions",
            value: parseInt(sourceFilters.parentRegion)
          }
        )
      }

      if (parseInt(sourceFilters.sector) > 0) {
        filters.push(
          {
            field: "properties.sectors",
            value: parseInt(sourceFilters.sector)
          }
        )
      }

      if (sourceFilters.goal > 0) {
        filters.push(
          {
            field: "properties.type",
            value: sourceFilters.goal
          }
        )
      }

      if (sourceFilters.year > 0) {
        filters.push(
          {
            field: "properties.year",
            value: sourceFilters.year
          }
        )
      }

      if (sourceFilters.institution !== '') {
        filters.push(
          {
            field: "properties.institution",
            value: sourceFilters.institution
          }
        )
      }

      mapConfig.filters = filters
    }
    else {
      delete mapConfig.filters
    }

    //Set viewport
    if (parseInt(sourceFilters.parentRegion) > 0) {

      mapConfig.viewport = {
        service: {
          url: `${vmsBaseURL}regions/${sourceFilters.parentRegion}`,
          field: "wkt",
          display: true
        }
      }
    }
    else {
      delete mapConfig.viewport
    }

    //console.log("mapConfig", mapConfig)
    // console.log("strMapConfig", JSON.stringify(mapConfig))

    return encodeURIComponent(JSON.stringify(mapConfig))
  }

  render() {

    let { height, width, fullView, popCallback } = this.props
    let mapConfig = this.buildMapConfig()
    let mapSrc = `http://app01.saeon.ac.za/components/map?conf=${mapConfig}`

    if (!height) {
      height = "300px"
    }

    if (!width) {
      width = "100%"
    }

    return (
      <div style={{ backgroundColor: "white", padding: "10px", borderRadius: "10px", border: "1px solid gainsboro" }}>

        <h5 style={{ margin: "5px 5px 0px 19px", display: "inline-block" }}>
          <b>Map</b>
        </h5>

        <img
          src={fullView ? popin : popout}
          style={{
            width: "25px",
            float: "right",
            margin: "5px 5px 0px 0px",
            cursor: "pointer"
          }}
          onClick={() => {
            popCallback()
          }}
        />

        <hr style={{ marginTop: 8 }} />

        <iframe
          style={{
            width,
            height,
            margin: "0px",
            border: "none",
            // backgroundImage: `url(${loader})`,
            // backgroundRepeat: "no-repeat",
            // backgroundPosition: "50% 50%"
          }}
          src={mapSrc}
        />

      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MapViewCore)