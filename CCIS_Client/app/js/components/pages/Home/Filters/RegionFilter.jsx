import React from 'react'
import { Row, Col } from 'mdbreact'
import TreeSelectInput from '../../../input/TreeSelectInput.jsx';
import { vmsBaseURL } from '../../../../config/serviceURLs.cfg'
import OData from 'react-odata'

const _gf = require('../../../../globalFunctions')


class RegionFilter extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {

    let { value, callback } = this.props

    return (
      <>
        <OData
          baseUrl={vmsBaseURL + `Regions/Flat`}>
          {({ loading, error, data }) => {

            let regions = []

            if (loading) {
              regions = [{ id: 1, text: "Loading...", additionalData: [] }]
            }

            if (error) {
              console.error(error)
            }

            if (data) {
              if (data.items && data.items.length > 0) {
                regions = data.items
              }
            }

            //Get current value
            if (regions && regions.length > 0) {
              let f = regions.filter(x => x.id == value)
              if (f && f.length > 0 && f[0].value) {
                value = f[0].value
              }
            }

            return (
              <TreeSelectInput
                data={_gf.TransformDataToTree(regions)}
                allowClear={true}
                value={value}
                callback={(value) => {
                  callback(value.id)
                }}
                placeHolder={"National"}
              />
            )

          }}
        </OData>
      </>
    )
  }
}

export default RegionFilter