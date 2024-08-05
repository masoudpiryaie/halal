import React, {useRef, useEffect, useState} from 'react'
import {Dialog} from '@progress/kendo-react-dialogs'
import {defaultPageTitles, FormMode} from '@core/forms'
import axios from 'axios'
import {toast} from 'react-toastify'
import {FieldError, useForm} from 'react-hook-form'
import {FormControl, DialogActions} from '@core/components'
import {useIntl} from 'react-intl'
import {processTreeViewItems} from '@progress/kendo-react-treeview'
import {UploaderItem} from './UploaderItem'
import {Lists} from 'app/modules/widgets/components/Lists'
import {Upload} from '@progress/kendo-react-upload'
import {KTSVG} from '_metronic/helpers'
type PropsType = {
  mode: FormMode
  onClose: () => void
  item?: PackagingModel
}
export type PackagingModel = {
  id?: number
  titleFa: string
  titleEn: string
  files: FileModel
}
export type FileModel = {
  fileTypeId: number
  file: File
}
const pageTitles = defaultPageTitles

export function PackagingCreateDialog({mode, onClose, item}: PropsType) {
  const intl = useIntl()
  const API_URL = process.env.REACT_APP_API_URLCoding || 'api'
  const [isActive, setIsActive] = useState('true')
  const [items, setItems] = React.useState<any[]>([])
  const [items1, setItems1] = React.useState<any[]>([])
  const [items2, setItems2] = React.useState<any[]>([])
  const [name, setName] = React.useState<any[]>([])
  const [ffffff, sets] = React.useState<Array<any>>([])
  const [ffffff1, sets1] = React.useState<Array<any>>([])
  // const fileList: Array<FileModel> = []
  // const fileList1: Array<FileModel> = []

  // const fileList: Array<File | null> = []
  const {
    register,
    handleSubmit,
    reset,
    formState: {errors, isDirty, touchedFields},
  } = useForm<PackagingModel>({mode: 'all'})
  const hh = [
    {
      fileTypeId: 1,
      titleFa: 'تصویر لوگو',
      titleEn: 'Logo Picture',
      //maxByteSize: 3145728,
      description: '',
      isRequired: true,
    },
  ]
  useEffect(() => {
    fetchUploader()
    if (mode === 'edit') {
      reset(item)
    }
  }, [])

  const fetchUploader = async () => {
    try {
      let url = API_URL + 'Packagings/GetFileTypes'
      const fetchResponse = await fetch(`${url}`, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
        },
      })
      const uploaders = await fetchResponse.json()
      setItems(uploaders.value)
      uploaders.value.forEach((item: any) => {
        const list = [...items1]
        if (item.isRepeatable) {
          list.push(item)
          setItems1(list)
        }
      })

      debugger

      debugger
    } catch (error) {
      console.log(error)
    }
  }
  // var array = [{id: 1}, {id: 3}]
  const onSubmit = handleSubmit(async (data) => {
    debugger
    formData.append('TitleEn', data.titleEn)
    formData.append('TitleFa', data.titleFa)
    // const file = new Blob(array)
    var count = 0
    for (var i = 0; i < ffffff.length; i++) {
      formData.append('Files[' + i + '].FileTypeId', ffffff[i].fileTypeId.toString())
      formData.append('Files[' + i + '].File', ffffff[i].file)
      count = i
    }
    for (var j = 0; j < ffffff1.length; j++) {
      count++
      formData.append(
        'Files[' + count + '].FileTypeId',
        ffffff1[j].fileTypeId.toString().split('-')[0]
      )
      formData.append('Files[' + count + '].File', ffffff1[j].file)
    }
    // for (var i = 0; i < fileList.length; i++) {
    //   formData.append('Files[' + i + '].FileTypeId', fileList[i].fileTypeId.toString())
    //   formData.append('Files[' + i + '].File', fileList[i].file)
    //   count = i
    // }
    // for (var j = 0; j < fileList1.length; j++) {
    //   count++
    //   formData.append(
    //     'Files[' + count + '].FileTypeId',
    //     fileList1[j].fileTypeId.toString().split('-')[0]
    //   )
    //   formData.append('Files[' + count + '].File', fileList1[j].file)
    // }

    //formData.get('Files')
    let url = API_URL + 'Packagings'

    axios({
      method: 'post',
      url: url,
      data: formData,
      headers: {'Content-Type': 'multipart/form-data'},
    })
      .then(function (response) {
        toast.info(intl.formatMessage({id: 'MENU.ACTIONSuccess'}))
        onClose()
      })
      .catch(function (response) {
        toast.error(intl.formatMessage({id: 'MENU.ACTIONError'}))
      })

    // try {
    //   if (mode !== 'edit') await axios.post(url, data)
    //   else await axios.put(url, data)
    //   toast.info(intl.formatMessage({id: 'MENU.ACTIONSuccess'}))
    //   onClose()
    // } catch (e: any) {
    //   if (!e.processed) {
    //     toast.error(intl.formatMessage({id: 'MENU.ACTIONError'}))
    //   }
    // }
  })

  const resetForm = () => {
    reset()
    if (isDirty) {
    }
  }
  const getValidationClass = (touched: boolean | undefined, error: FieldError | undefined) => {
    return error ? 'is-invalid' : 'is-valid'
  }
  // const selectitem = (id: number) => {
  //   const fileInput = document.getElementById('file-' + id)
  //   const selectedFiles = fileInput as any //FileList
  //   setFiles(selectedFiles)
  //   debugger
  // }
  let formData = new FormData()

  const selectitem = (event: React.ChangeEvent<HTMLInputElement>, id: number) => {
    if (event.target.files) {
      //fileList.push({fileTypeId: id, file: event.target.files[0]})
      const newItem = [...ffffff]
      newItem[ffffff.length] = {fileTypeId: id, file: event.target.files[0]}
      sets(newItem)
      debugger
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
      //fileList1.push({fileTypeId: id, file: event.target.files[0]})
      debugger
      const {files} = event.target
      const selectedFiles = files as FileList

      const output = document.getElementById('fileName-' + id)
      if (output) output.innerHTML = event.target.files[0].name
    }
  }

  const handleResetClick = (id: number) => {
    const fileInput = document.getElementById('file-' + id)
    debugger
    const output = document.getElementById('fileName-' + id)
    if (output) output.innerHTML = 'انتخاب فایل '
  }

  const [counter, setcounter] = useState(1)
  const addUploadbtn = (id: number, name: string, maxByteSize: any) => {
    debugger
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

  return (
    <div>
      <Dialog title={pageTitles[mode]} onClose={onClose}>
        <div>
          <form id='dialog-form' onSubmit={onSubmit} className='row g-3'>
            <FormControl col={6} label={intl.formatMessage({id: 'Model.Units.TitleFa'})}>
              <input
                className={getValidationClass(touchedFields.titleFa, errors.titleFa)}
                autoFocus={true}
                {...register('titleFa', {required: true})}
              />
            </FormControl>
            <FormControl col={6} label={intl.formatMessage({id: 'Model.Units.TitleEn'})}>
              <input
                className={getValidationClass(touchedFields.titleEn, errors.titleEn)}
                {...register('titleEn', {required: true})}
              />
            </FormControl>
            {/* <div className={'row 12'}>
              {items.map((x) => (
                <UploaderItem data={x} selectitem={() => selectitem(x.fileTypeId)}></UploaderItem>
              ))}
            </div> */}
            <div>
              {items1.map(function (data) {
                return (
                  <div className='container row col-md-4'>
                    <label className='col-sm-4 col-form-label'>{data.titleFa} </label>
                    <label
                      className='btn btn-icon btn-bg-light btn-active-color-success btn-sm me-1'
                      onClick={(e) => addUploadbtn(data.fileTypeId, data.titleFa, data.maxByteSize)}
                    >
                      {' '}
                      <KTSVG
                        path='/media/icons/duotune/general/gen035.svg'
                        className='svg-icon-3'
                      />
                    </label>
                  </div>
                )
              })}
            </div>
            <div>
              {items2.map(function (data1, idx) {
                return (
                  <div key={idx} className='container row col-md-4'>
                    <label className='col-sm-4 col-form-label'>{data1.titleFa} </label>

                    <label className='k-button col-sm-6' style={{height: '42px'}}>
                      <label id={'fileName-' + data1.fileTypeId}>{'انتخاب فایل'}</label>
                      <input
                        style={{visibility: 'hidden'}}
                        id={'file-' + data1.fileTypeId}
                        type='file'
                        onChange={(e) => selectitem1(e, data1.fileTypeId)}
                      />
                    </label>

                    <label
                      className='k-button col-sm-1 btn btn-icon btn-bg-light btn-active-color-danger '
                      onClick={(e) => handleResetClick(data1.fileTypeId)}
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
            <div>
              {items.map(function (data) {
                return (
                  <div className='container row col-md-4'>
                    <label className='col-sm-4 col-form-label'>{data.titleFa} </label>

                    <label className='k-button col-sm-6' style={{height: '42px'}}>
                      <label id={'fileName-' + data.fileTypeId}>{'انتخاب فایل'}</label>
                      <input
                        style={{visibility: 'hidden'}}
                        id={'file-' + data.fileTypeId}
                        type='file'
                        onChange={(e) => selectitem(e, data.fileTypeId)}
                      />
                    </label>

                    <label
                      className='k-button col-sm-1 btn btn-icon btn-bg-light btn-active-color-danger '
                      onClick={(e) => handleResetClick(data.fileTypeId)}
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
          </form>
        </div>
        <DialogActions mode={mode} onClose={onClose} resetForm={resetForm}></DialogActions>
      </Dialog>
    </div>
  )
}
