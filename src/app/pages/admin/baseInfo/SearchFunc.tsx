import {KTSVG} from '_metronic/helpers'
import {useIntl} from 'react-intl'
import {Controller} from 'react-hook-form'
import {FormControl, ComboBox} from '@core/components'
import {DatePicker} from '@progress/kendo-react-dateinputs'
import {useState} from 'react'
import {useLayout} from '_metronic/layout/core'
type PropsType = {
  x: any
  i: number
  SearchModel: string[]
  handleRemoveClick: (id: number) => void
  handleAddClick: () => void
  handleInputChange: (e: any, i: number) => void
  handleComboChange?: (e: any, i: number) => void
  handleDatePicker?: (e: any, i: number) => void
}
export function SearchFunc({
  x,
  i,
  SearchModel,
  handleRemoveClick,
  handleAddClick,
  handleInputChange,
  handleComboChange,
  handleDatePicker,
}: PropsType) {
  const intl = useIntl()
  const {config} = useLayout()
  const API_URL = process.env.REACT_APP_API_URLCoding || 'api'
  const defaultValue = new Date()
  const [provinces, setProvinces] = useState(API_URL + 'Cities/Search?ProvinceId=0')
  const setProvincesclk = (e: any) => {
    setProvinces(API_URL + 'Cities/Search?ProvinceId=' + e)
  }
  return (
    <div className={'row 12'} style={{padding: '10px'}}>
      <div className='col-sm-2'>
        <select
          className='  form-select  form-select-sm'
          style={{marginLeft: '21px', width: '200px', fontFamily: config.main?.font}}
          name='field'
          onChange={(e) => handleInputChange(e, i)}
        >
          {SearchModel.map((item) => {
            return <option value={item.split('*')[1]}>{item.split('*')[0]}</option>
          })}
        </select>
      </div>
      <div className='col-sm-2'>
        <select
          className='form-select  form-select-sm'
          style={{marginLeft: '21px', width: '200px', fontFamily: config.main?.font}}
          name='operator'
          onChange={(e) => handleInputChange(e, i)}
        >
          <option value='eq'>{intl.formatMessage({id: 'SEARCH.eq'})}</option>
          <option value='neq'>{intl.formatMessage({id: 'SEARCH.nqe'})}</option>
          <option value='contains'>{intl.formatMessage({id: 'SEARCH.contains'})}</option>
          <option value='gte'>{intl.formatMessage({id: 'SEARCH.gte'})}</option>
          <option value='lte'>{intl.formatMessage({id: 'SEARCH.lte'})}</option>
        </select>
      </div>
      <div className='col-sm-5'>
        {x.type === '0' && (
          <input
            style={{width: '30%', display: 'inline'}}
            className={x.value === '' ? 'is-invalid form-control' : 'is-valid form-control'}
            name='value'
            placeholder='Enter Data'
            value={x.value}
            onChange={(e) => handleInputChange(e, i)}
          />
        )}
        {x.type === '1' && (
          <div
            style={{display: 'inline'}}
            className='col form-check form-check-custom form-check-solid form-check-success me-6'
          >
            <label className='form-label' style={{paddingLeft: '15px'}}>
              {' '}
              {intl.formatMessage({id: 'FormControl.Input.Select.All'})}
              <input
                className='form-check-input'
                type='radio'
                name='Active'
                defaultChecked={true}
                value={''}
                onChange={(e) => handleInputChange(e, i)}
              />
            </label>
            <label className='form-label' style={{paddingLeft: '15px'}}>
              {' '}
              {intl.formatMessage({id: 'FormControl.Input.Select.Active'})}
              <input
                className='form-check-input'
                type='radio'
                name='Active'
                value={'true'}
                onChange={(e) => handleInputChange(e, i)}
              />
            </label>
            <label className='form-label' style={{paddingLeft: '15px'}}>
              {' '}
              {intl.formatMessage({id: 'FormControl.Input.Select.Inactive'})}
              <input
                className='form-check-input'
                name='Active'
                type='radio'
                value={'false'}
                onChange={(e) => handleInputChange(e, i)}
              />
            </label>
          </div>
        )}
        {x.type === '2' && (
          <div
            style={{display: 'inline'}}
            className='col form-check form-check-custom form-check-solid form-check-success me-6'
          >
            <ComboBox
              class=''
              // endpoint={
              //   'http://auth.pardcoservice.ir/api/v1/' +
              //   x.field.substring(0, x.field.length - 2) +
              //   's/GetSelectList'
              // }
              endpoint={API_URL + x.field.substring(0, x.field.length - 2) + 's/Search'}
              onChange={
                handleInputChange !== undefined ? (e) => handleInputChange(e, i) : undefined
              }
            />
          </div>
        )}
        {x.type === '3' && (
          <div
            style={{display: 'inline'}}
            className='col form-check form-check-custom form-check-solid form-check-success me-6'
          >
            <DatePicker
              defaultValue={defaultValue}
              onChange={
                handleDatePicker !== undefined
                  ? (e) => {
                      handleDatePicker(e, i)
                    }
                  : undefined
              }
            />
          </div>
        )}
        {x.type === '4' && (
          <div
            style={{display: 'inline'}}
            className='col form-check form-check-custom form-check-solid form-check-success me-6'
          >
            <label className='form-label' style={{paddingLeft: '15px'}}>
              {' '}
              {intl.formatMessage({id: 'FormControl.Input.Select.All'})}
              <input
                className='form-check-input'
                type='radio'
                name='Active'
                defaultChecked={true}
                value={''}
                onChange={(e) => handleInputChange(e, i)}
              />
            </label>
            <label className='form-label' style={{paddingLeft: '15px'}}>
              {' '}
              {intl.formatMessage({id: 'FormControl.Input.Select.Has'})}
              <input
                className='form-check-input'
                type='radio'
                name='Active'
                value={'true'}
                onChange={(e) => handleInputChange(e, i)}
              />
            </label>
            <label className='form-label' style={{paddingLeft: '15px'}}>
              {' '}
              {intl.formatMessage({id: 'FormControl.Input.Select.Hasnot'})}
              <input
                className='form-check-input'
                name='Active'
                type='radio'
                value={'false'}
                onChange={(e) => handleInputChange(e, i)}
              />
            </label>
          </div>
        )}
        {x.type === '5' && (
          <div
            style={{display: 'inline'}}
            className='col form-check form-check-custom form-check-solid form-check-success me-6'
          >
            <ComboBox
              class=''
              endpoint={API_URL + x.field.substring(0, x.field.length - 3) + 'ies/Search'}
              //endpoint='http://auth.pardcoservice.ir/api/v1/AgentTypes/GetSelectList'
              onChange={
                handleInputChange !== undefined ? (e) => handleInputChange(e, i) : undefined
              }
            />
          </div>
        )}
        {x.type === '6' && (
          <div
            style={{display: 'inline'}}
            className='col form-check form-check-custom form-check-solid form-check-success me-6'
          >
            <label className='form-label' style={{paddingLeft: '15px'}}>
              {' '}
              {intl.formatMessage({id: 'FormControl.Input.Select.All'})}
              <input
                className='form-check-input'
                type='radio'
                name='Active'
                defaultChecked={true}
                value={''}
                onChange={(e) => handleInputChange(e, i)}
              />
            </label>
            <label className='form-label' style={{paddingLeft: '15px'}}>
              {' '}
              {intl.formatMessage({id: 'FormControl.Input.Select.Legal'})}
              <input
                className='form-check-input'
                type='radio'
                name='Active'
                value={'true'}
                onChange={(e) => handleInputChange(e, i)}
              />
            </label>
            <label className='form-label' style={{paddingLeft: '15px'}}>
              {' '}
              {intl.formatMessage({id: 'FormControl.Input.Select.Real'})}
              <input
                className='form-check-input'
                name='Active'
                type='radio'
                value={'false'}
                onChange={(e) => handleInputChange(e, i)}
              />
            </label>
          </div>
        )}
        {x.type === '7' && (
          <div
            style={{display: 'inline'}}
            className='col form-check form-check-custom form-check-solid form-check-success me-6'
          >
            <ComboBox class='' endpoint={API_URL + 'Provinces/Search'} onChange={setProvincesclk} />
            <ComboBox
              class=''
              endpoint={provinces}
              onChange={
                handleInputChange !== undefined ? (e) => handleInputChange(e, i) : undefined
              }
            />
          </div>
        )}
        {x.type === '8' && (
          <div className='col-sm-2'>
            <select
              className='form-select  form-select-sm'
              style={{marginLeft: '21px', width: '200px', fontFamily: config.main?.font}}
              onChange={(e) => handleInputChange(e, i)}
              name='value'
              placeholder='Enter Data'
              value={x.value}
            >
              <option value='1'>اصلی</option>
              <option value='2'>فاکتور فروش</option>
              <option value='3'>انتخاب آژانس</option>
            </select>
          </div>
        )}
        {x.type === '9' && (
          <div className='col-sm-2'>
            <select
              className='form-select  form-select-sm'
              style={{marginLeft: '21px', width: '200px', fontFamily: config.main?.font}}
              onChange={(e) => handleInputChange(e, i)}
              name='value'
              placeholder='Enter Data'
              value={x.value}
            >
              <option value='1'>حقیقی</option>
              <option value='2'>حققوقی</option>
            </select>
          </div>
        )}
      </div>
      <div className='col-sm-3'>
        <button
          onClick={() => handleRemoveClick(i)}
          style={{fontFamily: config.main?.font}}
          className='btn btn-icon btn-bg-light btn-color-danger btn-sm me-1'
        >
          <KTSVG path='/media/icons/duotune/general/gen027.svg' className='svg-icon-3' />
        </button>
        <button
          style={{fontFamily: config.main?.font}}
          onClick={handleAddClick}
          className='btn btn-icon btn-bg-light btn-color-success btn-sm me-1'
        >
          <KTSVG path='/media/icons/duotune/general/gen035.svg' className='svg-icon-3' />
        </button>
      </div>
    </div>
  )
}
