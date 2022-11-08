import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'

const Splash = ({navigation}) => {

  React.useEffect(() => {
    setTimeout(() => {
      navigation.replace('My Task')
    }, 2000)
  }, [])

  return (
    <View style={styles.body}>
      <Image source={require('../assets/image/MyTask.png')} style={styles.logo} />
      <Text style={styles.text}>My Task</Text>
    </View>
  )
}

export default Splash

const styles = StyleSheet.create({
    body: {
        flex: 1,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: "center"
    },
    text: {
        color: 'black',
        fontFamily: 'Roboto-Medium',
        fontSize: 23,
        position: 'absolute',
        bottom: 30
    },
    logo: {
      width: 200,
      height: 200,
      marginBottom: 10
    }
})