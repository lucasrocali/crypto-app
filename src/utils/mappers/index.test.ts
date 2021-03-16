import {
  mapOrderListToObj,
  mergeBookWithUpdatedValues,
  mapTopOrders
} from './index'

test('mapOrderListToObj', async () => {
  const list = [
    [56770, 500],
    [56756, 15000],
    [56755.5, 22207],
    [56754.5, 133235],
    [56754, 170495]
  ]
  const response = mapOrderListToObj(list)
  expect(response).toStrictEqual({
    '56754': 170495,
    '56756': 15000,
    '56770': 500,
    '56755.5': 22207,
    '56754.5': 133235,
  })
});

test('mergeBookWithUpdatedValues update info', async () => {
  const book = {
    '56754': 170495,
    '56756': 15000,
    '56770': 500,
    '56755.5': 22207,
    '56754.5': 133235,
  }
  const udpated_list = [
    [56770, 800],
    [56754, 6000]
  ]
  const response = mergeBookWithUpdatedValues(book, udpated_list)
  expect(response).toStrictEqual({
    '56754': 6000,
    '56756': 15000,
    '56770': 800,
    '56755.5': 22207,
    '56754.5': 133235,
  })
});

test('mergeBookWithUpdatedValues delete info', async () => {
  const book = {
    '56754': 170495,
    '56756': 15000,
    '56770': 500,
    '56755.5': 22207,
    '56754.5': 133235,
  }
  const udpated_list = [
    [56770, 0.0],
  ]
  const response = mergeBookWithUpdatedValues(book, udpated_list)
  expect(response).toStrictEqual({
    '56754': 170495,
    '56756': 15000,
    '56755.5': 22207,
    '56754.5': 133235,
  })
});

test('mergeBookWithUpdatedValues new info', async () => {
  const book = {
    '56754': 170495,
    '56756': 15000,
    '56770': 500,
    '56755.5': 22207,
    '56754.5': 133235,
  }
  const udpated_list = [
    [56780, 1800],
  ]
  const response = mergeBookWithUpdatedValues(book, udpated_list)
  expect(response).toStrictEqual({
    '56754': 170495,
    '56756': 15000,
    '56770': 500,
    '56755.5': 22207,
    '56754.5': 133235,
    '56780': 1800
  })
});

test('mapTopOrders asc', async () => {
  const book = {
    '56754': 170495,
    '56756': 15000,
    '56770': 500,
    '56755.5': 22207,
    '56754.5': 133235,
    '56780': 1800
  }
  const response = mapTopOrders(book, true, 3)
  expect(response).toStrictEqual([
    { price: 56780, size: 1800, total: 102204000 },
    { price: 56770, size: 500, total: 28385000 },
    { price: 56756, size: 15000, total: 851340000 }
  ])
});

test('mapTopOrders desc', async () => {
  const book = {
    '56754': 170495,
    '56756': 15000,
    '56770': 500,
    '56755.5': 22207,
    '56754.5': 133235,
    '56780': 1800
  }
  const response = mapTopOrders(book, false, 3)
  expect(response).toStrictEqual([
    { price: 56754, size: 170495, total: 9676273230 },
    { price: 56754.5, size: 133235, total: 7561685807.5 },
    { price: 56755.5, size: 22207, total: 1260369388.5 }
  ])
});