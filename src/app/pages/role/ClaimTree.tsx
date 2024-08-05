import React, {useEffect} from 'react'
import axios from 'axios'
import * as R from 'rambda'

import {
  TreeView,
  processTreeViewItems,
  handleTreeViewCheckChange,
  TreeViewExpandChangeEvent,
} from '@progress/kendo-react-treeview'

interface ClaimTreeProp {
  onSelectionChange?: (ids: string[]) => void
  selected?: string[]
}
export function ClaimTree({onSelectionChange, selected}: ClaimTreeProp) {
  const [items, setItems] = React.useState<Array<any>>([])
  const [check, setCheck] = React.useState({
    ids: selected,
    applyCheckIndeterminate: false,
    idField: 'id',
  })
  useEffect(() => {
    fetchClaims()
  }, [])
  // useEffect(() => {
  //   setCheck({ids: selected, applyCheckIndeterminate: true, idField: 'id'})
  // }, [selected])

  // useEffect(() => {
  //   check.ids && onSelectionChange && onSelectionChange(check.ids)
  // }, [check.ids, onSelectionChange])

  const fetchClaims = async () => {
    try {
      //const claims = (await axios.get(`${process.env.REACT_APP_API_URL}Menus/GetFlatList`)).data
      debugger
      const claims = (await axios.get(`${process.env.REACT_APP_API_URL}Claims`)).data
      // setItems(generateTreeModel(claims.value))
      setItems([claims.value])
    } catch (error) {
      console.log(error)
    }
  }

  const onCheckChange = (event: TreeViewExpandChangeEvent) => {
    //const settings = {checkChildren: true}
    setCheck(
      handleTreeViewCheckChange(event, check, items, {checkChildren: false, singleMode: false})
    )
    debugger
  }
  const onExpandChange = (event: TreeViewExpandChangeEvent) => {
    event.item.expanded = !event.item.expanded
    setItems([...items])
  }

  const onItemClick = (event: any) => {
    alert(event.item.level)
  }

  return (
    <div style={{height: '300px', overflow: 'scroll', width: '100%'}}>
      <TreeView
        // data={processTreeViewItems(items, {check: check})}
        data={processTreeViewItems(items, {check: check})}
        checkboxes={true}
        expandIcons={true}
        onCheckChange={onCheckChange}
        onExpandChange={onExpandChange}
        //onItemClick={onItemClick}
      />

      {/* <div style={{marginTop: 5}}>
        <div className='example-config'>Checked indices: {check.ids.join(',')}</div>
      </div> */}
    </div>
  )
}

function generateTreeModel(claims: any) {
  debugger
  const claimsByController = R.groupBy((x: any) => x.claim, claims)
  let result: any = {}
  debugger
  for (const ctrl in claimsByController) {
    ctrl.split('.').reduce((result, val) => (result[val] = result[val] || {}), result)
  }
  const toTree = (node: any, path: string[]) =>
    Object.entries(node).map(([key, value]) => {
      let currentPath = [...path, key]
      let obj: any = {
        text: key,
        id: currentPath.join('.'),
        expanded: true,
        items: toTree(value, currentPath),
      }
      if (obj.items.length === 0) {
        const ctrlClaims = claimsByController[currentPath.join('.')]
        obj.items = ctrlClaims.map((claim) => ({
          ...claim,
          text: `${claim.description}`,
          id: `${claim.claim}`,
        }))
      }
      return obj
    })

  result = toTree(result, [])
  return result
}
