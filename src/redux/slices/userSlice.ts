import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios, { AxiosError } from 'axios'
import { toast } from 'react-toastify'

import { RealUser, RealUserRegister, UpdatePasswordType, UpdateUserType, UserCredential } from '../../misc/type'

const realUserUrl = 'http://localhost:8080/api/v1/users'

const realLoginUrl = 'http://localhost:8080/api/v1/users/login'

const realProfileUrl = 'http://localhost:8080/api/v1/users/profile'
const realProfilePasswordUrl = 'http://localhost:8080/api/v1/users/password'

const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true'

type InitialState = {
  user?: RealUser | null
  users: RealUser[]
  loading: boolean
  error: string | null
  isAuthenticated: boolean
}

const initialState: InitialState = {
  users: [],
  loading: false,
  error: null,
  isAuthenticated: isAuthenticated
}

export const registerUserAsync = createAsyncThunk('registerUserAsync', async (userData: RealUserRegister) => {
  try {
    const response = await axios.post(realUserUrl, userData)
    toast.success('Account created successfully!', { position: 'bottom-left' })
    return response.data
  } catch (e) {
    const error = e as AxiosError
    toast.error('Registration failed. Please try again.', { position: 'bottom-left' })
    return error
  }
})

export const authenticateUserAsync = createAsyncThunk('authenticateUserAsync', async (token: string) => {
  try {
    const authentication = await axios.get(realProfileUrl, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    return authentication.data
  } catch (e) {
    const error = e as AxiosError
    return error
  }
})

export const loginUserAsync = createAsyncThunk(
  'loginUserAsync',
  async (userCredential: UserCredential, { dispatch }) => {
    try {
      const response = await axios.post<{ token: string }>(realLoginUrl, userCredential)
      toast.success('Login successfully!', { position: 'bottom-left' })
      localStorage.setItem('isAuthenticated', 'true')
      localStorage.setItem('token', response.data.token)

      const authentication = await dispatch(authenticateUserAsync(response.data.token))
      return authentication.payload as RealUser
    } catch (e) {
      const error = e as Error
      toast.error('Login failed. Please try again!', { position: 'bottom-left' })
      return error
    }
  }
)

export const updateUserProfileAsync = createAsyncThunk(
  'updateUserProfileAsync',
  async ({ updateUser, userId }: {updateUser: UpdateUserType, userId: string}) => {
    try {
      const response = await axios.put(`${realUserUrl}/${userId}`, updateUser)
      toast.success('Profile updated successfully!', { position: 'bottom-left' })
      return response.data
    } catch (e) {
      const error = e as Error
      toast.error('Update failed. Please try again!', { position: 'bottom-left' })
      return error
    }
  }
)

export const updateUserPasswordAsync = createAsyncThunk(
  'updateUserPasswordAsync',
  async ({ updatePassword }: {updatePassword: UpdatePasswordType }) => {
    try {
      const response = await axios.patch(`${realProfilePasswordUrl}`, updatePassword)
      toast.success('Password updated successfully!', { position: 'bottom-left' })
      return response.data
    } catch (e) {
      const error = e as Error
      toast.error('Update password failed. Please try again!', { position: 'bottom-left' })
      return error
    }
  }
)

const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    logout(state) {
      state.user = null
      state.loading = false
      state.isAuthenticated = false
      localStorage.removeItem('token')
      localStorage.removeItem('isAuthenticated')
      toast.success('Logout successfully!', { position: 'bottom-left' })
    }
  },
  extraReducers(builder) {
    builder.addCase(authenticateUserAsync.fulfilled, (state, action) => {
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
        loading: false
      }
    })
    builder.addCase(loginUserAsync.fulfilled, (state, action) => {
      return {
        ...state,
        user: action.payload as RealUser,
        loading: false
      }
    })
    builder.addCase(registerUserAsync.fulfilled, (state, action) => {
      return {
        ...state,
        user: action.payload,
        loading: false
      }
    })
    builder.addCase(registerUserAsync.pending, state => {
      return {
        ...state,
        loading: true
      }
    })
    builder.addCase(registerUserAsync.rejected, (state, action) => {
      return {
        ...state,
        loading: false,
        error: action.error.message ?? 'error'
      }
    })
    // updateUserProfileAsync
    builder.addCase(updateUserProfileAsync.fulfilled, (state, action) => {
      const findindUser = state.users.findIndex(user => user._id === action.payload._id)
      if (findindUser !== -1) {
        return {
          ...state,
          users: state.users.map((user, index) => (index === findindUser ? action.payload : user)),
          loading: false,
          error: null
        }
      }
      return state
    })
    builder.addCase(updateUserProfileAsync.pending, state => {
      return {
        ...state,
        loading: true
      }
    })
    builder.addCase(updateUserProfileAsync.rejected, (state, action) => {
      return {
        ...state,
        loading: false,
        error: action.error.message ?? 'error'
      }
    })

    // updateUserPasswordAsync
    builder.addCase(updateUserPasswordAsync.fulfilled, state => {
      return {
        ...state,
        loading: false
      }
    })
    builder.addCase(updateUserPasswordAsync.pending, state => {
      return {
        ...state,
        loading: true
      }
    })
    builder.addCase(updateUserPasswordAsync.rejected, (state, action) => {
      return {
        ...state,
        loading: false,
        error: action.error.message ?? 'error'
      }
    })
  }
})

export const { logout } = userSlice.actions
export default userSlice.reducer
