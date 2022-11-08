import { FlatList, StyleSheet, Text, View, SafeAreaView, StatusBar } from 'react-native'
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

const Fail = ({navigation}) => {

  const [tasks, setTasks] = React.useState([])

  const getFailTask = () => {
    db.transaction((tx) => { 
      tx.executeSql('SELECT * FROM tasks WHERE date(endDate) < date("now") AND complete = false',
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
    getFailTask()
  }, [])

  return (
    <SafeAreaView style={{flex: 1}}>
      <StatusBar barStyle={'light-content'} backgroundColor='#E0153F' />
      <View style={styles.body}>
      <FlatList 
      data={tasks}
      ListHeaderComponent={() => (
        <HomeHeader color={'#E0153F'} text={"Fail"} taskCount={tasks.length} navigation={navigation} />
      )}
      renderItem={({item}) => (
        <View style={styles.container}>
          <TaskCard tasks={item} success={false} fail={true} navigation={navigation}/>
        </View>
      )}
      keyExtractor={(index, ID) => ID}
      />
    </View>
    </SafeAreaView>
  )
}

export default Fail

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