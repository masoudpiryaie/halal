import {all} from 'redux-saga/effects'
import {combineReducers} from 'redux'

import * as auth from '../../app/modules/auth'
import AuthReducer from 'app/modules/auth/redux/AuthSlice'

export const rootReducer = combineReducers({
  auth: AuthReducer,
})

export type RootState = ReturnType<typeof rootReducer>

export function* rootSaga() {
  yield all([auth.saga()])
}
