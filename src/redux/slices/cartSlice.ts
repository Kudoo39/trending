import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { toast } from 'react-toastify'

import { CartRealType, CartType, ProductRealType, ProductType, UpdateQuantity } from '../../misc/type'
import axios, { AxiosError } from 'axios'

const cart = JSON.parse(localStorage.getItem('cart') || '[]')

const url = 'http://localhost:8080/api/v1/orders'

type InitialState = {
  cart: CartRealType[]
}

const initialState: InitialState = {
  cart: cart
}

export const addOrderByUserId = createAsyncThunk('addOrderByUserId', async (userId: string) => {
  try {
    const response = await axios.post(url, userId)
    toast.success('Order added successfully!', { position: 'bottom-left' })
    return response.data
  } catch (e) {
    const error = e as AxiosError
    toast.error('Order added failed :/', { position: 'bottom-left' })
    return error
  }
})

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<ProductRealType>) => {
      const existingItem = state.cart.find(item => item._id === action.payload._id)
      if (existingItem) {
        existingItem.quantity += 1
        toast.info(`Quantity of "${action.payload.title}" increased`, { position: 'bottom-left' })
      } else {
        const tempProduct = { ...action.payload, quantity: 1 }
        state.cart.push(tempProduct)
        toast.success(`Added "${action.payload.title}" to the cart`, { position: 'bottom-left' })
      }
      localStorage.setItem('cart', JSON.stringify(state.cart))
    },

    removeFromCart: (state, action: PayloadAction<string>) => {
      state.cart = state.cart.filter(item => item._id !== action.payload)
      toast.error('Removed item from the cart', { position: 'bottom-left' })
      localStorage.setItem('cart', JSON.stringify(state.cart))
    },

    updateQuantity(state, action: PayloadAction<UpdateQuantity>) {
      const { _id, quantity } = action.payload
      const updateItem = state.cart.find(item => item._id === _id)
      if (updateItem) {
        updateItem.quantity += quantity
        localStorage.setItem('cart', JSON.stringify(state.cart))
      }
    },

    clearCart(state) {
      state.cart = []
      localStorage.setItem('cart', JSON.stringify(state.cart))
    }
  },
  extraReducers(builder) {
    builder.addCase(addOrderByUserId.fulfilled, (state, action) => {
      return {
        ...state,
        user: action.payload,
        loading: false
      }
    })
    builder.addCase(addOrderByUserId.pending, state => {
      return {
        ...state,
        loading: true
      }
    })
    builder.addCase(addOrderByUserId.rejected, (state, action) => {
      return {
        ...state,
        loading: false,
        error: action.error.message ?? 'error'
      }
    })
  }
})

export const { addToCart, removeFromCart, updateQuantity, clearCart } = cartSlice.actions

export default cartSlice.reducer
