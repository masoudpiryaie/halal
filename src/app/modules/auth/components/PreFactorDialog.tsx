import {useCallback, useState, useEffect} from 'react'
import {Dialog} from '@progress/kendo-react-dialogs'
import {defaultPageTitles, FormMode} from '@core/forms'
import axios from 'axios'
import {toast} from 'react-toastify'
import {Controller, FieldError, useForm} from 'react-hook-form'
import {GridCellProps, GridColumn as Column} from '@progress/kendo-react-grid'
import {Grid} from '@core/components'
// import {ComboBox, ComboBoxFilterChangeEvent} from '@progress/kendo-react-dropdowns'
import {useIntl} from 'react-intl'

type PropsType = {
  mode: FormMode
  onClose: () => void
  item?: pakModel
  preinvioceID: number
}
export type pakModel = {
  id: number
  name: string
}
const listpak: Array<pakModel> = []
const pageTitles = defaultPageTitles

export function PreFactorDialog({mode, onClose, item, preinvioceID}: PropsType) {
  const intl = useIntl()
  const [name, setName] = useState('')
  const [isPaid, setisPaid] = useState('')

  const API_URLAuth = process.env.REACT_APP_API_URL || 'api'
  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: {errors, isDirty, touchedFields},
  } = useForm<pakModel>({mode: 'all'})
  useEffect(() => {
    debugger
    let url = 'http://membergs1.pardcoservice.ir/api/Registration/preinvoice/' + preinvioceID
    try {
      axios({
        method: 'get',
        url: url,
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })
        .then(function (response) {
          setName(response.data.value.memberName)
          setisPaid(response.data.value.isPaid ? 'پرداخت شده' : 'پرداخت نشده')
        })
        .catch(function (response) {})
    } catch (e: any) {
      if (!e.processed) {
        toast.error('ارور', {
          position: 'top-center',
        })
      }
    }

    return () => {}
  }, [])
  const handleSelectionChange = useCallback(async (selectedRows: any[]) => {
    if (selectedRows.length === 1) {
      alert(selectedRows[0])
      onClose()
    }
  }, [])
  return (
    <div>
      <Dialog title={'پیش فاکتور'} onClose={onClose} width='50vw'>
        <div className={'row 12'}>
          <div className='col-sm-3'>نام عضو:</div>
          <div className='col-sm-3'>{name}</div>
        </div>
        <div className={'row 12'}>
          <div className='col-sm-3'>وضعیت :</div>
          <div className='col-sm-3'>{isPaid}</div>
        </div>

        <button className='k-button' onClick={onClose} style={{float: 'left'}}>
          {intl.formatMessage({id: 'MENU.RETURN'})}
        </button>
      </Dialog>
    </div>
  )
}
