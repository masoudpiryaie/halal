import {useEffect, useState} from 'react'
import {Dialog} from '@progress/kendo-react-dialogs'
import {defaultPageTitles, FormMode} from '@core/forms'
import axios from 'axios'
import {toast} from 'react-toastify'
import {FieldError, useForm} from 'react-hook-form'
import {FormControl, DialogActions, Grid} from '@core/components'
import {useIntl} from 'react-intl'
import {CompositeFilterDescriptor} from '@progress/kendo-data-query'
export interface IModelGr {
  title: string
  field: string
  show: boolean
}
type PropsType = {
  mode: FormMode
  onClose: () => void
  ID: number
}
export type PayeInfoModel = {
  id?: number
  payeInfoId: number
  title: string
  description: string
}
const pageTitles = defaultPageTitles

export function PayDialog({mode, onClose, ID}: PropsType) {
  const intl = useIntl()
  const API_URL = process.env.REACT_APP_API_URLCoding || 'api'
  const [filter, setFilter] = useState<CompositeFilterDescriptor>()
  const {
    register,
    handleSubmit,
    reset,
    formState: {errors, isDirty, touchedFields},
  } = useForm<PayeInfoModel>({mode: 'all'})
  const gr = localStorage.getItem('PaymentsGrid')
  var col = gr
    ? (JSON.parse(gr) as IModelGr[])
    : [
        {
          title: 'مبلغ ',
          field: 'price',
          show: true,
        },
        {
          title: 'تاریخ پرداخت  ',
          field: 'payDate',
          show: true,
        },
        {
          title: 'وضعیت',
          field: 'status',
          show: true,
        },
        {
          title: 'گیت پرداخت ',
          field: 'payGateTitle',
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
      <Dialog title={'نمایش جزییات'} onClose={onClose}>
        <div style={{width: '600px'}}>
          <Grid
            style={{
              height: '300px',
            }}
            endpoint={API_URL + 'Payments/'}
            showActions={false}
            filter={filter}
            columns={col}
            name='PaymentsGrid'
            exteraParam={'&MemberId=' + ID}
          ></Grid>
        </div>
        <button className='k-button k-primary' onClick={onClose}>
          {intl.formatMessage({id: 'MENU.RETURN'})}
        </button>
      </Dialog>
    </div>
  )
}
