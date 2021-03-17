import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Order, BookType } from 'src/@types'
import OrderCell from 'src/components/OrderCell'
import { colors, spacing, textSize } from 'src/utils/style'

type OrderBookProps = {
  orders: Order[]
  bookType: BookType
}

function OrderBook({ orders, bookType }: OrderBookProps) {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Price</Text>
        <Text style={styles.headerText}>Size</Text>
        <Text style={styles.headerText}>Total</Text>
      </View>
      {orders.map(order => (
        <OrderCell
          key={`${order.price}`}
          order={order}
          bookType={bookType}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.bgSecondary,
    borderRadius: spacing.small,
    paddingVertical: spacing.medium,
    paddingHorizontal: spacing.small,
    marginVertical: spacing.medium,
  },
  header: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: colors.border,
    paddingBottom: spacing.small,
  },
  headerText: {
    flex: 1,
    fontSize: textSize.h2,
    color: colors.lblSecondary,
    textAlign: 'center'
  }
});

export default React.memo(OrderBook)