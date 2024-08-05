import {useIntl} from 'react-intl'

export function ViolationType() {
  const intl = useIntl()
  return (
    <>
      <option value='0'>
        {intl.formatMessage({id: 'FormControl.Input.Select.ViolationTitleType0'})}
      </option>
      <option value='1'>
        {intl.formatMessage({id: 'FormControl.Input.Select.ViolationTitleType1'})}
      </option>
      <option value='2'>
        {intl.formatMessage({id: 'FormControl.Input.Select.ViolationTitleType2'})}
      </option>
    </>
  )
}
