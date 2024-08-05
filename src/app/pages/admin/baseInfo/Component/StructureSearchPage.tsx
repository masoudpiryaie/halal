import {GridColumn} from '@progress/kendo-react-grid'
import {FormControl, Grid, BtnAction, CheckBoxAction} from '@core/components'
import React, {useState, useEffect} from 'react'
import {useIntl} from 'react-intl'
import {FormMode} from '@core/forms'
import {PageTitle, PageActions} from '_metronic/layout/core'
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
import {left} from '@popperjs/core'
export interface IModelGr {
  title: string
  field: string
  show: boolean
}
type PropsType = {
  onClose: () => void
  treeID?: number
  api?: string
  selectRecord: (i: number, name: string) => void
  treeUrl: string
  gridUrl: string
  exteraParam: string
}

export function StructureSearchPage({
  onClose,
  selectRecord,
  treeUrl,
  gridUrl,
  exteraParam,
}: PropsType) {
  const intl = useIntl()
  const API_URL = process.env.REACT_APP_API_URLCoding || 'api'

  const [refresh, setRefresh] = useState(1)
  const [items, setItems] = React.useState<Array<any>>([])

  const [treeID, setTreeID] = useState(0)
  const [count, setCount] = useState(0)

  const gr = localStorage.getItem('payeInfo')
  useEffect(() => {
    fetchSTree()
  }, [])
  const fetchSTree = async () => {
    try {
      const fetchResponse = await fetch(`${treeUrl}`, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
        },
      })
      const claims = await fetchResponse.json()
      setItems(generateTreeModel(claims.value))

      debugger
    } catch (error) {
      console.log(error)
    }
  }

  var col = gr
    ? (JSON.parse(gr) as IModelGr[])
    : [
        {
          title: intl.formatMessage({id: 'Model.PayeInfo.BaseNameFa'}),
          field: 'comBaseNameFa',
          show: true,
        },
        {
          title: intl.formatMessage({id: 'Model.PayeInfo.BaseNameEn'}),
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

  const [inputList, setInputList] = useState([
    {field: 'baseNameFa', value: '', operator: 'eq', type: '0'},
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
      setInputList([...inputList, {field: 'baseNameFa', value: '', operator: 'eq', type: '0'}])
  }
  const searchItems = [
    intl.formatMessage({id: 'Model.PayeInfo.BaseNameFa'}) + '*baseNameFa-0',
    intl.formatMessage({id: 'Model.PayeInfo.BaseNameEn'}) + '*baseNameEn-0',
    intl.formatMessage({id: 'Model.PayeInfo.ComBaseNameFa'}) + '*comBaseNameFa-0',
    intl.formatMessage({id: 'Model.PayeInfo.ComBaseNameEn'}) + '*comBaseNameEn-0',
    intl.formatMessage({id: 'Model.Activities.IsEnabled'}) + '*isEnabled-1',
  ]

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
  function handleChange(event: any) {
    setCount(event.target.value)
    onClose()
  }

  return (
    <>
      <Dialog onClose={onClose}>
        <div className='card card-flush '>
          <div className='card-body'>
            <div className='row'>
              <div className='card card-px-0 mb-2 shadow '>
                <div className='card-body'>
                  <form onSubmit={onSubmit} className='row g-3'>
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
            </div>
            <div className='row g-0'>
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
                  refresh={refresh}
                  endpoint={gridUrl}
                  showActions={false}
                  filter={filter}
                  columns={col}
                  name='payeInfo'
                  exteraParam={exteraParam + treeID}
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
                          className='btn btn-icon btn-bg-light btn-active-color-danger btn-sm me-1'
                        ></BtnAction>
                      </td>
                    )}
                  />
                </Grid>
              </div>
            </div>
          </div>
        </div>
        <div style={{float: left}}>
          {' '}
          <button className='k-button' onClick={onClose}>
            {intl.formatMessage({id: 'MENU.RETURN'})}
          </button>
        </div>
      </Dialog>
    </>
  )
}
