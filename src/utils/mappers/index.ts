import { Dictionary } from 'src/@types'

export function mapOrderListToObj(list: number[][]): Dictionary {
  return list.reduce((obj, delta: number[]) => {
    return {
      ...obj,
      [delta[0]]: delta[1]
    }
  }, {})
}

export function mergeBookWithUpdatedValues(book: Dictionary, udpated_list: number[][]): Dictionary {
  const updatedBook = mapOrderListToObj(udpated_list)
  const newBookKeys = [...Object.keys(book), ...Object.keys(updatedBook)]
  return newBookKeys.reduce((obj, bookKey: string) => {
    const newValue = updatedBook[bookKey] >= 0 ? updatedBook[bookKey] : book[bookKey]
    if (newValue > 0) {
      return {
        ...obj,
        [bookKey]: newValue
      }
    }
    return obj
  }, {})
}