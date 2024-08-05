import React, {useEffect, useState} from 'react'
import {GridColumn} from '@progress/kendo-react-grid'
import {Dialog} from '@progress/kendo-react-dialogs'
import {defaultPageTitles, FormMode} from '@core/forms'
import axios from 'axios'
import {toast} from 'react-toastify'
import {FieldError, useForm} from 'react-hook-form'
import {FormControl, DialogActions, Grid, BtnAction} from '@core/components'
import {useIntl} from 'react-intl'
import clsx from 'clsx'
import SVG from 'react-inlinesvg'
import {CompositeFilterDescriptor} from '@progress/kendo-data-query'
import {SearchFunc} from 'app/pages/admin/baseInfo/SearchFunc'
import {left} from '@popperjs/core'
import {
  TreeView,
  processTreeViewItems,
  handleTreeViewCheckChange,
  TreeViewExpandChangeEvent,
} from '@progress/kendo-react-treeview'

type PropsType = {
  ID: number
  onClose: () => void
  selectRecord: (i: number, name: string) => void
}
export interface IModelGr {
  title: string
  field: string
  show: boolean
}
export type FieldsModel = {
  id?: number
  titleFa: string
  titleEn: string
  isEnabled: boolean
}
const pageTitles = defaultPageTitles

export function ServiceTypeDialog({ID, selectRecord, onClose}: PropsType) {
  const intl = useIntl()
  const API_URL = process.env.REACT_APP_API_URLCoding || 'api'
  const [tab, setTab] = useState('Header')
  const [items, setItems] = React.useState<Array<any>>([])
  const [selecteddata, setSelecteddata] = useState(0)
  const [treeID, setTreeID] = useState(0)
  const [refresh, setRefresh] = useState(1)
  const gr = localStorage.getItem('payeInfo')
  const [filter1, setFilter1] = useState<CompositeFilterDescriptor>()
  const [inputList, setInputList] = useState([
    {field: 'comBaseNameFa', value: '', operator: 'eq', type: '0'},
  ])
  var col = gr
    ? (JSON.parse(gr) as IModelGr[])
    : [
        {
          title: intl.formatMessage({id: 'Model.PayeInfo.ComBaseNameFa'}),
          field: 'comBaseNameFa',
          show: true,
        },
        {
          title: intl.formatMessage({id: 'Model.PayeInfo.ComBaseNameEn'}),
          field: 'comBaseNameEn',
          show: true,
        },
        {
          title: intl.formatMessage({id: 'Model.PayeInfo.KeyCode'}),
          field: 'keyCode',
          show: true,
        },
      ]
  const {
    register,
    handleSubmit,
    reset,
    formState: {errors, isDirty, touchedFields},
  } = useForm<FieldsModel>({mode: 'all'})

  useEffect(() => {
    fetchSTree()
  }, [])
  const fetchSTree = async () => {
    try {
      let url = API_URL + 'ServiceStructures?SortDirection=asc'
      const resp = await axios.get(url)
      setItems(generateTreeModel(resp.data.value))

      debugger
    } catch (error) {
      console.log(error)
    }
  }
  function generateTreeModel(list: any) {
    //var map = {},
    var map: any = {},
      node,
      roots = [],
      i

    for (i = 0; i < list.length; i += 1) {
      map[list[i].id] = i // initialize the map
      // list[i].children = [] // initialize the children
      list[i].items = [] // initialize the children
    }

    for (i = 0; i < list.length; i += 1) {
      node = list[i]
      if (node.parentId !== null) {
        // if you have dangling branches check that map[node.parentId] exists
        list[map[node.parentId]].items.push(node)
      } else {
        roots.push(node)
      }
    }
    debugger
    return roots
  }
  const searchItems = [
    intl.formatMessage({id: 'Model.PayeInfo.BaseNameFa'}) + '*baseNameFa-0',
    intl.formatMessage({id: 'Model.PayeInfo.BaseNameEn'}) + '*baseNameEn-0',
    intl.formatMessage({id: 'Model.PayeInfo.ComBaseNameFa'}) + '*comBaseNameFa-0',
    intl.formatMessage({id: 'Model.PayeInfo.ComBaseNameEn'}) + '*comBaseNameEn-0',
    intl.formatMessage({id: 'Model.Activities.IsEnabled'}) + '*isEnabled-1',
  ]
  const onSubmit = handleSubmit(async (data) => {
    debugger
    setFilter1({logic: 'and', filters: inputList})
  })
  const handleRemoveClick = (index: any) => {
    if (inputList.length !== 1) {
      const list = [...inputList]
      list.splice(index, 1)
      setInputList(list)
    }
  }
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
  const resetSearch = () => {
    reset()
    setFilter1(undefined)
  }
  const handleAddClick = () => {
    if (inputList.filter((x) => x.value === '').length === 0)
      setInputList([...inputList, {field: 'comBaseNameFa', value: '', operator: 'eq', type: '0'}])
  }

  function svgIconName1(haschild: any) {
    if (haschild)
      return (
        <>
          <SVG
            style={{
              filter: 'invert(64%) sepia(92%) saturate(540%) hue-rotate(356deg)',
            }}
            src={process.env.PUBLIC_URL + '/media/icons/duotune/files/fil012.svg'}
          />
        </>
      )
    else
      return (
        <>
          <SVG
            style={{
              filter: 'invert(77%) sepia(3%) saturate(4%) hue-rotate(2deg)',
            }}
            src={process.env.PUBLIC_URL + '/media/icons/duotune/files/fil003.svg'}
          />
        </>
      )
  }
  const MyItem = (props: any) => {
    return (
      <>
        {svgIconName1(props.item.hasChild)}
        {props.item.titleFa}
      </>
    )
  }
  const onCheckChange = (event: TreeViewExpandChangeEvent) => {
    const settings = {checkChildren: true}
  }
  const onExpandChange = (event: TreeViewExpandChangeEvent) => {
    event.item.expanded = !event.item.expanded
  }

  const clickRowGrid = (event: any) => {
    debugger
    setSelecteddata(event.dataItem.id)
  }
  const onItemClick = (event: any) => {
    setTreeID(event.item.id)
    setRefresh(Math.random())
  }

  return (
    <div>
      <Dialog title={'نوع خدمات'} onClose={onClose} style={{zIndex: 10000000}}>
        <div>
          <div className='card card-px-0 mb-2 shadow '>
            <div className='card-body'>
              <form id='dialog-form' onSubmit={onSubmit} className='row g-3'>
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
                <div className='col d-flex flex-row-reverse'>
                  <BtnAction onClick={resetSearch} label=' پاک کردن' />
                  <BtnAction onClick={onSubmit} label='جستجو' />
                </div>
              </form>
            </div>
          </div>
          <div className='card card-custom'>
            <div className='card-header card-header-stretch overflow-auto'>
              <ul
                className='nav nav-stretch nav-line-tabs fw-bold border-transparent flex-nowrap'
                role='tablist'
              >
                <li className='nav-item'>
                  <a
                    className={clsx(`nav-link`, {active: tab === 'Header'})}
                    onClick={() => setTab('Header')}
                    role='tab'
                  >
                    نام پایه
                  </a>
                </li>

                <li className='nav-item'>
                  <a
                    className={clsx(`nav-link`, {active: tab === 'Aside'})}
                    onClick={() => setTab('Aside')}
                    role='tab'
                  >
                    درختواره
                  </a>
                </li>
              </ul>
            </div>
            {/* end::Header */}

            {/* begin::Form */}
            <form className='form'>
              {/* begin::Body */}
              <div className='card-body'>
                <div className='tab-content pt-3'>
                  <div className={clsx('tab-pane', {active: tab === 'Header'})}>
                    <div className='row mb-10'>
                      <div className='col-12'>
                        <Grid
                          style={{
                            height: '300px',
                          }}
                          endpoint={API_URL + 'ServicePayehInfo'}
                          columns={col}
                          name='payeInfo'
                          showActions={false}
                          onRowClick={clickRowGrid}
                          exteraParam={'&isEnabled=true'}
                          filter={filter1}
                        >
                          <GridColumn
                            filterable={false}
                            title='-'
                            field='ID'
                            cell={(props) => (
                              <td>
                                <BtnAction
                                  label='انتخاب'
                                  onClick={() =>
                                    selectRecord(props.dataItem.id, props.dataItem.comBaseNameFa)
                                  }
                                  className='btn btn-sm align-self-start me-2'
                                ></BtnAction>
                              </td>
                            )}
                          />
                        </Grid>
                      </div>
                    </div>
                  </div>

                  <div className={clsx('tab-pane', {active: tab === 'Aside'})}>
                    <div className='row mb-10'>
                      {' '}
                      <div className='col-4' style={{zIndex: 2}}>
                        <TreeView
                          data={items}
                          expandIcons={true}
                          onCheckChange={onCheckChange}
                          onExpandChange={onExpandChange}
                          item={MyItem}
                          animate={true}
                          onItemClick={onItemClick}
                        />
                      </div>
                      <div className='col-8'>
                        <Grid
                          style={{
                            height: '300px',
                          }}
                          endpoint={API_URL + 'ServicePayehInfo/'}
                          showActions={false}
                          columns={col}
                          refresh={refresh}
                          name='ServicePayehInfoGrid'
                          exteraParam={'&StructureId=' + treeID + '&isEnabled=true'}
                          onRowClick={clickRowGrid}
                          filter={filter1}
                        >
                          <GridColumn
                            filterable={false}
                            title='-'
                            field='ID'
                            cell={(props) => (
                              <td>
                                <BtnAction
                                  label='انتخاب'
                                  onClick={() =>
                                    selectRecord(props.dataItem.id, props.dataItem.comBaseNameFa)
                                  }
                                  className='btn btn-sm align-self-start me-2'
                                ></BtnAction>
                              </td>
                            )}
                          />
                        </Grid>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </form>
            {/* end::Form */}
          </div>
        </div>
        <div style={{float: left}}>
          {' '}
          <button className='k-button' onClick={onClose}>
            {intl.formatMessage({id: 'MENU.RETURN'})}
          </button>
        </div>
      </Dialog>
    </div>
  )
}
