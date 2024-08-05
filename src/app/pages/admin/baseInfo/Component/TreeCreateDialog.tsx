import {useEffect, useState} from 'react'
import {Dialog} from '@progress/kendo-react-dialogs'
import {defaultPageTitles, FormMode} from '@core/forms'
import axios from 'axios'
import {toast} from 'react-toastify'
import {FieldError, useForm} from 'react-hook-form'
import {FormControl, DialogActions} from '@core/components'
import {useIntl} from 'react-intl'
import {title} from 'process'
import {forEach} from 'rambda'

type PropsType = {
  mode: FormMode
  parentID: number
  treeID: number
  onClose: () => void
  item?: StructureModel
  api: string
}
export type StructureModel = {
  id?: number
  titleFa: string
  titleEn: string
  keyCode: number
  description: string
  parentID: number | null
}
const pageTitles = defaultPageTitles

export function TreeCreateDialog({mode, parentID, treeID, onClose, api}: PropsType) {
  const intl = useIntl()
  const [titleFa, settitleFa] = useState('')
  const [titleEn, settitleEn] = useState('')
  const [keyCode, setkeyCode] = useState('')
  const [description, setdescription] = useState('')
  const [path, setPath] = useState('')
  const API_URL = process.env.REACT_APP_API_URLCoding || 'api'
  const API_URLCoding = API_URL + api //process.env.REACT_APP_API_URL || 'api'
  const {
    register,
    handleSubmit,
    reset,
    formState: {errors, isDirty, touchedFields},
  } = useForm<StructureModel>({mode: 'all'})

  useEffect(() => {
    debugger
    if (mode === 'edit') fetchData()
    fetchPath()
  }, [mode, reset])
  const fetchData = async () => {
    try {
      let url = API_URLCoding + '/' + treeID
      const resp = await axios.get(url)

      settitleFa(resp.data.value.titleFa)
      settitleEn(resp.data.value.titleEn)
      setdescription(resp.data.value.description)
      setkeyCode(resp.data.value.keyCode)
      debugger
    } catch (error) {
      console.log(error)
    }
  }
  const fetchPath = async () => {
    try {
      let url = API_URLCoding + '/' + treeID
      const resp = await axios.get(url)
      debugger
      var path = ''
      var currentNode = mode !== 'edit' ? '/' + resp.data.value.titleFa : ''
      resp.data.value.allParents.forEach((par: any) => {
        path = path === '' ? par.parentTitle : path + '/' + par.parentTitle + currentNode
      })
      setPath(path)
      debugger
    } catch (error) {
      console.log(error)
    }
  }

  const onSubmit = handleSubmit(async (data) => {
    debugger

    let url = API_URLCoding
    try {
      if (mode !== 'edit') {
        data.parentID = parentID === 0 ? null : parentID
        await axios.post(url, data)
      } else {
        data.id = treeID
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
  const getValidationClass = (
    touched: boolean | undefined,
    error: FieldError | undefined,
    name: any
  ) => {
    return error ? 'is-invalid' : 'is-valid'
  }
  return (
    <div>
      <Dialog title={pageTitles[mode]} onClose={onClose} style={{zIndex: 90000}}>
        <div>
          <form id='dialog-form' onSubmit={onSubmit} className='row g-3'>
            <label>ساختار انتخاب شده :{path}</label>
            <FormControl col={6} label={intl.formatMessage({id: 'Model.Structure.Title'})}>
              <input
                // className={getValidationClass(touchedFields.titleFa, errors.titleFa, 'titleFa')}
                {...register('titleFa', {required: true})}
                value={titleFa}
                autoFocus={true}
                onChange={(event) => {
                  settitleFa(event.target.value)
                }}
              />
            </FormControl>
            <FormControl col={6} label={intl.formatMessage({id: 'Model.Structure.EnTitle'})}>
              <input
                {...register('titleEn', {required: true})}
                value={titleEn}
                onChange={(event) => {
                  settitleEn(event.target.value)
                }}
              />
            </FormControl>
            <FormControl col={6} label={'کد یکتا'}>
              <input
                {...register('keyCode', {required: true})}
                value={keyCode}
                onChange={(event) => {
                  setkeyCode(event.target.value)
                }}
              />
            </FormControl>
            <FormControl col={6} label={intl.formatMessage({id: 'Model.Structure.Description'})}>
              <textarea
                // className={getValidationClass(
                //   touchedFields.description,
                //   errors.description,
                //   'description'
                // )}
                {...register('description')}
                value={description}
                onChange={(event) => {
                  setdescription(event.target.value)
                }}
              />
            </FormControl>
          </form>
        </div>
        <DialogActions mode={mode} onClose={onClose} resetForm={resetForm}></DialogActions>
      </Dialog>
    </div>
  )
}
