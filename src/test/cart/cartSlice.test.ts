/* eslint-disable no-undef */
import cartReducer, { addToCart, removeFromCart, updateQuantity, clearCart, addOrderByUserId, getOrderByUserId } from '../../redux/slices/cartSlice'

const initialState = {
  cart: [
    {
      _id: '1',
      title: 'Product 1',
      price: 10,
      description: 'Description 1',
      categoryId: { _id: '1', name: 'Category 1', image: 'Image 1' },
      image: 'Image 1',
      quantity: 2
    },
    {
      _id: '2',
      title: 'Product 2',
      price: 20,
      description: 'Description 2',
      categoryId: { _id: '2', name: 'Category 2', image: 'Image 2' },
      image: 'Image 2',
      quantity: 4
    }
  ],
  orders: [],
  loading: false,
  error: null
}

const mockItem = {
  _id: '3',
  title: 'Product 3',
  price: 30,
  description: 'Description 3',
  categoryId: { _id: '3', name: 'Category 3', image: 'Image 3' },
  image: 'Image 3',
  quantity: 3
}

const mockOrder = {
  products: [
    { productId: 'product1', quantity: 2 },
    { productId: 'product2', quantity: 1 }
  ]
}

describe('cartSlice reducers', () => {
  test('should add items to the cart', () => {
    const action = addToCart(mockItem)
    const nextState = cartReducer(initialState, action)

    expect(nextState.cart.length).toBe(3)
  })

  test('should remove items from the cart', () => {
    const action = removeFromCart('1')
    const nextState = cartReducer(initialState, action)

    expect(nextState.cart.length).toBe(1)
    expect(nextState.cart.find(item => item._id === '1')).toBeUndefined()
  })

  test('should not remove any items if the item is not in the cart', () => {
    const action = removeFromCart('100')
    const nextState = cartReducer(initialState, action)

    expect(nextState.cart.length).toBe(2)
  })

  test('should update quantity of an item in the cart', () => {
    const action = updateQuantity({ _id: '1', quantity: 2 })
    const nextState = cartReducer(initialState, action)

    expect(nextState.cart[0].quantity).toBe(4)
  })

  test('should not update quantity if item does not exist in the cart', () => {
    const updateAction = updateQuantity({ _id: '3', quantity: 3 })
    const nextState = cartReducer(initialState, updateAction)

    expect(nextState).toEqual(initialState)
  })

  test('should clear the cart', () => {
    const action = clearCart()
    const nextState = cartReducer(initialState, action)

    expect(nextState.cart).toEqual([])
    expect(nextState.cart.length).toBe(0)
  })

  // test 1: addOrderByUserId fulfill
  test('should add order by user id', () => {
    const action = addOrderByUserId.fulfilled(mockItem, 'fulfilled', { userId: '1', orders: mockOrder })
    const nextState = cartReducer(initialState, action)

    expect(nextState).toEqual({
      cart: initialState.cart,
      orders: [],
      loading: false,
      error: null
    })
  })

  // test 2: addOrderByUserId pending
  test('should have loading truthy when order is adding', () => {
    const action = addOrderByUserId.pending('pending', { userId: '1', orders: mockOrder })
    const nextState = cartReducer(initialState, action)

    expect(nextState).toEqual({
      cart: initialState.cart,
      orders: [],
      loading: true,
      error: null
    })
  })

  // test 3: addOrderByUserId error
  test('should show error when adding order failed', () => {
    const error = new Error('error')
    const action = addOrderByUserId.rejected(error, 'error', { userId: '1', orders: mockOrder })
    const nextState = cartReducer(initialState, action)

    expect(nextState).toEqual({
      cart: initialState.cart,
      orders: [],
      loading: false,
      error: error.message
    })
  })

  // test 4: getOrderByUserId fulfill
  test('should get order by user id', () => {
    const action = getOrderByUserId.fulfilled(mockItem, 'fulfilled', '1')
    const nextState = cartReducer(initialState, action)

    expect(nextState).toEqual({
      cart: initialState.cart,
      orders: mockItem,
      loading: false,
      error: null
    })
  })

  // test 5: getOrderByUserId pending
  test('should have loading truthy when order is fetching', () => {
    const action = getOrderByUserId.pending('fulfilled', '1')
    const nextState = cartReducer(initialState, action)

    expect(nextState).toEqual({
      cart: initialState.cart,
      orders: [],
      loading: true,
      error: null
    })
  })

  // test 6: getOrderByUserId error
  test('should show error when get orders failed', () => {
    const error = new Error('error')
    const action = getOrderByUserId.rejected(error, 'error', '1')
    const nextState = cartReducer(initialState, action)

    expect(nextState).toEqual({
      cart: initialState.cart,
      orders: [],
      loading: false,
      error: error.message
    })
  })
})
