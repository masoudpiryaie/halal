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
  item?: PayeInfoModel
  treeID?: number
  api: string
  com?: boolean
  treetype?: number
}
export type PayeInfoModel = {
  gpcStructureId?: number
  id?: number
  comBaseNameFa: string
  comBaseNameEn: string
  description: string
}
const pageTitles = defaultPageTitles

export function PayeInfoCreateDialog({mode, onClose, item, treeID, api, com, treetype}: PropsType) {
  const intl = useIntl()
  const API_URL = process.env.REACT_APP_API_URLCoding || 'api' //process.env.REACT_APP_API_URL || 'api'

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
    try {
      var obj: {[k: string]: any} = {}

      if (com) {
        obj.comBaseNameFa = data.comBaseNameFa
        obj.comBaseNameEn = data.comBaseNameEn
      } else {
        obj.BaseNameFa = data.comBaseNameFa
        obj.BaseNameEn = data.comBaseNameEn
      }

      obj.description = data.description

      if (mode === 'edit') {
        obj.id = item?.id

        await axios.put(API_URL + api + '/', obj)
      } else {
        //var gg =  //gpcStructureId//shenaseStructureId
        if (treetype === 1) {
          obj.gpcStructureId = treeID
        } else if (treetype === 2) obj.shenaseStructureId = treeID
        else if (treetype === 3) obj.parentId = treeID
        debugger

        debugger
        await axios.post(API_URL + api + '/', obj)
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
                {...register('comBaseNameEn', {required: true})}
              />
            </FormControl>
            <FormControl col={12} label={intl.formatMessage({id: 'Model.PayeInfo.Description'})}>
              <input
                className={getValidationClass(touchedFields.description, errors.description)}
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
