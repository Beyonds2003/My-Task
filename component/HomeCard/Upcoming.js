import { StyleSheet, Text, View, FlatList, SafeAreaView, StatusBar } from 'react-native'
import React from 'react'
import SQLite from 'react-native-sqlite-storage'
import { format } from 'date-fns'
import TaskCard from '../TaskCard'
import HomeHeader from './HomeHeader'

const db = SQLite.openDatabase({
  name: "MyTaskDb",
  location: 'default'
},
() => {},
error => {console.log(error)}
)

const Upcoming = ({navigation}) => {

  const [tasks, setTasks] = React.useState([])

  const getUpcomingTask = () => {
    db.transaction((tx) => {
      tx.executeSql("SELECT * FROM tasks WHERE date(startDate) > date('now') OR date(endDate) > date('now')", 
      [],
      (tx, results) => {
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

  React.useEffect(() => {
    getUpcomingTask()
  }, [])

  return (
    <SafeAreaView style={{flex: 1}}>
      <StatusBar barStyle={'light-content'} backgroundColor='orange' />
      <View style={styles.body}>
        <FlatList 
        data={tasks}
        ListHeaderComponent={() => (
          <HomeHeader color={'orange'} text={"Upcoming"} taskCount={tasks.length} navigation={navigation} />
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

export default Upcoming

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
  textContainer: {
    padding: 10,
    paddingLeft: 20,
    borderBottomColor: 'rgba(0, 0, 0, 0.2)',
    borderBottomWidth: 1,
    marginBottom: 10, 
    backgroundColor: '#00CBFE',
    justifyContent: 'center'
  }
})