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
  ID: number
  onClose: () => void
  item?: ActivePayeInfoModel
  state: boolean
}
export type ActivePayeInfoModel = {
  id?: number
  isEnable: boolean
  reason: string
}
const pageTitles = defaultPageTitles

export function PayeInfoActiveCreateDialog({mode, ID, onClose, item, state}: PropsType) {
  const intl = useIntl()
  const [currentStatus, setcurrentStatus] = useState(false)
  const [active, setactive] = useState('false')
  const API_URL = process.env.REACT_APP_API_URLCoding || 'api'
  const API_URLCoding = API_URL + 'Breaks/' //process.env.REACT_APP_API_URL || 'api'
  const {
    register,
    handleSubmit,
    reset,
    formState: {errors, isDirty, touchedFields},
  } = useForm<ActivePayeInfoModel>({mode: 'all'})

  useEffect(() => {
    setactive(state.toString())
  }, [mode, item, reset])

  const onSubmit = handleSubmit(async (data) => {
    debugger
    data.id = ID
    data.isEnable = active === 'true' ? true : false
    let url = API_URLCoding + 'ToggleEnable'
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
      <Dialog title={pageTitles[mode]} onClose={onClose}>
        <div>
          <form id='dialog-form' onSubmit={onSubmit} className='row g-3'>
            <FormControl col={12} label={' '}>
              <div className='col form-check form-check-custom form-check-solid form-check-success me-6'>
                <label className='form-label'>
                  {intl.formatMessage({id: 'FormControl.Input.Select.Active'})}
                  <input
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
            <FormControl
              col={12}
              label={intl.formatMessage({id: 'Model.ChangeStatusHistory.Reason'})}
            >
              <input
                className={getValidationClass(touchedFields.reason, errors.reason)}
                autoFocus={true}
                {...register('reason', {required: true})}
              />
            </FormControl>
          </form>
        </div>
        <DialogActions mode={mode} onClose={onClose} resetForm={resetForm}></DialogActions>
      </Dialog>
    </div>
  )
}
