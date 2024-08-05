import React, {useEffect, useState} from 'react'
import {GridColumn} from '@progress/kendo-react-grid'
import {Dialog} from '@progress/kendo-react-dialogs'
import {defaultPageTitles, FormMode} from '@core/forms'
import axios from 'axios'
import {toast} from 'react-toastify'
import {FieldError, useForm} from 'react-hook-form'

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

type PropsType = {
  id: number
  onClose: () => void
}
export type ReferModel = {
  paraph: string
  nextStatusId: number
}

export function ReferDialog({id, onClose}: PropsType) {
  const intl = useIntl()
  const API_URL = process.env.REACT_APP_API_URLCoding || 'api'
  const memberId = useAppSelector(selectmemberId)
  const [tab, setTab] = useState('Header')
  const {config} = useLayout()

  const [fileTypeList, setFileTypeList] = useState<any[]>([])
  const [nextStatusList, setNextStatusList] = useState<any[]>([])
  const [fileTypeId, setfileTypeId] = useState(0)
  const [fileTypeTitle, setfileTypeTitle] = useState('')
  const [nextStatusId, setnextStatusId] = useState(0)

  const [desc, setDesc] = useState('')
  const {
    register,
    handleSubmit,
    reset,
    formState: {errors, isDirty, touchedFields},
  } = useForm<ReferModel>({mode: 'all'})

  useEffect(() => {
    fetchNextStatus()
    fetchFileType()
  }, [])
  const fetchFileType = async () => {
    try {
      let url = API_URL + '/ServiceCodeCartable/GetReferralFileTypes'
      const resp = await axios.get(url)

      var newlist = resp.data.value.map(function (row: any) {
        return {id: row.fileTypeId, title: row.titleFa}
      })

      setFileTypeList(newlist)
    } catch (error) {
      console.log(error)
    }
  }
  const fetchNextStatus = async () => {
    try {
      let url = API_URL + 'ServiceCodeCartable/GetNextStatuses?StatusId=11'
      const resp = await axios.get(url)

      debugger

      setNextStatusList(resp.data.value)
    } catch (error) {
      console.log(error)
    }
  }
  const onSubmit = handleSubmit(async (data) => {
    let url = API_URL + 'ServiceCodeCartable/Refer'

    let formData = new FormData()
    formData.append('Id', id.toString())
    formData.append('NextStatusId', nextStatusId.toString())
    if (memberId !== undefined) formData.append('memberId', memberId)
    for (var i = 0; i < dataList.length; i++) {
      formData.append('Files[' + i + '].FileTypeId', dataList[i].fileTypeId.toString())
      formData.append('Files[' + i + '].File', dataList[i].file)
    }
    debugger

    try {
      await axios.post(url, formData)

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

  const resetForm = () => {
    reset()
    if (isDirty) {
    }
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
  const nextStatusbtn = (e: any) => {
    setnextStatusId(e.id)
  }
  const handleDeleteFileItem = (id: any) => {}
  return (
    <div>
      <Dialog title={'ارجاع '} onClose={onClose}>
        <div style={{width: '1000px', height: '600px'}}>
          <div className='card card-custom'>
            <div className='card-body'>
              <div className='tab-content pt-3'>
                <div className={clsx('tab-pane', {active: tab === 'Header'})}>
                  <form id='dialog-form' onSubmit={onSubmit} className='row g-3'>
                    <FormControl col={6} label={'وضعیت بعدی'}>
                      <ComboBoxLocaltow
                        endpoint={''}
                        onChange={(e: any) => nextStatusbtn(e)}
                        filldata={nextStatusList}
                        className='form-control'
                      />
                    </FormControl>
                    <FormControl col={6} label='پاراف'>
                      <textarea {...register('paraph')} />
                    </FormControl>
                    <div className='card-body'>
                      <div className='tab-content pt-3'>
                        <div>
                          <div className=' card card-px-0 mb-2 shadow '>
                            <div className='card-body' style={{margin: '5px'}}>
                              <div className='row'>
                                {' '}
                                <div className='col-6'>
                                  <FormControl col={12} label={'عنوان فایل'}>
                                    <ComboBoxLocaltow
                                      endpoint={API_URL + '/Agentreal/GetFileTypes'}
                                      onChange={(e: any) => filetypecbtn(e)}
                                      filldata={fileTypeList}
                                      className='form-control'
                                    />
                                  </FormControl>
                                </div>
                                <div className='col-5'>
                                  <div>
                                    {/* <label className='col-sm-4 col-form-label'>{data.titleFa} </label> */}

                                    <label className='k-button col-sm-10' style={{height: '42px'}}>
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
                                <div className='col-1'>
                                  <a
                                    id='myBtn1'
                                    onClick={FileAddlist}
                                    className='k-button k-primary'
                                  >
                                    {'ثبت'}
                                  </a>
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
                                  className='col-sm-10 col-form-label'
                                  style={{
                                    border: 'solid 1px rgb(222, 226, 230)',
                                  }}
                                >
                                  {'عنوان فایل'}{' '}
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
                                        index % 2 === 0
                                          ? '#ffffff'
                                          : config.main?.primaryColor + '21',
                                    }}
                                  >
                                    <label
                                      className='col-sm-10 col-form-label'
                                      style={{
                                        border: 'solid 1px rgb(222, 226, 230)',
                                      }}
                                    >
                                      {data.fileTypeTitle}{' '}
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
                        <DialogActions
                          mode={'new'}
                          onClose={onClose}
                          resetForm={resetForm}
                        ></DialogActions>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>

            {/* end::Form */}
          </div>
        </div>
      </Dialog>
    </div>
  )
}
