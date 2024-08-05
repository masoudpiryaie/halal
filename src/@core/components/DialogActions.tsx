import {FormMode} from '@core/forms'
import {DialogActionsBar} from '@progress/kendo-react-dialogs'
//import { config } from 'process'
import {useIntl} from 'react-intl'
import {useLayout} from '_metronic/layout/core'

type PropsType = {
  onClose: () => void
  resetForm: () => void
  mode: FormMode
  children?: JSX.Element | JSX.Element[]
  hasform?: boolean
}
export function DialogActions(props: PropsType) {
  const intl = useIntl()
  const {config} = useLayout()
  return (
    <DialogActionsBar layout='end'>
      <button
        style={{width: '80px', fontFamily: config.main?.font}}
        className='k-button'
        onClick={props.onClose}
      >
        {intl.formatMessage({id: 'MENU.RETURN'})}
      </button>
      {props.hasform === undefined ? (
        <button
          style={{width: '80px', fontFamily: config.main?.font}}
          className='k-button k-primary'
          type='submit'
          form='dialog-form'
        >
          {intl.formatMessage({id: 'MENU.SAVE'})}
        </button>
      ) : (
        <button
          style={{width: '80px', fontFamily: config.main?.font}}
          className='k-button k-primary'
          type='submit'
        >
          {intl.formatMessage({id: 'MENU.SAVE'})}
        </button>
      )}

      {/* {props.mode === 'new' && (
        <button className='k-button' onClick={props.resetForm}>
          {intl.formatMessage({id: 'MENU.RESET'})}
        </button>
      )} */}
      {props.children}
    </DialogActionsBar>
  )
}
