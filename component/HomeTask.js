import { Dimensions, ScrollView, StatusBar, StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'
import GlobalStyle from './GlobalStyle'
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import TaskCard from './TaskCard'
import SQLite from 'react-native-sqlite-storage'
import { useIsFocused } from '@react-navigation/native'

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
  const isFocused = useIsFocused()

  const createTable = () => {
    db.transaction((tx) => {
      tx.executeSql('CREATE TABLE IF NOT EXISTS tasks (ID INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT, category TEXT, color TEXT, startDate TEXT, endDate TEXT, description TEXT, complete BOOLEAN)', 
      [],
      () => {console.log('create table successfully')},
      error => {console.log(error)})
    })
  }

  const getTasksData = () => {
    db.transaction((tx) => {
      tx.executeSql(`SELECT * FROM tasks ORDER BY ID DESC`, 
      [],
      (tx, results) => {
        console.log("get data")
        let items = []
        if (results.rows.length === 0) {
          return setTasks(items)
        } else {
          for (let i = 0; i < results.rows.length; i++) {
            items.push(results.rows.item(i))
          }
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
      () => console.log('delete table')
      )
    })
  }
 
  React.useEffect(() => {
    try {
      createTable()
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
  }, [])


  return (
    <ScrollView style={{backgroundColor: "rgb(250, 250, 250)"}}>
        <View style={styles.body}>
          <StatusBar  barStyle={'dark-content'} backgroundColor='white'/>
          <View style={styles.cardContainer}>
              {cards.map(card => (
                <TouchableOpacity key={card.id} activeOpacity={0.8} onPress={() => navigation.navigate(card.text)}>
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
          <View style={styles.titleContainer}>
            <View style={{display: "flex", flexDirection: 'row', alignItems: "center"}}>
              <Text style={styles.title}>Add Text</Text>
              <View style={styles.add}><FontAwesome5Icon name={'plus'} color="white"  size={11}/></View>
            </View>
            <View style={{display: "flex", flexDirection: 'row'}}>
              <Text style={[styles.text, {fontSize: 15, marginRight: 7}]}>All Tests</Text>
              <View style={{justifyContent: "flex-end", marginTop: 1}}><FontAwesome5Icon name='angle-down' size={19} color={"#6d6d6d"} /></View>
            </View>
          </View>
          <View>
          {tasks.map((data) => (
            <TaskCard key={data.ID} tasks={data} success={false} fail={false}  />
          ))}
          </View>
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
        paddingTop: 40,
        backgroundColor: "white",
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30,
        paddingBottom: 10
      },
      card: {
        width: Dimensions.get('window').width * 180 /  Dimensions.get('window').width,
        height: Dimensions.get('window').height * 130 /  Dimensions.get('window').height,
        margin: 5,
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
      }
})

export default HomeTask