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
  onClose: () => void
  item?: WorthsModel
}
export type WorthsModel = {
  id?: number
  titleFa: string
  titleEn: string
  code: number
  definition: string
  abbreviationEn: string
  isEnabled: boolean
}
const pageTitles = defaultPageTitles

export function WorthsCreateDialog({mode, onClose, item}: PropsType) {
  const intl = useIntl()
  const API_URLCoding = process.env.REACT_APP_API_URLCoding || 'api'
  const [isActive, setIsActive] = useState('true')
  const {
    register,
    handleSubmit,
    reset,
    formState: {errors, isDirty, touchedFields},
  } = useForm<WorthsModel>({mode: 'all'})

  useEffect(() => {
    if (mode === 'edit') {
      reset(item)
    }
  }, [mode, item, reset])

  const onSubmit = handleSubmit(async (data) => {
    data.isEnabled = isActive === 'true' ? true : false
    let url = API_URLCoding + 'worths'

    try {
      if (mode !== 'edit') await axios.post(url, data)
      else await axios.put(url, data)
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
            <FormControl col={6} label={intl.formatMessage({id: 'Model.BaseNames.TitleFa'})}>
              <input
                className={getValidationClass(touchedFields.titleFa, errors.titleFa)}
                autoFocus={true}
                {...register('titleFa', {required: true, minLength: 2})}
              />
            </FormControl>
            <FormControl col={6} label={intl.formatMessage({id: 'Model.BaseNames.TitleEn'})}>
              <input
                className={getValidationClass(touchedFields.titleEn, errors.titleEn)}
                autoFocus={true}
                {...register('titleEn', {required: true, minLength: 2})}
              />
            </FormControl>
            <FormControl col={6} label={intl.formatMessage({id: 'Model.BaseNames.AbbreviationEn'})}>
              <input
                className={getValidationClass(touchedFields.abbreviationEn, errors.abbreviationEn)}
                autoFocus={true}
                {...register('abbreviationEn', {required: true, minLength: 2})}
              />
            </FormControl>
            <FormControl col={6} label={intl.formatMessage({id: 'Model.BaseNames.Code'})}>
              <input
                className={getValidationClass(touchedFields.code, errors.code)}
                autoFocus={true}
                {...register('code', {required: true, minLength: 2})}
              />
            </FormControl>

            <FormControl col={6} label={intl.formatMessage({id: 'Model.BaseNames.Definition'})}>
              <textarea {...register('definition')} />
            </FormControl>
            <div className='col form-check form-check-custom form-check-solid form-check-success me-6'>
              <label className='form-label'>
                {intl.formatMessage({id: 'FormControl.Input.Select.Active'})}
              </label>
              <input
                className='form-check-input'
                type='radio'
                name='Ind'
                value={'true'}
                checked={isActive === 'true'}
                onChange={(e) => setIsActive(e.target.value)}
              />
              <label className='form-label'>
                {intl.formatMessage({id: 'FormControl.Input.Select.Inactive'})}
              </label>
              <input
                className='form-check-input'
                type='radio'
                name='Ind'
                value={'false'}
                checked={isActive === 'false'}
                onChange={(e) => setIsActive(e.target.value)}
              />
            </div>
          </form>
        </div>
        <DialogActions mode={mode} onClose={onClose} resetForm={resetForm}></DialogActions>
      </Dialog>
    </div>
  )
}
