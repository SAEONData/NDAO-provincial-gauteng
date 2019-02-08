'use strict'

import React from 'react'
import { Popover, PopoverBody, PopoverHeader, Modal, ModalHeader, ModalBody } from 'mdbreact'
import { DEAGreen, Red, Amber, Green } from '../../config/colours.js'

const _gf = require('../../globalFunctions')

//Images
import info from "../../../images/Icons/info_blue.png"
import traffic_light from "../../../images/Icons/traffic_light_blue.png"
import paper_clip_blue from "../../../images/Icons/paper_clip_blue.png"
import paper_clip_grey from "../../../images/Icons/paper_clip_grey.png"

class TrafficLightBar extends React.Component {

  constructor(props) {
    super(props);

    let rowHeight = this.props.height
    let rowSpacing = 3

    this.state = {
      rowHeight,
      rowSpacing,
      infoModal: false,
      infoHeader: null,
      infoContent: null,

    }

    this.segDivStyle = (data) => {

      let { rowHeight, rowSpacing } = this.state
  
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
          style={{ ...this.segDivStyle(data), width: "10%" }}
        />
      )

      //CONTENT//
      data.forEach(item => {
        headers.push(
          <div
            key={`head${goal}_${item.key}`}
            style={this.segDivStyle(data)}
          >
            <p
              style={{
                fontSize: "18px",
                fontWeight: "bolder"
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
          style={{ ...this.segDivStyle(data), width: "8%" }}
        />
      )

      //SUFFIX-2//
      headers.push(
        <div
          key={`head${goal}_post2`}
          style={{ ...this.segDivStyle(data), width: "8%" }}
        />
      )
    }

    return headers
  }

  //SEGMENT|PARTS//
  segments(goal, data, description, explanation) {

    let { rowHeight } = this.state
    let segments = []

    if (data) {

      //PREFIX//
      segments.push(
        <div
          key={`goal${goal}_pre`}
          style={{ 
            ...this.segDivStyle(data), 
            width: "10%"
          }}
        >
          <img
            src={info}
            style={{
              maxHeight: ((rowHeight - 1) + "px"),
              maxWidth: "75%",
              marginTop: "-20%",
              marginBottom: "-20%",
              cursor: description ? "pointer" : "default"
            }}
            onClick={() => {
              if (description) this.showInfo("Goal details", description)
            }}
          />
          <sub style={{ fontSize: "17px", marginLeft: "2px" }}>
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
              ...this.segDivStyle(data),
              backgroundColor: this.backgroundColor(item.value),
              marginBottom: "-2px",
              marginTop: rowHeight < 35 ? "3px" : "0px",
              borderTop: "1px solid #D8D8D8",
              borderBottom: "1px solid #D8D8D8"
            }}
          />
        )
      })

      //SUFFIX-1//
      segments.push(
        <div
          key={`goal${goal}_post1`}
          style={{ ...this.segDivStyle(data), width: "8%" }}
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
          style={{ ...this.segDivStyle(data), width: "8%" }}
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
        return "#E8E8E8"
    }
  }

  listAttachments(data, goal){


    let linkList = []

    data.forEach(item => {
      if(item.attachment !== ""){

        let fileName = item.attachment.substring(item.attachment.lastIndexOf("/")+1, item.attachment.length)

        linkList.push(
          <p key={`${goal}_${item.key}`}><a href={item.attachment} target="_blank" download={fileName}>{item.key}</a></p>
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

        <Modal isOpen={infoModal} toggle={() => { this.setState({ infoModal: false }) }} fullHeight position="right" >
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