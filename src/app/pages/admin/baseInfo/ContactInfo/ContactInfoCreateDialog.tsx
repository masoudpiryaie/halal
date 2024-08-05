import {useEffect, useState} from 'react'
import {Dialog} from '@progress/kendo-react-dialogs'
import {defaultPageTitles, FormMode} from '@core/forms'
import axios from 'axios'
import {toast} from 'react-toastify'
import {Controller, FieldError, useForm} from 'react-hook-form'
import {ComboBoxLocal, FormControl, DialogActions} from '@core/components'
import {useIntl} from 'react-intl'

type PropsType = {
  mode: FormMode
  onClose: () => void
  item?: ContactInfoModel
}
export type ContactInfoModel = {
  id?: number
  addressFa: string
  addressEn: string
  memberId: number
  mobile: string
  fax: string
  tel: string
  postalCode: string
  website: string
  long: string
  lat: string
  addressDesc: string
  street: string
  alley: string
  plaque: string
  unit: number
  isDefault: string
  cityId: number
  cityName: string
  addressTypeId: number
  addressTypeName: string
  activityTypeId: number
  activityTypeName: string
  activityFieldTypeId: number
  activityFieldTypeName: string
  activityDesc: string
  fieldDesc: string
  provinceId: number
  provinceName: string
}
const pageTitles = defaultPageTitles

export function ContactInfoCreateDialog({mode, onClose, item}: PropsType) {
  const intl = useIntl()
  const API_URL = process.env.REACT_APP_API_URLCoding || 'api'
  const [isActive, setIsActive] = useState('true')
  const [dataProvinces, setdataProvinces] = useState<any[]>([])
  const [dataCity, setdataCity] = useState<any[]>([])
  const [provinceId, setprovinceId] = useState(0)
  const [cityId, setCityId] = useState(0)
  const [addressTypeId, setaddressTypeId] = useState(0)

  const [addressType, setaddressType] = useState<any[]>([])
  const [activityType, setactivityType] = useState<any[]>([])
  const [activityFieldType, setactivityFieldType] = useState<any[]>([])
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: {errors, isDirty, touchedFields},
  } = useForm<ContactInfoModel>({mode: 'all'})

  useEffect(() => {
    fetchcombo1()
    fetchcombo2()
    fetchcombo3()
    fetchcombo4()

    if (mode === 'edit') {
      reset(item)
    }
  }, [mode, item, reset])
  const fetchcombo1 = async () => {
    try {
      let url = API_URL + 'Provinces/Search'
      const fetchResponse = await fetch(`${url}`, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
        },
      })
      const resp = await fetchResponse.json()
      setdataProvinces(resp.value)
    } catch (error) {
      console.log(error)
    }
  }
  const onChangeCity = (event: any) => {
    setCityId(event)
  }
  const onChangeProvinces = async (event: any) => {
    setprovinceId(event)

    try {
    } catch (error) {
      console.log(error)
    }
  }
  const fetchcombo2 = async () => {
    try {
      let url = API_URL + 'AddressType/GetDropdown'
      const fetchResponse = await fetch(`${url}`, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
        },
      })
      const resp = await fetchResponse.json()
      setaddressType(resp.value)
    } catch (error) {
      console.log(error)
    }
  }
  const fetchcombo3 = async () => {
    try {
      let url = API_URL + 'ActivityType/GetDropdown'
      const fetchResponse = await fetch(`${url}`, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
        },
      })
      const resp = await fetchResponse.json()
      setactivityType(resp.value)
    } catch (error) {
      console.log(error)
    }
  }
  const fetchcombo4 = async () => {
    try {
      let url = API_URL + 'ActivityFieldType/GetDropdown'
      const fetchResponse = await fetch(`${url}`, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
        },
      })
      const resp = await fetchResponse.json()
      setactivityFieldType(resp.value)
    } catch (error) {
      console.log(error)
    }
  }

  const onSubmit = handleSubmit(async (data) => {
    let url = API_URL + 'ContactInfo'

    try {
      if (mode !== 'edit') {
        await axios.post(url, data)
      } else {
        var formdata = new FormData()
        if (data.id !== undefined) formdata.append('id', data.id.toString())
        formdata.append('addressFa', data.addressFa)
        formdata.append('addressEn', data.addressEn)
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

  const getValidationClasscombo = (data: number | undefined) => {
    return data === 0 ? 'is-invalid form-control' : 'is-valid  form-control'
  }
  const handleChangeagentaddressType = (event: any) => {
    setaddressTypeId(event)
  }
  const handleChangeagentactivityType = (event: any) => {
    setactivityType(event)
  }
  const handleChangeagentactivityField = (event: any) => {
    setactivityFieldType(event)
  }
  return (
    <div>
      <Dialog title={pageTitles[mode]} onClose={onClose}>
        <div>
          <form id='dialog-form' onSubmit={onSubmit} className='row g-3'>
            <FormControl col={6} label={'آدرس فارسی'}>
              <input
                className={getValidationClass(touchedFields.addressFa, errors.addressFa)}
                autoFocus={true}
                {...register('addressFa', {required: true})}
              />
            </FormControl>
            <FormControl col={6} label={'عنوان انگلیسی'}>
              <input
                className={getValidationClass(touchedFields.addressEn, errors.addressEn)}
                {...register('addressEn', {required: true})}
              />
            </FormControl>
            <FormControl col={6} label={'موبایل '}>
              <input
                className={getValidationClass(touchedFields.mobile, errors.mobile)}
                {...register('mobile', {required: true})}
              />
            </FormControl>
            <FormControl col={6} label={'تلفن '}>
              <input
                className={getValidationClass(touchedFields.tel, errors.tel)}
                {...register('tel', {required: true})}
              />
            </FormControl>
            <FormControl col={6} label={'فکس '}>
              <input
                className={getValidationClass(touchedFields.fax, errors.fax)}
                {...register('fax', {required: true})}
              />
            </FormControl>
            <FormControl col={6} label={'کد پستی '}>
              <input
                className={getValidationClass(touchedFields.postalCode, errors.postalCode)}
                {...register('postalCode', {required: true})}
              />
            </FormControl>
            <FormControl col={6} label={'وب  '}>
              <input
                className={getValidationClass(touchedFields.website, errors.website)}
                {...register('website', {required: true})}
              />
            </FormControl>
            <FormControl col={6} label={'توضیحات  '}>
              <input
                className={getValidationClass(touchedFields.addressDesc, errors.addressDesc)}
                {...register('addressDesc', {required: true})}
              />
            </FormControl>
            <FormControl col={6} label={'خیابان  '}>
              <input
                className={getValidationClass(touchedFields.street, errors.street)}
                {...register('street', {required: true})}
              />
            </FormControl>
            <FormControl col={6} label={'کوچه  '}>
              <input
                className={getValidationClass(touchedFields.alley, errors.alley)}
                {...register('alley', {required: true})}
              />
            </FormControl>
            <FormControl col={6} label={'پلاک  '}>
              <input
                className={getValidationClass(touchedFields.plaque, errors.plaque)}
                {...register('plaque', {required: true})}
              />
            </FormControl>
            <FormControl col={6} label={'واحد  '}>
              <input
                className={getValidationClass(touchedFields.unit, errors.unit)}
                {...register('unit', {required: true})}
              />
            </FormControl>
            <FormControl col={6} label={'توضیح فعالیت  '}>
              <input
                className={getValidationClass(touchedFields.activityDesc, errors.activityDesc)}
                {...register('activityDesc', {required: true})}
              />
            </FormControl>
            <FormControl col={6} label={'توضیح زمینه  '}>
              <input
                className={getValidationClass(touchedFields.fieldDesc, errors.fieldDesc)}
                {...register('fieldDesc', {required: true})}
              />
            </FormControl>
            <FormControl col={6} label={'استان'}>
              <Controller
                name='provinceId'
                control={control}
                render={({field: {onChange, onBlur, value, ref}}) => (
                  <ComboBoxLocal
                    className={getValidationClasscombo(provinceId)}
                    filldata={dataProvinces}
                    endpoint={API_URL + 'AddressTitle/Search'}
                    preSelectedId={{id: item?.provinceId, title: item?.provinceName}}
                    onChange={onChangeProvinces}
                    onBlur={onBlur}
                  />
                )}
              />
            </FormControl>
            <FormControl col={6} label={'شهر'}>
              <Controller
                name='cityId'
                control={control}
                render={({field: {onChange, onBlur, value, ref}}) => (
                  <ComboBoxLocal
                    className={getValidationClasscombo(cityId)}
                    filldata={dataCity}
                    endpoint={API_URL + 'AddressTitle/Search'} // to do
                    preSelectedId={{id: item?.cityId, title: item?.cityName}}
                    onChange={onChangeCity}
                    onBlur={onBlur}
                  />
                )}
              />
            </FormControl>
            <FormControl col={6} label={intl.formatMessage({id: 'Model.Agents.AgentTypeId'})}>
              <Controller
                name='addressTypeId'
                control={control}
                render={({field: {onChange, onBlur, value, ref}}) => (
                  <ComboBoxLocal
                    filldata={addressType}
                    className={getValidationClasscombo(addressTypeId)}
                    endpoint={API_URL + 'AgentTypes/Search'}
                    preSelectedId={{id: item?.addressTypeId, title: item?.addressTypeName}}
                    onChange={handleChangeagentaddressType}
                    onBlur={onBlur}
                  />
                )}
              />
            </FormControl>
            {/* <FormControl col={6} label={intl.formatMessage({id: 'Model.Agents.AgentTypeId'})}>
              <Controller
                name='addressTypeId'
                control={control}
                render={({field: {onChange, onBlur, value, ref}}) => (
                  <ComboBoxLocal
                    filldata={activityType}
                    endpoint={API_URL + 'AgentTypes/Search'}
                    preSelectedId={{id: item?.addressTypeId, title: item?.addressTypeName}}
                    onChange={handleChangeagentactivityType}
                    onBlur={onBlur}
                  />
                )}
              />
            </FormControl>
            <FormControl col={6} label={intl.formatMessage({id: 'Model.Agents.AgentTypeId'})}>
              <Controller
                name='addressTypeId'
                control={control}
                render={({field: {onChange, onBlur, value, ref}}) => (
                  <ComboBoxLocal
                    filldata={activityFieldType}
                    endpoint={API_URL + 'AgentTypes/Search'}
                    preSelectedId={{id: item?.addressTypeId, title: item?.addressTypeName}}
                    onChange={handleChangeagentactivityField}
                    onBlur={onBlur}
                  />
                )}
              />
            </FormControl> */}
          </form>
        </div>
        <DialogActions mode={mode} onClose={onClose} resetForm={resetForm}></DialogActions>
      </Dialog>
    </div>
  )
}
