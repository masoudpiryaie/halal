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
  item?: CityModel
  parent: number
  stateName: string
}
export type CityModel = {
  id?: number
  name: string
  provinceId: number
}
const pageTitles = defaultPageTitles

export function CityInContryCreateDialog({mode, onClose, item, parent, stateName}: PropsType) {
  const intl = useIntl()
  const API_URL = process.env.REACT_APP_API_URLCoding || 'api'
  const {
    register,
    handleSubmit,
    reset,
    formState: {errors, isDirty, touchedFields},
  } = useForm<CityModel>({mode: 'all'})

  useEffect(() => {
    if (mode === 'edit') {
      reset(item)
    }
  }, [mode, item, reset])

  const onSubmit = handleSubmit(async (data) => {
    data.provinceId = parent
    if (parent === 0) {
      toast.info('استان  الزامی است')
      return
    }
    let url = API_URL + 'Cities'
    try {
      let formData = new FormData()
      formData.append('provinceId', parent.toString())
      formData.append('name', data.name)
      if (mode !== 'edit') await axios.post(url, formData)
      else {
        if (data.id !== undefined) formData.append('id', data.id.toString())
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
            <FormControl col={6} label='نام استان'>
              <input value={stateName} />
            </FormControl>

            <FormControl col={6} label='نام شهر'>
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
            </FormControl> */}
          </form>
        </div>
        <DialogActions mode={mode} onClose={onClose} resetForm={resetForm}></DialogActions>
      </Dialog>
    </div>
  )
}
