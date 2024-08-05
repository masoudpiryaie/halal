import {GridColumn} from '@progress/kendo-react-grid'
import React, {useEffect, useState} from 'react'
import {Dialog} from '@progress/kendo-react-dialogs'
import {defaultPageTitles, FormMode} from '@core/forms'
import axios from 'axios'
import {toast} from 'react-toastify'
import {Controller, FieldError, useForm} from 'react-hook-form'
import {ComboBox, FormControl, DialogActions, Grid, ComboBoxLocal} from '@core/components'
import {useIntl} from 'react-intl'
import DatePicker from 'react-datepicker2'
import {left} from '@popperjs/core'
import {AgentContactInfos} from './AgentContactInfos'
import {KTSVG} from '_metronic/helpers'
import moment from 'jalali-moment'
import {DateTimePicker} from '@progress/kendo-react-dateinputs'
import * as shamsi from 'shamsi-date-converter'
import clsx from 'clsx'
type PropsType = {
  mode: FormMode
  onClose: () => void
  item?: AgentsModel
}
export declare type MonthType = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12
export type AgentsModel = {
  id?: number
  code: string
  contractNum: string
  activityArea: string
  //isEnabled: boolean
  hasShenase: boolean
  hasIranCode: boolean
  hasGTIN: boolean
  hasServiceCode: boolean
  agentTypeId: number
  webSite: string
  starCount: number
  email: string
  nameFa: string
  nameEn: string
  registrationNum?: number
  companyTypeId?: number
  nationalCode: string
  provinceId: number
  cityId: number
  firstNameFa: string
  firstNameEn: string
  fatherName: string
  lastNameFa: string
  lastNameEn: string
  economicCode?: string
  mobile: string
  tel: string
  gender: number
  isLegal?: boolean
  birthDate: string
  registrationDate: string
  cityRegistrationId: number
  inactiveDesc: string
  isVisible: boolean
  cityName: string
  provinceName: string
  registrationLocationCityId: number
  registrationLocationCityName: string
  inactiveDate: string
  managerPersonId: null
  companyTypeTitle: string
  agentTypeTitle: string
}
export type FileModel = {
  fileTypeId: number
  file: File
  description: string
}
const pageTitles = defaultPageTitles

export function AgentsCreateDialog({mode, onClose, item}: PropsType) {
  const intl = useIntl()

  const API_URL = process.env.REACT_APP_API_URLCoding || 'api'
  const [tab, setTab] = useState('Header')
  const [isReal, setIsReal] = useState('false')
  const [isMale, setIsMale] = useState('true')
  const [HasServiceCode, setHasServiceCode] = useState(false)
  const [HasShenase, setHasShenase] = useState(false)
  const [HasIranCode, setHasIranCode] = useState(false)
  const [HasGTIN, setHasGTIN] = useState(false)

  const [agentType, setagentTypeId] = useState(0)
  const [city, setcity] = useState(0)
  const [companyType, setcompanyTypeId] = useState(0)
  const [registrationDate, setRegistrationDate] = useState(moment())
  const [birthDate, setBirthDate] = useState(moment())
  const [provinceId, setprovinceId] = useState(0)
  const [inactiveDate, setInactiveDate] = useState(moment())
  const [dataProvinces, setdataProvinces] = useState<any[]>([])
  const [dataCity, setdataCity] = useState<any[]>([])
  const [dataMembershipAgentType, setdataMembershipAgentType] = useState<any[]>([])
  const [items, setItems] = React.useState<any[]>([])
  const [items1, setItems1] = React.useState<any[]>([])
  const [items2, setItems2] = React.useState<any[]>([])
  const [companyList, setdataCompany] = useState<any[]>([])
  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: {errors, isDirty, touchedFields},
  } = useForm<AgentsModel>({mode: 'all'})

  useEffect(() => {
    fetchcombo1()
    fetchcombo2()
    fetchcomboComany()

    if (mode === 'edit') {
      reset(item)
      if (item?.isLegal) {
        setIsReal('false')
        fetchUploader('AgentLegal')
      } else {
        setIsReal('true')
        fetchUploader('Agentreal')
      }
      debugger
      setHasServiceCode(item?.hasServiceCode !== undefined ? item?.hasServiceCode : false)
      setHasIranCode(item?.hasIranCode !== undefined ? item?.hasIranCode : false)
      setHasGTIN(item?.hasGTIN !== undefined ? item?.hasGTIN : false)
      setHasShenase(item?.hasShenase !== undefined ? item?.hasShenase : false)
      if (item?.inactiveDate !== undefined && item?.inactiveDate !== null) {
        setInactiveDate(moment(item?.inactiveDate))
      }
      if (item?.birthDate !== undefined) {
        setBirthDate(moment(item?.birthDate))
      }
      if (item?.registrationDate !== undefined) {
        setRegistrationDate(moment(item?.registrationDate))
      }
    }
  }, [mode, item, reset])

  const fetchcomboComany = async () => {
    try {
      let url = API_URL + 'MembershipCompanyType/Search'
      const resp = await axios.get(url)
      setdataCompany(resp.data.value)

      debugger
    } catch (error) {
      console.log(error)
    }
  }

  const fetchUploader = async (name: string) => {
    try {
      let url = API_URL + name + '/GetFileTypes'
      const resp = await axios.get(url)
      setItems(resp.data.value)
      debugger
      setItems1(resp.data.value.map((x: any) => x.isRepeatable && x))
    } catch (error) {
      console.log(error)
    }
  }

  const fetchcombo1 = async () => {
    try {
      let url = API_URL + 'Provinces/Search'
      const resp = await axios.get(url)
      setdataProvinces(resp.data.value)
      debugger
    } catch (error) {
      console.log(error)
    }
  }
  const fetchcombo2 = async () => {
    try {
      let url = API_URL + 'MembershipAgentType/GetDropdown'
      const resp = await axios.get(url)
      setdataMembershipAgentType(resp.data.value)
    } catch (error) {
      console.log(error)
    }
  }
  const convertDate = (val: any, val1: any, val2: any) => {
    var date = shamsi.jalaliToGregorian(val, val1, val2)
    var month = date[1].toString().length > 1 ? date[1] : '0' + date[1]
    var day = date[2].toString().length > 1 ? date[2] : '0' + date[2]
    return date[0] + '-' + month + '-' + day
  }
  const convertDateFormat = (date: any) => {
    var m = date.jMonth() + 1
    var iaDate = date.jYear() + '-' + m + '-' + date.jDate()
    return convertDate(
      parseInt(iaDate.split('-')[0]),
      parseInt(iaDate.split('-')[1]),
      parseInt(iaDate.split('-')[2])
    )
  }

  const onSubmit = handleSubmit(async (data) => {
    debugger
    var ind = convertDateFormat(inactiveDate)
    let formData = new FormData()
    let url = ''
    delete data?.isLegal
    data.inactiveDate = ind
    data.hasServiceCode = HasServiceCode
    data.hasShenase = HasShenase
    data.hasIranCode = HasIranCode
    data.hasGTIN = HasGTIN
    data.isVisible = true

    if (agentType !== 0) data.agentTypeId = agentType
    if (companyType !== 0) data.companyTypeId = companyType

    if (isReal === 'false') {
      var rd = convertDateFormat(registrationDate)

      if (data.id !== undefined) {
        formData.append('NameFa', data.nameEn)
        formData.append('NameEn', data.nameEn)
        formData.append('NationalCode', data.nationalCode)
        formData.append('Code', data.code)
        formData.append('ContractNum', data.contractNum)
        formData.append('Mobile', data.mobile)
        formData.append('Email', data.email)
        formData.append('Tel', data.tel)
        formData.append('ActivityArea', data.activityArea)
        formData.append('WebSite', data.webSite)
        formData.append('StarCount', data.starCount.toString())
        formData.append('HasServiceCode', HasServiceCode.toString())
        formData.append('HasGTIN', HasGTIN.toString())
        formData.append('HasIranCode', HasIranCode.toString())
        formData.append('HasShenase', HasShenase.toString())
        formData.append('InactiveDate', ind)
        formData.append('IsVisible', 'true')
        formData.append('IsEnabled', 'false')
        formData.append('IsDeleted', 'false')
        formData.append('AgentTypeId', data.agentTypeId.toString())
        formData.append('CityId', data.cityId.toString())
        formData.append('FirstNameFa', data.firstNameFa)
        formData.append('LastNameFa', data.lastNameFa)
        formData.append('FirstNameEn', data.firstNameEn)
        formData.append('LastNameEn', data.lastNameEn)
        formData.append('FatherName', data.fatherName)
        formData.append('InactiveDesc', data.inactiveDesc)
        formData.append('Id', data.id?.toString())
        formData.append('RegistrationDate', rd)
        if (data.registrationNum !== undefined)
          formData.append('RegistrationNum', data.registrationNum?.toString())
        if (data.economicCode !== undefined) formData.append('EconomicCode', data.economicCode)
        if (data.companyTypeId !== undefined)
          formData.append('CompanyTypeId', data.companyTypeId.toString())
        formData.append('RegistrationCityId', data.registrationLocationCityId.toString())
        //formData.append('ManagerPersonId', null)

        var count = 0
        for (var i = 0; i < ffffff.length; i++) {
          formData.append('Files[' + i + '].FileTypeId', ffffff[i].fileTypeId.toString())
          formData.append('Files[' + i + '].File', ffffff[i].file)
          formData.append('Files[' + i + '].Description', '-')

          count = i
        }
        for (var j = 0; j < ffffff1.length; j++) {
          count++
          formData.append(
            'Files[' + count + '].FileTypeId',
            ffffff1[j].fileTypeId.toString().split('-')[0]
          )
          formData.append('Files[' + count + '].File', ffffff1[j].file)
          formData.append('Files[' + count + '].Description', '-')
        }
      } else {
        data.registrationDate = rd
        data.managerPersonId = null
      }
      url = API_URL + 'AgentLegal'
      if (data.id === undefined) {
        url = url + '/CreateJson'
      }
    } else {
      var bd = convertDateFormat(birthDate)
      var count = 0

      if (data.id !== undefined) {
        debugger
        formData.append('NameFa', data.firstNameFa + data.lastNameFa)
        formData.append('NameEn', data.firstNameEn + data.lastNameEn)
        formData.append('FirstNameEn', data.firstNameEn)
        formData.append('FirstNameFa', data.firstNameFa)
        formData.append('LastNameEn', data.lastNameEn)
        formData.append('LastNameFa', data.lastNameFa)
        formData.append('NationalCode', data.nationalCode)
        formData.append('Code', data.code)
        formData.append('ContractNum', data.contractNum)
        formData.append('Mobile', data.mobile)
        formData.append('Email', data.email)
        formData.append('Tel', data.tel)
        formData.append('ActivityArea', data.activityArea)
        formData.append('WebSite', data.webSite)
        formData.append('StarCount', data.starCount.toString())
        formData.append('HasServiceCode', HasServiceCode.toString())
        formData.append('HasGTIN', HasGTIN.toString())
        formData.append('HasIranCode', HasIranCode.toString())
        formData.append('HasShenase', HasShenase.toString())
        formData.append('InactiveDate', ind)
        formData.append('IsVisible', 'true')
        formData.append('IsEnabled', 'false')
        formData.append('IsDeleted', 'false')
        formData.append('AgentTypeId', data.agentTypeId.toString())
        formData.append('CityId', data.cityId.toString())
        var gen = isMale ? '1' : '0'
        formData.append('Gender', gen)
        formData.append('FirstNameFa', data.firstNameFa)
        formData.append('LastNameFa', data.lastNameFa)
        formData.append('FirstNameEn', data.firstNameEn)
        formData.append('LastNameEn', data.lastNameEn)
        formData.append('FatherName', data.fatherName)
        formData.append('BirthDate', bd)
        formData.append('InactiveDesc', data.inactiveDesc)
        formData.append('Id', data.id?.toString())

        var count = 0
        for (var i = 0; i < ffffff.length; i++) {
          formData.append('Files[' + i + '].FileTypeId', ffffff[i].fileTypeId.toString())
          formData.append('Files[' + i + '].File', ffffff[i].file)
          formData.append('Files[' + i + '].Description', '-')

          count = i
        }
        for (var j = 0; j < ffffff1.length; j++) {
          count++
          formData.append(
            'Files[' + count + '].FileTypeId',
            ffffff1[j].fileTypeId.toString().split('-')[0]
          )
          formData.append('Files[' + count + '].File', ffffff1[j].file)
          formData.append('Files[' + count + '].Description', '-')
        }
      } else {
        delete data?.economicCode
        delete data?.companyTypeId
        delete data?.registrationNum
        data.birthDate = bd
        data.gender = isMale ? 1 : 0
        data.nameFa = data.firstNameFa + data.lastNameFa
        data.nameEn = data.firstNameEn + data.lastNameEn
      }
      url = API_URL + 'AgentReal'
      if (data.id === undefined) {
        url = url + '/CreateJson'
      }
    }

    try {
      if (mode !== 'edit') {
        await axios.post(url, data)
      } else {
        axios({
          method: 'put',
          url: url,
          data: formData,
          headers: {'Content-Type': 'multipart/form-data'},
        })
          .then(function (response) {
            toast.info(intl.formatMessage({id: 'MENU.ACTIONSuccess'}), {
              position: 'top-center',
            })
            onClose()
          })
          .catch(function (response) {
            toast.error(intl.formatMessage({id: 'MENU.ACTIONError'}), {
              position: 'top-center',
            })
          })
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
  const getValidationClass = (touched: boolean | undefined, error: FieldError | undefined) => {
    if (mode === 'edit') return error ? 'is-invalid' : 'is-valid'
    else {
      if (touched === true) {
        return error ? 'is-invalid' : 'is-valid'
      }
    }
  }
  const handleChangeagentType = (event: any) => {
    setagentTypeId(event)
  }
  const handleChangeCompanyType = (event: any) => {
    setcompanyTypeId(event)
  }
  const handleChangeProvince = (event: any) => {
    setprovinceId(event)
  }
  const handleChangeCity = (event: any) => {
    setcity(event)
  }

  const onChangeProvinces = async (event: any) => {
    setprovinceId(event)

    try {
      let url = API_URL + 'Cities/GetDropdown?ProvinceId=' + event
      const resp = await axios.get(url)

      setdataCity(resp.data.value)
    } catch (error) {
      console.log(error)
    }
  }
  const handleDate = (e: any) => {
    setInactiveDate(e)
  }
  const handlebirthDate = (e: any) => {
    setBirthDate(e)
    // var m = parseInt(e.jMonths()) + 1
    // setBirthDate(e.jYears() + '-' + m + '-' + e.jDate())
  }
  const handlebirthRegistrationDate = (e: any) => {
    setRegistrationDate(e)
  }
  //#region uploader
  const [ffffff, sets] = React.useState<Array<any>>([])
  const [ffffff1, sets1] = React.useState<Array<any>>([])
  const selectitem = (event: React.ChangeEvent<HTMLInputElement>, id: number) => {
    if (event.target.files) {
      //fileList.push({fileTypeId: id, file: event.target.files[0]})
      const newItem = [...ffffff]
      newItem[ffffff.length] = {fileTypeId: id, file: event.target.files[0]}
      sets(newItem)

      const {files} = event.target
      const selectedFiles = files as FileList

      const output = document.getElementById('fileName-' + id)
      if (output) output.innerHTML = event.target.files[0].name
    }
  }
  const selectitem1 = (event: React.ChangeEvent<HTMLInputElement>, id: number) => {
    if (event.target.files) {
      const newItem = [...ffffff1]
      newItem[ffffff1.length] = {fileTypeId: id, file: event.target.files[0]}
      sets1(newItem)

      const {files} = event.target
      const selectedFiles = files as FileList

      const output = document.getElementById('fileName-' + id)
      if (output) output.innerHTML = event.target.files[0].name
    }
  }

  const handleResetClick = (id: number) => {
    const fileInput = document.getElementById('file-' + id)

    const output = document.getElementById('fileName-' + id)
    if (output) output.innerHTML = 'انتخاب فایل '
  }

  const [counter, setcounter] = useState(1)
  const addUploadbtn = (id: number, name: string, maxByteSize: any) => {
    setcounter(counter + 1)
    const list = [...items2]
    list.push({
      fileTypeId: id + '-' + counter,
      titleFa: name + counter,
      titleEn: name + counter,
      allowedFormat: ['تصویر'],
      maxByteSize: maxByteSize,
      description: id,
      isRequired: true,
      isRepeatable: false,
    })
    setItems2(list)
  }
  //#endregion

  return (
    <div>
      <Dialog title={pageTitles[mode]} onClose={onClose}>
        <div>
          {
            <form id='dialog-form' onSubmit={onSubmit} className='row g-3'>
              <div className='row g-3  '>
                <div className='col form-check form-check-custom form-check-solid form-check-success me-6'>
                  <label className='form-label'>
                    {intl.formatMessage({id: 'FormControl.Input.Select.Real'})}
                    <input
                      className='form-check-input'
                      style={{border: '1px solid #79bcff'}}
                      type='radio'
                      name='Ind'
                      value={'true'}
                      checked={isReal === 'true'}
                      onChange={(e) => setIsReal(e.target.value)}
                    />
                  </label>

                  <label className='form-label'>
                    {intl.formatMessage({id: 'FormControl.Input.Select.Legal'})}
                    <input
                      className='form-check-input'
                      style={{border: '1px solid #79bcff'}}
                      type='radio'
                      name='Ind'
                      value={'false'}
                      checked={isReal === 'false'}
                      onChange={(e) => setIsReal(e.target.value)}
                    />
                  </label>
                </div>
              </div>
              <div
                className='row g-3'
                style={{
                  backgroundColor: '#eff2f5',
                  borderRadius: '0.475rem',
                  padding: '5px',
                  border: '1px solid',
                  borderColor: '#dadada',
                }}
              >
                {isReal === 'false' && (
                  <FormControl col={4} label={intl.formatMessage({id: 'Model.Agents.NameFa'})}>
                    <input
                      className={getValidationClass(touchedFields.nameFa, errors.nameFa)}
                      autoFocus={true}
                      {...register('nameFa', {required: true})}
                    />
                  </FormControl>
                )}
                {isReal === 'false' && (
                  <FormControl col={4} label={intl.formatMessage({id: 'Model.Agents.NameEn'})}>
                    <input
                      className={getValidationClass(touchedFields.nameEn, errors.nameEn)}
                      {...register('nameEn', {required: true})}
                    />
                  </FormControl>
                )}
                {isReal === 'true' && (
                  <FormControl col={4} label={intl.formatMessage({id: 'Model.Agents.FirstNameFa'})}>
                    <input
                      className={getValidationClass(touchedFields.firstNameFa, errors.firstNameFa)}
                      {...register('firstNameFa', {required: true})}
                    />
                  </FormControl>
                )}
                {isReal === 'true' && (
                  <FormControl col={4} label={intl.formatMessage({id: 'Model.Agents.FirstNameEn'})}>
                    <input
                      className={getValidationClass(touchedFields.firstNameEn, errors.firstNameEn)}
                      {...register('firstNameEn', {required: true})}
                    />
                  </FormControl>
                )}
                {isReal === 'true' && (
                  <FormControl col={4} label={intl.formatMessage({id: 'Model.Agents.LastNameFa'})}>
                    <input
                      className={getValidationClass(touchedFields.lastNameFa, errors.lastNameFa)}
                      {...register('lastNameFa', {required: isReal})}
                    />
                  </FormControl>
                )}
                {isReal === 'true' && (
                  <FormControl col={4} label={intl.formatMessage({id: 'Model.Agents.LastNameEn'})}>
                    <input
                      className={getValidationClass(touchedFields.lastNameEn, errors.lastNameEn)}
                      {...register('lastNameEn', {required: isReal})}
                    />
                  </FormControl>
                )}
                <FormControl col={4} label={intl.formatMessage({id: 'Model.Agents.NationalCode'})}>
                  <input
                    className={getValidationClass(touchedFields.nationalCode, errors.nationalCode)}
                    {...register('nationalCode', {required: true})}
                  />
                </FormControl>
                <FormControl col={4} label={intl.formatMessage({id: 'Model.Agents.Code'})}>
                  <input
                    className={getValidationClass(touchedFields.code, errors.code)}
                    {...register('code', {required: true})}
                  />
                </FormControl>
                <FormControl col={4} label={intl.formatMessage({id: 'Model.Agents.ContractNum'})}>
                  <input
                    className={getValidationClass(touchedFields.contractNum, errors.contractNum)}
                    {...register('contractNum', {required: true})}
                  />
                </FormControl>
                {isReal === 'false' && (
                  <div className='row col-md-4'>
                    <label className='col-sm-4 col-form-label'>
                      {intl.formatMessage({id: 'Model.Agents.RegistrationDate'})}
                    </label>
                    <div style={{left: '5px'}} className='col-sm-8'>
                      <DatePicker
                        className=' form-control is-date '
                        isGregorian={false}
                        value={registrationDate}
                        onChange={handlebirthRegistrationDate}
                        timePicker={false}
                      />
                    </div>
                  </div>
                )}
                {isReal === 'false' && (
                  <FormControl
                    col={4}
                    label={intl.formatMessage({id: 'Model.Agents.RegistrationNum'})}
                  >
                    <input
                      className={getValidationClass(
                        touchedFields.registrationNum,
                        errors.registrationNum
                      )}
                      {...register('registrationNum', {required: !isReal})}
                    />
                  </FormControl>
                )}
                {isReal === 'false' && (
                  <FormControl col={4} label={'استان ثبت'}>
                    <Controller
                      name='provinceId'
                      control={control}
                      render={({field: {onChange, onBlur, value, ref}}) => (
                        <ComboBoxLocal
                          filldata={dataProvinces}
                          endpoint={API_URL + 'AddressTitle/Search'}
                          preSelectedId={{id: item?.provinceId, title: item?.provinceName}}
                          onChange={onChangeProvinces}
                          onBlur={onBlur}
                        />
                      )}
                    />
                  </FormControl>
                )}
                {isReal === 'false' && (
                  <FormControl col={4} label={'شهر ثبت'}>
                    <Controller
                      name='registrationLocationCityId'
                      control={control}
                      render={({field: {onChange, onBlur, value, ref}}) => (
                        <ComboBoxLocal
                          filldata={dataCity}
                          endpoint={''}
                          preSelectedId={{
                            id: item?.registrationLocationCityId,
                            title: item?.registrationLocationCityName,
                          }}
                          onChange={onChange}
                          onBlur={onBlur}
                        />
                      )}
                    />
                  </FormControl>
                )}
                {isReal === 'false' && (
                  <FormControl
                    col={4}
                    label={intl.formatMessage({id: 'Model.Agents.CompanyTypeId'})}
                  >
                    <Controller
                      name='companyTypeId'
                      control={control}
                      render={({field: {onChange, onBlur, value, ref}}) => (
                        <ComboBoxLocal
                          filldata={companyList}
                          endpoint={API_URL + 'MembershipCompanyType/Search'}
                          preSelectedId={{id: item?.companyTypeId, title: item?.companyTypeTitle}}
                          onChange={handleChangeCompanyType}
                          onBlur={onBlur}
                        />
                      )}
                    />
                  </FormControl>
                )}
                {isReal === 'false' && (
                  <FormControl
                    col={4}
                    label={intl.formatMessage({id: 'Model.Agents.EconomicCode'})}
                  >
                    <input
                      className={getValidationClass(
                        touchedFields.economicCode,
                        errors.economicCode
                      )}
                      {...register('economicCode', {required: !isReal})}
                    />
                  </FormControl>
                )}
                <FormControl col={4} label={intl.formatMessage({id: 'Model.Agents.StarCount'})}>
                  <input
                    className={getValidationClass(touchedFields.starCount, errors.starCount)}
                    {...register('starCount', {required: true})}
                  />
                </FormControl>
              </div>

              {isReal === 'true' && (
                <div
                  className='row g-3'
                  style={{
                    backgroundColor: '#eff2f5',
                    borderRadius: '0.475rem',
                    padding: '5px',
                    border: '1px solid',
                    borderColor: '#dadada',
                  }}
                >
                  {isReal === 'true' && (
                    <FormControl
                      col={4}
                      label={intl.formatMessage({id: 'Model.Agents.FatherName'})}
                    >
                      <input
                        className={getValidationClass(touchedFields.fatherName, errors.fatherName)}
                        {...register('fatherName', {required: isReal})}
                      />
                    </FormControl>
                  )}
                  {isReal === 'true' && (
                    <div className='row col-md-4'>
                      <label className='col-sm-4 col-form-label'>
                        {intl.formatMessage({id: 'Model.Agents.BirthDate'})}
                      </label>
                      <div style={{left: '5px'}} className='col-sm-8'>
                        <DatePicker
                          className=' form-control is-date '
                          isGregorian={false}
                          value={birthDate}
                          onChange={handlebirthDate}
                          timePicker={false}
                        />
                      </div>
                    </div>
                  )}
                  {isReal === 'true' && (
                    <div className='col-sm-4 form-check form-check-custom form-check-solid form-check-success me-6'>
                      <label className='form-label'>
                        {intl.formatMessage({id: 'Model.Agents.Male'})}
                        <input
                          className='form-check-input'
                          style={{border: '1px solid #79bcff'}}
                          type='radio'
                          name='Male'
                          value={'true'}
                          checked={isMale === 'true'}
                          onChange={(e) => setIsMale(e.target.value)}
                        />
                      </label>

                      <label className='form-label'>
                        {intl.formatMessage({id: 'Model.Agents.Female'})}
                        <input
                          className='form-check-input'
                          style={{border: '1px solid #79bcff'}}
                          type='radio'
                          name='Male'
                          value={'false'}
                          checked={isMale === 'false'}
                          onChange={(e) => setIsMale(e.target.value)}
                        />
                      </label>
                    </div>
                  )}
                </div>
              )}
              <div
                className='row g-3'
                style={{
                  backgroundColor: '#eff2f5',
                  borderRadius: '0.475rem',
                  padding: '5px',
                  border: '1px solid',
                  borderColor: '#dadada',
                }}
              >
                <FormControl col={4} label={'استان'}>
                  <Controller
                    name='provinceId'
                    control={control}
                    render={({field: {onChange, onBlur, value, ref}}) => (
                      <ComboBoxLocal
                        filldata={dataProvinces}
                        endpoint={API_URL + 'AddressTitle/Search'}
                        preSelectedId={{id: item?.provinceId, title: item?.provinceName}}
                        onChange={onChangeProvinces}
                        onBlur={onBlur}
                      />
                    )}
                  />
                </FormControl>
                <FormControl col={4} label={'شهر'}>
                  <Controller
                    name='cityId'
                    control={control}
                    render={({field: {onChange, onBlur, value, ref}}) => (
                      <ComboBoxLocal
                        filldata={dataCity}
                        endpoint={API_URL + 'AddressTitle/Search'} // to do
                        preSelectedId={{id: item?.cityId, title: item?.cityName}}
                        onChange={onChange}
                        onBlur={onBlur}
                      />
                    )}
                  />
                </FormControl>

                <FormControl col={4} label={intl.formatMessage({id: 'Model.Agents.WebSite'})}>
                  <input
                    className={getValidationClass(touchedFields.webSite, errors.webSite)}
                    {...register('webSite', {required: true})}
                  />
                </FormControl>
                <FormControl col={4} label={intl.formatMessage({id: 'Model.Agents.Mobile'})}>
                  <input
                    className={getValidationClass(touchedFields.mobile, errors.mobile)}
                    {...register('mobile', {required: isReal, maxLength: 11, minLength: 11})}
                  />
                </FormControl>
                <FormControl col={4} label={intl.formatMessage({id: 'Model.Agents.Email'})}>
                  <input
                    className={getValidationClass(touchedFields.email, errors.email)}
                    {...register('email', {
                      required: true,
                      validate: {
                        maxLength: (v) =>
                          v.length <= 50 || 'The email should have at most 50 characters',
                        matchPattern: (v) =>
                          /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) ||
                          'Email address must be a valid address',
                      },
                    })}
                  />
                </FormControl>
                <FormControl col={4} label={intl.formatMessage({id: 'Model.Agents.Tel'})}>
                  <input
                    className={getValidationClass(touchedFields.tel, errors.tel)}
                    {...register('tel', {required: isReal})}
                  />
                </FormControl>
              </div>
              <div
                className='row g-3'
                style={{
                  backgroundColor: '#eff2f5',
                  borderRadius: '0.475rem',
                  padding: '5px',
                  border: '1px solid',
                  borderColor: '#dadada',
                }}
              >
                <FormControl
                  col={2}
                  label={intl.formatMessage({id: 'Model.Agents.HasServiceCode'})}
                >
                  <input
                    className='form-check-input w-20px h-20px'
                    type='checkbox'
                    style={{marginTop: '10px'}}
                    checked={HasServiceCode}
                    onChange={(e) => setHasServiceCode(e.target.checked)}
                  />
                </FormControl>
                <FormControl col={2} label={intl.formatMessage({id: 'Model.Agents.HasShenase'})}>
                  <input
                    className='form-check-input w-20px h-20px'
                    type='checkbox'
                    style={{marginTop: '10px'}}
                    checked={HasShenase}
                    onChange={(e) => setHasShenase(e.target.checked)}
                  />
                </FormControl>
                <FormControl col={2} label={intl.formatMessage({id: 'Model.Agents.HasIranCode'})}>
                  <input
                    className='form-check-input w-20px h-20px'
                    type='checkbox'
                    style={{marginTop: '10px'}}
                    checked={HasIranCode}
                    onChange={(e) => setHasIranCode(e.target.checked)}
                  />
                </FormControl>
                <FormControl col={4} label={intl.formatMessage({id: 'Model.Agents.HasGTIN'})}>
                  <input
                    className='form-check-input w-20px h-20px'
                    style={{marginTop: '10px'}}
                    type='checkbox'
                    checked={HasGTIN}
                    onChange={(e) => setHasGTIN(e.target.checked)}
                  />
                </FormControl>
                <FormControl col={4} label={intl.formatMessage({id: 'Model.Agents.AgentTypeId'})}>
                  <Controller
                    name='agentTypeId'
                    control={control}
                    render={({field: {onChange, onBlur, value, ref}}) => (
                      <ComboBoxLocal
                        filldata={dataMembershipAgentType}
                        endpoint={API_URL + 'AgentTypes/Search'}
                        preSelectedId={{id: item?.agentTypeId, title: item?.agentTypeTitle}}
                        onChange={handleChangeagentType}
                        onBlur={onBlur}
                      />
                    )}
                  />
                </FormControl>
                <FormControl col={4} label={intl.formatMessage({id: 'Model.Agents.ActivityArea'})}>
                  <input
                    className={getValidationClass(touchedFields.activityArea, errors.activityArea)}
                    {...register('activityArea', {required: true})}
                  />
                </FormControl>
              </div>
            </form>
          }
        </div>

        <DialogActions mode={mode} onClose={onClose} resetForm={resetForm}></DialogActions>

        {/* {agentContactInfo && (
          <AgentContactInfos AgentID={1} onClose={() => onClose()}></AgentContactInfos>
        )} */}
      </Dialog>
    </div>
  )
}
