import React, {useEffect, useState} from 'react'
import {Dialog} from '@progress/kendo-react-dialogs'
import {defaultPageTitles, FormMode} from '@core/forms'
import axios from 'axios'
import {toast} from 'react-toastify'
import {FieldError, useForm} from 'react-hook-form'
import {FormControl, DialogActions, ComboBoxLocaltow} from '@core/components'
import {useIntl} from 'react-intl'
import {KTSVG} from '_metronic/helpers'
import {useLayout} from '_metronic/layout/core'
import DatePicker from 'react-datepicker2'
import * as shamsi from 'shamsi-date-converter'
import moment from 'jalali-moment'

type PropsType = {
  mode: FormMode
  onClose: () => void
  item?: TariffsModel
}
export type TariffsModel = {
  id?: number
  price: string
}
const pageTitles = defaultPageTitles

export function TariffsCreateDialog({mode, onClose, item}: PropsType) {
  const intl = useIntl()
  const API_URL = process.env.REACT_APP_API_URLCoding || 'api'
  const {config} = useLayout()
  const [fileTypeList, setFileTypeList] = useState<any[]>([])
  const [fileTypeId, setfileTypeId] = useState(0)
  const [fileTypeTitle, setfileTypeTitle] = useState('')
  const [startDate, setStartDate] = useState(moment().add(2, 'days'))
  const {
    register,
    handleSubmit,
    reset,
    formState: {errors, isDirty, touchedFields},
  } = useForm<TariffsModel>({mode: 'all'})

  useEffect(() => {
    fetchfileType()
    if (mode === 'edit') {
      reset(item)
    }
  }, [mode, item, reset])
  const fetchfileType = async () => {
    try {
      let url = API_URL + 'Agentreal/GetFileTypes'
      const resp = await axios.get(url)

      var newlist = resp.data.value.map(function (row: any) {
        return {id: row.fileTypeId, title: row.titleFa}
      })

      setFileTypeList(newlist)
    } catch (error) {
      console.log(error)
    }
  }

  const onSubmit = handleSubmit(async (data) => {
    debugger

    try {
      if (mode !== 'edit') {
        let url = API_URL + 'addressTitle'
        await axios.post(url, data)
      } else {
        let url = API_URL + 'addressTitle/UpdateJson'
        await axios.put(url, data)
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
  const handleDeleteFileItem = (id: any) => {}
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
    if (fileList.length === 0 || fileTypeId === 0) {
      toast.info('اطلاعات را کامل کنید', {
        position: 'top-center',
      })
    } else {
      const newItem = [...dataList]
      newItem[dataList.length] = {
        fileTypeId: fileTypeId,
        file: fileList[dataList.length].file,
        fileTypeTitle: fileTypeTitle,
      }
      setdataList(newItem)

      setfileTypeId(0)
      const output = document.getElementById('fileName-0')
      if (output) output.innerHTML = 'فابل'
    }
  }
  const filetypecbtn = (e: any) => {
    setfileTypeId(e.id)
    setfileTypeTitle(e.title)
  }
  const setDate = (event: any) => {
    setStartDate(event)
  }
  return (
    <div>
      <Dialog title={pageTitles[mode]} onClose={onClose}>
        <div>
          <form id='dialog-form' onSubmit={onSubmit} className='row g-3'>
            <FormControl col={6} label='مبلغ'>
              <input
                className={getValidationClass(touchedFields.price, errors.price)}
                autoFocus={true}
                {...register('price', {required: true})}
              />
            </FormControl>

            <div className='row col-md-6'>
              <label className='col-sm-4 col-form-label'>{'تاریخ تا'}</label>
              <div style={{left: '5px'}} className='col-sm-8'>
                <DatePicker
                  onChange={setDate}
                  value={startDate}
                  className=' form-control is-date'
                  isGregorian={false}
                  timePicker={false}
                />
              </div>
            </div>
            <div>
              <div className=' card card-px-0 mb-2 shadow '>
                <div className='card-body' style={{margin: '5px'}}>
                  <div className='row'>
                    {' '}
                    <div className='col-3'>
                      <FormControl col={12} label={'عنوان فایل'}>
                        <ComboBoxLocaltow
                          endpoint={''}
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
          </form>
        </div>
        <DialogActions mode={mode} onClose={onClose} resetForm={resetForm}></DialogActions>
      </Dialog>
    </div>
  )
}
