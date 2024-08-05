import {GridColumn} from '@progress/kendo-react-grid'
import {FormControl, Grid, BtnAction, CheckBoxAction} from '@core/components'
import React, {useState, useEffect} from 'react'
import {useIntl} from 'react-intl'
import {FormMode} from '@core/forms'
import {PageTitle, PageActions, useLayout} from '_metronic/layout/core'
import {useForm} from 'react-hook-form'
import {CompositeFilterDescriptor} from '@progress/kendo-data-query'
import {generateFilter} from '@core/utils'
import {
  PayeInfoCreateDialog,
  PayeInfoModel,
} from 'app/pages/admin/baseInfo/Component/PayeInfoCreateDialog'
import {TreeCreateDialog, StructureModel} from 'app/pages/admin/baseInfo/Component/TreeCreateDialog'
import {ActiveDialog} from 'app/pages/admin/baseInfo/Component/ActiveDialog'
import {GetChangeStatusHistoryDialog} from 'app/pages/admin/baseInfo/Component/GetChangeStatusHistoryDialog'
import {GPCKatalogDialog} from './GPCKatalogDialog'
import {SearchFunc} from 'app/pages/admin/baseInfo/SearchFunc'
import axios from 'axios'
import {StringSchema} from 'yup'
import {toast} from 'react-toastify'
//import {TreeView} from '@progress/kendo-react-treeview'
import {SvgIcon} from '@progress/kendo-react-common'
import {KTSVG} from '_metronic/helpers'
import SVG from 'react-inlinesvg'
import {Dialog, DialogActionsBar} from '@progress/kendo-react-dialogs'

import {
  TreeView,
  processTreeViewItems,
  handleTreeViewCheckChange,
  TreeViewExpandChangeEvent,
} from '@progress/kendo-react-treeview'
import '@progress/kendo-react-animation'
export interface IModelGr {
  title: string
  field: string
  show: boolean
}
export interface ProductType {
  ID: string
  categoryId?: string
  name: string
  icon?: string
  expanded?: boolean
  price?: number
}

export function GPCStructurePage() {
  const intl = useIntl()
  const {config} = useLayout()
  const API_URL = process.env.REACT_APP_API_URLCoding || 'api'
  const [showDialog, setShowDialog] = useState(false)
  const [showTreeDialog, setShowTreeDialog] = useState(false)
  const [showActiveDialog, setshowActiveDialog] = useState(false)
  const [showPICreateTreeDialog, setshowPICreateTreeDialog] = useState(false)
  const [mode, setMode] = useState<FormMode>('new')
  const [actionItem, setActionItem] = useState()
  const [refresh, setRefresh] = useState(1)
  const [items, setItems] = React.useState<Array<any>>([])
  const [parentID, setParentID] = useState(0)
  const [treeID, setTreeID] = useState(0)
  const [state, setstate] = useState(false)
  const [showGetChangeStatusHistoryDialog, setshowGetChangeStatusHistoryDialog] = useState(false)
  const [ID, setID] = useState(0)
  const [URLActive, setURLActive] = useState('')
  const [ActiveID, setActiveID] = useState(0)
  const [showGPCKatalogDialog, setshowGPCKatalogDialog] = useState(false)
  const gr = localStorage.getItem('payeInfo')
  const [searchShow, setsearchShow] = useState(true)
  useEffect(() => {
    fetchSTree()
  }, [])
  const fetchSTree = async () => {
    try {
      let url = API_URL + 'GPCStructures?SortDirection=asc'
      const resp = await axios.get(url)
      setItems(generateTreeModel(resp.data.value))

      debugger
    } catch (error) {
      console.log(error)
    }
  }

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
        {
          title: intl.formatMessage({id: 'Model.PayeInfo.Description'}),
          field: 'description',
          show: true,
        },
      ]
  const {
    register,
    handleSubmit,
    reset,
    formState: {isDirty},
  } = useForm<StructureModel>()
  const [filter, setFilter] = useState<CompositeFilterDescriptor>()

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
  const handleCloseTree = () => {
    setShowTreeDialog(false)
    fetchSTree()
  }
  const handleCloseActive = () => {
    setshowActiveDialog(false)
    setRefresh(Math.random())
  }

  const newItem = () => {
    if (treeID !== 0) {
      setTreeID(treeID)
      setMode('new')
      setShowDialog(true)
    } else alert('یک گره از درخت را انتخاب نمایید')
    debugger
  }
  const hanleActions = (action: string, item: any) => {
    if (action === 'edit') {
      setActionItem(item)
      setMode('edit')
      setShowDialog(true)
    }
  }

  const [inputList, setInputList] = useState([
    {field: 'comBaseNameFa', value: '', operator: 'eq', type: '0'},
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
      setInputList([...inputList, {field: 'comBaseNameFa', value: '', operator: 'eq', type: '0'}])
  }
  const searchItems = [
    intl.formatMessage({id: 'Model.PayeInfo.ComBaseNameFa'}) + '*comBaseNameFa-0',
    intl.formatMessage({id: 'Model.PayeInfo.ComBaseNameEn'}) + '*comBaseNameEn-0',
    intl.formatMessage({id: 'Model.Activities.IsEnabled'}) + '*isEnabled-1',
  ]
  const ToggleEnable = async (data: number) => {
    let url = API_URL + 'activities/ToggleEnable/' + data
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
  const onCheckChange = (event: TreeViewExpandChangeEvent) => {
    const settings = {checkChildren: true}

    // setCheck(handleTreeViewCheckChange(event, check, items, settings))
  }
  const onExpandChange = (event: TreeViewExpandChangeEvent) => {
    event.item.expanded = !event.item.expanded

    // setItems([...items])
  }
  const onItemClick = (event: any) => {
    setTreeID(event.item.id)
    setRefresh(Math.random())
  }
  const EditTree = (id: any) => {
    setMode('edit')
    setTreeID(id)
    setParentID(0)
    setShowTreeDialog(true)
  }
  const newTree = (id: any) => {
    setMode('new')
    setParentID(id)
    setShowTreeDialog(true)
  }
  const delTree = async (id: any) => {
    try {
      debugger
      let url = API_URL + 'GPCStructures/' + id
      await axios.delete(url)

      fetchSTree()
    } catch (error) {
      console.log(error)
    }
  }
  const ActiveTree = async (id: any) => {
    try {
      debugger
      let url = API_URL + 'GPCStructures/' + id
      const resp = await axios.get(url)
      setstate(resp.data.value.isEnabled)
      setActiveID(id)
      setURLActive(API_URL + 'GPCStructures/')
      setshowActiveDialog(true)
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

  const PICreateTree = (id: any) => {
    setshowPICreateTreeDialog(true)
    setTreeID(id)
  }

  const is = (fileName: any, ext: any) => new RegExp(`.${ext}\$`).test(fileName)
  function svgIconName(text: any, id: any, haschild: any) {
    if (haschild)
      return (
        <>
          <button
            onClick={() => newTree(id)}
            title='ساختار جدید'
            className='btn btn-icon btn-bg-light btn-active-color-success btn-sm me-1'
          >
            <KTSVG path='/media/icons/duotune/general/gen035.svg' className='svg-icon-3' />
          </button>
          <button
            title='ویرایش ساختار'
            onClick={() => EditTree(id)}
            className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1'
          >
            <KTSVG path='/media/icons/duotune/art/art005.svg' className='svg-icon-3' />
          </button>
          <button
            title='فعال ساختار'
            onClick={() => ActiveTree(id)}
            className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1'
          >
            <KTSVG path='/media/icons/duotune/general/gen019.svg' className='svg-icon-3' />
          </button>

          <button
            title='حذف ساختار'
            onClick={() => delTree(id)}
            className='btn btn-icon btn-bg-light btn-active-color-danger btn-sm me-1'
          >
            <KTSVG path='/media/icons/duotune/general/gen027.svg' className='svg-icon-3' />
          </button>
        </>
      )
    else
      return (
        <>
          <button
            onClick={() => newTree(id)}
            title='ساختار جدید'
            className='btn btn-icon btn-bg-light btn-active-color-success btn-sm me-1'
          >
            <KTSVG path='/media/icons/duotune/general/gen035.svg' className='svg-icon-3' />
          </button>
          <button
            title='ویرایش ساختار'
            onClick={() => EditTree(id)}
            className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1'
          >
            <KTSVG path='/media/icons/duotune/art/art005.svg' className='svg-icon-3' />
          </button>
          <button
            title='فعال ساختار'
            onClick={() => ActiveTree(id)}
            className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1'
          >
            <KTSVG path='/media/icons/duotune/general/gen019.svg' className='svg-icon-3' />
          </button>
          {/* <button
            title='break نام پایه جدید'
            onClick={() => PICreateTree(id)}
            className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1'
          >
            <KTSVG path='/media/icons/duotune/general/gen035.svg' className='svg-icon-3' />
          </button> */}

          <button
            title='حذف ساختار'
            onClick={() => delTree(id)}
            className='btn btn-icon btn-bg-light btn-active-color-danger btn-sm me-1'
          >
            <KTSVG path='/media/icons/duotune/general/gen027.svg' className='svg-icon-3' />
          </button>
        </>
      )
    // if (is(text, 'pdf')) {
    // } else if (is(text, 'html')) {
    //   return 'sd'
    // } else if (is(text, 'jpg|png')) {
    //   return 'sddfsdfsdfd'
    // } else {
    //   return ''
    // }
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
        {/* {svgIconName(props.item.titleFa, props.item.id, props.item.hasChild)} */}
      </>
    )
  }
  const PayeInfosActive = async (id: any) => {
    try {
      debugger
      let url = API_URL + 'Breaks/' + id
      const resp = await axios.get(url)
      setstate(resp.data.value.isEnabled)
      setActiveID(id)
      setURLActive(API_URL + 'Breaks/')
      setshowActiveDialog(true)
    } catch (error) {
      console.log(error)
    }
  }
  const HistoryGrid = (id: any) => {
    setID(id)
    setshowGetChangeStatusHistoryDialog(true)
  }
  const handleCloseGetChangeStatusHistory = () => {
    setshowGetChangeStatusHistoryDialog(false)
  }
  const GPCKatalogGrid = (id: number) => {
    setshowGPCKatalogDialog(true)
  }
  const handleCloseGPCKatalogDialog = () => {
    setshowGPCKatalogDialog(false)
  }

  return (
    <>
      <PageTitle breadcrumbs={[]}>
        {intl.formatMessage({id: 'MENU.BaseInfo.StructureController'})}
      </PageTitle>

      {showTreeDialog && (
        <TreeCreateDialog
          mode={mode}
          parentID={parentID}
          treeID={treeID}
          onClose={handleCloseTree}
          api={'GPCStructures'}
        />
      )}
      {showActiveDialog && (
        <ActiveDialog
          state={state}
          mode={mode}
          ActiveID={ActiveID}
          API_URL={URLActive}
          onClose={handleCloseActive}
        />
      )}
      {showDialog && (
        <PayeInfoCreateDialog
          treeID={treeID}
          mode={mode}
          item={actionItem}
          onClose={handleClose}
          api={'Breaks'}
          com={true}
          treetype={1}
        />
      )}
      {showGetChangeStatusHistoryDialog && (
        <GetChangeStatusHistoryDialog
          ID={ID}
          mode={mode}
          onClose={handleCloseGetChangeStatusHistory}
          api='Breaks'
        />
      )}
      {showGPCKatalogDialog && <GPCKatalogDialog IDT={25} onClose={handleCloseGPCKatalogDialog} />}
      {/* {activeConfirm && (
        <Dialog title={'تبدیل نام پایه'} onClose={() => setActiveConfirm(false)}>
          <p style={{margin: '25px', textAlign: 'center'}}>
            آیا از تبدیل زیرمجموعه به بریک اطمینان دارید؟
          </p>
          <DialogActionsBar>
            <button className='k-button' onClick={() => setActiveConfirm(false)}>
              خیر
            </button>
            <button className='k-button' onClick={PIActiveTree}>
              بله
            </button>
          </DialogActionsBar>
        </Dialog>
      )} */}
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
                <div className='col d-flex flex-row-reverse'>
                  <BtnAction onClick={resetSearch} label=' پاک کردن' />
                  <BtnAction onClick={onSubmit} label='جستجو' />
                </div>
              </div>
            </form>
          </div>
          <div className='row g-0'>
            <div className='col-4 card-px-0 mb-2 shadow '>
              <div
                style={{
                  backgroundColor: '#eff2f5',
                  borderRadius: '0.475rem',
                  padding: '5px',
                  border: '1px solid',
                  borderColor: config.main?.primaryColor,
                }}
              >
                <button
                  onClick={() => newTree(treeID)}
                  title='ساختار جدید'
                  className='btn btn-icon btn-bg-light btn-active-color-success btn-sm me-1'
                >
                  <KTSVG path='/media/icons/duotune/general/gen035.svg' className='svg-icon-3' />
                </button>
                <button
                  title='ویرایش ساختار'
                  onClick={() => EditTree(treeID)}
                  className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1'
                >
                  <KTSVG path='/media/icons/duotune/art/art005.svg' className='svg-icon-3' />
                </button>
                <button
                  title='فعال ساختار'
                  onClick={() => ActiveTree(treeID)}
                  className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1'
                >
                  <KTSVG path='/media/icons/duotune/general/gen019.svg' className='svg-icon-3' />
                </button>

                <button
                  title='حذف ساختار'
                  onClick={() => delTree(treeID)}
                  className='btn btn-icon btn-bg-light btn-active-color-danger btn-sm me-1'
                >
                  <KTSVG path='/media/icons/duotune/general/gen027.svg' className='svg-icon-3' />
                </button>
              </div>
            </div>
            <div className='col-8 '>
              <div
                style={{
                  backgroundColor: '#eff2f5',
                  borderRadius: '0.475rem',
                  padding: '5px',
                  border: '1px solid',
                  borderColor: config.main?.primaryColor,
                }}
              >
                <BtnAction onClick={newItem} label={intl.formatMessage({id: 'MENU.NewItem'})} />
              </div>
            </div>
          </div>
          <div className='row g-0'>
            <div className='col-4 card-px-0 mb-2 shadow overflow-scroll'>
              <div
                style={{
                  height: '10px',
                  zIndex: 2,
                }}
              >
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
            </div>
            <div className='col-8 '>
              <Grid
                style={{
                  height: '300px',
                }}
                refresh={refresh}
                endpoint={API_URL + 'Breaks/'}
                showDel
                showEdit
                onAction={hanleActions}
                filter={filter}
                columns={col}
                name='payeInfo'
                exteraParam={'&GPCStructureId=' + treeID}
              >
                <GridColumn
                  filterable={false}
                  title='فعال/غیر فعال'
                  field='isEnabled'
                  filter='boolean'
                  cell={(props) => (
                    <td>
                      <CheckBoxAction
                        checked={props.dataItem[props.field || '']}
                        className=''
                        claim=''
                        onClick={() => PayeInfosActive(props.dataItem.id)}
                      />
                    </td>
                  )}
                />
                <GridColumn
                  filterable={false}
                  title='تاریخچه'
                  field='ID'
                  cell={(props) => (
                    <td>
                      <BtnAction onClick={() => HistoryGrid(props.dataItem.id)} label='تاریخچه' />
                    </td>
                  )}
                />
                {/* <GridColumn
                  filterable={false}
                  title='کاتالوگGPC'
                  field='ID'
                  cell={(props) => (
                    <td>
                      <BtnAction
                        onClick={() => GPCKatalogGrid(props.dataItem.id)}
                        label='کاتالوگGPC'
                      />
                    </td>
                  )}
                /> */}
              </Grid>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
