import {selectClaims} from 'app/modules/auth/redux/AuthSlice'
import React, {MouseEventHandler, useEffect, useState} from 'react'
import {useAppSelector} from 'setup/redux/hooks'
import {useLayout} from '_metronic/layout/core'
import {KTSVG} from '_metronic/helpers'
type PropsType = {
  label: string
  onClick: MouseEventHandler<HTMLButtonElement>
  className?: string
  claim?: string
}

export function BtnAction({label, onClick, className, claim}: PropsType) {
  const claims = useAppSelector(selectClaims)
  const {config} = useLayout()
  if (claim && claims && claims.indexOf(claim) === -1) {
    debugger
    return null
  }
  return (
    <button
      style={{
        backgroundColor: config.main?.primaryColor,
        color: '#e4e6ef',
        fontFamily: config.main?.font,
      }}
      type='button'
      className={`btn btn-sm align-self-start me-2 ${className}`}
      onClick={onClick}
    >
      {label}
      {/* <KTSVG path='/media/icons/duotune/general/gen035.svg' className='svg-icon-3' /> */}
    </button>
  )
}

//BtnAction.defaultProps = {className: 'btn-primary'}
