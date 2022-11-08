import { FlatList, Platform, SafeAreaView, StatusBar, StyleSheet, Text, View } from 'react-native'
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

const Complete = ({navigation}) => {

  const [tasks, setTasks] = React.useState([])

  const getCompleteTask = () => {
    db.transaction((tx) => { 
      tx.executeSql('SELECT * FROM tasks WHERE complete = true',
      [],
      (tx, result) => {
        let item = []
        if (result.rows.length === 0) {
         return setTasks(item)
        } else {
          for (let i = 0; i < result.rows.length; i++) {
            item.push(result.rows.item(i))
          }
          return setTasks(item)
        }
      },
      error => console.log(error)
      )
    })
  }

  React.useEffect(() => {
    getCompleteTask()
  }, [])

  return (
    <SafeAreaView style={{flex: 1}}>
      <StatusBar barStyle={'light-content'} backgroundColor="green" />
      <View style={styles.body}>
        <FlatList 
        data={tasks}
        ListHeaderComponent={() => (
          <HomeHeader color={'green'} text={"Complete"} taskCount={tasks.length} navigation={navigation} />
        )}
        renderItem={({item}) => (
          <View style={styles.container}>
            <TaskCard tasks={item} success={true} fail={false} navigation={navigation} />
          </View>
        )}
        keyExtractor={(index, ID) => ID}
        />
      </View>
    </SafeAreaView>
  )
}

export default Complete

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
  }
})