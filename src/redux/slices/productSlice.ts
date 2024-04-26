import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { toast } from 'react-toastify'
import axios, { AxiosError } from 'axios'

import { ManageProductType, ProductType } from '../../misc/type'
import { productEndpoints } from '../../config/config'
import { fetchData } from '../../utils/fetchData'

const realUrl = productEndpoints.products
const token = localStorage.getItem('token')

type InitialState = {
  products: ProductType[]
  total: number
  product: ProductType | null
  loading: boolean
  error: string | null
}

const initialState: InitialState = {
  products: [],
  total: 0,
  product: null,
  loading: false,
  error: null
}

type RealUrlResponse = {
  totalProduct: number
  products: ProductType[]
}

export const fetchProductsAsync = createAsyncThunk(
  'fetchProductsAsync',
  async () => {
    return fetchData<RealUrlResponse>(realUrl)
  }
)

export const fetchProductsAllAsync = createAsyncThunk(
  'fetchProductsAllAsync',
  async ({ searchQuery, minPrice, maxPrice, offset, limit }: { searchQuery: string; minPrice: number; maxPrice: number; offset: number; limit: number }) => {
    if (searchQuery === '') {
      return fetchData<RealUrlResponse>(`${realUrl}?minPrice=${minPrice}&&maxPrice=${maxPrice}&&offset=${offset}&&limit=${limit}`)
    }
    return fetchData<RealUrlResponse>(`${realUrl}?searchQuery=${searchQuery}&&minPrice=${minPrice}&&maxPrice=${maxPrice}&&offset=${offset}&&limit=${limit}`)
  }
)

export const fetchSingleProductAsync = createAsyncThunk('fetchSingleProductAsync', async (_id: string) => {
  return fetchData<ProductType>(`${realUrl}/${_id}`)
})

export const fetchProductsCategoryAllAsync = createAsyncThunk(
  'fetchProductsCategoryAllAsync',
  async ({ categoryId, searchQuery, minPrice, maxPrice, offset, limit }: { categoryId: string; searchQuery: string; minPrice: number; maxPrice: number; offset: number; limit: number }) => {
    if (searchQuery === '') {
      return fetchData<RealUrlResponse>(`${realUrl}/category/${categoryId}?minPrice=${minPrice}&&maxPrice=${maxPrice}&&offset=${offset}&&limit=${limit}`)
    }
    return fetchData<RealUrlResponse>(`${realUrl}/category/${categoryId}?searchQuery=${searchQuery}&&minPrice=${minPrice}&&maxPrice=${maxPrice}&&offset=${offset}&&limit=${limit}`)
  }
)

export const createProductsAsync = createAsyncThunk('createProductsAsync', async (newProduct: ManageProductType) => {
  try {
    const response = await axios.post(realUrl, newProduct, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    toast.success('Product added successfully!', { position: 'bottom-left' })
    return response.data
  } catch (e) {
    const error = e as AxiosError
    toast.error('Product added failed :(', { position: 'bottom-left' })
    return error
  }
})

export const updateProductAsync = createAsyncThunk(
  'updateProductAsync',
  async ({ updateProduct, productId }: { updateProduct: ManageProductType; productId: string }) => {
    try {
      const response = await axios.put(`${realUrl}/${productId}`, updateProduct, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      toast.success('Product updated successfully!', { position: 'bottom-left' })
      return response.data
    } catch (e) {
      const error = e as AxiosError
      toast.error('Product updated failed :(', { position: 'bottom-left' })
      return error
    }
  }
)

export const deleteProductAsync = createAsyncThunk('deleteProductAsync', async (productId: string) => {
  try {
    const response = await axios.delete(`${realUrl}/${productId}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    toast.success('Product removed successfully!', { position: 'bottom-left' })
    return response.data
  } catch (e) {
    const error = e as AxiosError
    toast.error('Product removed failed :(', { position: 'bottom-left' })
    return error
  }
})

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
  extraReducers(builder) {
    // fetchProductsAsync
    builder.addCase(fetchProductsAsync.fulfilled, (state, action) => {
      if (!(action.payload instanceof Error)) {
        return {
          ...state,
          products: action.payload.products,
          total: action.payload.totalProduct,
          loading: false,
          error: null
        }
      }
    })
    builder.addCase(fetchProductsAsync.pending, state => {
      return {
        ...state,
        loading: true
      }
    })
    builder.addCase(fetchProductsAsync.rejected, (state, action) => {
      return {
        ...state,
        loading: false,
        error: action.error.message ?? 'error'
      }
    })
    // fetchProductsAllAsync
    builder.addCase(fetchProductsAllAsync.fulfilled, (state, action) => {
      if (!(action.payload instanceof Error)) {
        return {
          ...state,
          products: action.payload.products,
          total: action.payload.totalProduct,
          loading: false,
          error: null
        }
      }
    })
    builder.addCase(fetchProductsAllAsync.pending, state => {
      return {
        ...state,
        loading: true
      }
    })
    builder.addCase(fetchProductsAllAsync.rejected, (state, action) => {
      return {
        ...state,
        loading: false,
        error: action.error.message ?? 'error'
      }
    })
    // fetchSingleProductAsync
    builder.addCase(fetchSingleProductAsync.fulfilled, (state, action) => {
      if (!(action.payload instanceof Error)) {
        return {
          ...state,
          product: action.payload,
          loading: false,
          error: null
        }
      }
    })
    builder.addCase(fetchSingleProductAsync.pending, state => {
      return {
        ...state,
        loading: true
      }
    })
    builder.addCase(fetchSingleProductAsync.rejected, (state, action) => {
      return {
        ...state,
        loading: false,
        error: action.error.message ?? 'error'
      }
    })
    //fetchProductsCategoryAllAsync
    builder.addCase(fetchProductsCategoryAllAsync.fulfilled, (state, action) => {
      if (!(action.payload instanceof Error)) {
        return {
          ...state,
          products: action.payload.products,
          total: action.payload.totalProduct,
          loading: false,
          error: null
        }
      }
    })
    builder.addCase(fetchProductsCategoryAllAsync.pending, state => {
      return {
        ...state,
        loading: true
      }
    })
    builder.addCase(fetchProductsCategoryAllAsync.rejected, (state, action) => {
      return {
        ...state,
        loading: false,
        error: action.error.message ?? 'error'
      }
    })
    // createProductsAsync
    builder.addCase(createProductsAsync.fulfilled, (state, action) => {
      return {
        ...state,
        products: [...state.products, action.payload],
        loading: false,
        error: null
      }
    })
    builder.addCase(createProductsAsync.pending, state => {
      return {
        ...state,
        loading: true
      }
    })
    builder.addCase(createProductsAsync.rejected, (state, action) => {
      return {
        ...state,
        loading: false,
        error: action.error.message ?? 'error'
      }
    })
    // updateProductAsync
    builder.addCase(updateProductAsync.fulfilled, (state, action) => {
      const findingProduct = state.products.findIndex(item => item._id === action.payload._id)
      if (findingProduct !== -1) {
        return {
          ...state,
          products: state.products.map((product, index) => (index === findingProduct ? action.payload : product)),
          loading: false,
          error: null
        }
      }
      return state
    })
    builder.addCase(updateProductAsync.pending, state => {
      return {
        ...state,
        loading: true
      }
    })
    builder.addCase(updateProductAsync.rejected, (state, action) => {
      return {
        ...state,
        loading: false,
        error: action.error.message ?? 'error'
      }
    })
    // deleteProductAsync
    builder.addCase(deleteProductAsync.fulfilled, (state, action) => {
      return {
        ...state,
        products: state.products.filter(product => product._id !== action.payload._id),
        loading: false,
        error: null
      }
    })
    builder.addCase(deleteProductAsync.pending, state => {
      return {
        ...state,
        loading: true
      }
    })
    builder.addCase(deleteProductAsync.rejected, (state, action) => {
      return {
        ...state,
        loading: false,
        error: action.error.message ?? 'error'
      }
    })
  }
})

export default productSlice.reducer
