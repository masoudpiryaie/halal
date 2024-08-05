import {GridColumn} from '@progress/kendo-react-grid'
import {FormControl, Grid, CheckBoxAction, BtnAction} from '@core/components'
import {useState} from 'react'
import {useIntl} from 'react-intl'
import {FormMode} from '@core/forms'
import {PageTitle, PageActions} from '_metronic/layout/core'
import {useForm} from 'react-hook-form'
import {CompositeFilterDescriptor} from '@progress/kendo-data-query'
import {generateFilter} from '@core/utils'
import {CompanyTypeCreateDialog, CompanyTypeModel} from './CompanyTypeCreateDialog'
import {SearchFunc} from 'app/pages/admin/baseInfo/SearchFunc'
import axios from 'axios'
import {StringSchema} from 'yup'
import {toast} from 'react-toastify'
export interface IModelGr {
  title: string
  field: string
  show: boolean
}
export function CompanyTypePage() {
  const intl = useIntl()
  const API_URL = process.env.REACT_APP_API_URL || 'api'
  const [showDialog, setShowDialog] = useState(false)
  const [mode, setMode] = useState<FormMode>('new')
  const [actionItem, setActionItem] = useState()
  const [refresh, setRefresh] = useState(1)
  const {
    register,
    handleSubmit,
    reset,
    formState: {isDirty},
  } = useForm<CompanyTypeModel>()
  const [filter, setFilter] = useState<CompositeFilterDescriptor>()
  const gr = localStorage.getItem('companyType')

  var col = gr
    ? (JSON.parse(gr) as IModelGr[])
    : [
        {
          title: intl.formatMessage({id: 'Model.CompanyType.TitleFa'}),
          field: 'titleFa',
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
    intl.formatMessage({id: 'Model.CompanyType.TitleFa'}) + '*title-0',
    intl.formatMessage({id: 'Model.CompanyType.IsEnabled'}) + '*isEnabled-1',
  ]
  const ToggleEnable = async (data: number) => {
    let url = API_URL + 'companyType/ToggleEnable/' + data
    try {
      await axios.put(url)
      toast.info(intl.formatMessage({id: 'MENU.ACTIONSuccess'}))
      setRefresh(Math.random())
    } catch (e: any) {
      if (!e.processed) {
        toast.error(intl.formatMessage({id: 'MENU.ACTIONError'}))
      }
    }
  }

  return (
    <>
      <PageTitle breadcrumbs={[]}>
        {intl.formatMessage({id: 'MENU.BaseInfo.CompanyTypeController'})}
      </PageTitle>
      <PageActions>
        <BtnAction onClick={newItem} label={intl.formatMessage({id: 'MENU.NewItem'})} />
      </PageActions>
      {showDialog && (
        <CompanyTypeCreateDialog mode={mode} onClose={handleClose} item={actionItem} />
      )}
      <div className='card card-flush '>
        <div className='card-body'>
          <div className='row'>
            <div className='card card-px-0 mb-2 shadow '>
              <div className='card-body'>
                <form onSubmit={onSubmit} className='row g-3'>
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
                  endpoint={API_URL + 'companyType'}
                  showDel
                  showEdit
                  onAction={hanleActions}
                  filter={filter}
                  columns={col}
                  name='companyType'
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
