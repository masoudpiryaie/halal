import {useEffect, useState} from 'react'
import {Dialog} from '@progress/kendo-react-dialogs'
import {defaultPageTitles, FormMode} from '@core/forms'
import axios from 'axios'
import {toast} from 'react-toastify'
import {FieldError, useForm} from 'react-hook-form'
import {FormControl, DialogActions, BtnAction} from '@core/components'
import {useIntl} from 'react-intl'

type PropsType = {
  mode: FormMode
  onClose: () => void
  item?: PayeInfoModel
  ID: number
}
export type PayeInfoModel = {
  id?: number
  payeInfoId: number
  title: string
  description: string
}
const pageTitles = defaultPageTitles

export function PayeInfoStCreateDialog({mode, onClose, item, ID}: PropsType) {
  const intl = useIntl()
  const API_URL = process.env.REACT_APP_API_URLCoding || 'api'
  const {
    register,
    handleSubmit,
    reset,
    formState: {errors, isDirty, touchedFields},
  } = useForm<PayeInfoModel>({mode: 'all'})

  useEffect(() => {
    if (mode === 'edit') {
      reset(item)
    }
  }, [mode, item, reset])

  const onSubmit = handleSubmit(async (data) => {
    let url = API_URL + 'PayeInfoStandardServices/'

    try {
      if (mode === 'edit') {
        url += 'UpdateJson' //item?.id
        await axios.put(url, data)
      } else {
        url += 'CreateJson'
        data.payeInfoId = ID
        await axios.post(url, data)
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
            <FormControl col={6} label={'عنوان'}>
              <input
                className={getValidationClass(touchedFields.title, errors.title)}
                autoFocus={true}
                {...register('title', {required: true})}
              />
            </FormControl>

            <FormControl col={6} label={'توضیحات'}>
              <textarea
                className={getValidationClass(touchedFields.description, errors.description)}
                {...register('description', {required: true})}
              />
            </FormControl>
          </form>
        </div>
        <DialogActions mode={mode} onClose={onClose} resetForm={resetForm}></DialogActions>
      </Dialog>
    </div>
  )
}
