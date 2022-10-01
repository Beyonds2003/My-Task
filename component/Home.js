import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import HomeTask from './HomeTask'
import Complete from './HomeCard/Complete'
import Fail from './HomeCard/Fail'
import Today from './HomeCard/Today'
import Upcoming from './HomeCard/Upcoming'

const Home = ({navigation}) => {

  const Stack = createNativeStackNavigator()

  return (
    <Stack.Navigator
    initialRouteName='HomeTask'
    screenOptions={{
      headerShown: false,
      animation: 'slide_from_right'
    }}
    >
      <Stack.Screen name='HomeTask' component={HomeTask} />
      <Stack.Screen name="Complete" component={Complete} />
      <Stack.Screen name="Fail" component={Fail} />
      <Stack.Screen name="Today" component={Today} />
      <Stack.Screen name="Upcoming" component={Upcoming} />
    </Stack.Navigator>
  )
}

export default Home

const styles = StyleSheet.create({})