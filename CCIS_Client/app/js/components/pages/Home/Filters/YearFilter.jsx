import React from 'react'
import { Row, Col } from 'mdbreact'

//Ant.D
import Slider from 'antd/lib/slider'
import 'antd/lib/slider/style/css'

class YearFilter extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {

    let { value, callback } = this.props
    let currentYear = (new Date()).getFullYear()

    return (
      <>
        <div style={{ border: "1px solid gainsboro", padding: "0px 10px 0px 10px", borderRadius: "5px", backgroundColor: "white" }}>

          <table>
            <tbody>
              <tr>
                <td>
                  <span style={{ color: "silver", fontSize: "15px" }}>Year:</span>
                </td>
                <td width="100%">
                  <Slider
                    min={currentYear - 5}
                    max={currentYear}
                    defaultValue={value}
                    style={{ marginLeft: "7px", marginRight: "7px", marginTop: "9px", marginBottom: "11px", height: 6 }}
                    onAfterChange={(value) => { callback(value) }}
                  />
                </td>
                <td>
                  <span style={{ color: "#81BFE2", fontSize: "17px", fontWeight: "bold"}}>&nbsp;{value}&nbsp;</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

      </>
    )
  }
}

export default YearFilter