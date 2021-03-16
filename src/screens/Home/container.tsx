import React from 'react'
import { StyleSheet, Text, SafeAreaView, ScrollView } from 'react-native'
import { ConnectionStatus, Order } from 'src/@types'
import OrderBook from 'src/components/OrderBook'

type HomeContainerProps = {
  connectionStatus: ConnectionStatus
  topBids: Order[]
}
export default function HomeContainer({ topBids }: HomeContainerProps) {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Text>Bids</Text>
        <OrderBook
          orders={topBids}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
