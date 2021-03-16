import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { ConnectionStatus } from 'src/@types'

type HomeContainerProps = {
  connectionStatus: ConnectionStatus
}
export default function HomeContainer(props: HomeContainerProps) {
  return (
    <View style={styles.container}>
      <Text>Home</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
