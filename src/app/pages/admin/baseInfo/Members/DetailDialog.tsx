import {useEffect, useState} from 'react'
import {Dialog} from '@progress/kendo-react-dialogs'
import {defaultPageTitles, FormMode} from '@core/forms'
import axios from 'axios'
import {toast} from 'react-toastify'
import {FieldError, useForm} from 'react-hook-form'
import {FormControl, DialogActions, Grid} from '@core/components'
import {useIntl} from 'react-intl'
import {GridColumn} from '@progress/kendo-react-grid'
export interface IModelGr {
  title: string
  field: string
  show: boolean
}
type PropsType = {
  mode: FormMode
  onClose: () => void
  item: any
}
export type PayeInfoModel = {
  id?: number
  payeInfoId: number
  title: string
  description: string
}
const pageTitles = defaultPageTitles

export function DetailDialog({mode, onClose, item}: PropsType) {
  const intl = useIntl()
  const API_URL = process.env.REACT_APP_API_URLCoding || 'api'

  const {
    register,
    handleSubmit,
    reset,
    formState: {errors, isDirty, touchedFields},
  } = useForm<PayeInfoModel>({mode: 'all'})

  const resetForm = () => {
    reset()
    if (isDirty) {
    }
  }

  return (
    <div>
      <Dialog title={'نمایش جزییات'} onClose={onClose}>
        <div style={{width: '600px'}}>
          <div className='row'>
            <div className='col-3'>
              <label className='form-label'>نام:</label>
            </div>
            <div className='col-sm-3'>
              <label className='form-label'>{item.nameFa}</label>
            </div>
            <div className='col-sm-3'>
              <label className='form-label'>نام انگلیسی:</label>
            </div>
            <div className='col-sm-3'>
              <label className='form-label'>{item.nameEn}</label>
            </div>
          </div>
          <div className='row'>
            <div className='col-sm-3'>
              <label className='form-label'>تاریخ تولد:</label>
            </div>
            <div className='col-sm-3'>
              <label className='form-label'>{item.birthDateFa}</label>
            </div>
            <div className='col-sm-3'>
              <label className='form-label'>نام پدر:</label>
            </div>
            <div className='col-sm-3'>
              <label className='form-label'>{item.fatherName}</label>
            </div>
          </div>
          <div className='row'>
            <div className='col-sm-3'>
              <label className='form-label'>موبایل :</label>
            </div>
            <div className='col-sm-3'>
              <label className='form-label'>{item.mobile}</label>
            </div>
            <div className='col-sm-3'>
              <label className='form-label'>تلفن :</label>
            </div>
            <div className='col-sm-3'>
              <label className='form-label'>{item.tel}</label>
            </div>
          </div>
        </div>

        <button className='k-button k-primary' onClick={onClose}>
          {intl.formatMessage({id: 'MENU.RETURN'})}
        </button>
      </Dialog>
    </div>
  )
}
