import { Dimensions, ScrollView, StatusBar, StyleSheet, Text, View, TouchableOpacity, FlatList, Platform, Image } from 'react-native'
import React from 'react'
import GlobalStyle from './GlobalStyle'
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import TaskCard from './TaskCard'
import SQLite from 'react-native-sqlite-storage'
import { ThemeProvider, useIsFocused } from '@react-navigation/native'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import Animated, { FadeIn, FadeInRight } from 'react-native-reanimated'
import PushNotification from "react-native-push-notification";

const db = SQLite.openDatabase({
  name: "MyTaskDb",
  location: 'default'
},
() => {},
error => {console.log(error)}
)

const HomeTask = ({navigation}) => {

  const cards = [
    {id: 11, text: "Today", icon: 'clipboard-list-outline', wallpaper: '#00CBFE', top: -15, left: -15, right: 0, bottom: 0},
    {id: 22, text: "Upcoming", icon: 'clock', wallpaper: 'orange', top: 0, left: 0, right: 25, bottom: -30},
    {id: 33, text: "Complete", icon: 'file-check-outline', wallpaper: 'green', top: -28, left: 27, right: 0, bottom: 0},
    {id: 44, text: "Fail", icon: 'file-excel-outline', wallpaper: '#E0153F', top: 0, left: -24, right: 0, bottom: -10},
  ]

  const [tasks, setTasks] = React.useState([])
  const [taskLength, setTaskLength] = React.useState(tasks.length)
  const isFocused = useIsFocused()

  const createTable = () => {
    db.transaction((tx) => {
      tx.executeSql('CREATE TABLE IF NOT EXISTS tasks (ID INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT, category TEXT, color TEXT, startDate TEXT, endDate TEXT, description TEXT, complete BOOLEAN)', 
      [],
      () => {console.log()},
      error => {console.log(error)})
    })
  }

  const getTasksData = () => {
    db.transaction((tx) => {
      tx.executeSql(`SELECT * FROM tasks ORDER BY ID DESC`, 
      [],
      (tx, results) => {
        let items = []
        if (results.rows.length === 0) {
          return setTasks(items)
        } else {
          for (let i = 0; i < results.rows.length; i++) {
            items.push(results.rows.item(i))
          }
          setTaskLength(items.length)
          return setTasks(items)
        }
      },
      error => console.log('error to get task data')
      )
    })
  }

  const deleteData = () => {
    db.transaction((tx) => {
      tx.executeSql('DROP TABLE tasks', 
      [],
      () => console.log()
      )
    })
  }

  const createNotificationChannel = () => {
    PushNotification.createChannel({
      channelId: "mytask",
      channelName: "My Task"
    })
  }
 
  React.useEffect(() => {
    try {
      createTable()
      createNotificationChannel()
    } catch (error) {
      console.log(error)
    }
  }, [])

  React.useEffect(() => {
    try {
      getTasksData()
      // deleteData() 
    } catch (error) {
      console.log(error)
    } 
  }, [isFocused]) 

  return (
    <ScrollView style={styles.body}>
        <View>
          <StatusBar  barStyle={'dark-content'} backgroundColor='white'/>
          <View style={styles.cardContainer}>
              {cards.map(card => (
                <TouchableOpacity style={{width: '45%', height: '45%', margin: 5}} key={card.id} activeOpacity={0.8} onPress={() => navigation.navigate(card.text)}>
                    <View style={[{backgroundColor: card.wallpaper}, styles.card]}>
                        <View style={styles.materialIcon}><MaterialCommunityIcons name={card.icon} size={23} color={GlobalStyle.cardColor.color} /></View>
                        <Text style={styles.cardText}>{card.text}</Text>
                        <View 
                        style={[styles.circle, {top: card.top === 0 ? null : card.top, 
                        right: card.right === 0 ? null : card.right,
                        left: card.left === 0 ? null : card.left,
                        bottom: card.bottom === 0 ? null : card.bottom}]} />
                    </View>
                </TouchableOpacity>
              ))} 
          </View>
          <View>
          <View style={styles.titleContainer}>
            <TouchableOpacity style={{display: "flex", flexDirection: 'row', alignItems: "center"}} activeOpacity={0.7} onPress={() => navigation.navigate('Create task')}>
              <Text style={styles.title}>Add Task</Text>
              <View style={styles.add}><FontAwesome5Icon name={'plus'} color="white"  size={11}/></View>
            </TouchableOpacity>
            <View style={{display: "flex", flexDirection: 'row'}}>
              <Text style={[styles.text, {fontSize: 15, marginRight: 7}]}>{`Total Tasks: ${taskLength}`}</Text>
              {/* <View style={{justifyContent: "flex-end", marginTop: 1}}><FontAwesome5Icon name='angle-down' size={19} color={"#6d6d6d"} /></View> */}
            </View>
          </View>
        </View>
          {tasks.length <= 0 ? 
          <View style={{justifyContent: "center", alignItems: 'center',flex: 1}}>
            {/* <Image source={require('../assets/image/notebook.png')} style={{width: 300, height: 190, marginTop: 40}} />
            <Text style={styles.text}>No Task To Do</Text> */}
          </View> :
          <View>
            {tasks.map(data => (
              <Animated.View  key={data.ID}>
                <TaskCard tasks={data} success={data.complete ? true : false} fail={false} navigation={navigation} setTaskLength={setTaskLength} />
              </Animated.View>
            ))}
          </View>}
          </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
    body: {
        flex: 1, 
        backgroundColor: "rgb(250, 250, 250)",
      },
      text: {
        color: "black",
        fontSize: 20,
        fontFamily: GlobalStyle.font.fontFamily
      },
      cardContainer: {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: "center",
        paddingTop: 10,
        backgroundColor: "white",
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30,
        paddingBottom: 10, 
        width: '100%',
        height: Dimensions.get('window').height / 2.5,
      },
      card: {
        width: '100%',
        height: '100%',
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 30,
        position: 'relative',
        overflow: "hidden"
      },
      cardText: {
        color: GlobalStyle.cardColor.color,
        fontFamily: GlobalStyle.font.fontFamily,
        fontSize: 18,
        position: "absolute",
        left: 25,
        bottom: 20
      },
      title: {
        color: GlobalStyle.fontColor.color, 
        fontFamily: GlobalStyle.font.fontFamily, 
        fontSize: 18,
        fontWeight: '700',
        marginRight: 10
      },
      titleContainer: {
        margin: 25,
        justifyContent: 'space-between',
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        marginLeft: 15,
        marginRight: 15
      },
      add: {
        backgroundColor: "#4252ff",
        borderRadius: 50,
        width: 25,
        height: 25,
        display: 'flex',
        justifyContent: 'center',
        alignItems: "center"
      },
      circle: {
        width: 50,
        height: 50,
        backgroundColor: 'rgba(2440, 244, 244, 0.5)',
        borderRadius: 50,
        position: 'absolute',
      },
      materialIcon: {
        position: 'absolute',
        top: 15,
        right: 20
      },
})

export default HomeTask