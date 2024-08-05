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
}

export function ComboBox(props: ComboBoxProps) {
  const {endpoint, preSelectedId} = props
  const API_URL = process.env.REACT_APP_API_URL || 'api'
  const [data, setData] = useState<any[]>([])

  const filterChange = (event: ComboBoxFilterChangeEvent) => {
    // console.log(toDataSourceRequestString({filter: normalizeFilters(event.filter)}))
    fetchData(event.filter)
  }

  const fetchData = useCallback(
    async function (filter?: FilterDescriptor) {
      try {
        //debugger
        if (endpoint !== API_URL + 'Citys/Search') {
          const term = filter?.field !== undefined ? 'Text=' + filter?.value : filter?.value || ''
          const resp = await axios.get(props.getUrl(endpoint, term))
          setData(resp.data.value)
        }
        //debugger
      } catch (error) {
        console.log(error)
      }
    },
    [endpoint]
  )

  useEffect(() => {
    //debugger
    if (preSelectedId) {
      fetchData({value: `Id=${preSelectedId}`} as FilterDescriptor)
    } else {
      fetchData()
    }
  }, [fetchData, preSelectedId])

  return (
    <KComboBox
      className={props.class === undefined ? 'form-control' : ''}
      data={data}
      textField='title'
      filterable
      {...props}
      onChange={(e) => {
        if (props.onChange && e.value) {
          let val = e.value.id
          if (props.allFields) {
            //val = e.value
            val = [e.value.id]
          }
          props.onChange(val as ComboBoxChangeEvent)
        }
      }}
      {...(preSelectedId !== undefined && preSelectedId !== null ? {defaultValue: data[0]} : {})}
      onFilterChange={filterChange}
    />
  )
}

ComboBox.defaultProps = {
  allFields: false,
  getUrl: (endpoint: string, term: string) => (term !== '' ? `${endpoint}?${term}` : `${endpoint}`),
}
