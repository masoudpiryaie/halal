import {GridColumn} from '@progress/kendo-react-grid'
import {Upload} from '@progress/kendo-react-upload'
import {FormControl, Grid, Uploader, ComboBox, ComboBoxLocal} from '@core/components'
import React, {useState, useEffect} from 'react'
import {useIntl} from 'react-intl'
import {FormMode} from '@core/forms'
import {PageTitle, PageActions} from '_metronic/layout/core'
import {useForm} from 'react-hook-form'
import {CompositeFilterDescriptor} from '@progress/kendo-data-query'
import {generateFilter} from '@core/utils'
import {UnitsCreateDialog, UnitsModel} from './GTINCodeRequestCreateDialog'
import {SearchFunc} from 'app/pages/admin/baseInfo/SearchFunc'
import {StructureSearchPage} from 'app/pages/admin/baseInfo/Component/StructureSearchPage'
import axios from 'axios'
import {PackageTypeItem} from './PackageTypeItem'
import {StringSchema, string} from 'yup'
import {left} from '@popperjs/core'
import {toast} from 'react-toastify'
import {forEach} from 'rambda'
import {KTSVG} from '_metronic/helpers'
export interface IModelGr {
  title: string
  field: string
  show: boolean
}
export type ActiveItemModel = {
  id: number
  titleFa: string
  titleEn: string
  picName: string
  picPath: string
  file: fileModel
}
export type fileModel = {
  id: number
  titleFa: string
  titleEn: string
  picPath: string
}

export type PackagingLevelsModel = {
  id: number
  key: string
  title: string
}
export type FileModel = {
  fileTypeId: number
  file: File
}
export function GTINCodeRequestPage() {
  const intl = useIntl()
  const API_URL = process.env.REACT_APP_API_URLCoding || 'api'
  const [showDialog, setShowDialog] = useState(false)
  const [showIRCodeDialog, setshowIRCodeDialog] = useState(false)
  const [showGpcDialog, setshowGpcDialog] = useState(false)
  const [showShenaseDialog, setshowShenaseDialog] = useState(false)

  const [mode, setMode] = useState<FormMode>('new')
  const [actionItem, setActionItem] = useState()
  const [refresh, setRefresh] = useState(1)
  const [codeType, setCodeType] = useState(0)
  const [tab1, settab1] = useState(true)
  const [tab2, settab2] = useState(false)
  const [tab3, settab3] = useState(false)
  const [tab4, settab4] = useState(false)
  const [tab5, settab5] = useState(false)
  const [tab6, settab6] = useState(false)
  const [tabeeat, settabeeat] = useState('')
  const [files, setfiles] = React.useState<any[]>([])
  const fileList: Array<FileModel> = []
  const [ff, setff] = useState(0)
  const [packagingLevels, setgetPackagingLevels] = useState<PackagingLevelsModel[]>([])
  const [activeItems, setgetActiveItems] = useState<ActiveItemModel[]>([])

  const gr = localStorage.getItem('BreakHeadLinesGrid')

  const [gS1PrefixId, setgS1PrefixId] = useState(0)
  const [packagingLevel, setpackagingLevel] = useState(0)
  const [packagingId, setpackagingId] = useState(0)
  const [breakId, setbreakId] = useState(0)
  const [payeInfoId, setpayeInfoId] = useState(0)
  const [headLineId, setheadLineId] = useState(0)
  const [functionalNameFa, setfunctionalNameFa] = useState('')
  const [functionalNameEn, setfunctionalNameEn] = useState('')
  const [productTypeFa, setproductTypeFa] = useState('')
  const [productTypeEn, setproductTypeEn] = useState('')
  const [brandTitleFa, setbrandTitleFa] = useState('')
  const [brandTitleEn, setbrandTitleEn] = useState('')
  const [subBrandTitleFa, setsubBrandTitleFa] = useState('')
  const [subBrandTitleEn, setsubBrandTitleEn] = useState('')
  const [productDescriptionFa, setproductDescriptionFa] = useState('')
  const [productDescriptionEn, setproductDescriptionEn] = useState('')
  const [iranCode, setiranCode] = useState('')
  const [sku, setsku] = useState('')
  const [labelDescriptionFa, setlabelDescriptionFa] = useState('')
  const [labelDescriptionEn, setlabelDescriptionEn] = useState('')
  const [pureContentAmount, setpureContentAmount] = useState('')
  const [pureContentUnitId, setpureContentUnitId] = useState('')
  const [originCountryId, setoriginCountryId] = useState('')
  const [targetMarketId, settargetMarketId] = useState('')
  const [languageId, setlanguageId] = useState('')
  const [isExportable, setisExportable] = useState(false)
  const [unitOfMeasurementId, setunitOfMeasurementId] = useState('')
  const [unitOfWeightId, setunitOfWeightId] = useState('')
  const [length, setlength] = useState('')
  const [width, setwidth] = useState('')
  const [height, setheight] = useState('')
  const [pureWeight, setpureWeight] = useState('')
  const [imPureWeight, setimPureWeight] = useState('')
  const [ISBusinessUnitBaseLevel, setISBusinessUnitBaseLevel] = useState(false)
  const [ISBusinessUnitConsumer, setISBusinessUnitConsumer] = useState(false)
  const [ISBusinessUnitBillable, setISBusinessUnitBillable] = useState(false)
  const [ISBusinessUnitTransportable, setISBusinessUnitTransportable] = useState(false)
  const [ISBusinessUnitOrderable, setISBusinessUnitOrderable] = useState(false)
  const [ISBusinessUnitWithVariableMeasurement, setISBusinessUnitWithVariableMeasurement] =
    useState(false)

  const {
    register,
    handleSubmit,
    reset,
    formState: {isDirty},
  } = useForm<UnitsModel>()
  const [filter, setFilter] = useState<CompositeFilterDescriptor>()
  useEffect(() => {
    getPackagingLevels()
    getActiveItems()
    fetchUploader()
  }, [])
  const dddd = [
    {
      id: 1,
      src: 'img_girl.jpg',
    },
    {
      id: 2,
      src: '1',
    },
    {
      id: 3,
      src: '1',
    },
    {
      id: 4,
      src: '1',
    },
    {
      id: 5,
      src: '1',
    },
    {
      id: 6,
      src: '1',
    },
  ]
  const getPackagingLevels = async () => {
    try {
      let url = API_URL + 'GTINs/GetPackagingLevels'
      const resp = await axios.get(url)
      setgetPackagingLevels(resp.data.value)
    } catch (error) {
      console.log(error)
    }
  }
  const getActiveItems = async () => {
    try {
      let url = API_URL + 'Packagings/GetActiveItems'
      const resp = await axios.get(url)
      debugger

      setgetActiveItems(resp.data.value)
    } catch (error) {
      console.log(error)
    }
  }
  const resetSearch = () => {
    reset()
    setFilter(undefined)
  }
  const handleClose = () => {
    setShowDialog(false)
    setRefresh(Math.random())
  }

  const nexttab1 = () => {
    settab1(false)
    settab2(true)
  }
  const nexttab2 = () => {
    settab2(false)
    settab3(true)
  }
  const nexttab3 = () => {
    settab3(false)
    settab4(true)
  }
  const nexttab4 = () => {
    alert(ISBusinessUnitBaseLevel)
    settab4(false)
    settab5(true)
  }

  const backtab2 = () => {
    settab1(true)
    settab2(false)
  }
  const backtab3 = () => {
    settab2(true)
    settab3(false)
  }
  const backtab4 = () => {
    settab3(true)
    settab4(false)
  }
  const backtab5 = () => {
    settab4(true)
    settab5(false)
  }

  var col = gr
    ? (JSON.parse(gr) as IModelGr[])
    : [
        {
          title: intl.formatMessage({id: 'Model.GTINCodeRequest.KeyCode'}),
          field: 'keyCode',
          show: true,
        },
        {
          title: intl.formatMessage({id: 'Model.GTINCodeRequest.AllowedCount'}),
          field: 'allowedCount',
          show: true,
        },
        {
          title: intl.formatMessage({id: 'Model.GTINCodeRequest.Remaining'}),
          field: 'remaining',
          show: true,
        },
      ]

  const selectitem = (id: number) => {
    setpackagingId(id)
  }
  const choseIRCode = () => {
    setshowIRCodeDialog(true)
  }
  const choseGpc = () => {
    setshowGpcDialog(true)
  }
  const choseShenase = () => {
    setshowShenaseDialog(true)
  }
  const [payeInfoName, setpayeInfoName] = useState('')
  const selectRecord = (i: number, name: string) => {
    setpayeInfoId(i)
    setpayeInfoName(name)
    setshowIRCodeDialog(false)
  }
  const [GpcName, setGpcName] = useState('')
  const selectRecordGpc = (i: number, name: string) => {
    setbreakId(i)
    debugger
    setGpcName(name)
    setshowGpcDialog(false)
  }
  const [ShenaseName, setShenaseName] = useState('')
  const selectRecordShenase = (i: number, name: string) => {
    setheadLineId(i)
    setShenaseName(name)
    setshowShenaseDialog(false)
  }
  const handleCloseIranCodeStructurePage = () => {
    setshowIRCodeDialog(false)
  }
  const handleCloseGpcPage = () => {
    setshowGpcDialog(false)
  }
  const handleCloseShenasePage = () => {
    setshowShenaseDialog(false)
  }
  const fetchUploader = async () => {
    try {
      let url = API_URL + 'GTINs/GetFileTypes'
      const fetchResponse = await fetch(`${url}`, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
        },
      })
      const uploaders = await fetchResponse.json()
      setfiles(uploaders.value)
      debugger

      debugger
    } catch (error) {
      console.log(error)
    }
  }
  const selectfile = (event: React.ChangeEvent<HTMLInputElement>, id: number) => {
    if (event.target.files) {
      fileList.push({fileTypeId: id, file: event.target.files[0]})

      const output = document.getElementById('fileName-' + id)
      if (output) output.innerHTML = event.target.files[0].name
    }
  }

  const clickRowGS1Prefixes = (item: any) => {
    setgS1PrefixId(item.dataItem.id)
  }
  const handleChangepureContentUnitId = (event: any) => {
    setpureContentUnitId(event)
  }
  const handleChangeoriginCountryId = (event: any) => {
    setoriginCountryId(event)
  }
  const handleChangetargetMarketId = (event: any) => {
    settargetMarketId(event)
  }
  const handleChangelanguageId = (event: any) => {
    setlanguageId(event)
  }
  const handleChangeunitOfMeasurementId = (event: any) => {
    setunitOfMeasurementId(event)
  }
  const handleChangeunitOfWeightId = (event: any) => {
    setunitOfWeightId(event)
  }
  let formData = new FormData()
  const save = () => {
    formData.append('gS1PrefixId', gS1PrefixId.toString())
    formData.append('packagingLevel', packagingLevel.toString())
    formData.append('packagingId', packagingId.toString())
    formData.append('breakId', breakId.toString())
    formData.append('payeInfoId', payeInfoId.toString())
    formData.append('headLineId', headLineId.toString())
    formData.append('functionalNameFa', functionalNameFa)
    formData.append('functionalNameEn', functionalNameEn)
    formData.append('productTypeFa', productTypeFa)
    formData.append('productTypeEn', productTypeEn)
    formData.append('brandTitleFa', brandTitleFa)
    formData.append('brandTitleEn', brandTitleEn)
    formData.append('subBrandTitleFa', subBrandTitleFa)
    formData.append('subBrandTitleEn', subBrandTitleEn)
    formData.append('productDescriptionFa', productDescriptionFa)
    formData.append('productDescriptionEn', productDescriptionEn)
    formData.append('iranCode', iranCode)
    formData.append('sku', sku)
    formData.append('labelDescriptionFa', labelDescriptionFa)
    formData.append('labelDescriptionEn', labelDescriptionEn)
    formData.append('pureContentAmount', pureContentAmount)
    formData.append('pureContentUnitId', pureContentUnitId)
    formData.append('originCountryId', originCountryId)
    formData.append('targetMarketId', targetMarketId)
    formData.append('languageId', languageId)
    formData.append('isExportable', isExportable.toString())
    formData.append('unitOfMeasurementId', unitOfMeasurementId)
    formData.append('unitOfWeightId', unitOfWeightId)
    formData.append('length', length)
    formData.append('width', width)
    formData.append('height', height)
    formData.append('pureWeight', pureWeight)
    formData.append('imPureWeight', imPureWeight)
    formData.append('ISBusinessUnitBaseLevel', ISBusinessUnitBaseLevel.toString())
    formData.append('ISBusinessUnitConsumer', ISBusinessUnitConsumer.toString())
    formData.append('ISBusinessUnitBillable', ISBusinessUnitBillable.toString())
    formData.append('ISBusinessUnitTransportable', ISBusinessUnitTransportable.toString())
    formData.append('ISBusinessUnitOrderable', ISBusinessUnitOrderable.toString())
    formData.append(
      'ISBusinessUnitWithVariableMeasurement',
      ISBusinessUnitWithVariableMeasurement.toString()
    )
    formData.append('Status', '1')

    for (var i = 0; i < fileList.length; i++) {
      formData.append('Files[' + i + '].FileTypeId', fileList[i].fileTypeId.toString())
      formData.append('Files[' + i + '].File', fileList[i].file)
    }
    for (var ii = 0; ii < roots.length; ii++) {
      var j = ii - 1
      if (ii !== 0) formData.append('Files[' + j + '].Description', roots[ii].value)
    }

    debugger
    let url = API_URL + 'GTINs'

    axios({
      method: 'post',
      url: url,
      data: formData,
      headers: {'Content-Type': 'multipart/form-data'},
    })
      .then(function (response) {
        toast.info(intl.formatMessage({id: 'MENU.ACTIONSuccess'}))
        clearForm()
      })
      .catch(function (response) {
        toast.error(intl.formatMessage({id: 'MENU.ACTIONError'}))
      })
  }
  const clearForm = () => {
    setgS1PrefixId(0)
    setpackagingLevel(0)
    setpackagingId(0)
    setbreakId(0)
    setpayeInfoId(0)
    setheadLineId(0)
    setfunctionalNameFa('')
    setfunctionalNameEn('')
    setproductTypeFa('')
    setproductTypeEn('')
    setbrandTitleFa('')
    setbrandTitleEn('')
    setsubBrandTitleFa('')
    setsubBrandTitleEn('')
    setproductDescriptionFa('')
    setproductDescriptionEn('')
    setiranCode('')
    setsku('')
    setlabelDescriptionFa('')
    setlabelDescriptionEn('')
    setpureContentAmount('')
    setpureContentUnitId('')
    setoriginCountryId('')
    settargetMarketId('')
    setlanguageId('')
    setisExportable(false)
    setunitOfMeasurementId('')
    setunitOfWeightId('')
    setlength('')
    setwidth('')
    setheight('')
    setpureWeight('')
    setimPureWeight('')
    setISBusinessUnitBaseLevel(false)
    setISBusinessUnitConsumer(false)
    setISBusinessUnitBillable(false)
    setISBusinessUnitTransportable(false)
    setISBusinessUnitOrderable(false)
    setISBusinessUnitWithVariableMeasurement(false)
    roots = []
    backtab2()
    settab5(false)
  }

  var roots = [{name: '', value: ''}]
  const handleChange = (e: any) => {
    const {name, value} = e.target
    debugger
    if (roots.find((part) => part.name === name)) {
      var newList = roots.filter((part) => part.name !== name)
      newList.push({name, value})
      roots = newList
    } else {
      roots.push({name, value})
    }
    // roots = []
    // roots = newList
    debugger
    // setjjjjFormData((prevState) => ({
    //    ...prevState,
    //    [name]: value,
    //  }))
    // // setFormData((prevState) => ({
    // //   ...prevState,
    // //   [name]: value,
    // // }))
    // var k = formDddddata
  }
  const handleResetClick = (id: number) => {
    const fileInput = document.getElementById('file-' + id)
    debugger
    const output = document.getElementById('fileName-' + id)
    if (output) output.innerHTML = 'انتخاب فایل '
  }

  return (
    <>
      <PageTitle breadcrumbs={[]}>
        {intl.formatMessage({id: 'MENU.BaseInfo.GTINCodeRequestController'})}
      </PageTitle>

      {showDialog && <UnitsCreateDialog mode={mode} onClose={handleClose} item={actionItem} />}
      {showIRCodeDialog && (
        <StructureSearchPage
          treeUrl={API_URL + 'IRCodeStructures'}
          gridUrl={API_URL + 'PayeInfos/'}
          exteraParam='&IRCodeStructureId='
          onClose={handleCloseIranCodeStructurePage}
          selectRecord={selectRecord}
        />
      )}
      {showGpcDialog && (
        <StructureSearchPage
          treeUrl={API_URL + 'GPCStructures'}
          gridUrl={API_URL + 'Breaks/'}
          exteraParam='&GPCStructureId='
          onClose={handleCloseGpcPage}
          selectRecord={selectRecordGpc}
        />
      )}
      {showShenaseDialog && (
        <StructureSearchPage
          treeUrl={API_URL + 'ShenaseStructures'}
          gridUrl={API_URL + 'HeadLines/'}
          exteraParam='&ShenaseStructureId='
          onClose={handleCloseShenasePage}
          selectRecord={selectRecordShenase}
        />
      )}

      <div className='card card-flush '>
        <div className='card-body'>
          <div>
            <div>
              {' '}
              <div className={'row 12'} style={{direction: 'rtl'}}>
                <div className='col-sm-2'>
                  <div
                    className='mb-10 text-center'
                    style={{
                      backgroundImage: tab1
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
                    <h3 className='text-light mb-3'> انتخاب پیش شماره شرکتی </h3>
                  </div>
                </div>
                <div className='col-sm-2'>
                  <div
                    className='mb-10 text-center'
                    style={{
                      backgroundImage: tab2
                        ? 'linear-gradient(90deg, #7b81ec, #3bd1d3)'
                        : 'linear-gradient(90deg, #656363, #cdd2d2)',
                      color: 'white',
                      width: '200px',
                      height: '60px',
                      borderRadius: '20px',
                      paddingTop: '10%',
                    }}
                  >
                    <h3 className='text-light mb-3'>سطح طبقه بندی </h3>
                  </div>
                </div>
                <div className='col-sm-2'>
                  <div
                    className='mb-10 text-center'
                    style={{
                      backgroundImage: tab3
                        ? 'linear-gradient(90deg, #7b81ec, #3bd1d3)'
                        : 'linear-gradient(90deg, #656363, #cdd2d2)',
                      color: 'white',
                      width: '200px',
                      height: '60px',
                      borderRadius: '20px',
                      paddingTop: '10%',
                    }}
                  >
                    <h3 className='text-light mb-3'>نوع بسته بندی</h3>
                  </div>
                </div>
                <div className='col-sm-2'>
                  <div
                    className='mb-10 text-center'
                    style={{
                      backgroundImage: tab4
                        ? 'linear-gradient(90deg, #7b81ec, #3bd1d3)'
                        : 'linear-gradient(90deg, #656363, #cdd2d2)',
                      color: 'white',
                      width: '200px',
                      height: '60px',
                      borderRadius: '20px',
                      paddingTop: '10%',
                    }}
                  >
                    <h3 className='text-light mb-3'>مشخصات محصول </h3>
                  </div>
                </div>

                <div className='col-sm-2'>
                  <div
                    className='mb-10 text-center'
                    style={{
                      backgroundImage: tab5
                        ? 'linear-gradient(90deg, #7b81ec, #3bd1d3)'
                        : 'linear-gradient(90deg, #656363, #cdd2d2)',
                      color: 'white',
                      width: '200px',
                      height: '60px',
                      borderRadius: '20px',
                      paddingTop: '10%',
                    }}
                  >
                    <h3 className='text-light mb-3'>ثبت اطلاعات </h3>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {tab1 && (
            <div>
              <div className='text-center'>
                <div className='text-dark fw-bold fs-4 mb-10 fv-row'>
                  <div className={'row 12'}>
                    <Grid
                      style={{
                        height: '300px',
                      }}
                      refresh={refresh}
                      endpoint={API_URL + 'GS1Prefixes/GetUserActiveItems'}
                      showActions={false}
                      columns={col}
                      name='GS1PrefixesGrid'
                      Calcolumn={true}
                      onRowClick={clickRowGS1Prefixes}
                    ></Grid>
                  </div>
                  <div className={'row 12'}>
                    <div className='col-sm-10'> </div>
                    <div className='col-sm-2'>
                      <button
                        disabled={gS1PrefixId === 0}
                        type='submit'
                        id='kt_sign_up_submit'
                        className='btn btn-lg btn-primary w-100 mb-5'
                        onClick={nexttab1}
                      >
                        {<span className='indicator-label'>مرحله بعد </span>}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
          {tab2 && (
            <div>
              <div>
                <div className={'row 12'}>
                  {packagingLevels.map((x) => (
                    <div className={'row 12'} style={{padding: 5}}>
                      <label>
                        <div className={'row 12'}>
                          <div className='col-sm-1'>
                            <input
                              style={{float: left}}
                              className='form-check-input'
                              type='radio'
                              name='Legal'
                              value={'false'}
                              checked={packagingLevel === x.id}
                              onChange={(e) => setpackagingLevel(x.id)}
                            />
                          </div>
                          <div className='col-sm-5'>{x.title} </div>
                        </div>
                      </label>
                    </div>
                  ))}
                </div>

                <div className={'row 12'}>
                  <div className='col-sm-8'> </div>
                  <div className='col-sm-2'>
                    <button
                      type='submit'
                      id='kt_sign_up_submit'
                      className='btn btn-lg btn-primary w-100 mb-5'
                      onClick={backtab2}
                    >
                      {<span className='indicator-label'>مرحله قبل </span>}
                    </button>
                  </div>
                  <div className='col-sm-2'>
                    <button
                      disabled={packagingLevel === 0}
                      type='submit'
                      id='kt_sign_up_submit'
                      className='btn btn-lg btn-primary w-100 mb-5'
                      onClick={nexttab2}
                    >
                      {<span className='indicator-label'>مرحله بعد </span>}
                    </button>
                  </div>
                  <div className='col-sm-6'></div>
                </div>
              </div>
            </div>
          )}
          {tab3 && (
            <div>
              <div>
                <div className={'row 12'}>
                  {activeItems.map((x) => (
                    <div>
                      <PackageTypeItem
                        data={x}
                        selectitem={() => selectitem(x.id)}
                      ></PackageTypeItem>
                    </div>
                  ))}
                </div>

                <div className={'row 12'}>
                  <div className='col-sm-8'> </div>
                  <div className='col-sm-2'>
                    <button
                      type='submit'
                      id='kt_sign_up_submit'
                      className='btn btn-lg btn-primary w-100 mb-5'
                      onClick={backtab3}
                    >
                      {<span className='indicator-label'>مرحله قبل </span>}
                    </button>
                  </div>
                  <div className='col-sm-2'>
                    <button
                      type='submit'
                      id='kt_sign_up_submit'
                      className='btn btn-lg btn-primary w-100 mb-5'
                      onClick={nexttab3}
                    >
                      {<span className='indicator-label'>مرحله بعد </span>}
                    </button>
                  </div>
                  <div className='col-sm-6'></div>
                </div>
              </div>
            </div>
          )}
          {tab4 && (
            <div>
              <div>
                <div className={'row 12'}>
                  <div className='col-sm-4'>
                    {' '}
                    <button
                      type='submit'
                      id='kt_sign_up_submit'
                      className='btn btn-lg btn-primary w-100 mb-5'
                      onClick={choseIRCode}
                    >
                      {<span className='indicator-label'>نام پایه تکمیلی </span>}
                    </button>{' '}
                  </div>
                  <div className='col-sm-4'>
                    {' '}
                    <button
                      type='submit'
                      id='kt_sign_up_submit'
                      className='btn btn-lg btn-primary w-100 mb-5'
                      onClick={choseGpc}
                    >
                      {<span className='indicator-label'>نام بریک </span>}
                    </button>{' '}
                  </div>
                  <div className='col-sm-4'>
                    {' '}
                    <button
                      type='submit'
                      id='kt_sign_up_submit'
                      className='btn btn-lg btn-primary w-100 mb-5'
                      onClick={choseShenase}
                    >
                      {<span className='indicator-label'>نام سرفصل </span>}
                    </button>{' '}
                  </div>
                </div>
                <div className={'row 12'}>
                  <div className='col-sm-4'>
                    {' '}
                    <div className='col-sm-12'>
                      <input
                        value={payeInfoName}
                        style={{marginBottom: '5px'}}
                        className={
                          payeInfoName === ''
                            ? 'col-form-label form-control form-control-lg form-control-solid  is-invalid'
                            : 'col-form-label form-control form-control-lg form-control-solid  is-valid'
                        }
                      />
                    </div>
                  </div>
                  <div className='col-sm-4'>
                    {' '}
                    <div className='col-sm-12'>
                      <input
                        value={GpcName}
                        style={{marginBottom: '5px'}}
                        className={
                          GpcName === ''
                            ? 'col-form-label form-control form-control-lg form-control-solid  is-invalid'
                            : 'col-form-label form-control form-control-lg form-control-solid  is-valid'
                        }
                      />
                    </div>
                  </div>
                  <div className='col-sm-4'>
                    {' '}
                    <div className='col-sm-12'>
                      <input
                        value={ShenaseName}
                        style={{marginBottom: '5px'}}
                        className={
                          ShenaseName === ''
                            ? 'col-form-label form-control form-control-lg form-control-solid  is-invalid'
                            : 'col-form-label form-control form-control-lg form-control-solid  is-valid'
                        }
                      />
                    </div>
                  </div>
                </div>

                <div className={'row 12'}>
                  <div className='col-sm-3'>
                    <label className='col-form-label col-sm-4'> نام عملیاتی </label>
                  </div>
                  <div className='col-sm-3'>
                    <input
                      value={functionalNameFa}
                      onChange={(e) => setfunctionalNameFa(e.target.value)}
                      style={{marginBottom: '5px'}}
                      className={
                        functionalNameFa === ''
                          ? 'col-form-label form-control form-control-lg form-control-solid  is-invalid'
                          : 'col-form-label form-control form-control-lg form-control-solid  is-valid'
                      }
                    />
                  </div>

                  <div className='col-sm-3'>
                    <label className='col-form-label col-sm-4'> Functional Name </label>
                  </div>
                  <div className='col-sm-3'>
                    <input
                      value={functionalNameEn}
                      onChange={(e) => setfunctionalNameEn(e.target.value)}
                      style={{marginBottom: '5px'}}
                      className={
                        functionalNameEn === ''
                          ? 'col-form-label form-control form-control-lg form-control-solid  is-invalid'
                          : 'col-form-label form-control form-control-lg form-control-solid  is-valid'
                      }
                    />
                  </div>
                </div>
                <div className={'row 12'}>
                  <div className='col-sm-3'>
                    <label className='col-form-label col-sm-4'> نوع محصول </label>
                  </div>
                  <div className='col-sm-3'>
                    <input
                      value={productTypeFa}
                      onChange={(e) => setproductTypeFa(e.target.value)}
                      style={{marginBottom: '5px'}}
                      className={
                        productTypeFa === ''
                          ? 'col-form-label form-control form-control-lg form-control-solid  is-invalid'
                          : 'col-form-label form-control form-control-lg form-control-solid  is-valid'
                      }
                    />
                  </div>

                  <div className='col-sm-3'>
                    <label className='col-form-label col-sm-4'> Variant Text </label>
                  </div>
                  <div className='col-sm-3'>
                    <input
                      value={productTypeEn}
                      onChange={(e) => setproductTypeEn(e.target.value)}
                      style={{marginBottom: '5px'}}
                      className={
                        productTypeEn === ''
                          ? 'col-form-label form-control form-control-lg form-control-solid  is-invalid'
                          : 'col-form-label form-control form-control-lg form-control-solid  is-valid'
                      }
                    />
                  </div>
                </div>
                <div className={'row 12'}>
                  <div className='col-sm-3'>
                    <label className='col-form-label col-sm-4'> نام برند </label>
                  </div>
                  <div className='col-sm-3'>
                    <input
                      value={brandTitleFa}
                      onChange={(e) => setbrandTitleFa(e.target.value)}
                      style={{marginBottom: '5px'}}
                      className={
                        brandTitleFa === ''
                          ? 'col-form-label form-control form-control-lg form-control-solid  is-invalid'
                          : 'col-form-label form-control form-control-lg form-control-solid  is-valid'
                      }
                    />
                  </div>

                  <div className='col-sm-3'>
                    <label className='col-form-label col-sm-4'> Brand </label>
                  </div>
                  <div className='col-sm-3'>
                    <input
                      value={brandTitleEn}
                      onChange={(e) => setbrandTitleEn(e.target.value)}
                      style={{marginBottom: '5px'}}
                      className={
                        brandTitleEn === ''
                          ? 'col-form-label form-control form-control-lg form-control-solid  is-invalid'
                          : 'col-form-label form-control form-control-lg form-control-solid  is-valid'
                      }
                    />
                  </div>
                </div>
                <div className={'row 12'}>
                  <div className='col-sm-3'>
                    <label className='col-form-label col-sm-4'> نام برند فرعی </label>
                  </div>
                  <div className='col-sm-3'>
                    <input
                      value={subBrandTitleFa}
                      onChange={(e) => setsubBrandTitleFa(e.target.value)}
                      style={{marginBottom: '5px'}}
                      className={
                        subBrandTitleFa === ''
                          ? 'col-form-label form-control form-control-lg form-control-solid  is-invalid'
                          : 'col-form-label form-control form-control-lg form-control-solid  is-valid'
                      }
                    />
                  </div>

                  <div className='col-sm-3'>
                    <label className='col-form-label col-sm-4'> Sub Brand </label>
                  </div>
                  <div className='col-sm-3'>
                    <input
                      value={subBrandTitleEn}
                      onChange={(e) => setsubBrandTitleEn(e.target.value)}
                      style={{marginBottom: '5px'}}
                      className={
                        subBrandTitleEn === ''
                          ? 'col-form-label form-control form-control-lg form-control-solid  is-invalid'
                          : 'col-form-label form-control form-control-lg form-control-solid  is-valid'
                      }
                    />
                  </div>
                </div>

                <div className={'row 12'}>
                  <div className='col-sm-3'>
                    <label className='col-form-label col-sm-4'> شرح محصول </label>
                  </div>
                  <div className='col-sm-3'>
                    <input
                      value={productDescriptionFa}
                      onChange={(e) => setproductDescriptionFa(e.target.value)}
                      style={{marginBottom: '5px'}}
                      className={
                        productDescriptionFa === ''
                          ? 'col-form-label form-control form-control-lg form-control-solid  is-invalid'
                          : 'col-form-label form-control form-control-lg form-control-solid  is-valid'
                      }
                    />
                  </div>

                  <div className='col-sm-3'>
                    <label className='col-form-label col-sm-4'> Product Description </label>
                  </div>
                  <div className='col-sm-3'>
                    <input
                      value={productDescriptionEn}
                      onChange={(e) => setproductDescriptionEn(e.target.value)}
                      style={{marginBottom: '5px'}}
                      className={
                        productDescriptionEn === ''
                          ? 'col-form-label form-control form-control-lg form-control-solid  is-invalid'
                          : 'col-form-label form-control form-control-lg form-control-solid  is-valid'
                      }
                    />
                  </div>
                </div>
                <div className={'row 12'}>
                  <div className='col-sm-3'>
                    <label className='col-form-label col-sm-4'> ایران کد </label>
                  </div>
                  <div className='col-sm-3'>
                    <input
                      value={iranCode}
                      onChange={(e) => setiranCode(e.target.value)}
                      style={{marginBottom: '5px'}}
                      className={
                        iranCode === ''
                          ? 'col-form-label form-control form-control-lg form-control-solid  is-invalid'
                          : 'col-form-label form-control form-control-lg form-control-solid  is-valid'
                      }
                    />
                  </div>

                  <div className='col-sm-3'>
                    <label className='col-form-label col-sm-4'> SKU </label>
                  </div>
                  <div className='col-sm-3'>
                    <input
                      value={sku}
                      onChange={(e) => setsku(e.target.value)}
                      style={{marginBottom: '5px'}}
                      className={
                        sku === ''
                          ? 'col-form-label form-control form-control-lg form-control-solid  is-invalid'
                          : 'col-form-label form-control form-control-lg form-control-solid  is-valid'
                      }
                    />
                  </div>
                </div>

                <div className={'row 12'}>
                  <div className='col-sm-3'>
                    <label className='col-form-label col-sm-4'> محتوی خالص </label>
                  </div>
                  <div className='col-sm-3'>
                    <input
                      value={pureContentAmount}
                      onChange={(e) => setpureContentAmount(e.target.value)}
                      style={{marginBottom: '5px'}}
                      className={
                        pureContentAmount === ''
                          ? 'col-form-label form-control form-control-lg form-control-solid  is-invalid'
                          : 'col-form-label form-control form-control-lg form-control-solid  is-valid'
                      }
                    />
                  </div>

                  <div className='col-sm-3'>
                    <label className='col-form-label col-sm-4'> واحد محتوی خالص </label>
                  </div>
                  <div className='col-sm-3'>
                    <ComboBox
                      onChange={handleChangepureContentUnitId}
                      style={{direction: 'rtl'}}
                      endpoint={API_URL + 'PureContentUnits/Search'}
                    />
                  </div>
                </div>

                <div className={'row 12'}>
                  <div className='col-sm-3'>
                    <label className='col-form-label col-sm-4'> شرح برچسب محصول </label>
                  </div>
                  <div className='col-sm-3'>
                    <input
                      value={labelDescriptionFa}
                      onChange={(e) => setlabelDescriptionFa(e.target.value)}
                      style={{marginBottom: '5px'}}
                      className={
                        labelDescriptionFa === ''
                          ? 'col-form-label form-control form-control-lg form-control-solid  is-invalid'
                          : 'col-form-label form-control form-control-lg form-control-solid  is-valid'
                      }
                    />
                  </div>

                  <div className='col-sm-3'>
                    <label className='col-form-label col-sm-4'> Label Desc </label>
                  </div>
                  <div className='col-sm-3'>
                    <input
                      value={labelDescriptionEn}
                      onChange={(e) => setlabelDescriptionEn(e.target.value)}
                      style={{marginBottom: '5px'}}
                      className={
                        labelDescriptionEn === ''
                          ? 'col-form-label form-control form-control-lg form-control-solid  is-invalid'
                          : 'col-form-label form-control form-control-lg form-control-solid  is-valid'
                      }
                    />
                  </div>
                </div>
                <div className={'row 12'}>
                  <div className='col-sm-3'>
                    <label className='col-form-label col-sm-4'> کشور سازنده </label>
                  </div>
                  <div className='col-sm-3'>
                    <ComboBox
                      onChange={handleChangeoriginCountryId}
                      style={{direction: 'rtl'}}
                      endpoint={API_URL + 'OriginCountrys/Search'}
                    />
                  </div>

                  <div className='col-sm-3'>
                    <label className='col-form-label col-sm-4'> بازار هدف </label>
                  </div>
                  <div className='col-sm-3'>
                    <ComboBox
                      onChange={handleChangetargetMarketId}
                      textField='title'
                      style={{direction: 'rtl'}}
                      endpoint={API_URL + 'TargetMarkets/Search'}
                    />
                  </div>
                </div>
                <div className={'row 12'}>
                  <div className='col-sm-3'>
                    <label className='col-form-label col-sm-4'> زبان </label>
                  </div>
                  <div className='col-sm-3'>
                    <ComboBoxLocal
                      onChange={handleChangelanguageId}
                      style={{direction: 'rtl'}}
                      endpoint={API_URL + 'Languages/Search'}
                      filldata={countingUnit}
                    ></ComboBoxLocal>
                  </div>

                  <div className='col-sm-3'>
                    <label className='col-form-label col-sm-4'> آیا این محصول صادراتی است؟ </label>
                  </div>
                  <div className='col-sm-3'>
                    <label style={{marginTop: '10px'}}>
                      بله
                      <input
                        className='form-check-input'
                        type='radio'
                        name='isExportablerdo'
                        value={'false'}
                        checked={isExportable === isExportable}
                        onChange={(e) => setisExportable(isExportable)}
                      />
                    </label>
                    <label>
                      خیر
                      <input
                        className='form-check-input'
                        type='radio'
                        name='isExportablerdo'
                        value={'true'}
                        checked={isExportable !== isExportable}
                        onChange={(e) => setisExportable(isExportable)}
                      />
                    </label>
                  </div>
                </div>
                <div className={'row 12'}>
                  <div className='col-sm-3'>
                    <label className='col-form-label col-sm-4'> واحد ابعاد </label>
                  </div>
                  <div className='col-sm-3'>
                    <ComboBox
                      onChange={handleChangeunitOfMeasurementId}
                      style={{direction: 'rtl'}}
                      endpoint={API_URL + 'UnitOfMeasurements/Search'}
                    />
                  </div>

                  <div className='col-sm-3'>
                    <label className='col-form-label col-sm-4'> واحد وزن </label>
                  </div>
                  <div className='col-sm-3'>
                    <ComboBox
                      onChange={handleChangeunitOfWeightId}
                      textField='title'
                      style={{direction: 'rtl'}}
                      endpoint={API_URL + 'UnitOfWeights/Search'}
                    />
                  </div>
                </div>
                <div className={'row 12'}>
                  <div className='col-sm-3'>
                    <label className='col-form-label col-sm-4'> طول </label>
                  </div>
                  <div className='col-sm-3'>
                    <input
                      value={length}
                      onChange={(e) => setlength(e.target.value)}
                      style={{marginBottom: '5px'}}
                      className={
                        length === ''
                          ? 'col-form-label form-control form-control-lg form-control-solid  is-invalid'
                          : 'col-form-label form-control form-control-lg form-control-solid  is-valid'
                      }
                    />
                  </div>

                  <div className='col-sm-3'>
                    <label className='col-form-label col-sm-4'> وزن خالص </label>
                  </div>
                  <div className='col-sm-3'>
                    <input
                      value={pureWeight}
                      onChange={(e) => setpureWeight(e.target.value)}
                      style={{marginBottom: '5px'}}
                      className={
                        pureWeight === ''
                          ? 'col-form-label form-control form-control-lg form-control-solid  is-invalid'
                          : 'col-form-label form-control form-control-lg form-control-solid  is-valid'
                      }
                    />
                  </div>
                </div>
                <div className={'row 12'}>
                  <div className='col-sm-3'>
                    <label className='col-form-label col-sm-4'> عرض </label>
                  </div>
                  <div className='col-sm-3'>
                    <input
                      value={width}
                      onChange={(e) => setwidth(e.target.value)}
                      style={{marginBottom: '5px'}}
                      className={
                        width === ''
                          ? 'col-form-label form-control form-control-lg form-control-solid  is-invalid'
                          : 'col-form-label form-control form-control-lg form-control-solid  is-valid'
                      }
                    />
                  </div>

                  <div className='col-sm-3'>
                    <label className='col-form-label col-sm-4'> وزن ناخالص </label>
                  </div>
                  <div className='col-sm-3'>
                    <input
                      value={imPureWeight}
                      onChange={(e) => setimPureWeight(e.target.value)}
                      style={{marginBottom: '5px'}}
                      className={
                        imPureWeight === ''
                          ? 'col-form-label form-control form-control-lg form-control-solid  is-invalid'
                          : 'col-form-label form-control form-control-lg form-control-solid  is-valid'
                      }
                    />
                  </div>
                </div>
                <div className={'row 12'}>
                  <div className='col-sm-3'>
                    <label className='col-form-label col-sm-4'> ارتفاع </label>
                  </div>
                  <div className='col-sm-3'>
                    <input
                      value={height}
                      onChange={(e) => setheight(e.target.value)}
                      style={{marginBottom: '5px'}}
                      className={
                        height === ''
                          ? 'col-form-label form-control form-control-lg form-control-solid  is-invalid'
                          : 'col-form-label form-control form-control-lg form-control-solid  is-valid'
                      }
                    />
                  </div>

                  <div className='col-sm-3'></div>
                  <div className='col-sm-3'></div>
                </div>
                <div className={'row 12'}>
                  <div className='col-sm-4'>
                    <label>
                      <input
                        type='checkbox'
                        defaultChecked={ISBusinessUnitBaseLevel}
                        onChange={(e) => setISBusinessUnitBaseLevel(e.target.checked)}
                      />
                      آیا یک واحد قلم تجاری سطح پایه است
                    </label>
                  </div>
                  <div className='col-sm-4'>
                    <label>
                      <input
                        type='checkbox'
                        defaultChecked={ISBusinessUnitConsumer}
                        onChange={(e) => setISBusinessUnitConsumer(e.target.checked)}
                      />
                      آیا یک واحد قلم تجاری مصرفی است
                    </label>
                  </div>
                  <div className='col-sm-4'>
                    <label>
                      <input
                        type='checkbox'
                        defaultChecked={ISBusinessUnitBillable}
                        onChange={(e) => setISBusinessUnitBillable(e.target.checked)}
                      />
                      آیا یک واحد قلم تجاری فاکتور کردنی است
                    </label>
                  </div>
                  <div className='col-sm-4'>
                    <label>
                      <input
                        type='checkbox'
                        defaultChecked={ISBusinessUnitOrderable}
                        onChange={(e) => setISBusinessUnitOrderable(e.target.checked)}
                      />
                      آیا یک واحد قلم تجاری سفارش دادنی است
                    </label>
                  </div>
                  <div className='col-sm-4'>
                    <label>
                      <input
                        type='checkbox'
                        defaultChecked={ISBusinessUnitTransportable}
                        onChange={(e) => setISBusinessUnitTransportable(e.target.checked)}
                      />
                      آیا یک واحد قلم تجاری حمل کردنی است
                    </label>
                  </div>
                  <div className='col-sm-4'>
                    <label>
                      <input
                        type='checkbox'
                        defaultChecked={ISBusinessUnitWithVariableMeasurement}
                        onChange={(e) => setISBusinessUnitWithVariableMeasurement(e.target.checked)}
                      />
                      آیا یک واحد قلم تجاری با اندازه متغیر است
                    </label>
                  </div>
                </div>

                {/* //// */}
                <div className={'row 12'}>
                  <div className='col-sm-8'> </div>
                  <div className='col-sm-2'>
                    <button
                      type='submit'
                      id='kt_sign_up_submit'
                      className='btn btn-lg btn-primary w-100 mb-5'
                      onClick={backtab4}
                    >
                      {<span className='indicator-label'>مرحله قبل </span>}
                    </button>
                  </div>
                  <div className='col-sm-2'>
                    <button
                      disabled={
                        functionalNameFa === '' ||
                        functionalNameEn === '' ||
                        payeInfoName === '' ||
                        GpcName === '' ||
                        ShenaseName === '' ||
                        productTypeFa === '' ||
                        productTypeEn === '' ||
                        brandTitleFa === '' ||
                        brandTitleEn === '' ||
                        subBrandTitleFa === '' ||
                        subBrandTitleEn === '' ||
                        productDescriptionFa === '' ||
                        productDescriptionEn === '' ||
                        iranCode === '' ||
                        sku === '' ||
                        pureContentAmount === '' ||
                        labelDescriptionFa === '' ||
                        labelDescriptionEn === '' ||
                        height === '' ||
                        length === '' ||
                        pureWeight === '' ||
                        width === '' ||
                        width === ''
                      }
                      type='submit'
                      id='kt_sign_up_submit'
                      className='btn btn-lg btn-primary w-100 mb-5'
                      onClick={nexttab4}
                    >
                      {<span className='indicator-label'>مرحله بعد </span>}
                    </button>
                  </div>
                  <div className='col-sm-6'></div>
                </div>
              </div>
            </div>
          )}
          {tab5 && (
            <div>
              <div>
                <div
                  className={'row 12'}
                  style={{direction: 'rtl', padding: '50', height: '100px'}}
                >
                  <div className='col-sm-6'>
                    {files.map(function (data) {
                      return (
                        <div className='container row col-md-12'>
                          <label className='col-sm-12 col-form-label'>{data.titleFa} </label>

                          <label className='k-button col-sm-6' style={{height: '42px'}}>
                            <label id={'fileName-' + data.fileTypeId}>{'انتخاب فایل'}</label>
                            <input
                              style={{visibility: 'hidden'}}
                              id={'file-' + data.fileTypeId}
                              type='file'
                              onChange={(e) => selectfile(e, data.fileTypeId)}
                            />
                          </label>

                          <label
                            className='k-button col-sm-1 btn btn-icon btn-bg-light btn-active-color-danger '
                            onClick={(e) => handleResetClick(data.fileTypeId)}
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
                    {/* {files.map(function (data) {
                      return (
                        <div className='row col-md-12'>
                          <div className='col-sm-2'>
                            <label style={{padding: 10}}>{data.titleFa}</label>
                          </div>
                          <div className='col-sm-4'>
                            <input
                              id={'file-' + data.fileTypeId}
                              defaultValue={[]}
                              //accept='.pdf,.image/jpeg'
                              //accept={'application/' + data.allowedFormat[0]}
                              type='file'
                              onChange={(e) => selectfile(e, data.fileTypeId)}
                            />
                          </div>
                         
                        </div>
                      )
                    })} */}
                  </div>

                  <div className='col-sm-6'>
                    {files.map(function (data) {
                      return (
                        <div className='row col-md-12'>
                          <div className='col-sm-2'>
                            <label style={{padding: 10}}>{data.titleFa}</label>
                          </div>

                          <div className='col-sm-4'>
                            <input
                              className='col-form-label form-control form-control-lg form-control-solid'
                              name={'txt-' + data.fileTypeId}
                              id={'id-' + data.fileTypeId}
                              onBlur={handleChange}
                              style={{marginBottom: '5px'}}
                            />
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>

                <div className={'row 12'}>
                  <div className='col-sm-8'> </div>
                  <div className='col-sm-2'>
                    <button
                      type='submit'
                      id='kt_sign_up_submit'
                      className='btn btn-lg btn-primary w-100 mb-5'
                      onClick={backtab5}
                    >
                      {<span className='indicator-label'>مرحله قبل </span>}
                    </button>
                  </div>
                  <div className='col-sm-2'>
                    <button
                      type='submit'
                      id='kt_sign_up_submit'
                      className='btn btn-lg btn-primary w-100 mb-5'
                      onClick={save}
                    >
                      {<span className='indicator-label'>ثبت </span>}
                    </button>
                  </div>
                  <div className='col-sm-6'></div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  )
}
