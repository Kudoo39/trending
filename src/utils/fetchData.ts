import axios, { AxiosError } from 'axios'

export const fetchData = async <T>(url: string) => {
  try {
    const response = await axios.get<T>(url)
    return response.data
  } catch (e) {
    const error = e as AxiosError
    return error
  }
}