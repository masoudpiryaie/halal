import {GridColumn} from '@progress/kendo-react-grid'
import {FormControl, Grid, CheckBoxAction, BtnAction} from '@core/components'
import {useState} from 'react'
import {useIntl} from 'react-intl'
import {FormMode} from '@core/forms'
import {PageTitle, PageActions, useLayout} from '_metronic/layout/core'
import {useForm} from 'react-hook-form'
import {CompositeFilterDescriptor} from '@progress/kendo-data-query'
import {generateFilter} from '@core/utils'
import {PackagingCreateDialog, PackagingModel} from './PackagingCreateDialog'
import {SearchFunc} from 'app/pages/admin/baseInfo/SearchFunc'
import axios from 'axios'
import {StringSchema} from 'yup'
import {toast} from 'react-toastify'
import {ActiveDialog} from 'app/pages/admin/baseInfo/Component/ActiveDialog'

export interface IModelGr {
  title: string
  field: string
  show: boolean
}
export function PackagingPage() {
  const intl = useIntl()
  const [searchShow, setsearchShow] = useState(true)
  const {config} = useLayout()
  const API_URL = process.env.REACT_APP_API_URLCoding || 'api'
  const [showDialog, setShowDialog] = useState(false)
  const [mode, setMode] = useState<FormMode>('new')
  const [actionItem, setActionItem] = useState()
  const [refresh, setRefresh] = useState(1)
  const [showActiveDialog, setshowActiveDialog] = useState(false)
  const [URLActive, setURLActive] = useState('')
  const [ActiveID, setActiveID] = useState(0)
  const [state, setstate] = useState(false)
  const gr = localStorage.getItem('PackagingGrid')
  const {
    register,
    handleSubmit,
    reset,
    formState: {isDirty},
  } = useForm<PackagingModel>()
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
    intl.formatMessage({id: 'Model.Packaging.TitleFa'}) + '*titleFa-0',
    intl.formatMessage({id: 'Model.Packaging.TitleEn'}) + '*titleEn-0',

    intl.formatMessage({id: 'Model.Packaging.IsEnabled'}) + '*isEnabled-1',
  ]
  var col = gr
    ? (JSON.parse(gr) as IModelGr[])
    : [
        {
          title: intl.formatMessage({id: 'Model.Packaging.TitleFa'}),
          field: 'titleFa',
          show: true,
        },
        {
          title: intl.formatMessage({id: 'Model.Packaging.TitleEn'}),
          field: 'titleEn',
          show: true,
        },
      ]
  const ToggleEnable = async (id: any) => {
    try {
      debugger
      let url = API_URL + 'Packagings/' + id
      const resp = await axios.get(url)
      setstate(resp.data.value.isEnabled)
      setActiveID(id)
      setURLActive(API_URL + 'Packagings/')
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
        {intl.formatMessage({id: 'MENU.BaseInfo.PackagingController'})}
      </PageTitle>

      {showDialog && <PackagingCreateDialog mode={mode} onClose={handleClose} item={actionItem} />}
      {showActiveDialog && (
        <ActiveDialog
          state={state}
          mode={mode}
          ActiveID={ActiveID}
          API_URL={URLActive}
          onClose={handleCloseActive}
        />
      )}
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
                  endpoint={API_URL + 'Packagings/'}
                  showDel
                  showEdit={false}
                  onAction={hanleActions}
                  filter={filter}
                  columns={col}
                  name='PackagingGrid'
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
                          onClick={() => ToggleEnable(props.dataItem.id)}
                        />
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
