import { FlatList, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import SQLite from 'react-native-sqlite-storage'
import { format } from 'date-fns'
import TaskCard from '../TaskCard'

const db = SQLite.openDatabase({
  name: "MyTaskDb",
  location: 'default'
},
() => {},
error => {console.log(error)}
)

const Complete = () => {

  const [tasks, setTasks] = React.useState([])

  const getCompleteTask = () => {
    db.transaction((tx) => { 
      tx.executeSql('SELECT * FROM tasks WHERE date(startDate) >= date("now")',
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
    <View style={styles.body}>
    {/* <View style={styles.textContainer}>
      <Text style={styles.text}>Today Tasks</Text>
    </View> */}
    <FlatList 
     data={tasks}
     renderItem={({item}) => (
      <View style={styles.container}>
        <TaskCard tasks={item} success={true} fail={false}/>
      </View>
     )}
     keyExtractor={(index, ID) => ID}
    />
  </View>
  )
}

export default Complete

const styles = StyleSheet.create({
  body: {
    flex: 1,
    padding: 10,
    paddingLeft: 3,
    paddingRight: 3,
    backgroundColor: 'white'
  },
  container: {
    width: '100%',
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