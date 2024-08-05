import {useEffect, useState} from 'react'
import {Dialog} from '@progress/kendo-react-dialogs'
import {defaultPageTitles, FormMode} from '@core/forms'
import axios from 'axios'
import {toast} from 'react-toastify'
import {Controller, FieldError, useForm} from 'react-hook-form'
import {FormControl, DialogActions, ComboBox} from '@core/components'
// import {ComboBox, ComboBoxFilterChangeEvent} from '@progress/kendo-react-dropdowns'
import {useIntl} from 'react-intl'
import {PakItem} from './PakItem'

type PropsType = {
  mode: FormMode
  onClose: () => void
  item?: pakModel
}
export type pakModel = {
  id: number
  name: string
}
const listpak: Array<pakModel> = []
const pageTitles = defaultPageTitles

export function PakDialog({mode, onClose, item}: PropsType) {
  const intl = useIntl()
  var listPak = [5, 10]
  useEffect(() => {
    debugger
    try {
      debugger
      let url = 'http://membergs1.pardcoservice.ir/api/Registration/GetInitialPackages?Type=1'
      axios({
        method: 'get',
        url: url,
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })
        .then(function (response) {
          debugger
          listPak = response.data.value.items
        })
        .catch(function (response) {})
    } catch (e: any) {
      if (!e.processed) {
        toast.error('دیتا معتبر نیست', {
          position: 'top-center',
        })
      }
    }

    return () => {}
  }, [])
  const selectRecord = (id: number, i: number) => {
    listpak.push({id: id, name: i.toString()})
  }
  const savePak = () => {
    debugger
    alert(listpak[1].id)
    onClose()
  }

  return (
    <div>
      <Dialog title='انتخاب بسته' onClose={onClose} width='50vw'>
        <div>
          {listPak.map((x) => (
            <PakItem data={x} selectRecord={selectRecord}></PakItem>
          ))}
        </div>
        <button className='k-button' onClick={onClose}>
          {intl.formatMessage({id: 'MENU.RETURN'})}
        </button>

        <button className='k-button k-primary' onClick={savePak}>
          {intl.formatMessage({id: 'MENU.SAVE'})}
        </button>
      </Dialog>
    </div>
  )
}
