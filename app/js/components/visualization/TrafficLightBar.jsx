'use strict'

import React from 'react'
import { Popover, PopoverBody, PopoverHeader } from 'mdbreact'

//Images
import gear from "../../../images/gear.png"
import traffic_light from "../../../images/traffic_light.jpg"
import paper_clip_blue from "../../../images/paper_clip_blue.png"
import paper_clip_grey from "../../../images/paper_clip_grey.png"


class TrafficLightBar extends React.Component {

  constructor(props) {
    super(props);
  }

  renderHeaders(data) {

    let headers = []

    data.map(item => {
      headers.push(
        <label key={item.key} style={{ width: ((100 / data.length) + "%"), textAlign: "center", fontSize: "18px" }}>
          <b>{item.key}</b>
        </label>
      )
    })

    return headers
  }

  getPartColour(value) {
    switch (value) {
      case "R":
        return "#DF0101"
      case "A":
        return "#FFBB33"
      case "G":
        return "#3D9140"
    }
  }

  renderParts(data) {

    let parts = []

    data.map(item => {
      parts.push(
        <label
          key={item.key}
          style={{ width: ((100 / data.length) + "%"), height: "100%", backgroundColor: this.getPartColour(item.value), border: "0px solid gainsboro" }}
        />
      )
    })

    return parts
  }

  render() {

    let { data, showTitle, goal, attachment, description, explanation } = this.props

    return (
      <div style={{ marginBottom: "10px" }}>

        <table>
          <tbody>

            {/* HEADERS (OPTIONAL) */}
            {
              showTitle &&
              <tr>
                <th>
                  <img src="" style={{ width: "40px" }} />
                </th>
                <th>
                  <label style={{ fontSize: "18px", marginTop: "30px", marginLeft: "-3px", width: "15px" }}></label>
                </th>
                <th width="100%">
                  <div style={{ width: "100%" }}>
                    {this.renderHeaders(data)}
                  </div>
                </th>
                <th>
                  <img src="" style={{ height: "40px", marginLeft: "5px" }} />
                </th>
                <th>
                  <img src="" style={{ height: "35px" }} />
                </th>
              </tr>
            }

            {/* PARTS */}
            <tr>
              <td>
                {description &&
                  <Popover
                    component="a"
                    placement="right"
                    popoverBody={<img src={gear} style={{ width: "40px" }} />}
                  >
                    <PopoverHeader>
                      Goal details:
                  </PopoverHeader>
                    <PopoverBody>
                      {description}
                    </PopoverBody>
                  </Popover>
                }
                {!description && <img src={gear} style={{ width: "40px" }} />}
              </td>
              <td>
                <label style={{ fontSize: "18px", marginTop: "30px", marginLeft: "-3px", width: "15px" }}>{goal}</label>
              </td>
              <td width="100%">
                <div style={{ height: "50px", border: "1px solid gainsboro", width: "100%", backgroundColor: "whitesmoke" }}>
                  {this.renderParts(data)}
                </div>
              </td>
              <td>
                {explanation &&
                  <Popover
                    component="a"
                    placement="left"
                    popoverBody={<img src={traffic_light} style={{ height: "40px", marginLeft: "5px" }} />}
                  >
                    <PopoverHeader>
                      How the stoplight system works for the goal:
                    </PopoverHeader>
                    <PopoverBody>
                      {explanation}
                    </PopoverBody>
                  </Popover>
                }
                {!explanation && <img src={traffic_light} style={{ height: "40px", marginLeft: "5px" }} />}
              </td>
              <td>
                {attachment && <a target="blank" href={attachment}><img src={paper_clip_blue} style={{ height: "35px" }} /></a>}
                {!attachment && <img src={paper_clip_grey} style={{ height: "35px" }} />}
              </td>
            </tr>
          </tbody>
        </table>

      </div>
    )
  }
}

export default TrafficLightBar