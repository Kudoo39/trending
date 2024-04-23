import { ProductType } from '../misc/type'

export const sortByLowest = (originalArray: ProductType[], key: keyof ProductType) => {
  if (!originalArray || !key) return []

  const clonedArray = [...originalArray]
  const orderedArray = clonedArray.sort((a, b) => {
    return (a[key] as number) - (b[key] as number)
  })

  return orderedArray
}

export const sortByHighest = (originalArray: ProductType[], key: keyof ProductType) => {
  if (!originalArray || !key) return []

  const clonedArray = [...originalArray]
  const orderedArray = clonedArray.sort((a, b) => {
    return (b[key] as number) - (a[key] as number)
  })

  return orderedArray
}
