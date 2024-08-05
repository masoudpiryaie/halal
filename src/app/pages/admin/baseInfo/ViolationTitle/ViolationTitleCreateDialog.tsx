import {useEffect} from 'react'
import {Dialog} from '@progress/kendo-react-dialogs'
import {defaultPageTitles, FormMode} from '@core/forms'
import axios from 'axios'
import {toast} from 'react-toastify'
import {Controller, FieldError, useForm} from 'react-hook-form'
import {FormControl, DialogActions, ComboBox} from '@core/components'
import {useIntl} from 'react-intl'
import {ViolationType} from 'app/pages/admin/baseInfo/ViolationTitle/OptionItem'

type PropsType = {
  mode: FormMode
  onClose: () => void
  item?: ViolationTitleModel
}
export type ViolationTitleModel = {
  id?: number
  name: string
  type: string
  isActive: boolean
  countryId: number
}
const pageTitles = defaultPageTitles

export function ViolationTitleCreateDialog({mode, onClose, item}: PropsType) {
  const intl = useIntl()
  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: {errors, isDirty, touchedFields},
  } = useForm<ViolationTitleModel>({mode: 'all'})

  useEffect(() => {
    if (mode === 'edit') {
      reset(item)
    }
  }, [mode, item, reset])

  const onSubmit = handleSubmit(async (data) => {
    let url = 'violationTitle'
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
      <Dialog title={pageTitles[mode]} onClose={onClose}>
        <div>
          <form id='dialog-form' onSubmit={onSubmit} className='row g-3'>
            <FormControl col={6} label={intl.formatMessage({id: 'Model.ViolationTitle.Name'})}>
              <input
                className={getValidationClass(touchedFields.name, errors.name)}
                autoFocus={true}
                {...register('name', {required: true})}
              />
            </FormControl>
            <FormControl col={6} label={intl.formatMessage({id: 'Model.ViolationTitle.IsActive'})}>
              <select
                className={getValidationClass(touchedFields.isActive, errors.isActive)}
                {...register('isActive', {setValueAs: (v) => v === 'true'})}
              >
                <option value='true'>
                  {intl.formatMessage({id: 'FormControl.Input.Select.Active'})}
                </option>
                <option value='false'>
                  {intl.formatMessage({id: 'FormControl.Input.Select.Inactive'})}
                </option>
              </select>
            </FormControl>

            <FormControl col={6} label={intl.formatMessage({id: 'Model.Observer.CountryName'})}>
              <Controller
                name='countryId'
                control={control}
                render={({field: {onChange, onBlur, value, ref}}) => (
                  <ComboBox
                    endpoint='country/combo'
                    preSelectedId={item?.countryId}
                    onChange={onChange}
                    onBlur={onBlur}
                  />
                )}
              />
            </FormControl>
            <FormControl col={6} label={intl.formatMessage({id: 'Model.ViolationTitle.Type'})}>
              <select
                className={getValidationClass(touchedFields.type, errors.type)}
                {...register('type', {required: true, setValueAs: (v) => v})}
              >
                <ViolationType></ViolationType>
              </select>
            </FormControl>
          </form>
        </div>
        <DialogActions mode={mode} onClose={onClose} resetForm={resetForm}></DialogActions>
      </Dialog>
    </div>
  )
}
