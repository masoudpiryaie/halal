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
  item?: ServicesModel
}
export type ServicesModel = {
  id?: number
  title: string
  precodeDigitCount: number
  isEnabled: boolean
  codeCount: number
  serviceType: number
  codeType: number
  payType: number
  isPublic: boolean
  isInternal: boolean
}
const pageTitles = defaultPageTitles

export function ServicesCreateDialog({mode, onClose, item}: PropsType) {
  const intl = useIntl()
  //const API_URLCoding = process.env.REACT_APP_API_URL || 'api'
  const API_URLCoding = 'http://auth.pardcoservice.ir/api/v1/'
  const [PayType, setPayType] = useState('false')
  const [Public, setIsPublic] = useState('false')
  const [Internal, setInternal] = useState('false')
  const [CodeCount, setCodeCount] = useState('10')
  const [ServiceType, setServiceType] = useState('0')
  const [CodeType, setCodeType] = useState('0')

  const {
    register,
    handleSubmit,
    reset,
    formState: {errors, isDirty, touchedFields},
  } = useForm<ServicesModel>({mode: 'all'})

  useEffect(() => {
    if (mode === 'edit') {
      reset(item)
    }
  }, [mode, item, reset])

  const onSubmit = handleSubmit(async (data) => {
    debugger
    data.isEnabled = true
    data.serviceType = parseInt(ServiceType)
    data.codeType = parseInt(CodeType)
    data.codeCount = parseInt(CodeCount)
    data.payType = PayType === 'true' ? 1 : 0
    data.isPublic = JSON.parse(Public.toLowerCase())
    data.isInternal = JSON.parse(Internal.toLowerCase())
    data.precodeDigitCount = 5
    let url = API_URLCoding + 'services'

    try {
      if (mode !== 'edit') await axios.post(url, data)
      else await axios.put(url, data)
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
  const handleChangeServiceType = (e: any) => {}
  const handleChangeCodeType = (e: any) => {}
  const handleChangePayType = (e: any) => {}

  return (
    <div>
      <Dialog title={pageTitles[mode]} onClose={onClose}>
        <div>
          <form id='dialog-form' onSubmit={onSubmit} className='row g-3'>
            <FormControl col={4} label={intl.formatMessage({id: 'Model.Services.Title'})}>
              <input
                className={getValidationClass(touchedFields.title, errors.title)}
                autoFocus={true}
                {...register('title', {required: true})}
              />
            </FormControl>
            <FormControl
              col={4}
              label={intl.formatMessage({id: 'Model.Services.PrecodeDigitCount'})}
            >
              <input
                className={getValidationClass(touchedFields.title, errors.title)}
                autoFocus={true}
                {...register('precodeDigitCount', {required: true})}
              />
            </FormControl>
            <FormControl col={4} label={intl.formatMessage({id: 'Model.Services.ServiceType'})}>
              <select
                className='form-select  form-select-sm'
                style={{marginLeft: '21px', width: '200px'}}
                name='ServiceType'
                onChange={(e) => setServiceType(e.target.value.toString())}
              >
                <option value='0'>{intl.formatMessage({id: 'Model.Services.PackageST'})}</option>
                <option value='1'>{intl.formatMessage({id: 'Model.Services.CodeST'})}</option>
                <option value='2'>
                  {intl.formatMessage({id: 'Model.Services.SubscriptionST'})}
                </option>
              </select>
            </FormControl>
            <FormControl col={4} label={intl.formatMessage({id: 'Model.Services.CodeType'})}>
              <select
                className='form-select  form-select-sm'
                style={{marginLeft: '21px', width: '200px'}}
                name='CodeType'
                onChange={(e) => setCodeType(e.target.value.toString())}
              >
                <option value='0'>{intl.formatMessage({id: 'Model.Services.GLN'})}</option>
                <option value='1'>{intl.formatMessage({id: 'Model.Services.ServiceCode'})}</option>
                <option value='2'>{intl.formatMessage({id: 'Model.Services.GTIN'})}</option>
              </select>
            </FormControl>
            <FormControl col={4} label={intl.formatMessage({id: 'Model.Services.CodeCount'})}>
              <select
                onChange={(e) => setCodeCount(e.target.value.toString())}
                className='form-select  form-select-sm'
              >
                <option value='10'>{intl.formatMessage({id: 'Model.Services.10'})}</option>
                <option value='100'>{intl.formatMessage({id: 'Model.Services.100'})}</option>
                <option value='1000'>{intl.formatMessage({id: 'Model.Services.1000'})}</option>
                <option value='10000'>{intl.formatMessage({id: 'Model.Services.10000'})}</option>
              </select>
            </FormControl>
            <FormControl col={4} label={intl.formatMessage({id: 'Model.Services.PayType'})}>
              <div className='col form-check form-check-custom form-check-solid form-check-success me-6'>
                <label className='form-label'>
                  {intl.formatMessage({id: 'Model.Services.PackagePT'})}
                  <input
                    className='form-check-input'
                    type='radio'
                    name='PayT'
                    value={'true'}
                    checked={PayType === 'true'}
                    onChange={(e) => setPayType(e.target.value)}
                  />
                </label>

                <label className='form-label'>
                  {intl.formatMessage({id: 'Model.Services.CodePT'})}
                  <input
                    className='form-check-input'
                    type='radio'
                    name='PayT'
                    value={'false'}
                    checked={PayType === 'false'}
                    onChange={(e) => setPayType(e.target.value)}
                  />
                </label>
              </div>
            </FormControl>
            <FormControl col={4} label={intl.formatMessage({id: 'Model.Services.Internal'})}>
              <div className='col form-check form-check-custom form-check-solid form-check-success me-6'>
                <label className='form-label'>
                  {intl.formatMessage({id: 'Model.Services.Internal'})}
                  <input
                    className='form-check-input'
                    type='radio'
                    name='Int'
                    value={'true'}
                    checked={Internal === 'true'}
                    onChange={(e) => setInternal(e.target.value)}
                  />
                </label>

                <label className='form-label'>
                  {intl.formatMessage({id: 'Model.Services.NotInternal'})}
                  <input
                    className='form-check-input'
                    type='radio'
                    name='Int'
                    value={'false'}
                    checked={Internal === 'false'}
                    onChange={(e) => setInternal(e.target.value)}
                  />
                </label>
              </div>
            </FormControl>
            <FormControl col={4} label={intl.formatMessage({id: 'Model.Services.IsPublic'})}>
              <div className='col form-check form-check-custom form-check-solid form-check-success me-6'>
                <label className='form-label'>
                  {intl.formatMessage({id: 'Model.Services.NotPublic'})}
                  <input
                    className='form-check-input'
                    type='radio'
                    name='pub'
                    value={'false'}
                    checked={Public === 'false'}
                    onChange={(e) => setIsPublic(e.target.value)}
                  />
                </label>

                <label className='form-label'>
                  {intl.formatMessage({id: 'Model.Services.Public'})}
                  <input
                    className='form-check-input'
                    type='radio'
                    name='pub'
                    value={'true'}
                    checked={Public === 'true'}
                    onChange={(e) => setIsPublic(e.target.value)}
                  />
                </label>
              </div>
            </FormControl>
          </form>
        </div>
        <DialogActions mode={mode} onClose={onClose} resetForm={resetForm}></DialogActions>
      </Dialog>
    </div>
  )
}
