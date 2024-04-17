export type Sort = 'Default' | 'Highest Price' | 'Lowest Price'

export type SortProps = {
  selectedSort: Sort
  // eslint-disable-next-line no-unused-vars
  setSelectedSort: (sort: Sort) => void
}

export type Category = {
  id: number
  name: string
  image: string
}

export type CreateProductType = {
  title: string
  price: number | null
  description: string
  categoryId: number
  images: string[]
}

export type CreateRealProductType = {
  title: string
  price: number | null
  description: string
  categoryId: string
  image: string
}

export type UpdateProductType = {
  title?: string
  price?: number
  description?: string
  images?: string[]
}

export type ProductType = {
  id: number
  title: string
  price: number
  description: string
  category: Category
  images: string[]
}

export type RealCategory = {
  _id: string
  name: string
  image: string
}

export type ProductRealType = {
  _id: string
  title: string
  price: number
  description: string
  size: string
  categoryId: RealCategory
  image: string
}

export type CartType = ProductType & {
  quantity: number
}

export type CartRealType = ProductRealType & {
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
  name: string
  avatar: string
}

export type RealUserRegister = UserCredential & {
  firstname: string
  lastname: string
  avatar: string
}

export type RealUser = RealUserRegister & {
  role: 'customer' | 'admin'
  _id: string
  orders: OrderProductsType[]
  newPassword?: string
}

export type User = UserRegister & {
  role: 'customer' | 'admin'
  id: number
}
