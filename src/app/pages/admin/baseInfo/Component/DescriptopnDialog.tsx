import {useEffect, useState} from 'react'
import {Dialog} from '@progress/kendo-react-dialogs'
import {defaultPageTitles, FormMode} from '@core/forms'
import axios from 'axios'
import {toast} from 'react-toastify'
import {FieldError, useForm} from 'react-hook-form'
import {FormControl, DialogActions} from '@core/components'
import {useIntl} from 'react-intl'

type PropsType = {
  mode: FormMode
  desc: string
  onClose: () => void
}

const pageTitles = defaultPageTitles

export function DescriptopnDialog({mode, desc, onClose}: PropsType) {
  const intl = useIntl()
  const [currentStatus, setcurrentStatus] = useState(false)
  const [active, setactive] = useState('false')

  useEffect(() => {}, [mode])

  const resetForm = () => {}
  const getValidationClass = (touched: boolean | undefined, error: FieldError | undefined) => {
    if (touched === true) {
      return error ? 'is-invalid' : 'is-valid'
    }
  }
  return (
    <div>
      <Dialog title={'توضیحات'} onClose={onClose}>
        <div>
          <form id='dialog-form' className='row g-3'>
            {desc}
          </form>
        </div>
        <DialogActions mode={mode} onClose={onClose} resetForm={resetForm}></DialogActions>
      </Dialog>
    </div>
  )
}
