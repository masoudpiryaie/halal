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
  item?: UnitsModel
}
export type UnitsModel = {
  id?: number
  titleFa: string
  titleEn: string
  code: number
  subUnitId: number
  symbol: string
  sign: string
  measurementDimension: string
  definition: string
  isDefaultRight: boolean
}
const pageTitles = defaultPageTitles

export function UnitsCreateDialog({mode, onClose, item}: PropsType) {
  const intl = useIntl()
  const API_URLCoding = process.env.REACT_APP_API_URLCoding || 'api'
  const [isActive, setIsActive] = useState('true')
  const {
    register,
    handleSubmit,
    reset,
    formState: {errors, isDirty, touchedFields},
  } = useForm<UnitsModel>({mode: 'all'})

  useEffect(() => {
    if (mode === 'edit') {
      reset(item)
    }
  }, [mode, item, reset])

  const onSubmit = handleSubmit(async (data) => {
    data.isDefaultRight = isActive === 'true' ? true : false
    let url = API_URLCoding + 'units'

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
            <FormControl col={6} label={intl.formatMessage({id: 'Model.Units.TitleFa'})}>
              <input
                className={getValidationClass(touchedFields.titleFa, errors.titleFa)}
                autoFocus={true}
                {...register('titleFa', {required: true})}
              />
            </FormControl>
            <FormControl col={6} label={intl.formatMessage({id: 'Model.Units.TitleEn'})}>
              <input
                className={getValidationClass(touchedFields.titleEn, errors.titleEn)}
                autoFocus={true}
                {...register('titleEn', {required: true})}
              />
            </FormControl>
            <FormControl col={6} label={intl.formatMessage({id: 'Model.Units.Symbol'})}>
              <input
                className={getValidationClass(touchedFields.symbol, errors.symbol)}
                autoFocus={true}
                {...register('symbol', {required: true})}
              />
            </FormControl>
            <FormControl col={6} label={intl.formatMessage({id: 'Model.Units.Code'})}>
              <input
                className={getValidationClass(touchedFields.code, errors.code)}
                autoFocus={true}
                {...register('code', {required: true})}
              />
            </FormControl>
            <FormControl col={6} label={intl.formatMessage({id: 'Model.Units.Sign'})}>
              <input
                className={getValidationClass(touchedFields.sign, errors.sign)}
                autoFocus={true}
                {...register('sign', {required: true})}
              />
            </FormControl>
            <FormControl
              col={6}
              label={intl.formatMessage({id: 'Model.Units.MeasurementDimension'})}
            >
              <input
                className={getValidationClass(
                  touchedFields.measurementDimension,
                  errors.measurementDimension
                )}
                autoFocus={true}
                {...register('measurementDimension', {required: true})}
              />
            </FormControl>

            <FormControl col={6} label={intl.formatMessage({id: 'Model.Units.Definition'})}>
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
