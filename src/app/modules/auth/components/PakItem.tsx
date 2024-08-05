import {useEffect, useState} from 'react'
import {Dialog} from '@progress/kendo-react-dialogs'
import {defaultPageTitles, FormMode} from '@core/forms'
import axios from 'axios'
import {toast} from 'react-toastify'
import {FieldError, useForm} from 'react-hook-form'
import {FormControl, DialogActions} from '@core/components'
import {useIntl} from 'react-intl'
import {KTSVG} from '_metronic/helpers'
import {count} from 'console'

type PropsType = {
  data: number
  selectRecord: (id: number, i: number) => void
}

export function PakItem({data, selectRecord}: PropsType) {
  const intl = useIntl()
  const [count, setCount] = useState(0)
  function handleChange(event: any) {
    setCount(event.target.value)
  }

  return (
    <div
      key={data}
      className='row g-3 form-label'
      style={{
        direction: intl.locale === 'en' ? 'ltr' : 'rtl',
        borderBottomColor: '#b7b7b7',
        borderBottomStyle: 'dashed',
        borderBottomWidth: '1px',
      }}
    >
      <div className='col-lg-2' style={{color: '#141414'}}>
        {data}
        {/* {data.packageType !== undefined ? data.packageType.name : data.packageTypeName} */}
      </div>
      <div className='col-lg-2'>
        <input
          className='form-control form-control-lg form-control-solid '
          type='text'
          //value={name}
          onChange={handleChange}
        />
      </div>
      <div className='col-lg-1' style={{color: '#141414', marginBottom: ' 5px'}}>
        {' '}
        <button
          onClick={() => selectRecord(data, count)}
          className='btn btn-icon btn-bg-light btn-active-color-danger btn-sm me-1'
        >
          انتخاب
        </button>
      </div>
    </div>
  )
}
