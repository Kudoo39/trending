/* eslint-disable no-undef */
import { CreateProductType } from '../../misc/type'
import productReducer, {
  createProductsAsync,
  deleteProductAsync,
  fetchProductsAsync,
  fetchProductsCategoryAsync,
  fetchProductsCategoryPageAsync,
  fetchProductsPageAsync,
  fetchSingleProductAsync,
  updateProductAsync
} from '../../redux/slices/productSlice'

const initialState = {
  allProducts: [],
  products: [],
  product: null,
  loading: false,
  error: null
}

const mockProducts = [
  {
    id: 3,
    title: 'Product 3',
    price: 30,
    description: 'Description 3',
    category: { id: 3, name: 'Category 3', image: 'Image 3' },
    images: ['Image 3'],
    quantity: 6
  },
  {
    id: 4,
    title: 'Product 4',
    price: 40,
    description: 'Description 4',
    category: { id: 4, name: 'Category 4', image: 'Image 4' },
    images: ['Image 4'],
    quantity: 2
  }
]

const mockSingleProduct = {
  id: 5,
  title: 'Product 5',
  price: 50,
  description: 'Description 5',
  category: { id: 5, name: 'Category 5', image: 'Image 5' },
  images: ['Image 5'],
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
      allProducts: mockProducts,
      products: [],
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
      allProducts: [],
      products: [],
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
      allProducts: [],
      products: [],
      product: null,
      loading: false,
      error: error.message
    })
  })

  // test 4: fetchSingleProductAsync fulfill
  test('should fetch a product', () => {
    const action = fetchSingleProductAsync.fulfilled(mockSingleProduct, 'fulfilled', 1)
    const nextState = productReducer(initialState, action)

    expect(nextState).toEqual({
      allProducts: [],
      products: [],
      product: mockSingleProduct,
      loading: false,
      error: null
    })
  })

  // test 5: fetchSingleProductAsync pending
  test('should fetch a product', () => {
    const action = fetchSingleProductAsync.pending('pending', 1)
    const nextState = productReducer(initialState, action)

    expect(nextState).toEqual({
      allProducts: [],
      products: [],
      product: null,
      loading: true,
      error: null
    })
  })

  // test 6: fetchSingleProductAsync error
  test('should have errors', () => {
    const error = new Error('error')
    const action = fetchSingleProductAsync.rejected(error, 'error', 1)
    const nextState = productReducer(initialState, action)

    expect(nextState).toEqual({
      allProducts: [],
      products: [],
      product: null,
      loading: false,
      error: error.message
    })
  })

  // test 7: fetchProductsPageAsync fulfill
  test('should fetch some products based on offset & limit', () => {
    const action = fetchProductsPageAsync.fulfilled(mockProducts, 'fulfilled', { offset: 0, limit: 8 })
    const nextState = productReducer(initialState, action)

    expect(nextState).toEqual({
      allProducts: [],
      products: mockProducts,
      product: null,
      loading: false,
      error: null
    })
  })

  // test 8: fetchProductsPageAsync pending
  test('should have loading truthy when fetch is pending', () => {
    const action = fetchProductsPageAsync.pending('pending', { offset: 0, limit: 8 })
    const nextState = productReducer(initialState, action)

    expect(nextState).toEqual({
      allProducts: [],
      products: [],
      product: null,
      loading: true,
      error: null
    })
  })

  // test 9: fetchProductsPageAsync error
  test('should handle error when fetching products for a specific page', () => {
    const error = new Error('error')
    const action = fetchProductsPageAsync.rejected(error, 'error', { offset: 0, limit: 8 })
    const nextState = productReducer(initialState, action)

    expect(nextState).toEqual({
      allProducts: [],
      products: [],
      product: null,
      loading: false,
      error: error.message
    })
  })

  // test 10: fetchProductsCategoryAsync fulfill
  test('should fetch products for a specific category', () => {
    const action = fetchProductsCategoryAsync.fulfilled(mockProducts, 'fulfilled', 1)
    const nextState = productReducer(initialState, action)

    expect(nextState).toEqual({
      allProducts: mockProducts,
      products: [],
      product: null,
      loading: false,
      error: null
    })
  })

  // test 11: fetchProductsCategoryAsync pending
  test('should have loading truthy when fetch is pending', () => {
    const action = fetchProductsCategoryAsync.pending('pending', 1)
    const nextState = productReducer(initialState, action)

    expect(nextState).toEqual({
      allProducts: [],
      products: [],
      product: null,
      loading: true,
      error: null
    })
  })

  // test 12: fetchProductsCategoryAsync error
  test('should handle error when fetching products for a specific category', () => {
    const error = new Error('error')
    const action = fetchProductsCategoryAsync.rejected(error, 'error', 3)
    const nextState = productReducer(initialState, action)

    expect(nextState).toEqual({
      allProducts: [],
      products: [],
      product: null,
      loading: false,
      error: error.message
    })
  })

  // test 13: fetchProductsCategoryPageAsync fulfill
  test('should fetch products for a specific category page', () => {
    const action = fetchProductsCategoryPageAsync.fulfilled(mockProducts, 'fulfilled', {
      categoryId: 1,
      offset: 0,
      limit: 10
    })
    const nextState = productReducer(initialState, action)

    expect(nextState).toEqual({
      allProducts: [],
      products: mockProducts,
      product: null,
      loading: false,
      error: null
    })
  })

  // test 14: fetchProductsCategoryPageAsync pending
  test('should have loading truthy when fetch is pending', () => {
    const action = fetchProductsCategoryPageAsync.pending('pending', {
      categoryId: 1,
      offset: 0,
      limit: 10
    })
    const nextState = productReducer(initialState, action)

    expect(nextState).toEqual({
      allProducts: [],
      products: [],
      product: null,
      loading: true,
      error: null
    })
  })

  // test 15: fetchProductsCategoryPageAsync error
  test('should handle error when fetching products for a specific category page', () => {
    const error = new Error('error')
    const action = fetchProductsCategoryPageAsync.rejected(error, 'error', {
      categoryId: 1,
      offset: 0,
      limit: 10
    })
    const nextState = productReducer(initialState, action)

    expect(nextState).toEqual({
      allProducts: [],
      products: [],
      product: null,
      loading: false,
      error: error.message
    })
  })

  // test 16: createProductsAsync fulfill
  test('should add a new product when created successfully', () => {
    const newProduct: CreateProductType = {
      title: 'Product 6',
      price: 60,
      description: 'Description 6',
      categoryId: 6,
      images: ['Image 6']
    }

    const action = createProductsAsync.fulfilled(newProduct, 'fulfilled', newProduct)
    const nextState = productReducer(initialState, action)

    expect(nextState).toEqual({
      allProducts: [],
      products: [newProduct],
      product: null,
      loading: false,
      error: null
    })
  })

  // test 17: createProductsAsync pending
  test('should have loading set to true when pending', () => {
    const newProduct: CreateProductType = {
      title: 'Product 6',
      price: 60,
      description: 'Description 6',
      categoryId: 6,
      images: ['Image 6']
    }

    const action = createProductsAsync.pending('pending', newProduct)
    const nextState = productReducer(initialState, action)

    expect(nextState).toEqual({
      allProducts: [],
      products: [],
      product: null,
      loading: true,
      error: null
    })
  })

  // test 18: createProductsAsync error
  test('should handle errors when created failed', () => {
    const newProduct: CreateProductType = {
      title: 'Product 6',
      price: 60,
      description: 'Description 6',
      categoryId: 6,
      images: ['Image 6']
    }

    const error = new Error('error')
    const action = createProductsAsync.rejected(error, 'error', newProduct)
    const nextState = productReducer(initialState, action)

    expect(nextState).toEqual({
      allProducts: [],
      products: [],
      product: null,
      loading: false,
      error: error.message
    })
  })

  // test 19: updateProductAsync fulfill
  test('should update a product when updated successfully', () => {
    const initialStateWithProduct = {
      ...initialState,
      products: [mockSingleProduct]
    }

    const updatedProduct = {
      ...mockSingleProduct,
      title: 'Updated Product 7',
      price: 77
    }

    const action = updateProductAsync.fulfilled(updatedProduct, 'fulfilled', {
      updateProduct: updatedProduct,
      productId: updatedProduct.id
    })
    const nextState = productReducer(initialStateWithProduct, action)

    expect(nextState).toEqual({
      ...initialState,
      products: [updatedProduct],
      loading: false,
      error: null
    })
  })

  // test 20: updateProductAsync pending
  test('should handle loading when product is updating', () => {
    const initialStateWithProduct = {
      ...initialState,
      products: [mockSingleProduct]
    }

    const updatedProduct = {
      ...mockSingleProduct,
      title: 'Updated Product 7',
      price: 77
    }

    const action = updateProductAsync.pending('pending', {
      updateProduct: updatedProduct,
      productId: updatedProduct.id
    })
    const nextState = productReducer(initialStateWithProduct, action)

    expect(nextState).toEqual({
      ...initialState,
      products: [mockSingleProduct],
      loading: true,
      error: null
    })
  })

  // test 21: updateProductAsync error
  test('should handle errors when product update fails', () => {
    const initialStateWithProduct = {
      ...initialState,
      products: [mockSingleProduct]
    }

    const updatedProduct = {
      ...mockSingleProduct,
      title: 'Updated Product 7',
      price: 77
    }

    const error = new Error('error')
    const action = updateProductAsync.rejected(error, 'error', {
      updateProduct: updatedProduct,
      productId: updatedProduct.id
    })
    const nextState = productReducer(initialStateWithProduct, action)

    expect(nextState).toEqual({
      ...initialState,
      products: [mockSingleProduct],
      loading: false,
      error: error.message
    })
  })

  // test 22: deleteProductAsync fulfill
  test('should delete a product when deletion is successful', () => {
    const initialStateWithProduct = {
      ...initialState,
      products: [mockSingleProduct]
    }

    const action = deleteProductAsync.fulfilled({ id: mockSingleProduct.id }, 'fulfilled', 1)
    const nextState = productReducer(initialStateWithProduct, action)

    expect(nextState).toEqual({
      ...initialState,
      products: [],
      loading: false,
      error: null
    })
  })

  // test 23: deleteProductAsync pending
  test('should set loading to true when deletion is pending', () => {
    const initialStateWithProduct = {
      ...initialState,
      products: [mockSingleProduct]
    }

    const action = deleteProductAsync.pending('pending', 1)
    const nextState = productReducer(initialStateWithProduct, action)

    expect(nextState).toEqual({
      ...initialState,
      products: [mockSingleProduct],
      loading: true,
      error: null
    })
  })

  // test 24: deleteProductAsync error
  test('should handle errors when deletion fails', () => {
    const initialStateWithProduct = {
      ...initialState,
      products: [mockSingleProduct]
    }

    const error = new Error('error')
    const action = deleteProductAsync.rejected(error, 'error', 1)
    const nextState = productReducer(initialStateWithProduct, action)

    expect(nextState).toEqual({
      ...initialState,
      products: [mockSingleProduct],
      loading: false,
      error: error.message
    })
  })
})
