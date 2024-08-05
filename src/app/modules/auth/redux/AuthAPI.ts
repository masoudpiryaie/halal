import axios from 'axios'
import {TokenModel} from '../models/TokenModel'

const API_URL = process.env.REACT_APP_API_URL
export const GET_USER_BY_ACCESSTOKEN_URL = `${API_URL}auth/get-user`
export const LOGIN_URL = `${API_URL}Auth/Login`
export const REGISTER_URL = `${API_URL}auth/register`
export const REQUEST_PASSWORD_URL = `${API_URL}auth/forgot-password`

export function fetchCount(amount = 1) {
  return new Promise<{data: number}>((resolve) => setTimeout(() => resolve({data: amount}), 500))
}

export function doLogin(email: string, password: string, captcha: string, cpCode: string) {
  const tenantKey = localStorage.getItem('user-info')
  const Password = password
  const Username = email
  const Captcha = captcha
  const CpCode = cpCode
  //TokenModel any
  return axios.post<any>(LOGIN_URL, {Username, Password, Captcha, CpCode}, {headers: {tenantKey}})
}
