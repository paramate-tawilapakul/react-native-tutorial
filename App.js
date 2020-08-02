import React, { useState } from 'react'
import {
  StyleSheet,
  View,
  FlatList,
  Alert,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native'
import Header from './components/Header'
import TodoItem from './components/TodoItem'
import AddTodo from './components/AddTodo'
// import Sandbox from './components/sandbox'

export default function App() {
  const [todos, setTodos] = useState([
    { text: 'buy coffee', key: '1' },
    { text: 'create an app', key: '2' },
    { text: 'play on the switch', key: '3' },
  ])

  const pressHandler = (key) => {
    setTodos((prevTodos) => {
      return prevTodos.filter((todo) => todo.key != key)
    })
  }

  const submitHandler = (text) => {
    if (text.length > 3) {
      setTodos((prevTodos) => {
        return [{ text, key: Math.random().toString() }, ...prevTodos]
      })
    } else {
      console.log('alert')
      Alert.alert('OOPS!', 'TODOS MUST BE OVER 3 CHARS LONG', [
        { text: 'Understood', onPress: () => console.log('alert closed') },
      ])
    }
  }

  return (
    // <Sandbox />
    <TouchableWithoutFeedback
      onPress={() => {
        Keyboard.dismiss()
        console.log('dismissed keyboard')
      }}
    >
      <View style={styles.container}>
        <Header />
        <View style={styles.content}>
          <AddTodo submitHandler={submitHandler} />
          <View style={styles.list}>
            <FlatList
              data={todos}
              renderItem={({ item }) => (
                <TodoItem pressHandler={pressHandler} item={item} />
              )}
            />
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    padding: 40,
    flex: 1, // take available space
  },
  list: {
    flex: 1,
    marginTop: 20,
  },
})
