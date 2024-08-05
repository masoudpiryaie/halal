import {useEffect, useState} from 'react'
import {Dialog} from '@progress/kendo-react-dialogs'
import {defaultPageTitles, FormMode} from '@core/forms'
import axios from 'axios'
import {toast} from 'react-toastify'
import {FieldError, useForm} from 'react-hook-form'
import {FormControl, DialogActions} from '@core/components'
import {useIntl} from 'react-intl'
import {title} from 'process'

type PropsType = {
  mode: FormMode
  onClose: () => void
  item?: ActivitiesModel
}
export type ActivitiesModel = {
  id?: number
  titleFa: string
  titleEn: string
  isEnabled: boolean
}
const pageTitles = defaultPageTitles

export function ActivitiesCreateDialog({mode, onClose, item}: PropsType) {
  const intl = useIntl()
  const API_URLCoding = process.env.REACT_APP_API_URLCoding || 'api'
  const {
    register,
    handleSubmit,
    reset,
    formState: {errors, isDirty, touchedFields},
  } = useForm<ActivitiesModel>({mode: 'all'})

  useEffect(() => {
    if (mode === 'edit') {
      reset(item)
    }
  }, [mode, item, reset])

  const onSubmit = handleSubmit(async (data) => {
    debugger

    try {
      if (mode !== 'edit') {
        let url = API_URLCoding + 'activityType'
        await axios.post(url, data)
      } else {
        let url = API_URLCoding + 'activityType/UpdateJson'
        await axios.put(url, {id: data.id, titleFa: data.titleFa, titleEn: data.titleEn})
      }

      toast.info(intl.formatMessage({id: 'MENU.ACTIONSuccess'}), {
        position: 'top-center',
      })
      onClose()
    } catch (e: any) {
      if (!e.processed) {
        toast.error(intl.formatMessage({id: 'MENU.ACTIONError'}), {
          position: 'top-center',
        })
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
            <FormControl col={6} label={intl.formatMessage({id: 'Model.Activities.TitleFa'})}>
              <input
                autoFocus={true}
                className={getValidationClass(touchedFields.titleFa, errors.titleFa)}
                {...register('titleFa', {required: true})}
              />
            </FormControl>
            <FormControl col={6} label={intl.formatMessage({id: 'Model.Activities.TitleEn'})}>
              <input
                className={getValidationClass(touchedFields.titleEn, errors.titleEn)}
                {...register('titleEn', {required: true})}
              />
            </FormControl>
          </form>
        </div>
        <DialogActions mode={mode} onClose={onClose} resetForm={resetForm}></DialogActions>
      </Dialog>
    </div>
  )
}
