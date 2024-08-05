/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {FC, useState, useEffect} from 'react'
import {useIntl} from 'react-intl'
import {useHistory} from 'react-router-dom'
import {PageTitle} from '../../../_metronic/layout/core'
import {selectpasschange, logout} from 'app/modules/auth/redux/AuthSlice'
import {useAppSelector} from 'setup/redux/hooks'
import axios from 'axios'
import {connect, useDispatch, ConnectedProps} from 'react-redux'
import {
  MixedWidget2,
  MixedWidget10,
  MixedWidget11,
  ListsWidget2,
  ListsWidget3,
  ListsWidget4,
  ListsWidget5,
  ListsWidget6,
  TablesWidget5,
  TablesWidget10,
  MixedWidget8,
} from '../../../_metronic/partials/widgets'

const DashboardPage: FC = () => <>{/* begin::Row */}</>

const ChangePassWordPage: React.FC = () => {
  const API_URL = process.env.REACT_APP_API_URL || 'api'
  const history = useHistory()
  const [oldpass, setoldpass] = useState('')
  const [newpass, setNewpass] = useState('')
  const [reNewpass, setreNewpass] = useState('')
  const [captchasrc, setcaptchasrc] = useState('')
  const [captcha, setcaptcha] = useState('')
  useEffect(() => {
    fetchData()
    return () => {}
  }, [])
  const fetchData = async () => {
    const resp = await fetch(API_URL + 'Auth/GetCaptcha')
    debugger
    const json = await resp.json()
    setcaptchasrc('data:image/png;base64,' + json.value.img)
    localStorage.setItem('img', '')
    localStorage.setItem('cpCode', json.value.cpCode)
  }
  const saveNewppass = async () => {
    try {
      let url = API_URL + 'Profile/ChangePassword'
      axios({
        method: 'post',
        url: url,
        data: {
          currentPassword: oldpass,
          password: newpass,
          rePassword: reNewpass,
          captcha: captcha,
          cpCode: localStorage.getItem('cpCode'),
        },
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      })
        .then(function (response) {
          history.push('/logout')
        })
        .catch(function (response) {
          fetchData()
        })
    } catch (e: any) {
      if (!e.processed) {
      }
    }
  }
  return (
    <div className={'row 12'} style={{padding: '10px'}}>
      <div className={'row 12'}>
        <div className='col-sm-3'>رمز فعلی:</div>
        <div className='col-sm-3'>
          <input
            style={{marginBottom: '5px'}}
            value={oldpass}
            onChange={(e) => setoldpass(e.target.value)}
            className={
              oldpass === ''
                ? 'col-form-label form-control form-control-lg form-control-solid  is-invalid'
                : 'col-form-label form-control form-control-lg form-control-solid  is-valid'
            }
          />
        </div>
      </div>
      <div className={'row 12'}>
        <div className='col-sm-3'>رمز جدید:</div>
        <div className='col-sm-3'>
          <input
            style={{marginBottom: '5px'}}
            value={newpass}
            onChange={(e) => setNewpass(e.target.value)}
            className={
              newpass === ''
                ? 'col-form-label form-control form-control-lg form-control-solid  is-invalid'
                : 'col-form-label form-control form-control-lg form-control-solid  is-valid'
            }
          />
        </div>
      </div>
      <div className={'row 12'}>
        <div className='col-sm-3'>تکرار رمز جدید :</div>
        <div className='col-sm-3'>
          <input
            style={{marginBottom: '5px'}}
            value={reNewpass}
            onChange={(e) => setreNewpass(e.target.value)}
            className={
              reNewpass === ''
                ? 'col-form-label form-control form-control-lg form-control-solid  is-invalid'
                : 'col-form-label form-control form-control-lg form-control-solid  is-valid'
            }
          />
        </div>
      </div>

      <div className={'row 12'} style={{padding: '10px'}}>
        <div className='col-sm-3'></div>
        <div className='col-sm-2'>
          {localStorage.getItem('img') === '' && <img src={captchasrc}></img>}

          <img src={localStorage.getItem('img') || ''}></img>
        </div>
        <div className='col-sm-1'>
          <img
            style={{paddingTop: '10px'}}
            alt='Logo'
            className='h-40px logo'
            src={process.env.PUBLIC_URL + '/media/icons/refresh.png'}
            onClick={fetchData}
          />
        </div>
      </div>
      <div className={'row 12'}>
        <label className='col-form-label col-sm-3'> کد امنیتی</label>
        <div className='col-sm-3'>
          <input
            value={captcha}
            onChange={(e) => setcaptcha(e.target.value)}
            className={'col-form-label form-control form-control-lg form-control-solid '}
          />
        </div>
      </div>
      <div className={'row 12'}>
        <div className='col-sm-3'></div>
        <div className='col-sm-3'>
          <button
            className='btn btn-sm align-self-start me-2 k-button k-primary'
            onClick={saveNewppass}
          >
            ثبت
          </button>
        </div>
      </div>
    </div>
  )
}

const DashboardWrapper: FC = () => {
  const intl = useIntl()
  const passchange = useAppSelector(selectpasschange)
  const dispatch = useDispatch()
  if (passchange === undefined) {
    dispatch(logout())

    // store = undefined
    // localStorage.removeItem('user-info')
    // history.push('/auth/logout')
  }

  return (
    <>
      <PageTitle breadcrumbs={[]}>{intl.formatMessage({id: 'MENU.DASHBOARD'})}</PageTitle>
      {passchange && <DashboardPage />}
      {!passchange && <ChangePassWordPage />}
    </>
  )
}

export {DashboardWrapper}
