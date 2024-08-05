import {useEffect, useState} from 'react'
import {Dialog} from '@progress/kendo-react-dialogs'
import {defaultPageTitles, FormMode} from '@core/forms'
import axios from 'axios'
import {toast} from 'react-toastify'
import {FieldError, useForm} from 'react-hook-form'
import {Grid, DialogActions, CheckBoxAction} from '@core/components'
import {GridColumn} from '@progress/kendo-react-grid'
import {useIntl} from 'react-intl'

type PropsType = {
  mode: FormMode
  onClose: () => void
  item?: StructureModel
  ID: number
  api: string
}
export type StructureModel = {
  id?: number
  title: string
  titleEn: string
  description: string
}
export interface IModelGr {
  title: string
  field: string
  show: boolean
}
const pageTitles = defaultPageTitles

export function GetChangeStatusHistoryDialog({mode, onClose, item, ID, api}: PropsType) {
  const intl = useIntl()
  const API_URL = process.env.REACT_APP_API_URLCoding || 'api'
  const gr = localStorage.getItem('GetChangeStatusHistory')
  const {
    register,
    handleSubmit,
    reset,
    formState: {errors, isDirty, touchedFields},
  } = useForm<StructureModel>({mode: 'all'})

  useEffect(() => {
    if (mode === 'edit') {
      reset(item)
    }
  }, [mode, item, reset])

  var col = gr
    ? (JSON.parse(gr) as IModelGr[])
    : [
        {
          title: intl.formatMessage({id: 'Model.ChangeStatusHistory.UserName'}),
          field: 'userName',
          show: true,
        },
        {
          title: intl.formatMessage({id: 'Model.ChangeStatusHistory.CreateDate'}),
          field: 'createDateFa',
          show: true,
        },
        {
          title: intl.formatMessage({id: 'Model.ChangeStatusHistory.Reason'}),
          field: 'reason',
          show: true,
        },
      ]
  const resetForm = () => {}
  return (
    <div>
      <Dialog
        style={{margin: 'auto', width: '50%', padding: '10', position: 'relative'}}
        title={'تاریخچه'}
        onClose={onClose}
      >
        <div>
          <div className='col-12'>
            <Grid
              style={{
                height: '300px',
              }}
              endpoint={API_URL + api + '/GetChangeStatusHistory/' + ID}
              columns={col}
              name='GetChangeStatusHistory'
              showActions={false}
            >
              <GridColumn
                filterable={false}
                title='فعال/غیر فعال'
                field='isEnabled'
                filter='boolean'
                cell={(props) => (
                  <td>
                    <label>{!props.dataItem.isEnabled ? 'غیر فعال' : 'فعال'}</label>
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
