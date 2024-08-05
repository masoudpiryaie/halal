import {GridColumn} from '@progress/kendo-react-grid'
import {FormControl, Grid, BtnAction} from '@core/components'
import {useState} from 'react'
import {useIntl} from 'react-intl'
import {FormMode} from '@core/forms'
import {PageTitle, PageActions} from '_metronic/layout/core'
import {useForm} from 'react-hook-form'
import {CompositeFilterDescriptor} from '@progress/kendo-data-query'
import {generateFilter, generateFiltereq} from '@core/utils'
import {CountryModel, CountryCreateDialog} from './CountryCreateDialog'
import {CityInContryCreateDialog} from './CityInContryCreateDialog'
import {StateCreateDialog} from './StateCreateDialog'
export interface IModelGr {
  title: string
  field: string
  show: boolean
}
export function CountryPage() {
  const intl = useIntl()
  const API_URL = process.env.REACT_APP_API_URLCoding || 'api'
  const [showDialog, setShowDialog] = useState(false)
  const [showCityDialog, setshowCityDialog] = useState(false)
  const [showStateDialog, setshowStateDialog] = useState(false)
  const [mode, setMode] = useState<FormMode>('new')
  const [actionItem, setActionItem] = useState()
  const [actionStateItem, setActionStateItem] = useState()
  const [actionCityItem, setActionCityItem] = useState()
  const [actionCountryID, setActionCountryID] = useState(0)
  const [countryName, setCountryName] = useState('')
  const [stateName, setStateName] = useState('')
  const [actionStateID, setActionStateID] = useState(0)
  const [refresh, setRefresh] = useState(1)
  const [refreshprov, setrefreshprov] = useState(1)
  const [refreshcity, setrefreshcity] = useState(1)

  const [filter, setFilter] = useState<CompositeFilterDescriptor>()
  const [filter1, setFilter1] = useState<CompositeFilterDescriptor>()
  const [filter2, setFilter2] = useState<CompositeFilterDescriptor>()
  const grcountries = localStorage.getItem('countries')
  const [cityList, setcityList] = useState('cities')
  const [provinceList, setprovinceList] = useState('provinces')
  var col = grcountries
    ? (JSON.parse(grcountries) as IModelGr[])
    : [
        {
          title: 'نام کشور ',
          field: 'name',
          show: true,
        },
      ]
  const grprovinces = localStorage.getItem('provinces')
  var col1 = grprovinces
    ? (JSON.parse(grprovinces) as IModelGr[])
    : [
        {
          title: 'نام استان ',
          field: 'name',
          show: true,
        },
      ]
  const grcities = localStorage.getItem('cities')
  var col2 = grcities
    ? (JSON.parse(grcities) as IModelGr[])
    : [
        {
          title: 'نام شهر ',
          field: 'name',
          show: true,
        },
      ]
  const handleClose = () => {
    setShowDialog(false)
    setRefresh(Math.random())
  }
  const newItem = () => {
    setMode('new')
    setShowDialog(true)
  }
  const hanleActions = (action: string, item: any) => {
    if (action === 'edit') {
      setActionItem(item)
      setMode('edit')
      setShowDialog(true)
    }
  }
  const clickRow = (item: any) => {
    setActionCountryID(item.dataItem.id)
    setCountryName(item.dataItem.name)
    setFilter1(generateFiltereq({countryId: item.dataItem.id}))
    setprovinceList(API_URL + 'provinces/')
    setFilter2(generateFiltereq({provinceId: -1}))
    setcityList(API_URL + 'cities/')
    debugger
  }
  const clickRowState = (item: any) => {
    setActionStateID(item.dataItem.id)
    setStateName(item.dataItem.name)
    setFilter2(generateFiltereq({provinceId: item.dataItem.id}))
    setcityList(API_URL + 'cities/')
    //setrefreshcity(Math.random())
    debugger
  }
  const handleCloseCity = () => {
    setshowCityDialog(false)
    setrefreshcity(Math.random())
  }
  const newItemCity = () => {
    setMode('new')
    setshowCityDialog(true)
  }
  const hanleActionsCity = (action: string, item: any) => {
    if (action === 'edit') {
      setActionCityItem(item)
      setMode('edit')
      setshowCityDialog(true)
    }
  }
  const handleCloseState = () => {
    setshowStateDialog(false)
    setrefreshprov(Math.random())
  }
  const newItemState = () => {
    setActionStateItem(actionStateItem)
    setMode('new')
    setshowStateDialog(true)
  }
  const hanleActionsState = (action: string, item: any) => {
    if (action === 'edit') {
      setActionStateItem(item)
      setMode('edit')
      setshowStateDialog(true)
    }
  }
  return (
    <>
      <PageTitle breadcrumbs={[]}>
        {intl.formatMessage({id: 'MENU.BaseInfo.CountryController'})}
      </PageTitle>

      {showDialog && <CountryCreateDialog mode={mode} onClose={handleClose} item={actionItem} />}
      <div className='card card-flush '>
        <div className='card-body'>
          <div className='row'>
            <div className='card card-px-0 shadow'>
              <div className='card-body'>
                <BtnAction onClick={newItem} label={intl.formatMessage({id: 'MENU.NewItem'})} />

                <Grid
                  style={{
                    height: '300px',
                  }}
                  refresh={refresh}
                  endpoint={API_URL + 'Countries'}
                  showDel
                  showEdit
                  onAction={hanleActions}
                  filter={filter}
                  onRowClick={clickRow}
                  columns={col}
                  name='countries'
                >
                  {/* <GridColumn field='id' title='شناسه' filterable={false} width='70' /> */}
                </Grid>
              </div>
            </div>
          </div>
          <div className='row'>
            <div className='col-md-6'>
              <BtnAction onClick={newItemState} label={intl.formatMessage({id: 'MENU.NewItem'})} />

              {showStateDialog && (
                <StateCreateDialog
                  mode={mode}
                  onClose={handleCloseState}
                  item={actionStateItem}
                  parent={actionCountryID}
                  nameCountry={countryName}
                />
              )}
              <div className='card-body' style={{padding: '0px'}}>
                <Grid
                  style={{
                    height: '300px',
                  }}
                  refresh={refreshprov}
                  endpoint={provinceList}
                  //endpoint={API_URL + 'provinces'}
                  showDel
                  showEdit
                  onAction={hanleActionsState}
                  filter={filter1}
                  onRowClick={clickRowState}
                  columns={col1}
                  name='provinces'
                ></Grid>
              </div>
            </div>
            <div className='col-md-6'>
              <BtnAction onClick={newItemCity} label={intl.formatMessage({id: 'MENU.NewItem'})} />

              {showCityDialog && (
                <CityInContryCreateDialog
                  mode={mode}
                  onClose={handleCloseCity}
                  item={actionCityItem}
                  parent={actionStateID}
                  stateName={stateName}
                />
              )}
              <div className='card-body' style={{padding: '0px'}}>
                <Grid
                  style={{
                    height: '300px',
                  }}
                  refresh={refreshcity}
                  endpoint={cityList}
                  showDel
                  showEdit
                  onAction={hanleActionsCity}
                  filter={filter2}
                  columns={col2}
                  name='cities'
                ></Grid>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
