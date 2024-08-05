import {useEffect, useState} from 'react'
import {Dialog} from '@progress/kendo-react-dialogs'
import {defaultPageTitles, FormMode} from '@core/forms'
import axios from 'axios'
import {toast} from 'react-toastify'
import {FieldError, useForm} from 'react-hook-form'
import {FormControl, DialogActions, Grid} from '@core/components'
import {useIntl} from 'react-intl'
import {GridColumn} from '@progress/kendo-react-grid'
export interface IModelGr {
  title: string
  field: string
  show: boolean
}
type PropsType = {
  mode: FormMode
  onClose: () => void
  item?: PayeInfoModel
  ID: number
}
export type PayeInfoModel = {
  id?: number
  payeInfoId: number
  title: string
  description: string
}
const pageTitles = defaultPageTitles

export function ServiceCodeListDialog({mode, onClose, item, ID}: PropsType) {
  const intl = useIntl()
  const API_URL = process.env.REACT_APP_API_URLCoding || 'api'
  const gr = localStorage.getItem('ServiceCodeGrid')
  var col = gr
    ? (JSON.parse(gr) as IModelGr[])
    : [
        {
          title: 'پیش شماره',
          field: 'prefixCode',
          show: true,
        },
        {
          title: 'کد',
          field: '6260000062220',
          show: true,
        },
        {
          title: 'موضوع',
          field: 'subject',
          show: true,
        },
      ]
  const {
    register,
    handleSubmit,
    reset,
    formState: {errors, isDirty, touchedFields},
  } = useForm<PayeInfoModel>({mode: 'all'})

  useEffect(() => {
    if (mode === 'edit') {
      reset(item)
    }
  }, [mode, item, reset])

  const resetForm = () => {
    reset()
    if (isDirty) {
    }
  }

  return (
    <div>
      <Dialog title={'لیست کد خدمت'} onClose={onClose}>
        <div>
          <Grid
            style={{
              height: '300px',
            }}
            endpoint={API_URL + 'ServiceCode'} //{API_URL + 'payeInfo'}
            showDel={false}
            showEdit={false}
            columns={col}
            showActions={false}
            name='ServiceCodeGrid'
          ></Grid>
        </div>
        <DialogActions mode={mode} onClose={onClose} resetForm={resetForm}></DialogActions>
      </Dialog>
    </div>
  )
}
