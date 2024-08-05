import {useEffect, useState} from 'react'
import {Dialog} from '@progress/kendo-react-dialogs'
import {defaultPageTitles, FormMode} from '@core/forms'
import axios from 'axios'
import {toast} from 'react-toastify'
import {FieldError, useForm} from 'react-hook-form'
import {FormControl, DialogActions} from '@core/components'
import {useIntl} from 'react-intl'
import {LocationMarker} from './LocationMarker'
import {MapContainer, TileLayer, Marker, Popup, useMapEvents} from 'react-leaflet'
import {prop, props} from 'rambda'

type PropsType = {
  onClose: () => void
  handleCallBack: () => void
  item?: AddressTypeModel
}
export type AddressTypeModel = {
  id?: number
  titleFa: string
  titleEn: string
  isEnabled: boolean
}

export function OpanMapDialog(props: any) {
  const API_URLCoding = process.env.REACT_APP_API_URL || 'api'
  const [childState, setChildState] = useState('')
  const handleCallBack = () => {
    //const newState = event.target.value
    //setChildState(newState)
    // Call the callback function from the parent component
    //selectlocation = newState
  }
  function dddd(ss: any) {
    setChildState(ss)
  }

  return (
    <div style={{width: '1000px !important'}}>
      <Dialog style={{zIndex: 10000000}} width={'1000px'} onClose={props.onClose}>
        <button className='k-button' onClick={props.onClose}>
          بازگشت
        </button>
        <div>{props.handleCallBack(childState)}</div>
        <div>
          <MapContainer center={[35.7219, 51.3347]} zoom={10} scrollWheelZoom={false}>
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
            />
            {/* <Marker position={[position]}>
                <Popup>
                  A pretty CSS3 popup. <br /> Easily customizable.
                </Popup>
              </Marker> */}
            <LocationMarker handledddd={dddd} />
          </MapContainer>
        </div>
      </Dialog>
    </div>
  )
}
