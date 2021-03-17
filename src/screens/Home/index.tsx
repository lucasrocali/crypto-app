import React from 'react'
import HomeContainer from './container'
import useOrderBook from './useOrderBook'

type HomeScreenProps = {
  socketUrl?: string
  topOrders?: number
}

export default function HomeScreen({ socketUrl = 'wss://wwww.cryptofacilities.com/ws/v1', topOrders = 10 }: HomeScreenProps) {

  const { connectionStatus, topBids, topAsks, errorMessage } = useOrderBook(socketUrl, topOrders)

  return (
    <HomeContainer
      connectionStatus={connectionStatus}
      topBids={topBids}
      topAsks={topAsks}
      errorMessage={errorMessage}
    />
  );
}