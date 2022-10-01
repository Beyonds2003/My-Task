import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import GlobalStyle from './GlobalStyle'
import FontAwesome from "react-native-vector-icons/FontAwesome5"
import { CheckBox } from '@rneui/themed'
import { format } from 'date-fns'
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated'

const TaskCard = ({tasks, success, fail}) => {

    const [check, setCheck] = React.useState(tasks.complete === 0 ? false : true)

    const cardHeight = useSharedValue(180)

    const handleCheckClick = () => [
      setCheck(true),
    ]
   
  return (
    <View>
      {tasks && 
      <Animated.View style={[styles.body, {backgroundColor: tasks.color}]}>
        <View style={{paddingLeft: 20, paddingRight: 10}}>
          <Text style={styles.textTitle}>{tasks.title}</Text>
          <Text style={styles.text} numberOfLines={1}>{tasks.description}</Text>
        </View>
          <View style={[styles.activityContainer, {marginLeft: 17}]}>
            {tasks.category.split(', ').map((data, index) => {

              const jobIcon = {
                Job: require('../assets/image/job.png'),
                Meeting: require('../assets/image/meeting.png'),
                Fishing: require('../assets/image/fishing.png'),
                Gaming: require('../assets/image/gaming.png'),
                Homework: require('../assets/image/homework.png'),
                Painting: require('../assets/image/painting.png'),
                Sport: require('../assets/image/sport.png'),
                Reading: require('../assets/image/reading.png'),
                Shopping: require('../assets/image/shopping.png'),
              }
  
              return(
                <View key={index} style={styles.activity}>
                    <Image source={jobIcon[data]} style={styles.image} />
                    <Text numberOfLines={1} style={[styles.text, {fontSize: 14}]}>{data}</Text>
                </View>
            )})}
          </View>
          {success === false && fail === false 
          &&
          <View>
            <View style={{backgroundColor: 'rgba(0, 0, 0, 0.1)', height: 1, marginTop: 7, marginBottom: 12}}></View>
            <View style={styles.timeContainer}>
              <View style={styles.time}>
                  <FontAwesome name='clock'  size={20} color='black' />
                  <Text style={[styles.text, {fontSize: 14, fontWeight: '700', marginLeft: 10, marginBottom: 0}]}>
                    {`${format(Date.parse(tasks.startDate), 'd, hh:mm a')} - ${format(Date.parse(tasks.endDate), 'd, hh:mm a')}`}
                  </Text>
              </View>
              <View style={styles.checkBoxContainer}>
                {!check ? 
                <TouchableOpacity onPress={handleCheckClick}>
                  <View style={styles.checkBox} />
                </TouchableOpacity> :
                <TouchableOpacity onPress={() => setCheck(false)}>
                  <View style={[styles.checkedBox, {backgroundColor: tasks.color}]}>
                      <FontAwesome name='check' size={11} color='black' />
                  </View>
                </TouchableOpacity>
                }
              </View>
            </View>
          </View>}
      </Animated.View>}
    </View>
  )
}

const styles = StyleSheet.create({
    body: {
        marginLeft: 10,
        marginRight: 10,
        borderRadius: 15,
        paddingTop: 17,
        paddingBottom: 17,
        marginBottom: 14
    },
    textTitle: {
        color: GlobalStyle.fontColor.color,
        fontFamily: GlobalStyle.font.fontFamily,
        fontSize: 18,
        fontWeight: '700',
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
        padding: 0,
        paddingLeft: 10,
        paddingRight: 10,
        borderRadius: 20,
        display: 'flex',
        justifyContent: "center",
        alignItems: 'center',
        height: 30,
        marginRight: 10,
        display: 'flex',
        flexDirection: 'row'
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
        width: 20,
        height: 20,
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
      height: 15,
      marginRight: 5
    }
})

export default TaskCard