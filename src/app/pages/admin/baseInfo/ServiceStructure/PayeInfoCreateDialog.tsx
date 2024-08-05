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
  treename: string
}
export type PayeInfoModel = {
  structureId?: number
  id?: number
  comBaseNameFa: string
  comBaseNameEn: string
  keyCode: string
  nameSeparator: string
  descriptionFa: string
  descriptionEn: string
}
const pageTitles = defaultPageTitles

export function PayeInfoCreateDialog({mode, onClose, item, treeID, treename, api}: PropsType) {
  const intl = useIntl()
  //const API_URL = process.env.REACT_APP_API_URLCoding || 'api'
  // const API_URLCoding = API_URL + api //process.env.REACT_APP_API_URL || 'api'
  const API_URL = process.env.REACT_APP_API_URLCoding || 'api'
  const {
    register,
    handleSubmit,
    reset,
    getValues,
    formState: {errors, isDirty, touchedFields},
  } = useForm<PayeInfoModel>({mode: 'all'})

  useEffect(() => {
    if (mode === 'edit') {
      reset(item)
    }
  }, [mode, item, reset])

  const onSubmit = handleSubmit(async (data) => {
    try {
      var url = API_URL + 'ServicePayehInfo'
      if (mode === 'edit') {
        data.id = item?.id
        await axios.put(url, data)
      } else {
        data.structureId = treeID
        await axios.post(url, data)
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
  const getValidationClass = (
    touched: boolean | undefined,
    error: FieldError | undefined,
    name: any
  ) => {
    if (mode === 'edit') return error ? 'is-invalid' : 'is-valid'
    else {
      if (touched === true) {
        return error ? 'is-invalid' : 'is-valid'
      }
    }

    // var valid = ''
    // if (name === 'comBaseNameFa') valid = getValues('comBaseNameFa')
    // if (name === 'comBaseNameEn') valid = getValues('comBaseNameEn')
    // if (name === 'keyCode') valid = getValues('keyCode')
    // if (name === 'nameSeparator') valid = getValues('nameSeparator')
    // if (name === 'descriptionFa') valid = getValues('descriptionFa')
    // if (name === 'descriptionEn') valid = getValues('descriptionEn')
    // debugger
    // if (valid !== undefined) {
    //   return error ? 'is-invalid' : 'is-valid'
    // }
  }
  return (
    <div>
      <Dialog title={pageTitles[mode]} onClose={onClose} style={{zIndex: 90000}}>
        <div>
          <form id='dialog-form' onSubmit={onSubmit} className='row g-3'>
            <div className='row g-3'>
              {' '}
              <div className='col-md-3 fv-row col-form-label'> ساختار انتخابی</div>
              <div className='col-md-3 fv-row col-form-label'> {treename}</div>
            </div>
            <FormControl col={6} label={intl.formatMessage({id: 'Model.PayeInfo.ComBaseNameFa'})}>
              <input
                className={getValidationClass(
                  touchedFields.comBaseNameFa,
                  errors.comBaseNameFa,
                  'comBaseNameFa'
                )}
                autoFocus={true}
                {...register('comBaseNameFa', {required: true})}
              />
            </FormControl>
            <FormControl col={6} label={intl.formatMessage({id: 'Model.PayeInfo.ComBaseNameEn'})}>
              <input
                className={getValidationClass(
                  touchedFields.comBaseNameEn,
                  errors.comBaseNameEn,
                  'comBaseNameEn'
                )}
                {...register('comBaseNameEn', {required: true})}
              />
            </FormControl>
            <FormControl col={6} label={'keyCode'}>
              <input
                className={getValidationClass(touchedFields.keyCode, errors.keyCode, 'keyCode')}
                {...register('keyCode', {required: true})}
              />
            </FormControl>
            <FormControl col={6} label={'nameSeparator'}>
              <input
                className={getValidationClass(
                  touchedFields.nameSeparator,
                  errors.nameSeparator,
                  'nameSeparator'
                )}
                {...register('nameSeparator', {required: true})}
              />
            </FormControl>
            <FormControl col={6} label={intl.formatMessage({id: 'Model.PayeInfo.DescriptionFa'})}>
              <textarea
                className={getValidationClass(
                  touchedFields.descriptionFa,
                  errors.descriptionFa,
                  'descriptionFa'
                )}
                {...register('descriptionFa', {required: true})}
              />
            </FormControl>
            <FormControl col={6} label={intl.formatMessage({id: 'Model.PayeInfo.DescriptionEn'})}>
              <textarea
                className={getValidationClass(
                  touchedFields.descriptionEn,
                  errors.descriptionEn,
                  'descriptionEn'
                )}
                {...register('descriptionEn', {required: true})}
              />
            </FormControl>
          </form>
        </div>
        <DialogActions mode={mode} onClose={onClose} resetForm={resetForm}></DialogActions>
      </Dialog>
    </div>
  )
}
