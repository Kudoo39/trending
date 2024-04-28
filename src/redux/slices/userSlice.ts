import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios, { AxiosError } from 'axios'
import { toast } from 'react-toastify'

import { User, UserRegister, UpdatePasswordType, UpdateUserType, UserCredential } from '../../misc/type'
import { userEndpoints } from '../../config/config'

const realUserUrl = userEndpoints.user
const realLoginUrl = userEndpoints.login
const realProfileUrl = userEndpoints.profile
const realProfilePasswordUrl = userEndpoints.profilePassword

const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true'
const token = localStorage.getItem('token')

type InitialState = {
  user?: User | null
  users: User[]
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

export const fetchUsersAsync = createAsyncThunk(
  'fetchUsersAsync',
  async () => {
    try {
      const response = await axios.get<User[]>(realUserUrl, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      return response.data
    } catch (e) {
      const error = e as AxiosError
      return error
    }
  }
)

export const registerUserAsync = createAsyncThunk('registerUserAsync', async (userData: UserRegister) => {
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

export const authenticateUserAsync = createAsyncThunk('authenticateUserAsync', async (accessToken: string) => {
  try {
    const authentication = await axios.get(realProfileUrl, {
      headers: {
        Authorization: `Bearer ${accessToken}`
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
      return authentication.payload as User
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
      const response = await axios.put(`${realUserUrl}/${userId}`, updateUser, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
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
      const response = await axios.patch(`${realProfilePasswordUrl}`, updatePassword, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
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
    // fetchUsersAsync
    builder.addCase(fetchUsersAsync.fulfilled, (state, action) => {
      if (!(action.payload instanceof Error)) {
        return {
          ...state,
          users: action.payload,
          loading: false,
          error: null
        }
      }
    })
    builder.addCase(fetchUsersAsync.pending, state => {
      return {
        ...state,
        loading: true
      }
    })
    builder.addCase(fetchUsersAsync.rejected, (state, action) => {
      return {
        ...state,
        loading: false,
        error: action.error.message ?? 'error'
      }
    })
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
        user: action.payload as User,
        loading: false
      }
    })
    builder.addCase(loginUserAsync.pending, (state) => {
      return {
        ...state,
        loading: true,
        error: null
      }
    })
    builder.addCase(loginUserAsync.rejected, (state, action) => {
      return {
        ...state,
        loading: false,
        error: action.error.message ?? 'error'
      }
    })
    // registerUserAsync
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
