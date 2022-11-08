import { Image, Modal, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { ScrollView } from 'react-native-gesture-handler'
import SingleCategory from './SingleCategory'
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons'

const MoreCategory = ({setMoreCategory, category, handleCategoryPress}) => {
   
  return (
    <Modal animationType='fade' onRequestClose={() => setMoreCategory(false)}>
        <TouchableOpacity style={styles.leftArrow} activeOpacity={0.5} onPress={() => setMoreCategory(false)}>
             <MaterialCommunityIcon name='chevron-left' size={35} color="black" />
        </TouchableOpacity>
        <StatusBar barStyle={'dark-content'} backgroundColor='white' />
        <ScrollView style={styles.body}>
            <View style={{justifyContent: 'center', alignItems: "center", paddingTop: 40}}>
             <Text style={styles.text}>Choose Category</Text>
             <Text style={styles.description}>You can choose at most three.</Text>

             <View style={styles.divider} />

             <View style={styles.catContainer}>
                {category.map(cat => (
                    <SingleCategory key={cat.id} cat={cat} handleCategoryPress={handleCategoryPress}/>
                ))}
             </View> 
            </View>
        </ScrollView>
        <View style={styles.abso}>
            <TouchableOpacity style={styles.button} activeOpacity={0.8} onPress={() => setMoreCategory(false)}>
                <Text style={[styles.buttonText, {color: "white"}]}>Finish</Text>
            </TouchableOpacity>
        </View>
    </Modal>
  )
}

export default MoreCategory

const styles = StyleSheet.create({
    text: {
        color: 'black',
        fontSize: 30,
        fontFamily: 'Roboto-Medium',
        marginBottom: 5
    },
    body: {
        flex: 1
    },
    description: {
        color: 'rgba(0, 0, 0, 0.6)'
    },
    divider: {
        width: '100%',
        height: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.15)',
        marginTop: 45
    },
    catContainer: {
        flex: 1,
        display: 'flex',
        flexDirection: 'row',
        width: '100%',
        flexWrap: 'wrap'
    },
    finishContainer: {
        backgroundColor: 'black',
        width: '85%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center'
    },
    button: {
        backgroundColor: '#312dff',
        padding: 12,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 10,
        marginBottom: 100,
        width: '85%',
        position: 'absolute',
        bottom: -70
      },
      buttonText: {
        color: "black",
        fontSize: 17,
        fontFamily: GlobalStyle.font.fontFamily,
    },
    abso: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(255, 255, 255)',
        height: 60
    },
    leftArrow: {
        marginLeft: 10
    }
})