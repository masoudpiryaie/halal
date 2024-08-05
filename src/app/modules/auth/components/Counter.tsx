import {useEffect} from 'react'
import {Dialog} from '@progress/kendo-react-dialogs'
import {defaultPageTitles, FormMode} from '@core/forms'
import axios from 'axios'
import {toast} from 'react-toastify'
import {FieldError, useForm} from 'react-hook-form'
import {FormControl, DialogActions} from '@core/components'
import {useIntl} from 'react-intl'
import {KTSVG} from '_metronic/helpers'
import {number} from 'yup/lib/locale'

type PropsType = {
  data: any
}

const converttoTime = (numstr: any) => {
  numstr = numstr.toString().substring(numstr.toString().length - 3, 0)
  var num = parseInt(numstr)

  let minutes = Math.floor(num / 60)
  let extraSeconds = num % 60
  minutes = minutes < 10 ? 0 + minutes : minutes
  extraSeconds = extraSeconds < 10 ? 0 + extraSeconds : extraSeconds
  return minutes + ':' + extraSeconds
}

export function Counter({data}: PropsType) {
  return (
    <div className='row g-3 form-label'>
      <div className='col-lg-2' style={{color: '#141414'}}>
        {data === 180000 && <div style={{fontSize: '30px'}}>{converttoTime(data)}</div>}
        {data === 179000 && <div style={{fontSize: '30px'}}>{converttoTime(data)}</div>}
        {data === 178000 && <div style={{fontSize: '30px'}}>{converttoTime(data)}</div>}
        {data === 177000 && <div style={{fontSize: '30px'}}>{converttoTime(data)}</div>}
        {data === 176000 && <div style={{fontSize: '30px'}}>{converttoTime(data)}</div>}
        {data === 175000 && <div style={{fontSize: '30px'}}>{converttoTime(data)}</div>}
        {data === 174000 && <div style={{fontSize: '30px'}}>{converttoTime(data)}</div>}
        {data === 173000 && <div style={{fontSize: '30px'}}>{converttoTime(data)}</div>}
        {data === 172000 && <div style={{fontSize: '30px'}}>{converttoTime(data)}</div>}
        {data === 171000 && <div style={{fontSize: '30px'}}>{converttoTime(data)}</div>}
        {data === 170000 && <div style={{fontSize: '30px'}}>{converttoTime(data)}</div>}
        {data === 169000 && <div style={{fontSize: '30px'}}>{converttoTime(data)}</div>}
        {data === 168000 && <div style={{fontSize: '30px'}}>{converttoTime(data)}</div>}
        {data === 167000 && <div style={{fontSize: '30px'}}>{converttoTime(data)}</div>}
        {data === 166000 && <div style={{fontSize: '30px'}}>{converttoTime(data)}</div>}
        {data === 165000 && <div style={{fontSize: '30px'}}>{converttoTime(data)}</div>}
        {data === 164000 && <div style={{fontSize: '30px'}}>{converttoTime(data)}</div>}
        {data === 163000 && <div style={{fontSize: '30px'}}>{converttoTime(data)}</div>}
        {data === 162000 && <div style={{fontSize: '30px'}}>{converttoTime(data)}</div>}
        {data === 161000 && <div style={{fontSize: '30px'}}>{converttoTime(data)}</div>}
        {data === 160000 && <div style={{fontSize: '30px'}}>{converttoTime(data)}</div>}
        {data === 159000 && <div style={{fontSize: '30px'}}>{converttoTime(data)}</div>}
        {data === 158000 && <div style={{fontSize: '30px'}}>{converttoTime(data)}</div>}
        {data === 157000 && <div style={{fontSize: '30px'}}>{converttoTime(data)}</div>}
        {data === 156000 && <div style={{fontSize: '30px'}}>{converttoTime(data)}</div>}
        {data === 155000 && <div style={{fontSize: '30px'}}>{converttoTime(data)}</div>}
        {data === 154000 && <div style={{fontSize: '30px'}}>{converttoTime(data)}</div>}
        {data === 153000 && <div style={{fontSize: '30px'}}>{converttoTime(data)}</div>}
        {data === 152000 && <div style={{fontSize: '30px'}}>{converttoTime(data)}</div>}
        {data === 151000 && <div style={{fontSize: '30px'}}>{converttoTime(data)}</div>}
        {data === 150000 && <div style={{fontSize: '30px'}}>{converttoTime(data)}</div>}
        {data === 149000 && <div style={{fontSize: '30px'}}>{converttoTime(data)}</div>}
        {data === 148000 && <div style={{fontSize: '30px'}}>{converttoTime(data)}</div>}
        {data === 147000 && <div style={{fontSize: '30px'}}>{converttoTime(data)}</div>}
        {data === 146000 && <div style={{fontSize: '30px'}}>{converttoTime(data)}</div>}
        {data === 145000 && <div style={{fontSize: '30px'}}>{converttoTime(data)}</div>}
        {data === 144000 && <div style={{fontSize: '30px'}}>{converttoTime(data)}</div>}
        {data === 143000 && <div style={{fontSize: '30px'}}>{converttoTime(data)}</div>}
        {data === 142000 && <div style={{fontSize: '30px'}}>{converttoTime(data)}</div>}
        {data === 141000 && <div style={{fontSize: '30px'}}>{converttoTime(data)}</div>}
        {data === 140000 && <div style={{fontSize: '30px'}}>{converttoTime(data)}</div>}
        {data === 139000 && <div style={{fontSize: '30px'}}>{converttoTime(data)}</div>}
        {data === 138000 && <div style={{fontSize: '30px'}}>{converttoTime(data)}</div>}
        {data === 137000 && <div style={{fontSize: '30px'}}>{converttoTime(data)}</div>}
        {data === 136000 && <div style={{fontSize: '30px'}}>{converttoTime(data)}</div>}
        {data === 135000 && <div style={{fontSize: '30px'}}>{converttoTime(data)}</div>}
        {data === 134000 && <div style={{fontSize: '30px'}}>{converttoTime(data)}</div>}
        {data === 133000 && <div style={{fontSize: '30px'}}>{converttoTime(data)}</div>}
        {data === 132000 && <div style={{fontSize: '30px'}}>{converttoTime(data)}</div>}
        {data === 131000 && <div style={{fontSize: '30px'}}>{converttoTime(data)}</div>}
        {data === 130000 && <div style={{fontSize: '30px'}}>{converttoTime(data)}</div>}
        {data === 129000 && <div style={{fontSize: '30px'}}>{converttoTime(data)}</div>}
        {data === 128000 && <div style={{fontSize: '30px'}}>{converttoTime(data)}</div>}
        {data === 127000 && <div style={{fontSize: '30px'}}>{converttoTime(data)}</div>}
        {data === 126000 && <div style={{fontSize: '30px'}}>{converttoTime(data)}</div>}
        {data === 125000 && <div style={{fontSize: '30px'}}>{converttoTime(data)}</div>}
        {data === 124000 && <div style={{fontSize: '30px'}}>{converttoTime(data)}</div>}
        {data === 123000 && <div style={{fontSize: '30px'}}>{converttoTime(data)}</div>}
        {data === 122000 && <div style={{fontSize: '30px'}}>{converttoTime(data)}</div>}
        {data === 121000 && <div style={{fontSize: '30px'}}>{converttoTime(data)}</div>}
        {data === 120000 && <div style={{fontSize: '30px'}}>{converttoTime(data)}</div>}
        {data === 119000 && <div style={{fontSize: '30px'}}>{converttoTime(data)}</div>}
        {data === 118000 && <div style={{fontSize: '30px'}}>{converttoTime(data)}</div>}
        {data === 117000 && <div style={{fontSize: '30px'}}>{converttoTime(data)}</div>}
        {data === 116000 && <div style={{fontSize: '30px'}}>{converttoTime(data)}</div>}
        {data === 115000 && <div style={{fontSize: '30px'}}>{converttoTime(data)}</div>}
        {data === 114000 && <div style={{fontSize: '30px'}}>{converttoTime(data)}</div>}
        {data === 113000 && <div style={{fontSize: '30px'}}>{converttoTime(data)}</div>}
        {data === 112000 && <div style={{fontSize: '30px'}}>{converttoTime(data)}</div>}
        {data === 111000 && <div style={{fontSize: '30px'}}>{converttoTime(data)}</div>}
        {data === 110000 && <div style={{fontSize: '30px'}}>{converttoTime(data)}</div>}
        {data === 109000 && <div style={{fontSize: '30px'}}>{converttoTime(data)}</div>}
        {data === 108000 && <div style={{fontSize: '30px'}}>{converttoTime(data)}</div>}
        {data === 107000 && <div style={{fontSize: '30px'}}>{converttoTime(data)}</div>}
        {data === 106000 && <div style={{fontSize: '30px'}}>{converttoTime(data)}</div>}
        {data === 105000 && <div style={{fontSize: '30px'}}>{converttoTime(data)}</div>}
        {data === 104000 && <div style={{fontSize: '30px'}}>{converttoTime(data)}</div>}
        {data === 103000 && <div style={{fontSize: '30px'}}>{converttoTime(data)}</div>}
        {data === 102000 && <div style={{fontSize: '30px'}}>{converttoTime(data)}</div>}
        {data === 101000 && <div style={{fontSize: '30px'}}>{converttoTime(data)}</div>}
        {data === 100000 && <div style={{fontSize: '30px'}}>{converttoTime(data)}</div>}
        {data === 99000 && <div style={{fontSize: '30px'}}>{converttoTime(data)}</div>}
        {data === 98000 && <div style={{fontSize: '30px'}}>{converttoTime(data)}</div>}
        {data === 97000 && <div style={{fontSize: '30px'}}>{converttoTime(data)}</div>}
        {data === 96000 && <div style={{fontSize: '30px'}}>{converttoTime(data)}</div>}
        {data === 95000 && <div style={{fontSize: '30px'}}>{converttoTime(data)}</div>}
        {data === 94000 && <div style={{fontSize: '30px'}}>{converttoTime(data)}</div>}
        {data === 93000 && <div style={{fontSize: '30px'}}>{converttoTime(data)}</div>}
        {data === 92000 && <div style={{fontSize: '30px'}}>{converttoTime(data)}</div>}
        {data === 91000 && <div style={{fontSize: '30px'}}>{converttoTime(data)}</div>}
        {data === 90000 && <div style={{fontSize: '30px'}}>{converttoTime(data)}</div>}
        {data === 89000 && <div style={{fontSize: '30px'}}>{converttoTime(data)}</div>}
        {data === 88000 && <div style={{fontSize: '30px'}}>{converttoTime(data)}</div>}
        {data === 87000 && <div style={{fontSize: '30px'}}>{converttoTime(data)}</div>}
        {data === 86000 && <div style={{fontSize: '30px'}}>{converttoTime(data)}</div>}
        {data === 85000 && <div style={{fontSize: '30px'}}>{converttoTime(data)}</div>}
        {data === 84000 && <div style={{fontSize: '30px'}}>{converttoTime(data)}</div>}
        {data === 83000 && <div style={{fontSize: '30px'}}>{converttoTime(data)}</div>}
        {data === 82000 && <div style={{fontSize: '30px'}}>{converttoTime(data)}</div>}
        {data === 81000 && <div style={{fontSize: '30px'}}>{converttoTime(data)}</div>}
        {data === 80000 && <div style={{fontSize: '30px'}}>{converttoTime(data)}</div>}
        {data === 79000 && <div style={{fontSize: '30px'}}>{converttoTime(data)}</div>}
        {data === 78000 && <div style={{fontSize: '30px'}}>{converttoTime(data)}</div>}
        {data === 77000 && <div style={{fontSize: '30px'}}>{converttoTime(data)}</div>}
        {data === 76000 && <div style={{fontSize: '30px'}}>{converttoTime(data)}</div>}
        {data === 75000 && <div style={{fontSize: '30px'}}>{converttoTime(data)}</div>}
        {data === 74000 && <div style={{fontSize: '30px'}}>{converttoTime(data)}</div>}
        {data === 73000 && <div style={{fontSize: '30px'}}>{converttoTime(data)}</div>}
        {data === 72000 && <div style={{fontSize: '30px'}}>{converttoTime(data)}</div>}
        {data === 71000 && <div style={{fontSize: '30px'}}>{converttoTime(data)}</div>}
        {data === 70000 && <div style={{fontSize: '30px'}}>{converttoTime(data)}</div>}
        {data === 69000 && <div style={{fontSize: '30px'}}>{converttoTime(data)}</div>}
        {data === 68000 && <div style={{fontSize: '30px'}}>{converttoTime(data)}</div>}
        {data === 67000 && <div style={{fontSize: '30px'}}>{converttoTime(data)}</div>}
        {data === 66000 && <div style={{fontSize: '30px'}}>{converttoTime(data)}</div>}
        {data === 65000 && <div style={{fontSize: '30px'}}>{converttoTime(data)}</div>}
        {data === 64000 && <div style={{fontSize: '30px'}}>{converttoTime(data)}</div>}
        {data === 63000 && <div style={{fontSize: '30px'}}>{converttoTime(data)}</div>}
        {data === 62000 && <div style={{fontSize: '30px'}}>{converttoTime(data)}</div>}
        {data === 61000 && <div style={{fontSize: '30px'}}>{converttoTime(data)}</div>}
        {data === 60000 && <div style={{fontSize: '30px'}}>{converttoTime(data)}</div>}
        {data === 59000 && <div style={{fontSize: '30px'}}>{converttoTime(data)}</div>}
        {data === 58000 && <div style={{fontSize: '30px'}}>{converttoTime(data)}</div>}
        {data === 57000 && <div style={{fontSize: '30px'}}>{converttoTime(data)}</div>}
        {data === 56000 && <div style={{fontSize: '30px'}}>{converttoTime(data)}</div>}
        {data === 55000 && <div style={{fontSize: '30px'}}>{converttoTime(data)}</div>}
        {data === 54000 && <div style={{fontSize: '30px'}}>{converttoTime(data)}</div>}
        {data === 53000 && <div style={{fontSize: '30px'}}>{converttoTime(data)}</div>}
        {data === 52000 && <div style={{fontSize: '30px'}}>{converttoTime(data)}</div>}
        {data === 51000 && <div style={{fontSize: '30px'}}>{converttoTime(data)}</div>}
        {data === 50000 && <div style={{fontSize: '30px'}}>{converttoTime(data)}</div>}
        {data === 49000 && <div style={{fontSize: '30px'}}>{converttoTime(data)}</div>}
        {data === 48000 && <div style={{fontSize: '30px'}}>{converttoTime(data)}</div>}
        {data === 47000 && <div style={{fontSize: '30px'}}>{converttoTime(data)}</div>}
        {data === 46000 && <div style={{fontSize: '30px'}}>{converttoTime(data)}</div>}
        {data === 45000 && <div style={{fontSize: '30px'}}>{converttoTime(data)}</div>}
        {data === 44000 && <div style={{fontSize: '30px'}}>{converttoTime(data)}</div>}
        {data === 43000 && <div style={{fontSize: '30px'}}>{converttoTime(data)}</div>}
        {data === 42000 && <div style={{fontSize: '30px'}}>{converttoTime(data)}</div>}
        {data === 41000 && <div style={{fontSize: '30px'}}>{converttoTime(data)}</div>}
        {data === 40000 && <div style={{fontSize: '30px'}}>{converttoTime(data)}</div>}
        {data === 39000 && <div style={{fontSize: '30px'}}>{converttoTime(data)}</div>}
        {data === 38000 && <div style={{fontSize: '30px'}}>{converttoTime(data)}</div>}
        {data === 37000 && <div style={{fontSize: '30px'}}>{converttoTime(data)}</div>}
        {data === 36000 && <div style={{fontSize: '30px'}}>{converttoTime(data)}</div>}
        {data === 35000 && <div style={{fontSize: '30px'}}>{converttoTime(data)}</div>}
        {data === 34000 && <div style={{fontSize: '30px'}}>{converttoTime(data)}</div>}
        {data === 33000 && <div style={{fontSize: '30px'}}>{converttoTime(data)}</div>}
        {data === 32000 && <div style={{fontSize: '30px'}}>{converttoTime(data)}</div>}
        {data === 31000 && <div style={{fontSize: '30px'}}>{converttoTime(data)}</div>}
        {data === 30000 && <div style={{fontSize: '30px'}}>{converttoTime(data)}</div>}
        {data === 29000 && <div style={{fontSize: '30px'}}>{converttoTime(data)}</div>}
        {data === 28000 && <div style={{fontSize: '30px'}}>{converttoTime(data)}</div>}
        {data === 27000 && <div style={{fontSize: '30px'}}>{converttoTime(data)}</div>}
        {data === 26000 && <div style={{fontSize: '30px'}}>{converttoTime(data)}</div>}
        {data === 25000 && <div style={{fontSize: '30px'}}>{converttoTime(data)}</div>}
        {data === 24000 && <div style={{fontSize: '30px'}}>{converttoTime(data)}</div>}
        {data === 23000 && <div style={{fontSize: '30px'}}>{converttoTime(data)}</div>}
        {data === 22000 && <div style={{fontSize: '30px'}}>{converttoTime(data)}</div>}
        {data === 21000 && <div style={{fontSize: '30px'}}>{converttoTime(data)}</div>}
        {data === 20000 && <div style={{fontSize: '30px'}}>{converttoTime(data)}</div>}
        {data === 19000 && <div style={{fontSize: '30px'}}>{converttoTime(data)}</div>}
        {data === 18000 && <div style={{fontSize: '30px'}}>{converttoTime(data)}</div>}
        {data === 17000 && <div style={{fontSize: '30px'}}>{converttoTime(data)}</div>}
        {data === 16000 && <div style={{fontSize: '30px'}}>{converttoTime(data)}</div>}
        {data === 15000 && <div style={{fontSize: '30px'}}>{converttoTime(data)}</div>}
        {data === 14000 && <div style={{fontSize: '30px'}}>{converttoTime(data)}</div>}
        {data === 13000 && <div style={{fontSize: '30px'}}>{converttoTime(data)}</div>}
        {data === 12000 && <div style={{fontSize: '30px'}}>{converttoTime(data)}</div>}
        {data === 11000 && <div style={{fontSize: '30px'}}>{converttoTime(data)}</div>}
        {data === 10000 && <div style={{fontSize: '30px'}}>{converttoTime(data)}</div>}
        {data === 9000 && <div style={{fontSize: '30px'}}>{converttoTime(data)}</div>}
        {data === 8000 && <div style={{fontSize: '30px'}}>{converttoTime(data)}</div>}
        {data === 7000 && <div style={{fontSize: '30px'}}>{converttoTime(data)}</div>}
        {data === 6000 && <div style={{fontSize: '30px'}}>{converttoTime(data)}</div>}
        {data === 5000 && <div style={{fontSize: '30px'}}>{converttoTime(data)}</div>}
        {data === 4000 && <div style={{fontSize: '30px'}}>{converttoTime(data)}</div>}
        {data === 3000 && <div style={{fontSize: '30px'}}>{converttoTime(data)}</div>}
        {data === 2000 && <div style={{fontSize: '30px'}}>{converttoTime(data)}</div>}
        {data === 1000 && <div style={{fontSize: '30px'}}>{converttoTime(data)}</div>}
      </div>
    </div>
  )
}
