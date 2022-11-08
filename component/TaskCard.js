import { View, Text, StyleSheet, TouchableOpacity, Image, Alert } from 'react-native'
import React from 'react'
import GlobalStyle from './GlobalStyle'
import FontAwesome from "react-native-vector-icons/FontAwesome5"
import { CheckBox } from '@rneui/themed'
import { format } from 'date-fns'
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated'
import SQLite from 'react-native-sqlite-storage'
import PushNotification from 'react-native-push-notification'

const db = SQLite.openDatabase({
  name: "MyTaskDb",
  location: 'default'
},
() => {},
error => {console.log(error)}
)

const TaskCard = ({tasks, success, fail, navigation, setTaskLength}) => {

    const [check, setCheck] = React.useState(tasks.complete === 0 ? false : true)

    const cardHeight = useSharedValue()
    const activityDisplay = useSharedValue(0)
    const cardPaddingTopAndBottom = useSharedValue(17)
    const cardMarginBottom = useSharedValue(14)
    const checkBoxHeight = useSharedValue(20)
    const checkBoxBorderWidth = useSharedValue(1.5)

    const rCardHeight = useAnimatedStyle(() => {
      return {
        height: cardHeight.value,
        paddingTop: cardPaddingTopAndBottom.value,
        paddingBottom: cardPaddingTopAndBottom.value,
        marginBottom: cardMarginBottom.value
      }
    })
    
    const rActivityDisplay = useAnimatedStyle(() => {
      return {
        display: activityDisplay.value === 0 ? 'flex' : 'none',
      }
    })

    const rCheckBox = useAnimatedStyle(() => {
      return {
        height: checkBoxHeight.value,
        borderWidth: checkBoxBorderWidth.value,
        width: checkBoxHeight.value
      }
    })

    const updateUserTask = (condition, id) => {
      db.transaction((tx) => {
        tx.executeSql("UPDATE tasks SET complete = ? WHERE ID = ?", 
        [condition, id],
        () => {
          console.log('update Successfully')
        },
        error => console.log(error)
        )
      })
    }

    const handleCheckClick = async (id) => {
      try {
        if(!check) {
          setCheck(true),
          await updateUserTask(true, id)
        } else {
          setCheck(false)
          await updateUserTask(false, id)
        }
      } catch (error) {
        console.log(error)
      }
    }

    const deleteTask = async (task) => {
      try {
       await db.transaction(async (tx) => {
          await tx.executeSql('DELETE FROM tasks WHERE ID = ?', 
          [task.ID],
          () => console.log(
            PushNotification.cancelLocalNotification({id: task.ID})
          ),
          error => console.log(error)
          )
        })      
        activityDisplay.value = withTiming(1, { duration: 300 }),
        cardHeight.value = withTiming(0, { duration: 150 }),
        cardPaddingTopAndBottom.value = withTiming(0, { duration: 300 }),
        cardMarginBottom.value = withTiming(0, { duration: 300 }),
        checkBoxHeight.value = withTiming(0, { duration: 300 }),
        checkBoxBorderWidth.value = withTiming(0, { duration: 300 })  
        setTaskLength(pres => pres - 1)
      } catch (error) {
        console.log(error)
      }
    }

    const handleUpdate = (task) => {
      if(task.complete === 0) {
        navigation.navigate('Create task', {task, update: true})
      }
    }

    const handleDelete = (task) => {
      Alert.alert('Delete Task', 'Are you sure to delete this task?', [
        {text: 'Cancel'},
        {text: 'Yes', onPress: () => deleteTask(task)}
      ], {cancelable: true})
    }
   
  return (
    <TouchableOpacity activeOpacity={0.7} 
    onPress={() => handleUpdate(tasks)} 
    onLongPress={() => handleDelete(tasks)}>
    <View>
      {tasks && 
      <Animated.View style={[styles.body, {backgroundColor: tasks.color}, rCardHeight]}>
        <View style={{paddingLeft: 20, paddingRight: 10}}>
          <Text style={styles.textTitle}>{tasks.title}</Text>
          <Text style={styles.text} numberOfLines={1}>{tasks.description}</Text>
        </View>
          <View style={[styles.activityContainer, {marginLeft: 17}]}>
            {tasks.category.split(', ').map((data, index) => {

              const jobIcon = {
                Job: require('../assets/image/job.png'),
                Meeting: require('../assets/image/meeting.png'),
                Gaming: require('../assets/image/gaming.png'),
                Homework: require('../assets/image/homework.png'),
                Painting: require('../assets/image/painting.png'),
                Sport: require('../assets/image/sport.png'),
                Reading: require('../assets/image/reading.png'),
                Cooking: require('../assets/image/cooking.png'),
                Dancing: require('../assets/image/dancing.png'),
                Exam: require('../assets/image/exam.png'),
                Jogging: require('../assets/image/jogging.png'),
                Shopping: require('../assets/image/shopping.png'),
                Lunch: require('../assets/image/lunch.png'),
                Laundry: require('../assets/image/laundry.png'),
                Love: require('../assets/image/love.png'),
                Meditation: require('../assets/image/meditation.png'),
                Party: require('../assets/image/party.png'),
                Playtime: require('../assets/image/playtime.png'),
                Programming: require('../assets/image/programming.png'),
                Teaching: require('../assets/image/teaching.png'),
                Television: require('../assets/image/television.png'),
                Training: require('../assets/image/training.png'),
              }
  
              return(
                <Animated.View key={index} style={[styles.activity, rActivityDisplay]}>
                    <Image source={jobIcon[data]} style={styles.image} />
                    <Text numberOfLines={1} style={[styles.text, {fontSize: 14}]}>{data}</Text>
                </Animated.View>
            )})}
          </View>
          {
          <View>
            <View style={{backgroundColor: 'rgba(0, 0, 0, 0.1)', height: 1, marginTop: 7, marginBottom: 12}}></View>
            <View style={styles.timeContainer}>
              <View style={styles.time}>
                  <FontAwesome name='clock'  size={20} color='black' />
                  <Text style={[styles.text, {fontSize: 14, marginLeft: 10, marginBottom: 0, fontFamily: 'Roboto-Medium'}]}>
                    {`${format(Date.parse(tasks.startDate), 'd, hh:mm a')} - ${format(Date.parse(tasks.endDate), 'd, hh:mm a')}`}
                  </Text>
              </View>
              <View style={styles.checkBoxContainer}>
                {!check ? 
                <TouchableOpacity onPress={() => handleCheckClick(tasks.ID)}>
                  <Animated.View style={[styles.checkBox, rCheckBox]} />
                </TouchableOpacity> :
                <TouchableOpacity onPress={() => handleCheckClick(tasks.ID)}>
                  <Animated.View style={[styles.checkedBox, {backgroundColor: tasks.color}, rCheckBox]}>
                      <FontAwesome name='check' size={11} color='black' />
                  </Animated.View>
                </TouchableOpacity>
                }
              </View>
            </View>
          </View>}
          {fail &&
           <View style={styles.checkContainer}>
            <FontAwesome name='times' size={16} color="white" />
           </View>
          }
          {/* {success &&
           <View style={styles.checkContainer}>
            <FontAwesome name='check' size={16} color="white" />
           </View>
          } */}
      </Animated.View>}
    </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
    body: {
        marginLeft: 10,
        marginRight: 10,
        borderRadius: 15,
    },
    textTitle: {
        color: GlobalStyle.fontColor.color,
        fontFamily: 'Roboto-Medium',
        fontSize: 18,
        marginBottom: "2%"
    },
    text: {
        color: GlobalStyle.fontColor.color,
        fontFamily: GlobalStyle.font.fontFamily,
        fontSize: 15,
        marginBottom: '4%'
    },
    activity: {
        borderWidth: 0.1,
        alignSelf: 'center',
        paddingLeft: 10,
        paddingRight: 10,
        borderRadius: 20,
        display: 'flex',
        justifyContent: "center",
        alignItems: 'center',
        height: 30,
        marginRight: 10,
        flexDirection: 'row',
    },
    activityContainer: {
        display: 'flex',
        flexDirection: 'row',
        marginBottom: '2%'
    },
    time: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: "center"
    },
    timeContainer: {
        paddingLeft: 20, 
        paddingRight: 10,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    checkBox: {
        borderWidth: 1.5,
        borderRadius: 5,
        marginRight: 9
    },
    checkedBox: {
        width: 20,
        height: 20,
        borderWidth: 1.5,
        borderRadius: 5,
        marginRight: 9,
        justifyContent: "center",
        alignItems: 'center'
    },
    image: {
      width: 25,
      height: 23,
      marginRight: 5
    },
    checkContainer: {
      width: 30,
      height: 30,
      borderRadius: 50,
      backgroundColor: 'green',
      justifyContent: 'center',
      alignItems: "center",
      position: 'absolute',
      top: 20,
      right: 20
    }
})

export default TaskCard