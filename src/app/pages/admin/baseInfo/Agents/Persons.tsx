import {GridColumn} from '@progress/kendo-react-grid'
import {useEffect, useState} from 'react'
import {Dialog} from '@progress/kendo-react-dialogs'
import {defaultPageTitles, FormMode} from '@core/forms'
import axios from 'axios'
import {toast} from 'react-toastify'
import {FieldError, useForm} from 'react-hook-form'
import {FormControl, DialogActions, Grid, ComboBox} from '@core/components'
//import {Embark_ProductModel} from './AgentsCreateDialog'
import {useIntl} from 'react-intl'
import {KTSVG} from '_metronic/helpers'
import {left} from '@popperjs/core'
import DatePicker from 'react-datepicker2'
import clsx from 'clsx'
import moment from 'jalali-moment'
//import * as getData from '../modules/auth/components/Validation'

type PropsType = {
  AgentID: number
  Type: number
  onClose: () => void
}

export function Persons({AgentID, Type, onClose}: PropsType) {
  const intl = useIntl()
  const API_URL = process.env.REACT_APP_API_URL || 'api'
  const [NationalCode, setNationalCode] = useState('')
  const [LastNameEn, setLastNameEn] = useState('')
  const [LastNameFa, setLastNameFa] = useState('')
  const [FatherName, setFatherName] = useState('')
  const [Mobile, setMobile] = useState('')
  const [Email, setEmail] = useState('')
  const [Tel, setTel] = useState('')
  const [FirstNameEn, setFirstNameEn] = useState('')
  const [FirstNameFa, setFirstNameFa] = useState('')
  const [InternalTel, setInternalTel] = useState('')
  const [isMalep, setIsMalep] = useState('true')

  // const [AgentContactInfosCity, setAgentContactInfosCity] = useState(0)
  const [refresh, setRefresh] = useState(1)
  const [birthDate, setBirthDate] = useState(moment())
  const saveAddress = async () => {
    try {
      let url = API_URL + 'agentPeople'
      var data = {
        agentId: AgentID,
        nationalCode: NationalCode,
        firstNameFa: FirstNameFa,
        lastNameFa: LastNameFa,
        firstNameEn: FirstNameEn,
        lastNameEn: LastNameEn,
        fatherName: FatherName,
        birthDate: birthDate,
        mobile: Mobile,
        email: Email,
        tel: Tel,
        internalTel: InternalTel,
        type: Type,
        position: 'string',
        gender: 1,
      }
      await axios.post(url, data)
      toast.info(intl.formatMessage({id: 'MENU.ACTIONSuccess'}))
    } catch (e: any) {
      if (!e.processed) {
        debugger
        toast.error(intl.formatMessage({id: 'MENU.ACTIONError'}))
      }
    }
    setRefresh(Math.random())
  }
  // const handleChangeagentCity = (event: any) => {
  //   setAgentContactInfosCity(event)
  // }

  return (
    <div>
      <div className='row g-3'>
        <div className='col-sm-12 form-check form-check-custom form-check-solid form-check-success me-6'>
          <label className='form-label'>
            {intl.formatMessage({id: 'Model.Agents.Male'})}
            <input
              className='form-check-input'
              type='radio'
              name='Malep'
              value={'true'}
              checked={isMalep === 'true'}
              onChange={(e) => setIsMalep(e.target.value)}
            />
          </label>

          <label className='form-label'>
            {intl.formatMessage({id: 'Model.Agents.Female'})}
            <input
              className='form-check-input'
              type='radio'
              name='Malep'
              value={'false'}
              checked={isMalep === 'false'}
              onChange={(e) => setIsMalep(e.target.value)}
            />
          </label>
        </div>
        <FormControl
          col={4}
          label={intl.formatMessage({id: 'Model.Persons.NationalCode'})}
          data={NationalCode}
          tvalidate={3}
        >
          <input onChange={(e) => setNationalCode(e.target.value)} />
        </FormControl>

        <FormControl col={4} label={intl.formatMessage({id: 'Model.Persons.LastNameEn'})}>
          <input
            className={
              LastNameEn === ''
                ? 'form-control form-control-lg form-control-solid  is-invalid'
                : 'form-control form-control-lg form-control-solid  is-valid'
            }
            onChange={(e) => setLastNameEn(e.target.value)}
          />
        </FormControl>
        <FormControl col={4} label={intl.formatMessage({id: 'Model.Persons.LastNameFa'})}>
          <input
            className={
              LastNameFa === ''
                ? 'form-control form-control-lg form-control-solid  is-invalid'
                : 'form-control form-control-lg form-control-solid  is-valid'
            }
            onChange={(e) => setLastNameFa(e.target.value)}
          />
        </FormControl>
        <FormControl col={4} label={intl.formatMessage({id: 'Model.Persons.FatherName'})}>
          <input
            className={
              FatherName === ''
                ? 'form-control form-control-lg form-control-solid  is-invalid'
                : 'form-control form-control-lg form-control-solid  is-valid'
            }
            onChange={(e) => setFatherName(e.target.value)}
          />
        </FormControl>
        <FormControl
          col={4}
          label={intl.formatMessage({id: 'Model.Persons.Mobile'})}
          data={Mobile}
          tvalidate={1}
        >
          <input onChange={(e) => setMobile(e.target.value)} />
        </FormControl>
        <FormControl
          col={4}
          label={intl.formatMessage({id: 'Model.Persons.Email'})}
          data={Email}
          tvalidate={2}
        >
          <input onChange={(e) => setEmail(e.target.value)} />
        </FormControl>
        <FormControl
          col={4}
          label={intl.formatMessage({id: 'Model.Persons.Tel'})}
          data={Tel}
          tvalidate={4}
          len={11}
          begin={'0'}
        >
          <input onChange={(e) => setTel(e.target.value)} />
        </FormControl>
        <FormControl col={4} label={intl.formatMessage({id: 'Model.Persons.FirstNameEn'})}>
          <input
            className={
              FirstNameEn === ''
                ? 'col-form-label form-control form-control-lg form-control-solid  is-invalid'
                : 'col-form-label form-control form-control-lg form-control-solid  is-valid'
            }
            onChange={(e) => setFirstNameEn(e.target.value)}
          />
        </FormControl>
        <FormControl col={4} label={intl.formatMessage({id: 'Model.Persons.FirstNameFa'})}>
          <input
            className={
              FirstNameFa === ''
                ? 'col-form-label form-control form-control-lg form-control-solid  is-invalid'
                : 'col-form-label form-control form-control-lg form-control-solid  is-valid'
            }
            onChange={(e) => setFirstNameFa(e.target.value)}
          />
        </FormControl>
        <FormControl
          col={4}
          label={intl.formatMessage({id: 'Model.Persons.InternalTel'})}
          data={InternalTel}
          tvalidate={4}
          len={5}
        >
          <input onChange={(e) => setInternalTel(e.target.value)} />
        </FormControl>
        <div className='row col-md-4'>
          <label className='col-sm-4 col-form-label'>
            {intl.formatMessage({id: 'Model.Persons.BirthDate'})}
          </label>
          <div style={{left: '5px'}} className='col-sm-8'>
            <DatePicker
              className=' form-control'
              isGregorian={false}
              value={birthDate}
              onChange={(value) => setBirthDate(value)}
            />
          </div>
        </div>
        <div className='row col-md-4'>
          <label className='col-sm-4 col-form-label'>
            {intl.formatMessage({id: 'Model.Persons.InActiveDate'})}
          </label>
          <div style={{left: '5px'}} className='col-sm-8'>
            <DatePicker className=' form-control' isGregorian={false} />
          </div>
        </div>
        {/* <FormControl col={4} label={intl.formatMessage({id: 'Model.Agents.CityId'})}>
          <ComboBox endpoint={API_URL + 'Cities/GetSelectList'} onChange={handleChangeagentCity} />
        </FormControl> */}
      </div>
      <div className='row'>
        <div className='card card-px-0 shadow'>
          <div className='card-body'>
            <Grid
              style={{
                height: '300px',
              }}
              refresh={refresh}
              endpoint={API_URL + 'agentPeople'}
              showDel
              filterPar={'&AgentId=' + AgentID}
              //onAction={hanleActions}
              //filter={filter}
            >
              <GridColumn
                field='nationalCode'
                title={intl.formatMessage({id: 'Model.Persons.NationalCode'})}
              />
              <GridColumn field='email' title={intl.formatMessage({id: 'Model.Persons.Email'})} />
            </Grid>
          </div>
        </div>
      </div>
      <div style={{float: left}}>
        <button
          disabled={
            NationalCode === '' ||
            LastNameEn === '' ||
            Tel === '' ||
            Mobile === '' ||
            LastNameFa === '' ||
            FatherName === '' ||
            Email === '' ||
            FirstNameEn === '' ||
            FirstNameFa === '' ||
            InternalTel === ''
          }
          className='k-button k-primary'
          onClick={() => saveAddress()}
        >
          {intl.formatMessage({id: 'MENU.SAVE'})}
        </button>
        <button className='k-button' onClick={onClose}>
          {intl.formatMessage({id: 'MENU.RETURN'})}
        </button>{' '}
      </div>
    </div>
  )
}
