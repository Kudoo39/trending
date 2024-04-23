/* eslint-disable no-unused-vars */
export type Sort = 'Default' | 'Highest Price' | 'Lowest Price'

export type SearchProps = {
  searchValue: string
  setSearchValue: (searchValue: string) => void
  minPrice: number
  setMinPrice: (minPrice: number) => void
  maxPrice: number
  setMaxPrice: (maxPrice: number) => void
  handleSearch: (searchParams: { searchValue: string; minPrice: number; maxPrice: number }) => void
}

export type SortProps = {
  selectedSort: Sort
  setSelectedSort: (sort: Sort) => void
}

export type Category = {
  _id: string
  name: string
  image: string
}

export type ProductType = {
  _id: string
  title: string
  price: number
  description: string
  categoryId: Category
  image: string
}

export type ManageProductType = {
  title: string
  price: number
  description: string
  categoryId: string
  image?: string
}

export type CartType = ProductType & {
  quantity: number
}

export type OrderProductsType = {
  _id?: string
  products: {
    _id?: string
    productId: string
    quantity: number
  }[]
}

export type UpdateQuantity = {
  _id: string
  quantity: number
}

export type UserCredential = {
  email: string
  password: string
}

export type UpdateUserType = {
  firstname?: string
  lastname?: string
  email?: string
}

export type UpdatePasswordType = {
  email: string
  password: string
  newPassword: string
}

export type UserRegister = UserCredential & {
  firstname: string
  lastname: string
  avatar: string
}

export type User = UserRegister & {
  role: 'customer' | 'admin'
  _id: string
  orders: OrderProductsType[]
  banStatus: boolean
  newPassword?: string
}
