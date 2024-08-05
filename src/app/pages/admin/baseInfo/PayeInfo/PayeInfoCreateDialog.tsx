import {useEffect, useState} from 'react'
import {Dialog} from '@progress/kendo-react-dialogs'
import {defaultPageTitles, FormMode} from '@core/forms'
import axios from 'axios'
import {toast} from 'react-toastify'
import {FieldError, useForm} from 'react-hook-form'
import {FormControl, DialogActions, BtnAction} from '@core/components'
import {useIntl} from 'react-intl'
import {StructureTreeDialog} from './StructureTreeDialog'

type PropsType = {
  mode: FormMode
  onClose: () => void
  item?: PayeInfoModel
}
export type PayeInfoModel = {
  id?: number
  structureId: number
  comBaseNameFa: string
  comBaseNameEn: string
  nameSeparator: string
  descriptionFa: string
  descriptionEn: string
}
const pageTitles = defaultPageTitles

export function PayeInfoCreateDialog({mode, onClose, item}: PropsType) {
  const intl = useIntl()
  const API_URL = process.env.REACT_APP_API_URLCoding || 'api'
  const [showStructureTreeDialog, setshowStructureTreeDialog] = useState(false)
  const [gpcStructureId, setgpcStructureId] = useState(0)
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
    let url = API_URL + 'ServicePayehInfo/'

    try {
      if (mode === 'edit') {
        await axios.put(url, data)
      } else {
        data.structureId = gpcStructureId
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
  const handleClose = () => {
    setshowStructureTreeDialog(false)
  }
  const openTree = () => {
    setshowStructureTreeDialog(true)
  }
  const onEmbarkDialogSubmit = (item: number) => {
    setgpcStructureId(item)
  }
  return (
    <div>
      {showStructureTreeDialog && (
        <StructureTreeDialog onSubmit={onEmbarkDialogSubmit} mode={mode} onClose={handleClose} />
      )}
      <Dialog title={pageTitles[mode]} onClose={onClose}>
        <div>
          <form id='dialog-form' onSubmit={onSubmit} className='row g-3'>
            <div className='row g-1'>
              <BtnAction
                className={'col-lg-5'}
                onClick={openTree}
                label='ساختار طبقه بندی ملی خدمات'
              />
            </div>
            <FormControl col={6} label={intl.formatMessage({id: 'Model.PayeInfo.ComBaseNameFa'})}>
              <input
                className={getValidationClass(touchedFields.comBaseNameFa, errors.comBaseNameFa)}
                autoFocus={true}
                {...register('comBaseNameFa', {required: true})}
              />
            </FormControl>
            <FormControl col={6} label={intl.formatMessage({id: 'Model.PayeInfo.ComBaseNameEn'})}>
              <input
                className={getValidationClass(touchedFields.comBaseNameEn, errors.comBaseNameEn)}
                {...register('comBaseNameEn', {required: true})}
              />
            </FormControl>

            <FormControl col={6} label={'nameSeparator'}>
              <input
                className={getValidationClass(touchedFields.nameSeparator, errors.nameSeparator)}
                {...register('nameSeparator', {required: true})}
              />
            </FormControl>
            <FormControl col={6} label={intl.formatMessage({id: 'Model.PayeInfo.DescriptionFa'})}>
              <textarea
                className={getValidationClass(touchedFields.descriptionFa, errors.descriptionFa)}
                {...register('descriptionFa', {required: true})}
              />
            </FormControl>
            <FormControl col={6} label={intl.formatMessage({id: 'Model.PayeInfo.DescriptionEn'})}>
              <textarea
                className={getValidationClass(touchedFields.descriptionEn, errors.descriptionEn)}
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
