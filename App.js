import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity
} from 'react-native';
import GlobalStyle from './component/GlobalStyle';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import CreateTask from './component/CreateTask'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {navigationRef} from './component/RootNavigation'
import * as RootNavigation from './component/RootNavigation'
import HomeTask from './component/HomeTask';
import Complete from './component/HomeCard/Complete';
import Fail from './component/HomeCard/Fail';
import Today from './component/HomeCard/Today';
import Upcoming from './component/HomeCard/Upcoming';
import Splash from './component/Splash';

const App = () => {

  const Tab = createBottomTabNavigator()
  const Stack = createNativeStackNavigator()

  const today = new Date()
  const day = String(today.getDate()).padStart(2, '');
  const monthList = ['Jan', "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
  const month = today.getMonth()
  const [route, setRoute] = React.useState()

  console.log(route !== "Create task" || route !== 'Splash')

  return (
      <NavigationContainer ref={navigationRef}
       onReady={() => setRoute(navigationRef.current.getCurrentRoute().name)}
       onStateChange={() => setRoute(navigationRef.current.getCurrentRoute().name)}
      >
        <Stack.Navigator
        initialRouteName='Splash'
        screenOptions={{
          animation: 'slide_from_bottom',
          headerShadowVisible: false,
          headerShown: true,
          statusBarStyle: 'dark'
        }}
        >
          <Stack.Screen 
          options={{
            headerTitleStyle: {fontFamily: GlobalStyle.font.fontFamily, fontSize: 23, fontWeight: '700'},
            headerRight:  () => (
              <View style={{marginRight: 20, display: 'flex', flexDirection: 'row', justifyContent: "center"}}>
                <View><Text style={{color: GlobalStyle.fontColor.color, marginRight: 10, fontFamily: GlobalStyle.font.fontFamily}}>{`${monthList[month]}, ${day}`}</Text></View>
                <View><FontAwesome5 name='calendar-alt' size={19} color={'black'} /></View>
              </View>
              ),
            statusBarColor: 'white',
          }}
          name="My Task" component={HomeTask}/>
          <Stack.Screen
          options={{
            headerTitleAlign: 'center',
            headerTitleStyle: {
              fontFamily: 'Roboto-Medium',
              fontSize: 23,
              fontWeight: '600'
            },
            statusBarColor: 'white'
          }} 
          name="Create task" component={CreateTask}/>
          <Stack.Screen options={{animation: 'slide_from_right', headerShown: false, statusBarColor: 'green', statusBarAnimation: 'slide'}} 
          name="Complete" component={Complete} />
          <Stack.Screen options={{animation: 'slide_from_right', headerShown: false, statusBarColor: '#E0153F', statusBarAnimation: 'slide'}}  
          name="Fail" component={Fail} />
          <Stack.Screen options={{animation: 'slide_from_right', headerShown: false, statusBarColor: '#00CBFE', statusBarAnimation: 'slide'}} 
          name="Today" component={Today}/>
          <Stack.Screen  options={{animation: 'slide_from_right', headerShown: false, statusBarColor: 'orange', statusBarAnimation: 'slide'}} 
          name="Upcoming" component={Upcoming} />
          <Stack.Screen name='Splash' component={Splash} options={{animation: 'slide_from_right', headerShown: false, statusBarColor: 'white', statusBarAnimation: 'fade'}} />
        </Stack.Navigator>
        {route === "My Task" 
           &&
          <View style={styles.buttonContainer}>
            <TouchableOpacity onPress={(e) => {e.stopPropagation(), RootNavigation.navigate('Create task')}} style={styles.addButton} activeOpacity={0.7}>
              <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
                <View style={{backgroundColor: 'white', padding: 4, borderRadius: 4}}>
                  <FontAwesome5 name='plus' size={12} color={"#312dff"} />
                </View>
                <Text style={styles.text}>Add Task</Text>
              </View>
            </TouchableOpacity>
          </View>}
      </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  add: {
    backgroundColor: "#312dff",
    padding: 15,
    borderRadius: 50,
  },
  addButton: {
    width: 140,
    height: 50,
    position: 'absolute',
    bottom: 25,
    backgroundColor: '#312dff',
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4
  },
  buttonContainer: {
     justifyContent: 'center',
     alignItems: 'center',
  },
  text: {
    color: GlobalStyle.cardColor.color,
    fontFamily: 'Roboto-Medium',
    marginLeft: 10,
  }
});

export default App;
