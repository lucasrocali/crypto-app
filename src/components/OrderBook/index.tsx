import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Order } from 'src/@types'

type OrderBookProps = {
  orders: Order[]
}

function OrderBook({ orders }: OrderBookProps) {
  return (
    <View style={styles.container}>
      {orders.map(order => (<Text key={`${order.price}`}>{`${order.price}   ${order.size}   ${order.total}`}</Text>))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
  },
});

export default React.memo(OrderBook)