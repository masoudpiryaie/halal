import React, {useEffect, useState} from 'react'
import clsx from 'clsx'
import {Link} from 'react-router-dom'
import {useLocation} from 'react-router'
import {checkIsActive, KTSVG} from '../../../helpers'
import {useLayout} from '../../core'
import {selectClaims} from 'app/modules/auth/redux/AuthSlice'
import {useAppSelector} from 'setup/redux/hooks'
import {ILayout} from '_metronic/layout/core'

type Props = {
  to: string
  title: string
  icon?: string
  fontIcon?: string
  hasBullet?: boolean
  claim?: string
}

const AsideMenuItem: React.FC<Props> = ({
  children,
  to,
  title,
  icon,
  fontIcon,
  hasBullet = false,
  claim,
}) => {
  const {pathname} = useLocation()
  const isActive = checkIsActive(pathname, to)
  const {config} = useLayout()
  const {aside} = config
  const claims = useAppSelector(selectClaims)

  if (claim && claims?.indexOf(claim) === -1) {
    return null
  }

  return (
    <div className='menu-item' style={{backgroundColor: config.main?.primaryColor}}>
      <Link
        style={{backgroundColor: config.main?.primaryColor}}
        className={clsx('menu-link without-sub', {active: isActive})}
        to={to}
      >
        {hasBullet && (
          <span style={{backgroundColor: config.main?.primaryColor}} className='menu-bullet'>
            <span
              style={{backgroundColor: config.main?.primaryColor}}
              className='bullet bullet-dot'
            ></span>
          </span>
        )}
        {icon && aside.menuIcon === 'svg' && (
          <span style={{backgroundColor: config.main?.primaryColor}} className='menu-icon'>
            <KTSVG path={icon} className='svg-icon-2' />
          </span>
        )}
        {fontIcon && aside.menuIcon === 'font' && <i className={clsx('bi fs-3', fontIcon)}></i>}
        <span
          style={{backgroundColor: config.main?.primaryColor, fontFamily: config.main?.font}}
          className='menu-title'
        >
          {title}
        </span>
      </Link>
      {children}
    </div>
  )
}

export {AsideMenuItem}
