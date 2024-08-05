import {useEffect, useState} from 'react'
import {Dialog} from '@progress/kendo-react-dialogs'
import {defaultPageTitles, FormMode} from '@core/forms'
import axios from 'axios'
import {toast} from 'react-toastify'
import {FieldError, useForm, Controller} from 'react-hook-form'
import {FormControl, DialogActions, ComboBox} from '@core/components'
import {useIntl} from 'react-intl'
import {MultiSelect} from 'react-multi-select-component'
import {forEach} from 'rambda'

type PropsType = {
  mode: FormMode
  onClose: () => void
  item?: UsersModel
  options: any
}
export type UsersModel = {
  id?: number
  // type: any
  typeTitle: string
  nameFa: string
  nameEn: string
  nationalCode: string
  mobile: string
  tel: string
  internalTel: string
  position: string
  username: string
  password: string
  rePassword: string
  roleIds: any[]
  roles: any[]
  // rolesId: number
  // rolesName: string
  // roles: {
  //   id: number
  //   title: string
  // }
}
export type rolModel = {
  value: number
  label: string
}
const pageTitles = defaultPageTitles

export function UsersCreateDialog({mode, onClose, item, options}: PropsType) {
  const intl = useIntl()
  const API_URL = process.env.REACT_APP_API_URL || 'api'
  const [selected, setSelected] = useState([{label: '', value: 0}])
  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: {errors, isDirty, touchedFields},
  } = useForm<UsersModel>({mode: 'all'})
  //const options = [
  // {label: 'Grapes 🍇', value: 'grapes'},
  // {label: 'Mango 🥭', value: 'mango'},
  // {label: 'Strawberry 🍓', value: 'strawberry', disabled: true},
  // ]

  useEffect(() => {
    debugger
    if (mode === 'edit') {
      reset(item)
      if (item?.roles !== undefined) {
        setSelected(
          item?.roles.map((x) => ({
            label: x.title,
            value: x.id,
          }))
        )
      }
    }
  }, [mode, item, reset])
  const fetchRols = async () => {
    try {
      let url = API_URL + 'Roles/GetDropdown'
      const resp = await axios.get(url)
      for (var j = 0; j < resp.data.value.length; j++) {
        //options.push({label: resp.data.value[j].title, value: resp.data.value[j].id})
      }
      debugger
    } catch (error) {
      console.log(error)
    }
  }

  const onSubmit = handleSubmit(async (data) => {
    let url = API_URL + 'users'
    try {
      debugger
      const role = []
      for (var j = 0; j < selected.length; j++) {
        role.push(selected[j].value)
      }
      data.roleIds = role
      //data.type = data.type[0]
      if (mode !== 'edit') await axios.post(url, data)
      else await axios.put(url, data)
      toast.info(intl.formatMessage({id: 'MENU.ACTIONSuccess'}))
      onClose()
    } catch (e: any) {
      if (!e.processed) {
        toast.error(intl.formatMessage({id: 'MENU.ACTIONError'}))
      }
    }
  })

  const resetForm = () => {
    reset()
    if (isDirty) {
    }
  }
  const getValidationClass = (touched: boolean | undefined, error: FieldError | undefined) => {
    if (mode === 'edit') return error ? 'is-invalid' : 'is-valid'
    else {
      if (touched === true) {
        return error ? 'is-invalid' : 'is-valid'
      }
    }
  }
  return (
    <div>
      <Dialog title={pageTitles[mode]} onClose={onClose}>
        <div>
          <form id='dialog-form' onSubmit={onSubmit} className='row g-3'>
            <div className='row g-12'>
              <div className='col-sm-2'>نقش</div>
              <div className='col-sm-4'>
                <MultiSelect
                  options={options}
                  value={selected}
                  onChange={setSelected}
                  labelledBy='انتخاب'
                />
              </div>
            </div>
            <FormControl col={6} label={'نام'}>
              <input
                className={getValidationClass(touchedFields.nameFa, errors.nameFa)}
                autoFocus={true}
                {...register('nameFa', {required: true})}
              />
            </FormControl>
            <FormControl col={6} label={'نام انگلیسی'}>
              <input
                className={getValidationClass(touchedFields.nameEn, errors.nameEn)}
                {...register('nameEn')}
              />
            </FormControl>
            <FormControl col={6} label={'کد ملی'}>
              <input
                className={getValidationClass(touchedFields.nationalCode, errors.nationalCode)}
                {...register('nationalCode', {required: true})}
              />
            </FormControl>
            <FormControl col={6} label={intl.formatMessage({id: 'Model.Users.Username'})}>
              <input
                className={getValidationClass(touchedFields.username, errors.username)}
                {...register('username', {required: true, minLength: 5})}
              />
            </FormControl>
            <FormControl col={6} label={intl.formatMessage({id: 'Model.Users.Password'})}>
              <input
                type='password'
                className={getValidationClass(touchedFields.password, errors.password)}
                {...register('password', {required: true, minLength: 6})}
              />
            </FormControl>
            <FormControl col={6} label={'تکرار پسورد'}>
              <input
                type='password'
                className={getValidationClass(touchedFields.rePassword, errors.rePassword)}
                {...register('rePassword', {required: true})}
              />
            </FormControl>
            <FormControl col={6} label={intl.formatMessage({id: 'Model.Users.Mobile'})}>
              <input
                className={getValidationClass(touchedFields.mobile, errors.mobile)}
                {...register('mobile', {required: true, minLength: 11})}
              />
            </FormControl>
            <FormControl col={6} label={'تلفن '}>
              <input
                className={getValidationClass(touchedFields.tel, errors.tel)}
                {...register('tel', {required: true})}
              />
            </FormControl>
            {/* <FormControl col={6} label={'تلفن بین المللی '}>
              <input
                className={getValidationClass(touchedFields.internalTel, errors.internalTel)}
                {...register('internalTel', {required: true})}
              />
            </FormControl>

            <FormControl col={6} label={'موقعیت'}>
              <input
                className={getValidationClass(touchedFields.position, errors.position)}
                {...register('position', {required: true})}
              />
            </FormControl> */}

            {/* <FormControl
              col={6}
              label={intl.formatMessage({id: 'Model.Embark_Product.PackageType'})}
            >
              <Controller
                name='type'
                control={control}
                render={({field: {onChange, onBlur, value, ref}}) => (
                  <ComboBoxLocal
                    endpoint={API_URL + 'Users/GetUserTypes'}
                    allFields
                    onChange={onChange}
                    onBlur={onBlur}
                    preSelectedId={{id: item?.type, title: item?.typeTitle}}
                  />
                )}
              />
            </FormControl> */}
          </form>
        </div>
        <DialogActions mode={mode} onClose={onClose} resetForm={resetForm}></DialogActions>
      </Dialog>
    </div>
  )
}
