import clsx from 'clsx'
import React, {FC, useEffect, useState} from 'react'
import {KTSVG, toAbsoluteUrl} from '../../../helpers'
import {HeaderNotificationsMenu, HeaderUserMenu, QuickLinks} from '../../../partials'
import {useLayout, ILayout} from '../../core'
import SVG from 'react-inlinesvg'

const toolbarButtonMarginClass = 'ms-1 ms-lg-3',
  toolbarButtonHeightClass = 'w-30px h-30px w-md-40px h-md-40px',
  toolbarUserAvatarHeightClass = 'symbol-30px symbol-md-40px',
  toolbarButtonIconSizeClass = 'svg-icon-1'

const Topbar: FC = () => {
  const {config} = useLayout()
  const [color, setcolor] = useState('')
  const [invert, setinvert] = useState('37%')
  const [sepia, setsepia] = useState('100%')
  const [huerotate, sethuerotate] = useState('89deg')
  const [saturate, setsaturate] = useState('20%')

  useEffect(() => {
    const ls = localStorage.getItem('LayoutConfig')
    if (ls) {
      var colo = JSON.parse(ls) as ILayout
      if (colo.main !== undefined) setcolor(colo.main.primaryColor)

      if (
        //grren
        color === '#97e757' ||
        color === '#2c6319fa' ||
        color === '#196321fa' ||
        color === '#196343fa' ||
        color === '#19635ffa' ||
        color === '#194f63fa' ||
        color === '#446319fa' ||
        color === '#81bf00' ||
        color === '#54bf00' ||
        color === '#0ebf00' ||
        color === '#00bf39' ||
        color === '#57e78f' ||
        color === '#526319fa'
      ) {
        setinvert('100%')
        setsepia('34%')
        setsaturate('3551%')
        sethuerotate('31deg')
      }
      if (
        //blue
        color === '#57e7d8' ||
        color === '#0073b3' ||
        color === '#57c1e7' ||
        color === '#5792e7' ||
        color === '#5764e7' ||
        color === '#193e63fa' ||
        color === '#009ebf' ||
        color === '#1200bf' ||
        color === '#001abf' ||
        color === '#0060bf' ||
        color === '#00bfab'
      ) {
        setinvert('84%')
        setsepia('53%')
        setsaturate('460%')
        sethuerotate('106deg')
      }

      if (
        //red
        color === '#992626' ||
        color === '#e75757' ||
        color === '#631919' ||
        color === '#633019' ||
        color === '#63191afa' ||
        color === '#631919fa' ||
        color === '#bf0000' ||
        color === '#bf4d00'
      ) {
        setinvert('9%')
        setsepia('60%')
        setsaturate('6457%')
        sethuerotate('356deg')
      }
      if (
        //yellow
        color === '#e7ac57' ||
        color === '#e7c057' ||
        color === '#bf7900' ||
        color === '#bf9c00' ||
        color === '#bebf00' ||
        color === '#e0e757'
      ) {
        setinvert('62%')
        setsepia('79%')
        setsaturate('809%')
        sethuerotate('20deg')
      }
      if (
        //pink
        color === '#7f57e7' ||
        color === '#ae57e7' ||
        color === '#e357e7' ||
        color === '#e757a2' ||
        color === '#271963fa' ||
        color === '#461963fa' ||
        color === '#631962fa' ||
        color === '#63193ffa' ||
        color === '#63191afa' ||
        color === '#3e00bf' ||
        color === '#7300bf' ||
        color === '#a800bf' ||
        color === '#bf007e' ||
        color === '##bf0049'
      ) {
        setinvert('47%')
        setsepia('81%')
        setsaturate('1241%')
        sethuerotate('298deg')
      }
      if (
        //gray
        color === '#d1d1d1' ||
        color === '#3e3e3e' ||
        color === '#101010fa'
      ) {
        setinvert('37%')
        setsepia('100%')
        setsaturate('20%')
        sethuerotate('89deg')
      }
    } else {
      setinvert('37%')
      setsepia('100%')
      setsaturate('20%')
      sethuerotate('89deg')
    }
  })
  return (
    <div className='d-flex align-items-stretch flex-shrink-0'>
      {/* Search */}
      {/* <div className={clsx('d-flex align-items-stretch', toolbarButtonMarginClass)}>
        <Search />
      </div> */}
      {/* Activities */}
      <div className={clsx('d-flex align-items-center', toolbarButtonMarginClass)}>
        {/* begin::Drawer toggle */}
        <div
          className={clsx('btn btn-icon btn-active-light-primary', toolbarButtonHeightClass)}
          id='kt_activities_toggle'
        >
          <SVG
            style={{
              filter:
                'invert(' +
                invert +
                ') sepia(' +
                sepia +
                ') saturate(' +
                saturate +
                ') hue-rotate(' +
                huerotate +
                ')',
            }}
            className={toolbarButtonIconSizeClass}
            src={process.env.PUBLIC_URL + '/media/icons/duotune/general/gen032.svg'}
          />
        </div>
      </div>

      {/* <div className={clsx('d-flex align-items-center', toolbarButtonMarginClass)}>
        <div
          className={clsx(
            'btn btn-icon btn-active-light-primary position-relative',
            toolbarButtonHeightClass
          )}
          data-kt-menu-trigger='click'
          data-kt-menu-attach='parent'
          data-kt-menu-placement='bottom-end'
          data-kt-menu-flip='bottom'
        >
          <SVG
            style={{
              filter:
                'invert(' +
                invert +
                ') sepia(' +
                sepia +
                ') saturate(' +
                saturate +
                ') hue-rotate(' +
                huerotate +
                ')',
            }}
            className={toolbarButtonIconSizeClass}
            src={process.env.PUBLIC_URL + '/media/icons/duotune/general/gen022.svg'}
          />
        </div>
        <HeaderNotificationsMenu />
      </div> */}

      <div
        className={clsx('d-flex align-items-center', toolbarButtonMarginClass)}
        id='kt_header_user_menu_toggle'
      >
        <div
          className={clsx('cursor-pointer symbol', toolbarUserAvatarHeightClass)}
          data-kt-menu-trigger='click'
          data-kt-menu-attach='parent'
          data-kt-menu-placement='bottom-end'
          data-kt-menu-flip='bottom'
        >
          <SVG
            style={{
              filter:
                'invert(' +
                invert +
                ') sepia(' +
                sepia +
                ') saturate(' +
                saturate +
                ') hue-rotate(' +
                huerotate +
                ')',
            }}
            className={toolbarButtonIconSizeClass}
            src={process.env.PUBLIC_URL + '/media/icons/duotune/general/gen008.svg'}
          />
        </div>
        <HeaderUserMenu />
      </div>
      {/* end::User */}

      {/* begin::Aside Toggler */}
      {config.header.left === 'menu' && (
        <div className='d-flex align-items-center d-lg-none ms-2 me-n3' title='Show header menu'>
          <div
            className='btn btn-icon btn-active-light-primary w-30px h-30px w-md-40px h-md-40px'
            id='kt_header_menu_mobile_toggle'
          >
            <KTSVG path='/media/icons/duotune/text/txt001.svg' className='svg-icon-1' />
          </div>
        </div>
      )}
    </div>
  )
}

export {Topbar}
