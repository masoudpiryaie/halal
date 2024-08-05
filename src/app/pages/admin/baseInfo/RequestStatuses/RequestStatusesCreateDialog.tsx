import React, {useEffect, useState} from 'react'
import {GridColumn} from '@progress/kendo-react-grid'
import {Dialog} from '@progress/kendo-react-dialogs'
import {defaultPageTitles, FormMode} from '@core/forms'
import axios from 'axios'
import {toast} from 'react-toastify'
import {FieldError, useForm, Controller} from 'react-hook-form'
import {FormControl, DialogActions, ComboBoxLocal, Grid} from '@core/components'
import {useIntl} from 'react-intl'

import {CompositeFilterDescriptor} from '@progress/kendo-data-query'

type PropsType = {
  mode: FormMode
  onClose: () => void
  item?: RequestStatusesModel
}
export type RequestStatusesModel = {
  id?: number
  title: string
  description: string
  isParaphRequired: boolean
  isFileRequired: boolean
  isEditable: boolean
  needReciever: boolean
  level: number
  levelTitle: string
  targetType: number
  targetTypeTitle: string
  state: number
  stateTitle: string
  nextStatusIds: any[]
}

export interface IModelGr {
  title: string
  field: string
  show: boolean
}
const pageTitles = defaultPageTitles

export function RequestStatusesCreateDialog({mode, onClose, item}: PropsType) {
  const intl = useIntl()
  const API_URL = process.env.REACT_APP_API_URLCoding || 'api'
  const [datalevel, setdatalevel] = useState<any[]>([])
  const [level, setlevel] = useState(0)
  const [states, setStates] = useState(0)
  const [dataStates, setdataStates] = useState<any[]>([])
  const [targetTypes, setTargetTypes] = useState(0)
  const [dataTargetTypes, setdataTargetTypes] = useState<any[]>([])
  const [refresh, setRefresh] = useState(1)
  const [checkBoxData, setCheckBoxData] = useState<number[]>([])

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: {errors, isDirty, touchedFields},
  } = useForm<RequestStatusesModel>({mode: 'all'})
  const [filter, setFilter] = useState<CompositeFilterDescriptor>()
  const gr = localStorage.getItem('RequestStatusesCreate')
  var col = gr
    ? (JSON.parse(gr) as IModelGr[])
    : [
        {
          title: 'عنوان ',
          field: 'title',
          show: true,
        },
      ]
  useEffect(() => {
    fetchlevel()
    fetchGetStates()
    fetchGetTargetTypes()
    if (mode === 'edit') {
      reset(item)
    }
  }, [mode, item, reset])
  const fetchlevel = async () => {
    try {
      let url = API_URL + 'RequestStatuses/GetLevels'
      const resp = await axios.get(url)
      setdatalevel(resp.data.value)
    } catch (error) {
      console.log(error)
    }
  }
  const fetchGetStates = async () => {
    try {
      let url = API_URL + 'RequestStatuses/GetStates'
      const resp = await axios.get(url)
      setdataStates(resp.data.value)
      debugger
    } catch (error) {
      console.log(error)
    }
  }
  const fetchGetTargetTypes = async () => {
    try {
      let url = API_URL + 'RequestStatuses/GetTargetTypes'
      const resp = await axios.get(url)
      setdataTargetTypes(resp.data.value)
    } catch (error) {
      console.log(error)
    }
  }

  const onSubmit = handleSubmit(async (data) => {
    data.level = level
    data.state = states
    data.targetType = targetTypes
    data.nextStatusIds = checkBoxData

    try {
      let url = API_URL + 'RequestStatuses'
      if (mode !== 'edit') await axios.post(url, data)
      else await axios.put(url, data)
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
  const handleChangelevel = (event: any) => {
    setlevel(event)
  }
  const handleChangestate = (event: any) => {
    setStates(event)
  }
  const handleChangetargetType = (event: any) => {
    setTargetTypes(event)
  }
  const updateData = (id: number, state: boolean) => {
    const newList = [...checkBoxData, id]
    if (!state) {
      const newList1 = newList.filter((data) => data !== id)
      setCheckBoxData(newList1)
    } else {
      setCheckBoxData(newList)
    }

    debugger

    // const newList = newList.filter((part) => part.companyVIPId !== id)
  }
  return (
    <div>
      <Dialog title={pageTitles[mode]} onClose={onClose}>
        <div>
          <form id='dialog-form' onSubmit={onSubmit} className='row g-3'>
            <FormControl col={6} label={'عنوان'}>
              <input
                className={getValidationClass(touchedFields.title, errors.title)}
                autoFocus={true}
                {...register('title', {required: true})}
              />
            </FormControl>
            <FormControl col={6} label={'توضیح'}>
              <input
                className={getValidationClass(touchedFields.description, errors.description)}
                {...register('description', {required: true})}
              />
            </FormControl>
            <FormControl col={6} label={'سطح دسترسی'}>
              <Controller
                name='level'
                control={control}
                render={({field: {onChange, onBlur, value, ref}}) => (
                  <ComboBoxLocal
                    filldata={datalevel}
                    endpoint={'AgentTypes/Search'}
                    preSelectedId={{id: item?.level, title: item?.levelTitle}}
                    onChange={handleChangelevel}
                    onBlur={onBlur}
                  />
                )}
              />
            </FormControl>
            <FormControl col={6} label={'مرحله'}>
              <Controller
                name='state'
                control={control}
                render={({field: {onChange, onBlur, value, ref}}) => (
                  <ComboBoxLocal
                    filldata={dataStates}
                    endpoint={'AgentTypes/Search'}
                    preSelectedId={{id: item?.state, title: item?.stateTitle}}
                    onChange={handleChangestate}
                    onBlur={onBlur}
                  />
                )}
              />
            </FormControl>
            <FormControl col={6} label={'موجودیت '}>
              <Controller
                name='targetType'
                control={control}
                render={({field: {onChange, onBlur, value, ref}}) => (
                  <ComboBoxLocal
                    filldata={dataTargetTypes}
                    endpoint={'AgentTypes/Search'}
                    preSelectedId={{id: item?.targetType, title: item?.targetTypeTitle}}
                    onChange={handleChangetargetType}
                    onBlur={onBlur}
                  />
                )}
              />
            </FormControl>
            <div className={'row 12'}>
              <Grid
                style={{
                  height: '300px',
                }}
                refresh={refresh}
                endpoint={API_URL + 'RequestStatuses/'}
                showDel={false}
                showEdit={false}
                showActions={false}
                filter={filter}
                columns={col}
                name={'RequestStatusesCreate'}
              >
                <GridColumn
                  filterable={false}
                  title=' '
                  field='id'
                  cell={(props) => (
                    <input
                      className='form-check-input w-20px h-20px'
                      type='checkbox'
                      defaultChecked={checkBoxData.indexOf(props.dataItem.id) > -1}
                      onChange={(e) => updateData(props.dataItem.id, e.target.checked)}
                    />
                  )}
                />
              </Grid>
            </div>
          </form>
        </div>
        <DialogActions mode={mode} onClose={onClose} resetForm={resetForm}></DialogActions>
      </Dialog>
    </div>
  )
}
