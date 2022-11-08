import { StatusBar, StyleSheet, Text, View } from 'react-native'
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons'
import React from 'react'

const Toast = ({theme, text}) => {
  return (
      <View style={{position: 'relative'}}>
        <View style={styles.toast}>
          <View style={[styles.leftColor, {backgroundColor: theme ? '#2DB83D' : "#E10600"}]} />
          <View style={styles.toastTextContainer}>
              <View style={{alignItems: "center"}}>
                <View style={[styles.toastIconContainer, {borderColor: `${theme ? '#2DB83D' : "#E10600"}`}]}>
                    <MaterialCommunityIcon name="check" size={16} color={theme ? '#2DB83D' : "#E10600"} />
                </View>
              </View>
            <View style={{display: 'flex'}}>
              <Text style={[styles.toastMessage, {marginBottom: 2, fontFamily: 'Roboto-Medium', fontSize: 17}]}>{theme ? 'Success' : 'Error'}</Text>
              <Text style={styles.toastMessage}>{text}</Text>
            </View>
          </View>
        </View>
      </View>
  )
}

export default Toast

const styles = StyleSheet.create({
    toastMessage: {
        color: "black",
        fontFamily: GlobalStyle.font.fontFamily,
        fontSize: 15,
      },

      toast: {
        minWidth: 300,
        backgroundColor: 'white',
        borderRadius: 2,
        padding: 10,
        borderWidth: 0.3,
        position:'relative',
        height: 66,
        elevation: 10
      },
      leftColor: {
        width: 4,
        height: 66,
        position: 'absolute',
        left: 0,
        borderRadius: 2
      },
      toastTextContainer: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        marginLeft: 10
      },
      toastIconContainer: {
        padding: 3,
        borderWidth: 1,
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 10
      },
})