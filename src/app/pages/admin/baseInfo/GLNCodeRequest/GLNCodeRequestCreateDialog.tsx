import {useEffect, useState} from 'react'
import {Dialog} from '@progress/kendo-react-dialogs'
import {defaultPageTitles, FormMode} from '@core/forms'
import axios from 'axios'
import {toast} from 'react-toastify'
import {FieldError, useForm, Controller} from 'react-hook-form'
import {FormControl, DialogActions, ComboBox, Grid, ComboBoxLocal} from '@core/components'
import {useIntl} from 'react-intl'
import {OpanMapDialog} from 'app/pages/admin/baseInfo/Component/OpanMapDialog'
export interface IModelGr {
  title: string
  field: string
  show: boolean
}
type PropsType = {
  mode: FormMode
  onClose: () => void
  item?: GLNCodeRequestModel
  id?: number
  GS1PrefixId?: number
}
export type GLNCodeRequestModel = {
  id?: number
  telephoneNumber: string
  mobileNumber: string
  postalCode: string
  webAddress: string
  activityTypeId: number
  activityFieldId: number
  activityFieldDescription: string
  activityTypeDescription: string
  addressEn: string
  streetName: string
  alleyName: string
  plateNumber: string
  cityId: number
  provinceId: number
  fax: string
  addressTitleId: number
  gS1PrefixId: number
  status: number
  longitude: string
  latitude: string
  addressFa: string
  description: string
  provinceTitle?: String
  cityTitle?: string
  addressTitleTitle?: string
  activityTypeTitle?: string
  activityFieldTitle?: string
}
const pageTitles = defaultPageTitles

export function GLNCodeRequestCreateDialog({mode, onClose, item, id, GS1PrefixId}: PropsType) {
  const intl = useIntl()
  const API_URL = process.env.REACT_APP_API_URLCoding || 'api'
  const gr = localStorage.getItem('BreakHeadLinesGrid')
  const [type, setType] = useState('true')
  const [showPreDialog, setshowPreDialog] = useState(false)
  const [GS1PrefixName, setGS1PrefixName] = useState('-')
  const [gS1PrefixId, setGS1PrefixId] = useState(0)
  const [addFa, setaddFa] = useState('')
  const [description, setdescription] = useState('')
  const [addressEn, setaddressEn] = useState('')
  const [longitude, setLongitude] = useState('')
  const [latitude, setLatitude] = useState('')
  const [provinceId, setprovinceId] = useState(0)
  const [dataaddressTitle, setdataaddressTitle] = useState<any[]>([])
  const [dataProvinces, setdataProvinces] = useState<any[]>([])
  const [dataCity, setdataCity] = useState<any[]>([])
  const [aactivityType, setdataactivityType] = useState<any[]>([])
  const [activityField, setdataActivityField] = useState<any[]>([])
  const [addressTitleId, setaddressTitleId] = useState(0)
  const [cityId, setcityId] = useState(0)
  const [activityTypeId, setactivityTypeId] = useState(0)
  const [activityFieldId, setactivityFieldId] = useState(0)

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: {errors, isDirty, touchedFields},
  } = useForm<GLNCodeRequestModel>({mode: 'all'})

  useEffect(() => {
    fetchcombo()
    fetchcombo1()
    fetchcombo2()
    fetchcombo3()
    if (mode === 'edit') {
      debugger
      if (item?.description !== undefined) setdescription(item?.description)
      if (item?.addressFa !== undefined) setaddFa(item?.addressFa)
      if (item?.addressEn !== undefined) setaddressEn(item?.addressEn)
      if (item?.gS1PrefixId !== undefined) setGS1PrefixId(item?.gS1PrefixId)
      if (item?.longitude !== undefined) setLongitude(item?.longitude)
      if (item?.latitude !== undefined) setLatitude(item?.latitude)
      if (GS1PrefixId !== undefined) setGS1PrefixId(GS1PrefixId)
      if (item?.provinceId !== undefined) setprovinceId(item?.provinceId)
      reset(item)
    }
  }, [mode, item, reset])
  const fetchcombo = async () => {
    try {
      let url = API_URL + 'AddressTitle/Search'
      const fetchResponse = await fetch(`${url}`, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
        },
      })
      const resp = await fetchResponse.json()
      setdataaddressTitle(resp.value)

      debugger
    } catch (error) {
      console.log(error)
    }
  }
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

      debugger
    } catch (error) {
      console.log(error)
    }
  }
  const fetchcombo2 = async () => {
    try {
      let url = API_URL + 'ActivityType/Search'
      const fetchResponse = await fetch(`${url}`, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
        },
      })
      const resp = await fetchResponse.json()
      setdataactivityType(resp.value)

      debugger
    } catch (error) {
      console.log(error)
    }
  }
  const fetchcombo3 = async () => {
    try {
      let url = API_URL + 'ActivityField/Search'
      const fetchResponse = await fetch(`${url}`, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
        },
      })
      const resp = await fetchResponse.json()
      setdataActivityField(resp.value)

      debugger
    } catch (error) {
      console.log(error)
    }
  }

  const onSubmit = handleSubmit(async (data) => {
    let url = API_URL + 'GS1GLNs'

    debugger
    data.gS1PrefixId = gS1PrefixId
    data.status = 1
    data.longitude = longitude
    data.latitude = latitude
    data.addressFa = addFa
    data.addressEn = addressEn
    data.description = description
    data.provinceId = provinceId
    debugger
    try {
      if (mode !== 'edit') {
        await axios.post(url, data)
      } else {
        data.id = id
        delete data?.cityTitle
        delete data?.provinceTitle
        delete data?.addressTitleTitle
        delete data?.activityFieldTitle
        delete data?.activityTypeTitle

        await axios.put(url, data)
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
  const handleChangeoriginCountryId = (event: any) => {
    //setoriginCountryId(event)
  }
  const handleClose = () => {
    //setoriginCountryId(event)
  }
  const choseGS1Prefix = () => {
    setshowPreDialog(true)
  }
  var col = gr
    ? (JSON.parse(gr) as IModelGr[])
    : [
        {
          title: intl.formatMessage({id: 'Model.GTINCodeRequest.KeyCode'}),
          field: 'keyCode',
          show: true,
        },
        {
          title: intl.formatMessage({id: 'Model.GTINCodeRequest.AllowedCount'}),
          field: 'allowedCount',
          show: true,
        },
        {
          title: intl.formatMessage({id: 'Model.GTINCodeRequest.Remaining'}),
          field: 'remaining',
          show: true,
        },
      ]
  const clickRowGS1Prefixes = (item: any) => {
    setshowPreDialog(false)
    setGS1PrefixName(item.dataItem.keyCode)
    setGS1PrefixId(item.dataItem.id)
  }
  const [mapShow, setmapShow] = useState(false)
  const gomap = () => {
    setmapShow(true)
  }
  const onClosemap = () => {
    setmapShow(false)
  }

  function CallBack(ss: any) {
    setaddFa(ss)
    setLongitude(ss.split('-')[0])
    setLatitude(ss.split('-')[0])
  }
  const [hh, sethh] = useState('')
  const onChangeProvinces = async (event: any) => {
    setprovinceId(event)

    try {
      debugger
    } catch (error) {
      console.log(error)
    }
  }
  const getValidationClasscombo = (data: number | undefined) => {
    return data === 0 ? 'is-invalid form-control' : 'is-valid  form-control'
  }
  return (
    <div>
      {mapShow && <OpanMapDialog handleCallBack={CallBack} onClose={onClosemap} />}

      {showPreDialog && <GLNCodeRequestCreateDialog mode={mode} onClose={handleClose} />}
      <Dialog title={pageTitles[mode]} onClose={onClose}>
        <div hidden={!showPreDialog}>
          {' '}
          <div className={'row 12'}>
            <Grid
              style={{
                height: '300px',
              }}
              endpoint={API_URL + 'GS1Prefixes/GetUserActiveItems'}
              showActions={false}
              columns={col}
              name='GS1PrefixesGrid'
              Calcolumn={true}
              onRowClick={clickRowGS1Prefixes}
            ></Grid>
          </div>
        </div>
        <div hidden={showPreDialog}>
          <form id='dialog-form' onSubmit={onSubmit} className='row g-3'>
            {/* <div className='col-sm-2'>
              <label className='col-form-label col-sm-4'> عضو </label>
            </div>
            <div className='col-sm-4'>
              <ComboBox
                onChange={handleChangeoriginCountryId}
                style={{direction: 'rtl'}}
                endpoint={API_URL+'OriginCountrys/Search'}
              />
            </div> */}

            <div className='col-sm-6 form-check form-check-custom form-check-solid form-check-success'>
              <label className='form-label'>{'بین الملل'}</label>
              <input
                className='form-check-input'
                type='radio'
                name='type'
                value={'true'}
                checked={type === 'true'}
                onChange={(e) => setType(e.target.value)}
              />
              <label className='form-label'>{'داخلی'}</label>
              <input
                className='form-check-input'
                type='radio'
                name='type'
                value={'false'}
                checked={type === 'false'}
                onChange={(e) => setType(e.target.value)}
              />
            </div>

            <div className='col-sm-2'>
              <label className='col-form-label col-sm-4'> بسته </label>
            </div>
            <div className='col-sm-3' style={{marginBottom: 10}}>
              <label className='form-control'>{GS1PrefixName}</label>
            </div>
            <div className='col-sm-1'>
              {' '}
              <button onClick={choseGS1Prefix} className='k-button k-primary' type='submit'>
                ...
              </button>
            </div>

            <FormControl col={6} label={'نوع آدرس'}>
              <Controller
                name='addressTitleId'
                control={control}
                render={({field: {onChange, onBlur, value, ref}}) => (
                  <ComboBoxLocal
                    filldata={dataaddressTitle}
                    endpoint={API_URL + 'AddressTitle/Search'}
                    preSelectedId={{id: item?.addressTitleId, title: item?.addressTitleTitle}}
                    className={getValidationClasscombo(addressTitleId)}
                    onChange={(e: any) => setaddressTitleId(e)}
                    onBlur={onBlur}
                  />
                )}
              />
            </FormControl>

            <FormControl col={6} label={'تلفن'}>
              <input
                className={getValidationClass(
                  touchedFields.telephoneNumber,
                  errors.telephoneNumber
                )}
                autoFocus={true}
                {...register('telephoneNumber', {required: true})}
              />
            </FormControl>
            <FormControl col={6} label={'تلفن همراه'}>
              <input
                className={getValidationClass(touchedFields.mobileNumber, errors.mobileNumber)}
                {...register('mobileNumber', {required: true})}
              />
            </FormControl>
            <FormControl col={6} label={'فکس'}>
              <input
                className={getValidationClass(touchedFields.fax, errors.fax)}
                {...register('fax', {required: true})}
              />
            </FormControl>
            <FormControl col={6} label={'استان'}>
              <Controller
                name='provinceId'
                control={control}
                render={({field: {onChange, onBlur, value, ref}}) => (
                  <ComboBoxLocal
                    filldata={dataProvinces}
                    endpoint={API_URL + 'AddressTitle/Search'}
                    preSelectedId={{id: item?.provinceId, title: item?.provinceTitle}}
                    onChange={onChangeProvinces}
                    className={getValidationClasscombo(provinceId)}
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
                    filldata={dataCity}
                    endpoint={hh}
                    preSelectedId={{id: item?.cityId, title: item?.cityTitle}}
                    className={getValidationClasscombo(cityId)}
                    onChange={(e: any) => setcityId(e)}
                    onBlur={onBlur}
                    //textField='fullName'
                  />
                )}
              />
            </FormControl>
            <FormControl col={6} label={'کد پستی'}>
              <input
                className={getValidationClass(touchedFields.postalCode, errors.postalCode)}
                {...register('postalCode', {required: true})}
              />
            </FormControl>
            <FormControl col={6} label={'آدرس وب '}>
              <input
                className={getValidationClass(touchedFields.webAddress, errors.webAddress)}
                {...register('webAddress', {required: true})}
              />
            </FormControl>
            <FormControl col={6} label={'نوع فعالیت'}>
              <Controller
                name='activityTypeId'
                control={control}
                render={({field: {onChange, onBlur, value, ref}}) => (
                  <ComboBoxLocal
                    filldata={aactivityType}
                    endpoint={API_URL + 'AddressTitle/Search'}
                    preSelectedId={{id: item?.activityTypeId, title: item?.activityTypeTitle}}
                    className={getValidationClasscombo(activityTypeId)}
                    onChange={(e: any) => setactivityTypeId(e)}
                    onBlur={onBlur}
                    //textField='fullName'
                  />
                )}
              />
            </FormControl>
            <FormControl col={6} label={'زمینه فعالیت'}>
              <Controller
                name='activityFieldId'
                control={control}
                render={({field: {onChange, onBlur, value, ref}}) => (
                  <ComboBoxLocal
                    endpoint={API_URL + 'ActivityField/Search'}
                    filldata={activityField}
                    preSelectedId={{id: item?.activityFieldId, title: item?.activityFieldTitle}}
                    className={getValidationClasscombo(activityFieldId)}
                    onChange={(e: any) => setactivityFieldId(e)}
                    onBlur={onBlur}
                    //textField='fullName'
                  />
                )}
              />
            </FormControl>
            <FormControl col={6} label={'توضیح نوع فعالیت '}>
              <input
                className={getValidationClass(
                  touchedFields.activityTypeDescription,
                  errors.activityTypeDescription
                )}
                {...register('activityTypeDescription', {required: true})}
              />
            </FormControl>
            <FormControl col={6} label={'توضیح زمینه فعالیت '}>
              <input
                className={getValidationClass(
                  touchedFields.activityFieldDescription,
                  errors.activityFieldDescription
                )}
                {...register('activityFieldDescription', {required: true})}
              />
            </FormControl>
            <div className={'row 12'}>
              <div className='col-sm-2'>
                <label className='col-form-label col-sm-4'> آدرس </label>
              </div>
              <div className='col-sm-8'>
                <input className='form-control' value={addFa} />
              </div>
              <div className='col-sm-2'>
                <img
                  alt='Logo'
                  className='h-50px logo'
                  src={process.env.PUBLIC_URL + '/media/icons/erth.jpg'}
                  onClick={gomap}
                />
              </div>
            </div>

            <div className='col-sm-2'>
              <label className='col-form-label col-sm-4'> آدرس انگلیسی </label>
            </div>
            <div className='col-sm-10' style={{marginBottom: 10}}>
              {' '}
              <input
                className='form-control'
                value={addressEn}
                onChange={(e) => setaddressEn(e.target.value)}
              />
            </div>
            <FormControl col={4} label={'خیابان '}>
              <input
                className={getValidationClass(touchedFields.streetName, errors.streetName)}
                {...register('streetName', {required: true})}
              />
            </FormControl>
            <FormControl col={4} label={'کوچه '}>
              <input
                className={getValidationClass(touchedFields.alleyName, errors.alleyName)}
                {...register('alleyName', {required: true})}
              />
            </FormControl>
            <FormControl col={4} label={'پلاک '}>
              <input
                className={getValidationClass(touchedFields.plateNumber, errors.plateNumber)}
                {...register('plateNumber', {required: true})}
              />
            </FormControl>
            <div className='col-sm-2'>
              <label className='col-form-label col-sm-4'> توضیحات </label>
            </div>
            <div className='col-sm-10'>
              {' '}
              <input
                className='form-control'
                value={description}
                onChange={(e) => setdescription(e.target.value)}
              />
            </div>
          </form>
        </div>
        {!showPreDialog && (
          <DialogActions mode={mode} onClose={onClose} resetForm={resetForm}></DialogActions>
        )}
      </Dialog>
    </div>
  )
}
