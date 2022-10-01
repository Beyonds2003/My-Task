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
import Home from './component/Home';
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons"
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Setting from './component/Setting'
import CreateTask from './component/CreateTask'
import EntypoIcon from "react-native-vector-icons/Entypo"
import { createNativeStackNavigator } from '@react-navigation/native-stack';


const App = () => {

  const Tab = createBottomTabNavigator()
  const Stack = createNativeStackNavigator()

  const today = new Date()
  const day = String(today.getDate()).padStart(2, '0');
  const monthList = ['Jan', "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
  const month = today.getMonth()

  return (
      <NavigationContainer>
        <Tab.Navigator
        initialRouteName='My Task'
         screenOptions={({route}) => ({
          tabBarIcon: ({focused, size, color}) => {
            let iconName;
            if(route.name === "Setting") {
              iconName = 'cog-outline'
            } else if(route.name === "My Task") {
              iconName = 'home'
            }
            return (
              <View>
                {route.name === 'Setting' && 
                  <View><MaterialCommunityIcons name={iconName} color={focused ? '#312dff' : 'black'}  size={23}/></View>
                }
                {route.name === "My Task" && 
                 <View><MaterialCommunityIcons name={iconName} color={focused ? '#312dff' : 'black'}  size={25}/></View>
                }
              </View>
            )
          },
          tabBarStyle: {
            position: 'absolute',
            bottom: 30,
            width: 'auto',
            height: 65,
            borderRadius: 50,
            backgroundColor: 'rgba(0, 0, 0, 1)',
            marginLeft: '10%',
            marginRight: '10%',
          },
          tabBarItemStyle: {
            width: 'auto'
          }, 
          tabBarShowLabel: false,
          tabBarHideOnKeyboard: true
         })}
         >
          <Tab.Screen 
          options={{
            headerTitleStyle: {fontFamily: GlobalStyle.font.fontFamily, fontSize: 23, fontWeight: '700'},
            headerRight:  () => (
              <View style={{marginRight: 20, display: 'flex', flexDirection: 'row', justifyContent: "center"}}>
                <View><Text style={{color: GlobalStyle.fontColor.color, marginRight: 10, fontFamily: GlobalStyle.font.fontFamily}}>{`${day} ${monthList[month]}`}</Text></View>
                <View><FontAwesome5 name='calendar-alt' size={19} color={'black'} /></View>
              </View>
              ),
            tabBarShowLabel: false,
          }}
          name="My Task" component={Home}/>
          <Tab.Screen
          options={{
            headerTitleAlign: 'center',
            headerTitleStyle: {
              fontFamily: 'Roboto-Medium',
              fontSize: 23,
              fontWeight: '600'
            },
            tabBarStyle: {
              position: 'absolute',
              width: 'auto',
              height: 60,
              borderRadius: 50,
              backgroundColor: 'white',
              marginLeft: '10%',
              marginRight: '10%',
              display: 'none',
              bottom: 30
            },
            tabBarButton: ({onPress}) => {
              return (
                <TouchableOpacity style={styles.addButton} onPress={onPress} activeOpacity={0.7}>
                   <View style={styles.add}><FontAwesome5 name={'plus'} color="white"  size={18}/></View>
                </TouchableOpacity>
              )
            },
            tabBarHideOnKeyboard: true
            // headerRight: ({navigation}) => {
            //   return (
            //     <TouchableOpacity style={{marginRight: 25, marginTop: 3}} onPress={() => navigation.navigate("Setting")}>
            //       <EntypoIcon  name="cross" size={30} color="rgba(0, 0, 0, 0.8)" />
            //     </TouchableOpacity>
            //   )
            // }
          }} 
          name="Create task" component={CreateTask}/>
           <Tab.Screen 
           name="Setting" component={Setting} />
        </Tab.Navigator>
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
    justifyContent: "center"
  }
});

export default App;
