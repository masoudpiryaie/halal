import {useState} from 'react'
import {MapContainer, TileLayer, Marker, Popup, useMapEvents} from 'react-leaflet'

export function LocationMarker(props: any) {
  const [position, setPosition] = useState(35.7219)
  const [position1, setPosition1] = useState(51.3347)
  const map = useMapEvents({
    click(e) {
      //map.locate()
      setPosition(e.latlng.lat)
      setPosition1(e.latlng.lng)
      // alert(e.latlng.lat + ' ' + e.latlng.lng)
    },
    // locationfound(e) {
    //   //setPosition([e.latlng.lat,e.latlng.lng])
    //   setPosition(e.latlng.lat)
    //   setPosition1(e.latlng.lng)
    //   map.flyTo(e.latlng, map.getZoom())
    // },
  })

  return (
    <div>
      {' '}
      <div>{props.handledddd(position + '-' + position1)}</div>
      <Marker position={[position, position1]}>
        <Popup>You are here </Popup>
      </Marker>
    </div>
  )
}
