import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const Report = () => {
  return (
    <View style={styles.body}>
      <Text style={styles.text}>Report</Text>
    </View>
  )
}

const styles = StyleSheet.create({
    body: {
        flex: 1,
        justifyContent: "center",
        alignItems: 'center'
    },
    text: {
        color: "black",
        fontSize: 20,
        fontFamily: GlobalStyle.font.fontFamily
    }
})

export default Report