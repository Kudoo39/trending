const BASE_URL = process.env.REACT_APP_BASE_URL || 'http://localhost:8080/api/v1'

export const userEndpoints = {
  user: `${BASE_URL}/users`,
  login: `${BASE_URL}/users/login`,
  profile: `${BASE_URL}/users/profile`,
  profilePassword: `${BASE_URL}/users/password`
}

export const productEndpoints = {
  products: `${BASE_URL}/products`
}

export const categoryEndpoints = {
  categories: `${BASE_URL}/categories`
}

export const cartEndpoints = {
  carts: `${BASE_URL}/orders`
}
