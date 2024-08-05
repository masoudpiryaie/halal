import {useEffect, useState} from 'react'
import {Dialog} from '@progress/kendo-react-dialogs'
import {defaultPageTitles, FormMode} from '@core/forms'
import axios from 'axios'
import {toast} from 'react-toastify'
import {Controller, FieldError, useForm} from 'react-hook-form'
import {FormControl, DialogActions, ComboBox} from '@core/components'
import {Upload} from '@progress/kendo-react-upload'
import {useIntl} from 'react-intl'

const fileStatuses = [
  'UploadFailed',
  'Initial',
  'Selected',
  'Uploading',
  'Uploaded',
  'RemoveFailed',
  'Removing',
]

type PropsType = {
  mode: FormMode
  onClose: () => void
  item?: CountryPortModel
}
export type CountryPortModel = {
  id?: number
  name: string
  latinName: string
  isActive: boolean
  countryId: number
  stateId: number
  portType: number
}
const pageTitles = defaultPageTitles

export function CountryPortCreateDialog({mode, onClose, item}: PropsType) {
  const intl = useIntl()
  //////////region upload
  const [files, setFiles] = useState([])
  const [events, setEvents] = useState([])
  const [filePreviews, setFilePreviews] = useState({})
  const [affectedFiles, setAffectedFiles] = useState([])
  useEffect(() => {
    affectedFiles
      .filter((file: any) => !file.validationErrors)
      .forEach((file: any) => {
        const reader = new FileReader()

        reader.onloadend = (ev) => {
          setFilePreviews({...filePreviews, 1: ev.target?.result})
        }

        reader.readAsDataURL(file.getRawFile())
      })
  }, [affectedFiles, filePreviews])

  const onAdd = (event: any) => {
    setFiles(event.newState)
    //setEvents([...events, `File selected: ${event.affectedFiles[0].name}`])
    setAffectedFiles(event.affectedFiles)
  }

  const onRemove = (event: any) => {
    // let newFilePreviews = {...filePreviews}
    // event.affectedFiles.forEach((file: any) => {
    //   delete newFilePreviews[file.uid]
    // })
    setFiles(event.newState)
    //setEvents([...events, `File removed: ${event.affectedFiles[0].name}`])
    //setFilePreviews(newFilePreviews)
  }

  const onProgress = (event: any) => {
    setFiles(event.newState)
    //setEvents([...events, `On Progress: ${event.affectedFiles[0].progress} %`])
  }

  const onStatusChange = (event: any) => {
    const file = event.affectedFiles[0]
    setFiles(event.newState)
    //setEvents([...events, `File '${file.name}' status changed to: ${fileStatuses[file.status]}`])
  }

  ////////////region upload
  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: {errors, isDirty, touchedFields},
  } = useForm<CountryPortModel>({mode: 'all'})

  useEffect(() => {
    if (mode === 'edit') {
      reset(item)
    }
  }, [mode, item, reset])

  const onSubmit = handleSubmit(async (data) => {
    let url = 'countryPort'
    if (mode === 'edit') {
      url += '/' + item?.id
    }
    try {
      await axios.post(url, data)
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
      <Dialog title={pageTitles[mode]} onClose={onClose} width='50vw'>
        <div>
          {/* <div>
            <Upload
              batch={false}
              multiple={false}
              files={files}
              onAdd={onAdd}
              onRemove={onRemove}
              onProgress={onProgress}
              onStatusChange={onStatusChange}
              withCredentials={false}
              saveUrl={'https://demos.telerik.com/kendo-ui/service-v4/upload/save'}
              removeUrl={'https://demos.telerik.com/kendo-ui/service-v4/upload/remove'}
            />
            <div
              className={'example-config'}
              style={{
                marginTop: 20,
              }}
            >
              <ul className={'event-log'}>
                {events.map((event, index) => (
                  <li key={index}>{event}</li>
                ))}
              </ul>
            </div>
            {files.length ? (
              <div className={'img-preview example-config'}>
                <h3>Preview selected images</h3>
                {Object.keys(filePreviews).map((fileKey, index) => (
                  <img
                    alt={'image preview'}
                    style={{
                      width: 200,
                      margin: 10,
                    }}
                    key={index}
                  />
                ))}
              </div>
            ) : undefined}
          </div> */}
          <form id='dialog-form' onSubmit={onSubmit} className='row g-3'>
            <FormControl col={6} label={intl.formatMessage({id: 'Model.CountryPort.Name'})}>
              <input
                className={getValidationClass(touchedFields.name, errors.name)}
                autoFocus={true}
                {...register('name', {required: true, pattern: /^\w{3,3}\d{3,3}$/})}
              />
            </FormControl>

            <FormControl col={6} label={intl.formatMessage({id: 'Model.CountryPort.LatinName'})}>
              <input
                className={getValidationClass(touchedFields.latinName, errors.latinName)}
                {...register('latinName', {required: true, pattern: /^\w{3,3}\d{3,3}$/})}
              />
            </FormControl>
            <FormControl col={6} label={intl.formatMessage({id: 'Model.CountryPort.PortType'})}>
              <input
                className={getValidationClass(touchedFields.portType, errors.portType)}
                {...register('portType', {required: true})}
              />
            </FormControl>
            <FormControl col={6} label={intl.formatMessage({id: 'Model.CountryPort.IsActive'})}>
              <select
                className={getValidationClass(touchedFields.isActive, errors.isActive)}
                {...register('isActive', {setValueAs: (v) => v === 'true'})}
              >
                <option value='true'>
                  {' '}
                  {intl.formatMessage({id: 'FormControl.Input.Select.Active'})}
                </option>
                <option value='false'>
                  {' '}
                  {intl.formatMessage({id: 'FormControl.Input.Select.Inactive'})}
                </option>
              </select>
            </FormControl>
            <FormControl col={12} label={intl.formatMessage({id: 'Model.CountryPort.Country'})}>
              <Controller
                name='countryId'
                control={control}
                render={({field: {onChange, onBlur, value, ref}}) => (
                  <ComboBox
                    endpoint='country/combo'
                    preSelectedId={item?.countryId}
                    onChange={onChange}
                    onBlur={onBlur}
                  />
                )}
              />
            </FormControl>
            <FormControl col={12} label={intl.formatMessage({id: 'Model.CountryPort.State'})}>
              <Controller
                name='stateId'
                control={control}
                render={({field: {onChange, onBlur, value, ref}}) => (
                  <ComboBox
                    endpoint='state/combo'
                    preSelectedId={item?.stateId}
                    onChange={onChange}
                    onBlur={onBlur}
                  />
                )}
              />
            </FormControl>
          </form>
        </div>
        <DialogActions mode={mode} onClose={onClose} resetForm={resetForm}></DialogActions>
      </Dialog>
    </div>
  )
}
