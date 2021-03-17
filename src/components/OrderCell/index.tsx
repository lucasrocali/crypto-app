import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Order, BookType } from 'src/@types'
import { colors, spacing, textSize } from 'src/utils/style'

type OrderBookProps = {
  order: Order
  bookType: BookType
}

function OrderBook({ order, bookType }: OrderBookProps) {
  return (
    <View style={styles.container}>
      <Text style={bookType === BookType.ask ? styles.askText : styles.bidText}>{order.price.toFixed(2).toLocaleString()}</Text>
      <Text style={styles.text}>{order.size.toLocaleString()}</Text>
      <Text style={styles.text}>{order.total.toLocaleString()}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingVertical: spacing.tiny,
  },
  text: {
    flex: 1,
    fontSize: textSize.body,
    color: colors.lblPrimary,
    textAlign: 'center',
  },
  askText: {
    flex: 1,
    fontSize: textSize.body,
    color: colors.red,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  bidText: {
    flex: 1,
    fontSize: textSize.body,
    color: colors.green,
    textAlign: 'center',
    fontWeight: 'bold',

  }
});

export default React.memo(OrderBook)