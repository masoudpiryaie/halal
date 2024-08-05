import {useEffect, useState} from 'react'
import {Dialog} from '@progress/kendo-react-dialogs'
import {defaultPageTitles, FormMode} from '@core/forms'
import axios from 'axios'
import {toast} from 'react-toastify'
import {FieldError, useForm} from 'react-hook-form'
import {FormControl, DialogActions} from '@core/components'
import {useIntl} from 'react-intl'

type PropsType = {
  mode: FormMode
  ActiveID: number
  onClose: () => void
  item?: ActiveStructureModel
  state: boolean
  API_URL: string
}
export type ActiveStructureModel = {
  id?: number
  isEnable: boolean
  reason: string
}
const pageTitles = defaultPageTitles

export function ActiveDialog({mode, ActiveID, onClose, item, state, API_URL}: PropsType) {
  const intl = useIntl()
  const [currentStatus, setcurrentStatus] = useState(false)
  const [active, setactive] = useState('false')
  const {
    register,
    handleSubmit,
    reset,
    formState: {errors, isDirty, touchedFields},
  } = useForm<ActiveStructureModel>({mode: 'all'})

  useEffect(() => {
    setcurrentStatus(state)
    setactive(state.toString())
  }, [mode, item, reset])

  const onSubmit = handleSubmit(async (data) => {
    data.id = ActiveID
    let url = API_URL + 'ToggleEnable'
    debugger
    try {
      await axios.post(url, data)
      toast.info(intl.formatMessage({id: 'MENU.ACTIONSuccess'}))
      onClose()
    } catch (e: any) {
      if (!e.processed) {
        toast.error(intl.formatMessage({id: 'MENU.ACTIONError'}))
      }
    }
  })

  const resetForm = () => {
    reset()
    if (isDirty) {
    }
  }
  const getValidationClass = (touched: boolean | undefined, error: FieldError | undefined) => {
    if (touched === true) {
      return error ? 'is-invalid' : 'is-valid'
    }
  }
  return (
    <div>
      <Dialog title={'وضعیت'} onClose={onClose} style={{zIndex: 90000}}>
        <div>
          <form id='dialog-form' onSubmit={onSubmit} className='row g-3'>
            <FormControl col={12} label={' وضعیت کنونی'}>
              <div className='col form-check form-check-custom form-check-solid form-check-success me-6'>
                <label className='form-label'>
                  {intl.formatMessage({id: 'FormControl.Input.Select.Active'})}
                  <input
                    disabled={true}
                    className='form-check-input'
                    type='radio'
                    name='PayT'
                    value={'true'}
                    checked={active === 'true'}
                    onChange={(e) => setactive(e.target.value)}
                  />
                </label>

                <label className='form-label'>
                  {intl.formatMessage({id: 'FormControl.Input.Select.Inactive'})}
                  <input
                    disabled={true}
                    className='form-check-input'
                    type='radio'
                    name='PayT'
                    value={'false'}
                    checked={active === 'false'}
                    onChange={(e) => setactive(e.target.value)}
                  />
                </label>
              </div>
            </FormControl>

            <FormControl col={12} label={intl.formatMessage({id: 'Model.Structure.Reason'})}>
              <textarea {...register('reason')} />
            </FormControl>
          </form>
        </div>
        <DialogActions mode={mode} onClose={onClose} resetForm={resetForm}></DialogActions>
      </Dialog>
    </div>
  )
}
