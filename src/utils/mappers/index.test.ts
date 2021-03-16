import { mapOrderListToObj, mergeBookWithUpdatedValues } from './index'

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