import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'

const Category = ({item, category, setCategory, handleCategoryPress}) => {

  return (
    <TouchableOpacity activeOpacity={0.7} onPress={() => handleCategoryPress(item)}>
        <View style={[styles.chip, {backgroundColor: item.color, borderWidth: item.click ? 1.5 : 0, borderColor: '#2d87fc'}]}>
          <Image source={item.icon[0]} style={styles.image} />
          <Text style={[styles.text, {fontSize: 15}]}>{item.text}</Text>
        </View>
    </TouchableOpacity>
  )
}

export default Category

const styles = StyleSheet.create({
    chip: {
        color: "black",
        fontFamily: GlobalStyle.font.fontFamily,
        padding: 5,
        borderRadius: 10,
        backgroundColor: '#CBE4F9',
        paddingLeft: 10,
        paddingRight: 10,
        height: 37,
        alignSelf: 'flex-start',
        justifyContent: "center",
        alignItems: "center",
        marginRight: 10,
        marginBottom: 10,
        display: 'flex',
        flexDirection: 'row'
      },
      text: {
        color: "black",
        fontSize: 17,
        fontFamily: GlobalStyle.font.fontFamily,
    },
    image: {
      width: 25,
      height: 25,
      marginRight: 5
    }
})