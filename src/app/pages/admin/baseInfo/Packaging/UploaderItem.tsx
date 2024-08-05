import {useEffect} from 'react'
import {Dialog} from '@progress/kendo-react-dialogs'
import {defaultPageTitles, FormMode} from '@core/forms'
import axios from 'axios'
import {toast} from 'react-toastify'
import {FieldError, useForm} from 'react-hook-form'
import {FormControl, DialogActions} from '@core/components'
import {useIntl} from 'react-intl'
import {KTSVG} from '_metronic/helpers'

type PropsType = {
  data: uploaderModel
  selectitem: (event: React.ChangeEvent<HTMLInputElement>, id: number) => void
}
export type uploaderModel = {
  fileTypeId: number
  description: string
  isRequired: boolean
  // maxByteSize: number
  titleEn: string
  titleFa: string
}

export function UploaderItem({data, selectitem}: PropsType) {
  const intl = useIntl()
  // const selectitem = (event: React.ChangeEvent<HTMLInputElement>, id: number) => {
  //   const {files} = event.target
  //   const selectedFiles = files as FileList
  //   //selectedFiles[0].name
  // }
  const handleResetClick = (id: number) => {
    const fileInput = document.getElementById('file-' + id)
    debugger
    if (fileInput) {
      ;(fileInput as HTMLInputElement).value = ''
    }
  }
  return (
    <div className='col-lg-6' style={{padding: 10}}>
      {/* <input
        className='form-check-input'
        type='radio'
        name='rdoPackageType'
        value={'false'}
        onChange={() => selectitem(data.fileTypeId)}
      /> */}

      <label className='k-button col-sm-6' style={{height: '42px'}}>
        <label>{data.titleFa}</label>
        <input
          style={{visibility: 'hidden'}}
          id={'file-' + data.fileTypeId}
          type='file'
          onChange={(e) => selectitem(e, data.fileTypeId)}
        />
      </label>

      <button
        onClick={(e) => handleResetClick(data.fileTypeId)}
        className='k-button col-sm-1 btn btn-icon btn-bg-light btn-active-color-danger '
        style={{marginRight: '1px;'}}
      >
        <KTSVG path='/media/icons/duotune/general/gen034.svg' className='svg-icon-3' />
      </button>
    </div>
  )
}
