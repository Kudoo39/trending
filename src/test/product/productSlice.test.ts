/* eslint-disable no-undef */
import { ManageProductType } from '../../misc/type'
import productReducer, {
  createProductsAsync,
  deleteProductAsync,
  fetchProductsAllAsync,
  fetchProductsAsync,
  fetchProductsCategoryAllAsync,
  fetchSingleProductAsync,
  updateProductAsync
} from '../../redux/slices/productSlice'

const initialState = {
  products: [],
  total: 0,
  product: null,
  loading: false,
  error: null
}

const searchQuery = ''
const minPrice = 0
const maxPrice = 10000
const offset = 0
const limit = 10

const mockProducts = {
  totalProduct: 2,
  products: [
    {
      _id: '3',
      title: 'Product 3',
      price: 30,
      description: 'Description 3',
      categoryId: { _id: '3', name: 'Category 3', image: 'Image 3' },
      image: 'Image 3',
      quantity: 6
    },
    {
      _id: '4',
      title: 'Product 4',
      price: 40,
      description: 'Description 4',
      categoryId: { _id: '4', name: 'Category 4', image: 'Image 4' },
      image: 'Image 4',
      quantity: 2
    }
  ]
}

const mockSingleProduct = {
  _id: '5',
  title: 'Product 5',
  price: 50,
  description: 'Description 5',
  categoryId: { _id: '5', name: 'Category 5', image: 'Image 5' },
  image: 'Image 5',
  quantity: 10
}

describe('productSlice reducers', () => {
  // test 0: initial state
  test('should return initial state', () => {
    const nextState = productReducer(undefined, { type: '' })

    expect(nextState).toEqual(initialState)
  })

  // test 1: fetchProductsAsync fulfill
  test('should fetch all products', () => {
    const action = fetchProductsAsync.fulfilled(mockProducts, 'fulfilled')
    const nextState = productReducer(initialState, action)

    expect(nextState).toEqual({
      products: mockProducts.products,
      total: mockProducts.totalProduct,
      product: null,
      loading: false,
      error: null
    })
  })

  // test 2: fetchProductsAsync pending
  test('should have loading truthy when fetch is pending', () => {
    const action = fetchProductsAsync.pending('pending')
    const nextState = productReducer(initialState, action)

    expect(nextState).toEqual({
      products: [],
      total: 0,
      product: null,
      loading: true,
      error: null
    })
  })

  // test 3: fetchProductsAsync error
  test('should have loading truthy when fetch is pending', () => {
    const error = new Error('error')
    const action = fetchProductsAsync.rejected(error, 'error')
    const nextState = productReducer(initialState, action)

    expect(nextState).toEqual({
      products: [],
      total: 0,
      product: null,
      loading: false,
      error: error.message
    })
  })

  // test 4: fetchSingleProductAsync fulfill
  test('should fetch a product', () => {
    const action = fetchSingleProductAsync.fulfilled(mockSingleProduct, 'fulfilled', '1')
    const nextState = productReducer(initialState, action)

    expect(nextState).toEqual({
      products: [],
      total: 0,
      product: mockSingleProduct,
      loading: false,
      error: null
    })
  })

  // test 5: fetchSingleProductAsync pending
  test('should fetch a product', () => {
    const action = fetchSingleProductAsync.pending('pending', '1')
    const nextState = productReducer(initialState, action)

    expect(nextState).toEqual({
      products: [],
      total: 0,
      product: null,
      loading: true,
      error: null
    })
  })

  // test 6: fetchSingleProductAsync error
  test('should have errors', () => {
    const error = new Error('error')
    const action = fetchSingleProductAsync.rejected(error, 'error', '1')
    const nextState = productReducer(initialState, action)

    expect(nextState).toEqual({
      products: [],
      total: 0,
      product: null,
      loading: false,
      error: error.message
    })
  })

  // test 6.1: fetchProductsAllAsync fulfill
  test('should fetch all products based on query', () => {
    const action = fetchProductsAllAsync.fulfilled(mockProducts, 'fulfilled', { searchQuery, minPrice, maxPrice, offset, limit })
    const nextState = productReducer(initialState, action)

    expect(nextState).toEqual({
      products: mockProducts.products,
      total: mockProducts.totalProduct,
      product: null,
      loading: false,
      error: null
    })
  })

  // test 6.2: fetchProductsAllAsync pending
  test('should have loading truthy when fetch is pending', () => {
    const action = fetchProductsAllAsync.pending('pending', { searchQuery, minPrice, maxPrice, offset, limit })
    const nextState = productReducer(initialState, action)

    expect(nextState).toEqual({
      products: [],
      total: 0,
      product: null,
      loading: true,
      error: null
    })
  })

  // test 6.3: fetchProductsAllAsync error
  test('should have loading truthy when fetch is pending', () => {
    const error = new Error('error')
    const action = fetchProductsAllAsync.rejected(error, 'error', { searchQuery, minPrice, maxPrice, offset, limit })
    const nextState = productReducer(initialState, action)

    expect(nextState).toEqual({
      products: [],
      total: 0,
      product: null,
      loading: false,
      error: error.message
    })
  })

  // test 6.4: fetchProductsCategoryAllAsync fulfill
  test('should fetch all products based on query with category', () => {
    const action = fetchProductsCategoryAllAsync.fulfilled(mockProducts, 'fulfilled', { categoryId: '1', searchQuery, minPrice, maxPrice, offset, limit })
    const nextState = productReducer(initialState, action)

    expect(nextState).toEqual({
      products: mockProducts.products,
      total: mockProducts.totalProduct,
      product: null,
      loading: false,
      error: null
    })
  })

  // test 6.5: fetchProductsCategoryAllAsync pending
  test('should have loading truthy when fetch is pending', () => {
    const action = fetchProductsCategoryAllAsync.pending('pending', { categoryId: '1', searchQuery, minPrice, maxPrice, offset, limit })
    const nextState = productReducer(initialState, action)

    expect(nextState).toEqual({
      products: [],
      total: 0,
      product: null,
      loading: true,
      error: null
    })
  })

  // test 6.6: fetchProductsCategoryAllAsync error
  test('should have loading truthy when fetch is pending', () => {
    const error = new Error('error')
    const action = fetchProductsCategoryAllAsync.rejected(error, 'error', { categoryId: '1', searchQuery, minPrice, maxPrice, offset, limit })
    const nextState = productReducer(initialState, action)

    expect(nextState).toEqual({
      products: [],
      total: 0,
      product: null,
      loading: false,
      error: error.message
    })
  })

  // test 7: createProductsAsync fulfill
  test('should add a new product when created successfully', () => {
    const newProduct: ManageProductType = {
      title: 'Product 6',
      price: 60,
      description: 'Description 6',
      categoryId: '6',
      image: 'Image 6'
    }

    const action = createProductsAsync.fulfilled(newProduct, 'fulfilled', newProduct)
    const nextState = productReducer(initialState, action)

    expect(nextState).toEqual({
      products: [newProduct],
      total: 0,
      product: null,
      loading: false,
      error: null
    })
  })

  // test 8: createProductsAsync pending
  test('should have loading set to true when pending', () => {
    const newProduct: ManageProductType = {
      title: 'Product 6',
      price: 60,
      description: 'Description 6',
      categoryId: '6',
      image: 'Image 6'
    }

    const action = createProductsAsync.pending('pending', newProduct)
    const nextState = productReducer(initialState, action)

    expect(nextState).toEqual({
      products: [],
      total: 0,
      product: null,
      loading: true,
      error: null
    })
  })

  // test 9: createProductsAsync error
  test('should handle errors when created failed', () => {
    const newProduct: ManageProductType = {
      title: 'Product 6',
      price: 60,
      description: 'Description 6',
      categoryId: '6',
      image: 'Image 6'
    }

    const error = new Error('error')
    const action = createProductsAsync.rejected(error, 'error', newProduct)
    const nextState = productReducer(initialState, action)

    expect(nextState).toEqual({
      products: [],
      total: 0,
      product: null,
      loading: false,
      error: error.message
    })
  })

  // test 10: updateProductAsync fulfill
  test('should update a product when updated successfully', () => {
    const initialStateWithProduct = {
      ...initialState,
      products: [mockSingleProduct]
    }

    const updatedProduct = {
      ...mockSingleProduct,
      title: 'Updated Product 7',
      price: 77,
      description: 'this is an updated product',
      categoryId: '7'
    }

    const action = updateProductAsync.fulfilled(updatedProduct, 'fulfilled', {
      updateProduct: updatedProduct,
      productId: updatedProduct._id
    })
    const nextState = productReducer(initialStateWithProduct, action)

    expect(nextState).toEqual({
      ...initialState,
      products: [updatedProduct],
      total: 0,
      loading: false,
      error: null
    })
  })

  // test 11: updateProductAsync pending
  test('should handle loading when product is updating', () => {
    const initialStateWithProduct = {
      ...initialState,
      products: [mockSingleProduct]
    }

    const updatedProduct = {
      ...mockSingleProduct,
      title: 'Updated Product 7',
      price: 77,
      description: 'this is an updated product',
      categoryId: '7'
    }

    const action = updateProductAsync.pending('pending', {
      updateProduct: updatedProduct,
      productId: updatedProduct._id
    })
    const nextState = productReducer(initialStateWithProduct, action)

    expect(nextState).toEqual({
      ...initialState,
      products: [mockSingleProduct],
      total: 0,
      loading: true,
      error: null
    })
  })

  // test 12: updateProductAsync error
  test('should handle errors when product update fails', () => {
    const initialStateWithProduct = {
      ...initialState,
      products: [mockSingleProduct]
    }

    const updatedProduct = {
      ...mockSingleProduct,
      title: 'Updated Product 7',
      price: 77,
      description: 'this is an updated product',
      categoryId: '7'
    }

    const error = new Error('error')
    const action = updateProductAsync.rejected(error, 'error', {
      updateProduct: updatedProduct,
      productId: updatedProduct._id
    })
    const nextState = productReducer(initialStateWithProduct, action)

    expect(nextState).toEqual({
      ...initialState,
      products: [mockSingleProduct],
      total: 0,
      loading: false,
      error: error.message
    })
  })

  // test 13: deleteProductAsync fulfill
  test('should delete a product when deletion is successful', () => {
    const initialStateWithProduct = {
      ...initialState,
      products: [mockSingleProduct]
    }

    const action = deleteProductAsync.fulfilled({ _id: mockSingleProduct._id }, 'fulfilled', '1')
    const nextState = productReducer(initialStateWithProduct, action)

    expect(nextState).toEqual({
      ...initialState,
      products: [],
      total: 0,
      loading: false,
      error: null
    })
  })

  // test 14: deleteProductAsync pending
  test('should set loading to true when deletion is pending', () => {
    const initialStateWithProduct = {
      ...initialState,
      products: [mockSingleProduct]
    }

    const action = deleteProductAsync.pending('pending', '1')
    const nextState = productReducer(initialStateWithProduct, action)

    expect(nextState).toEqual({
      ...initialState,
      products: [mockSingleProduct],
      total: 0,
      loading: true,
      error: null
    })
  })

  // test 15: deleteProductAsync error
  test('should handle errors when deletion fails', () => {
    const initialStateWithProduct = {
      ...initialState,
      products: [mockSingleProduct]
    }

    const error = new Error('error')
    const action = deleteProductAsync.rejected(error, 'error', '1')
    const nextState = productReducer(initialStateWithProduct, action)

    expect(nextState).toEqual({
      ...initialState,
      products: [mockSingleProduct],
      total: 0,
      loading: false,
      error: error.message
    })
  })
})
