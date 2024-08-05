import {GridCellProps, GridColumn as Column} from '@progress/kendo-react-grid'
import {Grid} from '@core/components'
import {ClaimTree} from './ClaimTree'
import axios from 'axios'
import {useState, useCallback} from 'react'
import {toast} from 'react-toastify'
import {useForm} from 'react-hook-form'
import {Dialog, DialogActionsBar} from '@progress/kendo-react-dialogs'
import {useIntl} from 'react-intl'
import {KTSVG} from '_metronic/helpers'
// const RoleGrid = gridWithState(Grid, '/roles/all');

type formMode = 'edit' | 'new'
type FormData = {
  name: string
  isEnabled: boolean
}

export function RolePage() {
  const API_URLAuth = process.env.REACT_APP_API_URL || 'api'
  const intl = useIntl()
  const {
    register,
    setValue,
    handleSubmit,
    reset,
    getValues,
    formState: {errors, isDirty},
  } = useForm<FormData>()
  const [mode, setMode] = useState<formMode>('new')
  const [refresh, setFefresh] = useState(1)
  const [selectedClaims, setSelectedClaims] = useState<string[]>([])
  const [selectedRole, setSelectedRole] = useState<any>()
  const [deleteConfirm, setDeleteConfirm] = useState(false)
  const [recordToDeleleteId, setRecordToDeleleteId] = useState(0)

  const formNew = () => {
    reset()
    setMode('new')
    if (isDirty) {
      console.log('')
    }
  }

  function showDeleteRecord(record: FormData & {id: number}) {
    setDeleteConfirm(true)
    setRecordToDeleleteId(record.id)
  }

  async function deleteRecord() {
    try {
      setDeleteConfirm(false)
      const resp = await axios.delete('roles/' + recordToDeleleteId)
      toast.info(intl.formatMessage({id: 'MENU.ACTIONSuccess'}))
      setFefresh(Math.random())
    } catch (e) {
      toast.error('خطا در انجام عملیات')
    }
  }

  const saveForm = async () => {
    try {
      const data: any = getValues()
      if (mode === 'edit') {
        data.id = selectedRole.id
      }
      let url = API_URLAuth + 'roles'
      debugger
      data.isEnabled = true
      data.claims = selectedClaims
      if (mode !== 'edit') await axios.post(url, data)
      else await axios.put(url, data)
      //const resp = await axios.post('roles', data)
      toast.info(intl.formatMessage({id: 'MENU.ACTIONSuccess'}))
      setFefresh(Math.random())
      reset()
    } catch (e) {
      toast.error('خطا در انجام عملیات')
    }
  }

  const handleSelectionChange = useCallback(async (selectedRows: any[]) => {
    if (selectedRows.length === 1) {
      setSelectedRole(selectedRows[0])
      setMode('edit')
      setValue('name', selectedRows[0].name)
      debugger
      const data: any = getValues()
      data.isEnabled = true
      data.claims = selectedClaims
      let url = API_URLAuth + 'Claims'
      //const resp = await axios.get(`roles/${selectedRows[0].id}/claims`)
      const resp = await axios.get(url, data)
      debugger
      setSelectedClaims(resp.data.value.claim)
    }
  }, [])

  const updateClaims = async () => {
    if (selectedRole) {
      let url = API_URLAuth + 'menus'
      debugger
      const resp = await axios.post(url)
      toast.info(intl.formatMessage({id: 'MENU.ACTIONSuccess'}))
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
      <div className='card '>
        <div className='card-header'>
          <h3 className='card-title'>
            {intl.formatMessage({id: 'MENU.Identity.RolesController'})}
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
            <form className='row g-3'>
              <div className='col-md-6'>
                <label htmlFor='txt_name' className='form-label'>
                  نام
                </label>
                <input className='form-control' {...register('name')} />
              </div>
            </form>
          </div>
          <div className='row'>
            <div className='card-body d-flex align-items-center py-8'>
              <Grid
                style={{
                  height: '300px',
                }}
                endpoint={API_URLAuth + 'roles'}
                refresh={refresh}
                selectionChanged={handleSelectionChange}
                showDel
                showEdit
              >
                <Column field='id' title='ID' />
                <Column field='name' title='Name' />
                {/* <Column
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
                ></Column> */}
              </Grid>
            </div>
          </div>
          <div className='row'>
            <h3 className='card-title'>دسترسی ها</h3>
            <div className='card-body d-flex align-items-center py-8 ' dir='ltr'>
              <ClaimTree onSelectionChange={setSelectedClaims} selected={selectedClaims} />
            </div>
          </div>
        </div>

        {/* <div className='card-footer'>
          <button onClick={updateClaims} className='btn btn-sm btn-primary'>
            بروز رسانی دسترسی ها
          </button>
        </div> */}
      </div>
    </>
  )
}
