import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import {RootState} from 'setup/redux/Store'
import {UserModel} from '../models/UserModel'
import {doLogin} from './AuthAPI'
import {UsersTableMock} from '../__mocks__/usersTableMock'
import jwt from 'jwt-decode'
import {toast} from 'react-toastify'

export interface IAuthState {
  user?: UserModel
  data?: {
    token: string
    refreshToken: string
    refreshTokenExpiryTime: string
    claims: string[]
    memberId: string
    passchange: boolean
  }

  token: string
  loading: boolean
}
let initialState: IAuthState = {
  user: undefined,
  data: undefined,
  token: '',
  loading: false,
}

try {
  const userInfo = localStorage.getItem('user-info')
  if (userInfo) {
    initialState = JSON.parse(userInfo)
  }
} catch (e) {
  console.log(e)
}

export const doLoginAsync = createAsyncThunk(
  'auth/doLogin',
  async ({
    email,
    password,
    captcha,
    cpCode,
  }: {
    email: string
    password: string
    captcha: string
    cpCode: string
  }) => {
    try {
      const response = await doLogin(email, password, captcha, cpCode)
      debugger
      return response.data
    } catch (e) {
      const API_URL = process.env.REACT_APP_API_URL || 'api'

      const resp = await fetch(API_URL + 'Auth/GetCaptcha')
      debugger
      const json = await resp.json()
      localStorage.setItem('img', 'data:image/png;base64,' + json.value.img)
      localStorage.setItem('cpCode', json.value.cpCode)
      toast.error(e)
    }
  }
)

export const AuthSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    // login: (state, action) => {
    //   state.accessToken = action.payload?.accessToken;
    //   state.user = undefined;
    // },
    register: (state, action) => {
      // const accessToken = action.payload?.accessToken
      // state = {accessToken, user: undefined}
    },
    logout: (state) => {
      state = initialState
      localStorage.removeItem('user-info')
    },
    userRequested: (state, action) => {
      state.user = undefined
    },
    userLoaded: (state, action) => {
      state.user = action.payload?.user
    },
    setUser: (state, action) => {
      state.user = action.payload?.user
    },
  },
  extraReducers: (builder) => {
    //

    builder
      .addCase(doLoginAsync.pending, (state) => {
        state.user = undefined
        state.loading = true
      })
      .addCase(doLoginAsync.fulfilled, (state, action) => {
        debugger
        state.loading = false
        if (action.payload !== undefined) {
          state.data = action.payload.data

          //state.user = UsersTableMock.table[0]
          debugger
          if (action.payload) {
            //state.user = jwt(action.payload.value.accessToken) //to do
            state.user = action.payload.value.accessToken //to do
            var bb = {
              token: action.payload.value.accessToken.token,
              refreshToken: action.payload.value.refreshToken.token,
              refreshTokenExpiryTime: '',
              claims: state.user !== undefined ? state.user.access : [],
              memberId: action.payload.value.user.memberId,
              passchange: action.payload.value.user.passwordIsChange,
            }
            state.data = bb
            // state.data?.claims = state.user.access
            localStorage.setItem('user-info', JSON.stringify(state))
            localStorage.setItem('token', action.payload.value.accessToken.token)
            localStorage.setItem('refreshToken', action.payload.value.refreshToken.token)
            //state.auth.claims = '5545'
          }
        }
      })
      .addCase(doLoginAsync.rejected, (state, action) => {
        state.loading = false
        console.log(action.payload)
      })
  },
})

export const {register, logout, userLoaded, userRequested, setUser} = AuthSlice.actions

export const selectAccessToken = (state: RootState) => state.auth.data?.token
export const selectUser = (state: RootState) => state.auth.user
export const selectmemberId = (state: RootState) => state.auth.data?.memberId
export const selectpasschange = (state: RootState) => state.auth.data?.passchange
export const selectClaims = (state: RootState) => state.auth.data?.claims
export const selectLoading = (state: RootState) => state.auth.loading

export default AuthSlice.reducer
