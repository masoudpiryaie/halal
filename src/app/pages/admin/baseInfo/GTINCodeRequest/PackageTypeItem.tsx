import {useEffect} from 'react'
import {Dialog} from '@progress/kendo-react-dialogs'
import {defaultPageTitles, FormMode} from '@core/forms'
import axios from 'axios'
import {toast} from 'react-toastify'
import {FieldError, useForm} from 'react-hook-form'
import {FormControl, DialogActions} from '@core/components'
import {ActiveItemModel} from './GTINCodeRequestPage'
import {useIntl} from 'react-intl'
import {KTSVG} from '_metronic/helpers'

type PropsType = {
  data: ActiveItemModel
  selectitem: (id: number) => void
}

export function PackageTypeItem({data, selectitem}: PropsType) {
  const intl = useIntl()
  const API_URL = process.env.REACT_APP_API_URLIMG || 'api'
  return (
    <div className='col-lg-3' style={{padding: 10}}>
      <input
        className='form-check-input'
        type='radio'
        name='rdoPackageType'
        value={'false'}
        onChange={() => selectitem(data.id)}
      />

      <img style={{width: 150}} src={API_URL + data.file.picPath}></img>

      {/* <div className='col-lg-1' style={{color: '#141414', marginBottom: ' 5px'}}>
        {' '}
        <button
          onClick={() => selectitem(data.id)}
          className='btn btn-icon btn-bg-light btn-active-color-danger btn-sm me-1'
        >
          <KTSVG path='/media/icons/duotune/general/gen027.svg' className='svg-icon-3' />
        </button>
      </div> */}
    </div>
  )
}
