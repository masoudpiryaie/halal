import {
  ComboBox as KComboBox,
  ComboBoxProps as KComboBoxProps,
  ComboBoxFilterChangeEvent,
  ComboBoxChangeEvent,
} from '@progress/kendo-react-dropdowns'
import {FilterDescriptor} from '@progress/kendo-data-query'

import axios from 'axios'
import {useState, useEffect, useCallback} from 'react'

interface ComboBoxProps extends KComboBoxProps {
  endpoint: string
  refresh?: number
  selectionChanged?: (selections: any) => void
  preSelectedId?: any
  allFields?: boolean
  getUrl: (endpoint: string, term: string) => string
  class?: string
  textField?: string
  filldata: any[]
}

export function ComboBoxLocaltow(props: ComboBoxProps) {
  const {endpoint, preSelectedId} = props
  const [data, setData] = useState<any[]>([])
  const [ss, setss] = useState<any[]>([])
  const filterChange = (event: ComboBoxFilterChangeEvent) => {
    var ggg = props.filldata
    if (ggg !== undefined) {
      const newList = ggg.filter((el) => el.title.includes(event.filter.value))
      debugger
      setss(newList)
    }
    debugger
  }

  // const fetchData = useCallback(
  //   async function (filter?: FilterDescriptor) {
  //     try {
  //       const term = filter?.field !== undefined ? 'Text=' + filter?.value : filter?.value || ''
  //       const resp = await axios.get(props.getUrl(endpoint, term))
  //       setData(resp.data.value)
  //       debugger
  //     } catch (error) {
  //       console.log(error)
  //     }
  //   },
  //   [endpoint]
  // )

  // useEffect(() => {
  //   debugger
  //   setss(props.ff)
  // }, [])

  return (
    <KComboBox
      className={props.class === undefined ? 'form-control' : ''}
      data={ss.length === 0 ? props.filldata : ss}
      textField='title'
      filterable
      {...props}
      onChange={(e) => {
        if (props.onChange && e.value) {
          let val = e.value
          if (props.allFields) {
            //val = e.value
            val = [e.value]
          }
          props.onChange(val as ComboBoxChangeEvent)
        }
      }}
      //defaultValue={{id: 17, title: 'ccc'}}
      {...(preSelectedId !== undefined && preSelectedId !== null
        ? {defaultValue: preSelectedId}
        : {})}
      onFilterChange={filterChange}
    />
  )
}

ComboBoxLocaltow.defaultProps = {
  allFields: false,
  getUrl: (endpoint: string, term: string) => (term !== '' ? `${endpoint}?${term}` : `${endpoint}`),
}
