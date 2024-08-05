import React, {useState, useEffect, useCallback} from 'react'
import {
  CompositeFilterDescriptor,
  State,
  toDataSourceRequestString,
  translateDataSourceResultGroups,
} from '@progress/kendo-data-query'
import {
  Grid as KGrid,
  GridDataStateChangeEvent,
  GridProps as KGridProps,
  getSelectedState,
  GridSelectionChangeEvent,
  GridHeaderSelectionChangeEvent,
  GridColumn,
  GridCellProps,
  GridRowProps,
} from '@progress/kendo-react-grid'
import {getter} from '@progress/kendo-react-common'
import {Dialog, DialogActionsBar} from '@progress/kendo-react-dialogs'
import axios from 'axios'
import {KTSVG, toAbsoluteUrl} from '_metronic/helpers'
import {toast} from 'react-toastify'
import {useIntl} from 'react-intl'
import {Row} from 'react-bootstrap-v5'
import {GridPDFExport} from '@progress/kendo-react-pdf'
const DATA_ITEM_KEY: string = 'id'
const SELECTED_FIELD: string = 'selected'
const idGetter = getter(DATA_ITEM_KEY)
type SelectionMode = 'single' | 'multiple'

interface GridProps extends KGridProps {
  endpoint: string
  filter?: CompositeFilterDescriptor
}

export function GridPrint(gridProps: GridProps) {
  const intl = useIntl()
  const {endpoint, filter} = gridProps
  const [dataState, setDataState] = useState<State>({skip: 0, take: 10})
  const [total, setTotal] = useState(0)
  const [data, setData] = React.useState<any[]>([])
  const [selectedState, setSelectedState] = React.useState<{
    [id: string]: boolean | number[]
  }>({})

  const fetchData = useCallback(async () => {
    const queryStr = `${toDataSourceRequestString(dataState)}` // Serialize the state.
    const hasGroups = dataState.group && dataState.group.length
    try {
      const resp = await axios.get(`${endpoint}?${queryStr}`)
      const {data, total} = resp.data
      setData(hasGroups ? translateDataSourceResultGroups(data) : data)
      setTotal(total)
    } catch (error) {}
  }, [dataState, endpoint])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  useEffect(() => {
    setDataState({...dataState, filter})
  }, [filter])

  var _pdfExport: any = {}
  const exportPDF = () => {
    _pdfExport.save()
  }
  return (
    <div dir='rtl' className='k-rtl'>
      {/* <button
        className='btn btn-icon btn-bg-light btn-active-color-success btn-sm me-1'
        onClick={exportPDF}
      >
        <i className='fas fa-print'></i>
      </button> */}
      <GridPDFExport
        ref={(element) => {
          _pdfExport = element
        }}
      >
        <img src={'/media/avatars/150-2.jpg'} />
        <KGrid
          data={data.map((item) => ({
            ...item,
            [SELECTED_FIELD]: selectedState[idGetter(item)],
          }))}
          style={{
            height: '400px',
          }}
          {...gridProps}
        ></KGrid>
      </GridPDFExport>
    </div>
  )
}

GridPrint.defaultProps = {selectionMode: 'single', showActions: true}
