import {GridColumn} from '@progress/kendo-react-grid'
import {FormControl, Grid, CheckBoxAction, BtnAction} from '@core/components'
import {useState} from 'react'
import {useIntl} from 'react-intl'
import {FormMode} from '@core/forms'
import {PageTitle, PageActions, useLayout} from '_metronic/layout/core'
import {useForm} from 'react-hook-form'
import {CompositeFilterDescriptor} from '@progress/kendo-data-query'
import {generateFilter} from '@core/utils'
import {AgentsCreateDialog, AgentsModel} from './AgentsCreateDialog'
import {SearchFunc} from 'app/pages/admin/baseInfo/SearchFunc'
import axios from 'axios'
import {StringSchema} from 'yup'
import {toast} from 'react-toastify'
import {AgentContactInfos} from './AgentContactInfos'
import {Persons} from './Persons'
import {Dialog} from '@progress/kendo-react-dialogs'
import {effectTypes} from 'redux-saga/effects'
export interface IModelGr {
  title: string
  field: string
  show: boolean
  cell?: boolean
}
export function AgentsPage() {
  const intl = useIntl()
  const [searchShow, setsearchShow] = useState(true)
  const {config} = useLayout()
  const API_URL = process.env.REACT_APP_API_URLCoding || 'api'
  const [showDialog, setShowDialog] = useState(false)
  const [showDialogAgentContactInfos, setShowDialogAgentContactInfos] = useState(false)
  const [showDialogPersons, setShowDialogPersons] = useState(false)

  const [mode, setMode] = useState<FormMode>('new')
  const [actionItem, setActionItem] = useState()
  const [refresh, setRefresh] = useState(1)
  const [TypeOfPerson, setTypeOfPerson] = useState(1)
  const [AgentID, setAgentID] = useState(0)
  const {
    register,
    handleSubmit,
    reset,
    formState: {isDirty},
  } = useForm<AgentsModel>()
  const [filter, setFilter] = useState<CompositeFilterDescriptor>()
  const gr = localStorage.getItem('agents')

  var col = gr
    ? (JSON.parse(gr) as IModelGr[])
    : [
        {
          title: intl.formatMessage({id: 'Model.Agents.NameFa'}),
          field: 'nameFa',
          show: true,
        },
        {
          title: intl.formatMessage({id: 'Model.Agents.Code'}),
          field: 'code',
          show: true,
        },
        {
          title: intl.formatMessage({id: 'Model.Agents.AgentTypeId'}),
          field: 'agentType',
          show: true,
        },
        {
          title: intl.formatMessage({id: 'Model.Agents.IsEnabled'}),
          field: 'isEnabled',
          show: true,
          cell: true,
        },
        {
          title: intl.formatMessage({id: 'Model.Agents.HasIranCode'}),
          field: 'hasIranCode',
          show: true,
          cell: true,
        },
        {
          title: intl.formatMessage({id: 'Model.Agents.HasShenase'}),
          field: 'hasShenase',
          show: true,
          cell: true,
        },
        {
          title: intl.formatMessage({id: 'Model.Agents.HasServiceCode'}),
          field: 'hasServiceCode',
          show: true,
          cell: true,
        },
        {
          title: intl.formatMessage({id: 'Model.Agents.HasGTIN1'}),
          field: 'hasGTIN',
          show: true,
          cell: true,
        },
      ]
  const onSubmit = handleSubmit(async (data) => {
    debugger
    setFilter({logic: 'and', filters: inputList})
  })
  const resetSearch = () => {
    reset()
    setFilter(undefined)
  }
  const handleClose = () => {
    setShowDialog(false)
    setRefresh(Math.random())
  }
  const newItem = () => {
    setMode('new')
    setShowDialog(true)
  }
  const hanleActions = async (action: string, item: any) => {
    if (action === 'edit') {
      try {
        let url = item.isLegal
          ? API_URL + 'AgentLegal/' + item?.id
          : API_URL + 'AgentReal/' + item?.id
        const fetchResponse = await fetch(`${url}`, {
          method: 'GET',
          headers: {
            Accept: 'application/json',
          },
        })
        const data = await fetchResponse.json()
        debugger
        setActionItem(data.value)
      } catch (error) {
        console.log(error)
      }

      setMode('edit')
      setShowDialog(true)
    }
  }

  const [inputList, setInputList] = useState([
    {field: 'code', value: '', operator: 'eq', type: '0'},
  ])

  const handleInputChange = (e: any, index: any) => {
    debugger
    const list = [...inputList]
    if (e.target !== undefined) {
      const {name, value} = e.target

      if (name === 'field') {
        list[index].field = value.split('-')[0]
        list[index].type = value.split('-')[1]
      } else if (name === 'operator') list[index].operator = value
      else list[index].value = value
    } else list[index].value = e
    setInputList(list)
  }
  const handleRemoveClick = (index: any) => {
    if (inputList.length !== 1) {
      const list = [...inputList]
      list.splice(index, 1)
      setInputList(list)
    }
  }

  const handleAddClick = () => {
    if (inputList.filter((x) => x.value === '').length === 0)
      setInputList([...inputList, {field: 'code', value: '', operator: 'eq', type: '0'}])
  }
  const searchItems = [
    intl.formatMessage({id: 'Model.Agents.Code'}) + '*code-0',
    intl.formatMessage({id: 'FormControl.Input.Select.LegalReal'}) + '*isLegal-6',
    intl.formatMessage({id: 'Model.Agents.NameFa'}) + '*nameFa-0',
    intl.formatMessage({id: 'Model.Agents.IsEnabled'}) + '*isEnabled-1',
    intl.formatMessage({id: 'Model.Agents.HasServiceCode'}) + '*hasServiceCode-4',
    intl.formatMessage({id: 'Model.Agents.HasShenase'}) + '*hasShenase-4',
    intl.formatMessage({id: 'Model.Agents.HasIranCode'}) + '*hasIranCode-4',
    intl.formatMessage({id: 'Model.Agents.HasGTIN'}) + '*hasGTIN-4',
  ]
  const ToggleEnable = async (data: number) => {
    let url = API_URL + 'agents/ToggleEnable/' + data
    try {
      await axios.put(url)
      toast.info(intl.formatMessage({id: 'MENU.ACTIONSuccess'}))
      setRefresh(Math.random())
    } catch (e: any) {
      if (!e.processed) {
        toast.error(intl.formatMessage({id: 'MENU.ACTIONError'}))
      }
    }
  }

  const onCloseAgentContactInfos = () => {
    setShowDialogAgentContactInfos(false)
  }

  const onClosePersons = () => {
    setShowDialogPersons(false)
  }
  const selectingrid = (id: number, type: string) => {
    setAgentID(id)
    if (type === '1') {
      setShowDialogPersons(true)
      setTypeOfPerson(1)
    }
    if (type === '2') {
      setShowDialogPersons(true)
      setTypeOfPerson(0)
    }
    if (type === '3') setShowDialogAgentContactInfos(true)
  }

  return (
    <>
      <PageTitle breadcrumbs={[]}>
        {intl.formatMessage({id: 'MENU.BaseInfo.AgentsController'})}
      </PageTitle>

      {showDialog && <AgentsCreateDialog mode={mode} onClose={handleClose} item={actionItem} />}
      {showDialogAgentContactInfos && (
        <Dialog title={'آدرس نمایندگی'}>
          <AgentContactInfos
            AgentID={AgentID}
            onClose={() => onCloseAgentContactInfos()}
          ></AgentContactInfos>
        </Dialog>
      )}
      {showDialogPersons && (
        <Dialog title={' پرسنل نمایندگی' + (TypeOfPerson === 1 ? ' مدیر عامل' : ' رابط')}>
          <Persons AgentID={AgentID} Type={TypeOfPerson} onClose={() => onClosePersons()}></Persons>
        </Dialog>
      )}
      <div className='card card-flush '>
        <div className='card-body'>
          <div className='row'>
            <div
              style={{
                backgroundColor: config.main?.primaryColor,
                padding: '1rem 1rem',
                borderRadius: '0.475rem',
                color: '#e4e6ef',
                cursor: 'pointer',
                fontFamily: config.main?.font,
              }}
              onClick={() => setsearchShow(false)}
              hidden={!searchShow}
            >
              نمایش پنل جستجو
            </div>
            <div
              style={{
                backgroundColor: config.main?.primaryColor,
                padding: '1rem 1rem',
                borderTopRightRadius: '0.475rem',
                borderTopLeftRadius: '0.475rem',
                color: '#e4e6ef',
                cursor: 'pointer',
                fontFamily: config.main?.font,
              }}
              onClick={() => setsearchShow(true)}
              hidden={searchShow}
            >
              <label> بستن پنل جستجو</label>
            </div>
            <form
              style={{
                borderBottomLeftRadius: '0.475rem',
                borderBottomRightRadius: '0.475rem',
                paddingBottom: '5px',
              }}
              onSubmit={onSubmit}
              className='card-px-0 mb-2 shadow row g-0'
            >
              <div hidden={searchShow}>
                {inputList.map((x, i) => (
                  <SearchFunc
                    x={x}
                    i={i}
                    SearchModel={searchItems}
                    handleRemoveClick={() => handleRemoveClick(i)}
                    handleAddClick={() => handleAddClick()}
                    handleInputChange={(e) => handleInputChange(e, i)}
                  ></SearchFunc>
                ))}
                <div style={{marginTop: '-10px'}} className='col d-flex flex-row-reverse'>
                  <BtnAction onClick={resetSearch} label=' پاک کردن' />
                  <BtnAction onClick={onSubmit} label='جستجو' />
                </div>
              </div>
            </form>
          </div>
          <div className='row'>
            <div className='card card-px-0 shadow'>
              <div className='card-body'>
                <BtnAction onClick={newItem} label={intl.formatMessage({id: 'MENU.NewItem'})} />

                <Grid
                  style={{
                    height: '300px',
                  }}
                  refresh={refresh}
                  endpoint={API_URL + 'agent/'}
                  showDel
                  showEdit
                  onAction={hanleActions}
                  filter={filter}
                  columns={col}
                  name='agents'
                >
                  <GridColumn
                    filterable={false}
                    title={intl.formatMessage({id: 'Model.Agents.IsEnabled'})}
                    field='isEnabled'
                    filter='boolean'
                    cell={(props) => (
                      <td>
                        <label>{props.dataItem[props.field || ''] ? 'فعال' : 'غیر فعال'}</label>
                      </td>
                    )}
                  />
                  <GridColumn
                    filterable={false}
                    title='-'
                    field='isLegal'
                    filter='boolean'
                    cell={(props) => (
                      <td>
                        <label>{props.dataItem[props.field || ''] ? 'حقوقی' : 'حقیقی'}</label>
                      </td>
                    )}
                  />

                  {/* <GridColumn
                    filterable={false}
                    cell={(props) => (
                      <div>
                        <select
                          className=' form-control form-select  form-select-sm'
                          onChange={(e) => selectingrid(props.dataItem.id, e.target.value)}
                        >
                          <option value='0'>انتخاب عملیات</option>
                          <option value='1'> مدیر عامل</option>
                          <option value='2'> رابط</option>
                          <option value='3'> آدرس نمایندگی</option>
                        </select>
                      </div>
                    )}
                  /> */}
                </Grid>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
