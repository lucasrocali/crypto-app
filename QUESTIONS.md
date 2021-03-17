1.
Actually I've implemented socket with high frequency updates before using react native, but it was to update stock values, so basically a list o stocks with listeners for the updates, the approach I used back them was to have references for the stock cells and pass the values from the listener to the specific stock cell by reference in order to avoid the rerender of the cells based on the state. I've started the solution trying to use this approach, but actually the problem was a bit different since the cells represents the price, and once the price was removed the cell could also be destroyed. The base of the solution was basically normalize the book order with a key value object (like a dictionary) in order to be more efficient in the updates and map the top 10 asks and bids to send back to the component. I've also used React.memo to avoid the unecessary rerender on the cell. If I have more time I probabily would dive a little deeper to understand a bit better how the cell was rerender and work on prevent the unnecessary rerender in order to have a better perfomance, memory and energy usage from the app.

2.
I believe the main point would be handling the communication with the socket, closing the connection once the user changes the screen and reconnect when he comes back for example. And also as I mentioned in the first question having the best approach for handle the data received and avoid unnecessary updates on the screen, memory and data usage, etc

3.
Hooks was released recently and it's pretty cool, it helps to have modular dependencies, so it's easier to use with functional components, test, reuse and encapsulate most of the logic used by the component
```
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
```

4.
Sure, of course some monitoring tool would help, such as bugsnag, sentry or crashylitcs. So given some performance issue I would track in which SO version and devices they are most frequently in order to try to understand a bit better which may be the causes and in which contexts so I would be able to start to have an idea of how to handle the issue and work in the solution.

5.
I would make sure to have sensitive data used (like api keys) on the app as environment variables, so it would not be visible and not exposed in the generated code to avoid reverse engineering. I would also encrypt any sensitive data stored on the device and in the app communications with the apis.

6.
I've seen other implementations using protobuffer for socket with hight frequency update, so it may be a good option in order to optimize the communication with a smaller data sent in the network layer