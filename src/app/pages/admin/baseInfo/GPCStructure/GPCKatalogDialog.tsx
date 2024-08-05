import React, {useEffect, useState} from 'react'
import {Dialog} from '@progress/kendo-react-dialogs'
import {defaultPageTitles, FormMode} from '@core/forms'
import axios from 'axios'
import {toast} from 'react-toastify'
import {FieldError, useForm} from 'react-hook-form'
import {Grid, DialogActions, BtnAction, CheckBoxAction} from '@core/components'
import {useIntl} from 'react-intl'
import {GridColumn} from '@progress/kendo-react-grid'
import {CompositeFilterDescriptor} from '@progress/kendo-data-query'
import {GetChangeStatusHistoryDialog} from 'app/pages/admin/baseInfo/Component/GetChangeStatusHistoryDialog'
import {PayeInfoCreateDialog} from 'app/pages/admin/baseInfo/Component/PayeInfoCreateDialog'
import {ActiveDialog} from 'app/pages/admin/baseInfo/Component/ActiveDialog'
type PropsType = {
  onClose: () => void
  item?: PayeInfoModel
  IDT: number
}
export interface IModelGr {
  title: string
  field: string
  show: boolean
}
export type PayeInfoModel = {
  gpcStructureId?: number
  id?: number
  comBaseNameFa: string
  comBaseNameEn: string
  description: string
}
const pageTitles = defaultPageTitles

export function GPCKatalogDialog({onClose, item, IDT}: PropsType) {
  const intl = useIntl()
  const API_URLCoding = 'http://financial.pardcoservice.ir/api/Breaks/' //process.env.REACT_APP_API_URL || 'api'
  const gr = localStorage.getItem('payeInfo')
  const [filter, setFilter] = useState<CompositeFilterDescriptor>()
  const [showDialog, setShowDialog] = useState(false)
  const [showTreeDialog, setShowTreeDialog] = useState(false)
  const [showActiveDialog, setshowActiveDialog] = useState(false)
  const [showPICreateTreeDialog, setshowPICreateTreeDialog] = useState(false)
  const [mode, setMode] = useState<FormMode>('new')
  const [actionItem, setActionItem] = useState()
  const [refresh, setRefresh] = useState(1)
  const [items, setItems] = React.useState<Array<any>>([])
  const [parentID, setParentID] = useState(0)
  const [state, setstate] = useState(false)
  const [showGetChangeStatusHistoryDialog, setshowGetChangeStatusHistoryDialog] = useState(false)
  const [ID, setID] = useState(0)
  const [URLActive, setURLActive] = useState('')
  const [ActiveID, setActiveID] = useState(0)
  const [treeID, setTreeID] = useState(0)
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
    formState: {errors, isDirty, touchedFields},
  } = useForm<PayeInfoModel>({mode: 'all'})

  useEffect(() => {
    if (mode === 'edit') {
      reset(item)
    }
  }, [mode, item, reset])

  const resetForm = () => {
    reset()
    if (isDirty) {
    }
  }

  const hanleActions = (action: string, item: any) => {
    if (action === 'edit') {
      setActionItem(item)
      setMode('edit')
      setShowDialog(true)
    }
  }
  const HistoryGrid = (id: any) => {
    debugger
    setID(id)
    setshowGetChangeStatusHistoryDialog(true)
  }
  const PayeInfosActive = async (id: any) => {
    try {
      debugger
      let url = 'http://financial.pardcoservice.ir/api/Breaks/' + id
      const resp = await axios.get(url)
      setstate(resp.data.value.isEnabled)
      setActiveID(id)
      setURLActive('http://financial.pardcoservice.ir/api/Breaks/')
      setshowActiveDialog(true)
    } catch (error) {
      console.log(error)
    }
  }
  const handleCloseGetChangeStatusHistory = () => {
    setshowGetChangeStatusHistoryDialog(false)
  }
  const handleCloseActive = () => {
    setshowActiveDialog(false)
    setRefresh(Math.random())
  }
  const handleClose = () => {
    setShowDialog(false)
    setRefresh(Math.random())
  }
  const newItem = () => {
    if (IDT !== 0) {
      setTreeID(IDT)
      setMode('new')
      setShowDialog(true)
    } else alert('یک گره از درخت را انتخاب نمایید')
    debugger
  }

  return (
    <div>
      <Dialog title={pageTitles[mode]} onClose={onClose}>
        <div>
          <BtnAction onClick={newItem} label={intl.formatMessage({id: 'MENU.NewItem'})} />
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
              api={'PayeInfos'}
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
          <div className='col-12'>
            <Grid
              style={{
                height: '300px',
              }}
              refresh={refresh}
              endpoint='http://financial.pardcoservice.ir/api/Breaks'
              showDel
              showEdit
              onAction={hanleActions}
              filter={filter}
              columns={col}
              name='payeInfo'
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
            </Grid>
          </div>
        </div>
        <DialogActions mode={mode} onClose={onClose} resetForm={resetForm}></DialogActions>
      </Dialog>
    </div>
  )
}
