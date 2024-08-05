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
  item?: UnitOfWeightsModel
}
export type UnitOfWeightsModel = {
  id?: number
  titleFa: string
  titleEn: string
}
const pageTitles = defaultPageTitles

export function UnitOfWeightsCreateDialog({mode, onClose, item}: PropsType) {
  const intl = useIntl()
  const API_URL = process.env.REACT_APP_API_URLCoding || 'api'
  const [isActive, setIsActive] = useState('true')
  const {
    register,
    handleSubmit,
    reset,
    formState: {errors, isDirty, touchedFields},
  } = useForm<UnitOfWeightsModel>({mode: 'all'})

  useEffect(() => {
    if (mode === 'edit') {
      reset(item)
    }
  }, [mode, item, reset])

  const onSubmit = handleSubmit(async (data) => {
    let url = API_URL + 'UnitOfWeights'

    try {
      if (mode !== 'edit') {
        await axios.post(url, data)
      } else {
        var formdata = new FormData()
        if (data.id !== undefined) formdata.append('id', data.id.toString())
        formdata.append('titleFa', data.titleFa)
        formdata.append('titleEn', data.titleEn)
        await axios.put(url, formdata)
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
            <FormControl col={6} label={intl.formatMessage({id: 'Model.PureContentUnits.TitleFa'})}>
              <input
                className={getValidationClass(touchedFields.titleFa, errors.titleFa)}
                autoFocus={true}
                {...register('titleFa', {required: true})}
              />
            </FormControl>
            <FormControl col={6} label={intl.formatMessage({id: 'Model.PureContentUnits.TitleEn'})}>
              <input
                className={getValidationClass(touchedFields.titleEn, errors.titleEn)}
                autoFocus={true}
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
