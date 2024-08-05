import {GridColumn} from '@progress/kendo-react-grid'
import {useEffect, useState} from 'react'
import {Dialog} from '@progress/kendo-react-dialogs'
import {defaultPageTitles, FormMode} from '@core/forms'
import axios from 'axios'
import {toast} from 'react-toastify'
import {FieldError, useForm} from 'react-hook-form'
import {Grid, DialogActions} from '@core/components'
import {useIntl} from 'react-intl'

type PropsType = {
  mode: FormMode
  onClose: () => void
  item?: BreakheadLineModel
}
export type BreakheadLineModel = {
  id?: number
  breakId: number
  headLineIds: number[]
}
const pageTitles = defaultPageTitles
export interface IModelGr {
  title: string
  field: string
  show: boolean
}
export function TanazorCreateDialog({mode, onClose, item}: PropsType) {
  const intl = useIntl()
  const API_URL = process.env.REACT_APP_API_URLCoding || 'api'
  const gr = localStorage.getItem('payeInfo')
  const [checkBoxData, setCheckBoxData] = useState<number[]>([])
  const [breakGridID, setBreakGridID] = useState(0)
  const {
    register,
    handleSubmit,
    reset,
    formState: {errors, isDirty, touchedFields},
  } = useForm<BreakheadLineModel>({mode: 'all'})

  useEffect(() => {
    if (mode === 'edit') {
      reset(item)
    }
  }, [mode, item, reset])
  var col = gr
    ? (JSON.parse(gr) as IModelGr[])
    : [
        {
          title: intl.formatMessage({id: 'Model.PayeInfo.ComBaseNameFa'}),
          field: 'comBaseNameFa',
          show: true,
        },
        {
          title: intl.formatMessage({id: 'Model.PayeInfo.ComBaseNameEn'}),
          field: 'comBaseNameEn',
          show: true,
        },
        {
          title: intl.formatMessage({id: 'Model.PayeInfo.KeyCode'}),
          field: 'keyCode',
          show: true,
        },
        {
          title: intl.formatMessage({id: 'Model.PayeInfo.Description'}),
          field: 'description',
          show: true,
        },
      ]

  const onSubmit = handleSubmit(async (data) => {
    let url = API_URL + 'BreakHeadLines'
    if (breakGridID === 0) {
      alert('انتخاب breakاجباری است')
    } else {
      try {
        data.headLineIds = checkBoxData
        data.breakId = breakGridID
        await axios.post(url, data)
        toast.info(intl.formatMessage({id: 'MENU.ACTIONSuccess'}))
        onClose()
      } catch (e: any) {
        if (!e.processed) {
          toast.error(intl.formatMessage({id: 'MENU.ACTIONError'}))
        }
      }
    }
  })

  const resetForm = () => {
    reset()
    if (isDirty) {
    }
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
  const onRowClickBreak = (item: any) => {
    setBreakGridID(item.dataItem.id)
  }

  return (
    <div>
      <Dialog title={pageTitles[mode]} onClose={onClose}>
        <div>
          <form id='dialog-form' onSubmit={onSubmit} className='row g-3'>
            <div className='row'>
              <div className='card card-px-0 shadow'>
                <div className='card-body'>
                  <div className='row'>
                    <div className='col-sm-6'>
                      <Grid
                        style={{
                          height: '300px',
                        }}
                        endpoint={API_URL + 'Breaks'}
                        showActions={false}
                        columns={col}
                        name='payeInfo'
                        onRowClick={onRowClickBreak}
                      ></Grid>
                    </div>
                    <div className='col-sm-6'>
                      <Grid
                        style={{
                          height: '300px',
                        }}
                        endpoint={API_URL + 'HeadLines'}
                        showActions={false}
                        columns={col}
                        name='payeInfo'
                      >
                        <GridColumn
                          width='40'
                          filterable={false}
                          field=''
                          cell={(props) => (
                            <td>
                              <input
                                className='form-check-input w-20px h-20px'
                                type='checkbox'
                                defaultChecked={checkBoxData.indexOf(props.dataItem.id) > -1}
                                onChange={(e) => updateData(props.dataItem.id, e.target.checked)}
                              />
                            </td>
                          )}
                        />
                      </Grid>
                    </div>
                  </div>
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
