import {useEffect, useState} from 'react'
import {Dialog} from '@progress/kendo-react-dialogs'
import {defaultPageTitles, FormMode} from '@core/forms'
import axios from 'axios'
import {toast} from 'react-toastify'
import {FieldError, useForm} from 'react-hook-form'
import {FormControl, DialogActions} from '@core/components'
import {useIntl} from 'react-intl'
//import {config} from 'process'
import {useLayout} from '_metronic/layout/core'
type PropsType = {
  mode: FormMode
  onClose: () => void
  item?: AgreementsModel
}
export type AgreementsModel = {
  id?: number
  agreementType: number
  membershipType: number
  description: string
}
const pageTitles = defaultPageTitles

export function AgreementsCreateDialog({mode, onClose, item}: PropsType) {
  const intl = useIntl()
  const {config} = useLayout()
  const API_URLCoding = process.env.REACT_APP_API_URLCoding || 'api'
  const [type, setType] = useState('1')
  const [membershipType, setMembershipType] = useState('1')
  const {
    register,
    handleSubmit,
    reset,
    formState: {errors, isDirty, touchedFields},
  } = useForm<AgreementsModel>({mode: 'all'})

  useEffect(() => {
    if (mode === 'edit') {
      debugger
      if (item?.agreementType !== undefined) setType(item?.agreementType.toString())
      if (item?.membershipType !== undefined) setMembershipType(item?.membershipType.toString())
      reset(item)
    }
  }, [mode, item, reset])

  const onSubmit = handleSubmit(async (data) => {
    let url = API_URLCoding + 'Agreements'
    data.agreementType = parseInt(type)
    data.membershipType = parseInt(membershipType)
    try {
      if (mode !== 'edit') await axios.post(url + '/CreateJson', data)
      else await axios.put(url + '/UpdateJson', data)
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
            <FormControl col={6} label={intl.formatMessage({id: 'Model.Agreements.AgreementType'})}>
              <div className='col-sm-2'>
                <select
                  className='form-select  form-select-sm'
                  style={{marginLeft: '21px', width: '200px', fontFamily: config.main?.font}}
                  name='operator'
                  onChange={(e) => setType(e.target.value)}
                  value={type}
                >
                  <option value='1'>اصلی</option>
                  <option value='2'>فاکتور فروش</option>
                  <option value='3'>انتخاب آژانس</option>
                </select>
              </div>
            </FormControl>
            <FormControl
              col={6}
              label={intl.formatMessage({id: 'Model.Agreements.MembershipType'})}
            >
              <div className='col-sm-2'>
                <select
                  className='form-select  form-select-sm'
                  style={{marginLeft: '21px', width: '200px', fontFamily: config.main?.font}}
                  name='operator'
                  onChange={(e) => setMembershipType(e.target.value)}
                  value={membershipType}
                >
                  <option value='1'>حقیقی</option>
                  <option value='2'>حققوقی</option>
                </select>
              </div>
            </FormControl>
            {/* <FormControl col={12} label={intl.formatMessage({id: 'Model.Agreements.Description'})}>
              <input
                className={getValidationClass(touchedFields.description, errors.description)}
                autoFocus={true}
                {...register('description', {required: true})}
              />
            </FormControl> */}
            <FormControl col={6} label={intl.formatMessage({id: 'Model.Agreements.Description'})}>
              <textarea
                autoFocus={true}
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
