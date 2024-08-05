import {GridColumn} from '@progress/kendo-react-grid'
import {FormControl, Grid, CheckBoxAction, BtnAction} from '@core/components'
import {useState} from 'react'
import {useIntl} from 'react-intl'
import {FormMode} from '@core/forms'
import {PageTitle, PageActions, useLayout} from '_metronic/layout/core'
import {useForm} from 'react-hook-form'
import {CompositeFilterDescriptor} from '@progress/kendo-data-query'
import {generateFilter} from '@core/utils'
import {SearchFunc} from 'app/pages/admin/baseInfo/SearchFunc'
import {ActiveDialog} from 'app/pages/admin/baseInfo/Component/ActiveDialog'
import axios from 'axios'
import {StringSchema} from 'yup'
import {toast} from 'react-toastify'
import {ReferDialog} from './ReferDialog'
export interface IModelGr {
  title: string
  field: string
  show: boolean
}
export type serviceModel = {
  id?: number
}
export function ShowServiceCodePage() {
  const intl = useIntl()
  const [searchShow, setsearchShow] = useState(true)
  const {config} = useLayout()
  const API_URL = process.env.REACT_APP_API_URLCoding || 'api'
  const [showDialog, setShowDialog] = useState(false)
  const [mode, setMode] = useState<FormMode>('new')
  const [actionItem, setActionItem] = useState()
  const [refresh, setRefresh] = useState(1)
  const [showReferDialog, setshowReferDialog] = useState(false)

  const gr = localStorage.getItem('ShowServiceGrid')

  const {
    register,
    handleSubmit,
    reset,
    formState: {isDirty},
  } = useForm<serviceModel>()
  const [filter, setFilter] = useState<CompositeFilterDescriptor>()

  const onSubmit = handleSubmit(async (data) => {
    setFilter({logic: 'and', filters: inputList})
  })
  const resetSearch = () => {
    reset()
    setFilter(undefined)
  }

  const hanleActions = (action: string, item: any) => {
    if (action === 'edit') {
      setActionItem(item)
      setMode('edit')
      setShowDialog(true)
    }
  }

  const [inputList, setInputList] = useState([
    {field: 'code', value: '', operator: 'eq', type: '0'},
  ])

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
  const handleRemoveClick = (index: any) => {
    if (inputList.length !== 1) {
      const list = [...inputList]
      list.splice(index, 1)
      setInputList(list)
    }
  }

  const handleAddClick = () => {
    if (inputList.filter((x) => x.value === '').length === 0)
      setInputList([...inputList, {field: 'code', value: '', operator: 'eq', type: '0'}])
  }
  const searchItems = [
    'کد*code-0',
    'تاریخ از*dateFrom-3',
    'تا تاریخ *dateTo-3',
    'موضوع*subject-0',
    'وضعیت*isEnabled-1',
  ]
  var col = gr
    ? (JSON.parse(gr) as IModelGr[])
    : [
        {
          title: 'کد',
          field: 'code',
          show: true,
        },
        {
          title: 'نمایندگی',
          field: 'agentName',
          show: true,
        },
        {
          title: 'نام عضو',
          field: 'memberName',
          show: true,
        },
        {
          title: 'پیش شماره شرکتی',
          field: 'prefixCode',
          show: true,
        },
        {
          title: 'طبقه بندی',
          field: 'cartableStatusTitle',
          show: true,
        },
        {
          title: 'نام پایه ',
          field: 'payeInfoTitle',
          show: true,
        },
        {
          title: 'موضوع',
          field: 'subject',
          show: true,
        },
      ]
  const handleDatePicker = (e: any, index: any) => {
    debugger
    const list = [...inputList]
    list[index].value =
      e.value.getUTCFullYear() + '-' + (e.value.getMonth() + 1) + '-' + e.value.getDate()
    setInputList(list)
  }
  const [referID, setreferID] = useState(0)
  const Refer = (id: any) => {
    setshowReferDialog(true)
    setreferID(id)
  }
  const handleCloseReferDialog = () => {
    setshowReferDialog(false)
  }
  return (
    <>
      <PageTitle breadcrumbs={[]}>
        {intl.formatMessage({id: 'MENU.BaseInfo.ShowServiceCodeController'})}
      </PageTitle>
      {showReferDialog && <ReferDialog id={referID} onClose={handleCloseReferDialog} />}
      <div className='card card-flush '>
        <div className='card-body'>
          <div className='row'>
            <div
              style={{
                backgroundColor: config.main?.primaryColor,
                padding: '1rem 1rem',
                borderRadius: '0.475rem',
                color: '#e4e6ef',
                cursor: 'pointer',
                fontFamily: config.main?.font,
              }}
              onClick={() => setsearchShow(false)}
              hidden={!searchShow}
            >
              نمایش پنل جستجو
            </div>
            <div
              style={{
                backgroundColor: config.main?.primaryColor,
                padding: '1rem 1rem',
                borderTopRightRadius: '0.475rem',
                borderTopLeftRadius: '0.475rem',
                color: '#e4e6ef',
                cursor: 'pointer',
                fontFamily: config.main?.font,
              }}
              onClick={() => setsearchShow(true)}
              hidden={searchShow}
            >
              <label> بستن پنل جستجو</label>
            </div>
            <form
              style={{
                borderBottomLeftRadius: '0.475rem',
                borderBottomRightRadius: '0.475rem',
                paddingBottom: '5px',
              }}
              onSubmit={onSubmit}
              className='card-px-0 mb-2 shadow row g-0'
            >
              <div hidden={searchShow}>
                {inputList.map((x, i) => (
                  <SearchFunc
                    x={x}
                    i={i}
                    SearchModel={searchItems}
                    handleRemoveClick={() => handleRemoveClick(i)}
                    handleAddClick={() => handleAddClick()}
                    handleInputChange={(e) => handleInputChange(e, i)}
                    handleDatePicker={(e) => handleDatePicker(e, i)}
                  ></SearchFunc>
                ))}
                <div style={{marginTop: '-10px'}} className='col d-flex flex-row-reverse'>
                  <BtnAction onClick={resetSearch} label=' پاک کردن' />
                  <BtnAction onClick={onSubmit} label='جستجو' />
                </div>
              </div>
            </form>
          </div>
          <div className='row'>
            <div className='card card-px-0 shadow'>
              <div className='card-body'>
                <Grid
                  style={{
                    height: '300px',
                  }}
                  refresh={refresh}
                  endpoint={API_URL + 'ServiceCodeCartable/'}
                  showActions={false}
                  onAction={hanleActions}
                  filter={filter}
                  columns={col}
                  name='ShowServiceGrid'
                  exteraParam='&StatusId=11' // to do
                >
                  <GridColumn
                    filterable={false}
                    title='-'
                    field='ID'
                    cell={(props) => (
                      <td>
                        <BtnAction
                          label='ارجاع'
                          onClick={() => Refer(props.dataItem.id)}
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
    </>
  )
}
