import {useEffect, useState} from 'react'
import {GridColumn} from '@progress/kendo-react-grid'
import {Dialog} from '@progress/kendo-react-dialogs'
import {defaultPageTitles, FormMode} from '@core/forms'
import axios from 'axios'
import {toast} from 'react-toastify'
import {FieldError, useForm} from 'react-hook-form'
import {Grid, DialogActions} from '@core/components'
import {useIntl} from 'react-intl'
export interface IModelGr {
  title: string
  field: string
  show: boolean
}

type PropsType = {
  mode: FormMode
  ID: number
  onClose: () => void
  item?: ActivePayeInfoModel
}
export type ActivePayeInfoModel = {
  id?: number
  isEnable: boolean
  reason: string
}
const pageTitles = defaultPageTitles

export function PayeInfoActiveHistoryDialog({mode, ID, onClose, item}: PropsType) {
  const intl = useIntl()
  const API = process.env.REACT_APP_API_URLCoding || 'api'
  const API_URL = API + 'Breaks/GetChangeStatusHistory/' + ID //process.env.REACT_APP_API_URL || 'api'
  const {
    register,
    handleSubmit,
    reset,
    formState: {errors, isDirty, touchedFields},
  } = useForm<ActivePayeInfoModel>({mode: 'all'})

  useEffect(() => {}, [mode, item, reset])
  const gr = localStorage.getItem('payeInfo')
  var col = gr
    ? (JSON.parse(gr) as IModelGr[])
    : [
        {
          title: intl.formatMessage({id: 'Model.PayeInfo.ComBaseNameFa'}),
          field: 'reason',
          show: true,
        },
        {
          title: intl.formatMessage({id: 'Model.PayeInfo.ComBaseNameEn'}),
          field: 'reason',
          show: true,
        },
      ]

  const resetForm = () => {
    reset()
    if (isDirty) {
    }
  }

  return (
    <div>
      <Dialog title={'تاریخچه'} onClose={onClose}>
        <div>
          <form id='dialog-form' className='row g-3'>
            <div className='row'>
              <div className='card card-px-0 shadow'>
                <div className='card-body'>
                  <Grid
                    style={{
                      height: '300px',
                    }}
                    endpoint={API_URL}
                    columns={col}
                    name='statusHistory'
                  ></Grid>
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
