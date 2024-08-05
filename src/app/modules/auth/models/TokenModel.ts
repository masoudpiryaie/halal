export interface TokenModel {
  data: {
    accessToken?: string
    refreshToken: string
    refreshTokenExpiryTime: string
    claims: string[]
  }
  token?: {
    errors: []
    isSuccess: true
    value: {
      accessTokenExpireDate: string
      mobileIsConfirmed: boolean
      refreshToken: boolean
      token: string
    }
  }
  messages: string
  succeeded: boolean
}
