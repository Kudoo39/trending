import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { toast } from 'react-toastify'

import { CartRealType, CartType, ProductRealType, ProductType, UpdateQuantity } from '../../misc/type'

const cart = JSON.parse(localStorage.getItem('cart') || '[]')

type InitialState = {
  cart: CartRealType[]
}

const initialState: InitialState = {
  cart: cart
}

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
  }
})

export const { addToCart, removeFromCart, updateQuantity, clearCart } = cartSlice.actions

export default cartSlice.reducer
