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

type PropsType = {
  AgentID: number
  onClose: () => void
}

export function AgentContactInfos({AgentID, onClose}: PropsType) {
  const intl = useIntl()
  const API_URL = process.env.REACT_APP_API_URL || 'api'
  const [AddressFa, setAddressFa] = useState('')
  const [AddressEn, setAddressEn] = useState('')
  const [Tel, setTel] = useState('')
  const [Mobile, setMobile] = useState('')
  const [PostalCode, setPostalCode] = useState('')
  const [Fax, setFax] = useState('')
  const [Website, setWebsite] = useState('')
  const [AgentContactInfosCity, setAgentContactInfosCity] = useState(0)
  const [AgentContactInfosAddressType, setAgentContactInfosAddressType] = useState(0)
  const [refresh, setRefresh] = useState(1)
  const saveAddress = async () => {
    try {
      let url = API_URL + 'agentContactInfos'
      var data = {
        agentId: AgentID,
        AddressFa: AddressFa,
        AddressEn: AddressEn,
        Tel: Tel,
        Mobile: Mobile,
        PostalCode: PostalCode,
        Fax: Fax,
        Website: Website,
        CityId: AgentContactInfosCity,
        AddressTypeId: AgentContactInfosAddressType,
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
  const handleChangeagentCity = (event: any) => {
    setAgentContactInfosCity(event)
  }
  const handleChangeagentAddressType = (event: any) => {
    setAgentContactInfosAddressType(event)
  }
  return (
    <div>
      <div className='row g-3'>
        <FormControl col={4} label={intl.formatMessage({id: 'Model.AgentContactInfos.AddressFa'})}>
          <input
            className={
              AddressFa === ''
                ? 'form-control form-control-lg form-control-solid  is-invalid'
                : 'form-control form-control-lg form-control-solid  is-valid'
            }
            onChange={(e) => setAddressFa(e.target.value)}
          />
        </FormControl>
        <FormControl col={4} label={intl.formatMessage({id: 'Model.AgentContactInfos.AddressEn'})}>
          <input
            className={
              AddressEn === ''
                ? 'form-control form-control-lg form-control-solid  is-invalid'
                : 'form-control form-control-lg form-control-solid  is-valid'
            }
            onChange={(e) => setAddressEn(e.target.value)}
          />
        </FormControl>
        <FormControl
          col={4}
          label={intl.formatMessage({id: 'Model.AgentContactInfos.Tel'})}
          data={Tel}
          tvalidate={4}
          len={11}
          begin={'0'}
        >
          <input onChange={(e) => setTel(e.target.value)} />
        </FormControl>
        <FormControl
          col={4}
          label={intl.formatMessage({id: 'Model.AgentContactInfos.Mobile'})}
          data={Mobile}
          tvalidate={1}
        >
          <input onChange={(e) => setMobile(e.target.value)} />
        </FormControl>
        <FormControl
          col={4}
          label={intl.formatMessage({id: 'Model.AgentContactInfos.PostalCode'})}
          data={PostalCode}
          tvalidate={4}
          len={10}
        >
          <input onChange={(e) => setPostalCode(e.target.value)} />
        </FormControl>
        <FormControl
          col={4}
          label={intl.formatMessage({id: 'Model.AgentContactInfos.Fax'})}
          data={Fax}
          tvalidate={4}
          len={11}
          begin={'0'}
        >
          <input onChange={(e) => setFax(e.target.value)} />
        </FormControl>
        <FormControl col={4} label={intl.formatMessage({id: 'Model.AgentContactInfos.Website'})}>
          <input
            className={
              Website === ''
                ? 'col-form-label form-control form-control-lg form-control-solid  is-invalid'
                : 'col-form-label form-control form-control-lg form-control-solid  is-valid'
            }
            onChange={(e) => setWebsite(e.target.value)}
          />
        </FormControl>
        <FormControl col={4} label={intl.formatMessage({id: 'Model.Agents.CityId'})}>
          <ComboBox endpoint={API_URL + 'Cities/GetSelectList'} onChange={handleChangeagentCity} />
        </FormControl>
        <FormControl
          col={4}
          label={intl.formatMessage({id: 'Model.AgentContactInfos.AddressTypeId'})}
        >
          <ComboBox
            endpoint={API_URL + 'AddressType/GetSelectList'}
            onChange={handleChangeagentAddressType}
          />
        </FormControl>
      </div>
      <div className='row'>
        <div className='card card-px-0 shadow'>
          <div className='card-body'>
            <Grid
              style={{
                height: '300px',
              }}
              refresh={refresh}
              endpoint={API_URL + 'agentContactInfoes'}
              showDel
              //onAction={hanleActions}
              filterPar={'&AgentId=' + AgentID}
            >
              <GridColumn
                field='addressFa'
                title={intl.formatMessage({id: 'Model.AgentContactInfos.AddressFa'})}
              />
              <GridColumn
                field='addressEn'
                title={intl.formatMessage({id: 'Model.AgentContactInfos.AddressEn'})}
              />
            </Grid>
          </div>
        </div>
      </div>
      <div style={{float: left}}>
        <button
          disabled={
            AddressFa === '' ||
            AddressEn === '' ||
            Tel === '' ||
            Mobile === '' ||
            PostalCode === '' ||
            Fax === '' ||
            Website === '' ||
            AgentContactInfosAddressType === 0 ||
            AgentContactInfosCity === 0
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
