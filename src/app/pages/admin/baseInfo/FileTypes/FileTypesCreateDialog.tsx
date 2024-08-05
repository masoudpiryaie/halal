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
  item?: FileTypesModel
}
export type FileTypesModel = {
  id?: number
  titleFa: string
  titleEn: string
  subDir: string
  maxByteSize: number
  isPic: boolean
  allowedFormat: any
  largeMaxWidth: number
  largeMaxHeight: number
  thumbMaxHeight: number
  thumbMaxWidth: number
  description: string
}
const pageTitles = defaultPageTitles

export function FileTypesCreateDialog({mode, onClose, item}: PropsType) {
  const intl = useIntl()
  const API_URL = process.env.REACT_APP_API_URLCoding || 'api'
  const [IsPic, setIsPic] = useState('true')
  const {
    register,
    handleSubmit,
    reset,
    formState: {errors, isDirty, touchedFields},
  } = useForm<FileTypesModel>({mode: 'all'})

  useEffect(() => {
    if (mode === 'edit') {
      reset(item)
    }
  }, [mode, item, reset])

  const onSubmit = handleSubmit(async (data) => {
    data.isPic = IsPic === 'true' ? true : false
    data.allowedFormat = [1, 2]

    try {
      debugger
      if (mode !== 'edit') {
        let url = API_URL + 'FileTypes/CreateJson'
        await axios.post(url, data)
      } else {
        let url = API_URL + 'FileTypes/UpdateJson'
        await axios.put(url, data)
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
    return error ? 'is-invalid' : 'is-valid'
  }
  return (
    <div>
      <Dialog title={pageTitles[mode]} onClose={onClose}>
        <div>
          <form id='dialog-form' onSubmit={onSubmit} className='row g-3'>
            <FormControl col={6} label={'نام فارسی'}>
              <input
                className={getValidationClass(touchedFields.titleFa, errors.titleFa)}
                autoFocus={true}
                {...register('titleFa', {required: true})}
              />
            </FormControl>
            <FormControl col={6} label={'نام انگلیسی'}>
              <input
                className={getValidationClass(touchedFields.titleEn, errors.titleEn)}
                {...register('titleEn', {required: true})}
              />
            </FormControl>
            <FormControl col={6} label={'SubDir '}>
              <input
                className={getValidationClass(touchedFields.subDir, errors.subDir)}
                {...register('subDir', {required: true})}
              />
            </FormControl>
            <FormControl col={6} label={'maxByteSize '}>
              <input
                className={getValidationClass(touchedFields.maxByteSize, errors.maxByteSize)}
                {...register('maxByteSize', {required: true})}
              />
            </FormControl>
            <FormControl col={6} label={'largeMaxWidth '}>
              <input
                className={getValidationClass(touchedFields.largeMaxWidth, errors.largeMaxWidth)}
                {...register('largeMaxWidth', {required: true})}
              />
            </FormControl>
            <FormControl col={6} label={'largeMaxHeight '}>
              <input
                className={getValidationClass(touchedFields.largeMaxHeight, errors.largeMaxHeight)}
                {...register('largeMaxHeight', {required: true})}
              />
            </FormControl>
            <FormControl col={6} label={'thumbMaxWidth '}>
              <input
                className={getValidationClass(touchedFields.thumbMaxWidth, errors.thumbMaxWidth)}
                {...register('thumbMaxWidth', {required: true})}
              />
            </FormControl>
            <FormControl col={6} label={'thumbMaxHeight '}>
              <input
                className={getValidationClass(touchedFields.thumbMaxHeight, errors.thumbMaxHeight)}
                {...register('thumbMaxHeight', {required: true})}
              />
            </FormControl>

            <FormControl col={6} label={'توضیحات'}>
              <textarea {...register('description')} />
            </FormControl>
            <div className='col form-check form-check-custom form-check-solid form-check-success me-6'>
              <label className='form-label'>{'عکس است'}</label>
              <input
                className='form-check-input'
                type='radio'
                name='Ind'
                value={'true'}
                checked={IsPic === 'true'}
                onChange={(e) => setIsPic(e.target.value)}
              />
              <label className='form-label'>{'عکس نیست'}</label>
              <input
                className='form-check-input'
                type='radio'
                name='Ind'
                value={'false'}
                checked={IsPic === 'false'}
                onChange={(e) => setIsPic(e.target.value)}
              />
            </div>
          </form>
        </div>
        <DialogActions mode={mode} onClose={onClose} resetForm={resetForm}></DialogActions>
      </Dialog>
    </div>
  )
}
