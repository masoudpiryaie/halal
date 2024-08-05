import React, {useEffect, useState} from 'react'
import {GridColumn} from '@progress/kendo-react-grid'
import {Dialog} from '@progress/kendo-react-dialogs'
import {defaultPageTitles, FormMode} from '@core/forms'
import axios from 'axios'
import {toast} from 'react-toastify'
import {FieldError, useForm} from 'react-hook-form'
import {FormControl, BtnAction, Grid} from '@core/components'
import {useIntl} from 'react-intl'
import clsx from 'clsx'
import SVG from 'react-inlinesvg'
import {SearchFunc} from 'app/pages/admin/baseInfo/SearchFunc'
import {left} from '@popperjs/core'
import {CompositeFilterDescriptor} from '@progress/kendo-data-query'
type PropsType = {
  ID: number
  onClose: () => void
  selectRecord: (i: number, name: string) => void
}
export interface IModelGr {
  title: string
  field: string
  show: boolean
}
export type FieldsModel = {
  id?: number
  titleFa: string
  titleEn: string
  isEnabled: boolean
}
const pageTitles = defaultPageTitles

export function ServicePrefix({ID, onClose, selectRecord}: PropsType) {
  const intl = useIntl()
  const API_URL = process.env.REACT_APP_API_URLCoding || 'api'
  const [tab, setTab] = useState('Header')
  const [items, setItems] = React.useState<Array<any>>([])
  const [selecteddata, setSelecteddata] = useState(0)
  const gr = localStorage.getItem('GS1Prefixes')
  const [filter, setFilter] = useState<CompositeFilterDescriptor>()
  const searchItems = [
    intl.formatMessage({id: 'Model.PayeInfo.BaseNameFa'}) + '*keyCode-0',
    intl.formatMessage({id: 'Model.PayeInfo.BaseNameEn'}) + '*baseNameEn-0',
    intl.formatMessage({id: 'Model.PayeInfo.ComBaseNameFa'}) + '*comBaseNameFa-0',
    intl.formatMessage({id: 'Model.PayeInfo.ComBaseNameEn'}) + '*comBaseNameEn-0',
    intl.formatMessage({id: 'Model.Activities.IsEnabled'}) + '*isEnabled-1',
  ]
  const [inputList, setInputList] = useState([
    {field: 'keyCode', value: '', operator: 'eq', type: '0'},
  ])
  var col = gr
    ? (JSON.parse(gr) as IModelGr[])
    : [
        {
          title: 'پیش شماره',
          field: 'keyCode',
          show: true,
        },
        {
          title: 'تعداد کاراکتر ',
          field: 'length',
          show: true,
        },
        {
          title: 'تعداد کد های مجاز ',
          field: 'allowedCount',
          show: true,
        },
        {
          title: 'کدهای رزرو ',
          field: 'srvReservedCount',
          show: true,
        },
        {
          title: 'کدهای استفاده شده ',
          field: 'srvUsedCount',
          show: true,
        },
      ]
  const {
    register,
    handleSubmit,
    reset,
    formState: {errors, isDirty, touchedFields},
  } = useForm<FieldsModel>({mode: 'all'})

  useEffect(() => {}, [])

  const onSubmit = handleSubmit(async (data) => {
    debugger
    setFilter({logic: 'and', filters: inputList})
  })

  const clickRowGrid = (event: any) => {
    debugger
    setSelecteddata(event.dataItem.id)
  }
  const handleRemoveClick = (index: any) => {
    if (inputList.length !== 1) {
      const list = [...inputList]
      list.splice(index, 1)
      setInputList(list)
    }
  }
  const handleInputChange = (e: any, index: any) => {
    const {name, value} = e.target
    const list = [...inputList]
    if (name === 'field') {
      list[index].field = value.split('-')[0]
      list[index].type = value.split('-')[1]
    } else if (name === 'operator') list[index].operator = value
    else list[index].value = value
    setInputList(list)
  }
  const resetSearch = () => {
    reset()
    setFilter(undefined)
  }
  const handleAddClick = () => {
    if (inputList.filter((x) => x.value === '').length === 0)
      setInputList([...inputList, {field: 'keyCode', value: '', operator: 'eq', type: '0'}])
  }
  return (
    <div>
      <Dialog title={'پیش شماره شرکتی  '} onClose={onClose} style={{zIndex: 10004}}>
        <div>
          {/* <div className='card card-px-0 mb-2 shadow '>
            <div className='card-body'>
              <form id='dialog-form' onSubmit={onSubmit} className='row g-3'>
                {inputList.map((x, i) => (
                  <SearchFunc
                    x={x}
                    i={i}
                    SearchModel={searchItems}
                    handleRemoveClick={() => handleRemoveClick(i)}
                    handleAddClick={() => handleAddClick()}
                    handleInputChange={(e) => handleInputChange(e, i)}
                  ></SearchFunc>
                ))}
                <div className='col d-flex flex-row-reverse'>
                  <BtnAction onClick={resetSearch} label=' پاک کردن' />
                  <BtnAction onClick={onSubmit} label='جستجو' />
                </div>
              </form>
            </div>
          </div> */}
          <div className='card-body'>
            <div className='tab-content pt-3'>
              <div>
                <div className='row mb-10'>
                  <div className='col-12'>
                    <Grid
                      style={{
                        height: '300px',
                      }}
                      endpoint={API_URL + 'ServicePrefix/GetUserActiveItems'}
                      columns={col}
                      name='prifixGrid'
                      showActions={false}
                      onRowClick={clickRowGrid}
                      filter={filter}
                      exteraParam={'&IsForService=true'}
                    >
                      <GridColumn
                        filterable={false}
                        title='-'
                        field='ID'
                        cell={(props) => (
                          <td>
                            <BtnAction
                              label='انتخاب'
                              onClick={() =>
                                selectRecord(props.dataItem.id, props.dataItem.keyCode)
                              }
                              className='btn btn-sm align-self-start me-2'
                            ></BtnAction>
                          </td>
                        )}
                      />
                    </Grid>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div style={{float: left}}>
          {' '}
          <button className='k-button' onClick={onClose}>
            {intl.formatMessage({id: 'MENU.RETURN'})}
          </button>
        </div>
      </Dialog>
    </div>
  )
}
