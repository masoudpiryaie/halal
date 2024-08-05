import React, {useEffect, useState} from 'react'
import {Dialog} from '@progress/kendo-react-dialogs'
import {defaultPageTitles, FormMode} from '@core/forms'
import axios from 'axios'
import {toast} from 'react-toastify'
import {FieldError, useForm} from 'react-hook-form'
import {FormControl, DialogActions} from '@core/components'
import {useIntl} from 'react-intl'
import SVG from 'react-inlinesvg'
import {DialogActionsBar} from '@progress/kendo-react-dialogs'
import {
  TreeView,
  processTreeViewItems,
  handleTreeViewCheckChange,
  TreeViewExpandChangeEvent,
} from '@progress/kendo-react-treeview'

type PropsType = {
  mode: FormMode
  onClose: () => void
  onSubmit: (data: number) => void
}
export type PayeInfoModel = {
  id?: number
  comBaseNameFa: string
  description: string
  comBaseNameEn: string
  gpcStructureId: number
}
const pageTitles = defaultPageTitles

export function StructureTreeDialog({mode, onClose, onSubmit}: PropsType) {
  const intl = useIntl()
  const API_URL = process.env.REACT_APP_API_URLCoding || 'api'
  const [items, setItems] = React.useState<Array<any>>([])
  const [gpcStructureId, setgpcStructureId] = useState(0)
  const {
    register,
    handleSubmit,
    reset,
    formState: {errors, isDirty, touchedFields},
  } = useForm<PayeInfoModel>({mode: 'all'})

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

  const formSubmit = handleSubmit(async (data) => {
    onSubmit(gpcStructureId)
    onClose()
  })

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
        {props.item.id} {props.item.titleFa}
      </>
    )
  }
  const onCheckChange = (event: TreeViewExpandChangeEvent) => {
    const settings = {checkChildren: true}
    // setCheck(handleTreeViewCheckChange(event, check, items, settings))
  }
  const onExpandChange = (event: TreeViewExpandChangeEvent) => {
    event.item.expanded = !event.item.expanded

    // setItems([...items])
  }
  const onItemClick = (event: TreeViewExpandChangeEvent) => {
    setgpcStructureId(event.item.id)
    onSubmit(event.item.id)
    debugger
    onClose()
  }

  return (
    <div>
      <Dialog style={{zIndex: 200000}} title={pageTitles[mode]} onClose={onClose}>
        <div style={{width: 1000}}>
          <form id='dialog-form' className='row g-1' onSubmit={formSubmit}>
            <div className='col-12' style={{zIndex: 2}}>
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

            <DialogActionsBar layout='end'>
              <button className='k-button' onClick={onClose}>
                {intl.formatMessage({id: 'MENU.RETURN'})}
              </button>
              {/* <button className='k-button k-primary' type='submit' form='dialog-form'>
                {'انتخاب'}
              </button> */}
            </DialogActionsBar>
          </form>
        </div>
      </Dialog>
    </div>
  )
}
