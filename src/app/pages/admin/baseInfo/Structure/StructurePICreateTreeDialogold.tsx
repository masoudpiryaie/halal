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
  treeID: number
  onClose: () => void
  item?: PayeInfoModel
}
export type PayeInfoModel = {
  gpcStructureId?: number
  comBaseNameFa: string
  comBaseNameEn: string
  description: string
}
const pageTitles = defaultPageTitles

export function StructurePICreateTreeDialog({mode, treeID, onClose, item}: PropsType) {
  const intl = useIntl()
  const API_URL = process.env.REACT_APP_API_URLCoding || 'api'
  const API_URLCoding = API_URL + 'Breaks/' //process.env.REACT_APP_API_URL || 'api'
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
    let url = API_URLCoding + 'Create'
    data.gpcStructureId = treeID
    try {
      if (mode !== 'edit') {
        debugger
        await axios.post(url, data)
      } else {
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
    if (touched === true) {
      return error ? 'is-invalid' : 'is-valid'
    }
  }
  return (
    <div>
      <Dialog title={pageTitles[mode]} onClose={onClose}>
        <div>
          <form id='dialog-form' onSubmit={onSubmit} className='row g-3'>
            <FormControl col={6} label={intl.formatMessage({id: 'Model.PayeInfo.BaseNameFa'})}>
              <input
                className={getValidationClass(touchedFields.comBaseNameFa, errors.comBaseNameFa)}
                autoFocus={true}
                {...register('comBaseNameFa', {required: true})}
              />
            </FormControl>
            <FormControl col={6} label={intl.formatMessage({id: 'Model.PayeInfo.BaseNameEn'})}>
              <input
                className={getValidationClass(touchedFields.comBaseNameEn, errors.comBaseNameEn)}
                autoFocus={true}
                {...register('comBaseNameEn', {required: true})}
              />
            </FormControl>
            <FormControl col={12} label={intl.formatMessage({id: 'Model.PayeInfo.Description'})}>
              <input
                className={getValidationClass(touchedFields.description, errors.description)}
                autoFocus={true}
                {...register('description')}
              />
            </FormControl>
          </form>
        </div>
        <DialogActions mode={mode} onClose={onClose} resetForm={resetForm}></DialogActions>
      </Dialog>
    </div>
  )
}
