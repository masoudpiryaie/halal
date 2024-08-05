/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {useState, useEffect} from 'react'
import {useFormik} from 'formik'
import * as Yup from 'yup'
import clsx from 'clsx'
import {Link, useHistory} from 'react-router-dom'
import axios from 'axios'
import {toast} from 'react-toastify'
import useCountDown from 'react-countdown-hook'
import {Counter} from './Counter'
import {ComboBox, ComboBoxLocaltow, ComboBoxLocal} from '@core/components'
import {PakDialog} from './PakDialog'
import {AgencyDialog} from './AgencyDialog'
import {PreFactorDialog} from './PreFactorDialog'
import DatePicker from 'react-datepicker2'
import moment from 'jalali-moment'
import {KTSVG} from '_metronic/helpers'
import {OpanMapDialog} from 'app/pages/admin/baseInfo/Component/OpanMapDialog'
const initialTime = 60 * 1000 // initial time in milliseconds, defaults to 60000
const interval = 1000

export function Registration() {
  const API_URL =  process.env.REACT_APP_API_URLCoding || 'api'
  const [captchasrc, setcaptchasrc] = useState('')
  const [captcha, setcaptcha] = useState('')
  const [cpCode, setcpCode] = useState('')
  const [mobile, setMobile] = useState('')
  const history = useHistory()
  const [loading, setLoading] = useState(false)
  const [IsForeign, setIsForeign] = useState('false')
  const [isMob, setisMob] = useState('true')
  const [IsLegal, setIsLegal] = useState('false')
  const [fullnamest, setFullnamest] = useState('')
  const [taahodtext, settaahodtext] = useState('')
  const [brthdst, setBrthdst] = useState('')
  const [fatherst, setFatherst] = useState('')
  const [nationalCodest, setnationalCodest] = useState('')
  const [infoKey, settinfoKey] = useState('')

  // const [selectWay, setSelectWay] = useState('1')
  // const [choseWay, setChoseWay] = useState(false)

  const [timeLeft, {start, pause, resume, reset}] = useCountDown(initialTime, interval)
  const [ersalShow, setErsalShow] = useState(true)
  const [acceptShow, setAcceptShow] = useState(false)
  const [state, setState] = useState('')
  const [resShow, setResShow] = useState(false)
  const [step1Show, setStep1Show] = useState(false)
  const [faalSazi, setFaalSazi] = useState(false)
  const [annswerShow, setAnnswerShow] = useState(false)
  const [nextShow1, setNextShow1] = useState(false)
  const [step0Show, setStep0Show] = useState(true)
  const [sendShow, setSendShow] = useState(false)
  const [regDiv, setRegDiv] = useState(true)
  const [strt, setStrt] = useState(false)
  const [taahodTab, setTaahodTab] = useState(false)
  const [propRealPerson, setPropRealPerson] = useState(false)
  const [addressRealPerson, setAddressRealPerson] = useState(false)
  const [rabetRealPerson, setRabetRealPerson] = useState(false)
  const [filesRealPerson, setFilesRealPerson] = useState(false)
  const [needRealPerson, setNeedRealPerson] = useState(false)
  const [pakeshowDialog, setPakeshowDialog] = useState(false)
  const [preFactorshowDialog, setpreFactorshowDialog] = useState(false)
  const [agencyshowDialog, setAgencyshowDialog] = useState(false)
  const [tabeeat, settabeeat] = useState('')
  const [gozarnameh, setgozarnameh] = useState('')
  const [ghabl2, setghabl2] = useState(true)
  const [ghabl3, setghabl3] = useState(true)
  const [ghabl4, setghabl4] = useState(true)
  const [ghabl5, setghabl5] = useState(true)

  const [ismale, setIsmale] = useState('true')
  //////////model//////
  const [nationalCode, setNationalCode] = useState('')
  const [acceptsrt, setAcceptsrt] = useState(false)
  ////////////////////

  ///model1
  const [nationalCode1, setnationalCode1] = useState('')
  const [passportNumber, setpassportNumber] = useState('')
  const [email, setemail] = useState('')
  const [fatherName, setfatherName] = useState('')
  const [idNumber, setidNumber] = useState('')
  const [lastNameFa, setlastNameFa] = useState('')
  const [lastNameEn, setlastNameEn] = useState('')
  const [firstNameFa, setfirstNameFa] = useState('')
  const [firstNameEn, setfirstNameEn] = useState('')
  const [mobile1, setmobile1] = useState('')
  const [tel, settel] = useState('')
  const [description, setdescription] = useState('')
  const [birthDate, setbirthDate] = useState(moment())
  ///
  ///model2
  const [isForeignerR, setisForeignerR] = useState('false')
  const [IsMaleR, setIsMaleR] = useState('true')
  const [firstNameFaR, setfirstNameFaR] = useState('')
  const [lastNameFaR, setlastNameFaR] = useState('')
  const [firstNameEnR, setfirstNameEnR] = useState('')
  const [lastNameEnR, setlastNameEnR] = useState('')
  const [fatherNameR, setfatherNameR] = useState('')
  const [nationalCodeR, setnationalCodeR] = useState('')
  const [mobileR, setmobileR] = useState('')
  const [emailR, setemailR] = useState('')
  const [telR, settelR] = useState('')
  const [internalTelR, setinternalTelR] = useState('')
  const [passportNumberR, setpassportNumberR] = useState('')
  const [idNumberR, setidNumberR] = useState('')
  const [birthDateR, setbirthDateR] = useState(moment())
  ///
  ///model3
  const [addressFaA, setaddressFaA] = useState('')
  const [addressEnA, setaddressEnA] = useState('')
  const [mobileA, setmobileA] = useState('')
  const [telA, settelA] = useState('')
  const [faxA, setfaxA] = useState('')
  const [postalCodeA, setpostalCodeA] = useState('')
  const [websiteA, setwebsiteA] = useState('')
  const [mapA, setmapA] = useState('')
  const [addressDescA, setaddressDescA] = useState('')
  const [streetA, setstreetA] = useState('')
  const [alleyA, setalleyA] = useState('')
  const [plaqueA, setplaqueA] = useState('')
  const [unitA, setunitA] = useState('')
  const [activityDescA, setactivityDescA] = useState('')
  const [addressTypeIdA, setaddressTypeIdA] = useState(0)
  const [activityTypeIdA, setactivityTypeIdA] = useState(0)
  const [activityFieldTypeIdA, setactivityFieldTypeIdA] = useState(0)
  const [fieldDescA, setfieldDescA] = useState('')
  const [cityIdA, setcityIdA] = useState(0)

  ///
  const [fileTypeList, setFileTypeList] = useState<any[]>([])
  const [fileTypeId, setfileTypeId] = useState(0)
  const [fileTypeTitle, setfileTypeTitle] = useState('')
  const [desc, setDesc] = useState('')
  const restart = React.useCallback(() => {
    const newTime = 180 * 1000
    start(newTime)
  }, [])
  // const formik = useFormik({
  //   initialValues,
  //   validationSchema: registrationSchema,
  //   onSubmit: (values, {setStatus, setSubmitting}) => {
  //     alert()
  //     restart()
  //     setLoading(false)
  //     setErsalShow(false)
  //     setAnnswerShow(true)
  //     setStep1Show(true)
  //   },
  // })
  useEffect(() => {
    localStorage.setItem('token', '')
    localStorage.setItem('refreshToken', '')
    debugger
    fetchcombo2()
    getPackage(1)
    if (localStorage.getItem('tempcpCode') === '') {
      fetchData()
      setFilesRealPerson(false)
    } else {
      setStrt(true)
      setStep0Show(false)
    }
    if (localStorage.getItem('state') === '"PersonalInfo"') {
      setghabl2(false)
      setNeedRealPerson(true)
    } else if (localStorage.getItem('state') === '"PackageSelection"') {
      setghabl3(false)
      setAddressRealPerson(true)
    } else if (localStorage.getItem('state') === '"ContactInfo"') {
      setghabl4(false)
      setRabetRealPerson(true)
    } else if (localStorage.getItem('state') === '"Connector"') {
      setghabl5(false)
      setFilesRealPerson(true)
    }

    return () => {}
  }, [])
  const fetchcombo2 = async () => {
    try {
      const url = `${API_URL}Agentreal/GetFileTypes`
      //let url = API_URL + 'registration/real/GetRealFileTypes'
      const fetchResponse = await fetch(`${url}`, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          //Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })
      debugger
      const resp = await fetchResponse.json()
      var newlist = resp.value.map(function (row: any) {
        return {id: row.fileTypeId, title: row.titleFa}
      })

      setFileTypeList(newlist)
    } catch (error) {
      console.log(error)
    }
  }
  const fetchData = async () => {
    const url = `${API_URL}Agentreal/GetCaptcha`
    const resp = await fetch(url)
    debugger
    const json = await resp.json()
    setcaptchasrc('data:image/png;base64,' + json.value.img)
    setcpCode(json.value.cpCode)

    //localStorage.setItem('img', '')
    //localStorage.setItem('cpCode', json.value.cpCode)
  }

  const [listPak, setlistPak] = useState([{title: '', value: ''}])
  const getPackage = (id: number) => {
    debugger
    const url = `${API_URL}Registration/GetInitialPackages?Type=${id}`
    try {
      axios({
        method: 'get',
        url: url,
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })
        .then(function (response) {
          var pp = response
          setlistPak(response.data.value.items)
          debugger
        })
        .catch(function (response) {})
    } catch (e: any) {
      if (!e.processed) {
        toast.error('ارور', {
          position: 'top-center',
        })
      }
    }
  }

  const checknation = () => {
    setLoading(true)
    try {
      const url = `${API_URL}Registration/RegisterInit`
      axios({
        method: 'post',
        url: url,
        data: {nationalCode, mobile, captcha, cpCode},
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      })
        .then(function (response) {
          debugger
          fetchData()
          // toast.info('استعلام باموفقیت انجام شد', {
          //   position: 'top-center',
          // })
          restart()
          setLoading(false)
          setErsalShow(false)
          setFaalSazi(true)
          setStep1Show(true)
          setStep0Show(false)
        })
        .catch(function (response) {
          fetchData()
        })
    } catch (e: any) {
      if (!e.processed) {
        toast.error('دیتا معتبر نیست', {
          position: 'top-center',
        })
        setLoading(false)
        fetchData()
        //setSubmitting(false)
        //setStatus(e)
      }
    }
  }

  const vmsNationalCode = (input: string) => {
    if (
      !/^\d{10}$/.test(input) ||
      input === '0000000000' ||
      input === '1111111111' ||
      input === '2222222222' ||
      input === '3333333333' ||
      input === '4444444444' ||
      input === '5555555555' ||
      input === '6666666666' ||
      input === '7777777777' ||
      input === '8888888888' ||
      input === '9999999999'
    )
      return false
    var check = parseInt(input[9])
    var sum = 0
    var i
    for (i = 0; i < 9; ++i) {
      sum += parseInt(input[i]) * (10 - i)
    }
    sum %= 11
    return (sum < 2 && check === sum) || (sum >= 2 && check + sum === 11)
  }

  const step1 = async () => {
    try {
      const url = `${API_URL}Registration/VerifyCode`
      let response = await axios.post(url, {
        code: mobilechk,
        mobile: mobile,
      })

      const json = response.data
      debugger
      if (json.value.firstName !== '') {
        setFullnamest(json.value.firstName + ' ' + json.value.lastName)
        setBrthdst(json.value.birthDate)
        setFatherst(json.value.fatherName)
        setnationalCodest(json.value.nationalCode)
        settinfoKey(json.value.infoKey)
        setSendShow(true)
      } else {
        next()
      }
      setStep0Show(false)
      setStep1Show(false)
      setFaalSazi(false)
    } catch (e: any) {
      if (!e.processed) {
        toast.error(e, {
          position: 'top-center',
        })
      }
    }
  }

  const next = async () => {
    //??
    var ty = IsLegal ? 2 : 1
    const resp = await fetch(API_URL + 'Agreements/GetByTypes?AgreementType=1&MembershipType=' + ty)
    const json = await resp.json()
    settaahodtext(json.value)
    setRegDiv(false)
    setTaahodTab(true)
    setStrt(true)
    setbtnErrors(1)
    setSendShow(false)
    setAcceptShow(true)
    setNextShow1(true)
    setFaalSazi(true)
  }
  const nxet1 = () => {
    setTaahodTab(false)
    setPropRealPerson(true)
  }
  const perv1 = () => {
    setRegDiv(false)
    setTaahodTab(true)
    setPropRealPerson(false)
  }
  const next2 = () => {
    let url = API_URL + 'Registration/real'
    try {
      debugger
      axios({
        method: 'post',
        url: url,
        data: {
          shahkarInfoKey: infoKey,
          nameFa: firstNameFa + ' ' + lastNameFa,
          nameEn: firstNameFa + ' ' + lastNameEn,
          nationalCode: nationalCode,
          mobile: mobile1,
          email: email,
          tel: tel,
          paymentCode: infoKey,
          isForeigner: false,
          membershipDate: null,
          description: description,
          agentId: null,
          gender: ismale ? 1 : 0,
          firstNameFa: firstNameFa,
          lastNameFa: lastNameFa,
          firstNameEn: firstNameEn,
          lastNameEn: lastNameEn,
          fatherName: fatherName,
          birthDate: birthDate,
          passportNumber: passportNumber,
          idNumber: idNumber,
        },
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      })
        .then(function (response) {
          localStorage.setItem('token', response.data.value.accessToken.token)
          localStorage.setItem('refreshToken', response.data.value.refreshToken.token)
          setNeedRealPerson(true)
          setPropRealPerson(false)
        })
        .catch(function (response) {})
    } catch (e: any) {
      if (!e.processed) {
        toast.error('دیتا معتبر نیست', {
          position: 'top-center',
        })
      }
    }
  }
  const prev2 = () => {
    setNeedRealPerson(false)
    setPropRealPerson(true)
  }
  const next3 = () => {
    setRabetRealPerson(true)
    setAddressRealPerson(false)
    // try {
    //   debugger
    //   let url = API_URL + 'Registration/AddAddress'
    //   axios({
    //     method: 'post',
    //     url: url,
    //     data: {
    //       addressFa: addressFaA,
    //       addressEn: addressEnA,
    //       mobile: mobileA,
    //       tel: telA,
    //       fax: faxA,
    //       postalCode: postalCodeA,
    //       website: websiteA,
    //       long: longitude,
    //       lat: latitude,
    //       addressDesc: addressDescA,
    //       street: streetA,
    //       alley: alleyA,
    //       plaque: plaqueA,
    //       unit: unitA,
    //       isDefault: true,
    //       cityId: cityIdA,
    //       addressTypeId: addressTypeIdA,
    //       activityTypeId: activityTypeIdA,
    //       activityFieldTypeId: activityFieldTypeIdA,
    //       activityDesc: activityDescA,
    //       fieldDesc: fieldDescA,
    //     },
    //     headers: {
    //       Accept: 'application/json',
    //       'Content-Type': 'application/json',
    //       Authorization: `Bearer ${localStorage.getItem('token')}`,
    //     },
    //   })
    //     .then(function (response) {
    //       setRabetRealPerson(true)
    //       setAddressRealPerson(false)
    //     })
    //     .catch(function (response) {})
    // } catch (e: any) {
    //   if (!e.processed) {
    //     toast.error('دیتا معتبر نیست', {
    //       position: 'top-center',
    //     })
    //   }
    // }
  }
  const perv3 = () => {
    setRabetRealPerson(false)
    setAddressRealPerson(true)
  }
  const next4 = () => {
    let url = API_URL + 'Registration/CreatePerson'
    try {
      axios({
        method: 'post',
        url: url,
        data: {
          personId: null,
          firstNameFa: firstNameFaR,
          lastNameFa: lastNameFaR,
          firstNameEn: firstNameEnR,
          lastNameEn: lastNameEnR,
          nationalCode: nationalCodeR,
          fatherName: fatherNameR,
          birthDate: birthDateR,
          mobile: mobileR,
          email: emailR,
          tel: telR,
          internalTel: internalTelR,
          gender: 0,
          type: 3,
          position: '',
          inactiveDate: birthDateR,
          inactiveDesc: '',
          isForeigner: true,
          agentId: null,
          memberId: localStorage.getItem('memberId'),
          orgId: null,
          passportNumber: passportNumberR,
          idNumber: idNumberR,
        },
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })
        .then(function (response) {
          setRabetRealPerson(false)
          setFilesRealPerson(true)
        })
        .catch(function (response) {})
    } catch (e: any) {
      if (!e.processed) {
        toast.error('ارور', {
          position: 'top-center',
        })
      }
    }
  }
  const perv4 = () => {
    setRabetRealPerson(true)
    setFilesRealPerson(false)
  }
  const next5 = () => {
    let url = API_URL + 'Registration/AddFiles'
    try {
      let formData = new FormData()
      for (var i = 0; i < dataList.length; i++) {
        formData.append('Documents[' + i + '].FileTypeId', dataList[i].fileTypeId.toString())
        formData.append('Documents[' + i + '].File', dataList[i].file)
        formData.append('Documents[' + i + '].FileDescription', dataList[i].fileDescription)
      }
      axios({
        method: 'post',
        url: url,
        data: formData,
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })
        .then(function (response) {
          toast.success('ثبت نام با موفقیت انجام شد', {
            position: 'top-center',
          })

          history.push('/auth/login')
        })
        .catch(function (response) {})
    } catch (e: any) {
      if (!e.processed) {
        toast.error('ارور', {
          position: 'top-center',
        })
      }
    }
  }
  const next6 = () => {
    setNeedRealPerson(false)
  }
  const perv5 = () => {
    setNeedRealPerson(false)
    setFilesRealPerson(true)
  }
  const handleAgencyClose = () => {
    setAgencyshowDialog(false)
  }
  const handlePakClose = () => {
    setPakeshowDialog(false)
  }
  const handlepreFactorClose = () => {
    setpreFactorshowDialog(false)
  }
  const openPakeshowDialog = () => {
    setPakeshowDialog(true)
  }
  const showpreFactor = () => {}
  const openAgencyDialog = () => {
    setAgencyshowDialog(true)
  }
  const next7 = () => {
    setAddressRealPerson(true)
    setNeedRealPerson(false)
  }
  const prev21 = () => {
    setAddressRealPerson(false)
    setNeedRealPerson(true)
  }
  const [errors, setErrors] = useState(0)
  const [errorsbtn, setbtnErrors] = useState(1)
  const [mobilechk, setMobilechk] = useState('')
  const validatereq = (event: any) => {
    if (event.target.value.length === 0) {
      setbtnErrors(1)
      setErrors(1)
    } else {
      setbtnErrors(0)
      setErrors(0)
      setMobilechk(event.target.value)
    }
  }
  const validatemob = (event: any) => {
    if (event.target.value.substring(0, 2) !== '09') {
      setbtnErrors(1)
      setErrors(1)
    } else {
      setbtnErrors(0)
      setErrors(0)
      setMobile(event.target.value)
      // setMobilechk(event.target.value)
    }
  }
  const validateEmail = (event: any) => {
    if (
      !new RegExp(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      ).test(event.target.value) ||
      event.target.value === ''
    ) {
      setbtnErrors(1)
      setErrors(1)
    } else {
      setbtnErrors(0)
      setErrors(0)
      // setMobilechk(event.target.value)
    }
  }
  const handleDate = (e: any) => {
    setbirthDate(e)
  }
  const handleDateR = (e: any) => {
    setbirthDateR(e)
  }
  const selectitem = (event: React.ChangeEvent<HTMLInputElement>, id: number) => {
    if (event.target.files) {
      const newItem = [...fileList]
      newItem[fileList.length] = {
        fileTypeId: fileTypeId,
        file: event.target.files[0],
        fileTypeTitle: fileTypeTitle,
      }
      setfileList(newItem)

      const {files} = event.target
      const output = document.getElementById('fileName-0')
      if (output) output.innerHTML = event.target.files[0].name
    }
  }
  const handleResetClick = () => {
    const output = document.getElementById('fileName-0')
    if (output) output.innerHTML = 'فابل'
  }
  const [fileList, setfileList] = React.useState<Array<any>>([])
  const [dataList, setdataList] = React.useState<Array<any>>([])
  const FileAddlist = () => {
    if (fileList.length === 0 || desc === '' || fileTypeId === 0) {
      toast.info('اطلاعات را کامل کنید', {
        position: 'top-center',
      })
    } else {
      const newItem = [...dataList]
      newItem[dataList.length] = {
        fileTypeId: fileTypeId,
        file: fileList[dataList.length].file,
        fileTypeTitle: fileTypeTitle,
        fileDescription: desc,
      }
      setdataList(newItem)
      setDesc('')
      setfileTypeId(0)
      const output = document.getElementById('fileName-0')
      if (output) output.innerHTML = 'فابل'
    }
  }
  const filetypecbtn = (e: any) => {
    setfileTypeId(e.id)
    setfileTypeTitle(e.title)
  }
  const handleDeleteFileItem = (id: any) => {}
  const handleChanaddressType = (event: any) => {
    setaddressTypeIdA(event)
  }
  const handleChanactivityType = (event: any) => {
    setactivityTypeIdA(event)
  }
  const handleChanactivityFieldType = (event: any) => {
    setactivityFieldTypeIdA(event)
  }
  const handleChancity = (event: any) => {
    setcityIdA(event)
  }
  const [mapShow, setmapShow] = useState(false)
  const gomap = () => {
    setmapShow(true)
  }
  const onClosemap = () => {
    setmapShow(false)
  }
  const [longitude, setLongitude] = useState('')
  const [latitude, setLatitude] = useState('')
  function CallBack(ss: any) {
    setmapA(ss)
    setLongitude(ss.split('-')[0])
    setLatitude(ss.split('-')[0])
  }
  const [preinvioceID, setpreinvioceID] = useState(0)
  const savePackage = () => {
    try {
      debugger
      let url = API_URL + 'Registration/CreatePreInvoice'
      axios({
        method: 'post',
        url: url,
        data: {
          agentId: null,
          isInitialPackage: true,
          packages: [
            {
              packageId: selectpackage,
              count: 1,
            },
          ],
        },
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })
        .then(function (response) {
          setpreinvioceID(response.data.value)
          toast.success('عملیات با موفقیت انجام شد', {
            position: 'top-center',
          })
        })
        .catch(function (response) {})
    } catch (e: any) {
      if (!e.processed) {
        toast.error('دیتا معتبر نیست', {
          position: 'top-center',
        })
      }
    }
  }
  const [SearchP, setsetSearchP] = useState('')
  const [selectpackage, setselectpackage] = useState(0)
  const showinvioce = () => {
    setpreFactorshowDialog(true)
  }
  const chgSearchP1 = (e: any) => {
    getPackage(e)
  }
  const chgSearchP2 = (e: any) => {
    getPackage(e)
  }
  const chgSearchP3 = (e: any) => {
    getPackage(e)
  }
  const btnselectpackage = (e: any) => {
    setselectpackage(e)
    toast.success('خرید با موفقیت انجام شد', {
      position: 'top-center',
    })
  }

  return (
    // <form
    //   className='form w-100 fv-plugins-bootstrap5 fv-plugins-framework'
    //   noValidate
    //   id='kt_login_signup_form'
    //   onSubmit={formik.handleSubmit}
    // >
    <div
      className=' bg-white rounded shadow-sm p-10 p-lg-15  form w-100'
      style={{width: '1000', direction: 'rtl'}}
    >
      {mapShow && <OpanMapDialog handleCallBack={CallBack} onClose={onClosemap} />}
      {regDiv && (
        <div>
          <div className='mb-10 text-center'>
            <h1 className='text-dark mb-3'>ثبت نام اعضا </h1>
          </div>

          {step0Show && (
            <div className='text-center'>
              <div className='text-dark fw-bold fs-4 mb-10 fv-row'>نوع ثبت نام را انتخاب کنید</div>
              <div className='text-dark fw-bold fs-4 mb-10 fv-row'>
                <label className='form-label' style={{marginLeft: 15}}>
                  ایرانی
                  <input
                    className='form-check-input'
                    type='radio'
                    name='Foreign'
                    value={'false'}
                    checked={IsForeign === 'false'}
                    onChange={(e) => setIsForeign(e.target.value)}
                  />
                </label>

                <label className='form-label' style={{marginLeft: 15}}>
                  اتباع خارجی
                  <input
                    className='form-check-input'
                    type='radio'
                    name='Foreign'
                    value={'true'}
                    checked={IsForeign === 'true'}
                    onChange={(e) => setIsForeign(e.target.value)}
                  />
                </label>
              </div>
              <div className='text-dark fw-bold fs-4 mb-10 fv-row'>
                <label className='form-label' style={{marginLeft: 15}}>
                  حقیقی
                  <input
                    className='form-check-input'
                    type='radio'
                    name='Legal'
                    value={'false'}
                    checked={IsLegal === 'false'}
                    onChange={(e) => setIsLegal(e.target.value)}
                  />
                </label>

                <label className='form-label' style={{marginLeft: 15}}>
                  حقوقی
                  <input
                    className='form-check-input'
                    type='radio'
                    name='Legal'
                    value={'true'}
                    checked={IsLegal === 'true'}
                    onChange={(e) => setIsLegal(e.target.value)}
                  />
                </label>
              </div>

              <div className='mb-10 fv-row' data-kt-password-meter='true'>
                <div className={'row 12'} style={{marginBottom: '5px'}}>
                  <label className='col-form-label col-sm-5'>کد ملی/شناسه ملی</label>

                  <div className='col-sm-7'>
                    <input
                      onChange={(e) => setNationalCode(e.target.value)}
                      autoFocus
                      placeholder='کد ملی'
                      className={clsx(
                        'form-control form-control-lg form-control-solid ',
                        {
                          'is-invalid': !vmsNationalCode(nationalCode),
                        },
                        {
                          'is-valid': !vmsNationalCode(nationalCode),
                        }
                      )}
                    />
                    {!vmsNationalCode(nationalCode) && (
                      <div className='fv-plugins-message-container'>
                        <div className='fv-help-block'>
                          <span role='alert'>کد ملی نامعتبر است</span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                <div className={'row 12'}>
                  <label className='col-form-label col-sm-5'>تلفن همراه</label>

                  <div className='col-sm-7'>
                    <input
                      onChange={validatemob}
                      placeholder='تلفن همراه'
                      autoComplete='off'
                      className={clsx(
                        'form-control form-control-lg form-control-solid ',
                        {
                          'is-invalid': errorsbtn === 1,
                        },
                        {
                          'is-valid': errorsbtn === 0,
                        }
                      )}
                    />
                    {errors === 1 && <span role='alert'>فرمت تلفن همراه صحیح نیست</span>}
                  </div>
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

                <button
                  onClick={checknation}
                  id='kt_sign_up_submit'
                  className='btn btn-lg btn-primary w-100 mb-5'
                  disabled={!vmsNationalCode(nationalCode)}
                >
                  {!loading && <span className='indicator-label'>بررسی و استعلام </span>}
                  {loading && (
                    <span className='indicator-progress' style={{display: 'block'}}>
                      لطفا منتظر بمانید...{' '}
                      <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
                    </span>
                  )}
                </button>
              </div>
            </div>
          )}

          {faalSazi && (
            <div className='mb-10 fv-row' data-kt-password-meter='true'>
              <div className={'row 12'}>
                <label className='col-form-label col-sm-4'>کد فعال سازی</label>

                <div className='col-sm-8'>
                  <input
                    placeholder='کد فعال سازی'
                    onChange={validatereq}
                    className={clsx(
                      'form-control form-control-lg form-control-solid ',
                      {
                        'is-invalid': errorsbtn === 1,
                      },
                      {
                        'is-valid': errorsbtn === 0,
                      }
                    )}
                  />
                  {errors === 1 && <span role='alert'>کد فعالسازی اجباری است</span>}
                </div>
              </div>
              <Counter data={timeLeft}></Counter>
              <button
                type='submit'
                id='kt_sign_up_submit'
                className='btn btn-lg btn-primary w-100 mb-5'
                onClick={step1}
              >
                {<span className='indicator-label'>مرحله بعد </span>}
              </button>
            </div>
          )}

          {sendShow && (
            <div>
              {' '}
              <div className={'row 12'}>
                <label className='col-form-label col-sm-4'> نام: </label>
                <label className='col-form-label col-sm-4'> {infoKey} </label>
              </div>
              <div className={'row 12'}>
                <label className='col-form-label col-sm-4'> نام: </label>
                <label className='col-form-label col-sm-4'> {fullnamest} </label>
              </div>
              <div className={'row 12'}>
                <label className='col-form-label col-sm-4'> تولد: </label>
                <label className='col-form-label col-sm-4'> {brthdst} </label>
              </div>
              <div className={'row 12'}>
                <label className='col-form-label col-sm-4'> نام پدر: </label>
                <label className='col-form-label col-sm-4'> {fatherst} </label>
              </div>
              <div className={'row 12'}>
                <label className='col-form-label col-sm-4'> کد ملی: </label>
                <label className='col-form-label col-sm-4'> {nationalCodest} </label>
              </div>
              <button
                type='submit'
                id='kt_sign_up_submit'
                className='btn btn-lg btn-primary w-100 mb-5'
                onClick={next}
                disabled={errorsbtn === 1}
              >
                {<span className='indicator-label'>مرحله بعد </span>}
              </button>
            </div>
          )}
        </div>
      )}
      {strt && (
        <div>
          <div className='mb-10 text-center'>
            <h2 className='text-dark mb-3'>درخواست عضویت حقیقی </h2>
          </div>
          <div>
            {' '}
            <div className={'row 12'} style={{direction: 'rtl'}}>
              <div className='col-sm-2'>
                <div
                  className='mb-10 text-center'
                  style={{
                    backgroundImage: taahodTab
                      ? 'linear-gradient(90deg, #7b81ec, #3bd1d3)'
                      : 'linear-gradient(90deg, #656363, #cdd2d2)',
                    color: 'white',
                    width: '200px',
                    height: '60px',
                    borderRadius: '20px',
                    paddingTop: '10%',
                    animation: 'changeColor 5s infinite',
                  }}
                >
                  <h3 className='text-light mb-3'> تعهد نامه</h3>
                </div>
              </div>
              <div className='col-sm-2'>
                <div
                  className='mb-10 text-center'
                  style={{
                    backgroundImage: propRealPerson
                      ? 'linear-gradient(90deg, #7b81ec, #3bd1d3)'
                      : 'linear-gradient(90deg, #656363, #cdd2d2)',
                    color: 'white',
                    width: '200px',
                    height: '60px',
                    borderRadius: '20px',
                    paddingTop: '10%',
                  }}
                >
                  <h3 className='text-light mb-3'>مشخصات فرد حقیقی</h3>
                </div>
              </div>
              <div className='col-sm-2'>
                <div
                  className='mb-10 text-center'
                  style={{
                    backgroundImage: needRealPerson
                      ? 'linear-gradient(90deg, #7b81ec, #3bd1d3)'
                      : 'linear-gradient(90deg, #656363, #cdd2d2)',
                    color: 'white',
                    width: '200px',
                    height: '60px',
                    borderRadius: '20px',
                    paddingTop: '10%',
                  }}
                >
                  <h3 className='text-light mb-3'>نیازمندی ها</h3>
                </div>
              </div>
              <div className='col-sm-2'>
                <div
                  className='mb-10 text-center'
                  style={{
                    backgroundImage: addressRealPerson
                      ? 'linear-gradient(90deg, #7b81ec, #3bd1d3)'
                      : 'linear-gradient(90deg, #656363, #cdd2d2)',
                    color: 'white',
                    width: '200px',
                    height: '60px',
                    borderRadius: '20px',
                    paddingTop: '10%',
                  }}
                >
                  <h3 className='text-light mb-3'>آدرس</h3>
                </div>
              </div>
              <div className='col-sm-2'>
                <div
                  className='mb-10 text-center'
                  style={{
                    backgroundImage: rabetRealPerson
                      ? 'linear-gradient(90deg, #7b81ec, #3bd1d3)'
                      : 'linear-gradient(90deg, #656363, #cdd2d2)',
                    color: 'white',
                    width: '200px',
                    height: '60px',
                    borderRadius: '20px',
                    paddingTop: '10%',
                  }}
                >
                  <h3 className='text-light mb-3'>اطلاعات رابط پیگیری</h3>
                </div>
              </div>
              <div className='col-sm-2'>
                <div
                  className='mb-10 text-center'
                  style={{
                    backgroundImage: filesRealPerson
                      ? 'linear-gradient(90deg, #7b81ec, #3bd1d3)'
                      : 'linear-gradient(90deg, #656363, #cdd2d2)',
                    color: 'white',
                    width: '200px',
                    height: '60px',
                    borderRadius: '20px',
                    paddingTop: '10%',
                  }}
                >
                  <h3 className='text-light mb-3'>فایل ها</h3>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {taahodTab && (
        <div>
          <div>
            {/* <label>
                <input type='checkbox' />
                My Value
              </label> */}
            <div className={'row 12'} style={{direction: 'rtl', padding: '50'}}>
              <label>{taahodtext}</label>
              <label className='form-check-label' style={{fontSize: '20px', paddingTop: '50px'}}>
                تمام موارد را مطالعه کرده و قبول دارم
                <input
                  className='form-check-input'
                  type='checkbox'
                  value='true'
                  data-kt-check='true'
                  data-kt-check-target='.widget-9-check'
                  onChange={(e) => setAcceptsrt(e.target.checked)}
                />
              </label>
            </div>

            <div className={'row 12'}>
              <div className='col-sm-6'></div>
              <div className='col-sm-6'>
                <button
                  type='submit'
                  id='kt_sign_up_submit'
                  className='btn btn-lg btn-primary w-100 mb-5'
                  onClick={nxet1}
                  disabled={acceptsrt === false}
                >
                  {<span className='indicator-label'>مرحله بعد </span>}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      {propRealPerson && (
        <div>
          <div>
            <div className={'row 12'}>
              <div className='col-sm-6'>
                <label className='form-label' style={{marginLeft: 15, float: 'left'}}>
                  مرد{' '}
                  <input
                    className='form-check-input'
                    type='radio'
                    name='Ind'
                    value={'true'}
                    checked={ismale === 'true'}
                    onChange={(e) => setIsmale(e.target.value)}
                  />
                </label>

                <label className='form-label' style={{marginLeft: 15, float: 'left'}}>
                  زن{' '}
                  <input
                    className='form-check-input'
                    type='radio'
                    name='Ind'
                    value={'false'}
                    checked={ismale === 'false'}
                    onChange={(e) => setIsmale(e.target.value)}
                  />
                </label>
              </div>
              <div className='col-sm-3'>
                <label className='col-form-label' style={{float: 'left'}}>
                  {' '}
                  شماره ملی{' '}
                </label>
              </div>
              <div className='col-sm-3' style={{marginBottom: '5px'}}>
                <input
                  value={nationalCode}
                  onChange={(e) => setnationalCode1(nationalCode)}
                  className={
                    nationalCode === ''
                      ? 'col-form-label form-control form-control-lg form-control-solid  is-invalid'
                      : 'col-form-label form-control form-control-lg form-control-solid  is-valid'
                  }
                />
              </div>
            </div>
            <div className={'row 12'}>
              <div className='col-sm-3'>
                <label className='col-form-label' style={{float: 'left'}}>
                  {' '}
                  شماره گذرنامه{' '}
                </label>
              </div>
              <div className='col-sm-3'>
                <input
                  style={{marginBottom: '5px'}}
                  value={passportNumber}
                  onChange={(e) => setpassportNumber(e.target.value)}
                  className={'col-form-label form-control form-control-lg form-control-solid '}
                />
              </div>
              <div className='col-sm-3'>
                <label className='col-form-label' style={{float: 'left'}}>
                  {' '}
                  تاریخ تولد{' '}
                </label>
              </div>
              <div className='col-sm-3'>
                <DatePicker
                  className=' form-control'
                  isGregorian={false}
                  value={birthDate}
                  onChange={handleDate}
                  timePicker={false}
                />
              </div>
            </div>
            <div className={'row 12'}>
              <div className='col-sm-3'>
                <label className='col-form-label' style={{float: 'left'}}>
                  {' '}
                  نام{' '}
                </label>
              </div>
              <div className='col-sm-3'>
                <input
                  style={{marginBottom: '5px'}}
                  value={firstNameFa}
                  onChange={(e) => setfirstNameFa(e.target.value)}
                  className={
                    firstNameFa === ''
                      ? 'col-form-label form-control form-control-lg form-control-solid  is-invalid'
                      : 'col-form-label form-control form-control-lg form-control-solid  is-valid'
                  }
                />
              </div>
              <div className='col-sm-3'>
                <label className='col-form-label' style={{float: 'left'}}>
                  {' '}
                  نام انگلیسی{' '}
                </label>
              </div>
              <div className='col-sm-3'>
                <input
                  style={{marginBottom: '5px'}}
                  value={firstNameEn}
                  onChange={(e) => setfirstNameEn(e.target.value)}
                  className={
                    firstNameEn === ''
                      ? 'col-form-label form-control form-control-lg form-control-solid  is-invalid'
                      : 'col-form-label form-control form-control-lg form-control-solid  is-valid'
                  }
                />
              </div>
            </div>
            <div className={'row 12'}>
              <div className='col-sm-3'>
                <label className='col-form-label' style={{float: 'left'}}>
                  {' '}
                  نام خانوادگی{' '}
                </label>
              </div>
              <div className='col-sm-3'>
                <input
                  style={{marginBottom: '5px'}}
                  value={lastNameFa}
                  onChange={(e) => setlastNameFa(e.target.value)}
                  className={
                    lastNameFa === ''
                      ? 'col-form-label form-control form-control-lg form-control-solid  is-invalid'
                      : 'col-form-label form-control form-control-lg form-control-solid  is-valid'
                  }
                />
              </div>
              <div className='col-sm-3'>
                <label className='col-form-label' style={{float: 'left'}}>
                  {' '}
                  نام خانوادگی انگلیسی{' '}
                </label>
              </div>
              <div className='col-sm-3'>
                <input
                  style={{marginBottom: '5px'}}
                  value={lastNameEn}
                  onChange={(e) => setlastNameEn(e.target.value)}
                  className={
                    lastNameEn === ''
                      ? 'col-form-label form-control form-control-lg form-control-solid  is-invalid'
                      : 'col-form-label form-control form-control-lg form-control-solid  is-valid'
                  }
                />
              </div>
            </div>
            <div className={'row 12'}>
              <div className='col-sm-3'>
                <label className='col-form-label' style={{float: 'left'}}>
                  {' '}
                  شماره شناسنامه{' '}
                </label>
              </div>
              <div className='col-sm-3'>
                <input
                  style={{marginBottom: '5px'}}
                  value={idNumber}
                  onChange={(e) => setidNumber(e.target.value)}
                  className={
                    idNumber === ''
                      ? 'col-form-label form-control form-control-lg form-control-solid  is-invalid'
                      : 'col-form-label form-control form-control-lg form-control-solid  is-valid'
                  }
                />
              </div>

              <div className='col-sm-3'>
                <label className='col-form-label' style={{float: 'left'}}>
                  {' '}
                  نام پدر{' '}
                </label>
              </div>
              <div className='col-sm-3'>
                <input
                  style={{marginBottom: '5px'}}
                  value={fatherName}
                  onChange={(e) => setfatherName(e.target.value)}
                  className={
                    fatherName === ''
                      ? 'col-form-label form-control form-control-lg form-control-solid  is-invalid'
                      : 'col-form-label form-control form-control-lg form-control-solid  is-valid'
                  }
                />
              </div>
            </div>
            <div className={'row 12'}>
              <div className='col-sm-3'>
                <label className='col-form-label' style={{float: 'left'}}>
                  {' '}
                  ایمیل{' '}
                </label>
              </div>
              <div className='col-sm-3'>
                <input
                  style={{marginBottom: '5px'}}
                  value={email}
                  onChange={(e) => setemail(e.target.value)}
                  className={
                    email === ''
                      ? 'col-form-label form-control form-control-lg form-control-solid  is-invalid'
                      : 'col-form-label form-control form-control-lg form-control-solid  is-valid'
                  }
                />
              </div>

              <div className='col-sm-3'>
                <label className='col-form-label ' style={{float: 'left'}}>
                  {' '}
                  موبایل{' '}
                </label>
              </div>
              <div className='col-sm-3'>
                <input
                  style={{marginBottom: '5px'}}
                  value={mobile}
                  onChange={(e) => setmobile1(mobile)}
                  className={
                    mobile === ''
                      ? 'col-form-label form-control form-control-lg form-control-solid  is-invalid'
                      : 'col-form-label form-control form-control-lg form-control-solid  is-valid'
                  }
                />
              </div>
            </div>
            <div className={'row 12'}>
              <div className='col-sm-3'>
                <label className='col-form-label' style={{float: 'left'}}>
                  {' '}
                  تلفن{' '}
                </label>
              </div>
              <div className='col-sm-3'>
                <input
                  style={{marginBottom: '5px'}}
                  value={tel}
                  onChange={(e) => settel(e.target.value)}
                  className={
                    tel === ''
                      ? 'col-form-label form-control form-control-lg form-control-solid  is-invalid'
                      : 'col-form-label form-control form-control-lg form-control-solid  is-valid'
                  }
                />
              </div>

              <div className='col-sm-3'>
                <label className='col-form-label' style={{float: 'left'}}>
                  {' '}
                  توضیحات{' '}
                </label>
              </div>
              <div className='col-sm-3'>
                <input
                  style={{marginBottom: '5px'}}
                  value={description}
                  onChange={(e) => setdescription(e.target.value)}
                  className={'col-form-label form-control form-control-lg form-control-solid '}
                />
              </div>
            </div>

            <div className={'row 12'}>
              <div className='col-sm-6'>
                <button
                  type='submit'
                  id='ghabl1'
                  className='btn btn-lg btn-primary w-100 mb-5'
                  onClick={perv1}
                >
                  {<span className='indicator-label'>مرحله قبل </span>}
                </button>
              </div>
              <div className='col-sm-6'>
                <button
                  disabled={
                    nationalCode1 === '' ||
                    email === '' ||
                    fatherName === '' ||
                    idNumber === '' ||
                    lastNameFa === '' ||
                    lastNameEn === '' ||
                    firstNameFa === '' ||
                    firstNameEn === '' ||
                    mobile1 === '' ||
                    tel === ''
                  }
                  type='submit'
                  id='kt_sign_up_submit'
                  className='btn btn-lg btn-primary w-100 mb-5'
                  onClick={next2}
                >
                  {<span className='indicator-label'>مرحله بعد </span>}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      {needRealPerson && (
        <div>
          <div className='text-dark fw-bold fs-4 mb-10 fv-row'>
            <label className='form-label' style={{marginLeft: 15}}>
              GS1
              <input
                className='form-check-input'
                type='radio'
                name='searchPackage'
                value={'1'}
                checked={SearchP === '1'}
                onChange={(e) => chgSearchP1(e.target.value)}
              />
            </label>

            <label className='form-label' style={{marginLeft: 15}}>
              ایران کد
              <input
                className='form-check-input'
                type='radio'
                name='searchPackage'
                value={'2'}
                checked={SearchP === '2'}
                onChange={(e) => chgSearchP2(e.target.value)}
              />
            </label>
            <label className='form-label' style={{marginLeft: 15}}>
              خدمت
              <input
                className='form-check-input'
                type='radio'
                name='searchPackage'
                value={'3'}
                checked={SearchP === '3'}
                onChange={(e) => chgSearchP3(e.target.value)}
              />
            </label>
          </div>
          {listPak.map((x: any) => (
            <div
              style={{
                borderColor: '#b7b7b7',
                borderStyle: 'dashed',
                borderWidth: '1px',
                padding: '5px',
                margin: '10px',
                display: 'inline-flex',
                width: '25%',
                height: '100px',
              }}
            >
              <div className='col-sm-6'>
                <label className='col-form-label'>{x.title}</label>
              </div>

              <div className='col-sm-6'>
                <button
                  className='btn btn-lg btn-success w-100 mb-5'
                  onClick={() => btnselectpackage(x.id)}
                >
                  {<span className='indicator-label'>خرید </span>}
                </button>
              </div>
            </div>
          ))}

          {/* <div
            style={{
              borderColor: '#b7b7b7',
              borderStyle: 'dashed',
              borderWidth: '1px',
              padding: '10px',
              margin: '10px',
            }}
          >
            <div className='mb-10 text-center'>
              <h3 className='text-dark mb-3'>GTIN کد</h3>
            </div>
            <div className={'row 12'}>
              <div className='col-sm-6'>
                <label>
                  <input type='checkbox' />
                  کد GLNبین الملل
                </label>
              </div>
              <div className='col-sm-3'>
                <label className='col-form-label'> تعداد بسته </label>
              </div>
              <div className='col-sm-3'>
                <input
                  style={{marginBottom: '5px'}}
                  className={clsx('form-control form-control-lg form-control-solid ')}
                />
              </div>
            </div>
            <div className={'row 12'}>
              <div className='col-sm-3'>
                <label className='col-form-label'> تعداد کد GTN </label>
              </div>
              <div className='col-sm-3'>
                <input
                  style={{marginBottom: '5px'}}
                  className={clsx('form-control form-control-lg form-control-solid ')}
                />
              </div>
              <div className='col-sm-4'>
                <label className='col-form-label '> نوع بسته </label>
              </div>
              <div className='col-sm-2'>
                <button className='btn btn-lg btn-primary w-100 mb-5' onClick={openPakeshowDialog}>
                  {<span className='indicator-label'>... </span>}
                </button>
              </div>
            </div>
          </div> */}

          {/* <div
            style={{
              borderColor: '#b7b7b7',
              borderStyle: 'dashed',
              borderWidth: '1px',
              padding: '10px',
              margin: '10px',
            }}
          >
            <div className='mb-10 text-center'>
              <h3 className='text-dark mb-3'>نمایندگی </h3>
            </div>
            <div className={'row 12'}>
           
              <div className='col-sm-2'>
                <button
                  type='submit'
                  id='kt_sign_up_submit'
                  className='btn btn-lg btn-primary w-100 mb-5'
                  onClick={openAgencyDialog}
                >
                  {<span className='indicator-label'>... </span>}
                </button>
              </div>
              <div className='col-sm-4'>
                <label className='col-form-label col-sm-4'>نمایندگی </label>
              </div>
            </div>
          </div> */}
          <div className={'row 12'}>
            <div className='col-sm-6'>
              <button
                type='submit'
                id='ghabl2'
                className='btn btn-lg btn-success w-100 mb-5'
                onClick={showinvioce}
              >
                {<span className='indicator-label'>نمایش پیش فاکتور </span>}
              </button>
            </div>
            <div className='col-sm-6'>
              <button
                type='submit'
                id='ghabl2'
                className='btn btn-lg btn-success w-100 mb-5'
                onClick={savePackage}
              >
                {<span className='indicator-label'>ثبت </span>}
              </button>
            </div>
          </div>
          <div className={'row 12'}>
            <div className='col-sm-6'>
              {ghabl2 && (
                <button
                  type='submit'
                  id='ghabl2'
                  className='btn btn-lg btn-primary w-100 mb-5'
                  onClick={prev2}
                >
                  {<span className='indicator-label'>مرحله قبل </span>}
                </button>
              )}
            </div>
            <div className='col-sm-6'>
              <button
                type='submit'
                id='kt_sign_up_submit'
                className='btn btn-lg btn-primary w-100 mb-5'
                onClick={next7}
              >
                {<span className='indicator-label'>مرحله بعد </span>}
              </button>
            </div>
          </div>
          {preFactorshowDialog && (
            <PreFactorDialog
              mode={'new'}
              preinvioceID={preinvioceID}
              onClose={handlepreFactorClose}
            />
          )}
          {pakeshowDialog && <PakDialog mode={'new'} onClose={handlePakClose} />}
          {agencyshowDialog && <AgencyDialog mode={'new'} onClose={handleAgencyClose} />}
        </div>
      )}
      {addressRealPerson && (
        <div>
          <div>
            <div className={'row 12'}>
              <div className='col-sm-3'>
                <label className='col-form-label' style={{float: 'left'}}>
                  {' '}
                  تلفن{' '}
                </label>
              </div>
              <div className='col-sm-3'>
                <input
                  style={{marginBottom: '5px'}}
                  value={telA}
                  onChange={(e) => settelA(e.target.value)}
                  className={
                    telA === ''
                      ? 'col-form-label form-control form-control-lg form-control-solid  is-invalid'
                      : 'col-form-label form-control form-control-lg form-control-solid  is-valid'
                  }
                />
              </div>

              <div className='col-sm-3'>
                <label className='col-form-label' style={{float: 'left'}}>
                  {' '}
                  کد پستی{' '}
                </label>
              </div>
              <div className='col-sm-3'>
                <input
                  style={{marginBottom: '5px'}}
                  value={postalCodeA}
                  onChange={(e) => setpostalCodeA(e.target.value)}
                  className={
                    postalCodeA === ''
                      ? 'col-form-label form-control form-control-lg form-control-solid  is-invalid'
                      : 'col-form-label form-control form-control-lg form-control-solid  is-valid'
                  }
                />
              </div>
            </div>
            <div className={'row 12'}>
              <div className='col-sm-3'>
                <label className='col-form-label' style={{float: 'left'}}>
                  {' '}
                  تلفن همراه{' '}
                </label>
              </div>
              <div className='col-sm-3'>
                <input
                  style={{marginBottom: '5px'}}
                  value={mobileA}
                  onChange={(e) => setmobileA(e.target.value)}
                  className={
                    mobileA === ''
                      ? 'col-form-label form-control form-control-lg form-control-solid  is-invalid'
                      : 'col-form-label form-control form-control-lg form-control-solid  is-valid'
                  }
                />
              </div>
              <div className='col-sm-2'>
                <label className='col-sm-4 col-form-label' style={{float: 'left'}}>
                  عنوان آدرس
                </label>
              </div>
              <div className='col-sm-4'>
                <ComboBox
                  onChange={handleChanaddressType}
                  style={{direction: 'rtl'}}
                  endpoint={API_URL + 'AddressTitle/Search'}
                />
              </div>
            </div>
            <div className={'row 12'}>
              <div className='col-sm-3'>
                <label className='col-form-label ' style={{float: 'left'}}>
                  {' '}
                  فاکس{' '}
                </label>
              </div>
              <div className='col-sm-3'>
                <input
                  style={{marginBottom: '5px'}}
                  value={faxA}
                  onChange={(e) => setfaxA(e.target.value)}
                  className={
                    faxA === ''
                      ? 'col-form-label form-control form-control-lg form-control-solid  is-invalid'
                      : 'col-form-label form-control form-control-lg form-control-solid  is-valid'
                  }
                />
              </div>
              <div className='col-sm-2'>
                <label className='col-form-label' style={{float: 'left'}}>
                  شهر{' '}
                </label>
              </div>
              <div className='col-sm-4'>
                <ComboBox
                  onChange={handleChancity}
                  style={{direction: 'rtl'}}
                  endpoint={API_URL + 'Cities/Search'}
                />
              </div>
            </div>
            <div className={'row 12'}>
              <div className='col-sm-3'>
                <label className='col-form-label' style={{float: 'left'}}>
                  {' '}
                  آدرس وب{' '}
                </label>
              </div>
              <div className='col-sm-3'>
                <input
                  style={{marginBottom: '5px'}}
                  value={websiteA}
                  onChange={(e) => setwebsiteA(e.target.value)}
                  className={
                    websiteA === ''
                      ? 'col-form-label form-control form-control-lg form-control-solid  is-invalid'
                      : 'col-form-label form-control form-control-lg form-control-solid  is-valid'
                  }
                />
              </div>
            </div>

            <div className={'row 12'}>
              <div className='col-sm-3'>
                <label className='col-form-label' style={{float: 'left'}}>
                  {' '}
                  توضیح نوع فعالیت{' '}
                </label>
              </div>
              <div className='col-sm-3'>
                <input
                  style={{marginBottom: '5px'}}
                  value={activityDescA}
                  onChange={(e) => setactivityDescA(e.target.value)}
                  className={
                    activityDescA === ''
                      ? 'col-form-label form-control form-control-lg form-control-solid  is-invalid'
                      : 'col-form-label form-control form-control-lg form-control-solid  is-valid'
                  }
                />
              </div>
              <div className='col-sm-2'>
                <label className='col-form-label' style={{float: 'left'}}>
                  {' '}
                  نوع فعالیت{' '}
                </label>
              </div>
              <div className='col-sm-4'>
                <ComboBox
                  onChange={handleChanactivityType}
                  style={{direction: 'rtl'}}
                  endpoint={API_URL + 'ActivityType/Search'}
                />
              </div>
            </div>
            <div className={'row 12'}>
              <div className='col-sm-3'>
                <label className='col-form-label' style={{float: 'left'}}>
                  {' '}
                  توضیح زمینه فعالیت{' '}
                </label>
              </div>
              <div className='col-sm-3'>
                <input
                  style={{marginBottom: '5px'}}
                  value={fieldDescA}
                  onChange={(e) => setfieldDescA(e.target.value)}
                  className={
                    fieldDescA === ''
                      ? 'col-form-label form-control form-control-lg form-control-solid  is-invalid'
                      : 'col-form-label form-control form-control-lg form-control-solid  is-valid'
                  }
                />
              </div>
              <div className='col-sm-2'>
                <label className='col-form-label' style={{float: 'left'}}>
                  زمینه فعالیت{' '}
                </label>
              </div>
              <div className='col-sm-4'>
                <ComboBox
                  onChange={handleChanactivityFieldType}
                  style={{direction: 'rtl'}}
                  endpoint={API_URL + 'ActivityField/Search'}
                />
              </div>
            </div>
            <div className={'row 12'}>
              <div className='col-sm-3'>
                <label className='col-form-label' style={{float: 'left'}}>
                  {' '}
                  آدرس{' '}
                </label>
              </div>
              <div className='col-sm-9'>
                <input
                  style={{marginBottom: '5px'}}
                  value={addressFaA}
                  onChange={(e) => setaddressFaA(e.target.value)}
                  className={
                    addressFaA === ''
                      ? 'col-form-label form-control form-control-lg form-control-solid  is-invalid'
                      : 'col-form-label form-control form-control-lg form-control-solid  is-valid'
                  }
                />
              </div>
            </div>
            <div className={'row 12'}>
              <div className='col-sm-3'>
                <label className='col-form-label' style={{float: 'left'}}>
                  {' '}
                  آدرس انگلیسی{' '}
                </label>
              </div>
              <div className='col-sm-9'>
                <input
                  style={{marginBottom: '5px'}}
                  value={addressEnA}
                  onChange={(e) => setaddressEnA(e.target.value)}
                  className={
                    addressEnA === ''
                      ? 'col-form-label form-control form-control-lg form-control-solid  is-invalid'
                      : 'col-form-label form-control form-control-lg form-control-solid  is-valid'
                  }
                />
              </div>
            </div>
            <div className={'row 12'}>
              <div className='col-sm-3'>
                <label className='col-form-label' style={{float: 'left'}}>
                  {' '}
                  نقشه{' '}
                </label>
              </div>
              <div className='col-sm-8'>
                <input
                  style={{marginBottom: '5px'}}
                  value={mapA}
                  onChange={(e) => setmapA(e.target.value)}
                  className={
                    mapA === ''
                      ? 'col-form-label form-control form-control-lg form-control-solid  is-invalid'
                      : 'col-form-label form-control form-control-lg form-control-solid  is-valid'
                  }
                />
              </div>
              <div className='col-sm-1'>
                <img
                  alt='Logo'
                  className='h-50px logo'
                  src={process.env.PUBLIC_URL + '/media/icons/erth.jpg'}
                  onClick={gomap}
                />
              </div>
            </div>
            <div className={'row 12'}>
              <div className='col-sm-3'>
                <label className='col-form-label ' style={{float: 'left'}}>
                  {' '}
                  خیابان{' '}
                </label>
              </div>
              <div className='col-sm-3'>
                <input
                  style={{marginBottom: '5px'}}
                  value={streetA}
                  onChange={(e) => setstreetA(e.target.value)}
                  className={
                    streetA === ''
                      ? 'col-form-label form-control form-control-lg form-control-solid  is-invalid'
                      : 'col-form-label form-control form-control-lg form-control-solid  is-valid'
                  }
                />
              </div>
              <div className='col-sm-3'>
                <label className='col-form-label' style={{float: 'left'}}>
                  {' '}
                  کوچه{' '}
                </label>
              </div>
              <div className='col-sm-3'>
                <input
                  style={{marginBottom: '5px'}}
                  value={alleyA}
                  onChange={(e) => setalleyA(e.target.value)}
                  className={
                    alleyA === ''
                      ? 'col-form-label form-control form-control-lg form-control-solid  is-invalid'
                      : 'col-form-label form-control form-control-lg form-control-solid  is-valid'
                  }
                />
              </div>
            </div>
            <div className={'row 12'}>
              <div className='col-sm-3'>
                <label className='col-form-label ' style={{float: 'left'}}>
                  {' '}
                  پلاک{' '}
                </label>
              </div>
              <div className='col-sm-3'>
                <input
                  style={{marginBottom: '5px'}}
                  value={plaqueA}
                  onChange={(e) => setplaqueA(e.target.value)}
                  className={
                    plaqueA === ''
                      ? 'col-form-label form-control form-control-lg form-control-solid  is-invalid'
                      : 'col-form-label form-control form-control-lg form-control-solid  is-valid'
                  }
                />
              </div>
              <div className='col-sm-3'>
                <label className='col-form-label' style={{float: 'left'}}>
                  {' '}
                  واحد{' '}
                </label>
              </div>
              <div className='col-sm-3'>
                <input
                  style={{marginBottom: '5px'}}
                  value={unitA}
                  onChange={(e) => setunitA(e.target.value)}
                  className={
                    unitA === ''
                      ? 'col-form-label form-control form-control-lg form-control-solid  is-invalid'
                      : 'col-form-label form-control form-control-lg form-control-solid  is-valid'
                  }
                />
              </div>
            </div>

            <div className={'row 12'}>
              <div className='col-sm-3'>
                <label className='col-form-label ' style={{float: 'left'}}>
                  {' '}
                  توضیحات{' '}
                </label>
              </div>
              <div className='col-sm-9'>
                <input
                  style={{marginBottom: '5px'}}
                  value={addressDescA}
                  onChange={(e) => setaddressDescA(e.target.value)}
                  className={
                    addressDescA === ''
                      ? 'col-form-label form-control form-control-lg form-control-solid  is-invalid'
                      : 'col-form-label form-control form-control-lg form-control-solid  is-valid'
                  }
                />
              </div>
            </div>
            <div className={'row 12'}>
              <div className='col-sm-6'>
                {ghabl3 && (
                  <button
                    type='submit'
                    id='ghabl3'
                    className='btn btn-lg btn-primary w-100 mb-5'
                    onClick={prev21}
                  >
                    {<span className='indicator-label'>مرحله قبل </span>}
                  </button>
                )}
              </div>
              <div className='col-sm-6'>
                <button
                  type='submit'
                  id='kt_sign_up_submit'
                  className='btn btn-lg btn-primary w-100 mb-5'
                  onClick={next3}
                >
                  {<span className='indicator-label'>مرحله بعد </span>}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      {rabetRealPerson && (
        <div>
          <div>
            <div className={'row 12'}>
              <div className='col-sm-6'>
                <label className='form-label' style={{marginLeft: 15}}>
                  ایرانی{' '}
                  <input
                    className='form-check-input'
                    type='radio'
                    name='isForeigner'
                    value={'true'}
                    checked={isForeignerR === 'true'}
                    onChange={(e) => setisForeignerR(e.target.value)}
                  />
                </label>

                <label className='form-label' style={{marginLeft: 15}}>
                  غیر ایرانی{' '}
                  <input
                    className='form-check-input'
                    type='radio'
                    name='isForeigner'
                    value={'false'}
                    checked={isForeignerR === 'false'}
                    onChange={(e) => setisForeignerR(e.target.value)}
                  />
                </label>
              </div>
              <div className='col-sm-6'>
                <label className='form-label' style={{marginLeft: 15}}>
                  مرد{' '}
                  <input
                    className='form-check-input'
                    type='radio'
                    name='gender'
                    value={'true'}
                    checked={IsMaleR === 'true'}
                    onChange={(e) => setIsMaleR(e.target.value)}
                  />
                </label>

                <label className='form-label' style={{marginLeft: 15}}>
                  زن{' '}
                  <input
                    className='form-check-input'
                    type='radio'
                    name='gender'
                    value={'false'}
                    checked={IsMaleR === 'false'}
                    onChange={(e) => setIsMaleR(e.target.value)}
                  />
                </label>
              </div>
            </div>
            <div className={'row 12'}>
              <div className='col-sm-3'>
                <label className='col-form-label' style={{float: 'left'}}>
                  {' '}
                  نام{' '}
                </label>
              </div>
              <div className='col-sm-3'>
                <input
                  style={{marginBottom: '5px'}}
                  value={firstNameFaR}
                  onChange={(e) => setfirstNameFaR(e.target.value)}
                  className={
                    firstNameFaR === ''
                      ? 'col-form-label form-control form-control-lg form-control-solid  is-invalid'
                      : 'col-form-label form-control form-control-lg form-control-solid  is-valid'
                  }
                />
              </div>
              <div className='col-sm-3'>
                <label className='col-form-label' style={{float: 'left'}}>
                  {' '}
                  نام خانوادگی{' '}
                </label>
              </div>
              <div className='col-sm-3'>
                <input
                  value={lastNameFaR}
                  onChange={(e) => setlastNameFaR(e.target.value)}
                  className={
                    lastNameFaR === ''
                      ? 'col-form-label form-control form-control-lg form-control-solid  is-invalid'
                      : 'col-form-label form-control form-control-lg form-control-solid  is-valid'
                  }
                />
              </div>
            </div>

            <div className={'row 12'}>
              <div className='col-sm-3'>
                <label className='col-form-label' style={{float: 'left'}}>
                  {' '}
                  (en)نام{' '}
                </label>
              </div>
              <div className='col-sm-3'>
                <input
                  style={{marginBottom: '5px'}}
                  value={firstNameEnR}
                  onChange={(e) => setfirstNameEnR(e.target.value)}
                  className={
                    firstNameEnR === ''
                      ? 'col-form-label form-control form-control-lg form-control-solid  is-invalid'
                      : 'col-form-label form-control form-control-lg form-control-solid  is-valid'
                  }
                />
              </div>
              <div className='col-sm-3'>
                <label className='col-form-label' style={{float: 'left'}}>
                  {' '}
                  (en)نام خانوادگی{' '}
                </label>
              </div>
              <div className='col-sm-3'>
                <input
                  value={lastNameEnR}
                  onChange={(e) => setlastNameEnR(e.target.value)}
                  className={
                    lastNameEnR === ''
                      ? 'col-form-label form-control form-control-lg form-control-solid  is-invalid'
                      : 'col-form-label form-control form-control-lg form-control-solid  is-valid'
                  }
                />
              </div>
            </div>

            <div className={'row 12'}>
              <div className='col-sm-3'>
                <label className='col-form-label' style={{float: 'left'}}>
                  {' '}
                  نام پدر{' '}
                </label>
              </div>
              <div className='col-sm-3'>
                <input
                  value={fatherNameR}
                  onChange={(e) => setfatherNameR(e.target.value)}
                  className={
                    fatherNameR === ''
                      ? 'col-form-label form-control form-control-lg form-control-solid  is-invalid'
                      : 'col-form-label form-control form-control-lg form-control-solid  is-valid'
                  }
                />
              </div>
              <div className='col-sm-3'>
                <label className='col-form-label' style={{float: 'left'}}>
                  {' '}
                  کد ملی{' '}
                </label>
              </div>
              <div className='col-sm-3'>
                <input
                  style={{marginBottom: '5px'}}
                  value={nationalCodeR}
                  onChange={(e) => setnationalCodeR(e.target.value)}
                  className={
                    nationalCodeR === ''
                      ? 'col-form-label form-control form-control-lg form-control-solid  is-invalid'
                      : 'col-form-label form-control form-control-lg form-control-solid  is-valid'
                  }
                />
              </div>
            </div>
            <div className={'row 12'}>
              <div className='col-sm-3'>
                <label className='col-form-label' style={{float: 'left'}}>
                  {' '}
                  موبایل{' '}
                </label>
              </div>
              <div className='col-sm-3'>
                <input
                  value={mobileR}
                  onChange={(e) => setmobileR(e.target.value)}
                  className={
                    mobileR === ''
                      ? 'col-form-label form-control form-control-lg form-control-solid  is-invalid'
                      : 'col-form-label form-control form-control-lg form-control-solid  is-valid'
                  }
                />
              </div>
              <div className='col-sm-3'>
                <label className='col-form-label' style={{float: 'left'}}>
                  {' '}
                  ایمیل{' '}
                </label>
              </div>
              <div className='col-sm-3'>
                <input
                  style={{marginBottom: '5px'}}
                  value={emailR}
                  onChange={(e) => setemailR(e.target.value)}
                  className={
                    emailR === ''
                      ? 'col-form-label form-control form-control-lg form-control-solid  is-invalid'
                      : 'col-form-label form-control form-control-lg form-control-solid  is-valid'
                  }
                />
              </div>
            </div>

            <div className={'row 12'}>
              <div className='col-sm-3'>
                <label className='col-form-label' style={{float: 'left'}}>
                  {' '}
                  تلفن{' '}
                </label>
              </div>
              <div className='col-sm-3'>
                <input
                  value={telR}
                  onChange={(e) => settelR(e.target.value)}
                  className={
                    telR === ''
                      ? 'col-form-label form-control form-control-lg form-control-solid  is-invalid'
                      : 'col-form-label form-control form-control-lg form-control-solid  is-valid'
                  }
                />
              </div>

              <div className='col-sm-3'>
                <label className='col-form-label' style={{float: 'left'}}>
                  {' '}
                  تلفن داخلی{' '}
                </label>
              </div>
              <div className='col-sm-3'>
                <input
                  style={{marginBottom: '5px'}}
                  value={internalTelR}
                  onChange={(e) => setinternalTelR(e.target.value)}
                  className={
                    internalTelR === ''
                      ? 'col-form-label form-control form-control-lg form-control-solid  is-invalid'
                      : 'col-form-label form-control form-control-lg form-control-solid  is-valid'
                  }
                />
              </div>
            </div>

            <div className={'row 12'}>
              <div className='col-sm-3'>
                <label className='col-form-label' style={{float: 'left'}}>
                  {' '}
                  شماره پاسپورت{' '}
                </label>
              </div>
              <div className='col-sm-3'>
                <input
                  value={passportNumberR}
                  onChange={(e) => setpassportNumberR(e.target.value)}
                  className={
                    passportNumberR === ''
                      ? 'col-form-label form-control form-control-lg form-control-solid  is-invalid'
                      : 'col-form-label form-control form-control-lg form-control-solid  is-valid'
                  }
                />
              </div>
              <div className='col-sm-3'>
                <label className='col-form-label' style={{float: 'left'}}>
                  {' '}
                  شماره شناسنامه{' '}
                </label>
              </div>
              <div className='col-sm-3'>
                <input
                  style={{marginBottom: '5px'}}
                  value={idNumberR}
                  onChange={(e) => setidNumberR(e.target.value)}
                  className={
                    idNumberR === ''
                      ? 'col-form-label form-control form-control-lg form-control-solid  is-invalid'
                      : 'col-form-label form-control form-control-lg form-control-solid  is-valid'
                  }
                />
              </div>
            </div>
            <div className={'row 12'}>
              <div className='col-sm-3'>
                <label className='col-form-label ' style={{float: 'left'}}>
                  {' '}
                  تاریخ تولد{' '}
                </label>
              </div>
              <div className='col-sm-3'>
                <DatePicker
                  className=' form-control'
                  isGregorian={false}
                  value={birthDateR}
                  onChange={handleDateR}
                />
              </div>
            </div>

            <div className={'row 12'}>
              <div className='col-sm-6'>
                {ghabl4 && (
                  <button
                    type='submit'
                    id='ghabl4'
                    className='btn btn-lg btn-primary w-100 mb-5'
                    onClick={perv3}
                  >
                    {<span className='indicator-label'>مرحله قبل </span>}
                  </button>
                )}
              </div>
              <div className='col-sm-6'>
                <button
                  type='submit'
                  id='kt_sign_up_submit'
                  className='btn btn-lg btn-primary w-100 mb-5'
                  onClick={next4}
                >
                  {<span className='indicator-label'>مرحله بعد </span>}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      {filesRealPerson && (
        <div>
          <div>
            <div>
              <div className=' card card-px-0 mb-2 shadow '>
                <div className='card-body' style={{margin: '5px'}}>
                  <div className='row'>
                    {' '}
                    <div className='col-1'>
                      {' '}
                      <label>عنوان فایل</label>{' '}
                    </div>
                    <div className='col-2'>
                      <ComboBoxLocaltow
                        endpoint={API_URL + 'registration/real/GetRealFileTypes'}
                        onChange={(e: any) => filetypecbtn(e)}
                        filldata={fileTypeList}
                        className='form-control'
                      />
                    </div>
                    <div className='col-3'>
                      <div>
                        {/* <label className='col-sm-4 col-form-label'>{data.titleFa} </label> */}

                        <label className='k-button col-sm-6' style={{height: '42px'}}>
                          <label id={'fileName-0'}>{'فابل'}</label>
                          <input
                            style={{visibility: 'hidden'}}
                            id={'file-0'}
                            type='file'
                            onChange={(e) => selectitem(e, 0)}
                          />
                        </label>

                        <label
                          className='k-button col-sm-1 btn btn-icon btn-bg-light btn-active-color-danger '
                          onClick={(e) => handleResetClick()}
                        >
                          {' '}
                          <KTSVG
                            path='/media/icons/duotune/general/gen034.svg'
                            className='svg-icon-3'
                          />
                        </label>
                      </div>
                    </div>
                    <div className='col-3'>
                      <input
                        value={desc}
                        onChange={(e) => setDesc(e.target.value)}
                        className={
                          desc === ''
                            ? 'col-form-label form-control form-control-lg form-control-solid  is-invalid'
                            : 'col-form-label form-control form-control-lg form-control-solid  is-valid'
                        }
                      />
                    </div>
                    <div className='col-2'>
                      <button
                        id='myBtn1'
                        style={{width: '80px'}}
                        onClick={FileAddlist}
                        className='k-button k-primary'
                      >
                        {'ثبت'}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div className=' card card-px-0 mb-2 shadow '>
                <div className='card-body' style={{margin: '20px'}}>
                  <div
                    className='row fileDiv'
                    style={{
                      backgroundColor: '#f8f9fa',
                    }}
                  >
                    <label
                      className='col-sm-4 col-form-label'
                      style={{
                        border: 'solid 1px rgb(222, 226, 230)',
                      }}
                    >
                      {'عنوان فایل'}{' '}
                    </label>
                    <label
                      className='col-sm-6 col-form-label'
                      style={{
                        border: 'solid 1px rgb(222, 226, 230)',
                      }}
                    >
                      {'توضیحات'}{' '}
                    </label>

                    <label
                      className='col-sm-1 col-form-label'
                      style={{
                        border: 'solid 1px rgb(222, 226, 230)',
                      }}
                    >
                      {'دانلود'}{' '}
                    </label>

                    <label
                      className='col-sm-1 col-form-label'
                      style={{
                        border: 'solid 1px rgb(222, 226, 230)',
                      }}
                    >
                      {'حذف'}{' '}
                    </label>
                  </div>
                  {dataList.map(function (data, index) {
                    return (
                      <div
                        className='row fileDiv'
                        style={{
                          backgroundColor: index % 2 === 0 ? '#ffffff' : '#00a4ff14',
                        }}
                      >
                        <label
                          className='col-sm-4 col-form-label'
                          style={{
                            border: 'solid 1px rgb(222, 226, 230)',
                          }}
                        >
                          {data.fileTypeTitle}{' '}
                        </label>
                        <label
                          className='col-sm-6 col-form-label'
                          style={{
                            border: 'solid 1px rgb(222, 226, 230)',
                          }}
                        >
                          {data.fileDescription}{' '}
                        </label>

                        <a
                          style={{
                            border: 'solid 1px rgb(222, 226, 230)',
                          }}
                          id='file'
                          className='col-sm-1  k-button  btn btn-icon  btn-color-success '
                          href={URL.createObjectURL(data.file)}
                          download
                        >
                          <KTSVG
                            path='/media/icons/duotune/arrows/arr065.svg'
                            className='svg-icon-3'
                          />
                        </a>

                        <label
                          style={{
                            border: 'solid 1px rgb(222, 226, 230)',
                          }}
                          className='col-sm-1  k-button  btn btn-icon  btn-color-danger '
                          onClick={(e) => handleDeleteFileItem(data.fileTypeId)}
                        >
                          {' '}
                          <KTSVG
                            path='/media/icons/duotune/general/gen034.svg'
                            className='svg-icon-3'
                          />
                        </label>
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>

            <div className={'row 12'}>
              <div className='col-sm-6'>
                {ghabl5 && (
                  <button
                    type='submit'
                    id='ghabl5'
                    className='btn btn-lg btn-primary w-100 mb-5'
                    onClick={perv4}
                  >
                    {<span className='indicator-label'>مرحله قبل </span>}
                  </button>
                )}
              </div>
              <div className='col-sm-6'>
                <button
                  type='submit'
                  id='kt_sign_up_submit'
                  className='btn btn-lg btn-primary w-100 mb-5'
                  onClick={next5}
                >
                  {<span className='indicator-label'>ثبت </span>}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* end::Form group */}

      {/* </form> */}
    </div>
  )
}
