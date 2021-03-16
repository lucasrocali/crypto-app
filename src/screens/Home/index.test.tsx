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

    const testRenderer = create(<HomeScreen socketUrl={socketUrl} />)
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
          [56770.0, 500.0],
          [56756.0, 15000.0],
          [56755.5, 22207.0],
          [56754.5, 133235.0],
          [56754.0, 170495.0],
        ],
        asks: [
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

    expect(container.props.bids).toStrictEqual({
      '56754': 170495,
      '56756': 15000,
      '56770': 500,
      '56755.5': 22207,
      '56754.5': 133235
    })

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

    expect(container.props.bids).toStrictEqual({
      '56754': 170495,
      '56756': 15000,
      '56770': 800,
      '56755.5': 22207,
      '56754.5': 133235
    })

    await act(async () => {
      const serverUpdate = {
        feed: "book_ui_1",
        bids: [
          [56754.0, 0.0],
        ],
        asks: [],
        product_id: "PI_XBTUSD"
      }

      server.send(JSON.stringify(serverUpdate));
    })

    expect(container.props.bids).toStrictEqual({
      '56756': 15000,
      '56770': 800,
      '56755.5': 22207,
      '56754.5': 133235
    })

    await act(async () => {
      WS.clean();
    })
    expect(container.props.connectionStatus).toBe(ConnectionStatus.CLOSED)
  });

});