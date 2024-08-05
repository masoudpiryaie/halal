import {GridColumn} from '@progress/kendo-react-grid'
import {FormControl, Grid, BtnAction, CheckBoxAction} from '@core/components'
import {useState} from 'react'
import {useIntl} from 'react-intl'
import {FormMode} from '@core/forms'
import {PageTitle, PageActions} from '_metronic/layout/core'
import {useForm} from 'react-hook-form'
import {CompositeFilterDescriptor} from '@progress/kendo-data-query'
import {generateFilter} from '@core/utils'
import {Tanazor1CreateDialog, BreakPayeInfoModel} from './Tanazor1CreateDialog'
import {SearchFunc} from 'app/pages/admin/baseInfo/SearchFunc'
import {GetChangeStatusHistoryDialog} from 'app/pages/admin/baseInfo/Component/GetChangeStatusHistoryDialog'
import {ActiveDialog} from 'app/pages/admin/baseInfo/Component/ActiveDialog'
import axios from 'axios'
import {StringSchema} from 'yup'
export interface IModelGr {
  title: string
  field: string
  show: boolean
}
export function Tanazor1Page() {
  const intl = useIntl()
  const API_URL = process.env.REACT_APP_API_URLCoding || 'api'
  const [showDialog, setShowDialog] = useState(false)
  const [mode, setMode] = useState<FormMode>('new')
  const [actionItem, setActionItem] = useState()
  const [refresh, setRefresh] = useState(1)
  const [showGetChangeStatusHistoryDialog, setshowGetChangeStatusHistoryDialog] = useState(false)
  const gr = localStorage.getItem('BreakPayeInfoGrid')
  const [showActiveDialog, setshowActiveDialog] = useState(false)
  const [URLActive, setURLActive] = useState('')
  const [ActiveID, setActiveID] = useState(0)
  const [state, setstate] = useState(false)
  const [ID, setID] = useState(0)
  const {
    register,
    handleSubmit,
    reset,
    formState: {isDirty},
  } = useForm<BreakPayeInfoModel>()
  const [filter, setFilter] = useState<CompositeFilterDescriptor>()

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
  }

  const [inputList, setInputList] = useState([
    {field: 'title', value: '', operator: 'eq', type: '0'},
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
      setInputList([...inputList, {field: 'title', value: '', operator: 'eq', type: '0'}])
  }
  const searchItems = [
    intl.formatMessage({id: 'Model.Units.TitleFa'}) + '*title-0',
    intl.formatMessage({id: 'Model.Units.IsDefaultRight'}) + '*isDefaultRight-1',
  ]
  const HistoryGrid = (id: any) => {
    setID(id)
    setshowGetChangeStatusHistoryDialog(true)
  }
  const handleCloseGetChangeStatusHistory = () => {
    setshowGetChangeStatusHistoryDialog(false)
  }
  var col = gr
    ? (JSON.parse(gr) as IModelGr[])
    : [
        {
          title: intl.formatMessage({id: 'Model.PayeInfo.ComBaseNameFa'}),
          field: 'breakComBaseNameFa',
          show: true,
        },
        {
          title: intl.formatMessage({id: 'Model.PayeInfo.ComBaseNameEn'}),
          field: 'breakComBaseNameEn',
          show: true,
        },
        {
          title: intl.formatMessage({id: 'Model.PayeInfo.ComBaseNameEn'}),
          field: 'headLineComBaseNameFa',
          show: true,
        },
        {
          title: intl.formatMessage({id: 'Model.PayeInfo.ComBaseNameEn'}),
          field: 'headLineComBaseNameEn',
          show: true,
        },
      ]
  const PayeInfosActive = async (id: any) => {
    try {
      debugger
      let url = API_URL + 'BreakPayeInfos/' + id
      const resp = await axios.get(url)
      setstate(resp.data.value.isEnabled)
      setActiveID(id)
      setURLActive(API_URL + 'BreakPayeInfos/')
      setshowActiveDialog(true)
    } catch (error) {
      console.log(error)
    }
  }
  const handleCloseActive = () => {
    setshowActiveDialog(false)
    setRefresh(Math.random())
  }

  return (
    <>
      <PageTitle breadcrumbs={[]}>
        {intl.formatMessage({id: 'MENU.BaseInfo.Tanazor1Controller'})}
      </PageTitle>
      <PageActions>
        <BtnAction onClick={newItem} label={intl.formatMessage({id: 'MENU.NewItem'})} />
      </PageActions>
      {showDialog && <Tanazor1CreateDialog mode={mode} onClose={handleClose} item={actionItem} />}
      {showActiveDialog && (
        <ActiveDialog
          state={state}
          mode={mode}
          ActiveID={ActiveID}
          API_URL={URLActive}
          onClose={handleCloseActive}
        />
      )}

      {showGetChangeStatusHistoryDialog && (
        <GetChangeStatusHistoryDialog
          ID={ID}
          mode={mode}
          onClose={handleCloseGetChangeStatusHistory}
          api='BreakPayeInfos'
        />
      )}
      <div className='card card-flush '>
        <div className='card-body'>
          <div className='row'>
            <div className='card card-px-0 mb-2 shadow '>
              <div className='card-body'>
                {/* <form onSubmit={onSubmit} className='row g-3'>
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
                    <button
                      className='btn btn-sm btn-secondary me-2 mb-2'
                      type='button'
                      onClick={resetSearch}
                    >
                      پاک کردن
                    </button>
                    <button className='btn btn-sm btn-secondary me-2 mb-2' type='submit'>
                      جستجو
                    </button>
                  </div>
                </form> */}
              </div>
            </div>
          </div>
          <div className='row'>
            <div className='card card-px-0 shadow'>
              <div className='card-body'>
                <Grid
                  style={{
                    height: '300px',
                  }}
                  refresh={refresh}
                  endpoint={API_URL + 'BreakPayeInfos'}
                  showDel
                  showEdit
                  onAction={hanleActions}
                  filter={filter}
                  columns={col}
                  name='BreakPayeInfoGrid'
                >
                  <GridColumn
                    filterable={false}
                    title='فعال/غیر فعال'
                    field='isEnabled'
                    filter='boolean'
                    cell={(props) => (
                      <td>
                        <CheckBoxAction
                          checked={props.dataItem[props.field || '']}
                          className=''
                          claim=''
                          onClick={() => PayeInfosActive(props.dataItem.id)}
                        />
                      </td>
                    )}
                  />
                  <GridColumn
                    filterable={false}
                    title='تاریخچه'
                    field='ID'
                    cell={(props) => (
                      <td>
                        <BtnAction onClick={() => HistoryGrid(props.dataItem.id)} label='تاریخچه' />
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
