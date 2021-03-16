import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Dictionary } from 'src/@types'

type OrderBookProps = {
  book: Dictionary
}

export default function OrderBook({ book }: OrderBookProps) {

  const priceList = Object.keys(book)

  return (
    <View style={styles.container}>
      {priceList.map(price => (<Text>{`${price}   ${book[price]}   ${parseFloat(price) * book[price]}`}</Text>))}
      <Text>{JSON.stringify(book)}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
  },
});
