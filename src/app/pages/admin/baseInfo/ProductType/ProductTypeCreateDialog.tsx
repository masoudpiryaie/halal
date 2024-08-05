import {useEffect} from 'react'
import {Dialog} from '@progress/kendo-react-dialogs'
import {defaultPageTitles, FormMode} from '@core/forms'
import axios from 'axios'
import {toast} from 'react-toastify'
import {Controller, FieldError, useForm} from 'react-hook-form'
import {FormControl, DialogActions, ComboBox} from '@core/components'
import {useIntl} from 'react-intl'

type PropsType = {
  mode: FormMode
  onClose: () => void
  item?: ProductTypeModel
}
export type ProductTypeModel = {
  id?: number
  name: string
  code: string
  isActive: boolean
  productGroupId: number
  latinName: string
  description: string
}
const pageTitles = defaultPageTitles

export function ProductTypeCreateDialog({mode, onClose, item}: PropsType) {
  const intl = useIntl()
  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: {errors, isDirty, touchedFields},
  } = useForm<ProductTypeModel>({mode: 'all'})

  useEffect(() => {
    if (mode === 'edit') {
      reset(item)
    }
  }, [mode, item, reset])

  const onSubmit = handleSubmit(async (data) => {
    let url = 'productType'
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
            <FormControl col={6} label={intl.formatMessage({id: 'Model.ProductType.Name'})}>
              <input
                className={getValidationClass(touchedFields.name, errors.name)}
                autoFocus={true}
                {...register('name', {required: true})}
              />
            </FormControl>
            <FormControl col={6} label={intl.formatMessage({id: 'Model.ProductType.LatinName'})}>
              <input
                className={getValidationClass(touchedFields.latinName, errors.latinName)}
                autoFocus={true}
                {...register('latinName', {required: true})}
              />
            </FormControl>
            <FormControl col={6} label={intl.formatMessage({id: 'Model.ProductType.Code'})}>
              <input
                className={getValidationClass(touchedFields.code, errors.code)}
                autoFocus={true}
                {...register('code', {required: true})}
              />
            </FormControl>
            <FormControl col={6} label={intl.formatMessage({id: 'Model.ProductType.IsActive'})}>
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

            <FormControl
              col={6}
              label={intl.formatMessage({id: 'Model.ProductType.ProductGroupName'})}
            >
              <Controller
                name='productGroupId'
                control={control}
                render={({field: {onChange, onBlur, value, ref}}) => (
                  <ComboBox
                    endpoint='productGroup/combo'
                    preSelectedId={item?.productGroupId}
                    onChange={onChange}
                    onBlur={onBlur}
                  />
                )}
              />
            </FormControl>
            <FormControl col={12} label={intl.formatMessage({id: 'Model.ProductType.Description'})}>
              <textarea
                readOnly={false}
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
