import {GridColumn} from '@progress/kendo-react-grid'
import {FormControl, Grid, CheckBoxAction, BtnAction} from '@core/components'
import {useState} from 'react'
import {useIntl} from 'react-intl'
import {FormMode} from '@core/forms'
import {PageTitle, PageActions, useLayout} from '_metronic/layout/core'
import {useForm} from 'react-hook-form'
import {CompositeFilterDescriptor} from '@progress/kendo-data-query'
import {generateFilter} from '@core/utils'
import {FieldsCreateDialog, FieldsModel} from './FieldsCreateDialog'
import {SearchFunc} from 'app/pages/admin/baseInfo/SearchFunc'
import axios from 'axios'
import {StringSchema} from 'yup'
import {toast} from 'react-toastify'
export interface IModelGr {
  title: string
  field: string
  show: boolean
}
export function FieldsPage() {
  const intl = useIntl()
  const [searchShow, setsearchShow] = useState(true)
  const {config} = useLayout()
  const API_URL = process.env.REACT_APP_API_URLCoding || 'api'
  const [showDialog, setShowDialog] = useState(false)
  const [mode, setMode] = useState<FormMode>('new')
  const [actionItem, setActionItem] = useState()
  const [refresh, setRefresh] = useState(1)
  const {
    register,
    handleSubmit,
    reset,
    formState: {isDirty},
  } = useForm<FieldsModel>()
  const [filter, setFilter] = useState<CompositeFilterDescriptor>()
  const gr = localStorage.getItem('fields')
  var col = gr
    ? (JSON.parse(gr) as IModelGr[])
    : [
        {
          title: intl.formatMessage({id: 'Model.Fields.TitleFa'}),
          field: 'titleFa',
          show: true,
        },
        {
          title: intl.formatMessage({id: 'Model.Fields.TitleEn'}),
          field: 'titleEn',
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
  }

  const [inputList, setInputList] = useState([
    {field: 'titleFa', value: '', operator: 'eq', type: '0'},
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
      setInputList([...inputList, {field: 'titleFa', value: '', operator: 'eq', type: '0'}])
  }
  const searchItems = [
    intl.formatMessage({id: 'Model.Fields.TitleFa'}) + '*titleFa-0',
    intl.formatMessage({id: 'Model.Fields.IsEnabled'}) + '*isEnabled-1',
  ]
  const ToggleEnable = async (data: number) => {
    let url = API_URL + 'ActivityField/ToggleEnable/' + data
    try {
      await axios.post(url)

      toast.info(intl.formatMessage({id: 'MENU.ACTIONSuccess'}), {
        position: 'top-center',
      })
      setRefresh(Math.random())
    } catch (e: any) {
      if (!e.processed) {
        toast.error(intl.formatMessage({id: 'MENU.ACTIONError'}), {
          position: 'top-center',
        })
      }
    }
  }

  return (
    <>
      <PageTitle breadcrumbs={[]}>
        {intl.formatMessage({id: 'MENU.BaseInfo.FieldsController'})}
      </PageTitle>

      {showDialog && <FieldsCreateDialog mode={mode} onClose={handleClose} item={actionItem} />}
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
                  endpoint={API_URL + 'ActivityField/'}
                  showDel
                  showEdit
                  onAction={hanleActions}
                  filter={filter}
                  columns={col}
                  showChangeState={true}
                  name='fields'
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
        </div>
      </div>
    </>
  )
}
