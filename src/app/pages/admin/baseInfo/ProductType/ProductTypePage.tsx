import {GridColumn} from '@progress/kendo-react-grid'
import {FormControl, Grid, Uploader} from '@core/components'
import React, {useState, useCallback} from 'react'
import {useIntl} from 'react-intl'
import {FormMode} from '@core/forms'
import {PageTitle, PageActions} from '_metronic/layout/core'
import {useForm} from 'react-hook-form'
import {CompositeFilterDescriptor} from '@progress/kendo-data-query'
import {generateFilter} from '@core/utils'
import {ProductTypeCreateDialog, ProductTypeModel} from './ProductTypeCreateDialog'
import {SearchFunc} from 'app/pages/admin/baseInfo/SearchFunc'
import {SearchLayout, GridLayout, PageLayout} from '@core/layout'

export function ProductTypePage() {
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
  } = useForm<ProductTypeModel>()
  const [filter, setFilter] = useState<CompositeFilterDescriptor>()

  const onSubmit = handleSubmit(async (data) => {
    setFilter({logic: 'and', filters: inputList.filter((part) => part.value !== '')})
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
  const handleComboChange = (e: any, index: any) => {
    const list = [...inputList]
    list[index].value = e
    setInputList(list)
  }
  const searchItems = [
    intl.formatMessage({id: 'Model.ProductType.Name'}) + '*name-0',
    intl.formatMessage({id: 'Model.ProductType.LatinName'}) + '*latinName-0',
    intl.formatMessage({id: 'Model.ProductType.Code'}) + '*code-0',
    intl.formatMessage({id: 'Model.ProductType.IsActive'}) + '*isActive-1',
    intl.formatMessage({id: 'Model.ProductType.ProductGroupName'}) + '*productGroupId-2',
  ]
  return (
    <>
      <PageTitle breadcrumbs={[]}>
        {intl.formatMessage({id: 'MENU.BaseInfo.ProductTypeController'})}
      </PageTitle>
      <PageActions>
        <button type='button' className='btn btn-sm btn-primary' onClick={newItem}>
          {intl.formatMessage({id: 'MENU.NewItem'})}
        </button>
      </PageActions>
      {showDialog && (
        <ProductTypeCreateDialog mode={mode} onClose={handleClose} item={actionItem} />
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
            style={{
              height: '300px',
            }}
            refresh={refresh}
            endpoint='productType'
            showActions
            onAction={hanleActions}
            filter={filter}
            resizable
          >
            <GridColumn field='name' title={intl.formatMessage({id: 'Model.ProductType.Name'})} />
            <GridColumn
              field='latinName'
              title={intl.formatMessage({id: 'Model.ProductType.LatinName'})}
            />
            <GridColumn field='code' title={intl.formatMessage({id: 'Model.ProductType.Code'})} />
            <GridColumn
              field='productGroupName'
              title={intl.formatMessage({id: 'Model.ProductType.ProductGroupName'})}
            />
            <GridColumn
              title={intl.formatMessage({id: 'Model.ProductType.IsActive'})}
              field='isActive'
              filter='boolean'
              cell={(props) => (
                <td>
                  <input
                    className='form-check-input w-20px h-20px'
                    disabled={true}
                    type='checkbox'
                    checked={props.dataItem[props.field || '']}
                  />
                </td>
              )}
            />
          </Grid>
        </GridLayout>
      </PageLayout>
    </>
  )
}
