'use strict'

import React from 'react'
import { Popover, PopoverBody, PopoverHeader, Modal, ModalHeader, ModalBody } from 'mdbreact'
import { DEAGreen, Red, Amber, Green } from '../../config/colours.cfg'

const _gf = require('../../globalFunctions')

//Images
import gear from "../../../images/gear.png"
import traffic_light from "../../../images/traffic_light.jpg"
import paper_clip_blue from "../../../images/paper_clip_blue.png"
import paper_clip_grey from "../../../images/paper_clip_grey.png"


const rowHeight = 35 //Adjust for global row height
const rowSpacing = 7 //Adjust for global row spacing

const segDivStyle = (data) => {
  return {
    width: ((72 / (data.length)) + "%"),
    height: rowHeight + "px",
    // border: "1px dashed gainsboro",
    float: "left",
    marginBottom: rowSpacing + "px",
    textAlign: "center",
    paddingTop: ((rowHeight - 26) / 2) + "px"
  }
}

class TrafficLightBar extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      infoModal: false,
      infoHeader: null,
      infoContent: null
    }

    this.showInfo = this.showInfo.bind(this)
  }

  showInfo(header, content) {
    this.setState({
      infoHeader: header,
      infoContent: content,
      infoModal: true
    })
  }

  //HEADER//
  headers(goal, data) {
    let headers = []

    if (data) {

      //PREFIX//
      headers.push(
        <div
          key={`head${goal}_pre`}
          style={{ ...segDivStyle(data), width: "10%" }}
        />
      )

      //CONTENT//
      data.forEach(item => {
        headers.push(
          <div
            key={`head${goal}_${item.key}`}
            style={segDivStyle(data)}
          >
            <p
              style={{
                fontSize: "18px",
                fontWeight: "bold"
              }}
            >
              {item.key}
            </p>
          </div>
        )
      })

      //SUFFIX-1//
      headers.push(
        <div
          key={`head${goal}_post0`}
          style={{ ...segDivStyle(data), width: "8%" }}
        />
      )

      //SUFFIX-2//
      headers.push(
        <div
          key={`head${goal}_post2`}
          style={{ ...segDivStyle(data), width: "8%" }}
        />
      )
    }

    return headers
  }

  //SEGMENT|PARTS//
  segments(goal, data, description, explanation) {

    let segments = []

    if (data) {

      //PREFIX//
      segments.push(
        <div
          key={`goal${goal}_pre`}
          style={{ ...segDivStyle(data), width: "10%" }}
        >
          <img
            src={gear}
            style={{
              maxHeight: (rowHeight + "px"),
              maxWidth: "75%",
              marginTop: "-20%",
              marginBottom: "-20%",
              cursor: description ? "pointer" : "default"
            }}
            onClick={() => {
              if (description) this.showInfo("Goal details", description)
            }}
          />
          <sub style={{ fontSize: "17px" }}>
            {goal}
          </sub>
        </div>
      )

      //CONTENT//
      data.forEach(item => {
        segments.push(
          <div
            key={`goal${goal}_${item.key}`}
            style={{
              ...segDivStyle(data),
              backgroundColor: this.backgroundColor(item.value)
            }}
          />
        )
      })

      //SUFFIX-1//
      segments.push(
        <div
          key={`goal${goal}_post1`}
          style={{ ...segDivStyle(data), width: "8%" }}
        >
          <img
            src={traffic_light}
            style={{
              maxHeight: (rowHeight + "px"),
              maxWidth: "85%",
              marginTop: "-21%",
              marginBottom: "-21%",
              cursor: explanation ? "pointer" : "default"
            }}
            onClick={() => {
              if (explanation) this.showInfo("How it is being evaluated", explanation)
            }}
          />
        </div>
      )

      let hasAttachments = data.filter(x => x.attachment !== "").length > 0

      //SUFFIX-2//
      segments.push(
        <div
          key={`goal${goal}_post2`}
          style={{ ...segDivStyle(data), width: "8%" }}
        >
          <img
            src={hasAttachments ? paper_clip_blue : paper_clip_grey}
            style={{
              maxHeight: (rowHeight + "px"),
              maxWidth: "70%",
              marginTop: "-19%",
              marginBottom: "-19%",
              cursor: hasAttachments ? "pointer" : "default"
            }}
            onClick={() => {
              if (hasAttachments) {
                this.showInfo("Download attachments",
                  <span onClick={() => { this.setState({ infoModal: false }) }}>{this.listAttachments(data, goal)}</span>
                )
              }
            }}
          />
        </div>
      )
    }

    return segments
  }

  backgroundColor(value) {
    switch (value) {
      case "R":
        return Red
      case "A":
        return Amber
      case "G":
        return Green
      default:
        return "lightgrey"
    }
  }

  listAttachments(data, goal){


    let linkList = []

    data.forEach(item => {
      if(item.attachment !== ""){
        linkList.push(
          <p key={`${goal}_${item.key}`}><a href={item.attachment}>{item.key}</a></p>
        )
      }
    })

    return linkList
  }

  render() {

    let { data, showHeaders, goal, description, explanation } = this.props
    let { infoModal, infoHeader, infoContent } = this.state

    return (

      <div>
        {showHeaders && this.headers(goal, data)}
        {this.segments(goal, data, description, explanation)}

        <Modal isOpen={infoModal} toggle={() => { this.setState({ infoModal: false }) }} centered >
          <ModalHeader toggle={() => { this.setState({ infoModal: false }) }}>
            {infoHeader}
          </ModalHeader>
          <ModalBody>
            {infoContent}
          </ModalBody>
        </Modal>
      </div>
    )
  }
}

export default TrafficLightBar