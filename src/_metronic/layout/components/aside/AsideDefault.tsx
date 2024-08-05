/* eslint-disable react/jsx-no-target-blank */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {FC, useEffect, useState} from 'react'
import {Link} from 'react-router-dom'
import clsx from 'clsx'
import {useLayout} from '../../core'
import {KTSVG, toAbsoluteUrl} from '../../../helpers'
import {AsideMenu} from './AsideMenu'
import {ILayout} from '_metronic/layout/core'
import {selectpasschange} from 'app/modules/auth/redux/AuthSlice'
import {useAppSelector} from 'setup/redux/hooks'

const AsideDefault: FC = () => {
  const {config, classes} = useLayout()
  const {aside} = config
  const [ss, setss] = useState('')
  const passchange = useAppSelector(selectpasschange)
  useEffect(() => {
    const ls = localStorage.getItem('LayoutConfig')
    if (ls) {
      var gg = JSON.parse(ls) as ILayout
      if (gg.main !== undefined) setss(gg.main.primaryColor)
    }
  })
  return (
    <div
      id='kt_aside'
      style={{backgroundColor: ss}}
      className={clsx('aside', classes.aside.join(' '))}
      data-kt-drawer='true'
      data-kt-drawer-name='aside'
      data-kt-drawer-activate='{default: true, lg: false}'
      data-kt-drawer-overlay='true'
      data-kt-drawer-width="{default:'200px', '300px': '250px'}"
      data-kt-drawer-direction='start'
      data-kt-drawer-toggle='#kt_aside_mobile_toggle'
    >
      {/* begin::Brand */}
      <div style={{backgroundColor: ss}} className='aside-logo flex-column-auto' id='kt_aside_logo'>
        {/* begin::Logo */}
        {aside.theme === 'dark' && (
          <Link to='/dashboard'>
            <img
              alt='Logo'
              className='h-25px logo'
              src={toAbsoluteUrl('/media/logos/logo-idnama.png')}
            />
          </Link>
        )}
        {aside.theme === 'light' && (
          <Link to='/dashboard'>
            <img
              alt='Logo'
              className='h-25px logo'
              src={toAbsoluteUrl('/media/logos/logo-idnama.png')}
            />
          </Link>
        )}
        {/* end::Logo */}

        {/* begin::Aside toggler */}
        {aside.minimize && (
          <div
            id='kt_aside_toggle'
            className='btn btn-icon w-auto px-0 btn-active-color-primary aside-toggle'
            data-kt-toggle='true'
            data-kt-toggle-state='active'
            data-kt-toggle-target='body'
            data-kt-toggle-name='aside-minimize'
          >
            <KTSVG
              path={'/media/icons/duotune/arrows/arr080.svg'}
              className={'svg-icon-1 rotate-180'}
            />
          </div>
        )}
        {/* end::Aside toggler */}
      </div>
      {/* end::Brand */}

      {/* begin::Aside menu */}

      {passchange && (
        <div className='aside-menu flex-column-fluid'>
          <AsideMenu asideMenuCSSClasses={classes.asideMenu} />
        </div>
      )}
      {/* end::Aside menu */}

      {/* begin::Footer */}
      <div
        style={{backgroundColor: ss}}
        className='aside-footer flex-column-auto pt-5 pb-7 px-5'
        id='kt_aside_footer'
      ></div>
      {/* end::Footer */}
    </div>
  )
}

export {AsideDefault}
