//import {useIntl} from 'react-intl'
export type FormMode = 'edit' | 'new'
//const intl = useIntl()
export const defaultPageTitles: Record<FormMode, string> = {
  edit: 'ویرایش', //intl.formatMessage({id: 'MENU.NewItem'}),
  new: 'ایجاد', //intl.formatMessage({id: 'MENU.NewItem'})
}
