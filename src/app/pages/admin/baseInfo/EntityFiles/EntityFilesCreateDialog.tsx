import {useEffect, useState} from 'react'
import {Dialog} from '@progress/kendo-react-dialogs'
import {defaultPageTitles, FormMode} from '@core/forms'
import axios from 'axios'
import {toast} from 'react-toastify'
import {Controller, FieldError, useForm} from 'react-hook-form'
import {FormControl, DialogActions} from '@core/components'
import {useIntl} from 'react-intl'
import {ComboBox} from '@core/components'

type PropsType = {
  mode: FormMode
  onClose: () => void
  item?: EntityFilesModel
}
export type EntityFilesModel = {
  id?: number
  group: number
  fileTypeId: number
  isRequired: boolean
  isRepeatable: boolean
}
const pageTitles = defaultPageTitles

export function EntityFilesCreateDialog({mode, onClose, item}: PropsType) {
  const intl = useIntl()
  const API_URL = process.env.REACT_APP_API_URLCoding || 'api'
  const [isActive, setIsActive] = useState('true')
  const [fileTypeId, setfileTypeId] = useState(0)
  const [groupTitle, setgroupTitle] = useState('0')

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: {errors, isDirty, touchedFields},
  } = useForm<EntityFilesModel>({mode: 'all'})

  useEffect(() => {
    if (mode === 'edit') {
      reset(item)
    }
  }, [mode, item, reset])

  const onSubmit = handleSubmit(async (data) => {
    debugger
    try {
      data.isRequired = true
      data.isRepeatable = true
      data.fileTypeId = fileTypeId
      data.group = parseInt(groupTitle)
      if (mode !== 'edit') {
        let url = API_URL + 'EntityFiles/CreateJson'
        await axios.post(url, data)
      } else {
        let url = API_URL + 'EntityFiles/UpdateJson'
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
    if (touched === true) {
      return error ? 'is-invalid' : 'is-valid'
    }
  }

  const handleChangefileType = (event: any) => {
    setfileTypeId(event)
  }
  const handleChangefileTypegroup = (event: any) => {
    debugger
    setgroupTitle(event)
  }
  return (
    <div>
      <Dialog title={pageTitles[mode]} onClose={onClose}>
        <div>
          <form id='dialog-form' onSubmit={onSubmit} className='row g-3'>
            {/* <FormControl col={6} label={intl.formatMessage({id: 'Model.EntityFile.GroupTitle'})}>
              <select
                className='form-select form-select-solid'
                name='layout-builder[layout][footer][width]'
                value={groupTitle}
                onChange={(e) => setgroupTitle(e.target.value)}
              >
                <option value='1'>عضو حقیقی</option>
                <option value='2'>عضو حقوقی</option>
                <option value='3'>بسته بندی</option>
                <option value='4'>GTIN </option>
                <option value='5'>Referral </option>
                <option value='6'>Comunication</option>
                <option value='7'>نماینده حقیقی</option>
                <option value='8'>نماینده حقوقی</option>
              </select>
            </FormControl> */}
            <FormControl col={6} label={intl.formatMessage({id: 'Model.EntityFile.GroupTitle'})}>
              <Controller
                name='group'
                control={control}
                render={({field: {onChange, onBlur, value, ref}}) => (
                  <ComboBox
                    endpoint={API_URL + 'EntityFiles/GetEntityFileGroups'}
                    onChange={handleChangefileTypegroup}
                    onBlur={onBlur}
                  />
                )}
              />
            </FormControl>
            <FormControl col={6} label={intl.formatMessage({id: 'Model.EntityFile.FileType'})}>
              <Controller
                name='fileTypeId'
                control={control}
                render={({field: {onChange, onBlur, value, ref}}) => (
                  <ComboBox
                    endpoint={API_URL + 'FileTypes/GetDropdown'}
                    onChange={handleChangefileType}
                    onBlur={onBlur}
                  />
                )}
              />
            </FormControl>

            {/* <FormControl col={6} label={intl.formatMessage({id: 'Model.EntityFile.FileType'})}>
              <input
                className={getValidationClass(touchedFields.fileType, errors.fileType)}
                autoFocus={true}
                {...register('fileType', {required: true})}
              />
            </FormControl> */}
          </form>
        </div>
        <DialogActions mode={mode} onClose={onClose} resetForm={resetForm}></DialogActions>
      </Dialog>
    </div>
  )
}
