import {useEffect} from 'react'
import {Dialog} from '@progress/kendo-react-dialogs'
import {defaultPageTitles, FormMode} from '@core/forms'
import axios from 'axios'
import {toast} from 'react-toastify'
import {FieldError, useForm} from 'react-hook-form'
import {FormControl, DialogActions} from '@core/components'
import {StringLocale} from 'yup/lib/locale'
import {useIntl} from 'react-intl'

type PropsType = {
  mode: FormMode
  onClose: () => void
  item?: CompanyModel
}
export type CompanyModel = {
  id?: number
  name: string
  description: string
  latinName: string
  nationalCode: string
  economyCode: string
  latinAddress: string
  address: string
  ceoName: string
  ceoFamily: string
  ceoMobile: string
  ceoNationalCode: string
  ceoEmail: string
  agentName: string
  agentFamily: string
  agentMobile: string
  agentNationalCode: string
  agentEmail: string
}
const pageTitles = defaultPageTitles

export function CompanyCreateDialog({mode, onClose, item}: PropsType) {
  const intl = useIntl()
  const {
    register,
    handleSubmit,
    reset,
    formState: {errors, isDirty, touchedFields},
  } = useForm<CompanyModel>({mode: 'all'})

  useEffect(() => {
    if (mode === 'edit') {
      reset(item)
    }
  }, [mode, item, reset])

  const onSubmit = handleSubmit(async (data) => {
    let url = 'company'
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
            <FormControl col={3} label='نام'>
              <input
                className={getValidationClass(touchedFields.name, errors.name)}
                autoFocus={true}
                {...register('name', {required: true, minLength: 2})}
              />
            </FormControl>
            <FormControl col={3} label='نام لاتین'>
              <input
                className={getValidationClass(touchedFields.latinName, errors.latinName)}
                autoFocus={true}
                {...register('latinName', {required: true})}
              />
            </FormControl>
            <FormControl col={3} label='شناسه ملی'>
              <input
                className={getValidationClass(touchedFields.nationalCode, errors.nationalCode)}
                autoFocus={true}
                {...register('nationalCode', {required: true})}
              />
            </FormControl>
            <FormControl col={3} label='کد اقتصادی'>
              <input
                className={getValidationClass(touchedFields.economyCode, errors.economyCode)}
                autoFocus={true}
                {...register('economyCode', {required: true})}
              />
            </FormControl>
            <FormControl col={6} label='آدرس'>
              <textarea {...register('address')} />
            </FormControl>
            <FormControl col={6} label='آدرس لاتین'>
              <textarea {...register('latinAddress')} />
            </FormControl>
            <FormControl col={6} label='ملاحضات'>
              <textarea {...register('description')} />
            </FormControl>
            <FormControl col={3} label='نام'>
              <input
                className={getValidationClass(touchedFields.ceoName, errors.ceoName)}
                autoFocus={true}
                {...register('ceoName', {required: true})}
              />
            </FormControl>
            <FormControl col={3} label='نام خانوادگی'>
              <input
                className={getValidationClass(touchedFields.ceoFamily, errors.ceoFamily)}
                autoFocus={true}
                {...register('ceoFamily', {required: true})}
              />
            </FormControl>
            <FormControl col={3} label='موبایل'>
              <input
                className={getValidationClass(touchedFields.ceoMobile, errors.ceoMobile)}
                autoFocus={true}
                {...register('ceoMobile', {required: true})}
              />
            </FormControl>
            <FormControl col={3} label='کد ملی'>
              <input
                className={getValidationClass(
                  touchedFields.ceoNationalCode,
                  errors.ceoNationalCode
                )}
                autoFocus={true}
                {...register('ceoNationalCode', {required: true})}
              />
            </FormControl>
            <FormControl col={3} label='ایمیل'>
              <input
                className={getValidationClass(touchedFields.ceoEmail, errors.ceoEmail)}
                autoFocus={true}
                {...register('ceoEmail', {required: true})}
              />
            </FormControl>
            <FormControl col={3} label='نام'>
              <input
                className={getValidationClass(touchedFields.agentName, errors.agentName)}
                autoFocus={true}
                {...register('agentName', {required: true})}
              />
            </FormControl>
            <FormControl col={3} label='نام خانوادگی'>
              <input
                className={getValidationClass(touchedFields.agentFamily, errors.agentFamily)}
                autoFocus={true}
                {...register('agentFamily', {required: true})}
              />
            </FormControl>
            <FormControl col={3} label='موبایل'>
              <input
                className={getValidationClass(touchedFields.agentMobile, errors.agentMobile)}
                autoFocus={true}
                {...register('agentMobile', {required: true})}
              />
            </FormControl>
            <FormControl col={3} label='کد ملی'>
              <input
                className={getValidationClass(
                  touchedFields.agentNationalCode,
                  errors.agentNationalCode
                )}
                autoFocus={true}
                {...register('agentNationalCode', {required: true})}
              />
            </FormControl>
            <FormControl col={3} label='ایمیل'>
              <input
                className={getValidationClass(touchedFields.agentEmail, errors.agentEmail)}
                autoFocus={true}
                {...register('agentEmail', {required: true})}
              />
            </FormControl>
          </form>
        </div>
        <DialogActions mode={mode} onClose={onClose} resetForm={resetForm}></DialogActions>
      </Dialog>
    </div>
  )
}
