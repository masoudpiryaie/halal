import {useEffect, useState} from 'react'
import {Dialog} from '@progress/kendo-react-dialogs'
import {defaultPageTitles, FormMode} from '@core/forms'
import axios from 'axios'
import {toast} from 'react-toastify'
import {FieldError, useForm} from 'react-hook-form'
import {FormControl, DialogActions} from '@core/components'
import {useIntl} from 'react-intl'
import {debug} from 'console'

type PropsType = {
  mode: FormMode
  onClose: () => void
  item?: ProductsModel
}
export type ProductsModel = {
  id?: number
  title: string
  description: string
  countryPrefix: string
  prefixLength: number
  availableCodeCount: string
  packageType: number
  type: number
  codeType: number
  prefixType: number
  isPublic: boolean
  isIncome: boolean
}
const pageTitles = defaultPageTitles

export function ProductsCreateDialog({mode, onClose, item}: PropsType) {
  const intl = useIntl()
  const API_URL = process.env.REACT_APP_API_URLCoding || 'api'
  const [type, settype] = useState(-1)
  const [codeType, setcodeType] = useState(-1)
  const [prefixType, setprefixType] = useState(-1)
  const [packageType, setpackageType] = useState(1)
  const [titleprefix, settitleprefix] = useState('نوع پیش شماره')
  const [countryPrefix, setcountryPrefix] = useState('')
  const [codeTypedis, setcodeTypedis] = useState(false)
  const [prefixLength, setprefixLength] = useState(-1)
  const [availableCodeCount, setavailableCodeCount] = useState('')

  const {
    register,
    handleSubmit,
    reset,
    formState: {errors, isDirty, touchedFields},
  } = useForm<ProductsModel>({mode: 'all'})

  useEffect(() => {
    if (mode === 'edit') {
      debugger
      reset(item)
      if (item?.packageType !== undefined) setpackageType(item?.packageType)
      if (item?.prefixType !== undefined) setprefixType(item?.prefixType)
      if (item?.type !== undefined) settype(item?.type)
      if (item?.codeType !== undefined) setcodeType(item?.codeType)
      if (item?.prefixLength !== undefined) setprefixLength(item?.prefixLength)
      if (item?.availableCodeCount !== undefined) setavailableCodeCount(item?.availableCodeCount)
    }
  }, [mode, item, reset])

  const onSubmit = handleSubmit(async (data) => {
    if ((type === 2 || type === 3) && prefixType === -1) {
      toast.error('پیش شماره اجباری است', {
        position: 'top-center',
      })
      return
    }

    debugger
    let url = API_URL + 'Products'
    try {
      if (mode !== 'edit') {
        await axios.post(url, {
          title: data.title,
          description: data.description,
          packageType: packageType,
          type: type,
          codeType: codeType,
          prefixType: prefixType,
          countryPrefix: countryPrefix,
          prefixLength: prefixLength,
          isInitial: true,
          isPublic: true,
          isIncome: true,
        })
      } else {
        await axios.put(url, {
          id: data.id,
          title: data.title,
          description: data.description,
          packageType: packageType,
          type: type,
          codeType: codeType,
          prefixType: prefixType,
          countryPrefix: countryPrefix,
          prefixLength: prefixLength,
          availableCodeCount: availableCodeCount,
          isPublic: true,
          isIncome: true,
        })
      }
      toast.info(intl.formatMessage({id: 'MENU.ACTIONSuccess'}), {
        position: 'top-center',
      })
      onClose()
    } catch (e: any) {
      if (!e.processed) {
        toast.error(intl.formatMessage({id: 'MENU.ACTIONError'}), {
          position: 'top-center',
        })
      }
    }
  })

  const resetForm = () => {
    reset()
    if (isDirty) {
    }
  }
  const getValidationClass = (touched: boolean | undefined, error: FieldError | undefined) => {
    if (mode === 'edit') return error ? 'is-invalid' : 'is-valid'
    else {
      if (touched === true) {
        return error ? 'is-invalid' : 'is-valid'
      }
    }
  }
  const handleInputChangepackageType = (e: any) => {
    setpackageType(parseInt(e.target.value))
  }
  const handleInputChangecodeType = (e: any) => {
    setcodeType(parseInt(e.target.value))
    if (e.target.value !== '-1') setnoeCode(' is-valid')
    else setnoeCode(' is-invalid')
  }
  const handleInputChangeprefixType = (e: any) => {
    setprefixType(parseInt(e.target.value))
    if (e.target.value !== '-1') setprefixTypevalidation(' is-valid')
    else setprefixTypevalidation(' is-invalid')
    debugger
  }
  const [lenvalidation, setlenvalidation] = useState('')
  const [noeCode, setnoeCode] = useState('')
  const [availablevalidation, setavailablevalidation] = useState('')
  const [prefixTypevalidation, setprefixTypevalidation] = useState('')
  const [countryvalidation, setcountryvalidation] = useState('')
  //const [validation5, setvalidation5] = useState('')
  const handleInputChangetype = (e: any) => {
    settype(parseInt(e.target.value))

    debugger

    setcodeType(-1)
    setprefixType(-1)
    setpackageType(-1)
    setcountryPrefix('')
    setprefixLength(-1)
    setavailableCodeCount('')

    settitleprefix(e.target.value === '3' ? 'نوع اشتراک' : 'نوع پیش شماره')
    if (e.target.value === '2') setcodeTypedis(true)
    else setcodeTypedis(false)

    if (
      prefixLength === -1 &&
      (e.target.value === '2' || e.target.value === '1' || e.target.value === '4')
    )
      setlenvalidation(' is-invalid')
    else setlenvalidation(' is-valid')
    debugger

    if (codeType === -1 && (e.target.value === '1' || e.target.value === '4'))
      setnoeCode(' is-invalid')
    else setnoeCode(' is-valid')

    if (
      availableCodeCount === '' &&
      (e.target.value === '1' || e.target.value === '2' || e.target.value === '4')
    )
      setavailablevalidation(' is-invalid')
    else setavailablevalidation(' is-valid')

    if (prefixType === -1 && (e.target.value === '3' || e.target.value === '2'))
      setprefixTypevalidation(' is-invalid')
    else setprefixTypevalidation(' is-valid')

    if (countryPrefix === '' && e.target.value === '2') setcountryvalidation(' is-invalid')
    else setcountryvalidation(' is-valid')

    debugger
  }
  const handleInputChangecountryPrefix = (e: any) => {
    setcountryPrefix(e.target.value)
    if (e.target.value !== '-1') setcountryvalidation(' is-valid')
    else setcountryvalidation(' is-invalid')
  }
  const handleInputChangeprefixLength = (e: any) => {
    setprefixLength(parseInt(e.target.value))
    if (e.target.value !== '-1') setlenvalidation(' is-valid')
    else setlenvalidation(' is-invalid')
    if (e.target.value === '9') setavailableCodeCount('1')
    if (e.target.value === '8') setavailableCodeCount('10')
    if (e.target.value === '7') setavailableCodeCount('100')
    if (e.target.value === '6') setavailableCodeCount('1000')
    if (e.target.value === '5') setavailableCodeCount('10000')
    setavailablevalidation(' is-valid')
    debugger
    // if (e.target.value === '-1' && type === 2) {
    //   setvalidation2(' is-invalid')
    //   setvalidation4(' is-invalid')
    //   setvalidation5(' is-invalid')
    // } else {
    //   setvalidation2(' is-valid')
    //   setvalidation4(' is-valid')
    //   setvalidation5(' is-valid')
    // }
  }
  const handleInputChangeavailableCodeCount = (e: any) => {
    setavailableCodeCount(e.target.value)
    if (e.target.value !== '') setavailablevalidation(' is-valid')
    else setavailablevalidation(' is-invalid')
    debugger
    // if (e.target.value === '' && type === 2) {
    //   setvalidation3(' is-invalid')
    //   setvalidation4(' is-invalid')
    //   setvalidation5(' is-invalid')
    // } else {
    //   setvalidation3(' is-valid')
    //   setvalidation4(' is-valid')
    //   setvalidation5(' is-valid')
    // }
  }
  return (
    <div>
      <Dialog title={pageTitles[mode]} onClose={onClose}>
        <div>
          <form id='dialog-form' onSubmit={onSubmit} className='row g-3'>
            <FormControl col={6} label='نوع گروه'>
              <select
                className='form-select form-select-sm'
                name='operator'
                onChange={(e) => handleInputChangepackageType(e)}
                value={packageType}
              >
                <option value='1'>عضویت</option>
                <option value='2'>GS1</option>
                <option value='3'>سرویس</option>
                <option value='4'>ایران کد</option>
              </select>
            </FormControl>
            <FormControl col={6} label='نوع محصول'>
              <select
                className='form-select form-select-sm'
                name='operator'
                onChange={(e) => handleInputChangetype(e)}
                value={type}
              >
                <option value='-1'>انتخاب کنید</option>
                <option value='1'>کد</option>
                <option value='2'>پیش شماره</option>
                <option value='3'>اشتراک سالیانه</option>
                <option value='4'>اختلاف قیمت </option>
              </select>
            </FormControl>
            <FormControl col={6} label='عنوان'>
              <input
                className={getValidationClass(touchedFields.title, errors.title)}
                autoFocus={true}
                {...register('title', {required: true})}
              />
            </FormControl>
            <FormControl col={6} label=' پیش شماره کشور'>
              <input
                value={countryPrefix}
                disabled={type === 3 || type === 1 || type === 4}
                onChange={(e) => handleInputChangecountryPrefix(e)}
                className={'form-control ' + countryvalidation}
              />
            </FormControl>
            <FormControl col={6} label='طول پیش شماره'>
              <select
                className={'form-select form-select-sm' + lenvalidation}
                name='operator'
                onChange={(e) => handleInputChangeprefixLength(e)}
                value={prefixLength}
                disabled={type === 3}
              >
                <option value='-1'>انتخاب کنید</option>
                <option value='5'>5</option>
                <option value='6'>6</option>
                <option value='7'>7</option>
                <option value='8'>8</option>
              </select>
            </FormControl>
            {/* <FormControl col={6} label='طول پیش شماره'>
              <input
                value={prefixLength}
                disabled={type === 3}
                onChange={(e) => handleInputChangeprefixLength(e)}
                className={'form-control ' + validation2 + validation4 + validation5}
              />
            </FormControl> */}
            <FormControl col={6} label='تعداد کد قابل صدور'>
              <input
                value={availableCodeCount}
                disabled={type === 3}
                onChange={(e) => handleInputChangeavailableCodeCount(e)}
                className={'form-control ' + availablevalidation}
                readOnly={true}
              />
            </FormControl>

            <FormControl col={6} label='نوع کد'>
              <select
                disabled={codeTypedis || type === 3}
                className={'form-select  form-select-sm' + noeCode}
                name='operator'
                onChange={(e) => handleInputChangecodeType(e)}
                value={codeType}
              >
                <option value='-1'>انتخاب کنید</option>
                <option value='1'>کالا</option>
                <option value='2'>خدمت </option>
                <option value='3'>GLN داخلی </option>
                <option value='4'>GLN بین المللی </option>
              </select>
            </FormControl>
            <FormControl col={6} label={titleprefix}>
              <select
                className={'form-select  form-select-sm' + prefixTypevalidation}
                name='operator'
                onChange={(e) => handleInputChangeprefixType(e)}
                value={prefixType}
                disabled={type === 1 || type === 4}
              >
                <option value='-1'>انتخاب کنید</option>
                <option value='1'>سرویس</option>
                <option value='2'>کالا </option>
              </select>
            </FormControl>
            <FormControl col={6} label='شرح'>
              <textarea {...register('description')} />
            </FormControl>
          </form>
        </div>
        <DialogActions mode={mode} onClose={onClose} resetForm={resetForm}></DialogActions>
      </Dialog>
    </div>
  )
}
