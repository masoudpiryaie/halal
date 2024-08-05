import {GridCellProps, GridColumn as Column} from '@progress/kendo-react-grid'
import {Grid} from '@core/components'
import {useForm} from 'react-hook-form'
import {useCallback, useState} from 'react'
import {toast} from 'react-toastify'
import axios from 'axios'
import {Dialog, DialogActionsBar} from '@progress/kendo-react-dialogs'
import {KTSVG, toAbsoluteUrl} from '_metronic/helpers'
import {useIntl} from 'react-intl'

type formMode = 'edit' | 'new'
type FormData = {
  name: string
  price: number
  description: string
}

export function PricePackagePage() {
  const intl = useIntl()
  const {
    register,
    setValue,
    handleSubmit,
    reset,
    getValues,
    formState: {errors, isDirty},
  } = useForm<FormData>()
  const onSubmit = handleSubmit((data) => console.log(data))
  const [mode, setMode] = useState<formMode>('new')
  const [refresh, setFefresh] = useState(1)
  const [selectedItem, setSelectedItem] = useState<any>()
  const [deleteConfirm, setDeleteConfirm] = useState(false)
  const [recordToDeleleteId, setRecordToDeleleteId] = useState(0)
  const formNew = () => {
    reset()
    setMode('new')
    if (isDirty) {
      console.log('aha!')
    }
  }

  function showDeleteRecord(record: FormData & {id: number}) {
    setDeleteConfirm(true)
    setRecordToDeleleteId(record.id)
  }

  async function deleteRecord() {
    try {
      setDeleteConfirm(false)
      const resp = await axios.delete('pricePackage/' + recordToDeleleteId)
      toast.info('عملیات با موفقیت انجام شد')
      setFefresh(Math.random())
    } catch (e) {
      toast.error('خطا در انجام عملیات')
    }
  }

  const handleSelectionChange = useCallback(async (selectedRows: any[]) => {
    if (selectedRows.length === 1) {
      setSelectedItem(selectedRows[0])
      setMode('edit')
      setValue('description', selectedRows[0].description)
      setValue('name', selectedRows[0].name)
      setValue('price', selectedRows[0].price)
    }
  }, [])

  const saveForm = async () => {
    if (mode === 'new') {
      try {
        const resp = await axios.post('pricePackage', getValues())
        toast.info('عملیات با موفقیت انجام شد')
        setFefresh(Math.random())
        reset()
      } catch (e) {
        toast.error('خطا در انجام عملیات')
      }
    } else {
      try {
        const resp = await axios.post('pricePackage/' + selectedItem.id, getValues())
        toast.info('عملیات با موفقیت انجام شد')
        setFefresh(Math.random())
        reset()
      } catch (e) {
        toast.error('خطا در انجام عملیات')
      }
    }
  }

  return (
    <>
      {deleteConfirm && (
        <Dialog title={'حدف'} onClose={() => setDeleteConfirm(false)}>
          <p style={{margin: '25px', textAlign: 'center'}}>حذف رکورد انجام شود؟</p>
          <DialogActionsBar>
            <button className='k-button' onClick={() => setDeleteConfirm(false)}>
              خیر
            </button>
            <button className='k-button' onClick={deleteRecord}>
              بله
            </button>
          </DialogActionsBar>
        </Dialog>
      )}
      <div className='card'>
        <div className='card-header'>
          <h3 className='card-title'>
            {intl.formatMessage({id: 'MENU.BaseInfo.PricePackageController'})}
          </h3>
          <div className='card-toolbar'>
            <button type='button' className='btn btn-sm btn-light' onClick={formNew}>
              {intl.formatMessage({id: 'MENU.NewItem'})}
            </button>
            <button type='button' className='btn btn-sm btn-primary' onClick={saveForm}>
              {mode === 'edit' ? 'ویرایش' : 'ذخیره'}
            </button>
          </div>
        </div>
        <div className='card-body'>
          <div className='row pb-10 p-2 g-3 border border-dotted'>
            <form onSubmit={onSubmit} className='row g-3'>
              <div className='col-md-6'>
                <label htmlFor='txt_name' className='form-label'>
                  نام
                </label>
                <input className='form-control' {...register('name')} />
              </div>
              <div className='col-md-6'>
                <label htmlFor='txt_name' className='form-label'>
                  قیمت
                </label>
                <input className='form-control' {...register('price')} />
              </div>
              <div className='col-md-12'>
                <label htmlFor='txt_platform' className='form-label'>
                  شرح
                </label>
                <input className='form-control' {...register('description')} />
              </div>
            </form>
          </div>
          <div className='row'>
            <div className='card-body d-flex align-items-center py-8'>
              <Grid
                style={{
                  height: '300px',
                }}
                refresh={refresh}
                endpoint='pricePackage'
                selectionChanged={handleSelectionChange}
              >
                <Column field='id' title='شناسه' filterable={false} width='70' />
                <Column field='name' title='نام' />
                <Column field='price' title='قیمت' />
                <Column field='description' title='شرح' />
                <Column
                  field='id'
                  title='حذف'
                  width='100'
                  filterable={false}
                  cell={(props: GridCellProps) => {
                    let field = props.field || ''
                    return (
                      <td>
                        <button
                          onClick={() => showDeleteRecord(props.dataItem)}
                          className='btn btn-sm'
                        >
                          <KTSVG
                            path='/media/icons/duotune/general/gen034.svg'
                            className='svg-icon-muted svg-icon-2hx  svg-icon-danger'
                          />
                        </button>
                      </td>
                    )
                  }}
                ></Column>
              </Grid>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
