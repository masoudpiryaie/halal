import React, {useEffect, useState} from 'react'
import {Dialog} from '@progress/kendo-react-dialogs'
import {defaultPageTitles, FormMode} from '@core/forms'
import axios from 'axios'
import {toast} from 'react-toastify'
import {FieldError, useForm} from 'react-hook-form'
import {FormControl, DialogActions, ComboBoxLocaltow} from '@core/components'
import {useIntl} from 'react-intl'
import {KTSVG} from '_metronic/helpers'
import {useLayout} from '_metronic/layout/core'
type PropsType = {
  mode: FormMode
  onClose: () => void
  item?: PackagesModel
}
export type PackagesModel = {
  id?: number
  title: string
  isForAgent: boolean
  isInitial: boolean
  type: number
  packageItems: any[]
}
export type packageItemsModel = {
  productId: number
  count: number
}

const pageTitles = defaultPageTitles

export function PackagesCreateDialog({mode, onClose, item}: PropsType) {
  const intl = useIntl()
  const API_URL = process.env.REACT_APP_API_URLCoding || 'api'
  const [count, setCount] = useState('')
  const [packageTypes, setPackageTypes] = useState(0)
  const [product, setProduct] = useState(0)
  const [productTitle, setProductTitle] = useState('')

  const {config} = useLayout()
  const [packageTypesList, fillPackageTypes] = useState<any[]>([])
  const [productList, fillProduct] = useState<any[]>([])
  const [isForAgent, setisForAgent] = useState(false)
  const [isInitial, setisInitial] = useState(false)

  const {
    register,
    handleSubmit,
    reset,
    formState: {errors, isDirty, touchedFields},
  } = useForm<PackagesModel>({mode: 'all'})

  useEffect(() => {
    fetchPackageTypes()
    fetchProduct()
    if (mode === 'edit') {
      reset(item)
      debugger
      if (item?.packageItems !== undefined) {
        for (var i = 0; i < item?.packageItems.length; i++) {
          dataList.push({
            productId: item?.packageItems[i].product.id,
            count: item?.packageItems[i].count,
            productTitle: item?.packageItems[i].product.title,
          })
        }
      }
    }
  }, [mode, item, reset])
  const fetchPackageTypes = async () => {
    try {
      let url = API_URL + 'Products/GetProductTypes'
      const resp = await axios.get(url)

      fillPackageTypes(resp.data.value)
    } catch (error) {
      console.log(error)
    }
  }
  const fetchProduct = async () => {
    try {
      let url = API_URL + 'Products/GetDropDown'
      const resp = await axios.get(url)

      fillProduct(resp.data.value)
    } catch (error) {
      console.log(error)
    }
  }

  const onSubmit = handleSubmit(async (data) => {
    debugger
    let url = API_URL + 'Packages'
    data.type = packageTypes
    data.isForAgent = true
    data.isInitial = true
    var packageItems = []
    for (var i = 0; i < dataList.length; i++) {
      packageItems.push({productId: dataList[i].productId, count: dataList[i].count})
    }
    data.packageItems = packageItems
    try {
      if (mode !== 'edit') {
        await axios.post(url, data)
      } else {
        await axios.put(url, data)
      }
      toast.info(intl.formatMessage({id: 'MENU.ACTIONSuccess'}))
      onClose()
    } catch (e: any) {
      if (!e.processed) {
        toast.error(intl.formatMessage({id: 'MENU.ACTIONError'}))
      }
    }
  })

  const resetForm = () => {
    reset()
    if (isDirty) {
    }
  }
  const getValidationClass = (touched: boolean | undefined, error: FieldError | undefined) => {
    return error ? 'is-invalid' : 'is-valid'
  }
  const typecbtn = (e: any) => {
    setProduct(e.id)
    setProductTitle(e.title)
    debugger
  }
  const chngPackageTypes = (e: any) => {
    setPackageTypes(e.id)
  }

  const [dataList, setdataList] = React.useState<Array<any>>([])
  const FileAddlist = () => {
    debugger
    if (count === '' || product === 0) {
      toast.info('اطلاعات را کامل کنید', {
        position: 'top-center',
      })
    } else {
      dataList.push({
        productId: product,
        count: count,
        productTitle: productTitle,
      })
      // const newItem = [...dataList]
      // newItem[dataList.length] = {
      //   fileTypeId: fileTypeId,
      //   file: fileList[dataList.length].file,
      //   fileTypeTitle: fileTypeTitle,
      //   fileDescription: desc,
      // }
      // setdataList(newItem)
      setCount('')
      setProduct(0)
      setProductTitle('')
    }
  }
  const handleDeleteFileItem = (id: any) => {
    debugger
    const newList = dataList.filter((part) =>
      part.productId === undefined ? part.productId !== id : part.productId !== id
    )
    setdataList([])
    setdataList(newList)
    //dataList.push(newList)
  }
  return (
    <div>
      <Dialog title={pageTitles[mode]} onClose={onClose}>
        <div>
          <form id='dialog-form' onSubmit={onSubmit} className='row g-3'>
            <FormControl col={6} label='عنوان'>
              <input
                className={getValidationClass(touchedFields.title, errors.title)}
                autoFocus={true}
                {...register('title', {required: true})}
              />
            </FormControl>
            <FormControl col={6} label={'نوع '}>
              <ComboBoxLocaltow
                endpoint={API_URL + '/Packages/GetPackageTypes'}
                onChange={(e: any) => chngPackageTypes(e)}
                filldata={packageTypesList}
                className='form-control'
              />
            </FormControl>
            <div className={'row 12'}>
              <div className='col-sm-6'>
                <label>
                  <input
                    type='checkbox'
                    defaultChecked={isForAgent}
                    onChange={(e) => setisForAgent(e.target.checked)}
                  />
                  بسته آغازین(عضویت)
                </label>
              </div>
              <div className='col-sm-6'>
                <label>
                  <input
                    type='checkbox'
                    defaultChecked={isInitial}
                    onChange={(e) => setisInitial(e.target.checked)}
                  />
                  بسته مخصوص نماینندگی
                </label>
              </div>
            </div>
          </form>

          <div>
            <div className=' card card-px-0 mb-2 shadow '>
              <div className='card-body' style={{margin: '5px'}}>
                <div className='row'>
                  {' '}
                  <FormControl col={6} label={'محصول '}>
                    <ComboBoxLocaltow
                      endpoint={API_URL + '/Products/GetProducts'}
                      onChange={(e: any) => typecbtn(e)}
                      filldata={productList}
                      className='form-control'
                    />
                  </FormControl>
                  <div className='col-5'>
                    <div className='row'>
                      <div className='col-4'>
                        <label className='col-sm-4 col-form-label'>تعداد</label>
                      </div>
                      <div className='col-8'>
                        <input
                          value={count}
                          onChange={(e) => setCount(e.target.value)}
                          className={
                            count === ''
                              ? 'col-form-label form-control form-control-lg form-control-solid  is-invalid'
                              : 'col-form-label form-control form-control-lg form-control-solid  is-valid'
                          }
                        />
                      </div>
                    </div>
                  </div>
                  <div className='col-1'>
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
                    {'تعداد'}{' '}
                  </label>

                  <label
                    className='col-sm-2 col-form-label'
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
                        backgroundColor:
                          index % 2 === 0 ? '#ffffff' : config.main?.primaryColor + '21',
                      }}
                    >
                      <label
                        className='col-sm-4 col-form-label'
                        style={{
                          border: 'solid 1px rgb(222, 226, 230)',
                        }}
                      >
                        {data.productTitle}{' '}
                      </label>
                      <label
                        className='col-sm-6 col-form-label'
                        style={{
                          border: 'solid 1px rgb(222, 226, 230)',
                        }}
                      >
                        {data.count}{' '}
                      </label>

                      <label
                        style={{
                          border: 'solid 1px rgb(222, 226, 230)',
                        }}
                        className='col-sm-2  k-button  btn btn-icon  btn-color-danger '
                        onClick={(e) => handleDeleteFileItem(data.productId)}
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
        </div>
        <DialogActions mode={mode} onClose={onClose} resetForm={resetForm}></DialogActions>
      </Dialog>
    </div>
  )
}
