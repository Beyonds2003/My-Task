import { StatusBar, StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons'
import React from 'react'
import { format } from 'date-fns'

const HomeHeader = ({color, text, taskCount, navigation}) => {
  return (
    <View>
      {/* <StatusBar barStyle={'light-content'} backgroundColor={color} /> */}
      <View style={[styles.textContainer, {backgroundColor: color}]}>
       <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
        <TouchableOpacity activeOpacity={0.7} onPress={() => navigation.goBack()}>
            <View style={{marginLeft: -13}}><MaterialCommunityIcon name='chevron-left' size={35} color="white" /></View>
        </TouchableOpacity>
        <TouchableOpacity activeOpacity={0.7}>
          <MaterialCommunityIcon name='dots-horizontal' size={30} color="white" />
        </TouchableOpacity>
       </View>
       <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingLeft: 25, paddingRight: 25}}>
        <View>
          <Text style={styles.titleText}>{text}</Text>
          <Text style={styles.dateText}>{`${taskCount} ${taskCount > 1 ? "Tasks" : "Task"}`}</Text>
        </View>
        <Text style={styles.dateText}>{format(Date.now(), 'd, MMMM yyyy')}</Text>
       </View>
      </View>
    </View>
  )
}

export default HomeHeader

const styles = StyleSheet.create({
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
        marginBottom: 0, 
        justifyContent: 'center'
      },
      titleText: {
        fontSize: 26,
        fontFamily: 'Roboto-Medium',
        color: 'white',
        marginBottom: 3
      },
      dateText: {
        fontSize: 15,
        fontFamily: GlobalStyle.font.fontFamily,
        color: 'white',
        marginLeft: 3
      }
})