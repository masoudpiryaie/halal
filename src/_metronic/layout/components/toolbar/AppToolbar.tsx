/* eslint-disable jsx-a11y/anchor-is-valid */
import clsx from 'clsx'
import React, {FC} from 'react'
import {KTSVG} from '../../../helpers'
import {useLayout, usePageData} from '../../core'
import {DefaultTitle} from '../header/page-title/DefaultTitle'

const AppToolbar: FC = () => {
  const {classes} = useLayout()
  const {pageActions} = usePageData()

  return (
    <div className='toolbar' id='kt_toolbar'>
      <div
        id='kt_toolbar_container'
        className={clsx(classes.toolbarContainer.join(' '), 'd-flex flex-stack')}
      >
        <DefaultTitle />

        <div className='d-flex align-items-center py-1'>{pageActions}</div>
      </div>
    </div>
  )
}

export {AppToolbar}
