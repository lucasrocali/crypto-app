import React from 'react'
import { StyleSheet, Text, SafeAreaView, ScrollView } from 'react-native'
import { ConnectionStatus, Order, BookType } from 'src/@types'
import { colors, spacing, textSize } from 'src/utils/style'
import OrderBook from 'src/components/OrderBook'

type HomeContainerProps = {
  connectionStatus: ConnectionStatus
  topBids: Order[]
  topAsks: Order[]
}
export default function HomeContainer({ topBids, topAsks }: HomeContainerProps) {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <OrderBook
          key={'bid'}
          orders={topBids}
          bookType={BookType.bid}
        />
        <OrderBook
          key={'ask'}
          orders={topAsks}
          bookType={BookType.ask}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bgPrimary
  }
});
