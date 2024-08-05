import React, {useEffect} from 'react'
import {useDispatch} from 'react-redux'
import {Redirect, Switch} from 'react-router-dom'
import {logout as logoutAction} from './redux/AuthSlice'

export function Logout() {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(logoutAction())
    document.location.reload()
  }, [dispatch])

  return (
    <Switch>
      <Redirect to='/auth/login' />
    </Switch>
  )
}
