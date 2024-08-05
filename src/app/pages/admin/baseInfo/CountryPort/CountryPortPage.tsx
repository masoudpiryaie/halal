import {GridColumn} from '@progress/kendo-react-grid'
import {FormControl, Grid, BtnAction} from '@core/components'
import {SearchLayout, GridLayout, PageLayout} from '@core/layout'
import {useState} from 'react'
import {useIntl} from 'react-intl'
import {FormMode} from '@core/forms'
import {PageTitle, PageActions} from '_metronic/layout/core'
import {useForm} from 'react-hook-form'
import {CompositeFilterDescriptor} from '@progress/kendo-data-query'
import {generateFilter} from '@core/utils'
import {CountryPortModel, CountryPortCreateDialog} from './CountryPortCreateDialog'
import axios from 'axios'
import {toast} from 'react-toastify'
import {SearchFunc} from 'app/pages/admin/baseInfo/SearchFunc'
import {download} from '@core/components/download'

export function CountryPortPage() {
  const intl = useIntl()
  const [showDialog, setShowDialog] = useState(false)
  const [mode, setMode] = useState<FormMode>('new')
  const [actionItem, setActionItem] = useState()
  const [refresh, setRefresh] = useState(1)
  const [selectedItem, setSelectedItem] = useState<{id: number}>()
  const {
    register,
    handleSubmit,
    reset,
    formState: {isDirty},
  } = useForm<CountryPortModel>()
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

  const selectionChanged = (selection: any[]) => {
    console.log(selection)
    setSelectedItem(selection[0])
  }
  async function doActive() {
    try {
      let url = 'countryPort/activate/' + selectedItem?.id
      await axios.post(url)
      toast.info(intl.formatMessage({id: 'MENU.ACTIONSuccess'}))
    } catch (e) {
      toast.error(intl.formatMessage({id: 'MENU.ACTIONError'}))
    }
  }
  const [inputList, setInputList] = useState([
    {field: 'name', value: '', operator: 'eq', type: '0'},
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
  const handleComboChange = (e: any, index: any) => {
    const list = [...inputList]
    list[index].value = e
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
      setInputList([...inputList, {field: 'name', value: '', operator: 'eq', type: '0'}])
  }
  const searchItems = [
    intl.formatMessage({id: 'Model.CountryPort.Name'}) + '*name-0',
    intl.formatMessage({id: 'Model.CountryPort.IsActive'}) + '*isActive-1',
    intl.formatMessage({id: 'Model.CountryPort.Country'}) + '*countryId-2',
    intl.formatMessage({id: 'Model.CountryPort.State'}) + '*stateId-2',
  ]

  function print() {
    selectedItem !== undefined
      ? download('countryPort/print/' + selectedItem?.id)
      : alert('لطفا یک سطر را انتخاب کنید')
  }
  return (
    <>
      <PageTitle breadcrumbs={[]}>
        {intl.formatMessage({id: 'MENU.BaseInfo.CountryPortController'})}
      </PageTitle>
      <PageActions>
        {/* <BtnAction label='جدید' onClick={newItem} /> */}
        <button type='button' className='btn btn-sm btn-primary' onClick={newItem}>
          {intl.formatMessage({id: 'MENU.NewItem'})}
        </button>
        <button type='button' className='btn btn-sm btn-primary' onClick={print}>
          print
        </button>
        <BtnAction claim='AuthService.Users.Full' label='Active' onClick={doActive} />
      </PageActions>
      {showDialog && (
        <CountryPortCreateDialog mode={mode} onClose={handleClose} item={actionItem} />
      )}
      <PageLayout>
        <SearchLayout onSubmit={onSubmit} onReset={resetSearch}>
          {inputList.map((x, i) => (
            <SearchFunc
              x={x}
              i={i}
              SearchModel={searchItems}
              handleRemoveClick={() => handleRemoveClick(i)}
              handleAddClick={() => handleAddClick()}
              handleInputChange={(e) => handleInputChange(e, i)}
              handleComboChange={(e) => handleComboChange(e, i)}
            ></SearchFunc>
          ))}
        </SearchLayout>
        <GridLayout>
          <Grid
            refresh={refresh}
            resizable
            selectionChanged={selectionChanged}
            endpoint='countryPort'
            onAction={hanleActions}
            filter={filter}
          >
            <GridColumn field='id' title='شناسه' filterable={false} width='70' />
            <GridColumn field='name' title='نام' />
            <GridColumn field='countryName' title='کشور' />
            <GridColumn field='stateName' title='استان' />
            <GridColumn field='isActive' title='وضعیت' filter='boolean' width='100' />
          </Grid>
        </GridLayout>
      </PageLayout>
    </>
  )
}
