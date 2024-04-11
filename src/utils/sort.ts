import { ProductRealType } from '../misc/type'

export const sortByLowest = (originalArray: ProductRealType[], key: keyof ProductRealType) => {
  if (!originalArray || !key) return []

  const clonedArray = [...originalArray]
  const orderedArray = clonedArray.sort((a, b) => {
    return (a[key] as number) - (b[key] as number)
  })

  return orderedArray
}

export const sortByHighest = (originalArray: ProductRealType[], key: keyof ProductRealType) => {
  if (!originalArray || !key) return []

  const clonedArray = [...originalArray]
  const orderedArray = clonedArray.sort((a, b) => {
    return (b[key] as number) - (a[key] as number)
  })

  return orderedArray
}
