import {Upload} from '@progress/kendo-react-upload'
import axios from 'axios'
import {useState, useEffect, useCallback} from 'react'

interface UploadProps {
  endpoint?: string
  multiple: boolean
  onChange: (files: any[]) => void
}
const fileStatuses = [
  'UploadFailed',
  'Initial',
  'Selected',
  'Uploading',
  'Uploaded',
  'RemoveFailed',
  'Removing',
]

export function Uploader({onChange, multiple}: UploadProps) {
  const [files, setFiles] = useState([])
  // const [filePreviews, setFilePreviews] = useState({})
  const [affectedFiles, setAffectedFiles] = useState([])
  // useEffect(() => {
  //   affectedFiles
  //     .filter((file: any) => !file.validationErrors)
  //     .forEach((file: any) => {
  //       const reader = new FileReader()

  //       reader.onloadend = (ev) => {
  //         setFilePreviews({...filePreviews, 1: ev.target?.result})
  //       }

  //       reader.readAsDataURL(file.getRawFile())
  //     })
  // }, [affectedFiles, filePreviews])

  const onAdd = (event: any) => {
    setFiles(event.newState)
    setAffectedFiles(event.affectedFiles)
    onChange(event.newState)
  }

  const onRemove = (event: any) => {
    // let newFilePreviews = {...filePreviews}
    // event.affectedFiles.forEach((file: any) => {
    //   delete newFilePreviews[file.uid]
    // })
    setFiles(event.newState)
    onChange(event.newState)
    //setFilePreviews(newFilePreviews)
  }

  const onProgress = (event: any) => {
    setFiles(event.newState)
  }

  const onStatusChange = (event: any) => {
    const file = event.affectedFiles[0]
    setFiles(event.newState)
  }

  return (
    <div>
      <Upload
        batch={false}
        multiple={multiple}
        files={files}
        onAdd={onAdd}
        onRemove={onRemove}
        onProgress={onProgress}
        onStatusChange={onStatusChange}
        withCredentials={false}
        autoUpload={false}
        // saveUrl={'https://demos.telerik.com/kendo-ui/service-v4/upload/save'}
        // saveUrl={props.endpoint}
        // removeUrl={'https://demos.telerik.com/kendo-ui/service-v4/upload/remove'}
      />
      <div
        className={'example-config'}
        style={{
          marginTop: 20,
        }}
      ></div>
    </div>
  )
}
Uploader.defaultProps = {multiple: false}