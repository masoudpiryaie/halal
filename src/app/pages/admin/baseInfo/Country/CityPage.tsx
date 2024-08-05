import {GridColumn} from '@progress/kendo-react-grid'
import {FormControl, Grid, ComboBox} from '@core/components'
import {SearchLayout, GridLayout, PageLayout} from '@core/layout'
import {useState} from 'react'
import {useIntl} from 'react-intl'
import {FormMode} from '@core/forms'
import {PageTitle, PageActions} from '_metronic/layout/core'
import {Controller, useForm} from 'react-hook-form'
import {CompositeFilterDescriptor} from '@progress/kendo-data-query'
import {generateFilter} from '@core/utils'
import {CityModel, CityCreateDialog} from './CityCreateDialog'
import {KTSVG} from '_metronic/helpers'

export function CityPage() {
  const intl = useIntl()
  const [showDialog, setShowDialog] = useState(false)
  const [mode, setMode] = useState<FormMode>('new')
  const [actionItem, setActionItem] = useState()
  const [refresh, setRefresh] = useState(1)
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: {isDirty},
  } = useForm<CityModel>()
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
  // Search region
  const [inputList, setInputList] = useState([{field: 'name', value: '', operator: 'eq'}])
  const handleInputChange = (e: any, index: any) => {
    const {name, value} = e.target
    const list = [...inputList]
    if (name === 'field') list[index].field = value
    else if (name === 'operator') list[index].operator = value
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
      setInputList([...inputList, {field: 'name', value: '', operator: 'eq'}])
  }
  const handleComboBoxChange = (value: any, i: number, name: string) => {
    handleInputChange({target: {value, name}}, i)
  }
  return (
    <>
      <PageTitle breadcrumbs={[]}>
        {intl.formatMessage({id: 'MENU.BaseInfo.CityController'})}
      </PageTitle>
      <PageActions>
        <button type='button' className='btn btn-sm btn-primary' onClick={newItem}>
          {intl.formatMessage({id: 'MENU.NewItem'})}
        </button>
      </PageActions>
      {showDialog && <CityCreateDialog mode={mode} onClose={handleClose} item={actionItem} />}
      <PageLayout>
        <SearchLayout onSubmit={onSubmit} onReset={resetSearch}>
          {inputList.map((x, i) => {
            return (
              <div className='box'>
                <select
                  style={{marginLeft: '21px'}}
                  name='field'
                  onChange={(e) => handleInputChange(e, i)}
                >
                  <option value='name'>نام</option>
                  <option value='provinceId'>استان</option>
                  <option value='isActive'>وضعیت</option>
                </select>

                <select
                  style={{marginLeft: '21px'}}
                  name='operator'
                  onChange={(e) => handleInputChange(e, i)}
                >
                  <option value='eq'>مساوی</option>
                  <option value='neq'>مخالف</option>
                  <option value='contains'>شامل</option>
                </select>

                {x.field === 'name' && (
                  <input
                    style={{width: '30%', display: 'inline'}}
                    className={x.value === '' ? 'is-invalid form-control' : 'is-valid form-control'}
                    name='value'
                    placeholder='Enter Data'
                    value={x.value}
                    onChange={(e) => handleInputChange(e, i)}
                  />
                )}
                {x.field === 'provinceId' && (
                  <FormControl col={5} label='استان'>
                    <Controller
                      name='provinceId'
                      control={control}
                      render={({field: {onChange, onBlur, value, ref}}) => (
                        <ComboBox
                          endpoint='province/combo'
                          onChange={(e) => handleComboBoxChange(e, i, 'provinceId')}
                          onBlur={onBlur}
                        />
                      )}
                    />
                  </FormControl>
                )}
                {x.field === 'isActive' && (
                  <div
                    style={{display: 'inline'}}
                    className='col form-check form-check-custom form-check-solid form-check-success me-6'
                  >
                    <label className='form-label'> فعال</label>
                    <input
                      className='form-check-input'
                      type='radio'
                      name='Married'
                      value={'true'}
                      onChange={(e) => handleInputChange(e, i)}
                    />
                    <label className='form-label'>غیر فعال</label>
                    <input
                      className='form-check-input'
                      name='Married'
                      type='radio'
                      value={'false'}
                      onChange={(e) => handleInputChange(e, i)}
                    />
                  </div>
                )}
                {inputList.length !== 1 && (
                  <button
                    onClick={() => handleRemoveClick(i)}
                    className='btn btn-icon btn-bg-light btn-active-color-danger btn-sm me-1'
                  >
                    <KTSVG path='/media/icons/duotune/general/gen027.svg' className='svg-icon-3' />
                  </button>
                )}
                {inputList.length - 1 === i && (
                  <button
                    onClick={handleAddClick}
                    className='btn btn-icon btn-bg-light btn-active-color-success btn-sm me-1'
                  >
                    <KTSVG path='/media/icons/duotune/general/gen035.svg' className='svg-icon-3' />
                  </button>
                )}
              </div>
            )
          })}
        </SearchLayout>
        <GridLayout>
          <Grid refresh={refresh} endpoint='city' onAction={hanleActions} filter={filter}>
            <GridColumn field='id' title='شناسه' filterable={false} width='70' />
            <GridColumn field='name' title='نام' />
            <GridColumn field='provinceName' title='استان' />
            <GridColumn field='isActive' title='وضعیت' filter='boolean' width='100' />
          </Grid>
        </GridLayout>
      </PageLayout>
    </>
  )
}
