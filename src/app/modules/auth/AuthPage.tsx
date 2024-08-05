/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {useEffect} from 'react'
import {Redirect, Route, Switch} from 'react-router-dom'
import {Registration} from './components/Registration'
import {ForgotPass} from './components/ForgotPass'
import {MembershipTracking} from './components/MembershipTracking'
import {Login} from './components/Login'
import {toAbsoluteUrl} from '../../../_metronic/helpers'

export function AuthPage() {
  useEffect(() => {
    document.body.classList.add('bg-white')
    return () => {
      document.body.classList.remove('bg-white')
    }
  }, [])

  return (
    <div
      style={{
        height: '100%',
        backgroundImage: `url(${toAbsoluteUrl('/media/illustrations/sketchy-1/14.png')})`,
      }}
    >
      {/* begin::Content */}
      <div className='d-flex flex-center flex-column flex-column-fluid pb-lg-20'>
        {/* begin::Logo */}
        <a href='#' className='mb-6'>
          <img
            style={{height: '100px !important;'}}
            alt='Logo'
            src={toAbsoluteUrl('/media/logos/logo-idnama.png')}
          />
          <img
            style={{height: '100px !important;'}}
            alt='Logo'
            src={toAbsoluteUrl('/media/logos/Logo.png')}
          />
        </a>
        <h2 style={{padding: '10px'}} className='text-dark mb-3'>
          {' '}
          پرتال جامع مرکز ملی شماره گذاری کالا و خدمات ایران{' '}
        </h2>
        {/* end::Logo */}
        {/* begin::Wrapper */}
        {/* w-lg-500px */}
        {/* <div className='w-lg-500px bg-white rounded shadow-sm p-10 p-lg-15 mx-auto'> */}
        <div>
          <Switch>
            <Route path='/auth/login' component={Login} />
            <Route path='/auth/registration' component={Registration} />
            <Route path='/auth/forgot-password' component={ForgotPass} />
            <Route path='/auth/membershipTracking' component={MembershipTracking} />
            <Redirect from='/auth' exact={true} to='/auth/login' />
            <Redirect to='/auth/login' />
          </Switch>
        </div>

        {/* end::Wrapper */}
      </div>
      {/* end::Content */}
      {/* begin::Footer */}
      <div className='d-flex flex-center flex-column-auto p-10'>
        <div className='d-flex align-items-center fw-bold fs-6'>
          <a href='#' className='text-muted text-hover-primary px-2'>
            About
          </a>

          <a href='#' className='text-muted text-hover-primary px-2'>
            Contact
          </a>

          <a href='#' className='text-muted text-hover-primary px-2'>
            Contact Us
          </a>
        </div>
      </div>
      {/* end::Footer */}
    </div>
  )
}
