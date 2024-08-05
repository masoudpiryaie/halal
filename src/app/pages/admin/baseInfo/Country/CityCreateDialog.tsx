import {useEffect, useState} from 'react'
import {Dialog} from '@progress/kendo-react-dialogs'
import {defaultPageTitles, FormMode} from '@core/forms'
import axios from 'axios'
import {toast} from 'react-toastify'
import {Controller, FieldError, useForm} from 'react-hook-form'
import {FormControl, DialogActions, ComboBox} from '@core/components'
// import {ComboBox, ComboBoxFilterChangeEvent} from '@progress/kendo-react-dropdowns'
import {useIntl} from 'react-intl'

type PropsType = {
  mode: FormMode
  onClose: () => void
  item?: CityModel
}
export type CityModel = {
  id?: number
  name: string
  description: string
  isActive: boolean
  provinceId: number
}
const pageTitles = defaultPageTitles

export function CityCreateDialog({mode, onClose, item}: PropsType) {
  const intl = useIntl()
  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: {errors, isDirty, touchedFields},
  } = useForm<CityModel>({mode: 'all'})

  useEffect(() => {
    if (mode === 'edit') {
      reset(item)
    }
  }, [mode, item, reset])

  const onSubmit = handleSubmit(async (data) => {
    let url = 'city'
    if (mode === 'edit') {
      url += '/' + item?.id
    }
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
      <Dialog title={pageTitles[mode]} onClose={onClose} width='50vw'>
        <div>
          <form id='dialog-form' onSubmit={onSubmit} className='row g-3'>
            <FormControl col={6} label='نام'>
              <input
                className={getValidationClass(touchedFields.name, errors.name)}
                autoFocus={true}
                {...register('name', {required: true, minLength: 2})}
              />
            </FormControl>
            <FormControl col={6} label='وضعیت'>
              <select
                className={getValidationClass(touchedFields.isActive, errors.isActive)}
                {...register('isActive', {required: true, setValueAs: (v) => !!v})}
              >
                <option value='true'>فعال</option>
                <option value='false'>غیر فعال</option>
              </select>
            </FormControl>
            <FormControl col={12} label='استان'>
              <Controller
                name='provinceId'
                control={control}
                render={({field: {onChange, onBlur, value, ref}}) => (
                  <ComboBox endpoint='province/combo' onChange={onChange} onBlur={onBlur} />
                )}
              />
            </FormControl>
            <FormControl col={12} label='شرح'>
              <textarea {...register('description')} />
            </FormControl>
          </form>
        </div>
        <DialogActions mode={mode} onClose={onClose} resetForm={resetForm}></DialogActions>
      </Dialog>
    </div>
  )
}
