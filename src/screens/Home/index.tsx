import React, { useState, useEffect } from 'react'
import HomeContainer from './container'
import useWebSocket, { ReadyState } from 'react-use-websocket'
import { ConnectionStatus, Dictionary } from 'src/@types'
import { mapOrderListToObj, mergeBookWithUpdatedValues } from 'src/utils/mappers'

type HomeScreenProps = {
  socketUrl?: string
}

export default function HomeScreen({ socketUrl = 'wss://wwww.cryptofacilities.com/ws/v1' }: HomeScreenProps) {

  const [bidsObj, setBidsObj] = useState<Dictionary>({})

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

  useEffect(() => {
    if (lastJsonMessage && lastJsonMessage.feed && lastJsonMessage.feed == 'book_ui_1_snapshot') {
      if (lastJsonMessage && lastJsonMessage.bids && lastJsonMessage.bids.length > 0) {
        const bidsObj = mapOrderListToObj(lastJsonMessage.bids)
        setBidsObj(bidsObj)
      }
      return
    }
    if (lastJsonMessage && lastJsonMessage.bids && lastJsonMessage.bids.length > 0) {
      const updatedBidsObj = mergeBookWithUpdatedValues(bidsObj, lastJsonMessage.bids)
      setBidsObj(updatedBidsObj)
    }
  }, [lastJsonMessage])


  console.log({ readyState, lastJsonMessage })

  return (
    <HomeContainer
      connectionStatus={connectionStatus}
      bidsObj={bidsObj}
    />
  );
}