import {selectClaims} from 'app/modules/auth/redux/AuthSlice'
import React, {MouseEventHandler, useEffect, useState} from 'react'
import {useAppSelector} from 'setup/redux/hooks'
import {ILayout} from '_metronic/layout/core'

type PropsType = {
  onClick?: () => void
  className?: string
  claim?: string
  checked?: boolean
}

export function CheckBoxAction({onClick, className, claim, checked}: PropsType) {
  const claims = useAppSelector(selectClaims)
  const [ss, setss] = useState('')
  useEffect(() => {
    const ls = localStorage.getItem('LayoutConfig')
    if (ls) {
      var gg = JSON.parse(ls) as ILayout
      if (gg.main !== undefined) setss(gg.main.primaryColor)
    }
  })

  if (claim && claims && claims.indexOf(claim) === -1) {
    debugger
    return null
  }
  return (
    <input
      style={{backgroundColor: ss, border: ss}}
      className='form-check-input w-20px h-20px'
      onClick={onClick}
      type='checkbox'
      checked={checked}
    />
  )
}

CheckBoxAction.defaultProps = {className: 'btn-primary'}
