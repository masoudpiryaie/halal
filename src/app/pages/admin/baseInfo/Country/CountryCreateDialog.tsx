import {useEffect} from 'react'
import {Dialog} from '@progress/kendo-react-dialogs'
import {defaultPageTitles, FormMode} from '@core/forms'
import axios from 'axios'
import {toast} from 'react-toastify'
import {FieldError, useForm} from 'react-hook-form'
import {FormControl, DialogActions} from '@core/components'
import {useIntl} from 'react-intl'

type PropsType = {
  mode: FormMode
  onClose: () => void
  item?: CountryModel
}
export type CountryModel = {
  id?: number
  name: string
  // nameEn: string
  isDefault: boolean
  // prefixNumber: string
}
const pageTitles = defaultPageTitles

export function CountryCreateDialog({mode, onClose, item}: PropsType) {
  const intl = useIntl()
  const API_URL = process.env.REACT_APP_API_URLCoding || 'api'
  const {
    register,
    handleSubmit,
    reset,
    formState: {errors, isDirty, touchedFields},
  } = useForm<CountryModel>({mode: 'all'})

  useEffect(() => {
    if (mode === 'edit') {
      reset(item)
    }
  }, [mode, item, reset])

  const onSubmit = handleSubmit(async (data) => {
    let url = API_URL + 'Countries'
    let formData = new FormData()
    formData.append('isDefault', 'true')
    formData.append('name', data.name)
    debugger
    try {
      if (mode !== 'edit') await axios.post(url, formData)
      else {
        if (data?.id !== undefined) formData.append('id', data.id.toString())
        formData.append('isEnabled', 'true')
        await axios.put(url, formData)
      }
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
    if (mode === 'edit') return error ? 'is-invalid' : 'is-valid'
    else {
      if (touched === true) {
        return error ? 'is-invalid' : 'is-valid'
      }
    }
  }
  return (
    <div>
      <Dialog title={pageTitles[mode]} onClose={onClose}>
        <div>
          <form id='dialog-form' onSubmit={onSubmit} className='row g-3'>
            <FormControl col={12} label='نام کشور'>
              <input
                className={getValidationClass(touchedFields.name, errors.name)}
                autoFocus={true}
                {...register('name', {required: true, minLength: 2})}
              />
            </FormControl>
            {/* <FormControl col={6} label='نام انگلیسی'>
              <input
                className={getValidationClass(touchedFields.nameEn, errors.nameEn)}
                autoFocus={true}
                {...register('nameEn', {required: true, minLength: 2})}
              />
            </FormControl>
            <FormControl col={6} label='پیش شماره'>
              <input
                className={getValidationClass(touchedFields.prefixNumber, errors.prefixNumber)}
                autoFocus={true}
                {...register('prefixNumber', {required: true, minLength: 2})}
              />
            </FormControl> */}
          </form>
        </div>
        <DialogActions mode={mode} onClose={onClose} resetForm={resetForm}></DialogActions>
      </Dialog>
    </div>
  )
}
