// /* eslint-disable no-undef */
// import categoryReducer, { setSelectedCategory, fetchCategoriesAsync } from '../../redux/slices/categorySlice'

// const initialState = {
//   categories: [],
//   selectedCategory: 0,
//   loading: false,
//   error: null
// }

// const mockCategories = [
//   { id: 1, name: 'Mock Category 1', image: 'Image 1' },
//   { id: 2, name: 'Mock Category 2', image: 'Image 2' }
// ]

// describe('categorySlice reducers', () => {
//   test('should handle setSelectedCategory', () => {
//     const action = setSelectedCategory(1)
//     const nextState = categoryReducer(initialState, action)

//     expect(nextState.selectedCategory).toEqual(1)
//   })

//   test('should not modify state for unknown action types', () => {
//     const state = {
//       categories: [],
//       selectedCategory: 1,
//       loading: false,
//       error: null
//     }
//     const action = { type: 'UNKNOWN_ACTION' }
//     const nextState = categoryReducer(state, action)

//     expect(nextState).toEqual(state)
//   })

//   // test 0: initial state
//   test('should return initial state', () => {
//     const nextState = categoryReducer(undefined, { type: '' })

//     expect(nextState).toEqual(initialState)
//   })

//   // test 1: fulfill
//   test('should return a list of categories', () => {
//     const action = fetchCategoriesAsync.fulfilled(mockCategories, 'fulfilled')
//     const nextState = categoryReducer(initialState, action)

//     expect(nextState).toEqual({
//       categories: [{ id: 0, name: 'All', image: 'https://i.imgur.com/cLBhSOG.png' }, ...mockCategories],
//       selectedCategory: 0,
//       loading: false,
//       error: null
//     })
//   })

//   // test 2: pending
//   test('should have loading truthy when fetch is pending', () => {
//     const action = fetchCategoriesAsync.pending('pending')
//     const nextState = categoryReducer(initialState, action)

//     expect(nextState).toEqual({
//       categories: [],
//       selectedCategory: 0,
//       loading: true,
//       error: null
//     })
//   })

//   // test 3: error
//   test('should have error', () => {
//     const error = new Error('error')
//     const action = fetchCategoriesAsync.rejected(error, 'error')
//     const nextState = categoryReducer(initialState, action)

//     expect(nextState).toEqual({
//       categories: [],
//       selectedCategory: 0,
//       loading: false,
//       error: error.message
//     })
//   })
// })
