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
  GridColumnMenuItemContent,
} from '@progress/kendo-react-grid'
import ReactDOM from 'react-dom'
import {getter} from '@progress/kendo-react-common'
import {Dialog, DialogActionsBar} from '@progress/kendo-react-dialogs'
import axios from 'axios'
import {KTSVG} from '_metronic/helpers'
import {toast} from 'react-toastify'
import {useIntl} from 'react-intl'
import {Row} from 'react-bootstrap-v5'
import {ExcelExport} from '@progress/kendo-react-excel-export'
import {GridPDFExport} from '@progress/kendo-react-pdf'
import {GridPrint} from './GridPrint'
import {truncate} from 'fs'
import {useLayout} from '_metronic/layout/core'
const DATA_ITEM_KEY: string = 'id'
const SELECTED_FIELD: string = 'selected'
const idGetter = getter(DATA_ITEM_KEY)
type SelectionMode = 'single' | 'multiple'
export interface IModelGr {
  title: string
  field: string
  show: boolean
  cell?: boolean
}
interface GridProps extends KGridProps {
  endpoint: string
  showActions?: boolean
  refresh?: number
  children?: any /// JSX.Element[]
  selectionMode?: SelectionMode
  selectionChanged?: (selections: any) => void
  onAction?: (action: string, item: any) => void
  filter?: CompositeFilterDescriptor
  showDel?: boolean
  showEdit?: boolean
  showHistory?: boolean
  showOtherList?: boolean
  showChangeState?: boolean
  filterPar?: string
  columns?: IModelGr[]
  name?: string
  exteraParam?: string
  Calcolumn?: boolean
}

export function Grid(gridProps: GridProps) {
  const intl = useIntl()
  const {config} = useLayout()
  const {
    endpoint,
    selectionChanged,
    refresh,
    showActions,
    filter,
    showDel,
    showEdit,
    showHistory,
    showOtherList,
    showChangeState,
    filterPar,
    columns,
    name,
    exteraParam,
    Calcolumn,
  } = gridProps
  const [dataState, setDataState] = useState<State>({skip: 0, take: 10})
  const [total, setTotal] = useState(0)
  const [data, setData] = React.useState<any[]>([])
  const [selectedState, setSelectedState] = React.useState<{
    [id: string]: boolean | number[]
  }>({})
  const [font, setFont] = useState('')
  const fetchData = useCallback(async () => {
    const queryStr = `${toDataSourceRequestString(dataState)}` // Serialize the state.
    const hasGroups = dataState.group && dataState.group.length
    try {
      // const resp = await axios.get(`${endpoint}?${queryStr}`)
      var fil = queryStr
        .replace('filter', '')
        .replace('pageSize', 'pageLength')
        .replace('&=', '&')
        .replaceAll('eq', '=')
        .replaceAll("'", '')
        .replaceAll('and', '&')
        .replaceAll('(', '')
        .replaceAll(')', '')
        .replaceAll('~', '')
      if (filterPar !== undefined) fil = fil + filterPar
      if (exteraParam !== undefined) fil = fil + exteraParam

      const resp = await axios.get(`${endpoint}?${fil}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })

      const {data, total} = resp.data

      if (Calcolumn) {
        const newList = resp.data.value.items.map((column: any, idx: number) => {
          return {
            ...column,
            remaining: column.allowedCount - column.gtinUsedCount - column.gtinReservedCount,
          }
        })
        setData(newList)
      } else setData(resp.data.value.items)

      setTotal(total)
    } catch (error) {
      console.log(error, refresh)
    }
  }, [dataState, endpoint, refresh])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  useEffect(() => {
    setDataState({...dataState, filter})
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filter])

  useEffect(() => {
    var allrows = document.body.querySelectorAll(`.k-master-row`)

    if (allrows !== null) {
      for (var i = 0; i < allrows.length; i++) {
        var div = allrows[i]
        div.setAttribute('style', 'background-color:#ffffff')
      }
    }
    var Oddrows = document.body.querySelectorAll(`.k-grid .k-alt`)
    if (Oddrows !== null) {
      for (var i = 0; i < Oddrows.length; i++) {
        var div = Oddrows[i]
        div.setAttribute('style', 'background-color:' + config.main?.primaryColor + '21')
      }
    }

    if (config.main?.font === 'B Ziba') setFont('B-Ziba')
    else if (config.main?.font === 'IRANSansX') setFont('IRANSansX')
    else if (config.main?.font === 'tahoma') setFont('tahoma')
    else if (config.main?.font === 'B Titr') setFont('B-Titr')
    else if (config.main?.font === 'B Shadi') setFont('B-Shadi')
    if (selectionChanged) {
      const selected: any[] = []
      for (const key in selectedState) {
        if (selectedState[key] && Object.prototype.hasOwnProperty.call(selectedState, key)) {
          // eslint-disable-next-line eqeqeq
          const element = data.filter((d) => d[DATA_ITEM_KEY] == key)
          if (element.length === 1) selected.push(element[0])
        }
      }
      selectionChanged(selected)
    }
  }, [data, selectedState, selectionChanged])

  const handleDataStateChange = (changeEvent: GridDataStateChangeEvent) => {
    setDataState(changeEvent.dataState)
  }

  const handleSelectionChange = React.useCallback(
    (event: GridSelectionChangeEvent) => {
      const newSelectedState = getSelectedState({
        event,
        selectedState: selectedState,
        dataItemKey: DATA_ITEM_KEY,
      })
      setSelectedState(newSelectedState)
    },
    [selectedState]
  )

  const handleHeaderSelectionChange = React.useCallback((event: GridHeaderSelectionChangeEvent) => {
    const checkboxElement: any = event.syntheticEvent.target
    const checked = checkboxElement.checked
    const newSelectedState: any = {}

    event.dataItems.forEach((item) => {
      newSelectedState[idGetter(item)] = checked
    })
    setSelectedState(newSelectedState)
  }, [])

  const [deleteConfirm, setDeleteConfirm] = useState(false)
  const [recordIdToDelelete, setRecordIdToDelelete] = useState(0)
  const showDeleteRecord = (item: any) => {
    setDeleteConfirm(true)
    setRecordIdToDelelete(item.id)
  }
  async function deleteRecord() {
    try {
      setDeleteConfirm(false)
      await axios.delete(`${endpoint}${recordIdToDelelete}`, {
        //await axios.delete(`${endpoint.replace('GetList', '') + 'Delete/'}${recordIdToDelelete}`, {
        // headers: {
        //   Authorization: `Bearer ${localStorage.getItem('token')}`,  fghp
        // },
      })

      toast.info(intl.formatMessage({id: 'MENU.ACTIONSuccess'}), {
        position: 'top-center',
      })
      fetchData()
    } catch (e: any) {
      var str = decodeURIComponent(e.response.data.Errors)
      // toast.error(str, {
      //   position: 'top-center',
      // })
    }
  }
  const renderActions = () => (
    <GridColumn
      field='id'
      title={intl.formatMessage({id: 'MENU.ACTIONS'})}
      width='130'
      filterable={false}
      cell={(props: GridCellProps) => {
        return (
          <td>
            {showChangeState && (
              <button
                onClick={() =>
                  gridProps.onAction && gridProps.onAction('changeState', props.dataItem)
                }
                style={{
                  border: 'none',
                  background: 'none',
                }}
                className='btn btn-icon btn-color-info '
              >
                <KTSVG path='/media/icons/duotune/general/gen019.svg' className='svg-icon-3' />
              </button>
            )}
            {showHistory && (
              <button
                onClick={() => gridProps.onAction && gridProps.onAction('history', props.dataItem)}
                style={{
                  border: 'none',
                  background: 'none',
                  marginRight: '5px',
                }}
                className='btn btn-icon btn-color-info '
              >
                <KTSVG path='/media/icons/duotune/coding/cod002.svg' className='svg-icon-3' />
              </button>
            )}
            {showOtherList && (
              <button
                onClick={() =>
                  gridProps.onAction && gridProps.onAction('otherList', props.dataItem)
                }
                style={{
                  border: 'none',
                  background: 'none',
                  marginRight: '5px',
                }}
                className='btn btn-icon btn-color-success '
              >
                <KTSVG path='/media/icons/duotune/coding/cod002.svg' className='svg-icon-3' />
              </button>
            )}
            {showEdit && (
              <button
                onClick={() => gridProps.onAction && gridProps.onAction('edit', props.dataItem)}
                style={{
                  border: 'none',
                  background: 'none',
                  marginRight: '5px',
                }}
                className='btn btn-icon btn-color-primary '
              >
                <KTSVG path='/media/icons/duotune/art/art005.svg' className='svg-icon-3' />
              </button>
            )}
            {showDel && (
              <button
                onClick={() => showDeleteRecord(props.dataItem)}
                style={{
                  border: 'none',
                  background: 'none',
                  marginRight: '5px',
                }}
                className='btn btn-icon btn-color-danger '
              >
                <KTSVG path='/media/icons/duotune/general/gen027.svg' className='svg-icon-3' />
              </button>
            )}
          </td>
        )
      }}
    ></GridColumn>
  )
  const exportExcel = () => {
    _export.save()
  }

  var _export: any = {}
  var _pdfExport: any = {}

  const exportPDF = () => {
    _pdfExport.save()
  }

  const [mystate, setmyState] = useState(columns)
  const onToggleColumn = (id: number) => {
    // columns = columns.map((column: any, idx: number) => {
    //   return idx === id ? {...column, show: false} : column
    // })
    if (mystate != null) {
      const temp = mystate.map((column: any, idx: number) => {
        return idx === id ? {...column, show: !column.show} : column
      })
      setmyState(temp)
    }
  }
  const save = (event: any) => {
    if (name !== undefined) localStorage.setItem(name, JSON.stringify(mystate))

    // if (event) {
    //   event.preventDefault()
    // }
    //this.props.onColumnsSubmit(columns)
    // if (this.props.onCloseMenu) {
    //onCloseMenu()
    //}
  }

  return (
    <div dir='rtl' className='k-rtl'>
      {/* <div  dir={intl.formatMessage({id: 'SETTING.DIR'})}
       className={intl.formatMessage({id: 'SETTING.DIRCLLASS'})}
     > */}
      {deleteConfirm && (
        <Dialog
          title={intl.formatMessage({id: 'MENU.DELETE'})}
          onClose={() => setDeleteConfirm(false)}
        >
          <DialogActionsBar>
            <button className='k-button' onClick={() => setDeleteConfirm(false)}>
              {intl.formatMessage({id: 'MENU.NO'})}
            </button>
            <button className='k-button' onClick={deleteRecord}>
              {intl.formatMessage({id: 'MENU.YES'})}
            </button>
          </DialogActionsBar>
          <p style={{margin: '25px', textAlign: 'center'}}>
            {intl.formatMessage({id: 'MENU.DODELETE'})}
          </p>
        </Dialog>
      )}
      {
        // <button fghp
        //   onClick={exportExcel}
        //   className='btn btn-icon btn-bg-light btn-active-color-success btn-sm me-1'
        // >
        //   <i className='fas fa-file-excel'></i>
        // </button>
      }
      {/* <button className='k-button k-primary' onClick={exportPDF}>
        Export to PDF
      </button> */}
      <ExcelExport
        data={data}
        ref={(exporter) => {
          _export = exporter
        }}
      >
        <KGrid
          resizable={true}
          filterable={false}
          sortable={true}
          pageable={{pageSizes: true}}
          total={total}
          skip={dataState.skip}
          pageSize={dataState.take}
          sort={dataState.sort}
          dataItemKey={DATA_ITEM_KEY}
          selectedField={SELECTED_FIELD}
          selectable={{
            enabled: true,
            drag: false,
            cell: false,
            mode: gridProps.selectionMode || 'single',
          }}
          // headerCellRender={(props) => {
          //   return (
          //     <>
          //       {props}
          //       <input type='checkBox' onClick={(e: any) => show(props, e)}></input>
          //     </>
          //   )
          // }}
          data={data.map((item) => ({
            ...item,
            [SELECTED_FIELD]: selectedState[idGetter(item)],
          }))}
          rowRender={gridProps.rowRender}
          style={{
            height: '60vh',
            fontFamily: config.main?.font,
          }}
          className={font}
          {...gridProps}
          filter={dataState.filter}
          onDataStateChange={handleDataStateChange}
          onSelectionChange={handleSelectionChange}
          onHeaderSelectionChange={handleHeaderSelectionChange}
        >
          {/* <GridColumn
            field='id'
            filter={'numeric'}
            headerCell={(props) => {
              return (
                <>
                  {props.field}
                  <input type='checkBox' onClick={() => alert('d')}></input>
                </>
              )
            }}
          /> */}
          {mystate != null &&
            mystate.map(
              (column, idx) =>
                column.show &&
                (column.cell === true ? (
                  <GridColumn
                    key={idx}
                    field={column.field}
                    title={column.title}
                    cell={(props) => (
                      <td>
                        {props.dataItem[props.field || '']}
                        <input
                          className='form-check-input w-20px h-20px'
                          disabled={true}
                          type='checkbox'
                          style={{backgroundColor: config.main?.primaryColor, color: '#e4e6ef'}}
                          checked={props.dataItem[props.field || '']}
                        />
                      </td>
                    )}
                    columnMenu={(gridProps) => (
                      <GridColumnMenuItemContent show={true}>
                        {/* show={state.columnsExpanded} */}
                        <div className={'k-column-list-wrapper'}>
                          <div className={'k-column-list'}>
                            {mystate.map((column, idx) => (
                              <div key={idx} className={'k-column-list-item'}>
                                <span>
                                  <input
                                    id={idx.toString()}
                                    className='k-checkbox k-checkbox-md k-rounded-md'
                                    type='checkbox'
                                    //readOnly={true}
                                    //disabled={column.show}
                                    style={{
                                      backgroundColor: config.main?.primaryColor,
                                      color: '#e4e6ef',
                                    }}
                                    checked={column.show}
                                    onClick={() => {
                                      onToggleColumn(idx)
                                    }}
                                  />
                                  <label
                                    htmlFor={idx.toString()}
                                    className='k-checkbox-label'
                                    style={{userSelect: 'none', fontFamily: config.main?.font}}
                                  >
                                    {column.title}
                                  </label>
                                </span>
                              </div>
                            ))}
                          </div>
                          <div className={'k-actions k-hstack k-justify-content-stretch'}>
                            <button
                              onClick={save}
                              className={'k-button k-button-md k-rounded-md k-button-solid '}
                            >
                              ذخیره
                            </button>
                          </div>
                        </div>
                      </GridColumnMenuItemContent>
                    )}
                  />
                ) : (
                  <GridColumn
                    key={idx}
                    field={column.field}
                    title={column.title}
                    className='gridFont'
                    columnMenu={(gridProps) => (
                      <GridColumnMenuItemContent show={true}>
                        {/* show={state.columnsExpanded} */}
                        <div className={'k-column-list-wrapper'}>
                          <div className={'k-column-list'}>
                            {mystate.map((column, idx) => (
                              <div
                                key={idx}
                                style={{fontFamily: config.main?.font}}
                                className={'k-column-list-item'}
                              >
                                <span>
                                  <input
                                    id={idx.toString()}
                                    className='k-checkbox k-checkbox-md k-rounded-md'
                                    type='checkbox'
                                    //readOnly={true}
                                    //disabled={column.show}
                                    style={{
                                      backgroundColor: config.main?.primaryColor,
                                      color: '#e4e6ef',
                                    }}
                                    checked={column.show}
                                    onClick={() => {
                                      onToggleColumn(idx)
                                    }}
                                  />
                                  <label
                                    htmlFor={idx.toString()}
                                    className='k-checkbox-label'
                                    style={{userSelect: 'none', fontFamily: config.main?.font}}
                                  >
                                    {column.title}
                                  </label>
                                </span>
                              </div>
                            ))}
                          </div>
                          <div className={'k-actions k-hstack k-justify-content-stretch'}>
                            <button
                              onClick={save}
                              style={{fontFamily: config.main?.font}}
                              className={
                                'k-button k-button-md k-rounded-md k-button-solid k-button-solid-primary'
                              }
                            >
                              ذخیره
                            </button>
                          </div>
                        </div>
                      </GridColumnMenuItemContent>
                    )}
                  />
                ))
            )}

          {gridProps.selectionMode === 'multiple' && (
            <GridColumn
              field={SELECTED_FIELD}
              filterable={false}
              width='50px'
              headerSelectionValue={data.findIndex((item) => !selectedState[idGetter(item)]) === -1}
            />
          )}

          {gridProps.children}

          {showActions && renderActions()}
        </KGrid>
      </ExcelExport>

      {/* <GridPDFExport
        ref={(element) => {
          _pdfExport = element
        }}
      >
        <KGrid
          data={data.map((item) => ({
            ...item,
            [SELECTED_FIELD]: selectedState[idGetter(item)],
          }))}
          style={{
            height: '400px',
          }}
          {...gridProps}
        >
          {gridProps.children}
        </KGrid>
      </GridPDFExport> */}
      {/* <GridPrint endpoint='embark' filter={filter}></GridPrint> */}
    </div>
  )
}

Grid.defaultProps = {selectionMode: 'single', showActions: true}
