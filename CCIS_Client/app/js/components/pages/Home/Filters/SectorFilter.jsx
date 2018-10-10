import React from 'react'
import { Row, Col } from 'mdbreact'
import TreeSelectInput from '../../../input/TreeSelectInput.jsx';
import { vmsBaseURL } from '../../../../config/serviceURLs.cfg'
import OData from 'react-odata'

const _gf = require('../../../../globalFunctions')


class SectorFilter extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {

    let { value, callback } = this.props

    return (
      <>
        <OData
          baseUrl={vmsBaseURL + `Sectors/Flat`}>
          {({ loading, error, data }) => {

            let sectors = []

            if (loading) {
              sectors = [{ id: 1, text: "Loading...", additionalData: [] }]
            }

            if (error) {
              console.error(error)
            }

            if (data) {
              if (data.items && data.items.length > 0) {
                sectors = data.items
              }
            }

            //Get current value
            if (sectors && sectors.length > 0) {
              let f = sectors.filter(x => x.id == value)
              if (f && f.length > 0 && f[0].value) {
                value = f[0].value
              }
            }

            return (
              <TreeSelectInput
                data={_gf.TransformDataToTree(sectors)}
                allowClear={true}
                value={value}
                callback={(value) => {
                  callback(value.id)
                }}
                placeHolder={"Any Sector"}
              />
            )

          }}
        </OData>
      </>
    )
  }
}

export default SectorFilter