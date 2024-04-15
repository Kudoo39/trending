import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { toast } from 'react-toastify'
import axios, { AxiosError } from 'axios'

import { CreateProductType, CreateRealProductType, ProductRealType, ProductType, UpdateProductType } from '../../misc/type'

const url = 'https://api.escuelajs.co/api/v1/products'
const realUrl = 'http://localhost:8080/api/v1/products'
const categoryUrl = 'https://api.escuelajs.co/api/v1/categories'

type InitialState = {
  products: ProductRealType[]
  total: number
  product: ProductRealType | null
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
  products: ProductRealType[]
}

export const fetchProductsAsync = createAsyncThunk('fetchProductsAsync', async () => {
  try {
    const response = await axios.get<RealUrlResponse>(realUrl)
    return response.data
  } catch (e) {
    const error = e as AxiosError
    return error
  }
})

export const fetchSingleProductAsync = createAsyncThunk('fetchSingleProductAsync', async (_id: string) => {
  try {
    const response = await axios.get<ProductRealType>(`${realUrl}/${_id}`)
    return response.data
  } catch (e) {
    const error = e as Error
    return error
  }
})

export const fetchProductsPageAsync = createAsyncThunk(
  'fetchProductsPageAsync',
  async ({ offset, limit }: { offset: number; limit: number }) => {
    try {
      const response = await axios.get<RealUrlResponse>(`${realUrl}?offset=${offset}&&limit=${limit}`)
      return response.data
    } catch (e) {
      const error = e as AxiosError
      return error
    }
  }
)

export const fetchProductsCategoryAsync = createAsyncThunk('fetchProductsCategoryAsync', async (categoryId: string) => {
  try {
    const response = await axios.get<RealUrlResponse>(`${realUrl}/category/${categoryId}`)
    return response.data
  } catch (e) {
    const error = e as AxiosError
    return error
  }
})

export const fetchProductsCategoryPageAsync = createAsyncThunk(
  'fetchProductsCategoryPageAsync',
  async ({ categoryId, offset, limit }: { categoryId: string; offset: number; limit: number }) => {
    try {
      const response = await axios.get<RealUrlResponse>(
        `${realUrl}/category/${categoryId}?offset=${offset}&&limit=${limit}`
      )
      return response.data
    } catch (e) {
      const error = e as AxiosError
      return error
    }
  }
)

export const createProductsAsync = createAsyncThunk('createProductsAsync', async (newProduct: CreateRealProductType) => {
  try {
    const response = await axios.post(realUrl, newProduct)
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
  async ({ updateProduct, productId }: { updateProduct: UpdateProductType; productId: string }) => {
    try {
      const response = await axios.put(`${url}/${productId}`, updateProduct)
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
    const response = await axios.delete(`${url}/${productId}`)
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
    //fetchProductsPageAsync
    builder.addCase(fetchProductsPageAsync.fulfilled, (state, action) => {
      if (!(action.payload instanceof Error)) {
        return {
          ...state,
          products: action.payload.products,
          loading: false,
          error: null
        }
      }
    })
    builder.addCase(fetchProductsPageAsync.pending, state => {
      return {
        ...state,
        loading: true
      }
    })
    builder.addCase(fetchProductsPageAsync.rejected, (state, action) => {
      return {
        ...state,
        loading: false,
        error: action.error.message ?? 'error'
      }
    })
    // fetchProductsCategoryAsync
    builder.addCase(fetchProductsCategoryAsync.fulfilled, (state, action) => {
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
    builder.addCase(fetchProductsCategoryAsync.pending, state => {
      return {
        ...state,
        loading: true
      }
    })
    builder.addCase(fetchProductsCategoryAsync.rejected, (state, action) => {
      return {
        ...state,
        loading: false,
        error: action.error.message ?? 'error'
      }
    })
    //fetchProductsCategoryPageAsync
    builder.addCase(fetchProductsCategoryPageAsync.fulfilled, (state, action) => {
      if (!(action.payload instanceof Error)) {
        return {
          ...state,
          products: action.payload.products,
          loading: false,
          error: null
        }
      }
    })
    builder.addCase(fetchProductsCategoryPageAsync.pending, state => {
      return {
        ...state,
        loading: true
      }
    })
    builder.addCase(fetchProductsCategoryPageAsync.rejected, (state, action) => {
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
