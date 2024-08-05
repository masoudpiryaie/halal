import {AxiosError, AxiosRequestConfig, AxiosResponse} from 'axios'
import {toast} from 'react-toastify'

export default function setupAxios(axios: any, store: any) {
  axios.defaults.baseURL = process.env.REACT_APP_API_URL
  axios.interceptors.request.use(
    (config: AxiosRequestConfig): AxiosRequestConfig => {
      let accessToken = store.getState()?.auth?.data?.token
      // let accessToken = localStorage.getItem('token')fghp comment

      if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`
      }

      return config
    },
    (error: AxiosError) => {
      if (error.response && error.response.status === 403) {
        toast.info('شما به این عملیات دسترسی ندارید', {
          position: 'top-center',
        })
      }
      return Promise.reject(error)
    }
  )
  axios.interceptors.response.use(
    function (response: AxiosResponse) {
      if (response.data.isSuccess) return response
      else {
        toast.error(response.data.message, {
          position: 'top-center',
        })
        return false
      }
    },
    async function (error: AxiosError & {processed: boolean}) {
      if (error.response && error.response.status === 403) {
        toast.error('شما به این عملیات دسترسی ندارید', {
          position: 'top-center',
        })
        error.processed = true
      }
      if (error.response && error.response.status === 409) {
        toast.error('رکورد تکراری است ', {
          position: 'top-center',
        })
        error.processed = true
      }
      if (error.response && error.response.status === 400) {
        debugger
        var str = decodeURIComponent(error.response.data.Errors)
        toast.error(str, {
          position: 'top-center',
        })
        error.processed = true
      }
      if (error.response && error.response.status === 405) {
        debugger
        var str = decodeURIComponent(error.response.data.Errors)
        toast.error(str, {
          position: 'top-center',
        })
        error.processed = true
      }
      if (error.response && error.response.status === 404) {
        var str = decodeURIComponent(error.response.data.Errors)
        toast.error(str, {
          position: 'top-center',
        })
        error.processed = true
      }
      if (error.response && error.response.status === 401) {
        debugger
        store = undefined
        localStorage.removeItem('user-info')
        const originalRequest = error.config
        // var token = localStorage.getItem('token')
        // let accessToken = store.getState()?.auth?.data?.token.token
        // let refreshToken = store.getState()?.auth?.data?.refreshToken.token
        // let url = 'http://admings1.pardcoservice.ir/api/Auth/RefreshToken'
        // const fetchResponse = await fetch(`${url}`, {
        //   method: 'POST',
        //   headers: {
        //     Accept: 'application/json',
        //     'Content-Type': 'application/json',
        //   },
        //   body: JSON.stringify({
        //     accessToken: accessToken,
        //     refreshToken: refreshToken,
        //   }),
        // })
        // const resp = await fetchResponse.json()

        // localStorage.setItem('token', resp.value.accessToken.token)
        // localStorage.setItem('refreshToken', resp.value.refreshToken.token)
        // axios.defaults.headers.common['Authorization'] = `Bearer ${resp.value.accessToken.token}`
        return axios(originalRequest)
      }
      return Promise.reject(error)
    }
  )
}
