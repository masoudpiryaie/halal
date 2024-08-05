import {GridColumn} from '@progress/kendo-react-grid'
import {FormControl, Grid, Uploader} from '@core/components'
import {useState} from 'react'
import {useIntl} from 'react-intl'
import {FormMode} from '@core/forms'
import {PageTitle, PageActions} from '_metronic/layout/core'
import {useForm} from 'react-hook-form'
import {CompositeFilterDescriptor} from '@progress/kendo-data-query'
import {generateFilter} from '@core/utils'
import {BankCreateDialog, BankModel} from './BankCreateDialog'
import {SearchFunc} from 'app/pages/admin/baseInfo/SearchFunc'
import axios from 'axios'
import {StringSchema} from 'yup'

function base64toBlob(base64Data: string, contentType: string) {
  contentType = contentType || ''
  var sliceSize = 1024
  var byteCharacters = atob(base64Data)
  var bytesLength = byteCharacters.length
  var slicesCount = Math.ceil(bytesLength / sliceSize)
  var byteArrays = new Array(slicesCount)

  for (var sliceIndex = 0; sliceIndex < slicesCount; ++sliceIndex) {
    var begin = sliceIndex * sliceSize
    var end = Math.min(begin + sliceSize, bytesLength)

    var bytes = new Array(end - begin)
    for (var offset = begin, i = 0; offset < end; ++i, ++offset) {
      bytes[i] = byteCharacters[offset].charCodeAt(0)
    }
    byteArrays[sliceIndex] = new Uint8Array(bytes)
  }
  return new Blob(byteArrays, {type: contentType})
}

export function BankPage() {
  const intl = useIntl()
  const [showDialog, setShowDialog] = useState(false)
  const [mode, setMode] = useState<FormMode>('new')
  const [actionItem, setActionItem] = useState()
  const [refresh, setRefresh] = useState(1)
  const {
    register,
    handleSubmit,
    reset,
    formState: {isDirty},
  } = useForm<BankModel>()
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
  const handleRemoveClick = (index: any) => {
    const list = [...inputList]
    list.splice(index, 1)
    setInputList(list)
  }

  const handleAddClick = () => {
    if (inputList.filter((x) => x.value === '').length === 0)
      setInputList([...inputList, {field: 'name', value: '', operator: 'eq', type: '0'}])
  }
  const searchItems = [
    intl.formatMessage({id: 'Model.Bank.Name'}) + '*name-0',
    intl.formatMessage({id: 'Model.Bank.IsActive'}) + '*isActive-1',
  ]
  async function print() {
    try {
      let response = await axios.post('bank/print/' + 1)
      let fileBlob = base64toBlob(response.data.fileContents, response.data.contentType)

      const url = window.URL.createObjectURL(new Blob([fileBlob]))
      const link = document.createElement('a')
      link.href = url
      link.setAttribute('download', `FileName.pdf`)

      document.body.appendChild(link)

      link.click()

      link.parentNode?.removeChild(link)
    } catch (e) {}
  }
  return (
    <>
      <PageTitle breadcrumbs={[]}>
        {intl.formatMessage({id: 'MENU.BaseInfo.BankController'})}
      </PageTitle>
      <PageActions>
        <button type='button' className='btn btn-sm btn-primary' onClick={newItem}>
          {intl.formatMessage({id: 'MENU.NewItem'})}
        </button>
        <button type='button' className='btn btn-sm btn-primary' onClick={print}>
          print
        </button>
      </PageActions>
      {showDialog && <BankCreateDialog mode={mode} onClose={handleClose} item={actionItem} />}
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
                  endpoint='bank'
                  showActions
                  onAction={hanleActions}
                  filter={filter}
                >
                  <GridColumn field='name' title={intl.formatMessage({id: 'Model.Bank.Name'})} />
                  <GridColumn
                    field='isActive'
                    title={intl.formatMessage({id: 'Model.Bank.IsActive'})}
                    filter='boolean'
                    width='100'
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
