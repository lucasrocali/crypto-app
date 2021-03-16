import React, { useState, useEffect } from 'react'
import HomeContainer from './container'
import useWebSocket, { ReadyState } from 'react-use-websocket'
import { ConnectionStatus } from 'src/@types'

type HomeScreenProps = {
  socketUrl?: string
}

export default function HomeScreen({ socketUrl = 'wss://www.cryptofacilities.com/ws/v1' }: HomeScreenProps) {


  const {
    sendJsonMessage,
    lastJsonMessage,
    readyState,
  } = useWebSocket(socketUrl, {
    onOpen: () => {
      sendJsonMessage({
        event: "subscribe",
        feed: "book_ui_1",
        product_ids: ["PI_XBTUSD"]
      })
    },
  });

  const connectionStatus: ConnectionStatus = {
    [ReadyState.CONNECTING]: ConnectionStatus.CONNECTING,
    [ReadyState.OPEN]: ConnectionStatus.OPEN,
    [ReadyState.CLOSING]: ConnectionStatus.CLOSING,
    [ReadyState.CLOSED]: ConnectionStatus.CLOSED,
    [ReadyState.UNINSTANTIATED]: ConnectionStatus.UNINSTANTIATED,
  }[readyState];


  console.log({ readyState, lastJsonMessage })

  return (
    <HomeContainer
      connectionStatus={connectionStatus}
    />
  );
}