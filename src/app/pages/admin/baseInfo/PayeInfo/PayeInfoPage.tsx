import {GridColumn} from '@progress/kendo-react-grid'
import {FormControl, Grid, CheckBoxAction, BtnAction} from '@core/components'
import {useState} from 'react'
import {useIntl} from 'react-intl'
import {FormMode} from '@core/forms'
import {PageTitle, PageActions, useLayout} from '_metronic/layout/core'
import {useForm} from 'react-hook-form'
import {CompositeFilterDescriptor} from '@progress/kendo-data-query'
import {generateFilter} from '@core/utils'
import {PayeInfoCreateDialog, PayeInfoModel} from './PayeInfoCreateDialog'
import {PayeInfoActiveHistoryDialog} from './PayeInfoActiveHistoryDialog'
import {PayeInfoStCreateDialog} from './PayeInfoStCreateDialog'
import {ServiceCodeListDialog} from './ServiceCodeListDialog'
import {PayeInfoCuCreateDialog} from './PayeInfoCuCreateDialog'
import {PayeInfoActiveCreateDialog, ActivePayeInfoModel} from './PayeInfoActiveCreateDialog'
import {SearchFunc} from 'app/pages/admin/baseInfo/SearchFunc'
import axios from 'axios'
import {StringSchema} from 'yup'
import {toast} from 'react-toastify'
import clsx from 'clsx'
export interface IModelGr {
  title: string
  field: string
  show: boolean
}
export function PayeInfoPage() {
  const intl = useIntl()
  const {config} = useLayout()
  const [tab, setTab] = useState('Header')
  const [searchShow, setsearchShow] = useState(true)
  const API_URL = process.env.REACT_APP_API_URLCoding || 'api'
  const [showDialog, setShowDialog] = useState(false)
  const [mode, setMode] = useState<FormMode>('new')
  const [actionItem, setActionItem] = useState()
  const [refresh, setRefresh] = useState(1)
  const [showActiveTreeDialog, setshowActiveTreeDialog] = useState(false)
  const [showActiveHistoryDialog, setshowActiveHistoryDialog] = useState(false)
  const [state, setstate] = useState(false)
  const [ID, setID] = useState(0)
  const [showStDialog, setShowStDialog] = useState(false)
  const [showCuDialog, setshowCuDialog] = useState(false)
  const [showServiceCodeListDialog, setshowServiceCodeListDialog] = useState(false)
  const [refreshst, setrefreshst] = useState(1)
  const [refreshcu, setrefreshcu] = useState(1)

  const {
    register,
    handleSubmit,
    reset,
    formState: {isDirty},
  } = useForm<PayeInfoModel>()
  const [filter, setFilter] = useState<CompositeFilterDescriptor>()
  const gr = localStorage.getItem('payeInfo')
  var col = gr
    ? (JSON.parse(gr) as IModelGr[])
    : [
        {
          title: intl.formatMessage({id: 'Model.PayeInfo.KeyCode'}),
          field: 'keyCode',
          show: true,
        },
        {
          title: intl.formatMessage({id: 'Model.PayeInfo.ComBaseNameFa'}),
          field: 'comBaseNameFa',
          show: true,
        },
        {
          title: intl.formatMessage({id: 'Model.PayeInfo.ComBaseNameEn'}),
          field: 'comBaseNameEn',
          show: true,
        },
      ]
  const grStandard = localStorage.getItem('StandardGrid')
  var colStandard = grStandard
    ? (JSON.parse(grStandard) as IModelGr[])
    : [
        {
          title: 'عنوان',
          field: 'title',
          show: true,
        },
        {
          title: 'توضیحات',
          field: 'description',
          show: true,
        },
      ]
  const onSubmit = handleSubmit(async (data) => {
    setFilter({logic: 'and', filters: inputList})
  })
  const resetSearch = () => {
    reset()
    setFilter(undefined)
  }
  const handleClose = () => {
    setShowDialog(false)
    setRefresh(Math.random())
  }
  const handleCloseActiveHistory = () => {
    setshowActiveHistoryDialog(false)
  }
  const newItem = () => {
    setMode('new')
    setShowDialog(true)
  }
  const hanleActions = (action: string, item: any) => {
    if (action === 'edit') {
      setActionItem(item)
      setMode('edit')
      setShowDialog(true)
    }
    if (action === 'changeState') {
      ToggleEnable(item.id)
    }
    if (action === 'history') {
      showHistory(item.id)
    }
    if (action === 'otherList') {
      handleOpenServiceCodeListDialog(item.id)
    }
  }

  const [inputList, setInputList] = useState([
    {field: 'comBaseNameFa', value: '', operator: 'eq', type: '0'},
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
      setInputList([...inputList, {field: 'comBaseNameFa', value: '', operator: 'eq', type: '0'}])
  }
  const searchItems = ['نام پایه*comBaseNameFa-0', 'کد*keyCode-0']
  const ToggleEnable = async (id: number) => {
    try {
      debugger
      let url = API_URL + 'Breaks/' + id
      const resp = await axios.get(url)
      setstate(resp.data.value.isEnabled)
      setID(id)
      setshowActiveTreeDialog(true)
    } catch (error) {
      console.log(error)
    }
  }
  const handleCloseActiveTree = () => {
    setshowActiveTreeDialog(false)
    setRefresh(Math.random())
  }
  const showHistory = (id: number) => {
    setID(id)
    setshowActiveHistoryDialog(true)
  }
  const newItemPayeInfoStandardServices = () => {
    setShowStDialog(true)
    setrefreshst(Math.random())
    debugger
  }
  const clickRowBreaks = (item: any) => {
    setID(item.dataItem.id)
    setrefreshst(Math.random())
    setrefreshcu(Math.random())
  }
  const handleCloseStDialog = () => {
    setShowStDialog(false)
  }
  const handleOpenServiceCodeListDialog = (id: number) => {
    setID(id)
    setshowServiceCodeListDialog(true)
  }
  const handleCloseServiceCodeListDialog = () => {
    setshowServiceCodeListDialog(false)
  }
  const newItemPayeInfoCountingUnits = () => {
    setshowCuDialog(true)
    setrefreshcu(Math.random())
  }
  const handleCloseCuDialog = () => {
    setshowCuDialog(false)
  }

  return (
    <>
      <PageTitle breadcrumbs={[]}>
        {intl.formatMessage({id: 'MENU.BaseInfo.PayeInfoController'})}
      </PageTitle>
      {showDialog && <PayeInfoCreateDialog mode={mode} onClose={handleClose} item={actionItem} />}

      {showActiveTreeDialog && (
        <PayeInfoActiveCreateDialog
          state={state}
          mode={mode}
          ID={ID}
          onClose={handleCloseActiveTree}
        />
      )}
      {showActiveHistoryDialog && (
        <PayeInfoActiveHistoryDialog mode={mode} ID={ID} onClose={handleCloseActiveHistory} />
      )}
      {showStDialog && <PayeInfoStCreateDialog mode={mode} ID={ID} onClose={handleCloseStDialog} />}
      {showServiceCodeListDialog && (
        <ServiceCodeListDialog mode={mode} ID={ID} onClose={handleCloseServiceCodeListDialog} />
      )}
      {showCuDialog && <PayeInfoCuCreateDialog mode={mode} ID={ID} onClose={handleCloseCuDialog} />}

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
                <BtnAction onClick={newItem} label={intl.formatMessage({id: 'MENU.NewItem'})} />

                <Grid
                  style={{
                    height: '300px',
                  }}
                  refresh={refresh}
                  endpoint={API_URL + 'ServicePayehInfo/'} //{API_URL + 'payeInfo'}
                  showDel
                  showEdit
                  onAction={hanleActions}
                  filter={filter}
                  columns={col}
                  name='payeInfo'
                  showChangeState={true}
                  showHistory={true}
                  showOtherList={true}
                  onRowClick={clickRowBreaks}
                >
                  <GridColumn
                    filterable={false}
                    title='فعال/غیر فعال'
                    field='isEnabled'
                    filter='boolean'
                    cell={(props) => (
                      <td>
                        <label>{!props.dataItem.isEnabled ? 'غیر فعال' : 'فعال'}</label>
                      </td>
                    )}
                  />
                </Grid>
              </div>
            </div>
          </div>
          <div className='card card-custom'>
            <div className='card-header card-header-stretch overflow-auto'>
              <ul
                className='nav nav-stretch nav-line-tabs fw-bold border-transparent flex-nowrap'
                role='tablist'
              >
                <li className='nav-item'>
                  <a
                    className={clsx(`nav-link`, {active: tab === 'Header'})}
                    onClick={() => setTab('Header')}
                    role='tab'
                    style={{fontFamily: config.main?.font}}
                  >
                    شرح های استاندارد
                  </a>
                </li>

                <li className='nav-item'>
                  <a
                    className={clsx(`nav-link`, {active: tab === 'Aside'})}
                    onClick={() => setTab('Aside')}
                    role='tab'
                    style={{fontFamily: config.main?.font}}
                  >
                    واحد شمارش
                  </a>
                </li>
              </ul>
            </div>
            <div className='card-body'>
              <div className='tab-content pt-3'>
                <div className={clsx('tab-pane', {active: tab === 'Header'})}>
                  {' '}
                  <BtnAction
                    onClick={newItemPayeInfoStandardServices}
                    label={intl.formatMessage({id: 'MENU.NewItem'})}
                  />
                  <Grid
                    style={{
                      height: '300px',
                    }}
                    refresh={refreshst}
                    endpoint={API_URL + 'PayeInfoStandardServices'}
                    showActions={false}
                    onAction={hanleActions}
                    filter={filter}
                    columns={colStandard}
                    name='StandardGrid'
                    exteraParam={'&PayeInfoId=' + ID}
                  ></Grid>{' '}
                </div>

                <div className={clsx('tab-pane', {active: tab === 'Aside'})}>
                  <BtnAction
                    onClick={newItemPayeInfoCountingUnits}
                    label={intl.formatMessage({id: 'MENU.NewItem'})}
                  />
                  <Grid
                    style={{
                      height: '300px',
                    }}
                    refresh={refreshcu}
                    endpoint={API_URL + 'ServicePayehInfo/GetCountingUnits'}
                    onAction={hanleActions}
                    filter={filter}
                    columns={colStandard}
                    name='CountingUnitsGrid'
                    showActions={false}
                    exteraParam={'&PayeInfoId=' + ID}
                  ></Grid>{' '}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
