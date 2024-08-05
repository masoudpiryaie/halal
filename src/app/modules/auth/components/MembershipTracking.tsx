/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {useState} from 'react'
import {useDispatch} from 'react-redux'
import {useFormik} from 'formik'
import * as Yup from 'yup'
import clsx from 'clsx'
import {Link, useHistory} from 'react-router-dom'
import axios from 'axios'
import {toast} from 'react-toastify'
import useCountDown from 'react-countdown-hook'
import {toAbsoluteUrl} from '_metronic/helpers'
import {Counter} from './Counter'

const initialTime = 60 * 1000 // initial time in milliseconds, defaults to 60000
const interval = 1000

const initialValues = {
  password: '',
}

const registrationSchema = Yup.object().shape({
  password: Yup.string()
    .min(3, 'Minimum 3 symbols')
    .max(50, 'Maximum 50 symbols')
    .required('کد ملی/شناسه ملی اجباری است'),
})

export function MembershipTracking() {
  const history = useHistory()
  const [loading, setLoading] = useState(false)
  const [isMob, setisMob] = useState('true')
  const [choseWay, setChoseWay] = useState(true)

  const [timeLeft, {start, pause, resume, reset}] = useCountDown(initialTime, interval)
  const [ersalShow, setErsalShow] = useState(true)
  const [acceptShow, setAcceptShow] = useState(false)
  const [state, setState] = useState('')
  const [resShow, setResShow] = useState(false)
  const [nextShow, setNextShow] = useState(false)
  const [faalSazi, setFaalSazi] = useState(false)
  const restart = React.useCallback(() => {
    const newTime = 180 * 1000
    start(newTime)
  }, [])
  const formik = useFormik({
    initialValues,
    validationSchema: registrationSchema,
    onSubmit: async (values, {setStatus, setSubmitting}) => {
      setLoading(true)

      let url = 'bank' // to do

      try {
        restart()
        //alert(isMob + values.password)
        // await axios.post(url, values)
        setChoseWay(false)
        setFaalSazi(true)
        setLoading(false)
        setErsalShow(false)
        setAcceptShow(true)
      } catch (e: any) {
        setLoading(false)
        setSubmitting(false)
        setStatus(e)
      }
    },
  })
  const sendCode = () => {
    setResShow(true)
    setChoseWay(true)
    setState('بازبینی')
    setNextShow(true)
    setFaalSazi(false)
    setAcceptShow(false)
    setChoseWay(false)
    //alert(timeLeft)
  }
  const next = () => {
    history.push('/login')
  }
  return (
    <form
      className='w-lg-500px bg-white rounded shadow-sm p-10 p-lg-15 mx-auto form w-100 fv-plugins-bootstrap5 fv-plugins-framework'
      noValidate
      id='kt_login_signup_form'
      onSubmit={formik.handleSubmit}
    >
      {/* begin::Heading */}
      <div className='mb-10 text-center'>
        {/* begin::Title */}
        <h1 className='text-dark mb-3'>پیگیری عضویت</h1>
        {/* end::Title */}

        {/* begin::Link */}
        <div className='text-gray-400 fw-bold fs-4'>روش پیگیری</div>
        {/* end::Link */}
      </div>
      {/* end::Heading */}

      {/* begin::Form group nation */}
      <div className='mb-10 fv-row' data-kt-password-meter='true'>
        <div className={'row 12'}>
          <div className='col-sm-8'>
            <input
              autoFocus
              placeholder='کد ملی/شناسه ملی'
              autoComplete='off'
              {...formik.getFieldProps('password')}
              className={clsx(
                'form-control form-control-lg form-control-solid ',
                {
                  'is-invalid': formik.touched.password && formik.errors.password,
                },
                {
                  'is-valid': formik.touched.password && !formik.errors.password,
                }
              )}
            />
            {formik.touched.password && formik.errors.password && (
              <div className='fv-plugins-message-container'>
                <div className='fv-help-block'>
                  <span role='alert'>{formik.errors.password}</span>
                </div>
              </div>
            )}
          </div>
          <label className='col-form-label col-sm-4'>کد ملی/شناسه ملی</label>
        </div>
      </div>
      {/* end::Form group */}
      {choseWay && (
        <div className='text-center'>
          <div className='text-dark fw-bold fs-4 mb-10 fv-row'>
            کدام روش را برای دریافت کلمه عبور انتخاب می کنید؟
          </div>
          <div className='text-dark fw-bold fs-4 mb-10 fv-row'>
            <label className='form-label' style={{marginLeft: 15}}>
              ایمیل
            </label>
            <input
              className='form-check-input'
              type='radio'
              name='Ind'
              value={'false'}
              checked={isMob === 'false'}
              onChange={(e) => setisMob(e.target.value)}
            />
            <label className='form-label' style={{marginLeft: 15}}>
              تلفن همراه
            </label>
            <input
              className='form-check-input'
              type='radio'
              name='Ind'
              value={'true'}
              checked={isMob === 'true'}
              onChange={(e) => setisMob(e.target.value)}
            />
          </div>
        </div>
      )}
      {faalSazi && (
        <div className='mb-10 fv-row' data-kt-password-meter='true'>
          <div className={'row 12'}>
            <div className='col-sm-8'>
              <input
                placeholder='کد فعال سازی'
                autoComplete='off'
                className={clsx('form-control form-control-lg form-control-solid ')}
              />
            </div>
            <label className='col-form-label col-sm-4'>کد فعال سازی</label>
          </div>
          <Counter data={timeLeft}></Counter>
        </div>
      )}
      {resShow && (
        <div className='mb-10 fv-row' data-kt-password-meter='true'>
          <div className={'row 12'}>
            <div className='col-sm-8'>
              <label className='col-form-label col-sm-4 form-control form-control-lg form-control-solid'>
                {state}
              </label>
            </div>
            <label className='col-form-label col-sm-4'>وضعیت </label>
          </div>
        </div>
      )}

      {/* begin::Form group */}
      <div className='text-center'>
        {ersalShow && (
          <button
            type='submit'
            id='kt_sign_up_submit'
            className='btn btn-lg btn-primary w-100 mb-5'
            disabled={!formik.isValid}
          >
            {!loading && <span className='indicator-label'>ارسال کد</span>}
            {loading && (
              <span className='indicator-progress' style={{display: 'block'}}>
                لطفا منتظر بمانید...{' '}
                <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
              </span>
            )}
          </button>
        )}
        {acceptShow && (
          <button
            type='submit'
            id='kt_sign_up_submit'
            className='btn btn-lg btn-primary w-100 mb-5'
            onClick={sendCode}
          >
            {<span className='indicator-label'>تایید کد</span>}
          </button>
        )}
        {nextShow && (
          <button
            type='submit'
            id='kt_sign_up_submit'
            className='btn btn-lg btn-primary w-100 mb-5'
            onClick={next}
          >
            {<span className='indicator-label'>مرحله بعد </span>}
          </button>
        )}
        <Link to='/auth/login'>
          <button
            type='button'
            id='kt_login_signup_form_cancel_button'
            className='btn btn-lg btn-light-primary w-100 mb-5'
          >
            بازگشت
          </button>
        </Link>
      </div>
      {/* end::Form group */}
    </form>
  )
}
