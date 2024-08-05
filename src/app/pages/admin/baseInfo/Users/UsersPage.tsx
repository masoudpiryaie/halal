import {GridColumn} from '@progress/kendo-react-grid'
import {FormControl, Grid, Uploader, BtnAction} from '@core/components'
import {useState, useEffect} from 'react'
import {useIntl} from 'react-intl'
import {FormMode} from '@core/forms'
import {PageTitle, PageActions, useLayout} from '_metronic/layout/core'
import {useForm} from 'react-hook-form'
import {CompositeFilterDescriptor} from '@progress/kendo-data-query'
import {generateFilter} from '@core/utils'
import {UsersCreateDialog, UsersModel} from './UsersCreateDialog'
import {SearchFunc} from 'app/pages/admin/baseInfo/SearchFunc'
import axios from 'axios'
import {StringSchema} from 'yup'
export type rolModel = {
  value: number
  label: string
}
export function UsersPage() {
  const intl = useIntl()
  const {config} = useLayout()
  const [searchShow, setsearchShow] = useState(true)
  const API_URL = process.env.REACT_APP_API_URL || 'api'
  const [showDialog, setShowDialog] = useState(false)
  const [mode, setMode] = useState<FormMode>('new')
  const [actionItem, setActionItem] = useState()
  const [refresh, setRefresh] = useState(1)
  const {
    register,
    handleSubmit,
    reset,
    formState: {isDirty},
  } = useForm<UsersModel>()
  const [filter, setFilter] = useState<CompositeFilterDescriptor>()
  useEffect(() => {
    fetchRols()
  }, [])
  const onSubmit = handleSubmit(async (data) => {
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
        const role = []
        let url = API_URL + 'Users/' + item.id
        const resp = await axios.get(url)
        debugger
        setActionItem(resp.data.value)
        setMode('edit')
        setShowDialog(true)

        debugger
      } catch (error) {
        console.log(error)
      }
    }
  }

  const [inputList, setInputList] = useState([
    {field: 'name', value: '', operator: 'eq', type: '0'},
  ])

  const handleInputChange = (e: any, index: any) => {
    const {name, value} = e.target
    const list = [...inputList]
    if (name === 'field') {
      list[index].field = value.split('-')[0]
      list[index].type = value.split('-')[1]
    } else if (name === 'operator') list[index].operator = value
    else list[index].value = value
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
      setInputList([...inputList, {field: 'name', value: '', operator: 'eq', type: '0'}])
  }
  const searchItems = [
    intl.formatMessage({id: 'Model.Users.Name'}) + '*name-0',
    intl.formatMessage({id: 'Model.Users.Mobile'}) + '*mobile-0',
  ]
  //const options: Array<rolModel> = []
  const [options, setoptions] = useState<any>()
  const fetchRols = async () => {
    try {
      const role = []
      let url = API_URL + 'Roles/GetDropdown'
      const resp = await axios.get(url)
      for (var j = 0; j < resp.data.value.length; j++) {
        //options.push({label: resp.data.value[j].title, value: resp.data.value[j].id})
        role.push({label: resp.data.value[j].title, value: resp.data.value[j].id})
      }

      setoptions(role)

      debugger
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      <PageTitle breadcrumbs={[]}>
        {intl.formatMessage({id: 'MENU.BaseInfo.UsersController'})}
      </PageTitle>

      {showDialog && (
        <UsersCreateDialog options={options} mode={mode} onClose={handleClose} item={actionItem} />
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
                  endpoint={API_URL + 'Roles'}
                  showDel
                  showEdit
                  onAction={hanleActions}
                  filter={filter}
                  exteraParam='&Type=1'
                >
                  <GridColumn field='title' title={'عنوان'} />
                  <GridColumn field='description' title={'سمت'} />
                </Grid>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
