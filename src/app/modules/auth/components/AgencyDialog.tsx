import {useCallback, useState} from 'react'
import {Dialog} from '@progress/kendo-react-dialogs'
import {defaultPageTitles, FormMode} from '@core/forms'
import axios from 'axios'
import {toast} from 'react-toastify'
import {Controller, FieldError, useForm} from 'react-hook-form'
import {GridCellProps, GridColumn as Column} from '@progress/kendo-react-grid'
import {Grid} from '@core/components'
// import {ComboBox, ComboBoxFilterChangeEvent} from '@progress/kendo-react-dropdowns'
import {useIntl} from 'react-intl'

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

export function AgencyDialog({mode, onClose, item}: PropsType) {
  const intl = useIntl()
  const API_URLAuth = process.env.REACT_APP_API_URL || 'api'
  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: {errors, isDirty, touchedFields},
  } = useForm<pakModel>({mode: 'all'})
  const [refresh, setFefresh] = useState(1)
  const handleSelectionChange = useCallback(async (selectedRows: any[]) => {
    if (selectedRows.length === 1) {
      alert(selectedRows[0])
      onClose()
    }
  }, [])
  return (
    <div>
      <Dialog title={pageTitles[mode]} onClose={onClose} width='50vw'>
        <div className='row'>
          <div className='card-body d-flex align-items-center py-8'>
            <Grid
              style={{
                height: '300px',
              }}
              endpoint={'http://membergs1.pardcoservice.ir/api/Registration/GetAgentList'}
              refresh={refresh}
              selectionChanged={handleSelectionChange}
            >
              <Column field='id' title='کد نمایندگی' />
              <Column field='name' title='نام نمایندگی' />
            </Grid>
          </div>
        </div>
        <button className='k-button' onClick={onClose}>
          {intl.formatMessage({id: 'MENU.RETURN'})}
        </button>
      </Dialog>
    </div>
  )
}
