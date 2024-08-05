import React, {useEffect, useState} from 'react'
import {GridColumn} from '@progress/kendo-react-grid'
import {Dialog} from '@progress/kendo-react-dialogs'
import {defaultPageTitles, FormMode} from '@core/forms'
import axios from 'axios'
import {toast} from 'react-toastify'
import {FieldError, useForm} from 'react-hook-form'
import {ServiceTypeDialog} from './ServiceTypeDialog'
import {ServicePrefix} from './ServicePrefix'
import {DialogActionsBar} from '@progress/kendo-react-dialogs'
import DatePicker from 'react-datepicker2'
import * as shamsi from 'shamsi-date-converter'
import moment from 'jalali-moment'
import {KTSVG} from '_metronic/helpers'
import {useLayout} from '_metronic/layout/core'
import {useAppSelector} from 'setup/redux/hooks'
import {selectmemberId} from 'app/modules/auth/redux/AuthSlice'
import {
  FormControl,
  DialogActions,
  Grid,
  ComboBoxLocaltow,
  CheckBoxAction,
  BtnAction,
  ComboBoxLocal,
} from '@core/components'
import {useIntl} from 'react-intl'
import clsx from 'clsx'
import SVG from 'react-inlinesvg'
import {
  TreeView,
  processTreeViewItems,
  handleTreeViewCheckChange,
  TreeViewExpandChangeEvent,
} from '@progress/kendo-react-treeview'
import {bool, boolean} from 'yup'
import {debug} from 'console'

type PropsType = {
  ID: number
  onClose: () => void
  mode: FormMode
  item?: ServiceCodeRequestModel
  prefixId?: number
  servicePayehInfoId?: number
}
export interface IModelGr {
  title: string
  field: string
  show: boolean
}
export type ServiceCodeRequestModel = {
  id?: number
  prefixId: number
  payeInfoId: number
  subject: string
  hasPriceRange: boolean
  minPrice: number
  maxPrice: number
  priceDescription: string
  price: number
  summary: string
  description: string
  fromDate: string
  toDate: string
  countingUnitId: number
  status: number
  countingUnitTitle: string
}
const pageTitles = defaultPageTitles

export function ServiceCodeRequestCreateDialog({
  ID,
  onClose,
  mode,
  item,
  prefixId,
  servicePayehInfoId,
}: PropsType) {
  const intl = useIntl()
  const API_URL = process.env.REACT_APP_API_URLCoding || 'api'
  const memberId = useAppSelector(selectmemberId)
  const [tab, setTab] = useState('Header')
  const {config} = useLayout()
  const [showServiceTypeDialog, setshowServiceTypeDialog] = useState(false)
  const [showServicePrefixDialog, setshowServicePrefixDialog] = useState(false)
  const [countingUnitId, setcountingUnitId] = useState(0)
  const [hasPriceRange, sethasPriceRange] = useState('false')
  const [from, setFrom] = useState(moment().add(1, 'days'))
  const [to, setTo] = useState(moment().add(2, 'days'))
  const [selecteddata1, setSelecteddata1] = useState(0)
  const [countingUnit, setcountingUnit] = useState<any[]>([])
  const [fileTypeList, setFileTypeList] = useState<any[]>([])
  const [fileTypeId, setfileTypeId] = useState(0)
  const [fileTypeTitle, setfileTypeTitle] = useState('')

  const [desc, setDesc] = useState('')
  const {
    register,
    handleSubmit,
    reset,
    formState: {errors, isDirty, touchedFields},
  } = useForm<ServiceCodeRequestModel>({mode: 'all'})
  const JalaliDate = {
    g_days_in_month: [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],
    j_days_in_month: [31, 31, 31, 31, 31, 31, 30, 30, 30, 30, 30, 29],
  }

  const jalaliToGregorian = function (j_y: number, j_m: number, j_d: number) {
    // j_y = parseInt(j_y)
    //j_m = parseInt(j_m)
    //j_d = parseInt(j_d)
    var jy = j_y - 979
    var jm = j_m - 1
    var jd = j_d - 1
    var param1 = (parseInt(jy.toString()) / 33).toString()
    var param2 = ((parseInt(jy.toString()) % 33) + 3).toString()

    var j_day_no = 365 * jy + parseInt(param1) * 8 + parseInt(param2)
    for (var i = 0; i < jm; ++i) j_day_no += JalaliDate.j_days_in_month[i]

    j_day_no += jd

    var g_day_no = j_day_no + 79
    var param3 = parseInt(g_day_no.toString()) / 146097
    var gy = 1600 + 400 * param3 /* 146097 = 365*400 + 400/4 - 400/100 + 400/400 */
    g_day_no = g_day_no % 146097

    var leap = true
    if (g_day_no >= 36525) {
      /* 36525 = 365*100 + 100/4 */
      g_day_no--
      gy += 100 * (g_day_no / 36524) /* 36524 = 365*100 + 100/4 - 100/100 */
      g_day_no = g_day_no % 36524

      if (g_day_no >= 365) g_day_no++
      else leap = false
    }

    gy += 4 * (g_day_no / 1461) /* 1461 = 365*4 + 4/4 */
    g_day_no %= 1461

    if (g_day_no >= 366) {
      leap = false

      g_day_no--
      gy += g_day_no / 365
      g_day_no = g_day_no % 365
    }
    if (leap) {
      for (var i = 0; g_day_no >= JalaliDate.g_days_in_month[i] + 1; i++) {
        var param4 = i === 1 && leap ? 1 : 0
        g_day_no -= JalaliDate.g_days_in_month[i] + param4
      }
    } else {
      for (var i = 0; g_day_no >= JalaliDate.g_days_in_month[i]; i++) {
        var param4 = i === 1 && leap ? 1 : 0
        g_day_no -= JalaliDate.g_days_in_month[i] + param4
      }
    }

    var gm = i + 1
    var gd = g_day_no + 1

    gm = gm < 10 ? 0 + gm : gm
    gd = gd < 10 ? 0 + gd : gd

    return [gy, gm, gd]
  }

  useEffect(() => {
    // var myDate = '1403-02-22',
    //   dateSplitted = myDate.split('-'),
    //   jD = jalaliToGregorian(
    //     parseInt(dateSplitted[0]),
    //     parseInt(dateSplitted[1]),
    //     parseInt(dateSplitted[2])
    //   )
    // var jResult = jD[0] + '-' + jD[1] + '-' + jD[2]

    // console.log(jResult)

    fetchcombo1()
    fetchcombo2()

    // if(i)setFrom(item?.fromDate)
    if (prefixId !== undefined) setSelecteddata2(prefixId)
    if (servicePayehInfoId !== undefined) setSelecteddata1(servicePayehInfoId)
  }, [])
  const fetchcombo1 = async () => {
    try {
      let url = API_URL + 'ServiceCountingUnit/Search'
      const fetchResponse = await fetch(`${url}`, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
        },
      })
      const resp = await fetchResponse.json()
      setcountingUnit(resp.value)
    } catch (error) {
      console.log(error)
    }
  }
  const fetchcombo2 = async () => {
    try {
      let url = API_URL + 'ServiceCode/GetFileTypes'
      const fetchResponse = await fetch(`${url}`, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
        },
      })
      const resp = await fetchResponse.json()
      var newlist = resp.value.map(function (row: any) {
        return {id: row.fileTypeId, title: row.titleFa}
      })

      setFileTypeList(newlist)
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
    if (parseInt(data.minPrice.toString()) >= parseInt(data.maxPrice.toString())) {
      toast.info('مبلغ شروع باید از مبلغ پایان بیشتر باشد', {
        position: 'top-center',
      })
      return
    }
    let url = API_URL + 'ServiceCode'
    data.hasPriceRange = hasPriceRange === 'true' ? true : false
    var fd = convertDateFormat(from)
    var td = convertDateFormat(to)
    let formData = new FormData()
    formData.append('prefixId', selecteddata2.toString())
    formData.append('payeInfoId', selecteddata1.toString())
    formData.append('subject', data.subject.toString())
    formData.append('hasPriceRange', data.hasPriceRange.toString())
    formData.append('minPrice', data.minPrice.toString())
    formData.append('maxPrice', data.maxPrice.toString())
    formData.append('priceDescription', data.priceDescription.toString())
    formData.append('summary', '')
    formData.append('description', data.description.toString())
    formData.append('fromDate', fd)
    formData.append('toDate', td)
    formData.append('countingUnitId', countingUnitId.toString())

    if (memberId !== undefined) formData.append('memberId', memberId)
    for (var i = 0; i < dataList.length; i++) {
      formData.append('Files[' + i + '].FileTypeId', dataList[i].fileTypeId.toString())
      formData.append('Files[' + i + '].File', dataList[i].file)
      formData.append('Files[' + i + '].FileDescription', dataList[i].fileDescription)
    }
    debugger

    try {
      if (mode !== 'edit') await axios.post(url, formData)
      else await axios.put(url, data)
      debugger
      toast.info(intl.formatMessage({id: 'MENU.ACTIONSuccess'}), {
        position: 'top-center',
      })
      onClose()
    } catch (e: any) {
      if (!e.processed) {
        toast.info(intl.formatMessage({id: 'MENU.ACTIONError'}), {
          position: 'top-center',
        })
      }
    }
  })

  const choseService = () => {
    setshowServiceTypeDialog(true)
  }
  const handleCloseServiceType = () => {
    setshowServiceTypeDialog(false)
  }
  const getValidationClass = (touched: boolean | undefined, error: FieldError | undefined) => {
    if (mode === 'edit') return error ? 'is-invalid' : 'is-valid'
    else {
      if (touched === true) {
        return error ? 'is-invalid' : 'is-valid'
      }
    }
  }

  const resetForm = () => {
    reset()
    if (isDirty) {
    }
  }

  const handleCloseServicePrefix = () => {
    setshowServicePrefixDialog(false)
  }

  const [selecteddata2, setSelecteddata2] = useState(0)
  const onServicePrefixSubmit = (item: number) => {
    setSelecteddata2(item)
  }
  const handleChangeCounting = (event: any) => {
    setcountingUnitId(event)
  }
  const fromset = (event: any) => {
    setFrom(event)
  }
  const toset = (event: any) => {
    setTo(event)
    // setTo(event._d.getDate() + '-' + (event._d.getMonth() + 1) + '-' + event._d.getFullYear())
  }
  const [payeInfoName, setpayeInfoName] = useState('')
  const selectRecordShenase = (i: number, name: string) => {
    setpayeInfoName(name)
    setSelecteddata1(i)
    setshowServiceTypeDialog(false)
  }
  const [prifixName, setprifixName] = useState('')
  const selectRecordPrefix = (i: number, name: string) => {
    setprifixName(name)
    setSelecteddata2(i)
    setshowServicePrefixDialog(false)
  }
  const chosePrefix = () => {
    setshowServicePrefixDialog(true)
  }
  const getValidationClasscombo = (data: number | undefined) => {
    return data === 0 ? 'is-invalid form-control' : 'is-valid  form-control'
  }
  const selectitem = (event: React.ChangeEvent<HTMLInputElement>, id: number) => {
    if (event.target.files) {
      const newItem = [...fileList]
      newItem[fileList.length] = {
        fileTypeId: fileTypeId,
        file: event.target.files[0],
        fileTypeTitle: fileTypeTitle,
      }
      setfileList(newItem)

      const {files} = event.target
      const output = document.getElementById('fileName-0')
      if (output) output.innerHTML = event.target.files[0].name
    }
  }
  const handleResetClick = () => {
    const output = document.getElementById('fileName-0')
    if (output) output.innerHTML = 'فابل'
  }
  const [fileList, setfileList] = React.useState<Array<any>>([])
  const [dataList, setdataList] = React.useState<Array<any>>([])
  const FileAddlist = () => {
    if (fileList.length === 0 || desc === '' || fileTypeId === 0) {
      toast.info('اطلاعات را کامل کنید', {
        position: 'top-center',
      })
    } else {
      const newItem = [...dataList]
      newItem[dataList.length] = {
        fileTypeId: fileTypeId,
        file: fileList[dataList.length].file,
        fileTypeTitle: fileTypeTitle,
        fileDescription: desc,
      }
      setdataList(newItem)
      setDesc('')
      setfileTypeId(0)
      const output = document.getElementById('fileName-0')
      if (output) output.innerHTML = 'فابل'
    }
  }
  const filetypecbtn = (e: any) => {
    setfileTypeId(e.id)
    setfileTypeTitle(e.title)
  }
  const handleDeleteFileItem = (id: any) => {}
  return (
    <div>
      {showServiceTypeDialog && (
        <ServiceTypeDialog
          ID={ID}
          onClose={handleCloseServiceType}
          selectRecord={selectRecordShenase}
        />
      )}
      {showServicePrefixDialog && (
        <ServicePrefix
          selectRecord={selectRecordPrefix}
          onClose={handleCloseServicePrefix}
          ID={ID}
        />
      )}

      <Dialog title={'نوع خدمات'} onClose={onClose}>
        <div style={{width: '1000px', height: '600px'}}>
          <div className='card card-custom'>
            <div className='card-header card-header-stretch overflow-auto'>
              <ul
                className='nav nav-stretch nav-line-tabs fw-bold border-transparent flex-nowrap'
                role='tablist'
              >
                <li className='nav-item'>
                  <a
                    className={clsx(`nav-link`, {active: tab === 'Header'})}
                    onClick={() => setTab('Header')}
                    role='tab'
                  >
                    اطلاعات اصلی
                  </a>
                </li>

                <li className='nav-item'>
                  <a
                    className={clsx(`nav-link`, {active: tab === 'Aside'})}
                    onClick={() => setTab('Aside')}
                    role='tab'
                  >
                    فایل
                  </a>
                </li>
              </ul>
            </div>
            {/* end::Header */}

            {/* begin::Form */}

            {/* begin::Body */}
            <div className='card-body'>
              <div className='tab-content pt-3'>
                <div className={clsx('tab-pane', {active: tab === 'Header'})}>
                  <form id='dialog-form' onSubmit={onSubmit} className='row g-3'>
                    <div className='card card-custom'>
                      <div className='card card-flush '>
                        <div className='card-body'>
                          <div className='row'>
                            <div className='col-sm-2 '>
                              <label style={{marginTop: '10px'}} className='form-label '>
                                {'پیش شماره شرکتی '}
                              </label>
                            </div>
                            <div className='col-sm-2'>
                              <label className='form-label form-control'>{prifixName}</label>
                            </div>
                            <div className='col-sm-2'>
                              <BtnAction onClick={chosePrefix} label='...' />
                            </div>
                            <div className='col-sm-2 '>
                              <label style={{marginTop: '10px'}} className='form-label '>
                                {'نوع خدمت'}
                              </label>
                            </div>
                            <div className='col-sm-2'>
                              <label className='form-label form-control'>{payeInfoName}</label>
                            </div>
                            <div className='col-sm-2'>
                              <BtnAction onClick={choseService} label='...' />
                            </div>
                          </div>
                          <div className='row'>
                            <FormControl col={6} label={'واحد اندازگیری'}>
                              <ComboBoxLocal
                                className={getValidationClasscombo(countingUnitId)}
                                endpoint={API_URL + 'ServiceCountingUnit/Search'}
                                onChange={(e: any) => setcountingUnitId(e)}
                                filldata={countingUnit}
                                preSelectedId={{
                                  id: item?.countingUnitId,
                                  title: item?.countingUnitTitle,
                                }}
                              />
                            </FormControl>
                            <FormControl col={6} label='موضوع'>
                              <input
                                className={getValidationClass(
                                  touchedFields.subject,
                                  errors.subject
                                )}
                                autoFocus={true}
                                {...register('subject', {required: true})}
                              />
                            </FormControl>
                          </div>
                          <div className='row'>
                            <div className='row col-md-6'>
                              <label className='col-sm-4 col-form-label'>{'تاریخ از'}</label>
                              <div style={{left: '5px'}} className='col-sm-8'>
                                <DatePicker
                                  onChange={fromset}
                                  className=' form-control is-date '
                                  isGregorian={false}
                                  value={from}
                                  timePicker={false}
                                ></DatePicker>
                                <i className='cal-icon' />
                              </div>
                            </div>
                            <div className='row col-md-6'>
                              <label className='col-sm-4 col-form-label'>{'تاریخ تا'}</label>
                              <div style={{left: '5px'}} className='col-sm-8'>
                                <DatePicker
                                  onChange={toset}
                                  value={to}
                                  className=' form-control is-date'
                                  isGregorian={false}
                                  timePicker={false}
                                />
                              </div>
                            </div>
                          </div>
                          <div className='row'>
                            <FormControl col={6} label={'شرح مختصر خدمت'}>
                              <textarea {...register('priceDescription')} />
                            </FormControl>
                            <FormControl col={6} label={' '}>
                              <div className='col form-check form-check-custom form-check-solid form-check-success me-6'>
                                <label className='form-label'>
                                  {intl.formatMessage({id: 'FormControl.Input.Select.Decs'})}
                                  <input
                                    className='form-check-input'
                                    type='radio'
                                    name='PayT'
                                    value={'true'}
                                    checked={hasPriceRange === 'true'}
                                    onChange={(e) => sethasPriceRange(e.target.value)}
                                  />
                                </label>

                                <label className='form-label'>
                                  {intl.formatMessage({id: 'FormControl.Input.Select.Range'})}
                                  <input
                                    className='form-check-input'
                                    type='radio'
                                    name='PayT'
                                    value={'false'}
                                    checked={hasPriceRange === 'false'}
                                    onChange={(e) => sethasPriceRange(e.target.value)}
                                  />
                                </label>
                              </div>
                            </FormControl>
                          </div>
                          <div className='row'>
                            <FormControl col={6} label='شروع قیمت از'>
                              <input
                                className={getValidationClass(
                                  touchedFields.minPrice,
                                  errors.minPrice
                                )}
                                {...register('minPrice', {required: true})}
                              />
                            </FormControl>
                            <FormControl col={6} label='حداکثر قیمت'>
                              <input
                                className={getValidationClass(
                                  touchedFields.maxPrice,
                                  errors.maxPrice
                                )}
                                {...register('maxPrice', {required: true})}
                              />
                            </FormControl>
                          </div>

                          <div className='row'>
                            <FormControl col={6} label='توضیحات'>
                              <textarea {...register('description')} />
                            </FormControl>
                          </div>
                        </div>
                      </div>
                    </div>
                  </form>
                </div>

                <div className={clsx('tab-pane', {active: tab === 'Aside'})}>
                  <div className=' card card-px-0 mb-2 shadow '>
                    <div className='card-body' style={{margin: '5px'}}>
                      <div className='row'>
                        {' '}
                        <div className='col-3'>
                          <FormControl col={12} label={'عنوان فایل'}>
                            <ComboBoxLocaltow
                              endpoint={API_URL + '/MemberReal/GetFileTypes'}
                              onChange={(e: any) => filetypecbtn(e)}
                              filldata={fileTypeList}
                              className='form-control'
                            />
                          </FormControl>
                        </div>
                        <div className='col-3'>
                          <div>
                            {/* <label className='col-sm-4 col-form-label'>{data.titleFa} </label> */}

                            <label className='k-button col-sm-6' style={{height: '42px'}}>
                              <label id={'fileName-0'}>{'فابل'}</label>
                              <input
                                style={{visibility: 'hidden'}}
                                id={'file-0'}
                                type='file'
                                onChange={(e) => selectitem(e, 0)}
                              />
                            </label>

                            <label
                              className='k-button col-sm-1 btn btn-icon btn-bg-light btn-active-color-danger '
                              onClick={(e) => handleResetClick()}
                            >
                              {' '}
                              <KTSVG
                                path='/media/icons/duotune/general/gen034.svg'
                                className='svg-icon-3'
                              />
                            </label>
                          </div>
                        </div>
                        <div className='col-3'>
                          <input
                            value={desc}
                            onChange={(e) => setDesc(e.target.value)}
                            className={
                              desc === ''
                                ? 'col-form-label form-control form-control-lg form-control-solid  is-invalid'
                                : 'col-form-label form-control form-control-lg form-control-solid  is-valid'
                            }
                          />
                        </div>
                        <div className='col-2'>
                          <button
                            id='myBtn1'
                            style={{width: '80px'}}
                            onClick={FileAddlist}
                            className='k-button k-primary'
                          >
                            {'ثبت'}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className=' card card-px-0 mb-2 shadow '>
                    <div className='card-body' style={{margin: '20px'}}>
                      <div
                        className='row fileDiv'
                        style={{
                          backgroundColor: '#f8f9fa',
                        }}
                      >
                        <label
                          className='col-sm-4 col-form-label'
                          style={{
                            border: 'solid 1px rgb(222, 226, 230)',
                          }}
                        >
                          {'عنوان فایل'}{' '}
                        </label>
                        <label
                          className='col-sm-6 col-form-label'
                          style={{
                            border: 'solid 1px rgb(222, 226, 230)',
                          }}
                        >
                          {'توضیحات'}{' '}
                        </label>

                        <label
                          className='col-sm-1 col-form-label'
                          style={{
                            border: 'solid 1px rgb(222, 226, 230)',
                          }}
                        >
                          {'دانلود'}{' '}
                        </label>

                        <label
                          className='col-sm-1 col-form-label'
                          style={{
                            border: 'solid 1px rgb(222, 226, 230)',
                          }}
                        >
                          {'حذف'}{' '}
                        </label>
                      </div>
                      {dataList.map(function (data, index) {
                        return (
                          <div
                            className='row fileDiv'
                            style={{
                              backgroundColor:
                                index % 2 === 0 ? '#ffffff' : config.main?.primaryColor + '21',
                            }}
                          >
                            <label
                              className='col-sm-4 col-form-label'
                              style={{
                                border: 'solid 1px rgb(222, 226, 230)',
                              }}
                            >
                              {data.fileTypeTitle}{' '}
                            </label>
                            <label
                              className='col-sm-6 col-form-label'
                              style={{
                                border: 'solid 1px rgb(222, 226, 230)',
                              }}
                            >
                              {data.fileDescription}{' '}
                            </label>

                            <a
                              style={{
                                border: 'solid 1px rgb(222, 226, 230)',
                              }}
                              id='file'
                              className='col-sm-1  k-button  btn btn-icon  btn-color-success '
                              href={URL.createObjectURL(data.file)}
                              download
                            >
                              <KTSVG
                                path='/media/icons/duotune/arrows/arr065.svg'
                                className='svg-icon-3'
                              />
                            </a>

                            <label
                              style={{
                                border: 'solid 1px rgb(222, 226, 230)',
                              }}
                              className='col-sm-1  k-button  btn btn-icon  btn-color-danger '
                              onClick={(e) => handleDeleteFileItem(data.fileTypeId)}
                            >
                              {' '}
                              <KTSVG
                                path='/media/icons/duotune/general/gen034.svg'
                                className='svg-icon-3'
                              />
                            </label>
                          </div>
                        )
                      })}
                    </div>
                  </div>
                </div>
                <DialogActions mode={mode} onClose={onClose} resetForm={resetForm}></DialogActions>
              </div>
            </div>

            {/* end::Form */}
          </div>
        </div>

        {/* <DialogActionsBar layout='end'>
          <button
            id='myBtn1'
            onClick={sub1_click}
            style={{backgroundColor: '#00c55f', color: 'white'}}
            className='k-button'
            type='submit'
          >
            {'تایید و ارسال'}
          </button>
          <button id='myBtn2' onClick={sub2_click} className='k-button k-primary' type='submit'>
            {' ثبت موقت'}
          </button>
        </DialogActionsBar> */}
      </Dialog>
    </div>
  )
}
