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

export function WalletDialog({mode, onClose, ID}: PropsType) {
  const intl = useIntl()
  const API_URL = process.env.REACT_APP_API_URLCoding || 'api'
  const [filter, setFilter] = useState<CompositeFilterDescriptor>()
  const {
    register,
    handleSubmit,
    reset,
    formState: {errors, isDirty, touchedFields},
  } = useForm<PayeInfoModel>({mode: 'all'})
  const gr = localStorage.getItem('WalletsGrid')
  var col = gr
    ? (JSON.parse(gr) as IModelGr[])
    : [
        {
          title: 'نوع کد ',
          field: 'codeType',
          show: true,
        },
        {
          title: 'تعداد  ',
          field: 'count',
          show: true,
        },
        {
          title: 'بالانس',
          field: 'balance',
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
            endpoint={API_URL + 'Wallets'}
            showActions={false}
            filter={filter}
            columns={col}
            name='WalletsGrid'
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
