import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'

const ColorPattern = ({item, setColorPettern, colorPattern}) => {

    const [touch, setTouch] = React.useState(item.click)

    const handleTouch = () => {
        setColorPettern(pres => pres.map(data => {return {...data, click: false}}))
        setColorPettern(pres => pres.map(data => {
          if(data.id === item.id) {
           return {...data, click: true}
          }
          return data
        }))
    }

  return (
    <View>
     <TouchableOpacity activeOpacity={0.7} style={[styles.colorCircle, 
      {backgroundColor: item.color, borderWidth: item.click ? 1.5 : 0, borderColor: '#2d87fc'}]} onPress={handleTouch}>
        <Text></Text>
     </TouchableOpacity>
    </View>
  )
}

export default ColorPattern

const styles = StyleSheet.create({
    colorCircle: {
        width: 30,
        height: 30,
        borderRadius: 1000,
        marginLeft: 4,
        marginRight: 10,
        marginTop: 5
      },
})