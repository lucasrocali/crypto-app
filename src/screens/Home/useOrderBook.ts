import { useState, useEffect, useMemo } from 'react'
import useWebSocket, { ReadyState } from 'react-use-websocket'
import { ConnectionStatus, Dictionary, Order } from 'src/@types'
import { mapOrderListToObj, mergeBookWithUpdatedValues, mapTopOrders } from 'src/utils/mappers'

export default function useBook(socketUrl: string, topOrders: number): { connectionStatus: ConnectionStatus, topBids: Order[], topAsks: Order[], errorMessage: string } {

  const [bidsObj, setBidsObj] = useState<Dictionary>({})
  const [asksObj, setAsksObj] = useState<Dictionary>({})
  const [errorMessage, setErrorMessage] = useState<string>('')

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
    onError: () => {
      setErrorMessage('Something went wrong')
    }
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
      if (lastJsonMessage && lastJsonMessage.asks && lastJsonMessage.asks.length > 0) {
        const asksObj = mapOrderListToObj(lastJsonMessage.asks)
        setAsksObj(asksObj)
      }
      return
    }
    if (lastJsonMessage && lastJsonMessage.bids && lastJsonMessage.bids.length > 0) {
      const updatedBidsObj = mergeBookWithUpdatedValues(bidsObj, lastJsonMessage.bids)
      setBidsObj(updatedBidsObj)
    }
    if (lastJsonMessage && lastJsonMessage.asks && lastJsonMessage.asks.length > 0) {
      const updatedAksObj = mergeBookWithUpdatedValues(asksObj, lastJsonMessage.asks)
      setAsksObj(updatedAksObj)
    }
  }, [lastJsonMessage])

  const topBids = mapTopOrders(bidsObj, true, topOrders)
  const topAsks = mapTopOrders(asksObj, false, topOrders)

  return {
    connectionStatus,
    topBids,
    topAsks,
    errorMessage,
  }
}