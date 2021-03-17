import React from 'react'
import { View, StyleSheet, ActivityIndicator, SafeAreaView, ScrollView, Text } from 'react-native'
import { ConnectionStatus, Order, BookType } from 'src/@types'
import { colors, textSize } from 'src/utils/style'
import OrderBook from 'src/components/OrderBook'

type HomeContainerProps = {
  connectionStatus: ConnectionStatus
  topBids: Order[]
  topAsks: Order[]
}
export default function HomeContainer({ connectionStatus, topBids, topAsks }: HomeContainerProps) {
  return (
    <SafeAreaView style={styles.container}>
      {connectionStatus == ConnectionStatus.OPEN ? (
        <ScrollView>
          <Text style={styles.headerText}>PI_XBTUSD</Text>
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
      ) : (
          <View style={styles.content}>
            <ActivityIndicator />
          </View>
        )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bgPrimary
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  headerText: {
    flex: 1,
    fontSize: textSize.h1,
    color: colors.lblPrimary,
    textAlign: 'center'
  }
});
