import React from 'react'
import { StyleSheet, Text, SafeAreaView, ScrollView } from 'react-native'
import { ConnectionStatus, Dictionary } from 'src/@types'
import OrderBook from 'src/components/OrderBook'

type HomeContainerProps = {
  connectionStatus: ConnectionStatus
  bidsObj: Dictionary
}
export default function HomeContainer({ bidsObj }: HomeContainerProps) {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Text>Bids</Text>
        <OrderBook
          book={bidsObj}
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
