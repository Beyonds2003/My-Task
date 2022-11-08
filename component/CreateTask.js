import { ScrollView, StyleSheet, Text, TouchableOpacity, View , TouchableWithoutFeedback, Modal, Keyboard, StatusBar, Appearance} from 'react-native'
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
import Animated, { useAnimatedStyle, useSharedValue, withDelay, withRepeat, withSpring, withTiming } from 'react-native-reanimated'
import PushNotification from 'react-native-push-notification'
import MoreCategory from './MoreCategory'

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

  const data = route.params

  const task = data?.task

  const colorSchema = Appearance.getColorScheme()

  const [title, setTitle] = React.useState(task?.title ? task.title : '')
  const [description, setDescription] = React.useState(task?.description ? task.description : '')

  const [openStartDate, setOpenStartDate] = React.useState(false)
  const [openEndDate, setOpenEndDate] = React.useState(false)

  const [endDate, setEndDate] = React.useState(task?.endDate ? new Date(task.endDate) : 'End Date')
  const [date, setDate] = React.useState(task?.startDate ? new Date(task.startDate) : new Date)

  const [openColor, setOpenColor] = React.useState(false)
  const [newColor, setNewColor] = React.useState()

  const [success, setSuccess] = React.useState(false)
  const [toastText, setToastText] = React.useState('')

  const [moreCategory, setMoreCategory] = React.useState(false)
  
  const [colorPettern, setColorPettern] = React.useState([
    {id: 1, color: task?.color ? task.color : '#9CFC97', click: true},
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
    {id: 5, color: '#EC7CB9', text: "Shopping", click: false, icon: [require('../assets/image/shopping.png')]},
    {id: 6, color: '#FFF6FB', text: "Love", click: false, icon: [require('../assets/image/love.png')]},
    {id: 7, color: '#D4E3F2', text: "Jogging", click: false, icon: [require('../assets/image/jogging.png')]},
    {id: 8, color: '#ECFFFD', text: "Cooking", click: false, icon: [require('../assets/image/cooking.png')]},
    {id: 9, color: '#8999C2', text: "Programming", click: false, icon: [require('../assets/image/programming.png')]},
    {id: 10, color: '#CECECE', text: "Training", click: false, icon: [require('../assets/image/training.png')]},
    {id: 11, color: '#EEC5B7', text: "Laundry", click: false, icon: [require('../assets/image/laundry.png')]},
    {id: 12, color: '#A5DAB2', text: "Teaching", click: false, icon: [require('../assets/image/teaching.png')]},
    {id: 13, color: '#B7A7D8', text: "Playtime", click: false, icon: [require('../assets/image/playtime.png')]},
    {id: 14, color: '#CDC5F7', text: "Exam", click: false, icon: [require('../assets/image/exam.png')]},
    {id: 15, color: '#FFCEBE', text: "Lunch", click: false, icon: [require('../assets/image/lunch.png')]},
    {id: 16, color: '#FFE9F0', text: "Meditation", click: false, icon: [require('../assets/image/meditation.png')]},
    {id: 17, color: '#FC8B6C', text: "Television", click: false, icon: [require('../assets/image/television.png')]},
    {id: 18, color: '#FFE3C0', text: "Dancing", click: false, icon: [require('../assets/image/dancing.png')]},
    {id: 19, color: '#CBDFE5', text: "Reading", click: false, icon: [require('../assets/image/reading.png')]},
    {id: 20, color: '#C7C6DA', text: "Gaming", click: false, icon: [require('../assets/image/gaming.png')]},
    {id: 21, color: '#7EF4DE', text: "Painting", click: false, icon: [require('../assets/image/painting.png')]},
    {id: 22, color: '#FAD9E1', text: "Party", click: false, icon: [require('../assets/image/party.png')]},
  ])

  const [makeNotRender, setMakeNotRender] = React.useState(false)

  React.useEffect(() => {
    if(task) {
      const chooseCategory = task.category.split(', ')
      const updateData = category.map(data => {
        if(chooseCategory.includes(data.text)) {
          return {...data, click: true}
        }
          return data
      })
      const clickData = updateData.filter(data => data.click === true)
      const unclickData = updateData.filter(data => data.click === false)

      setCategory(clickData.concat(unclickData))
      navigation.setOptions({
        title: 'Update Task'
      })
    }
    setMakeNotRender(true)
  }, [])

  React.useEffect(() => {
    if(makeNotRender) {
      const clickData = category.filter(data => data.click === true)
      const unclickData = category.filter(data => data.click === false)

      setCategory(clickData.concat(unclickData))
    }
  }, [moreCategory])

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
 
  const createTask = async (categoryString, colorString, dateStart, dateEnd) => {
   await db.transaction(async (tx) => {
    await  tx.executeSql(`INSERT INTO tasks (title, category, color, startDate, endDate, description, complete) VALUES(?, ?, ?, ?, ?, ?, ?)`,
      [title.trim(), categoryString, colorString, dateStart, dateEnd, description.trim(), false],
      (tx, result) => {
        PushNotification.localNotificationSchedule({
          channelId: 'mytask',
          title: title,
          message: description,
          allowWhileIdle: true,
          date: date,
          playSound: true,
          soundName: 'default',
          id: result.insertId  ,
          largeIcon: "ic_launcher",   
        })
      },
      error => console.log(error)
      )
    })
  }

  const trnaslateY = useSharedValue(-200)

  const rStyle = useAnimatedStyle(() => {
    return {
      top: trnaslateY.value
    }
  })

  const updateTask = async (categoryString, colorString, dateStart, dateEnd) => {
    await db.transaction(async (tx) => {
     await tx.executeSql('UPDATE tasks SET title = ?, category = ?, color = ?, startDate = ?, endDate = ?, description = ?, complete = ? WHERE ID = ?',
     [title, categoryString, colorString, dateStart, dateEnd, description, task.complete, task.ID],
     (tx, result) => console.log(result, 'reuslt'),
     error => console.log(error)
     )
    })
  }

  const handleCreateTask = async () => {
    trnaslateY.value = withTiming(0, {duration: 1000})
    setTimeout(() => {
      trnaslateY.value = withTiming(-200, {duration: 1000})
    }, 2500)
    if(title.trim() === '') {
      setSuccess(false)
      return setToastText('Title can"t be empty')
    } else if(category.filter(data => data.click === true).length <= 0) {
      setSuccess(false)
      return setToastText('Please, choose at least one category.')
    } else if(endDate === "End Date") {
      setSuccess(false)
      return setToastText('Please choose task end date.')
    } else if (description.trim() === '') {
      setSuccess(false)
      return setToastText('You need to provide description.')
    }
    try {
      const categoryString = []
      const colorString = colorPettern.filter(data => data.click === true)[0].color
      const dateStart = format(date, 'yyyy-MM-dd HH:mm:ss.sss')
      const dateEnd = format(endDate, 'yyyy-MM-dd HH:mm:ss.sss')
      await  category.filter(data => data.click === true).map(item => categoryString.push(item.text))
      await createTask(categoryString.join(', '), colorString, dateStart, dateEnd)
      setSuccess(true)
      setToastText("Create Task Successfully.")
      setTitle('')
      setEndDate('End Date')
      setDescription('')
    } catch (error) {
      console.log(error)
    }
  }

  const handleUpdateTask = async () => {
    trnaslateY.value = withTiming(0, {duration: 1000})
    setTimeout(() => {
      trnaslateY.value = withTiming(-200, {duration: 1000})
    }, 2500)
    const catString = []
    const checkCategory = category.filter(data => data.click === true).map(item => catString.push(item.text))

    if(title.trim() === '') {
      setSuccess(false)
      return setToastText("Title can't be empty")
    } else if(category.filter(data => data.click === true).length <= 0) {
      setSuccess(false)
      return setToastText('Please, choose at least one category.')
    } else if(endDate === "End Date") {
      setSuccess(false)
      return setToastText('Please choose task end date.')
    } else if (description.trim() === '') {
      setSuccess(false)
      return setToastText('You need to provide description.')
    } else if (title.trim() === task.title && colorPettern.filter(data => data.click === true)[0].color === task.color 
    && format(date, 'yyyy-MM-dd HH:mm:ss.sss') === task.startDate &&  format(endDate, 'yyyy-MM-dd HH:mm:ss.sss') === task.endDate 
    && description.trim() === task.description && catString.join(', ') === task.category) {
      setSuccess(false)
      return setToastText('Nothing chnage.')
    }
    try {
      if(format(date, 'yyyy-MM-dd HH:mm:ss.sss') !== task.startDate) {
        PushNotification.cancelLocalNotification({id: task.ID})
        PushNotification.localNotificationSchedule({
          channelId: 'mytask',
          title: title,
          message: description,
          allowWhileIdle: true,
          date: date,
          playSound: true,
          soundName: 'default',
          id: task.ID,
          largeIcon: "ic_launcher",        
        }) 
      }
      const categoryString = []
      const colorString = colorPettern.filter(data => data.click === true)[0].color
      const dateStart = format(date, 'yyyy-MM-dd HH:mm:ss.sss')
      const dateEnd = format(endDate, 'yyyy-MM-dd HH:mm:ss.sss')
      await  category.filter(data => data.click === true).map(item => categoryString.push(item.text))
      await updateTask(categoryString.join(', '), colorString, dateStart, dateEnd)
      setSuccess(true)
      setToastText("Update Task Successfully.")
    } catch (error) {
      console.log(error)
    }
  }
  
  return (
  <View style={styles.body}>
    <ScrollView >
        <StatusBar backgroundColor={'white'} barStyle={'dark-content'} />
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
            {category.slice(0, 4).map(item => 
             <Category key={item.id} item={item} category={category} setCategory={setCategory} handleCategoryPress={handleCategoryPress} />  
            )}
            <TouchableOpacity activeOpacity={0.8} onPress={() => setMoreCategory(true)}>
              <View style={[styles.chip, , {backgroundColor: "#f7f7f7", width: 40}]}>
                <FontAwesome5Icon name='plus' size={16} color={'rgba(0, 0, 0, 0.6)'} />
              </View>
            </TouchableOpacity>
          </View>
          </View>
          <View style={styles.space}>

          <View style={styles.space}>
          <Text style={[styles.text, {fontFamily: 'Roboto-Medium', marginBottom: 5, marginLeft: 3}]}>Color task</Text>
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
               textColor={colorSchema === 'light' ? 'black' : 'white'}
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
               textColor={colorSchema === 'light' ? 'black' : 'white'}
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

        </View>
        {openColor && 
        <Modal visible={openColor} onRequestClose={() => setOpenColor(false)} transparent animationType='fade'>
          <StatusBar backgroundColor='black' />
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
        {moreCategory && 
         <MoreCategory setMoreCategory={setMoreCategory} category={category} handleCategoryPress={handleCategoryPress} />
        }
    </ScrollView>
    <View style={[{position: 'absolute', bottom: -80, justifyContent: 'center', alignItems: 'center', backgroundColor: 'white', left: 0, right: 0}]}>
      {!data?.update ? 
      <TouchableOpacity style={styles.button} activeOpacity={0.8} onPress={handleCreateTask}>
        <Text style={[styles.text, {color: "white"}]}>Create Task</Text>
      </TouchableOpacity> : 
      <TouchableOpacity style={styles.button} activeOpacity={0.8} onPress={handleUpdateTask}>
        <Text style={[styles.text, {color: "white"}]}>Update Task</Text>
      </TouchableOpacity>          
      }
    </View>
    <Animated.View style={[styles.toastContainer, rStyle]}>
      <Toast theme={success} text={toastText}/>
    </Animated.View>
   </View>
  )
}

const styles = StyleSheet.create({
    body: {
        flex: 1,
        padding: 20,
        position: 'relative',
        backgroundColor: 'white',
        paddingBottom: 100
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
      marginRight: 10,
      marginTop: 5
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
      marginBottom: 100,
      width: '85%'
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
       borderRadius: 5
    },
    colorButton: {
      color: '#312dff',
      fontFamily: 'Roboto-Medium',
      fontSize: 14,
      marginRight: 20
    },
    toastContainer: {
      position: "absolute",
      justifyContent: "center",
      alignItems: "center",
      left: 0,
      right: 0
    },
})

export default CreateTask