import {GridColumn} from '@progress/kendo-react-grid'
import {FormControl, Grid, Uploader} from '@core/components'
import {useState} from 'react'
import {useIntl} from 'react-intl'
import {FormMode} from '@core/forms'
import {PageTitle, PageActions} from '_metronic/layout/core'
import {useForm} from 'react-hook-form'
import {CompositeFilterDescriptor} from '@progress/kendo-data-query'
import {generateFilter} from '@core/utils'
import {PropertiesCreateDialog, PropertiesModel} from './PropertiesCreateDialog'
import {SearchFunc} from 'app/pages/admin/baseInfo/SearchFunc'
import axios from 'axios'
import {StringSchema} from 'yup'

export function PropertiesPage() {
  const intl = useIntl()
  const API_URLCoding = process.env.REACT_APP_API_URLCoding || 'api'
  const [showDialog, setShowDialog] = useState(false)
  const [mode, setMode] = useState<FormMode>('new')
  const [actionItem, setActionItem] = useState()
  const [refresh, setRefresh] = useState(1)
  const {
    register,
    handleSubmit,
    reset,
    formState: {isDirty},
  } = useForm<PropertiesModel>()
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
    intl.formatMessage({id: 'Model.BaseNames.TitleFa'}) + '*title-0',
    intl.formatMessage({id: 'Model.BaseNames.IsEnabled'}) + '*isEnabled-1',
  ]

  return (
    <>
      <PageTitle breadcrumbs={[]}>
        {intl.formatMessage({id: 'MENU.BaseInfo.PropertiesController'})}
      </PageTitle>
      <PageActions>
        <button type='button' className='btn btn-sm btn-primary' onClick={newItem}>
          {intl.formatMessage({id: 'MENU.NewItem'})}
        </button>
      </PageActions>
      {showDialog && <PropertiesCreateDialog mode={mode} onClose={handleClose} item={actionItem} />}
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
                  endpoint={API_URLCoding + 'properties'}
                  showActions
                  onAction={hanleActions}
                  filter={filter}
                >
                  <GridColumn
                    field='titleFa'
                    title={intl.formatMessage({id: 'Model.Properties.TitleFa'})}
                  />
                  <GridColumn
                    field='titleEn'
                    title={intl.formatMessage({id: 'Model.Properties.TitleEn'})}
                  />
                  <GridColumn
                    field='symbol'
                    title={intl.formatMessage({id: 'Model.Properties.Symbol'})}
                  />
                  <GridColumn
                    field='code'
                    title={intl.formatMessage({id: 'Model.Properties.Code'})}
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
