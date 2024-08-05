import React from 'react'
import {useIntl} from 'react-intl'
import {useLayout} from '_metronic/layout/core'

type PropsType = {
  labelId?: string
  label?: string
  children: JSX.Element
  col: string | number
  data?: string
  tvalidate?: number
  len?: number
  begin?: string
}

export function FormControl({
  labelId,
  label,
  children,
  col,

  data,
  tvalidate,
  len,
  begin,
}: PropsType) {
  const intl = useIntl()
  const {config} = useLayout()
  if (typeof col === 'number') {
    col = 'col-md-' + col
  }
  var valid = true
  var validatephone = true
  var validatemail = true
  var labelerrormail = ''
  var labelerrorphone = ''
  var validatNC = true
  var labelerrorNC = ''
  var validatelen = true
  var labelerrorlen = ''
  if (
    data !== undefined &&
    tvalidate === 1 &&
    (data.substring(0, 2) !== '09' || data.length !== 11)
  ) {
    labelerrorphone = 'موبایل نامعتبر است'
    validatephone = false
    valid = false
  }
  if (
    data !== undefined &&
    tvalidate === 2 &&
    !new RegExp(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    ).test(data)
  ) {
    labelerrormail = 'ایمیل نامعتبر است'
    validatemail = false
    valid = false
  }

  const vmsNationalCode = (input: string) => {
    if (
      !/^\d{10}$/.test(input) ||
      input === '0000000000' ||
      input === '1111111111' ||
      input === '2222222222' ||
      input === '3333333333' ||
      input === '4444444444' ||
      input === '5555555555' ||
      input === '6666666666' ||
      input === '7777777777' ||
      input === '8888888888' ||
      input === '9999999999'
    )
      return false
    var check = parseInt(input[9])
    var sum = 0
    var i
    for (i = 0; i < 9; ++i) {
      sum += parseInt(input[i]) * (10 - i)
    }
    sum %= 11
    return (sum < 2 && check === sum) || (sum >= 2 && check + sum === 11)
  }
  if (data !== undefined && !vmsNationalCode(data) && tvalidate === 3) {
    labelerrorNC = 'کد ملی نامعتبر است'
    validatNC = false
    valid = false
  }
  if (data !== undefined && tvalidate === 4) {
    if (data.length !== len) {
      labelerrorlen = 'طول دیتا باید ' + len + 'باشد'
      validatelen = false
      valid = false
    }
    if (begin !== undefined && begin !== data.substring(0, 1)) {
      labelerrorlen = 'فرمت نادرست می باشد'
      validatelen = false
      valid = false
    }
  }

  const childrenWithClass = React.Children.map(children, (child) =>
    React.cloneElement(child, {
      className: `${child.props.className} ${
        tvalidate !== undefined
          ? !valid
            ? 'form-control is-invalid'
            : 'form-control is-valid'
          : 'form-control'
      }`,
    })
  )
  const labelText = label ? label : intl.formatMessage({id: labelId})
  return (
    <div style={{paddingBottom: '10px'}} className={'row ' + col}>
      <label style={{fontFamily: config.main?.font}} className='col-sm-4 col-form-label'>
        {labelText}
      </label>
      <div className='col-sm-8'>{childrenWithClass}</div>
      {!validatephone && data !== '' && (
        <label className='col-sm-12' style={{color: 'red', fontFamily: config.main?.font}}>
          {labelerrorphone}
        </label>
      )}
      {!validatemail && data !== '' && (
        <label className='col-sm-12' style={{color: 'red', fontFamily: config.main?.font}}>
          {labelerrormail}
        </label>
      )}
      {!validatNC && data !== '' && (
        <label className='col-sm-12' style={{color: 'red', fontFamily: config.main?.font}}>
          {labelerrorNC}
        </label>
      )}
      {!validatelen && data !== '' && (
        <label className='col-sm-12' style={{color: 'red', fontFamily: config.main?.font}}>
          {labelerrorlen}
        </label>
      )}
    </div>
  )
}
