import {FC, useRef, useEffect, useState} from 'react'
import {connect, useDispatch, ConnectedProps} from 'react-redux'
import {LayoutSplashScreen} from '../../../../_metronic/layout/core'
import * as auth from './AuthRedux'
import {logout, selectAccessToken} from './AuthSlice'
import {getUserByToken} from './AuthCRUD'
import {RootState} from '../../../../setup'
import {useAppSelector} from 'setup/redux/hooks'

const mapState = (state: RootState) => ({auth: state.auth})
const connector = connect(mapState, auth.actions)
type PropsFromRedux = ConnectedProps<typeof connector>

const AuthInit: FC<PropsFromRedux> = (props) => {
  const didRequest = useRef(false)
  const dispatch = useDispatch()
  const [showSplashScreen, setShowSplashScreen] = useState(true)
  const accessToken = useAppSelector(selectAccessToken)
  // const accessToken = useSelector<RootState>(({auth}) => auth.data?.token, shallowEqual)

  // We should request user by authToken before rendering the application
  useEffect(() => {
    const requestUser = async () => {
      try {
        if (!didRequest.current) {
          const {data: user} = await getUserByToken()
          //dispatch(props.fulfillUser(user))
        }
      } catch (error) {
        console.error(error)
        if (!didRequest.current) {
          dispatch(logout())
        }
      } finally {
        setShowSplashScreen(false)
      }

      return () => (didRequest.current = true)
    }

    if (accessToken) {
      debugger
      requestUser()
      setShowSplashScreen(false)
    } else {
      dispatch(logout())
      setShowSplashScreen(false)
    }
    // eslint-disable-next-line
  }, [])

  return showSplashScreen ? <LayoutSplashScreen /> : <>{props.children}</>
}

export default connector(AuthInit)
