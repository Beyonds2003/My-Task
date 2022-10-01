import { StyleSheet, Text, View } from 'react-native'
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons'
import React from 'react'

const Toast = ({theme}) => {
  return (
      <View style={{position: 'relative'}}> 
        <View style={styles.toast}>
          <View style={[styles.leftColor, {backgroundColor: theme}]} />
          <View style={styles.toastTextContainer}>
              <View style={{alignItems: "center"}}>
                <View style={[styles.toastIconContainer, {borderColor: `${theme}`}]}>
                    <MaterialCommunityIcon name="check" size={16} color={theme} />
                </View>
              </View>
            <View style={{display: 'flex'}}>
              <Text style={[styles.toastMessage, {marginBottom: 2, fontFamily: 'Roboto-Medium', fontSize: 17}]}>Success</Text>
              <Text style={styles.toastMessage}>Create Task Successfully</Text>
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
        width: 300,
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