import {GridColumn} from '@progress/kendo-react-grid'
import {FormControl, Grid} from '@core/components'
import {useState} from 'react'
import {useIntl} from 'react-intl'
import {FormMode} from '@core/forms'
import {PageTitle, PageActions} from '_metronic/layout/core'
import {useForm} from 'react-hook-form'
import {CompositeFilterDescriptor} from '@progress/kendo-data-query'
import {generateFilter} from '@core/utils'
import {CompanyCreateDialog, CompanyModel} from './CompanyCreateDialog'

export function CompanyPage() {
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
  } = useForm<CompanyModel>()
  const [filter, setFilter] = useState<CompositeFilterDescriptor>()

  const onSubmit = handleSubmit(async (data) => {
    if (isDirty) {
      setFilter(generateFilter(data))
    }
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
  return (
    <>
      <PageTitle breadcrumbs={[]}>
        {intl.formatMessage({id: 'MENU.BaseInfo.CompanyController'})}
      </PageTitle>
      <PageActions>
        <button type='button' className='btn btn-sm btn-primary' onClick={newItem}>
          {intl.formatMessage({id: 'MENU.NewItem'})}
        </button>
      </PageActions>
      {showDialog && <CompanyCreateDialog mode={mode} onClose={handleClose} item={actionItem} />}
      <div className='card card-flush '>
        <div className='card-body'>
          <div className='row'>
            <div className='card card-px-0 mb-2 shadow '>
              <div className='card-body'>
                <form onSubmit={onSubmit} className='row g-3'>
                  <FormControl col={12} label='نام'>
                    <input autoFocus={true} {...register('name')} />
                  </FormControl>
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
                  endpoint='company'
                  showDel
                  showEdit
                  onAction={hanleActions}
                  filter={filter}
                >
                  <GridColumn field='id' title='شناسه' filterable={false} width='70' />
                  <GridColumn field='name' title='نام' />
                  <GridColumn field='isActive' title='وضعیت' filter='boolean' width='100' />
                </Grid>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
