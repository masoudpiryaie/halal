import {GridColumn} from '@progress/kendo-react-grid'
import {FormControl, Grid, BtnAction, CheckBoxAction} from '@core/components'
import React, {useState, useEffect} from 'react'
import {useIntl} from 'react-intl'
import {FormMode} from '@core/forms'
import {PageTitle, PageActions, useLayout} from '_metronic/layout/core'
import {useForm} from 'react-hook-form'
import {CompositeFilterDescriptor} from '@progress/kendo-data-query'
import {generateFilter} from '@core/utils'
import {PayeInfoCreateDialog, PayeInfoModel} from './PayeInfoCreateDialog'
import {TreeCreateDialog, StructureModel} from 'app/pages/admin/baseInfo/Component/TreeCreateDialog'
import {ActiveDialog} from 'app/pages/admin/baseInfo/Component/ActiveDialog'
import {GetChangeStatusHistoryDialog} from 'app/pages/admin/baseInfo/Component/GetChangeStatusHistoryDialog'

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

export function ServiceStructurePage() {
  const intl = useIntl()
  const [searchShow, setsearchShow] = useState(true)
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
  const [treename, setTreename] = useState('')
  const [state, setstate] = useState(false)
  const [depth, setdepth] = useState(0)
  const [hasChild, sethasChild] = useState(false)

  const [showGetChangeStatusHistoryDialog, setshowGetChangeStatusHistoryDialog] = useState(false)
  const [ID, setID] = useState(0)
  const [URLActive, setURLActive] = useState('')
  const [ActiveID, setActiveID] = useState(0)
  const [showGPCKatalogDialog, setshowGPCKatalogDialog] = useState(false)
  const [deleteConfirm, setDeleteConfirm] = useState(false)
  const gr = localStorage.getItem('ServicePayehInfoGrid')
  useEffect(() => {
    fetchSTree()
  }, [])
  const fetchSTree = async () => {
    try {
      let url = API_URL + 'ServiceStructures?SortDirection=asc'
      const resp = await axios.get(url)
      setItems(generateTreeModel(resp.data.value))
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
    fetchSTree()
  }

  const newItem = () => {
    debugger
    if (depth === 0 || depth === 1) {
      toast.info('برای نود 1 و 2 امکان ثبت نام پایه نیست', {
        position: 'top-center',
      })
      return
    }
    if (depth === 2 && hasChild) {
      toast.info('این نود داریا فرزند است و امکان ثبت نام پایه وجود ندارد', {
        position: 'top-center',
      })
      return
    }
    if (!state) {
      toast.info('نود غیر فعال است', {
        position: 'top-center',
      })
    } else if (treeID !== 0) {
      setTreeID(treeID)
      setMode('new')
      setShowDialog(true)
    } else alert('یک گره از درخت را انتخاب نمایید')
  }
  const hanleActions = (action: string, item: any) => {
    if (action === 'edit') {
      setActionItem(item)
      setMode('edit')
      setShowDialog(true)
    }
    if (action === 'history') {
      HistoryGrid(item.id)
    }
    if (action === 'changeState') {
      PayeInfosActive(item.id)
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
      toast.info(intl.formatMessage({id: 'MENU.ACTIONSuccess'}), {
        position: 'top-center',
      })
      setRefresh(Math.random())
    } catch (e: any) {
      if (!e.processed) {
        toast.error(intl.formatMessage({id: 'MENU.ACTIONError'}), {
          position: 'top-center',
        })
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
    setTreename(event.item.titleFa)
    setstate(event.item.isEnabled)
    setdepth(event.item.depth)
    sethasChild(event.item.hasChild)

    setRefresh(Math.random())
  }
  const EditTree = (id: any) => {
    setMode('edit')
    setTreeID(id)
    setParentID(0)
    setShowTreeDialog(true)
  }
  const newTree = async (id: any) => {
    if (depth < 3) {
      if (depth === 2) {
        try {
          let url = API_URL + 'ServicePayehInfo?StructureId=' + id
          const resp = await axios.get(url)

          if (resp.data.value.items.length === 0) {
            setMode('new')
            setParentID(id)
            setShowTreeDialog(true)
          } else {
            toast.info('سطح 3 این سطح دارای نام پایه است', {
              position: 'top-center',
            })
            return
          }
        } catch (error) {
          console.log(error)
        }
      } else {
        setMode('new')
        setParentID(id)
        setShowTreeDialog(true)
      }
    } else {
      toast.info('امکان افزودن فقط تا سطح 4 وجود دارد', {
        position: 'top-center',
      })
    }
  }
  const delTree = async (id: any) => {
    try {
      let url = API_URL + 'ServiceStructures/' + id
      await axios.delete(url)

      fetchSTree()
      setDeleteConfirm(false)
    } catch (error) {
      console.log(error)
    }
  }
  const ActiveTree = async (id: any) => {
    try {
      let url = API_URL + 'ServiceStructures/' + id
      const resp = await axios.get(url)
      setstate(resp.data.value.isEnabled)
      setActiveID(id)
      setURLActive(API_URL + 'ServiceStructures/')
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
  function svgIconName1(isEnabled: any) {
    if (!isEnabled)
      return (
        <>
          <KTSVG className='svg-icon-danger' path='/media/icons/duotune/arrows/arr019.svg' />
        </>
      )
    else
      return (
        <>
          <KTSVG className='svg-icon-success' path='/media/icons/duotune/arrows/arr016.svg' />
        </>
      )
    // if (haschild)
    //   return (
    //     <>
    //       <SVG
    //         style={{
    //           filter: 'invert(64%) sepia(92%) saturate(540%) hue-rotate(356deg)',
    //         }}
    //         src={process.env.PUBLIC_URL + '/media/icons/duotune/files/fil012.svg'}
    //       />
    //     </>
    //   )
    // else
    //   return (
    //     <>
    //       <SVG
    //         style={{
    //           filter: 'invert(77%) sepia(3%) saturate(4%) hue-rotate(2deg)',
    //         }}
    //         src={process.env.PUBLIC_URL + '/media/icons/duotune/files/fil003.svg'}
    //       />
    //     </>
    //   )
    // // if (is(text, 'pdf')) {
    // // } else if (is(text, 'html')) {
    // //   return 'sd'
    // // } else if (is(text, 'jpg|png')) {
    // //   return 'sddfsdfsdfd'
    // // } else {
    // //   return ''
    // // }
  }
  const MyItem = (props: any) => {
    return (
      <>
        {svgIconName1(props.item.isEnabled)}
        {props.item.keyCode}-{props.item.titleFa}
        {/* {svgIconName(props.item.titleFa, props.item.id, props.item.hasChild)} */}
      </>
    )
  }
  const PayeInfosActive = async (id: any) => {
    try {
      let url = API_URL + 'ServicePayehInfo/' + id
      const resp = await axios.get(url)
      setstate(resp.data.value.isEnabled)
      setActiveID(id)
      setURLActive(API_URL + 'ServicePayehInfo/')
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

  return (
    <>
      <PageTitle breadcrumbs={[]}>
        {intl.formatMessage({id: 'MENU.BaseInfo.StructureController'})}
      </PageTitle>
      {deleteConfirm && (
        <Dialog style={{zIndex: 90000}} title={'حدف'} onClose={() => setDeleteConfirm(false)}>
          <p style={{margin: '25px', textAlign: 'center'}}>حذف رکورد انجام شود؟</p>
          <DialogActionsBar>
            <button className='k-button' onClick={() => setDeleteConfirm(false)}>
              خیر
            </button>
            <button className='k-button' onClick={() => delTree(treeID)}>
              بله
            </button>
          </DialogActionsBar>
        </Dialog>
      )}
      {showTreeDialog && (
        <TreeCreateDialog
          mode={mode}
          parentID={parentID}
          treeID={treeID}
          onClose={handleCloseTree}
          api={'ServiceStructures'}
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
          treename={treename}
          mode={mode}
          item={actionItem}
          onClose={handleClose}
          api={'ServicePayehInfo'}
        />
      )}
      {showGetChangeStatusHistoryDialog && (
        <GetChangeStatusHistoryDialog
          ID={ID}
          mode={mode}
          onClose={handleCloseGetChangeStatusHistory}
          api='ServicePayehInfo'
        />
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
                <div className='col d-flex flex-row-reverse'>
                  <BtnAction onClick={resetSearch} label=' پاک کردن' />
                  <BtnAction onClick={onSubmit} label='جستجو' />
                </div>
              </div>
            </form>
          </div>
          <div className='row g-0'>
            <div className='col-12 card-px-0 mb-2 shadow '>
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
                  className='btn btn-icon btn-bg-light btn-color-success btn-sm me-1'
                >
                  <KTSVG path='/media/icons/duotune/general/gen035.svg' className='svg-icon-3' />
                </button>
                <button
                  title='ویرایش ساختار'
                  onClick={() => EditTree(treeID)}
                  className='btn btn-icon btn-bg-light btn-color-primary btn-sm me-1'
                >
                  <KTSVG path='/media/icons/duotune/art/art005.svg' className='svg-icon-3' />
                </button>
                <button
                  title='فعال ساختار'
                  onClick={() => ActiveTree(treeID)}
                  className='btn btn-icon btn-bg-light btn-color-info btn-sm me-1'
                >
                  <KTSVG path='/media/icons/duotune/general/gen019.svg' className='svg-icon-3' />
                </button>

                <button
                  title='حذف ساختار'
                  onClick={() => setDeleteConfirm(true)}
                  className='btn btn-icon btn-bg-light btn-color-danger btn-sm me-1'
                >
                  <KTSVG path='/media/icons/duotune/general/gen027.svg' className='svg-icon-3' />
                </button>
              </div>
            </div>
          </div>
          <div className='row g-0'>
            <div className='col-12 card-px-0 mb-2 shadow overflow-scroll'>
              <div
                style={{
                  height: '200px',
                  zIndex: 1,
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
          </div>
          <div className='row g-0'>
            <div className='col-12'>
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
            <div className='col-12'>
              <Grid
                style={{
                  height: '300px',
                }}
                refresh={refresh}
                endpoint={API_URL + 'ServicePayehInfo/'}
                showDel
                showEdit
                showHistory={true}
                showChangeState={true}
                onAction={hanleActions}
                filter={filter}
                columns={col}
                name='ServicePayehInfoGrid'
                exteraParam={'&StructureId=' + treeID}
              >
                <GridColumn
                  filterable={false}
                  title='فعال/غیر فعال'
                  field='isEnabled'
                  filter='boolean'
                  cell={(props) => (
                    // <td>
                    //   <CheckBoxAction
                    //     checked={props.dataItem[props.field || '']}
                    //     className=''
                    //     claim=''
                    //     onClick={() => PayeInfosActive(props.dataItem.id)}
                    //   />
                    // </td>
                    <td>
                      <label>{!props.dataItem.isEnabled ? 'غیر فعال' : 'فعال'}</label>
                    </td>
                  )}
                />
              </Grid>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
