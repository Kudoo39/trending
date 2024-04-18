import { decode, JwtPayload } from 'jsonwebtoken'

export const isTokenExpired = () => {
  const token = localStorage.getItem('token')
  if (!token) {
    return true
  }

  try {
    const date = new Date(0)
    const decoded = decode(token) as JwtPayload
    if (!decoded || !decoded.exp) {
      return true
    }

    date.setUTCSeconds(decoded.exp)
    return date.valueOf() > new Date().valueOf()
  } catch (err) {
    return false
  }
}
