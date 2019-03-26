import React from 'react'
import SelectInput from '../../../input/SelectInput.jsx';


class SectorFilter extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {

    let { value, callback } = this.props

    const data = [
      { id: 1, text: "Goal-1: Plans, policy and actions" },
      { id: 2, text: "Goal-2: Resources, capacity and processes" },
      { id: 3, text: "Goal-3: Accurate climate information" },
      { id: 4, text: "Goal-4: Development, education and awareness programmes" },
      { id: 5, text: "Goal-5: New and adapted technologies" },
      { id: 6, text: "Goal-6: Risks, impacts and vulnerabilities" },
      { id: 7, text: "Goal-7: Evidence of reduced risk and vulnerability" },
      { id: 8, text: "Goal-8: Land use, population demographics and natural resources" },
      { id: 9, text: "Goal-9: Secure food, water and energy supply" },
    ]

    //Get current value
    let f = data.filter(x => x.id == value)
    if (f && f.length > 0 && f[0].text) {
      value = f[0].text
    }

    if(value === 0) value = undefined

    return (
      <>
        <SelectInput
          placeHolder="Goal  (Any)"
          value={value}
          data={data}
          callback={(value) => {
            callback(value.id)
          }}
          allowClear={false}
        />
      </>
    )
  }
}

export default SectorFilter