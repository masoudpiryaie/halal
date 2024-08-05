/* eslint-disable jsx-a11y/anchor-is-valid */
import {useDispatch} from 'react-redux'
import * as Yup from 'yup'
import clsx from 'clsx'
import {Link, useHistory} from 'react-router-dom'
import {useFormik} from 'formik'
import {doLoginAsync, selectLoading} from '../redux/AuthSlice'
import {useAppSelector} from 'setup/redux/hooks'
import {toAbsoluteUrl} from '../../../../_metronic/helpers'
import {useEffect, useState} from 'react'
import jwt from 'jwt-decode'
import axios from 'axios'
export interface tokModel {
  state: string
}
const loginSchema = Yup.object().shape({
  // email: Yup.string()
  //   .email('Wrong email format')
  //   .min(3, 'Minimum 3 symbols')
  //   .max(50, 'Maximum 50 symbols')
  //   .required('Email is required'),
  password: Yup.string()
    .min(3, 'Minimum 3 symbols')
    .max(50, 'Maximum 50 symbols')
    .required('Password is required'),
})

const initialValues = {
  email: 'admin',
  password: '1qaz@WSX',
  //email: 'mem_0079955916',
  //password: '53739651',
}

/*
  Formik+YUP+Typescript:
  https://jaredpalmer.com/formik/docs/tutorial#getfieldprops
  https://medium.com/@maurice.de.beijer/yup-validation-and-typescript-and-formik-6c342578a20e
*/

export function Login() {
  const loading = useAppSelector(selectLoading)

  let API_URL : string = process.env.REACT_APP_API_URL || 'api'
    useEffect(() => {
    localStorage.setItem('tempusername', '')
    localStorage.setItem('tempppassword', '')
    localStorage.setItem('tempcaptcha', '')
    localStorage.setItem('tempcpCode', '')
    localStorage.setItem('state', '')
    fetchData()
    console.log("afsgdgdfgdfga")
    return () => {
      //var userInfo = localStorage.getItem('user-info')
      // When the component unmounts remove the event listener
    }
  }, [])

  // const [loading, setLoading] = useState(false)
  const [captchasrc, setcaptchasrc] = useState('')
  const [captcha, setcaptcha] = useState('')
  const [cpCode, setcpCode] = useState('')
  const [enterLoading, setenterLoading] = useState(false)

  const fetchData = async () => {
    try {
      const url = `${API_URL}/Auth/GetCaptcha`;
      const response = await axios.get(url);
  console.log(response,"111")
      // Check if the expected data is present
      if (response.data && response.data.value && response.data.value.img && response.data.value.cpCode) {
        setcaptchasrc('data:image/png;base64,' + response.data.value.img);
        setcpCode(response.data.value.cpCode);
        localStorage.setItem('img', '');
        localStorage.setItem('cpCode', response.data.value.cpCode);
      } else {
        throw new Error("Invalid response structure");
      }
    } catch (error) {
      console.error('Error fetching captcha:', error);
      // Handle error appropriately in your UI
    }
  };

  const dispatch = useDispatch()
  const formik = useFormik({
    initialValues,
    validationSchema: loginSchema,
    onSubmit: (values, {setStatus, setSubmitting}) => {
      debugger
      //if (localStorage.getItem('cpCode') !== '') setcpCode(localStorage.getItem('cpCode') || '')
      dispatch(
        doLoginAsync({
          email: values.email,
          password: values.password,
          captcha: captcha,
          cpCode: localStorage.getItem('cpCode') || '',
        })
      )

      // try {
      //   var gg = doLoginAsync({email: values.email, password: values.password})
      //   alert('ya')
      // } catch (e) {
      //   var gg = doLoginAsync({email: values.email, password: values.password})
      //   alert('oh')
      // }
      // // setLoading(true)
      // setTimeout(() => {
      //   login(values.email, values.password)
      //     .then(({data: {accessToken}}) => {
      //       // setLoading(false)
      //       dispatchORG(auth.actions.login(accessToken))
      //     })
      //     .catch(() => {
      //       // setLoading(false)
      //       setSubmitting(false)
      //       setStatus('The login detail is incorrect')
      //     })
      // }, 1000)
    },
  })

  const history = useHistory()
  const redirectToDashboard = () => {
    try {
      debugger
      setenterLoading(true)
      let url = `${API_URL}Auth/Login`
      axios({
        method: 'post',
        url: url,
        data: {
          username: formik.values.email,
          password: formik.values.password,
          captcha: captcha,
          cpCode: localStorage.getItem('cpCode') || '',
        },
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      })
        .then(function (response) {
          debugger
          localStorage.setItem('tempusername', formik.values.email)
          localStorage.setItem('tempppassword', formik.values.password)
          localStorage.setItem('tempcaptcha', captcha)
          localStorage.setItem('tempcpCode', localStorage.getItem('cpCode') || '')
          var tok = jwt(response.data.value.accessToken.token) || ''
          var f = JSON.stringify(tok)
          var ff = JSON.parse(f) as tokModel
          localStorage.setItem('state', JSON.stringify(ff.state))
          localStorage.setItem('token', response.data.value.accessToken.token)
          localStorage.setItem('memberId', response.data.value.user.memberId)
          localStorage.setItem('refreshToken', response.data.value.user.refreshToken.token)
          setenterLoading(false)
          history.push('/auth/registration')
        })
        .catch(function (response) {
          fetchData()
          setenterLoading(false)
        })
    } catch (e: any) {
      if (!e.processed) {
      }
    }
  }

  return (
    <form
      className='w-lg-500px bg-white rounded shadow-sm p-10 p-lg-15 mx-auto form w-100 border-image-clip-path'
      onSubmit={formik.handleSubmit}
      noValidate
      id='kt_login_signin_form'
      dir='rtl'
    >
      {/* begin::Heading */}
      <div className='text-center mb-10 '>
        <h1 className='text-dark mb-3'>ورود به سامانه مرکز ملی</h1>
        <div className='text-gray-400 fw-bold fs-4'>
          کاربر جدید هستید?{' '}
          <Link to='/auth/registration' className='link-primary fw-bolder'>
            ایجاد اکانت
          </Link>
        </div>
      </div>
      {/* begin::Heading */}

      {formik.status ? (
        <div className='mb-lg-15 alert alert-danger'>
          <div className='alert-text font-weight-bold'>{formik.status}</div>
        </div>
      ) : (
        <>
          {/* <div className='mb-10 bg-light-info p-8 rounded'>
          <div className='text-info'>
            Use account <strong>admin@root.com</strong> and password <strong>123Pa$$word!</strong>{' '}
            to continue.
          </div>
        </div> */}
        </>
      )}

      {/* begin::Form group */}
      <div className='fv-row mb-10'>
        <label className='form-label fs-6 fw-bolder text-dark'>نام کاربری</label>
        <input
          placeholder='Email'
          {...formik.getFieldProps('email')}
          className={clsx(
            'form-control form-control-lg form-control-solid',
            {'is-invalid': formik.touched.email && formik.errors.email},
            {
              'is-valid': formik.touched.email && !formik.errors.email,
            }
          )}
          type='email'
          name='email'
          autoComplete='off'
        />

        {formik.touched.email && formik.errors.email && (
          <div className='fv-plugins-message-container'>
            <span role='alert'>{formik.errors.email}</span>
          </div>
        )}
      </div>
      {/* end::Form group */}

      {/* begin::Form group */}
      <div className='fv-row mb-10'>
        <div className='d-flex justify-content-between mt-n5'>
          <div className='d-flex flex-stack mb-2'>
            {/* begin::Label */}
            <label className='form-label fw-bolder text-dark fs-6 mb-0'>گذرواژه</label>
            {/* end::Label */}
            {/* begin::Link */}
            <Link
              to='/auth/forgot-password'
              className='link-primary fs-6 fw-bolder'
              style={{marginLeft: '5px'}}
            >
              &nbsp; فراموش کردید؟
            </Link>
            {/* end::Link */}
          </div>
        </div>
        <input
          type='password'
          autoComplete='off'
          {...formik.getFieldProps('password')}
          className={clsx(
            'form-control form-control-lg form-control-solid',
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
      <div className={'row 12'} style={{padding: '10px'}}>
        <div className='col-sm-8'>
          {localStorage.getItem('img') === '' && <img src={captchasrc}></img>}

          <img src={localStorage.getItem('img') || ''}></img>
        </div>
        <div className='col-sm-2'>
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
        <label className='col-form-label col-sm-4'> کد امنیتی</label>
        <div className='col-sm-8'>
          <input
            value={captcha}
            onChange={(e) => setcaptcha(e.target.value)}
            className={'col-form-label form-control form-control-lg form-control-solid '}
          />
        </div>
      </div>
      {/* end::Form group */}

      {/* begin::Action */}
      {/* <div className='text-center'>
        <button
          type='submit'
          id='kt_sign_in_submit'
          className='btn btn-lg btn-primary w-100 mb-5'
          // disabled={formik.isSubmitting || !formik.isValid}
        >
          {!loading && <span className='indicator-label'>ورود</span>}
          {loading && (
            <span className='indicator-progress' style={{display: 'block'}}>
              در حال ورود ...|
              <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
            </span>
          )}
        </button>
      </div> */}
      {/* end::Action */}
      {/* begin::Action */}
      <div>
        <button
          type='submit'
          id='kt_sign_in_submit'
          className='btn btn-lg btn-primary w-100 mb-5'
          // disabled={formik.isSubmitting || !formik.isValid}
        >
          {!loading && <span className='indicator-label'>ورود </span>}
          {loading && (
            <span className='indicator-progress' style={{display: 'block'}}>
              در حال ورود ...|
              <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
            </span>
          )}
        </button>
      </div>
      {/* end::Action */}
    </form>
  )
}
