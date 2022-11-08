import { Image, StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'

const SingleCategory = ({cat, handleCategoryPress}) => {

  return (
    <TouchableOpacity activeOpacity={0.7} style={[styles.conc, {borderWidth: cat.click ? 1 : 0}]} onPress={() => handleCategoryPress(cat)}>
        <Image source={cat.icon[0]} style={styles.icon}/>
        <Text style={styles.catText}>{cat.text}</Text>
    </TouchableOpacity>
  )
}

export default SingleCategory

const styles = StyleSheet.create({
    conc: {
        width: '25%',
        margin: '4%',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 100,
        padding: 12,
        borderRadius: 100,
        borderColor: '#2d87fc'
    },
    icon: {
        width: 40,
        height: 40
    },
    catText: {
        color: "black",
        marginTop: 8
    },
})