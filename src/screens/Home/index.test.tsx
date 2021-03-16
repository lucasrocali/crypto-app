import React from "react";
import { create, act } from 'react-test-renderer'
import WS from "jest-websocket-mock"
import HomeContainer from './container'
import HomeScreen from "./index";
import { ConnectionStatus } from 'src/@types'

const socketUrl = 'ws://localhost:1234'

describe('<HomeScreen />', () => {

  test('foobar', async () => {

    const server = new WS(socketUrl)

    const testRenderer = create(<HomeScreen socketUrl={socketUrl} topOrders={5} />)
    const testInstance = testRenderer.root
    const container = testInstance.findByType(HomeContainer)

    expect(container.props.connectionStatus).toBe(ConnectionStatus.CONNECTING)

    await act(async () => {
      await server.connected;
    })

    expect(container.props.connectionStatus).toBe(ConnectionStatus.OPEN)


    await act(async () => {
      const serverUpdate = {
        numLevels: 25,
        feed: "book_ui_1_snapshot",
        bids: [
          [56780.0, 600.0],
          [56770.0, 500.0],
          [56756.0, 15000.0],
          [56755.5, 22207.0],
          [56754.5, 133235.0],
          [56754.0, 170495.0],
        ],
        asks: [
          [56785, 900.0],
          [56790.5, 49051.0],
          [56792.0, 2965.0],
          [56793.5, 15000.0],
          [56795.0, 33916.0],
          [56796.5, 2864.0],
        ],
        product_id: "PI_XBTUSD"
      }

      server.send(JSON.stringify(serverUpdate));
    })

    expect(container.props.topBids).toStrictEqual([
      { price: 56780, size: 600, total: 34068000 },
      { price: 56770, size: 500, total: 28385000 },
      { price: 56756, size: 15000, total: 851340000 },
      { price: 56755.5, size: 22207, total: 1260369388.5 },
      { price: 56754.5, size: 133235, total: 7561685807.5 }
    ])

    await act(async () => {
      const serverUpdate = {
        feed: "book_ui_1",
        bids: [
          [56770.0, 800.0],
        ],
        asks: [],
        product_id: "PI_XBTUSD"
      }

      server.send(JSON.stringify(serverUpdate));
    })

    expect(container.props.topBids).toStrictEqual([
      { price: 56780, size: 600, total: 34068000 },
      { price: 56770, size: 800, total: 45416000 },
      { price: 56756, size: 15000, total: 851340000 },
      { price: 56755.5, size: 22207, total: 1260369388.5 },
      { price: 56754.5, size: 133235, total: 7561685807.5 }
    ])

    await act(async () => {
      const serverUpdate = {
        feed: "book_ui_1",
        bids: [
          [56770, 0.0],
        ],
        asks: [],
        product_id: "PI_XBTUSD"
      }

      server.send(JSON.stringify(serverUpdate));
    })

    expect(container.props.topBids).toStrictEqual([
      { price: 56780, size: 600, total: 34068000 },
      { price: 56756, size: 15000, total: 851340000 },
      { price: 56755.5, size: 22207, total: 1260369388.5 },
      { price: 56754.5, size: 133235, total: 7561685807.5 },
      { price: 56754, size: 170495, total: 9676273230 }

    ])

    await act(async () => {
      WS.clean();
    })
    expect(container.props.connectionStatus).toBe(ConnectionStatus.CLOSED)
  });

});