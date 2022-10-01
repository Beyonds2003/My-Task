import { ScrollView, StyleSheet, Text, TouchableOpacity, View , TouchableWithoutFeedback, Modal, Keyboard} from 'react-native'
import React from 'react'
import { TextInput } from 'react-native-gesture-handler'
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5'
import DatePicker from 'react-native-date-picker'
import { format } from 'date-fns'
import ColorPicker from 'react-native-wheel-color-picker'
import GlobalStyle from './GlobalStyle'
import ColorPattern from './ColorPattern'
import Category from './Category'
import SQLite from 'react-native-sqlite-storage'
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons'
import Toast from './Toast'

const SUCCESS = '#2DB83D'
const WARN = '#FF7518'
const ERROR = '#E10600'

const db = SQLite.openDatabase({
  name: "MyTaskDb",
  location: 'default'
},
() => {},
error => {console.log(error)}
)

const CreateTask = ({navigation, route}) => {

  const [title, setTitle] = React.useState('')
  const [description, setDescription] = React.useState('')

  const [openStartDate, setOpenStartDate] = React.useState(false)
  const [openEndDate, setOpenEndDate] = React.useState(false)

  const [endDate, setEndDate] = React.useState("End Date")
  const [date, setDate] = React.useState(new Date())

  const [openColor, setOpenColor] = React.useState(false)
  const [newColor, setNewColor] = React.useState()
  
  const [colorPettern, setColorPettern] = React.useState([
    {id: 1, color: '#9CFC97', click: true},
    {id: 2, color: '#F85C61', click: false},
    {id: 3, color: '#B8DCF9', click: false},
    {id: 4, color: '#FFB6C1', click: false},
    {id: 5, color: '#CE9AD9', click: false},
    {id: 6, color: '#FF8558', click: false},
    {id: 7, color: '#F3E4C7', click: false},
  ])

//     {id: 4, color: '#DF3739', text: "Gaming", click: false, icon: [require('../assets/image/gaming.png')]},
//     {id: 5, color: '#B7B7B7', text: "Painting", click: false, icon: [require('../assets/image/painting.png')]},

  const [category, setCategory] = React.useState([
    {id: 1, color: '#CDF5F6', text: "Sport", click: false, icon: [require('../assets/image/sport.png')]},
    {id: 2, color: '#D6CDEA', text: "Job", click: false, icon: [require('../assets/image/job.png')]},
    {id: 3, color: '#F9D8D6', text: "Meeting", click: false, icon: [require('../assets/image/meeting.png')]},
    {id: 4, color: '#EFF9DA', text: "Homework", click: false, icon: [require('../assets/image/homework.png')]},
    {id: 5, color: '#F19392', text: "Shopping", click: false, icon: [require('../assets/image/shopping.png')]},
  ])

  const handleCategoryPress = (item) => {
    let checkMoreThanThreeClick = category.filter(data => data.click === true) 
    if(checkMoreThanThreeClick.length <= 2) {
      setCategory(pres => pres.map(data => {
        if(data.id === item.id) {
          if(item.click === true) {
            return {...data, click: false}
          } else {
            return {...data, click: true}
          }
        }
        return data
      }))
  } else {
    setCategory(pres => pres.map(data => {
      if(data.id === item.id) {
        if(item.click === true) {
          return {...data, click: false}
        }
      }
      return data
    }))
  }
}
 
  const handleConfirmColor = () => {
    setColorPettern(pres => pres.map(data => {
      if(data.click === true) {
        return {...data, color: newColor, click: true}
      }
      return data
    }))
    setOpenColor(false)
  }

  // const _keyboardDidShow = React.useCallback(() => {
  //   navigation.setOptions({
  //     tabBarStyle: {
  //       bottom: -15
  //     },
  //   });
  // }, [navigation]);

  // const _keyboardDidHide = React.useCallback(() => {
  //   navigation.setOptions({
  //     tabBarStyle: {
  //       position: 'absolute',
  //       height: 60,
  //       borderRadius: 50,
  //       backgroundColor: 'white',
  //       marginLeft: '10%',
  //       marginRight: '10%',
  //       display: 'flex',
  //       bottom: 30
  //     }
  //   });
  // }, [navigation]);

  
  const createTask = async (categoryString, colorString, dateStart, dateEnd) => {
   await db.transaction(async (tx) => {
    await  tx.executeSql(`INSERT INTO tasks (title, category, color, startDate, endDate, description, complete) VALUES(?, ?, ?, ?, ?, ?, ?)`,
      [title.trim(), categoryString, colorString, dateStart, dateEnd, description.trim(), false],
      () => {console.log('insert table successfully.')},
      error => console.log(error)
      )
    })
  }

  const handleCreateTask = async () => {
    if(title === '') {
      return console.log('Title can"t be empty')
    } else if(category.filter(data => data.click === true).length <= 0) {
      return console.log('You need to choose at least one category.')
    } else if(endDate === "End Date") {
      return console.log('Please choose task end date.')
    } else if (description === '') {
      return console.log('You need to provide description.')
    }
    try {
      const categoryString = []
      const colorString = colorPettern.filter(data => data.click === true)[0].color
      const dateStart = format(date, 'yyyy-MM-dd HH:mm:ss.sss')
      const dateEnd = format(endDate, 'yyyy-MM-dd HH:mm:ss.sss')
      await  category.filter(data => data.click === true).map(item => categoryString.push(item.text))
      await createTask(categoryString.join(', '), colorString, dateStart, dateEnd)
      setTitle('')
      setEndDate('End Date')
      setDescription('')
    } catch (error) {
      console.log(error)
    }
  }


  React.useEffect(() => {
    // Keyboard.addListener('keyboardDidShow', _keyboardDidShow);
    // Keyboard.addListener('keyboardDidHide', _keyboardDidHide);
    navigation.setOptions({
      headerLeft: () => {
        return (
          <TouchableOpacity onPress={() => navigation.navigate("My Task")}>
            <View style={{marginLeft: 22}}>
              <MaterialCommunityIcon name="arrow-left-thin" size={30} color={'rgba(0, 0, 0, 0.7)'} />
            </View>
          </TouchableOpacity>
        )
      },
    })

    // cleanup function
    // return () => {
    //   Keyboard.removeListener('keyboardDidShow', _keyboardDidShow);
    //   Keyboard.removeListener('keyboardDidHide', _keyboardDidHide);
    // };
  }, [])
  

  return (
    <ScrollView style={styles.body}>
        <View>
          <View style={styles.space}>
            <Text style={[styles.text, {fontFamily: 'Roboto-Medium', marginBottom: 10, marginLeft: 3}]}>Task title</Text>
            <TextInput placeholder='Eg.Football' keyboardType='ascii-capable' value={title}
            onChangeText={(value) => setTitle(value)}
            style={styles.input} placeholderTextColor='rgba(0, 0, 0, 0.3)' 
            cursorColor={'rgba(0, 0, 0, 0.5)'}/>
          </View>
          <View style={styles.space}>
          <Text style={[styles.text, {fontFamily: 'Roboto-Medium', marginBottom: 10, marginLeft: 3}]}>Category</Text>
          <View style={styles.chipContainer}>
            {category.map(item => 
             <Category key={item.id} item={item} category={category} setCategory={setCategory} handleCategoryPress={handleCategoryPress} />  
            )}
            <TouchableOpacity>
              <View style={[styles.chip, , {backgroundColor: "#f7f7f7", width: 40}]}>
                <FontAwesome5Icon name='plus' size={16} color={'rgba(0, 0, 0, 0.6)'} />
              </View>
            </TouchableOpacity>
          </View>
          </View>
          <View style={styles.space}>

          <View style={styles.space}>
          <Text style={[styles.text, {fontFamily: 'Roboto-Medium', marginBottom: 10, marginLeft: 3}]}>Color task</Text>
          <View style={styles.colorCircleContainer}>
            {colorPettern.map((item) => (
              <ColorPattern key={item.id} item={item} setColorPettern={setColorPettern} colorPattern={colorPettern}/>
            ))}
            <TouchableOpacity activeOpacity={0.8} onPress={() => setOpenColor(true)}>
              <View style={[styles.colorCircle, {backgroundColor: "#f7f7f7", justifyContent: "center", alignItems: "center"}]}>
                <FontAwesome5Icon name='plus' size={15} color={'rgba(0, 0, 0, 0.6)'} />
              </View>
            </TouchableOpacity>
          </View>
          </View>

          <View style={styles.date}>
            <View style={{flex: 1, marginRight: 10}}>
              <Text style={[styles.text, {fontFamily: 'Roboto-Medium', marginBottom: 10, marginLeft: 3}]}>Starts</Text>
              <TouchableWithoutFeedback onPress={() => setOpenStartDate(true)}>
               <Text style={styles.startDate}>{format(date, "MMM d,  hh:mm a")}</Text>
              </TouchableWithoutFeedback>
              <DatePicker 
               modal
               open={openStartDate}
               date={date}
               onConfirm={(date) => {
                 setOpenStartDate(false)
                 setDate(date)
               }}
               onCancel={() => {
                setOpenStartDate(false)
               }}
               theme='light'
               textColor='white'
               title="Select Start Date"
              />
            </View>
            <View style={{flex: 1, marginRight: 10}}>
              <Text style={[styles.text, {fontFamily: 'Roboto-Medium', marginBottom: 10, marginLeft: 3}]}>Ends</Text>
              <TouchableWithoutFeedback onPress={() => setOpenEndDate(true)}>
               <Text style={styles.startDate}>{endDate === 'End Date' ? "End date" : format(endDate, 'MMM d,  hh:mm a')}</Text>
              </TouchableWithoutFeedback>
              <DatePicker 
               modal
               open={openEndDate}
               date={endDate === "End Date" ? date : endDate}
               onConfirm={(date) => {
                 setOpenEndDate(false)
                 setEndDate(date)
               }}
               onCancel={() => {
                setOpenEndDate(false)
               }}
               theme='light'
               style={{backgroundColor: 'white'}}
               title="Select End Date"
              />
            </View>
          </View>
          </View>

          <View style={styles.space}>
            <Text style={[styles.text, {fontFamily: 'Roboto-Medium', marginBottom: 10, marginLeft: 3}]}>Description</Text>
            <TextInput placeholder='Description' style={[styles.input, {height: 130}]} 
                value={description} onChangeText={(value) => setDescription(value)}
                placeholderTextColor='rgba(0, 0, 0, 0.3)' multiline
                textAlignVertical='top'
                cursorColor={'rgba(0, 0, 0, 0.5)'}/>
          </View>
          <View style={styles.space}>
            <TouchableOpacity style={styles.button} activeOpacity={0.8} onPress={handleCreateTask}>
              <Text style={[styles.text, {color: "white"}]}>Create Task</Text>
            </TouchableOpacity>
          </View>
          
          {/* <View style={[styles.toastContainer]}>
           <Toast theme={SUCCESS} />
          </View> */}

        </View>
        {openColor && 
        <Modal visible={openColor} onRequestClose={() => setOpenColor(false)} transparent>
          <View style={styles.colorModalContainer}>
            <View style={styles.colorModal}>
              <ColorPicker onColorChangeComplete={(color) => setNewColor(color)}/>
              <View style={{display: 'flex', flexDirection: 'row', marginTop: 20, marginBottom: 5, justifyContent: 'flex-end'}}>
              <TouchableOpacity activeOpacity={0.6} onPress={() => setOpenColor(false)}>
                <Text style={[styles.colorButton, {marginRight: 20}]}>CANCEL</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={handleConfirmColor} activeOpacity={0.6}>
                <Text style={styles.colorButton}>CONFIRM</Text>
              </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
        }
    </ScrollView>
  )
}

const styles = StyleSheet.create({
    body: {
        flex: 1,
        padding: 20,
        backgroundColor: 'white',
    },
    text: {
        color: "black",
        fontSize: 17,
        fontFamily: GlobalStyle.font.fontFamily,
    },
    input: {
      borderWidth: 1,
      height: 39,
      borderRadius: 10,
      borderColor: 'rgba(0, 0, 0, 0.1)',
      paddingLeft: 20,
      color: "black"
    },
    space: {
      marginBottom: 25
    },
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
      marginBottom: 10
    },
    chipContainer: {
      display: 'flex',
      flexDirection: 'row',
      flexWrap: 'wrap'
    }, 
    date: {
      display: 'flex',
      flexDirection: "row"
    },
    colorCircle: {
      width: 30,
      height: 30,
      borderRadius: 1000,
      marginLeft: 4,
      marginRight: 10
    },
    colorCircleContainer: {
      display: 'flex',
      flexDirection: 'row',
      flexWrap: "wrap"
    },
    button: {
      backgroundColor: '#312dff',
      padding: 12,
      justifyContent: "center",
      alignItems: "center",
      borderRadius: 10,
      marginBottom: 100
    },
    startDate: {
      color: 'black',
      fontFamily: GlobalStyle.font.fontFamily,
      borderWidth: 1,
      paddingBottom: 8,
      marginTop: 1,
      borderRadius: 10,
      borderColor: 'rgba(0, 0, 0, 0.1)',
      paddingTop: 10,
      textAlign: "center"
    },
    colorModalContainer: {
      backgroundColor: 'rgba(0, 0, 0, 0.3)',
      flex: 1,
      justifyContent: "center",
      alignItems: "center"
    },
    colorModal: {
       width: '85%',
       height: 340,
       backgroundColor: "white",
       padding: 10,
       borderRadius: 15
    },
    colorButton: {
      color: '#312dff',
      fontFamily: 'Roboto-Medium',
      fontSize: 14,
      marginRight: 20
    },
    toastContainer: {
      position: "absolute",
      top: 0,
      width: '100%',
      justifyContent: "center",
      alignItems: "center",
    },
})

export default CreateTask