// /* eslint-disable no-undef */
// import cartReducer, { addToCart, removeFromCart, updateQuantity, clearCart } from '../../redux/slices/cartSlice'

// const initialState = {
//   cart: [
//     {
//       id: 1,
//       title: 'Product 1',
//       price: 10,
//       description: 'Description 1',
//       category: { id: 1, name: 'Category 1', image: 'Image 1' },
//       images: ['Image 1'],
//       quantity: 2
//     },
//     {
//       id: 2,
//       title: 'Product 2',
//       price: 20,
//       description: 'Description 2',
//       category: { id: 2, name: 'Category 2', image: 'Image 2' },
//       images: ['Image 2'],
//       quantity: 4
//     }
//   ]
// }

// const mockItem = {
//   id: 3,
//   title: 'Product 3',
//   price: 30,
//   description: 'Description 3',
//   category: { id: 3, name: 'Category 3', image: 'Image 3' },
//   images: ['Image 3'],
//   quantity: 3
// }

// describe('cartSlice reducers', () => {
//   test('should add items to the cart', () => {
//     const action = addToCart(mockItem)
//     const nextState = cartReducer(initialState, action)

//     expect(nextState.cart.length).toBe(3)
//   })

//   test('should remove items from the cart', () => {
//     const action = removeFromCart(1)
//     const nextState = cartReducer(initialState, action)

//     expect(nextState.cart.length).toBe(1)
//     expect(nextState.cart.find(item => item.id === 1)).toBeUndefined()
//   })

//   test('should not remove any items if the item is not in the cart', () => {
//     const action = removeFromCart(100)
//     const nextState = cartReducer(initialState, action)

//     expect(nextState.cart.length).toBe(2)
//   })

//   test('should update quantity of an item in the cart', () => {
//     const action = updateQuantity({ id: 1, quantity: 2 })
//     const nextState = cartReducer(initialState, action)

//     expect(nextState.cart[0].quantity).toBe(4)
//   })

//   test('should not update quantity if item does not exist in the cart', () => {
//     const updateAction = updateQuantity({ id: 3, quantity: 3 })
//     const nextState = cartReducer(initialState, updateAction)

//     expect(nextState).toEqual(initialState)
//   })

//   test('should clear the cart', () => {
//     const action = clearCart()
//     const nextState = cartReducer(initialState, action)

//     expect(nextState.cart).toEqual([])
//     expect(nextState.cart.length).toBe(0)
//   })
// })
