import React from 'react'
import { ActivityIndicator } from 'react-native'
import { create } from 'react-test-renderer'
import HomeContainer from './container'
import OrderBook from 'src/components/OrderBook'
import { ConnectionStatus } from 'src/@types'

describe('<HomeContainer />', () => {
  describe('connecting', () => {
    test('ActivityIndicator should be showed', () => {
      const testRenderer = create(
        <HomeContainer
          connectionStatus={ConnectionStatus.CONNECTING}
          topBids={[]}
          topAsks={[]}
        />
      )
      const testInstance = testRenderer.root
      const activityIndicator = testInstance.findByType(ActivityIndicator)
      expect(activityIndicator).not.toBeNull()
    });
  });
  describe('connecting', () => {
    test('OrderBook should be showed', () => {
      const testRenderer = create(
        <HomeContainer
          connectionStatus={ConnectionStatus.OPEN}
          topBids={[]}
          topAsks={[]}
        />
      )
      const testInstance = testRenderer.root
      const orderBook = testInstance.findAllByType(OrderBook)
      expect(orderBook).not.toBeNull()
    });
  });
})