import { SafeAreaView, StatusBar, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import GlobalStyle from '../GlobalStyle'
import SQLite from 'react-native-sqlite-storage'
import { useIsFocused } from '@react-navigation/native'
import format from 'date-fns/format'
import { FlatList } from 'react-native-gesture-handler'
import TaskCard from '../TaskCard'
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons'
import HomeHeader from './HomeHeader'

const db = SQLite.openDatabase({
  name: "MyTaskDb",
  location: 'default'
},
() => {},
error => {console.log(error)}
)

const Today = ({navigation}) => {

  const [tasks, setTasks] = React.useState([])

  const getTodayTask = () => {
    db.transaction((tx) => {
      tx.executeSql('SELECT * FROM tasks WHERE date(startDate) = date("now")', 
      [],
      (tx, results) => {
        console.log("get today data")
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
      error => console.log(error)
      )
    })
  }

  // console.log(`${format(new Date(), 'MMM dd')}`)
  React.useEffect(() => {
    getTodayTask()
  }, [])

  return (
    <SafeAreaView style={{flex: 1}}>
      <StatusBar barStyle={'light-content'} backgroundColor="#00CBFE" />
      <View style={styles.body}>
        <FlatList 
          data={tasks}
          ListHeaderComponent={() => (
            <HomeHeader color={'#00CBFE'} text={"Today"} taskCount={tasks.length} navigation={navigation} />
          )}
          renderItem={({item}) => (
          <View style={styles.container}>
            <TaskCard tasks={item} success={false} fail={false} navigation={navigation}/>
          </View>
          )}
          keyExtractor={(index, ID) => ID}
        />
      </View>
    </SafeAreaView>
  )
}

export default Today

const styles = StyleSheet.create({
  body: {
    flex: 1,
    padding: 10,
    paddingLeft: 0,
    paddingRight: 0,
    backgroundColor: 'white',
    paddingTop: 0
  },
  container: {
    width: '100%',
    marginLeft: 0,
    marginRight: 0,
    marginTop: 10
  },
  text: {
    color: GlobalStyle.fontColor.color,
    fontSize: 23,
    fontFamily: "Roboto-Medium",
    color: 'white'
  },
})