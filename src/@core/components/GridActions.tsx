import {Dialog, DialogActionsBar} from '@progress/kendo-react-dialogs'
import {KTSVG} from '_metronic/helpers'
import {GridCellProps, GridColumn as Column} from '@progress/kendo-react-grid'
import {useState} from 'react'

export function GridActions() {
  const [visible, setVisible] = useState<boolean>(false)
  const toggleDialog = () => {
    setVisible(!visible)
  }
  return (
    <Column
      field='id'
      title='حذف'
      width='100'
      filterable={false}
      cell={(props: GridCellProps) => {
        let field = props.field || ''
        return (
          <td>
            <button onClick={() => setVisible(true)} className='btn btn-sm'>
              <KTSVG
                path='/media/icons/duotune/general/gen034.svg'
                className='svg-icon-muted svg-icon-2hx  svg-icon-danger'
              />
            </button>
            {visible && (
              <Dialog title={'Please confirm'} onClose={toggleDialog}>
                <p style={{margin: '25px', textAlign: 'center'}}>
                  Are you sure you want to continue?
                </p>
                <DialogActionsBar>
                  <button className='k-button' onClick={toggleDialog}>
                    No
                  </button>
                  <button className='k-button' onClick={toggleDialog}>
                    Yes
                  </button>
                </DialogActionsBar>
              </Dialog>
            )}
          </td>
        )
      }}
    ></Column>
  )
}
