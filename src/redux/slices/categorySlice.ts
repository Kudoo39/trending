import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Category, RealCategory } from '../../misc/type'
import axios, { AxiosError } from 'axios'

const url = 'https://api.escuelajs.co/api/v1/categories'
const realUrl = 'http://localhost:8080/api/v1/categories'

type InitialState = {
  categories: RealCategory[]
  selectedCategory: string
  loading: boolean
  error: string | null
}

const initialState: InitialState = {
  categories: [],
  selectedCategory: '661554901973ad63139c85fc',
  loading: false,
  error: null
}

export const fetchCategoriesAsync = createAsyncThunk('fetchCategoriesAsync', async () => {
  try {
    const response = await axios.get<RealCategory[]>(realUrl)
    return response.data
  } catch (e) {
    const error = e as AxiosError
    return error
  }
})

const categorySlice = createSlice({
  name: 'category',
  initialState,
  reducers: {
    setSelectedCategory(state, action: PayloadAction<string>) {
      state.selectedCategory = action.payload
    }
  },
  extraReducers(builder) {
    // fetchCategoriesAsync
    builder.addCase(fetchCategoriesAsync.fulfilled, (state, action) => {
      if (!(action.payload instanceof Error)) {
        state.categories = action.payload
      }
      state.loading = false,
      state.error = null
    })
    builder.addCase(fetchCategoriesAsync.pending, state => {
      return {
        ...state,
        loading: true,
        error: null
      }
    })
    builder.addCase(fetchCategoriesAsync.rejected, (state, action) => {
      return {
        ...state,
        loading: false,
        error: action.error.message ?? 'error'
      }
    })
  }
})

export const { setSelectedCategory } = categorySlice.actions

export default categorySlice.reducer
